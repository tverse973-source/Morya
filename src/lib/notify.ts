type NotifyPayload = {
  type: "booking" | "lead";
  title: string;
  message: string;
  details?: Record<string, unknown>;
};

async function withTimeout<T>(p: Promise<T>, ms = 8000): Promise<T> {
  return Promise.race([
    p,
    new Promise<T>((_, rej) => setTimeout(() => rej(new Error(`timeout ${ms}ms`)), ms)),
  ]);
}

async function postJson(url: string, body: unknown, headers: Record<string, string> = {}) {
  const res = await withTimeout(
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...headers },
      body: JSON.stringify(body),
      cache: "no-store",
    }),
  );
  if (!res.ok) {
    const t = await res.text().catch(() => "");
    throw new Error(`POST ${url.split("?")[0]} -> ${res.status}${t ? ` ${t.slice(0, 160)}` : ""}`);
  }
}

export async function sendExternalNotification(payload: NotifyPayload) {
  const text = `${payload.title}\n${payload.message}`;
  const jobs: Array<{ name: string; run: Promise<unknown> }> = [];

  // Generic webhook (Zapier/Make/custom gateway; can also be a WhatsApp Business API gateway)
  const webhook = process.env.NOTIFICATION_WEBHOOK_URL?.trim();
  if (webhook) {
    jobs.push({ name: "webhook", run: postJson(webhook, { ...payload, text }) });
  }

  // ntfy (mobile push app)
  const ntfy = process.env.NTFY_TOPIC?.trim();
  if (ntfy) {
    const base = (process.env.NTFY_URL || "https://ntfy.sh").replace(/\/$/, "");
    jobs.push({
      name: "ntfy",
      run: withTimeout(
        fetch(`${base}/${encodeURIComponent(ntfy)}`, {
          method: "POST",
          headers: {
            Title: payload.title.slice(0, 120),
            Priority: payload.type === "booking" ? "high" : "default",
            Tags: payload.type === "booking" ? "taxi,calendar" : "speech_balloon",
            ...(process.env.NTFY_TOKEN ? { Authorization: `Bearer ${process.env.NTFY_TOKEN}` } : {}),
          },
          body: text,
          cache: "no-store",
        }),
      ).then(async (r) => {
        if (!r.ok) throw new Error(`ntfy ${r.status} ${await r.text().catch(() => "")}`);
      }),
    });
  }

  // Telegram Bot
  const tgToken = process.env.TELEGRAM_BOT_TOKEN?.trim();
  const tgChat = process.env.TELEGRAM_CHAT_ID?.trim();
  if (tgToken && tgChat) {
    jobs.push({
      name: "telegram",
      run: postJson(`https://api.telegram.org/bot${tgToken}/sendMessage`, {
        chat_id: tgChat,
        text,
        disable_web_page_preview: true,
      }).then((r: unknown) => {
        const ok = r && typeof r === "object" && "ok" in r ? (r as { ok?: boolean }).ok : true;
        if (ok === false) throw new Error(`telegram api not ok`);
      }),
    });
  }

  // WhatsApp via CallMeBot (free; requires one-time activation per phone number)
  // Setup: https://www.callmebot.com/blog/free-api-whatsapp-messages/
  const waPhone = process.env.WHATSAPP_NOTIFY_PHONE?.trim(); // e.g. +919876543210
  const waKey = process.env.WHATSAPP_NOTIFY_APIKEY?.trim();
  if (waPhone && waKey) {
    const url = `https://api.callmebot.com/whatsapp.php?phone=${encodeURIComponent(waPhone)}&text=${encodeURIComponent(text.slice(0, 900))}&apikey=${encodeURIComponent(waKey)}`;
    jobs.push({
      name: "whatsapp-callmebot",
      run: withTimeout(fetch(url, { method: "GET", cache: "no-store" })).then(async (r) => {
        if (!r.ok) throw new Error(`whatsapp ${r.status} ${await r.text().catch(() => "")}`);
      }),
    });
  }

  // WhatsApp via TextMeBot (requires phone activation + API key)
  // Activate: https://api.textmebot.com/addphone.php?apikey=<key>
  const tmbPhone = process.env.TEXTMEBOT_WHATSAPP_PHONE?.trim() || process.env.WHATSAPP_NOTIFY_PHONE?.trim();
  const tmbKey = process.env.TEXTMEBOT_APIKEY?.trim();
  if (tmbPhone && tmbKey) {
    const url = `https://api.textmebot.com/send.php?recipient=${encodeURIComponent(tmbPhone)}&apikey=${encodeURIComponent(tmbKey)}&text=${encodeURIComponent(text.slice(0, 4000))}`;
    jobs.push({
      name: "whatsapp-textmebot",
      run: withTimeout(fetch(url, { method: "GET", cache: "no-store" }), 15000).then(async (r) => {
        const body = await r.text().catch(() => "");
        if (!r.ok) throw new Error(`textmebot ${r.status} ${body.slice(0, 180)}`);
        if (/error|invalid|denied|not\s+found/i.test(body)) throw new Error(`textmebot: ${body.slice(0, 180)}`);
      }),
    });
  }

  if (!jobs.length) {
    console.warn("[notify] No external notification channels configured (set NTFY_TOPIC, TELEGRAM_BOT_TOKEN+TELEGRAM_CHAT_ID, WHATSAPP_NOTIFY_PHONE+WHATSAPP_NOTIFY_APIKEY, or NOTIFICATION_WEBHOOK_URL).");
    return { sent: false, channels: 0, configured: 0 };
  }

  console.log(`[notify] Sending ${payload.type} via ${jobs.map((j) => j.name).join(", ")}`);
  const results = await Promise.allSettled(jobs.map((j) => j.run));
  let ok = 0;
  results.forEach((r, i) => {
    if (r.status === "fulfilled") ok += 1;
    else console.error(`[notify] ${jobs[i].name} failed:`, r.reason);
  });
  return { sent: ok > 0, channels: ok, configured: jobs.length };
}

