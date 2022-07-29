import MultipleChoicesField from "lib/opsvForm/models/fields/multipleChoicesField";
import { ChoiceOption } from "lib/opsvForm/models/fields/singleChoicesField";

const options: ChoiceOption[] = [
  {
    label: "fever",
    value: "fever",
    textInput: false,
  },
  {
    label: "headache",
    value: "headache",
    textInput: false,
  },
  {
    label: "other",
    value: "other",
    textInput: true,
  },
];

describe("MultipleChoicesField", () => {
  let field: MultipleChoicesField;
  describe("json value", () => {
    beforeEach(() => {
      field = new MultipleChoicesField("id", "symptom", options, {});
    });

    it("to json with value", () => {
      field.setSelectedFor("headache", true);
      const json: Record<string, any> = {};
      field.toJsonValue(json);
      expect(json["symptom"]).toEqual({
        fever: false,
        headache: true,
        other: false,
      });
    });

    it("to json without value", () => {
      const json: Record<string, any> = {};
      field.toJsonValue(json);
      expect(json["symptom"]).toEqual({
        fever: false,
        headache: false,
        other: false,
      });
    });

    it("to json with textinput is selected", () => {
      field.setSelectedFor("headache", true);
      field.setSelectedFor("other", true);
      field.setTextValuefor("other", "vomit");
      const json: Record<string, any> = {};
      field.toJsonValue(json);
      expect(json["symptom"]).toEqual({
        fever: false,
        headache: true,
        other: true,
        other_text: "vomit",
      });
    });

    it("load json value", () => {
      field.loadJsonValue({
        symptom: {
          fever: false,
          headache: true,
          other: true,
          other_text: "vomit",
        },
      });

      field.setSelectedFor("headache", false);

      const json: Record<string, any> = {};
      field.toJsonValue(json);
      expect(json["symptom"]).toEqual({
        fever: false,
        headache: false,
        other: true,
        other_text: "vomit",
      });
    });
  });

  describe("validation", () => {
    it("not required", () => {
      field = new MultipleChoicesField("id", "symptom", options, {});
      expect(field.validate()).toBeTruthy();
    });

    it("required", () => {
      field = new MultipleChoicesField("id", "symptom", options, {
        required: true,
      });
      expect(field.validate()).toBeFalsy();
    });
    it("required and selected", () => {
      field = new MultipleChoicesField("id", "symptom", options, {
        required: true,
      });
      field.setSelectedFor("fever", true);
      expect(field.validate()).toBeTruthy();
    });
    it("required and option that need textinput is selected", () => {
      field = new MultipleChoicesField("id", "symptom", options, {
        required: true,
      });
      field.setSelectedFor("other", true);
      expect(field.validate()).toBeFalsy();
      expect(field.invalidTextMessageFor("other")).toBe(
        "This field is required"
      );
      field.setTextValuefor("other", "monkeypox");
      expect(field.validate()).toBeTruthy();
      expect(field.invalidTextMessageFor("other")).toBeUndefined();
    });
  });
});
