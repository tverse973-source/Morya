"use client";

import { useState } from "react";
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

  const openDialog = (title: string) => setOpenPackage(title);
  const closeDialog = () => setOpenPackage(null);

  return (
    <>
      <section className="py-4">
        <div className="container-page space-y-4">
          {[...packages].sort((a: PackageItem, b: PackageItem) => (a.id === "pune-mumbai-pune" ? -1 : b.id === "pune-mumbai-pune" ? 1 : 0)).map((pkg: PackageItem) => (
            <details key={pkg.id} open={pkg.id === "pune-mumbai-pune"} className="group rounded-xl border border-[#E2E8F0] bg-white overflow-hidden">
              <summary className="cursor-pointer list-none px-6 py-4 flex items-center justify-between bg-[#F8FAFC] hover:bg-[#F1F5F9] transition-colors">
                <h3 className="text-lg font-display font-bold text-[#0F172A]">{pkg.title}</h3>
                <span className="text-brand-blue text-sm font-semibold group-open:rotate-180 transition-transform">▾</span>
              </summary>
              <div className="overflow-x-auto p-4">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-brand-blue text-white">
                      {pkg.columns.map((c: string) => (
                        <th key={c} className="px-3 py-2 text-left font-semibold whitespace-nowrap">{c}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {pkg.rows.map((row: string[], i: number) => (
                      <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-[#F8FAFC]"}>
                        {row.map((cell: string, j: number) => (
                          <td key={j} className="px-3 py-2 border-b border-[#E2E8F0] whitespace-nowrap text-[#0F172A]">
                            {j === row.length - 1 ? (
                              <AnimatedButton
                                variant="gold"
                                size="sm"
                                onClick={(e) => {
                                  e.preventDefault();
                                  openDialog(pkg.title);
                                }}
                                className="px-3 py-1 text-xs font-bold min-h-auto"
                              >
                                {cell}
                              </AnimatedButton>
                            ) : (
                              cell
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </details>
          ))}
        </div>
      </section>

      {openPackage !== null && <PackageBookingDialog isOpen={true} onClose={closeDialog} packageTitle={openPackage} />}
    </>
  );
}
