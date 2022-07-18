import Spinner from "components/widgets/spinner";
import { observer } from "mobx-react";

type MapViewProps = {
  authorityId: number;
};
const MapView: React.FC<MapViewProps> = ({ authorityId }) => {
  if (!authorityId) return <Spinner></Spinner>;
  return <div>MapView</div>;
};

export default observer(MapView);
