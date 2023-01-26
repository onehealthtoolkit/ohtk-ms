import BaseModalDialog from "components/widgets/dialogs/baseModalDialog";
import { ModalDialogViewModel } from "lib/dialogViewModel";
import { ReportType } from "lib/services/reportType";
import { QRCodeSVG } from "qrcode.react";
import { ReactElement } from "react";

type Props<TData> = {
  store: ModalDialogViewModel | undefined;
  title?: string;
  content: (data?: TData) => ReactElement;
};

type QrDataType = {
  record: ReportType;
};

const QrcodeDialog = <TData extends QrDataType>({
  store,
  title,
  content,
}: Props<TData>) => {
  return (
    <BaseModalDialog
      store={store}
      title={title}
      renderContent={(data?: TData) => (
        <div className="p-4 text-lg flex flex-col items-center">
          {content(data)}
          {data && data.record ? (
            <QRCodeSVG value={data.record.id} size={250} />
          ) : (
            <p className="text-red-500">Error generate QR code</p>
          )}
        </div>
      )}
    />
  );
};

export default QrcodeDialog;
