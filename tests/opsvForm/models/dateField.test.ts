import DateField from "lib/opsvForm/models/fields/dateField";

describe("Date field", () => {
  describe("json value", () => {
    let field: DateField;

    beforeEach(() => {
      field = new DateField("id1", "dob", {});
    });

    it("to json with value", () => {
      field.day = 1;
      field.month = 11;
      field.year = 2022;
      const json: Record<string, any> = {};
      field.toJsonValue(json);

      expect(json["dob"]).toBe(new Date(2022, 10, 1).toISOString());
    });

    it("to json without value", () => {
      const json: Record<string, any> = {};
      field.toJsonValue(json);

      expect(json["dob"]).toBeUndefined();
    });

    it("load json data", () => {
      field.loadJsonValue({
        dob: "2022-02-01",
      });
      expect(field.day).toBe(1);
      expect(field.month).toBe(2);
      expect(field.year).toBe(2022);
      expect(field.hour).toBeUndefined();
      expect(field.minute).toBeUndefined();
    });
  });

  describe("validation", () => {
    let field: DateField;

    it("with no required", () => {
      field = new DateField("id", "dob", { required: false });
      const valid = field.validate();
      expect(valid).toBeTruthy();
    });

    it("with required", () => {
      field = new DateField("id", "dob", { required: true });
      expect(field.validate()).toBeFalsy();
      field.day = 1;
      expect(field.validate()).toBeFalsy();
      field.month = 11;
      expect(field.validate()).toBeFalsy();
      field.year = 2022;
      expect(field.validate()).toBeTruthy();
    });

    it("date with time with required was set", () => {
      field = new DateField("id", "dob", { required: true, withTime: true });
      expect(field.validate()).toBeFalsy();
      field.day = 1;
      expect(field.validate()).toBeFalsy();
      field.month = 11;
      expect(field.validate()).toBeFalsy();
      field.year = 2022;
      expect(field.validate()).toBeFalsy();
      field.hour = 10;
      expect(field.validate()).toBeFalsy();
      field.minute = 0;
      expect(field.validate()).toBeTruthy();
    });
  });
});
