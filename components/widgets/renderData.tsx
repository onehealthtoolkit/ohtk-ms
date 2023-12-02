/* eslint-disable @next/next/no-img-element */
import { DownloadIcon } from "@heroicons/react/solid";
import Field from "lib/opsvForm/models/fields";
import FilesField from "lib/opsvForm/models/fields/filesField";
import ImagesField from "lib/opsvForm/models/fields/imagesField";
import MultipleChoicesField from "lib/opsvForm/models/fields/multipleChoicesField";
import Form from "lib/opsvForm/models/form";
import { parseForm } from "lib/opsvForm/models/json";
import { Fragment, useId, useState } from "react";
import { renderDefinitionDataAsForm } from "./renderDataAsForm";
import { RenderDataDialogViewModel } from "./renderDataDialogViewModel";

type ViewTypeSwitchProps = {
  active: boolean;
  onChange: (active: boolean) => void;
};

const ViewTypeSwitch = ({ active, onChange }: ViewTypeSwitchProps) => {
  const id = useId();
  return (
    <label
      htmlFor={id}
      className="inline-flex relative items-center cursor-pointer bg-white rounded-md h-10"
    >
      <span className="mx-2 text-sm font-medium text-gray-900">Raw</span>
      <input
        type="checkbox"
        value=""
        id={id}
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
        after:left-[45px] after:bg-white after:border-gray-300 after:border 
        after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600
        "
      ></div>
      <span className="mx-2 text-sm font-medium text-gray-900">Definition</span>
    </label>
  );
};

type RenderDataType = {
  data?: Record<string, any>;
  definition?: any;
  imageUrlMap?: Record<string, string>; // {uuid: url}
  fileUrlMap?: Record<string, string>; // {uuid: url}
};

export const RenderData = ({
  data,
  definition,
  imageUrlMap,
  fileUrlMap,
}: RenderDataType) => {
  if (!data) {
    return null;
  }

  if (definition) {
    try {
      const form = parseForm(definition);
      form.loadJsonValue(data);

      return (
        <RenderFormData
          form={form}
          data={data}
          imageUrlMap={imageUrlMap}
          fileUrlMap={fileUrlMap}
        ></RenderFormData>
      );
    } catch (e) {
      console.log(e);
      return <p className="text-red-500">Cannot render data by definition</p>;
    }
  }
  return renderRawData(data);
};

export const RenderFormData = ({
  form,
  data,
  imageUrlMap,
  fileUrlMap,
}: {
  form: Form;
  data: Record<string, any>;
  imageUrlMap?: Record<string, string>;
  fileUrlMap?: Record<string, string>;
}) => {
  const [isDefinitionView, setIsDefinitionView] = useState(true);
  const [renderDataDialogViewModel] = useState<RenderDataDialogViewModel>(
    new RenderDataDialogViewModel()
  );
  const renderAsForm = true;
  try {
    return (
      <>
        <div className="float-right">
          <ViewTypeSwitch
            active={isDefinitionView}
            onChange={setIsDefinitionView}
          />
        </div>
        {isDefinitionView
          ? renderAsForm
            ? renderDefinitionDataAsForm(
                form,
                data,
                renderDataDialogViewModel,
                imageUrlMap,
                fileUrlMap
              )
            : renderDefinitionData(form, imageUrlMap, fileUrlMap)
          : renderRawData(data)}
      </>
    );
  } catch (e) {
    console.log(e);
    return <p className="text-red-500">Cannot render data by definition</p>;
  }
};

/**
 * Render form data using format in a form definition
 * Sort data in a sequence of sections, questions, and fields
 * @param form
 * @returns <table /> or null if form data is undefined
 */
const renderDefinitionData = (
  form: Form,
  imageUrlMap?: Record<string, string>,
  fileUrlMap?: Record<string, string>
) => {
  return form.sections.length > 0 ? (
    <table className="table-fixed border text-sm text-left text-gray-500 w-full">
      <tbody>
        {form.sections.map((section, idx) => {
          return section.questions.map((question, qidx) => {
            return (
              <Fragment key={`root-${idx}-${qidx}`}>
                {question.name && question.display ? (
                  <tr key={`s-${idx}-q-${qidx}`} className="bg-white border-b">
                    <th
                      scope="row"
                      colSpan={2}
                      className="px-6 py-4 font-medium text-black bg-gray-100 "
                    >
                      {question.name}
                    </th>
                  </tr>
                ) : null}
                {question.display &&
                  question.fields
                    // .filter(item => item.name != "images")
                    .map((field, fidx) => {
                      return field.display ? (
                        <RowDefinedFieldValue
                          field={field}
                          imageUrlMap={imageUrlMap}
                          fileUrlMap={fileUrlMap}
                          key={`s-${idx}-q-${qidx}-f${fidx}`}
                        />
                      ) : null;
                    })}
              </Fragment>
            );
          });
        })}
      </tbody>
    </table>
  ) : null;
};

const re = new RegExp(/\((.*)\.(.*)\)/);

const RowDefinedFieldValue = ({
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

  return (
    <tr className="bg-white border-b">
      <th scope="row" className="w-1/4 px-6 py-4 font-medium text-gray-900 ">
        {field.name}
      </th>
      <td className="px-6 py-4">
        {valueList.map((value, idx) => (
          <Fragment key={idx}>{displayValue(value)}</Fragment>
        ))}
      </td>
    </tr>
  );
};

/**
 * Render data in key/value format
 * @param data
 * @returns <table /> or null if form data is undefined
 */
const renderRawData = (data: Record<string, any>) => {
  if (!data) {
    return null;
  }

  return (
    <table className="table-fixed border w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <tbody>{renderItem(data)}</tbody>
    </table>
  );
};

const renderItem = (data: Record<string, any>) => {
  return Object.keys(data)
    .sort()
    .filter(key => data[key] != null && key.indexOf("__value") === -1)
    .map((key: string) => {
      return (
        <tr
          key={key}
          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
        >
          <th
            scope="row"
            className="w-1/4 px-6 py-4 font-medium text-gray-900 dark:text-white break-words"
          >
            {key}
          </th>
          <td className="px-6 py-4">{displayValue(data[key])}</td>
        </tr>
      );
    });
};

const displayValue = (value: any) => {
  if (typeof value != "object") {
    if (value === null || typeof value === "undefined") {
      return "";
    }
    const val: string = value.toString();
    // Could be an url
    if (val.match(/^http/i)) {
      const arr = val.split("/");
      const id = arr[arr.length - 1];
      return (
        <p className="flex">
          <DownloadIcon className="w-5 text-blue-500" />
          <a
            href={val}
            target="_blank"
            rel="noreferrer"
            className="underline hover:bg-blue-100"
          >
            {id}
          </a>
        </p>
      );
    } else {
      return <p>{val}</p>;
    }
  } else {
    return renderRawData(value);
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
