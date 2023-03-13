/* eslint-disable @next/next/no-img-element */
import Field from "lib/opsvForm/models/fields";
import ImagesField from "lib/opsvForm/models/fields/imagesField";
import MultipleChoicesField from "lib/opsvForm/models/fields/multipleChoicesField";
import Form from "lib/opsvForm/models/form";
import { parseForm } from "lib/opsvForm/models/json";
import { Fragment, useState } from "react";

type ViewTypeSwitchProps = {
  active: boolean;
  onChange: (active: boolean) => void;
};

const ViewTypeSwitch = ({ active, onChange }: ViewTypeSwitchProps) => {
  return (
    <label
      htmlFor="live-toggle"
      className="inline-flex relative items-center cursor-pointer bg-white rounded-md h-10"
    >
      <span className="mx-2 text-sm font-medium text-gray-900">Raw</span>
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
        after:left-[45px] after:bg-white after:border-gray-300 after:border 
        after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[color:var(--primary-color)]
        "
      ></div>
      <span className="mx-2 text-sm font-medium text-gray-900">Definition</span>
    </label>
  );
};

export const RenderData = ({
  data,
  definition,
}: {
  data?: Record<string, any>;
  definition?: any;
}) => {
  const [isDefinitionView, setIsDefinitionView] = useState(true);

  if (!data) {
    return null;
  }

  if (definition) {
    try {
      const form = parseForm(definition);
      form.loadJsonValue(data);

      return (
        <>
          <div className="float-right">
            <ViewTypeSwitch
              active={isDefinitionView}
              onChange={setIsDefinitionView}
            />
          </div>
          {isDefinitionView ? renderDefinitionData(form) : renderRawData(data)}
        </>
      );
    } catch (e) {
      console.log(e);
      return <p className="text-red-500">Cannot render data by definition</p>;
    }
  }
  return renderRawData(data);
};

/**
 * Render form data using format in a form definition
 * Sort data in a sequence of sections, questions, and fields
 * @param form
 * @returns <table /> or null if form data is undefined
 */
const renderDefinitionData = (form: Form) => {
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

const RowDefinedFieldValue = ({ field }: { field: Field }) => {
  let valueList: string[] = [];

  if (field instanceof MultipleChoicesField || field instanceof ImagesField) {
    valueList = field.renderedValue.split(",");
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
    .filter(
      key =>
        key != "images" && data[key] != null && key.indexOf("__value") === -1
    )
    .map((key: string) => {
      return (
        <tr
          key={key}
          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
        >
          <th
            scope="row"
            className="w-1/4 px-6 py-4 font-medium text-gray-900 dark:text-white"
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
    // Could be an image url
    if (val.match(/\.(png|jpg|jpeg|gif|tif|bmp)$/i)) {
      return (
        <div className="h-14 w-14 border rounded bg-gray-300 relative">
          <img
            src={val}
            alt="attachment"
            className="w-full h-full object-contain"
          />
        </div>
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
