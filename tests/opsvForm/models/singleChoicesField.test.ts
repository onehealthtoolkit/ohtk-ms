import SingleChoicesField, {
  ChoiceOption,
} from "lib/opsvForm/models/fields/singleChoicesField";

const options: ChoiceOption[] = [
  {
    label: "mers",
    value: "mers",
    textInput: false,
  },
  {
    label: "dengue",
    value: "dengue",
    textInput: false,
  },
  {
    label: "other",
    value: "other",
    textInput: true,
  },
];

describe("SingleChoicesField", () => {
  let field: SingleChoicesField;

  describe("json value", () => {
    beforeEach(() => {
      field = new SingleChoicesField("id", "disease", options, {});
    });

    it("to json with value", () => {
      const json: Record<string, any> = {};
      field.value = "mers";
      field.toJsonValue(json);
      expect(json["disease"]).toBe("mers");
      expect(json["disease_text"]).toBeUndefined();

      field.value = "other";
      field.text = "monkeypox";
      field.toJsonValue(json);
      expect(json["disease"]).toBe("other");
      expect(json["disease_text"]).toBe("monkeypox");
    });

    it("to json without value", () => {
      const json: Record<string, any> = {};

      field.toJsonValue(json);
      expect(json["disease"]).toBeUndefined();
      expect(json["disease_text"]).toBeUndefined();
    });

    it("load json value", () => {
      field.loadJsonValue({
        disease: "mers",
      });
      expect(field.value).toBe("mers");
      field.loadJsonValue({
        disease: "other",
        disease_text: "monkeypox",
      });
      expect(field.value).toBe("other");
      expect(field.text).toBe("monkeypox");
    });
  });

  describe("validation", () => {
    it("not required", () => {
      field = new SingleChoicesField("id", "disease", options, {});
      expect(field.validate()).toBeTruthy();
    });

    it("required without value", () => {
      field = new SingleChoicesField("id", "disease", options, {
        required: true,
      });
      expect(field.validate()).toBeFalsy();
    });

    it("required with value", () => {
      field = new SingleChoicesField("id", "disease", options, {
        required: true,
      });
      expect(field.validate()).toBeFalsy();

      field.value = "mers";
      expect(field.validate()).toBeTruthy();
    });

    it("required with value that require textinput", () => {
      field = new SingleChoicesField("id", "disease", options, {
        required: true,
      });
      field.value = "other";
      expect(field.text).toBeUndefined();
      expect(field.validate()).toBeFalsy();
      field.text = "monkeypox";
      expect(field.validate()).toBeTruthy();
    });
  });
});
