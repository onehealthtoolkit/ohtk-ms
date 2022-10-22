import LocationField from "lib/opsvForm/models/fields/locationField";

describe("Location Field", () => {
  describe("json value", () => {
    let field: LocationField;

    beforeEach(() => {
      field = new LocationField("id", "location", {});
    });

    it("to json with value", () => {
      field.value = "100.343,13.234"; // longitude, latitude
      const json: Record<string, any> = {};
      field.toJsonValue(json);
      expect(json["location"]).toBe(field.value);
      expect(json["location__value"]).toBe(field.value + " (Lng,Lat)");
    });

    it("to json without value", () => {
      const json: Record<string, any> = {};
      field.toJsonValue(json);
      expect(json["location"]).toBeUndefined();
      expect(json["location__value"]).toBe("");
    });

    it("load json data", () => {
      field.loadJsonValue({
        location: "12,100",
      });
      expect(field.value).toBe("12,100");
    });
  });

  describe("validation", () => {
    let field: LocationField;

    it("with no required", () => {
      field = new LocationField("id", "location", {});
      expect(field.validate).toBeTruthy();
    });

    it("with required", () => {
      field = new LocationField("id", "location", { required: true });
      expect(field.validate()).toBeFalsy();
      field.value = "12,100";
      expect(field.validate()).toBeTruthy();
    });
  });
});
