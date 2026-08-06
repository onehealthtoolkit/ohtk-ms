import DetailBreadcrumb from "components/layout/detailBreadcrumb";
import { useTranslation } from "react-i18next";

export type ReportBreadcrumbProps = {
  reportId: string;
  reportTypeName?: string;
  authorityName?: string;
};

const ReportBreadcrumb = ({
  reportId,
  reportTypeName,
  authorityName,
}: ReportBreadcrumbProps) => {
  const { t } = useTranslation();
  return (
    <DetailBreadcrumb
      parentLabel={t("breadcrumb.reports", "Reports")}
      parentHref="/reports"
      entityId={reportId}
      reportTypeName={reportTypeName}
      authorityName={authorityName}
    />
  );
};

export default ReportBreadcrumb;
