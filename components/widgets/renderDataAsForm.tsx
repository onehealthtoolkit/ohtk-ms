/* eslint-disable @next/next/no-img-element */
import { ArrowsExpandIcon, DownloadIcon } from "@heroicons/react/solid";
import Field from "lib/opsvForm/models/fields";
import FilesField from "lib/opsvForm/models/fields/filesField";
import ImagesField from "lib/opsvForm/models/fields/imagesField";
import MultipleChoicesField from "lib/opsvForm/models/fields/multipleChoicesField";
import SingleChoicesField, {
  ChoiceOption,
} from "lib/opsvForm/models/fields/singleChoicesField";
import SubformField from "lib/opsvForm/models/fields/subformField";
import Form from "lib/opsvForm/models/form";
import { Fragment } from "react";
import RenderSubformField from "./renderSubformField";
import { Definition } from "components/admin/formBuilder/shared";
import RenderDataDialog from "./renderDataDialog";
import { RenderDataDialogViewModel } from "./renderDataDialogViewModel";

const re = new RegExp(/\((.*)\.(.*)\)/);

const displayValue = (value: any) => {
  if (value === null || typeof value === "undefined") {
    return "";
  }
  const val: string = value.toString();
  // Could be an url
  if (val.match(/^http/i)) {
    const arr = val.split("/");
    const id = arr[arr.length - 1];
    return (
      <div className="flex">
        <DownloadIcon className="w-5 text-blue-500" />
        <a
          href={val}
          target="_blank"
          rel="noreferrer"
          className="underline hover:bg-blue-100"
        >
          {id}
        </a>
      </div>
    );
  } else {
    return val;
  }
};

export const TR = (props: { label: string; value: string }) => {
  const { label, value } = props;
  return (
    <tr className="flex bg-white border even:bg-slate-50 dark:bg-gray-800 dark:border-gray-700">
      <th
        scope="row"
        className="w-1/4 px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
      >
        {label}
      </th>
      <td className="px-6 py-4">{value}</td>
    </tr>
  );
};

const RowDefinedQuestionFieldValue = ({
  field,
  imageUrlMap,
  fileUrlMap,
}: {
  field: Field;
  imageUrlMap?: Record<string, string>;
  fileUrlMap?: Record<string, string>;
}) => {
  let valueList: string[] = [];

  if (field instanceof MultipleChoicesField) {
    valueList = field.renderedValue.split(",");
  } else if (field instanceof ImagesField) {
    // images renderedValue eg.
    // "7e5db5d9-3260-4a80-a629-5b305ff7ecec, 90915bee-858c-49a0-97df-09337342f6e9"
    valueList = field.renderedValue.split(",").map(value => {
      const url = imageUrlMap && imageUrlMap[value.trim()];
      return url ? url : value;
    });
  } else if (field instanceof FilesField) {
    // files renderedValue eg.
    // "sample-5.m4a (90915bee-858c-49a0-97df-09337342f6e9.m4a), sample-3.mp3 (04dfd7af-fa95-4280-983f-9877ec3ffcca.mp3)"
    valueList = field.renderedValue.split(",").map(value => {
      // each value in FilesField contains filename, uuid and file extension
      const match = re.exec(value.trim());
      if (match) {
        const id = match[1];
        const url = fileUrlMap && fileUrlMap[id];
        return url ? url : value;
      }
      return value;
    });
  } else {
    valueList = [field.renderedValue];
  }

  if (field instanceof SingleChoicesField) {
    return (
      <div className="flex flex-col gap-2">
        {field.options.length > 0 &&
          field.options.map(option => {
            return <Radio key={option.value} field={field} option={option} />;
          })}
      </div>
    );
  } else if (field instanceof MultipleChoicesField) {
    return (
      <div className="flex flex-col gap-2">
        {field.options.length > 0 &&
          field.options.map(option => {
            return <Option key={option.value} field={field} option={option} />;
          })}
      </div>
    );
  }
  return (
    <div className="flex gap-2 m-2">
      <div className="flex-1">
        {valueList.map((value, idx) => (
          <Fragment key={idx}>{displayValue(value)}</Fragment>
        ))}
      </div>
    </div>
  );
};

const RenderSubformFields = ({
  field,
  data,
  imageUrlMap,
  fileUrlMap,
}: {
  field: SubformField;
  data: Definition;
  imageUrlMap?: Record<string, string>;
  fileUrlMap?: Record<string, string>;
}) => {
  const form = field.form?.id
    ? field.form
    : field.form?.subforms.find(item => item.id == field.formRef);
  const subformData = data[field.id || field.name];
  if (!subformData) {
    return null;
  }
  return form ? (
    <>
      {Object.entries(subformData).map((entry, index, { length }) => {
        const [id, data] = entry;
        return typeof data == "object" ? (
          <div
            key={id}
            className={`${index != length - 1 ? "border-b" : undefined}`}
          >
            <RenderSubformField
              form={form}
              data={data as any}
              field={field}
              imageUrlMap={imageUrlMap}
              fileUrlMap={fileUrlMap}
            />
          </div>
        ) : null;
      })}
    </>
  ) : null;
};

