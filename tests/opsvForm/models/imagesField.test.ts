import ImagesField from "lib/opsvForm/models/fields/imagesField";
import Form from "lib/opsvForm/models/form";
import { Values } from "lib/opsvForm/models/values";

describe("Images field", () => {
  describe("json value", () => {
    let field: ImagesField;

    beforeEach(() => {
      field = new ImagesField("id1", "images", {});
    });

    it("to json with value", () => {
      field.value = ["a", "b"];
      const json: Record<string, any> = {};
      field.toJsonValue(json);
      expect(json["images"]).toEqual(["a", "b"]);
      expect(json["images__value"]).toEqual("a,b");
    });

    it("to json without value", () => {
      const json: Record<string, any> = {};
      field.toJsonValue(json);
      expect(json["images"]).toBeUndefined();
      expect(json["images__value"]).toBe("");
    });

    it("load json data", () => {
      field.loadJsonValue({ images: ["a", "b"] });
      expect(field.value).toEqual(["a", "b"]);
      expect(field.images.length).toBe(0);
    });
  });

  describe("pending image value", () => {
    let field: ImagesField;

    beforeEach(() => {
      field = new ImagesField("id1", "images", {});
      field.registerValues(new Values(), new Form("form1"));
    });

    it("add image", () => {
      field.addImage("image1");
      expect(field.images.length).toBe(1);
    });

    it("remove image with invalid id", () => {
      field.addImage("image1");
      field.removeImage("id1");
      expect(field.images.length).toBe(1);
    });

    it("remove image with valid id", () => {
      field.addImage("image1");
      field.removeImage(field.pendings![0]);
      expect(field.images.length).toBe(0);
    });
  });

  describe("validation", () => {
    let field: ImagesField;
    let requiredField: ImagesField;

    it("with no required", () => {
      field = new ImagesField("id1", "images", {});
      expect(field.validate()).toBeTruthy();
    });

    it("with required", () => {
      requiredField = new ImagesField("id2", "images", { required: true });
      expect(requiredField.validate()).toBeFalsy();
      requiredField.pendings = ["a"];
      expect(requiredField.validate()).toBeTruthy();
    });

    it("with custom required message", () => {
      requiredField = new ImagesField("id1", "images", {
        required: true,
        requiredMessage: "custom message",
      });
      expect(requiredField.validate()).toBeFalsy();
      expect(requiredField.invalidMessage).toBe("custom message");
    });

    it("min validate", () => {
      requiredField = new ImagesField("id1", "images", {
        required: true,
        requiredMessage: "custom message",
        min: 2,
        minMessage: "must gte 2",
      });

      const table: Array<[string[], boolean]> = [
        [["a"], false],
        [["a", "b"], true],
        [["a", "b", "c"], true],
      ];

      table.forEach(([v, e]) => {
        requiredField.pendings = v;
        expect(requiredField.validate()).toBe(e);
        if (!e) {
          expect(requiredField.invalidMessage).toBe("must gte 2");
        } else {
          expect(requiredField.invalidMessage).toBeUndefined();
        }
      });
    });

    describe("if min pendings is specific but required is false", () => {
      beforeEach(() => {
        field = new ImagesField("id1", "images", {
          min: 2,
          minMessage: "must gte 2",
        });
      });
      it("with pendings == undefined", () => {
        expect(field.validate).toBeTruthy();
      });

      it("with pendings is defined but less than min", () => {
        field.pendings = ["a"];
        expect(field.validate()).toBeFalsy();
        field.pendings = ["a", "b", "c"];
        expect(field.validate()).toBeTruthy();
      });
    });

    it("max validate", () => {
      requiredField = new ImagesField("id1", "images", {
        required: true,
        requiredMessage: "custom message",
        max: 2,
        maxMessage: "must lte 2",
      });

      const table: Array<[string[], boolean]> = [
        [["a"], true],
        [["a", "b"], true],
        [["a", "b", "c"], false],
      ];

      table.forEach(([v, e]) => {
        requiredField.pendings = v;
        expect(requiredField.validate()).toBe(e);
        if (!e) {
          expect(requiredField.invalidMessage).toBe("must lte 2");
        } else {
          expect(requiredField.invalidMessage).toBeUndefined();
        }
      });
    });

    describe("if max pendings is specific but required is false", () => {
      beforeEach(() => {
        field = new ImagesField("id1", "images", {
          max: 2,
        });
      });
      it("with pendings == undefined", () => {
        expect(field.validate).toBeTruthy();
      });

      it("with pendings is defined but more than max", () => {
        field.pendings = ["a", "b", "c"];
        expect(field.validate()).toBeFalsy();
        field.pendings = ["a", "b"];
        expect(field.validate()).toBeTruthy();
      });
    });
  });
});
