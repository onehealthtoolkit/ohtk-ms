import { FormDateField } from "components/formRenderer/dateField";
import { FormDecimalField } from "components/formRenderer/decimalField";
import { FormIntegerField } from "components/formRenderer/integerField";
import { FormMultipleChoicesField } from "components/formRenderer/multipleChoicesField";
import { FormSingleChoicesField } from "components/formRenderer/singleChoicesField";
import { FormTextField } from "components/formRenderer/textField";
import Field from "lib/opsvForm/models/fields";
import DateField from "lib/opsvForm/models/fields/dateField";
import DecimalField from "lib/opsvForm/models/fields/decimalField";
import IntegerField from "lib/opsvForm/models/fields/integerField";
import LocationField from "lib/opsvForm/models/fields/locationField";
import MultipleChoicesField from "lib/opsvForm/models/fields/multipleChoicesField";
import SingleChoicesField from "lib/opsvForm/models/fields/singleChoicesField";
import TextField from "lib/opsvForm/models/fields/textField";
import Question from "lib/opsvForm/models/question";
import { observer } from "mobx-react";
import dynamic from "next/dynamic";
import { FC } from "react";

const FormLocationField = dynamic(
  () => import("components/formRenderer/locationField"),
  {
    loading: () => <p>A map is loading</p>,
    ssr: false,
  }
);

export type FormQuestionProps = {
  question: Question;
};

const Component: FC<FormQuestionProps> = ({ question }) => {
  const renderField = (field: Field) => {
    if (field instanceof TextField) {
      return <FormTextField field={field} />;
    } else if (field instanceof IntegerField) {
      return <FormIntegerField field={field} />;
    } else if (field instanceof DecimalField) {
      return <FormDecimalField field={field} />;
    } else if (field instanceof SingleChoicesField) {
      return <FormSingleChoicesField field={field} />;
    } else if (field instanceof MultipleChoicesField) {
      return <FormMultipleChoicesField field={field} />;
    } else if (field instanceof DateField) {
      return <FormDateField field={field} />;
    } else if (field instanceof LocationField) {
      return <FormLocationField field={field} />;
    }
    return <div>Unknown Field</div>;
  };

  return (
    <div className="p-4 border-b border-gray-200 last:border-0">
      <h4 className="font-medium text-gray-800">{question.label}</h4>
      {question.description && (
        <h5 className="text-sm">{question.description}</h5>
      )}
      <div className="flex-col flex gap-4 mt-4">
        {question.fields.map((field, index) => (
          <div key={index + field.id}>{renderField(field)}</div>
        ))}
      </div>
    </div>
  );
};

export const FormQuestion = observer(Component);
