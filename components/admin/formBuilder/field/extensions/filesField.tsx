import {
  FieldActionBar,
  FieldViewModel,
} from "components/admin/formBuilder/field";
import { AdvanceCondition } from "components/admin/formBuilder/shared";
import { observer } from "mobx-react";
import { FC } from "react";

type Props = {
  value: FieldViewModel;
  onDelete: (id: string) => void;
};

const Field: FC<Props> = ({ value: field, onDelete }) => {
  const fieldExtension = field.getExtension<"files">();
  return (
    <div className="w-full mt-4 flex flex-col items-stretch">
      <div className="flex text-sm">
        <div className="w-1/2 pr-2">
          Minimum amount
          <input
            className="border border-gray-200 py-2 px-4 w-full rounded-sm"
            type={"number"}
            value={fieldExtension.minValue}
            onChange={e => fieldExtension.setMinValue(e.target.value)}
          />
        </div>
        <div className="w-1/2 pl-2">
          Maximum amount
          <input
            className="border border-gray-200 py-2 px-4 w-full rounded-sm"
            type={"number"}
            value={fieldExtension.maxValue}
            onChange={e => fieldExtension.setMaxValue(e.target.value)}
          />
        </div>
      </div>
      <div className="flex text-sm py-3">
        <div className="w-1/2 pr-2">
          Maximum size (Bytes) per file
          <input
            className="border border-gray-200 py-2 px-4 w-full rounded-sm"
            type={"number"}
            value={fieldExtension.maxFileSize}
            onChange={e => fieldExtension.setMaxFileSize(e.target.value)}
          />
          <small className="text-gray-500">
            Leave blank, which you shouldn&apos;t, for unlimited file size
          </small>
        </div>
      </div>
      <div className="w-full text-sm py-3">
        <label htmlFor={"allowAudioFiles"} className="flex items-center px-2">
          <input
            id={"allowAudioFiles"}
            className="w-4 h-4"
            type={"checkbox"}
            checked={fieldExtension.allowAudioFiles}
            onChange={event =>
              fieldExtension.setAllowAudioFiles(event.target.checked)
            }
          />
          <span className="pl-2">Allow audio files</span>
        </label>
        <p className="pl-8 text-gray-400 text-xs italic">
          {fieldExtension.audioTypes.join(", ")}
        </p>
      </div>
      <div className="w-full text-sm py-3">
        <label htmlFor={"allowVideoFiles"} className="flex items-center px-2">
          <input
            id={"allowVideoFiles"}
            className="w-4 h-4"
            type={"checkbox"}
            checked={fieldExtension.allowVideoFiles}
            onChange={event =>
              fieldExtension.setAllowVideoFiles(event.target.checked)
            }
          />
          <span className="pl-2">Allow video files</span>
        </label>
        <p className="pl-8 text-gray-400 text-xs italic">
          {fieldExtension.videoTypes.join(", ")}
        </p>
      </div>
      <div className="w-full text-sm py-3">
        <label
          htmlFor={"allowDocumentFiles"}
          className="flex items-center px-2"
        >
          <input
            id={"allowDocumentFiles"}
            className="w-4 h-4"
            type={"checkbox"}
            checked={fieldExtension.allowDocumentFiles}
            onChange={event =>
              fieldExtension.setAllowDocumentFiles(event.target.checked)
            }
          />
          <span className="pl-2">Allow document files</span>
        </label>
        <p className="pl-8 text-gray-400 text-xs italic">
          {fieldExtension.documentTypes.join(", ")}
        </p>
      </div>
      <FieldActionBar value={field} onDelete={onDelete}>
        {field => <AdvanceCondition viewModel={field} />}
      </FieldActionBar>
    </div>
  );
};

export const FilesField = observer(Field);
