import Decimal from "decimal.js";
import { formatYmd } from "lib/datetime";
import SimpleCondition, {
  isListMembershipOperator,
  normalizeConditionOperator,
} from "lib/opsvForm/models/condition";
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
import { parseCondition } from "lib/opsvForm/models/json";
import { normalizeComparableOperator } from "components/admin/formBuilder/shared/operatorViewModel";

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

  it("empty list and empty tokens never match", () => {
    expect(splitConditionList("")).toEqual([]);
    expect(splitConditionList(",,,")).toEqual([]);
    expect(stringValueInList("dog", "")).toBe(false);
    expect(stringValueInList("dog", ",,,")).toBe(false);
  });

  it("list membership is case-sensitive", () => {
    expect(stringValueInList("Dog", "dog,cat")).toBe(false);
    expect(stringValueInList("dog", "dog,cat")).toBe(true);
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

describe("list-membership operator aliases", () => {
  it("normalizes has_one_of / hasOneOf / isOneOf to in", () => {
    for (const op of ["in", "has_one_of", "hasOneOf", "isOneOf"] as const) {
      expect(isListMembershipOperator(op)).toBe(true);
      expect(normalizeConditionOperator(op)).toBe("in");
      expect(normalizeComparableOperator(op)).toBe("in");
    }
    expect(normalizeConditionOperator("=")).toBe("=");
    expect(isListMembershipOperator("=")).toBe(false);
  });

  it("parseCondition folds aliases to in", () => {
    const c = parseCondition({
      name: "species",
      operator: "has_one_of",
      value: "cat,dog",
    }) as SimpleCondition;
    expect(c.operator).toBe("in");
    expect(c.name).toBe("species");
    expect(c.value).toBe("cat,dog");
  });

  it("field evaluate treats aliases the same as in", () => {
    const field = new TextField("id", "animal", {});
    field.value = "dog";
    expect(field.evaluate("has_one_of", "cat, dog, elephant")).toBe(true);
    expect(field.evaluate("hasOneOf", "cat, dog")).toBe(true);
    expect(field.evaluate("isOneOf", "cat, dog")).toBe(true);
    expect(field.evaluate("has_one_of", "cat,elephant")).toBe(false);

    const choices = new SingleChoicesField(
      "id",
      "species",
      [
        { label: "Cat", value: "cat", textInput: false },
        { label: "Dog", value: "dog", textInput: false },
      ],
      {}
    );
    choices.value = "cat";
    // Staging-style condition on animal sick/death form
    expect(choices.evaluate("has_one_of", "พิษสุนัขบ้า, หัดแมว")).toBe(false);
    expect(choices.evaluate("has_one_of", "cat, dog")).toBe(true);
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

    it("uses exact decimal-less digit strings (not numeric coercion)", () => {
      field.value = 3;
      // Matches Number.toString() / mobile string isOneOf — not "03" or "3.0"
      expect(field.evaluate("in", "03")).toBe(false);
      expect(field.evaluate("in", "3.0")).toBe(false);
      expect(field.evaluate("in", "3")).toBe(true);
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

    it("!= is true when RHS is non-numeric (value is not equal to that token)", () => {
      field.value = new Decimal("2.5");
      expect(field.evaluate("!=", "xyz")).toBe(true);
      expect(field.evaluate("!=", "2.5")).toBe(false);
    });
  });

  describe("DateField", () => {
    it("supports =, !=, in on yyyy-mm-dd via formatYmd", () => {
      const field = new DateField("id", "day", {});
      field.year = 2026;
      field.month = 6;
      field.day = 15;
      // Contract: evaluate compares formatYmd(this.value), not free-form Date parse
      const expected = formatYmd(field.value!);
      expect(expected).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(field.evaluate("=", expected)).toBe(true);
      expect(field.evaluate("!=", "2000-01-01")).toBe(true);
      expect(
        field.evaluate("in", `2000-01-01, ${expected}, 2099-12-31`)
      ).toBe(true);
      expect(field.evaluate("in", "2000-01-01, 2001-01-01")).toBe(false);
      field.year = undefined;
      expect(field.evaluate("in", expected)).toBe(false);
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
