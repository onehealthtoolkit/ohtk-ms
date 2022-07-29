import Decimal from "decimal.js";
import DecimalField from "lib/opsvForm/models/fields/decimalField";

describe("Decimal Field", () => {
  describe("Json value", () => {
    let field: DecimalField;

    beforeEach(() => {
      field = new DecimalField("id", "salary", {});
    });

    it("to json with value", () => {
      field.value = new Decimal("12000.00");
      const json: Record<string, any> = {};
      field.toJsonValue(json);
      expect(json["salary"]).toBe("12000.00");
    });

    it("to json without value", () => {
      const json: Record<string, any> = {};
      field.toJsonValue(json);
      expect(json["salary"]).toBeUndefined();
    });

    it("load json value", () => {
      field.loadJsonValue({
        salary: "12000.00",
      });
      expect(field.value?.toFixed(2)).toBe("12000.00");
    });
  });

  describe("validation", () => {
    let field: DecimalField;
    let requiredField: DecimalField;

    beforeEach(() => {
      field = new DecimalField("id", "salary", {});
      requiredField = new DecimalField("id", "salary", { required: true });
    });

    it("with no required", () => {
      const valid = field.validate();
      expect(valid).toBeTruthy();
    });

    it("with required", () => {
      expect(requiredField.validate()).toBeFalsy();
      expect(requiredField.invalidMessage).toBe("This field is required");
      requiredField.value = new Decimal("12000.00");
      expect(requiredField.validate()).toBeTruthy();
    });
  });
});
