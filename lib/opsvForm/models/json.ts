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
import FilesField from "lib/opsvForm/models/fields/filesField";
import TextAreaField from "./fields/textareaField";
import SubformField from "./fields/subformField";

export type FormType = {
  id: string;
  subforms: FormType[];
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
  | ImagesFieldType
  | FilesFieldType
  | TextAreaFieldType
  | SubformFieldType;

export type BaseFieldType = {
  id: string;
  name: string;
  label?: string;
  description?: string;
  suffixLabel?: string;
  required?: boolean;
  requiredMessage?: string;
  condition?: ConditionType;
  tags?: string;
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

export type FilesFieldType = {
  type: "files";
  min?: number;
  max?: number;
  maxSize?: number;
  audio?: boolean;
  video?: boolean;
  document?: boolean;
  supports: string[];
} & BaseFieldType;

export type TextAreaFieldType = {
  type: "textarea";
  minLength?: number;
  maxLength?: number;
  rows?: number;
  minLengthMessage?: string;
  maxLengthMessage?: string;
} & BaseFieldType;

export type SubformFieldType = {
  type: "subform";
  formRef?: string;
  titleTemplate?: string;
  descriptionTemplate?: string;
} & BaseFieldType;

export function parseForm(json: FormType): Form {
  const form = new Form(json["id"]);
  form.subforms = json["subforms"]
    ? json["subforms"].map(subform => parseSubform(subform))
    : [];
  form.sections = json["sections"].map(section => parseSection(section));
  form.registerValues();
  return form;
}

export function parseSubform(json: any): Form {
  return Object.entries(json).map(entry => {
    const [id, formType] = entry;
    const form = new Form(id);
    form.sections = (formType as FormType)["sections"].map(section =>
      parseSection(section)
    );
    form.registerValues();
    return form;
  })[0];
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
    tags: json["tags"],
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
    case "files":
      return new FilesField(json["id"], json["name"], {
        ...commonParams,
        min: json["min"],
        max: json["max"],
        maxSize: json["maxSize"],
        audio: json["audio"],
        video: json["video"],
        document: json["document"],
        supportTypes: json["supports"],
      });
    case "textarea":
      return new TextAreaField(json["id"], json["name"], {
        ...commonParams,
        rows: json["rows"],
        minLength: json["minLength"],
        minLengthMessage: json["minLengthMessage"],
        maxLength: json["maxLength"],
        maxLengthMessage: json["maxLengthMessage"],
      });
    case "subform":
      return new SubformField(json["id"], json["name"], {
        ...commonParams,
        formRef: json["formRef"],
        titleTemplate: json["titleTemplate"],
        descriptionTemplate: json["descriptionTemplate"],
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
