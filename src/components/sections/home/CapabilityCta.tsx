import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";

const pill =
  "inline-flex min-h-12 items-center gap-3 rounded-full bg-accent py-2 pr-2 pl-6 text-[15px] font-semibold text-white hover:bg-[#2232c4]";
const icon = "flex size-8 items-center justify-center rounded-full bg-white text-accent";

/** "Download capability statement" when a PDF is set in Settings, otherwise a link to discuss a project. */
export function CapabilityCta({ pdfUrl }: { pdfUrl?: string | null }) {
  if (pdfUrl) {
    return (
      <a href={`${pdfUrl}?dl=`} className={pill}>
        Download capability statement (PDF)
        <span className={icon}>
          <Download className="size-4" aria-hidden="true" />
        </span>
      </a>
    );
  }
  return (
    <Link href="/contact" className={pill}>
      Discuss your project
      <span className={icon}>
        <ArrowRight className="size-4" aria-hidden="true" />
      </span>
    </Link>
  );
}
