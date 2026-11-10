"use client";

import { useMemo, useState } from "react";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { PackageBookingDialog } from "@/components/ui/PackageBookingDialog";

type PackageItem = {
  id: string;
  title: string;
  columns: string[];
  rows: string[][];
  note?: string;
};

interface PackagesTableProps {
  packages: PackageItem[];
}

export function PackagesTable({ packages }: PackagesTableProps) {
  const [openPackage, setOpenPackage] = useState<string | null>(null);
  const ordered = useMemo(
    () =>
      [...packages].sort((a: PackageItem, b: PackageItem) =>
        a.id === "pune-mumbai-pune" ? -1 : b.id === "pune-mumbai-pune" ? 1 : 0,
      ),
    [packages],
  );

  const openDialog = (title: string) => setOpenPackage(title);
  const closeDialog = () => setOpenPackage(null);

  return (
    <>
      <section className="py-4">
        <div className="container-page space-y-6">
          <div className="rounded-2xl border border-[#E2E8F0] bg-white p-5 text-sm text-[#475569] shadow-sm">
            <p className="font-semibold text-[#0F172A]">Package details</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Rates shown are as listed for each package. Toll, parking, and permit charges are extra where applicable.</li>
              <li>Driver allowance and outstation terms are included in the table columns where mentioned.</li>
              <li>Select <span className="font-medium text-[#0F172A]">Book Now</span> on any row to send a booking request for that package.</li>
            </ul>
          </div>

          {ordered.map((pkg: PackageItem) => (
            <details
              key={pkg.id}
              open={pkg.id === "pune-mumbai-pune"}
              className="group overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-sm"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 bg-[#F8FAFC] px-5 py-4 transition-colors hover:bg-[#F1F5F9] sm:px-6">
                <div>
                  <h3 className="font-display text-lg font-bold text-[#0F172A] sm:text-xl">{pkg.title}</h3>
                  <p className="mt-1 text-xs text-[#64748B]">Expand to view vehicle options and package details</p>
                </div>
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#CBD5E1] text-sm font-semibold text-brand-blue transition-transform group-open:rotate-180">
                  ▾
                </span>
              </summary>

              <div className="border-t border-[#E2E8F0] p-4 sm:p-5">
                {pkg.note ? (
                  <p className="mb-3 rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-2 text-sm text-[#475569]">
                    {pkg.note}
                  </p>
                ) : null}

                <div className="overflow-x-auto rounded-xl border border-[#E2E8F0]">
                  <table className="w-full min-w-[720px] border-collapse text-sm">
                    <thead>
                      <tr className="bg-brand-blue text-white">
                        {pkg.columns.map((c: string) => (
                          <th
                            key={c}
                            className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wide whitespace-nowrap sm:px-4"
                          >
                            {c}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {pkg.rows.map((row: string[], i: number) => (
                        <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-[#F8FAFC]"}>
                          {row.map((cell: string, j: number) => {
                            const isAction = j === row.length - 1;
                            const isVehicle = j === 0;
                            return (
                              <td
                                key={j}
                                className={`border-b border-[#E2E8F0] px-3 py-3 align-top text-[#0F172A] sm:px-4 ${
                                  isAction ? "whitespace-nowrap align-middle" : "whitespace-normal"
                                } ${isVehicle ? "font-medium" : ""}`}
                              >
                                {isAction ? (
                                  <AnimatedButton
                                    variant="gold"
                                    size="sm"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      openDialog(pkg.title);
                                    }}
                                    className="min-h-auto px-3 py-1.5 text-xs font-bold"
                                  >
                                    {cell}
                                  </AnimatedButton>
                                ) : (
                                  <span className="block min-w-[6rem] leading-relaxed">{cell || "—"}</span>
                                )}
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="mt-3 text-xs text-[#64748B]">Scroll horizontally to view all columns on smaller screens.</p>
              </div>
            </details>
          ))}
        </div>
      </section>

      {openPackage !== null && (
        <PackageBookingDialog isOpen={true} onClose={closeDialog} packageTitle={openPackage} />
      )}
    </>
  );
}
