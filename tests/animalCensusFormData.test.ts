import {
  animalSummaryFields,
  buildAnimalFormData,
  censusLocalizedText,
  censusRowLabel,
  emptyFormValues,
  parseQuantity,
  prefillFormValues,
} from "components/admin/animalCensus/formData";
import { CensusSchema } from "lib/services/census";

const groupedSchema: CensusSchema = {
  layout: "grouped_species",
  summary_fields: [
    { key: "village_household_quantity", label: "Village HH", required: true },
    { key: "animal_household_quantity", label: "Animal HH", required: true },
  ],
  groups: [
    {
      key: "PIG",
      label: "Pig",
      household_row_key: "group:PIG",
      species_row_keys: ["species:PIG"],
    },
  ],
  rows: [
    {
      row_key: "group:PIG",
      label: "Pig households",
      measures: [{ key: "household_quantity", label: "HH", required: true }],
    },
    {
      row_key: "species:PIG",
      label: "Pig",
      measures: [{ key: "animal_quantity", label: "Heads", required: true }],
    },
  ],
  measures: [
    { key: "household_quantity", label: "HH" },
    { key: "animal_quantity", label: "Heads" },
  ],
};

describe("animal census form data", () => {
  it("parses non-negative integers only", () => {
    expect(parseQuantity("0")).toBe(0);
    expect(parseQuantity("12")).toBe(12);
    expect(parseQuantity("")).toBeNull();
    expect(parseQuantity("1.5")).toBeNull();
    expect(parseQuantity("-1")).toBeNull();
  });

  it("uses default animal summary fields when schema omits them", () => {
    const fields = animalSummaryFields({ rows: [] });
    expect(fields.map(field => field.key)).toEqual([
      "village_household_quantity",
      "animal_household_quantity",
    ]);
  });

  it("builds a complete grouped animal payload", () => {
    const values = emptyFormValues(groupedSchema);
    values.summary.village_household_quantity = "20";
    values.summary.animal_household_quantity = "8";
    values.rows["group:PIG"].household_quantity = "3";
    values.rows["species:PIG"].animal_quantity = "10";

    const result = buildAnimalFormData(groupedSchema, values);
    expect(result.ok).toBe(true);
    if (!result.ok) {
      return;
    }
    expect(result.formData).toEqual({
      summary: {
        village_household_quantity: 20,
        animal_household_quantity: 8,
      },
      rows: [
        { row_key: "group:PIG", measures: { household_quantity: 3 } },
        { row_key: "species:PIG", measures: { animal_quantity: 10 } },
      ],
    });
  });

  it("rejects animal households above village households", () => {
    const values = emptyFormValues(groupedSchema);
    values.summary.village_household_quantity = "5";
    values.summary.animal_household_quantity = "6";
    values.rows["group:PIG"].household_quantity = "0";
    values.rows["species:PIG"].animal_quantity = "0";

    const result = buildAnimalFormData(groupedSchema, values);
    expect(result.ok).toBe(false);
    if (result.ok) {
      return;
    }
    expect(result.fieldErrors["summary.animal_household_quantity"]).toMatch(
      /cannot exceed/
    );
  });

  it("rejects heads when group households is zero", () => {
    const values = emptyFormValues(groupedSchema);
    values.summary.village_household_quantity = "20";
    values.summary.animal_household_quantity = "8";
    values.rows["group:PIG"].household_quantity = "0";
    values.rows["species:PIG"].animal_quantity = "4";

    const result = buildAnimalFormData(groupedSchema, values);
    expect(result.ok).toBe(false);
    if (result.ok) {
      return;
    }
    expect(result.fieldErrors["rows.group:PIG.household_quantity"]).toMatch(
      /must be zero/
    );
  });

  it("prefills from latest form data and facts", () => {
    const values = prefillFormValues(groupedSchema, {
      id: "1",
      censusDate: "2026-05-19",
      submittedAt: "2026-05-19T00:00:00Z",
      villageHouseholdQuantity: 20,
      animalHouseholdQuantity: 8,
      formData: {
        summary: {
          village_household_quantity: 20,
          animal_household_quantity: 8,
        },
        rows: [{ row_key: "group:PIG", measures: { household_quantity: 3 } }],
      },
      facts: [
        {
          rowKey: "species:PIG",
          rowLabel: "Pig",
          animalQuantity: 10,
          householdQuantity: 0,
        },
      ],
    });

    expect(values.summary.village_household_quantity).toBe("20");
    expect(values.rows["group:PIG"].household_quantity).toBe("3");
    expect(values.rows["species:PIG"].animal_quantity).toBe("10");
  });

  it("prefers the active locale for definition labels", () => {
    expect(
      censusLocalizedText(
        { default: "HH No.", la: "ຈຳນວນຄົວເຮືອນ", en: "Village households" },
        "fallback",
        "lo-LA"
      )
    ).toBe("ຈຳນວນຄົວເຮືອນ");
    expect(
      censusLocalizedText(
        {
          default: "HH No.",
          en: "Village households",
          th: "จำนวนครัวเรือนในหมู่บ้าน",
        },
        "fallback",
        "th"
      )
    ).toBe("จำนวนครัวเรือนในหมู่บ้าน");
    expect(
      censusLocalizedText(
        { default: "HH No.", en: "Village households" },
        "fallback",
        "th"
      )
    ).toBe("HH No.");
  });

  it("uses the row label_i18n map when present", () => {
    expect(
      censusRowLabel(
        {
          row_key: "species:CATTLE",
          label: "Cattle",
          label_i18n: { default: "Cattle", la: "ງົວ" },
        },
        "la"
      )
    ).toBe("ງົວ");
  });
});
