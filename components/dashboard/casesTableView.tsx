import Spinner from "components/widgets/spinner";
import { observer } from "mobx-react";

type CasesTableViewProps = {
  authorityId: number;
};

const CasesTableView: React.FC<CasesTableViewProps> = ({ authorityId }) => {
  if (!authorityId) return <Spinner></Spinner>;
  return <div>CasesTableView</div>;
};

export default observer(CasesTableView);
