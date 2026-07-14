import CensusDefinitionUpdate from "components/admin/censusDefinition/update";
import Protect from "components/auth/protect";
import Breadcrumb from "components/layout/breadcrumb";
import Layout from "components/layout";
import Spinner from "components/widgets/spinner";
import { CensusKind } from "lib/services/census";
import { Store } from "lib/store";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

const isCensusKind = (value: unknown): value is CensusKind =>
  value === "ANIMAL" || value === "HUMAN";

const AdminCensusDefinitionUpdatePage: NextPage = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const { kind } = router.query;

  if (!router.isReady) {
    return <Spinner />;
  }

  if (!isCensusKind(kind)) {
    return (
      <Protect guard={(store: Store) => store.isSuperUser}>
        <Layout>
          <Breadcrumb
            crumbs={[
              {
                text: t("breadcrumb.censusDefinition", "Census Definition"),
                href: "/admin/census_definitions",
              },
              { text: t("breadcrumb.update", "Update") },
            ]}
          />
          <div className="rounded border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {t("censusDefinition.invalidKind", "Unknown census definition.")}
          </div>
        </Layout>
      </Protect>
    );
  }

  return (
    <Protect guard={(store: Store) => store.isSuperUser}>
      <Layout>
        <Breadcrumb
          crumbs={[
            {
              text: t("breadcrumb.censusDefinition", "Census Definition"),
              href: "/admin/census_definitions",
            },
            { text: t(`censusDefinition.kind.${kind}`, kind) },
            { text: t("breadcrumb.update", "Update") },
          ]}
        />
        <CensusDefinitionUpdate kind={kind} />
      </Layout>
    </Protect>
  );
};

export default AdminCensusDefinitionUpdatePage;
