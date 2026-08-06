import DetailBreadcrumb from "components/layout/detailBreadcrumb";
import { useTranslation } from "react-i18next";

export type ReportBreadcrumbProps = {
  reportId: string;
  reportTypeName?: string;
  authorityName?: string;
  villageName?: string;
};

const ReportBreadcrumb = ({
  reportId,
  reportTypeName,
  authorityName,
  villageName,
}: ReportBreadcrumbProps) => {
  const { t } = useTranslation();
  return (
    <DetailBreadcrumb
      parentLabel={t("breadcrumb.reports", "Reports")}
      parentHref="/reports"
      entityId={reportId}
      reportTypeName={reportTypeName}
      authorityName={authorityName}
      villageName={villageName}
    />
  );
};

export default ReportBreadcrumb;
