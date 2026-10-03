import Link from "next/link";

const cls = "label inline-flex min-h-12 items-center gap-3 border border-gold/60 px-7 text-gold transition-colors hover:bg-gold hover:text-bg";

/** "Download capability statement" when a PDF is set in Settings, otherwise a link to discuss a project. */
export function CapabilityCta({ pdfUrl }: { pdfUrl?: string | null }) {
  if (pdfUrl) {
    return (
      <a href={`${pdfUrl}?dl=`} className={cls}>
        Download capability statement (PDF) <span aria-hidden="true">↓</span>
      </a>
    );
  }
  return (
    <Link href="/contact" className={cls}>
      Discuss your project <span aria-hidden="true">→</span>
    </Link>
  );
}
