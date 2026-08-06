import DetailBreadcrumb, {
  shortEntityId,
} from "components/layout/detailBreadcrumb";
import { useTranslation } from "react-i18next";

export type CaseBreadcrumbProps = {
  caseId: string;
  reportTypeName?: string;
  authorityName?: string;
};

/** @deprecated use shortEntityId — kept for existing imports */
export const shortCaseId = shortEntityId;

/**
 * Case detail breadcrumb — same chrome as report detail.
 */
const CaseBreadcrumb = ({
  caseId,
  reportTypeName,
  authorityName,
}: CaseBreadcrumbProps) => {
  const { t } = useTranslation();
  return (
    <DetailBreadcrumb
      parentLabel={t("breadcrumb.cases", "Cases")}
      parentHref="/cases"
      entityId={caseId}
      reportTypeName={reportTypeName}
      authorityName={authorityName}
    />
  );
};

export default CaseBreadcrumb;
