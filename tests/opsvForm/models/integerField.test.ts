import IntegerField from "lib/opsvForm/models/fields/integerField";

describe("Integer field", () => {
  describe("json value", () => {
    let field: IntegerField;

    beforeEach(() => {
      field = new IntegerField("id1", "age", {});
    });

    it("to json with value", () => {
      field.value = 23;
      const json: Record<string, any> = {};
      field.toJsonValue(json);
      expect(json["age"]).toBe(23);
      expect(json["age__value"]).toBe("23");
    });

    it("to json without value", () => {
      const json: Record<string, any> = {};
      field.toJsonValue(json);
      expect(json["age"]).toBeUndefined();
      expect(json["age__value"]).toBe("");
    });

    it("load json data", () => {
      field.loadJsonValue({ age: 33 });
      expect(field.value).toBe(33);
    });
  });

  describe("validation", () => {
    let field: IntegerField;
    let requiredField: IntegerField;

    it("with no required", () => {
      field = new IntegerField("id1", "age", {});
      expect(field.validate()).toBeTruthy();
    });

    it("with required", () => {
      requiredField = new IntegerField("id2", "age", { required: true });
      expect(requiredField.validate()).toBeFalsy();
      requiredField.value = 12;
      expect(requiredField.validate()).toBeTruthy();
    });

    it("with custom required message", () => {
      requiredField = new IntegerField("id1", "age", {
        required: true,
        requiredMessage: "custom message",
      });
      expect(requiredField.validate()).toBeFalsy();
      expect(requiredField.invalidMessage).toBe("custom message");
    });

    it("min validate", () => {
      requiredField = new IntegerField("id1", "age", {
        required: true,
        requiredMessage: "custom message",
        min: 10,
        minMessage: "must gte 10",
      });

      const table: Array<[number, boolean]> = [
        [8, false],
        [9, false],
        [10, true],
        [11, true],
      ];

      table.forEach(([v, e]) => {
        requiredField.value = v;
        expect(requiredField.validate()).toBe(e);
        if (!e) {
          expect(requiredField.invalidMessage).toBe("must gte 10");
        } else {
          expect(requiredField.invalidMessage).toBeUndefined();
        }
      });
    });

    describe("if min value is specific but required is false", () => {
      beforeEach(() => {
        field = new IntegerField("id1", "age", {
          min: 10,
          minMessage: "must gte 10",
        });
      });
      it("with value == undefined", () => {
        expect(field.validate).toBeTruthy();
      });

      it("with value is defined but less than min", () => {
        field.value = 7;
        expect(field.validate()).toBeFalsy();
        field.value = 10;
        expect(field.validate()).toBeTruthy();
      });
    });

    it("max validate", () => {
      requiredField = new IntegerField("id1", "age", {
        required: true,
        requiredMessage: "custom message",
        max: 10,
        maxMessage: "must lte 10",
      });

      const table: Array<[number, boolean]> = [
        [8, true],
        [9, true],
        [10, true],
        [11, false],
      ];

      table.forEach(([v, e]) => {
        requiredField.value = v;
        expect(requiredField.validate()).toBe(e);
        if (!e) {
          expect(requiredField.invalidMessage).toBe("must lte 10");
        } else {
          expect(requiredField.invalidMessage).toBeUndefined();
        }
      });
    });

    describe("if max value is specific but required is false", () => {
      beforeEach(() => {
        field = new IntegerField("id1", "age", {
          max: 10,
        });
      });
      it("with value == undefined", () => {
        expect(field.validate).toBeTruthy();
      });

      it("with value is defined but more than max", () => {
        field.value = 17;
        expect(field.validate()).toBeFalsy();
        field.value = 10;
        expect(field.validate()).toBeTruthy();
      });
    });
  });
});
