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
  const fieldExtension = field.getExtension<"text">();
  return (
    <div className="w-full mt-4 flex flex-col items-stretch">
      <div className="flex md:flex-row flex-col space-x-2 text-sm">
        <div className="md:w-1/3 w-full">
          <h4 className="text-sm text-gray-600">Minimum length</h4>
          <input
            className="border border-gray-200 py-2 px-4 w-full rounded-sm"
            type={"number"}
            value={fieldExtension.minLength}
            onChange={e => fieldExtension.setMinLength(e.target.value)}
          />
        </div>
        <div className="md:w-1/3 w-full">
          <h4 className="text-sm text-gray-600">Maximum length</h4>
          <input
            className="border border-gray-200 py-2 px-4 w-full rounded-sm"
            type={"number"}
            value={fieldExtension.maxLength}
            onChange={e => fieldExtension.setMaxLength(e.target.value)}
          />
        </div>
        <div className="md:w-1/3 w-full">
          <h4 className="text-sm text-gray-600">&nbsp;</h4>
          <label
            htmlFor="scan-toggle"
            className="inline-flex relative items-center cursor-pointer"
          >
            <input
              type="checkbox"
              value=""
              id="scan-toggle"
              className="sr-only peer"
              checked={fieldExtension.scan}
              onChange={() => fieldExtension.toggleScan()}
            />
            <div
              className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 
            peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full 
            peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] 
            after:left-[2px] after:bg-white after:border-gray-300 after:border 
            after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600
            "
            ></div>
            <span className="ml-2 text-sm font-medium text-gray-900">
              Scannable
            </span>
          </label>
          <small className="block text-gray-500">
            Use detected value from QR Code scanner
          </small>
        </div>
      </div>
      <FieldActionBar value={field} onDelete={onDelete}>
        {field => <AdvanceCondition viewModel={field} />}
      </FieldActionBar>
    </div>
  );
};

export const TextField = observer(Field);
