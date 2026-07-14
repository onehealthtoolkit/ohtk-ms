import Decimal from "decimal.js";
import DateField from "lib/opsvForm/models/fields/dateField";
import DecimalField from "lib/opsvForm/models/fields/decimalField";
import IntegerField from "lib/opsvForm/models/fields/integerField";
import SingleChoicesField, {
  ChoiceOption,
} from "lib/opsvForm/models/fields/singleChoicesField";
import SubformField from "lib/opsvForm/models/fields/subformField";
import TextField from "lib/opsvForm/models/fields/textField";
import TextAreaField from "lib/opsvForm/models/fields/textareaField";
import {
  decimalEquals,
  decimalValueInList,
  splitConditionList,
  stringValueInList,
} from "lib/opsvForm/models/conditionList";

describe("conditionList helpers", () => {
  it("splits and trims comma-separated tokens", () => {
    expect(splitConditionList(" cat, dog , ,elephant ")).toEqual([
      "cat",
      "dog",
      "elephant",
    ]);
  });

  it("stringValueInList matches and ignores empty current", () => {
    expect(stringValueInList("dog", "cat, dog")).toBe(true);
    expect(stringValueInList("bird", "cat, dog")).toBe(false);
    expect(stringValueInList("", "cat, dog")).toBe(false);
    expect(stringValueInList(undefined, "cat")).toBe(false);
  });

  it("decimalEquals and decimalValueInList never throw on bad tokens", () => {
    const d = new Decimal("1.5");
    expect(decimalEquals(d, "1.5")).toBe(true);
    expect(decimalEquals(d, "not-a-number")).toBe(false);
    expect(decimalValueInList(d, "1, 1.5, x")).toBe(true);
    expect(decimalValueInList(d, "x,y")).toBe(false);
    expect(decimalValueInList(undefined, "1")).toBe(false);
  });
});

describe("field evaluate() operators in / !=", () => {
  describe("TextField", () => {
    const field = new TextField("id", "animal", {});

    it("supports =, !=, in", () => {
      field.value = "dog";
      expect(field.evaluate("=", "dog")).toBe(true);
      expect(field.evaluate("!=", "cat")).toBe(true);
      expect(field.evaluate("in", "cat, dog, elephant")).toBe(true);
      expect(field.evaluate("in", "cat,elephant")).toBe(false);
    });

    it("returns false when empty", () => {
      field.value = undefined;
      expect(field.evaluate("in", "a,b")).toBe(false);
    });
  });

  describe("TextAreaField", () => {
    it("supports in", () => {
      const field = new TextAreaField("id", "note", {});
      field.value = "ok";
      expect(field.evaluate("in", "ok, pending")).toBe(true);
    });
  });

  describe("IntegerField", () => {
    const field = new IntegerField("id", "age", {});

    it("supports =, !=, in", () => {
      field.value = 3;
      expect(field.evaluate("=", "3")).toBe(true);
      expect(field.evaluate("!=", "4")).toBe(true);
      expect(field.evaluate("in", "1, 3, 5")).toBe(true);
      expect(field.evaluate("in", "1,2")).toBe(false);
    });
  });

  describe("DecimalField", () => {
    const field = new DecimalField("id", "weight", {});

    it("supports =, !=, in without throwing on junk list tokens", () => {
      field.value = new Decimal("2.5");
      expect(field.evaluate("=", "2.5")).toBe(true);
      expect(field.evaluate("!=", "1")).toBe(true);
      expect(field.evaluate("in", "1, 2.5, 3")).toBe(true);
      expect(() => field.evaluate("in", "nope, still-nope")).not.toThrow();
      expect(field.evaluate("in", "nope, still-nope")).toBe(false);
      expect(() => field.evaluate("=", "xyz")).not.toThrow();
      expect(field.evaluate("=", "xyz")).toBe(false);
    });
  });

  describe("DateField", () => {
    it("supports =, !=, in on yyyy-mm-dd", () => {
      const field = new DateField("id", "day", {});
      field.year = 2026;
      field.month = 6;
      field.day = 15;
      // formatYmd uses local getters from ISO value
      const ymd = `${field.year}-${String(field.month).padStart(2, "0")}-${String(
        field.day
      ).padStart(2, "0")}`;
      // evaluate formats via formatYmd(this.value); value is ISO of local midnight
      expect(field.evaluate("=", ymd) || field.evaluate("=", field.value!.slice(0, 10))).toBe(
        true
      );
      // prefer the string that evaluate actually uses
      const matchValue = field.evaluate("=", ymd) ? ymd : field.value!.slice(0, 10);
      expect(field.evaluate("!=", "2000-01-01")).toBe(true);
      expect(field.evaluate("in", `2000-01-01, ${matchValue}, 2099-12-31`)).toBe(
        true
      );
      expect(field.evaluate("in", "2000-01-01, 2001-01-01")).toBe(false);
      field.year = undefined;
      expect(field.evaluate("in", matchValue)).toBe(false);
    });
  });

  describe("SingleChoicesField", () => {
    const options: ChoiceOption[] = [
      { label: "Cat", value: "cat", textInput: false },
      { label: "Dog", value: "dog", textInput: false },
    ];

    it("supports in and !=", () => {
      const field = new SingleChoicesField("id", "species", options, {});
      field.value = "cat";
      expect(field.evaluate("in", "cat,dog")).toBe(true);
      expect(field.evaluate("in", "pig,cow")).toBe(false);
      expect(field.evaluate("!=", "dog")).toBe(true);
    });
  });

  describe("SubformField", () => {
    it("supports in", () => {
      const field = new SubformField("id", "ref", {});
      field.value = "row-a";
      expect(field.evaluate("in", "row-a,row-b")).toBe(true);
      expect(field.evaluate("in", "row-c")).toBe(false);
    });
  });
});
