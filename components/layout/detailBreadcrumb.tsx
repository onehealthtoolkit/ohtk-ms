import Link from "next/link";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

export type DetailBreadcrumbProps = {
  parentLabel: string;
  parentHref: string;
  entityId: string;
  /** Optional context after short id, e.g. report type · authority · village */
  reportTypeName?: string;
  authorityName?: string;
  villageName?: string;
};

/** Short id = first 6 hex chars of UUID (case/report detail chrome). */
export function shortEntityId(entityId: string): string {
  const raw = (entityId || "").replace(/-/g, "");
  return raw.slice(0, 6) || entityId.slice(0, 6);
}

/**
 * Detail breadcrumb — navy bar, short #id, optional type · authority, copy full ID.
 * Shared by case and report detail screens.
 */
const DetailBreadcrumb = ({
  parentLabel,
  parentHref,
  entityId,
  reportTypeName,
  authorityName,
  villageName,
}: DetailBreadcrumbProps) => {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);
  const short = shortEntityId(entityId);

  const contextParts = [reportTypeName, authorityName, villageName].filter(
    (p): p is string => !!(p && p.trim())
  );
  const contextLabel = contextParts.join(" · ");

  const onCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(entityId);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      try {
        const el = document.createElement("textarea");
        el.value = entityId;
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
  }, [entityId]);

  return (
    <nav
      className="mb-0 flex min-h-[52px] items-center gap-3 rounded-t-lg bg-[#13396B] px-[22px] py-2.5 text-white"
      aria-label="Breadcrumb"
    >
      <ol className="flex min-w-0 flex-1 flex-wrap items-center gap-3">
        <li className="inline-flex items-center">
          <Link href={parentHref} legacyBehavior>
            <a className="text-base font-medium text-[#C3D3EA] hover:text-white hover:underline">
              {parentLabel}
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
        title={entityId}
        className="shrink-0 rounded-md border border-white/20 bg-white/10 px-3 py-1.5 text-sm font-medium text-[#C3D3EA] hover:bg-white/20 hover:text-white"
      >
        {copied
          ? t("case.breadcrumb.copied", "Copied")
          : t("case.breadcrumb.copyId", "Copy full ID")}
      </button>
    </nav>
  );
};

export default DetailBreadcrumb;
