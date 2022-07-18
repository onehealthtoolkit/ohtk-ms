import Spinner from "components/widgets/spinner";
import { observer } from "mobx-react";

type StatViewProps = {
  authorityId: number;
};
const StatView: React.FC<StatViewProps> = ({ authorityId }) => {
  if (!authorityId) return <Spinner></Spinner>;
  return <div>StatView</div>;
};

export default observer(StatView);
