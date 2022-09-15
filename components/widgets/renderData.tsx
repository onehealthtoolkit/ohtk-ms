import Form from "lib/opsvForm/models/form";
import { parseForm } from "lib/opsvForm/models/json";

/* eslint-disable @next/next/no-img-element */
export const renderData = (data: Record<string, any>, definition?: any) => {
  if (!data) {
    return null;
  }

  if (definition) {
    try {
      const form = parseForm(definition);
      form.loadJsonValue(data);

      return renderDefinitionData(form, data);
    } catch (e) {
      console.log(e);
      return <p className="text-red-500">Cannot render data by definition</p>;
    }
  }
  return renderNameValueData(data);
};

/**
 * Render form data using format in a form definition
 * Sort data in a sequence of sections, questions, and fields
 * @param form
 * @returns <table /> or null if form data is undefined
 */
const renderDefinitionData = (form: Form, data: Record<string, any>) => {
  return form.sections.length > 0 ? (
    <table className="table-fixed border text-sm text-left text-gray-500">
      <tbody>
        {form.sections.map((section, idx) => {
          return section.questions.map((question, qidx) => {
            return (
              <>
                {question.name ? (
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
                {question.fields.map((field, fidx) => {
                  return (
                    <tr
                      key={`s-${idx}-q-${qidx}-f${fidx}`}
                      className="bg-white border-b"
                    >
                      <th
                        scope="row"
                        className="w-1/4 px-6 py-4 font-medium text-gray-900 "
                      >
                        {field.name}
                      </th>
                      <td className="px-6 py-4">
                        {question.name
                          ? displayValue(data[question.name!][field.name])
                          : displayValue(data[field.name])}
                      </td>
                    </tr>
                  );
                })}
              </>
            );
          });
        })}
      </tbody>
    </table>
  ) : null;
};

/**
 * Render data in key/value format
 * @param data
 * @returns <table /> or null if form data is undefined
 */
const renderNameValueData = (data: Record<string, any>) => {
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
    .filter(key => key != "images" && data[key] != null)
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
      return val;
    }
  } else {
    return renderNameValueData(value);
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
