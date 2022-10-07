import TextField from "lib/opsvForm/models/fields/textField";

describe("Text Field", () => {
  describe("json value", () => {
    let field: TextField;

    beforeEach(() => {
      field = new TextField("id1", "firstName", {});
    });

    it("to json with value", () => {
      field.value = "polawat";
      const json: Record<string, any> = {};
      field.toJsonValue(json);
      expect(json["firstName"]).toBe("polawat");
      expect(json["firstName__value"]).toBe("polawat");
    });

    it("to json without value", () => {
      const json: Record<string, any> = {};
      field.toJsonValue(json);
      expect(json["firstName"]).toBeUndefined;
      expect(json["firstName__value"]).toBe("");
    });

    it("load json data", () => {
      field.loadJsonValue({ firstName: "test" });
      expect(field.value).toBe("test");
    });
  });

  describe("validation", () => {
    let field: TextField;
    let requiredField: TextField;

    beforeEach(() => {
      field = new TextField("id1", "firstName", {});
      requiredField = new TextField("id1", "firstName", { required: true });
    });

    it("with no required", () => {
      const valid = field.validate();
      expect(valid).toBeTruthy();
    });

    it("with required", () => {
      expect(requiredField.validate()).toBeFalsy();
      expect(requiredField.invalidMessage).toBe("This field is required");
      requiredField.value = "test";
      expect(requiredField.validate()).toBeTruthy();
    });

    it("with custom required message", () => {
      requiredField = new TextField("id1", "firstName", {
        required: true,
        requiredMessage: "test message",
      });
      expect(requiredField.validate()).toBeFalsy();
      expect(requiredField.invalidMessage).toBe("test message");
    });

    it("with min validation", () => {
      field = new TextField("id1", "firstName", {
        minLength: 3,
        minLengthMessage: "must greater that 3",
      });
      // because this field is not required
      // so validate should return true
      expect(field.validate()).toBeTruthy();
      field.value = "x";
      // but if there is some setting value, min and max validate will be apply
      expect(field.validate()).toBeFalsy();
      expect(field.invalidMessage).toBe("must greater that 3");
      field.value = "xxx";
      expect(field.validate()).toBeTruthy();
      expect(field.invalidMessage).toBeUndefined();
      field.value = "xxxxxx";
      expect(field.validate()).toBeTruthy();
      expect(field.invalidMessage).toBeUndefined();
    });

    it("with max validation", () => {
      field = new TextField("id1", "firstName", {
        maxLength: 3,
        maxLengthMessage: "must lesser that 3",
      });
      expect(field.validate()).toBeTruthy();
      field.value = "x";
      expect(field.validate()).toBeTruthy();
      field.value = "xxx";
      expect(field.validate()).toBeTruthy();
      field.value = "xxxxxx";
      expect(field.validate()).toBeFalsy();
      expect(field.invalidMessage).toBe("must lesser that 3");
    });

    it("with min and max", () => {
      field = new TextField("id1", "firstName", {
        maxLength: 3,
        minLength: 2,
      });
      const table: Array<[string | undefined, boolean]> = [
        [undefined, true],
        ["x", false],
        ["xx", true],
        ["xxx", true],
        ["xxxx", false],
      ];
      table.forEach(([v, e]) => {
        field.value = v;
        expect(field.validate()).toBe(e);
      });
    });
  });
});
