import { OutbreakZone } from "components/case/caseViewModel";
import { ReportMapDialogViewModel } from "components/case/reportMapDialogViewModel";
import BaseMapModalDialog from "components/widgets/dialogs/baseMapModalDialog";
import Spinner from "components/widgets/spinner";
import { toJS } from "mobx";
import { observer } from "mobx-react";
import dynamic from "next/dynamic";
import { PropsWithChildren, useState } from "react";

const ReportMap = dynamic(() => import("./reportMap"), {
  loading: () => <p>A map is loading</p>,
  ssr: false,
});

type ReportMapDialogProps = {
  viewModel?: ReportMapDialogViewModel;
  onClose?: () => void;
  lnglat?: string | null;
  zones?: OutbreakZone[];
};

type SwitchProps = {
  label: string;
  active: boolean;
  onChange: (active: boolean) => void;
};

const Switch = ({ label, active, onChange }: SwitchProps) => {
  return (
    <label
      htmlFor="live-toggle"
      className="inline-flex relative items-center cursor-pointe h-10 px-3"
    >
      <input
        type="checkbox"
        value=""
        id="live-toggle"
        className="sr-only peer"
        checked={active}
        onChange={e => {
          onChange(e.target.checked);
        }}
      />
      <div
        className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 
        peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full 
        peer-checked:after:border-white after:content-[''] after:absolute after:top-[10px] 
        after:left-[14px] after:bg-white after:border-gray-300 after:border 
        after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600
        "
      ></div>
      <span className="ml-3 text-sm font-medium text-gray-900">{label}</span>
    </label>
  );
};

const ReportMapDialog: React.FC<PropsWithChildren<ReportMapDialogProps>> = ({
  viewModel,
  onClose,
  lnglat,
  zones,
}) => {
  const [screen, setScreen] = useState(false);

  if (!viewModel) {
    return null;
  }

  return (
    <BaseMapModalDialog
      store={viewModel}
      renderContent={() => (
        <div className="w-full h-full relative">
          {/* a map */}
          {screen ? (
            <>
              <ReportMap
                lnglat={lnglat}
                zones={zones}
                showZones={toJS(viewModel.showZones)}
                places={toJS(viewModel.places)}
              />

              <div
                className="absolute top-4 right-4 z-[1001] flex flex-row gap-2 
                  border-2 border-gray-300 rounded-md bg-white
                "
              >
                {zones && zones.length > 0 && (
                  <>
                    <Switch
                      label="Outbreak zones"
                      active={viewModel.showZones}
                      onChange={() => {
                        viewModel.toggleZonesView();
                      }}
                    />
                    <div className="h-auto my-2 w-[1px] border-l-2 border-gray-200"></div>
                  </>
                )}
              </div>
            </>
          ) : (
            <div className="flex flex-col justify-center items-center h-full">
              <div
                className="flex flex-col justify-center items-center
                bg-gray-50 border-2 border-gray-200 rounded-md p-4"
              >
                <p>Loading map</p>
                <Spinner />
              </div>
            </div>
          )}
        </div>
      )}
      renderAction={() => null}
      onClose={onClose}
      onOpen={() => {
        setTimeout(() => {
          // Fix issue when leaflet map is inside dialog, map renders partially.
          setScreen(true);
        }, 100);
      }}
    />
  );
};

export default observer(ReportMapDialog);
