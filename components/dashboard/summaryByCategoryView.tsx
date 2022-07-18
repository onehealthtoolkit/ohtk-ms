import Spinner from "components/widgets/spinner";
import { observer } from "mobx-react";

type SummaryByCategoryViewProps = {
  authorityId: number;
};

const SummaryByCategoryView: React.FC<SummaryByCategoryViewProps> = ({
  authorityId,
}) => {
  if (!authorityId) return <Spinner></Spinner>;
  return <div>SummaryByCategoryView</div>;
};

export default observer(SummaryByCategoryView);
