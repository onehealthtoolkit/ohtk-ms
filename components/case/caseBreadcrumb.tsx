import Link from "next/link";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

export type CaseBreadcrumbProps = {
  caseId: string;
  /** Report type name, e.g. Animal Sick/Death */
  reportTypeName?: string;
  /** Primary authority name */
  authorityName?: string;
};

/** Short id = first 6 characters of the UUID (design handoff). */
export function shortCaseId(caseId: string): string {
  const raw = (caseId || "").replace(/-/g, "");
  return raw.slice(0, 6) || caseId.slice(0, 6);
}

/**
 * Case detail breadcrumb — design_handoff_lahis_case_screen § Shell.
 * Cases → short id · type · authority + Copy full ID.
 */
const CaseBreadcrumb = ({
  caseId,
  reportTypeName,
  authorityName,
}: CaseBreadcrumbProps) => {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);
  const short = shortCaseId(caseId);

  const contextParts = [reportTypeName, authorityName].filter(
    (p): p is string => !!(p && p.trim())
  );
  const contextLabel = contextParts.join(" · ");

  const onCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(caseId);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      // Fallback for older browsers / insecure context
      try {
        const el = document.createElement("textarea");
        el.value = caseId;
        el.setAttribute("readonly", "");
        el.style.position = "absolute";
        el.style.left = "-9999px";
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1600);
      } catch {
        /* ignore */
      }
    }
  }, [caseId]);

  return (
    <nav
      className="mb-0 flex min-h-[52px] items-center gap-3 rounded-t-lg px-[22px] py-2.5 text-white bg-[#13396B]"
      aria-label="Breadcrumb"
    >
      <ol className="flex min-w-0 flex-1 flex-wrap items-center gap-3">
        <li className="inline-flex items-center">
          <Link href="/cases" legacyBehavior>
            <a className="text-base font-medium text-[#C3D3EA] hover:text-white hover:underline">
              {t("breadcrumb.cases", "Cases")}
            </a>
          </Link>
        </li>
        <li className="select-none text-base text-[#5F7FAE]" aria-hidden="true">
          /
        </li>
        <li
          className="inline-flex min-w-0 items-center gap-3"
          aria-current="page"
        >
          <span className="text-base font-semibold text-white">#{short}</span>
          {contextLabel ? (
            <>
              <span className="text-base text-[#5F7FAE]" aria-hidden="true">
                ·
              </span>
              <span className="truncate text-base font-normal text-[#C3D3EA]">
                {contextLabel}
              </span>
            </>
          ) : null}
        </li>
      </ol>
      <button
        type="button"
        onClick={onCopy}
        title={caseId}
        className="shrink-0 rounded-md border border-white/20 bg-white/10 px-3 py-1.5 text-sm font-medium text-[#C3D3EA] hover:bg-white/20 hover:text-white"
      >
        {copied
          ? t("case.breadcrumb.copied", "Copied")
          : t("case.breadcrumb.copyId", "Copy full ID")}
      </button>
    </nav>
  );
};

export default CaseBreadcrumb;
