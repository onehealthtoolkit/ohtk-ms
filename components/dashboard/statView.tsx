import {
  DocumentIcon,
  DocumentTextIcon,
  UsersIcon,
} from "@heroicons/react/solid";
import { MaskingLoader } from "components/widgets/forms";
import Spinner from "components/widgets/spinner";
import useServices from "lib/services/provider";
import { observer } from "mobx-react";
import { useState } from "react";
import { StatViewModel } from "./statViewModel";

const styles = {
  card: "grid justify-items-center p-4 rounded-xl border-0 border-gray-200",
  text1: "text-lg font-semibold text-slate-500 mb-2",
  text2: "text-3xl font-bold text-slate-800 mr-2",
  icon: "mt-4 w-6 h-6",
};
type StatViewProps = {
  authorityId: number;
};

const StatView: React.FC<StatViewProps> = ({ authorityId }) => {
  const services = useServices();
  const [viewModel] = useState(
    () => new StatViewModel(authorityId, services.dashboardService)
  );
  if (!authorityId) return <Spinner></Spinner>;
  return (
    <MaskingLoader loading={viewModel.isLoading}>
      <div className="grid md:grid-cols-5 gap-6">
        <div className={`${styles.card} bg-green-100`}>
          <div className={styles.text1}>Official</div>
          <div className={styles.text2}>{viewModel.data.officialCount}</div>
          <UsersIcon className={`${styles.icon} text-green-400`} />
        </div>
        <div className={`${styles.card} bg-purple-100`}>
          <div className={styles.text1}>Reporter</div>
          <div className={styles.text2}>{viewModel.data.reporterCount}</div>
          <DocumentTextIcon className={`${styles.icon} text-purple-300`} />
        </div>
        <div className={`${styles.card} bg-red-100`}>
          <div className={styles.text1}>Open Case</div>
          <div className={styles.text2}>{viewModel.data.openCaseCount}</div>
          <DocumentIcon className={`${styles.icon} text-red-600`} />
        </div>
      </div>
    </MaskingLoader>
  );
};

export default observer(StatView);
