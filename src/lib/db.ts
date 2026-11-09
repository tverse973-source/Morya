type PrismaModelLike<T = Record<string, unknown>> = {
  findMany: (args?: unknown) => Promise<T[]>;
  findUnique: (args?: unknown) => Promise<T | null>;
  findFirst?: (args?: unknown) => Promise<T | null>;
  count: (args?: unknown) => Promise<number>;
  create: (args?: unknown) => Promise<T>;
  update: (args?: unknown) => Promise<T>;
  delete: (args?: unknown) => Promise<T>;
  upsert: (args?: unknown) => Promise<T>;
  createMany: (args?: unknown) => Promise<{ count: number }>;

  // Allow groupBy to be defined but not used
  groupBy?: (args?: unknown) => Promise<unknown[]>;
}

type PrismaClientLike = {
  admin: PrismaModelLike;
  booking: PrismaModelLike;
  lead: PrismaModelLike;
  notification: PrismaModelLike;
  vehicle: PrismaModelLike;
  route: PrismaModelLike;
  package: PrismaModelLike;
};

type PrismaClientFactory = new (...args: unknown[]) => PrismaClientLike;

const createNoopPrisma = (): PrismaClientLike =>
  new Proxy(
    {},
    {
      get: () => {
        const model = new Proxy(
          {},
          {
            get: (_mTarget, methodName) => {
              const method = String(methodName);
              return async (...methodArgs: unknown[]) => {
                void methodArgs;
                if (method === "count") return 0;
                if (method === "groupBy") return [];
                if (method === "findUnique") return null;
                if (method === "findMany") return [];
                if (method === "create") return {};
                if (method === "update") return {};
                if (method === "delete") return {};
                if (method === "upsert") return {};
                if (method === "createMany") return { count: 0 };
                return {};
              };
            },
          },
        );

        return model;
      },
    },
  ) as unknown as PrismaClientLike;

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClientLike;
};

export const prisma: PrismaClientLike = (() => {
  if (globalForPrisma.prisma) return globalForPrisma.prisma;

  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const prismaModule = require("@prisma/client") as {
      PrismaClient?: PrismaClientFactory;
    };

    const PrismaClient = prismaModule.PrismaClient;

    if (typeof PrismaClient !== "function") {
      throw new Error("Prisma client not generated");
    }

    const db = new PrismaClient({
      log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
    });

    globalForPrisma.prisma = db;
    return db;
  } catch {
    const fallback = createNoopPrisma();
    globalForPrisma.prisma = fallback;
    return fallback;
  }
})();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
