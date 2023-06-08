import { FormDateField } from "components/formRenderer/dateField";
import { FormDecimalField } from "components/formRenderer/decimalField";
import { FormFilesField } from "components/formRenderer/filesField";
import { FormImagesField } from "components/formRenderer/imagesField";
import { FormIntegerField } from "components/formRenderer/integerField";
import { FormMultipleChoicesField } from "components/formRenderer/multipleChoicesField";
import { FormSingleChoicesField } from "components/formRenderer/singleChoicesField";
import { FormTextField } from "components/formRenderer/textField";
import Field from "lib/opsvForm/models/fields";
import DateField from "lib/opsvForm/models/fields/dateField";
import DecimalField from "lib/opsvForm/models/fields/decimalField";
import FilesField from "lib/opsvForm/models/fields/filesField";
import ImagesField from "lib/opsvForm/models/fields/imagesField";
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
    } else if (field instanceof ImagesField) {
      return <FormImagesField field={field} />;
    } else if (field instanceof FilesField) {
      return <FormFilesField field={field} />;
    }
    return <div>Unknown Field</div>;
  };

  if (!question.display) {
    return null;
  }
  return (
    <div className="p-4 border-b border-gray-200 last:border-0">
      <h4 className="font-medium text-gray-800">{question.label}</h4>
      {question.description && (
        <h5 className="text-sm">{question.description}</h5>
      )}
      <div className="flex-col flex gap-4 my-4">
        {question.fields.map(
          (field, index) =>
            field.display && (
              <div key={index + field.id}>{renderField(field)}</div>
            )
        )}
      </div>
    </div>
  );
};

export const FormQuestion = observer(Component);
