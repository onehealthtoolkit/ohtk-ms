import SimpleCondition, { Condition } from "./condition";
import Field, { FieldParams } from "./fields";
import TextField from "./fields/textField";
import IntegerField from "./fields/integerField";
import DecimalField from "./fields/decimalField";
import DateField from "./fields/dateField";
import LocationField from "./fields/locationField";
import SingleChoicesField from "./fields/singleChoicesField";
import MultipleChoicesField from "./fields/multipleChoicesField";
import ImagesField from "./fields/imagesField";
import Form from "./form";
import Question from "./question";
import Section from "./section";
import { ChoiceOption } from "./fields/singleChoicesField";

export type FormType = {
  id: string;
  sections: SectionType[];
};

export type SectionType = {
  label: string;
  description?: string;
  questions: QuestionType[];
};

export type QuestionType = {
  label: string;
  name?: string;
  description?: string;
  condition?: ConditionType;
  fields: FieldType[];
};

export type ConditionType = SimpleConditionType;

export type SimpleConditionType = {
  name: string;
  operator: ConditionOperatorType;
  value: string;
};

export type ConditionOperatorType = "=" | "contains";

export type FieldType =
  | TextFieldType
  | IntegerFieldType
  | DecimalFieldType
  | DateFieldType
  | LocationFieldType
  | SingleChoicesFieldType
  | MultipleChoicesFieldType
  | ImagesFieldType;

export type BaseFieldType = {
  id: string;
  name: string;
  label?: string;
  description?: string;
  suffixLabel?: string;
  required?: boolean;
  requiredMessage?: string;
  condition?: ConditionType;
};

export type TextFieldType = {
  type: "text";
  minLength?: number;
  maxLength?: number;
  minLengthMessage?: string;
  maxLengthMessage?: string;
} & BaseFieldType;

export type IntegerFieldType = {
  type: "integer";
  min?: number;
  max?: number;
  minMessage?: string;
  maxMessage?: string;
} & BaseFieldType;

export type DecimalFieldType = {
  type: "decimal";
} & BaseFieldType;

export type DateFieldType = {
  type: "date";
  withTime?: boolean;
  backwardDaysOffset?: number;
  forwardDaysOffset?: number;
} & BaseFieldType;

export type LocationFieldType = {
  type: "location";
} & BaseFieldType;

export type SingleChoicesFieldType = {
  type: "singlechoices";
  options: ChoiceOption[];
} & BaseFieldType;

export type MultipleChoicesFieldType = {
  type: "multiplechoices";
  options: ChoiceOption[];
} & BaseFieldType;

export type ImagesFieldType = {
  type: "images";
  min?: number;
  max?: number;
  minMessage?: string;
  maxMessage?: string;
} & BaseFieldType;

export function parseForm(json: FormType): Form {
  const form = new Form(json["id"]);
  form.sections = json["sections"].map(section => parseSection(section));
  form.registerValues();
  return form;
}

export function parseSection(json: SectionType): Section {
  const section = new Section(json["label"]);
  section.questions = json["questions"].map(sectionType =>
    parseQuestion(sectionType)
  );
  return section;
}

export function parseQuestion(json: QuestionType): Question {
  const question = new Question(json["label"], {
    name: json["name"],
    description: json["description"],
    condition: parseCondition(json["condition"]),
  });
  question.fields = json["fields"].map((f: FieldType) => {
    return parseField(f);
  });
  return question;
}

export function parseField(json: FieldType): Field {
  const commonParams: FieldParams = {
    label: json["label"],
    description: json["description"],
    required: json["required"],
    requiredMessage: json["requiredMessage"],
    suffixLabel: json["suffixLabel"],
    condition: parseCondition(json["condition"]),
  };
  switch (json.type) {
    case "text":
      return new TextField(json["id"], json["name"], {
        ...commonParams,
        minLength: json["minLength"],
        minLengthMessage: json["minLengthMessage"],
        maxLength: json["maxLength"],
        maxLengthMessage: json["maxLengthMessage"],
      });
    case "integer":
      return new IntegerField(json["id"], json["name"], {
        ...commonParams,
        min: json["min"],
        minMessage: json["minMessage"],
        max: json["max"],
        maxMessage: json["maxMessage"],
      });
    case "decimal":
      return new DecimalField(json["id"], json["name"], commonParams);
    case "date":
      return new DateField(json["id"], json["name"], {
        ...commonParams,
        withTime: json["withTime"],
        backwardDaysOffset: json["backwardDaysOffset"],
        forwardDaysOffset: json["forwardDaysOffset"],
      });
    case "location":
      return new LocationField(json["id"], json["name"], commonParams);
    case "singlechoices":
      return new SingleChoicesField(
        json["id"],
        json["name"],
        json["options"],
        commonParams
      );
    case "multiplechoices":
      return new MultipleChoicesField(
        json["id"],
        json["name"],
        json["options"],
        commonParams
      );
    case "images":
      return new ImagesField(json["id"], json["name"], {
        ...commonParams,
        min: json["min"],
        minMessage: json["minMessage"],
        max: json["max"],
        maxMessage: json["maxMessage"],
      });
    default:
      return new TextField("unknown", "unknown", {});
  }
}

export function parseCondition(json?: ConditionType): Condition | undefined {
  if (json) {
    return new SimpleCondition(json["name"], json["operator"], json["value"]);
  }
  return undefined;
}