export const RenderForms = (props: {
  form: Form;
  data: Record<string, any>;
  imageUrlMap?: Record<string, string>;
  fileUrlMap?: Record<string, string>;
}) => {
  const { form, data, imageUrlMap, fileUrlMap } = props;
  return (
    <>
      {form.sections.map((section, idx) => {
        return (
          <div className="m-4" key={`section-${idx}`}>
            <div className="mb-2">{section.label}</div>
            <table className="table-fixed border text-sm text-left text-gray-500 w-full">
              <tbody>
                {section.questions.map((question, qidx) => {
                  return (
                    <Fragment key={`root-${idx}-${qidx}`}>
                      {question.name && question.display ? (
                        <tr
                          key={`s-${idx}-q-${qidx}`}
                          className="bg-white border-b"
                        >
                          <th
                            scope="row"
                            colSpan={2}
                            className="px-6 py-4 font-medium text-black bg-gray-100 "
                          >
                            <div className="bg-sky-100 p-2 rounded-sm">
                              {question.name}
                            </div>
                          </th>
                        </tr>
                      ) : null}
                      {question.display && (
                        <tr className="bg-white border-b align-text-top">
                          <th
                            scope="row"
                            className="w-2/4 px-6 py-4 font-medium text-gray-900 "
                          >
                            <div className="bg-sky-100 p-2 rounded-sm">
                              {question.label}
                            </div>
                          </th>
                          <td className="px-6 py-4">
                            {question.fields.length == 1 &&
                              question.fields.map((field, fidx) => {
                                return field.display ? (
                                  field instanceof SubformField ? (
                                    <RenderSubformFields
                                      field={field}
                                      data={data}
                                      imageUrlMap={imageUrlMap}
                                      fileUrlMap={fileUrlMap}
                                      key={`s-${idx}-q-${qidx}-f${fidx}`}
                                    ></RenderSubformFields>
                                  ) : (
                                    <RowDefinedQuestionFieldValue
                                      field={field}
                                      imageUrlMap={imageUrlMap}
                                      fileUrlMap={fileUrlMap}
                                      key={`s-${idx}-q-${qidx}-f${fidx}`}
                                    />
                                  )
                                ) : null;
                              })}
                            {question.fields.length > 1 && (
                              <div className="relative overflow-x-auto">
                                <table className="border-collapse border border-slate-100 w-full text-sm text-left text-gray-500">
                                  <tbody>
                                    {question.fields.map((field, fidx) =>
                                      field.display ? (
                                        <tr
                                          key={`s-${idx}-q-${qidx}-f${fidx}`}
                                          className="bg-white border-b"
                                        >
                                          <th
                                            scope="row"
                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                                          >
                                            {field.label || field.name}
                                          </th>
                                          <td className="px-2">
                                            {field instanceof SubformField ? (
                                              <RenderSubformFields
                                                field={field}
                                                data={data}
                                                imageUrlMap={imageUrlMap}
                                                fileUrlMap={fileUrlMap}
                                                key={`s-${idx}-q-${qidx}-f${fidx}`}
                                              ></RenderSubformFields>
                                            ) : (
                                              <RowDefinedQuestionFieldValue
                                                field={field}
                                                imageUrlMap={imageUrlMap}
                                                fileUrlMap={fileUrlMap}
                                              />
                                            )}
                                          </td>
                                        </tr>
                                      ) : null
                                    )}
                                  </tbody>
                                </table>
                              </div>
                            )}
                          </td>
                        </tr>
                      )}
                    </Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        );
      })}
    </>
  );
};

/**
 * New render form data using format in a form definition
 * Sort data in a sequence of sections, questions, and fields
 * @param form
 * @returns <table /> or null if form data is undefined
 */
export const renderDefinitionDataAsForm = (
  form: Form,
  data: Record<string, any>,
  renderDataDialogViewModel: RenderDataDialogViewModel,
  imageUrlMap?: Record<string, string>,
  fileUrlMap?: Record<string, string>
) => {
  return form.sections.length > 0 ? (
    <div className="relative">
      <div
        className={`bg-red absolute top-11 right-3 p-2 z-[1001] hover:bg-gray-50
                      border border-gray-400 rounded bg-white cursor-pointer
                    `}
        onClick={() => renderDataDialogViewModel.open(null)}
      >
        <ArrowsExpandIcon className="w-5 h-5 " />
      </div>
      <div className="max-h-[32rem] inline-block overflow-scroll">
        <RenderForms
          form={form}
          data={data}
          imageUrlMap={imageUrlMap}
          fileUrlMap={fileUrlMap}
        ></RenderForms>
      </div>

      <RenderDataDialog
        viewModel={renderDataDialogViewModel}
        form={form}
        data={data}
        imageUrlMap={imageUrlMap}
        fileUrlMap={fileUrlMap}
      />
    </div>
  ) : null;
};

const Radio = ({
  field,
  option,
}: {
  field: SingleChoicesField;
  option: ChoiceOption;
}) => {
  return (
    <label className="flex items-center ml-2">
      <input
        className="mr-2"
        type={"radio"}
        value={option.value}
        onChange={() => false}
        checked={option.value === field.value}
      />
      {option.label}
      {option.textInput && option.value === field.value && (
        <input
          type="text"
          readOnly={true}
          className="rounded border border-gray-300 bg-gray-50 py-2 px-4 w-full ml-4"
          value={field.text?.toString() || ""}
        />
      )}
    </label>
  );
};

const Option = ({
  field,
  option,
}: {
  field: MultipleChoicesField;
  option: ChoiceOption;
}) => {
  const checkValue = field.valueFor(option.value);
  const text = field.textValueFor(option.value) ?? "";
  return (
    <>
      <label className="flex items-center ml-2">
        <input
          className="mr-2"
          type={"checkbox"}
          readOnly={true}
          value={option.value}
          onChange={() => false}
          checked={checkValue}
        />
        {option.label}
        {option.textInput && checkValue && (
          <input
            type="text"
            readOnly={true}
            className="rounded border border-gray-300 bg-gray-50 py-2 px-4 w-full ml-4"
            value={text}
          />
        )}
      </label>
    </>
  );
};
