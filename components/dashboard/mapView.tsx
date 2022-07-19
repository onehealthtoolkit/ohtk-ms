import { MaskingLoader } from "components/widgets/forms";
import Spinner from "components/widgets/spinner";
import useServices from "lib/services/provider";
import { observer } from "mobx-react";
import { useState } from "react";
import { MapViewModel } from "./mapViewModel";

type MapViewProps = {
  authorityId: number;
};
const MapView: React.FC<MapViewProps> = ({ authorityId }) => {
  const services = useServices();
  const [viewModel] = useState(
    new MapViewModel(authorityId, services.dashboardService)
  );
  if (!authorityId) return <Spinner></Spinner>;
  return (
    <MaskingLoader loading={viewModel.isLoading}>
      <>
        <p className="text-md dark:text-gray-400">MapView</p>
        <div className="flex pt-2 pb-4">
          <div className="rounded-lg border border-gray-200 shadow-md  w-full h-40"></div>
        </div>
      </>
    </MaskingLoader>
  );
};

export default observer(MapView);
