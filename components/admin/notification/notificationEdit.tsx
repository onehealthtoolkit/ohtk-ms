import { CheckIcon, XIcon } from "@heroicons/react/solid";
import { ErrorText, TextInput } from "components/widgets/forms";
import Spinner from "components/widgets/spinner";
import { useState } from "react";

const styles = {
  saveButton:
    "text-sm text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center",
  defaultButton:
    "text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 inline-flex items-center",
  disabledButton:
    "text-sm text-white bg-blue-400 dark:bg-blue-500 cursor-not-allowed font-medium rounded-lg inline-flex",
};
type SaveResult = {
  success: boolean;
  msg: string;
};
type Props = {
  title: string;
  defaultValue?: string;
  indicator?: boolean;
  onSave: (value: string) => Promise<SaveResult>;
};
const NotificationEdit = ({
  title,
  defaultValue,
  onSave,
  indicator = false,
}: Props) => {
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>();
  const [editing, setEditing] = useState<boolean>(false);
  const [oldValue, setOldValue] = useState<string | undefined>(defaultValue);
  const [value, setValue] = useState<string | undefined>(defaultValue);
  const [errorText, serErrorText] = useState<string | undefined>();
  return (
    <div className="w-full md:w-auto grid gap-6 mb-2 grid-cols-3">
      <div className="py-3 px-6 font-bold text-xs text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        {title}
      </div>
      <div>
        <TextInput
          type="text"
          placeholder="To"
          className=""
          onChange={evt => {
            setEditing(true);
            setValue(evt.target.value);
          }}
          disabled={submitting}
          value={value}
        />
        <ErrorText>{errorText}</ErrorText>
      </div>
      <div className="flex h-9">
        <button
          disabled={!editing}
          type="button"
          className={`py-2 px-5 mr-2 ${
            editing ? styles.saveButton : styles.disabledButton
          }`}
          onClick={() => {
            if (onSave) {
              setSubmitting(true);
              onSave(value || "").then(result => {
                setSuccess(result.success);
                if (result.success) {
                  setOldValue(value);
                  setEditing(false);
                } else {
                  serErrorText(result.msg);
                }
                setSubmitting(false);
              });
            }
          }}
        >
          {submitting === true && <Spinner />}
          {indicator && success === true && (
            <CheckIcon className="mr-2 -ml-1 w-6 h-6 text-green-800" />
          )}
          {indicator && success === false && (
            <XIcon className="mr-2 -ml-1 w-6 h-6 text-red-800" />
          )}
          Save
        </button>
        <button
          type="button"
          className={`py-2 px-5 mr-2 ${styles.defaultButton}`}
          onClick={() => {
            setValue(oldValue);
            setEditing(false);
            setSuccess(undefined);
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default NotificationEdit;