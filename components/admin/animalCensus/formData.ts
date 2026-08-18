import {
  CensusSchema,
  CensusSchemaMeasure,
  CensusSchemaRow,
  LocalizedLabel,
} from "lib/services/census";
import {
  VillageCensusFormData,
  VillageCensusSnapshot,
} from "lib/services/census/census";

export const VILLAGE_HOUSEHOLD_KEY = "village_household_quantity";
export const ANIMAL_HOUSEHOLD_KEY = "animal_household_quantity";

export type CensusFormValues = {
  summary: Record<string, string>;
  rows: Record<string, Record<string, string>>;
};

export type CensusFormBuildSuccess = {
  ok: true;
  formData: VillageCensusFormData;
};

export type CensusFormBuildFailure = {
  ok: false;
  fieldErrors: Record<string, string>;
};

export type CensusFormBuildResult =
  | CensusFormBuildSuccess
  | CensusFormBuildFailure;

export function censusLocalizedText(
  value: LocalizedLabel | string | undefined,
  fallback = ""
): string {
  if (typeof value === "string" && value.trim()) {
    return value;
  }
  if (value && typeof value === "object") {
    for (const key of ["default", "en", "la"]) {
      const item = value[key];
      if (typeof item === "string" && item.trim()) {
        return item;
      }
    }
    for (const item of Object.values(value)) {
      if (typeof item === "string" && item.trim()) {
        return item;
      }
    }
  }
  return fallback;
}

export function censusRowKey(row: CensusSchemaRow): string {
  return String(row.row_key || row.key || "");
}

export function censusRowLabel(row: CensusSchemaRow): string {
  const labeled = row as CensusSchemaRow & {
    label_i18n?: LocalizedLabel;
  };
  return censusLocalizedText(
    labeled.label_i18n || row.label,
    censusRowKey(row)
  );
}

export function measuresForRow(
  row: CensusSchemaRow,
  globalMeasures: CensusSchemaMeasure[]
): CensusSchemaMeasure[] {
  const rowMeasures = (row as { measures?: CensusSchemaMeasure[] }).measures;
  if (Array.isArray(rowMeasures) && rowMeasures.length) {
    return rowMeasures;
  }
  return globalMeasures;
}

export function animalSummaryFields(
  schema: CensusSchema
): CensusSchemaMeasure[] {
  if (schema.summary_fields?.length) {
    return schema.summary_fields;
  }
  return [
    {
      key: VILLAGE_HOUSEHOLD_KEY,
      label: "Village households",
      type: "integer",
      required: true,
    },
    {
      key: ANIMAL_HOUSEHOLD_KEY,
      label: "Households with animals",
      type: "integer",
      required: true,
    },
  ];
}

export function emptyFormValues(schema: CensusSchema): CensusFormValues {
  const values: CensusFormValues = { summary: {}, rows: {} };
  animalSummaryFields(schema).forEach(field => {
    values.summary[field.key] = "";
  });
  (schema.rows ?? []).forEach(row => {
    const key = censusRowKey(row);
    if (!key) {
      return;
    }
    values.rows[key] = {};
    measuresForRow(row, schema.measures ?? []).forEach(measure => {
      values.rows[key][measure.key] = "";
    });
  });
  return values;
}

export function parseQuantity(value: string): number | null {
  const trimmed = value.trim();
  if (!trimmed) {
    return null;
  }
  if (!/^\d+$/.test(trimmed)) {
    return null;
  }
  return Number(trimmed);
}

export function fieldKeyForRow(rowKey: string, measureKey: string): string {
  return `rows.${rowKey}.${measureKey}`;
}

export function fieldKeyForSummary(measureKey: string): string {
  return `summary.${measureKey}`;
}

export function prefillFormValues(
  schema: CensusSchema,
  snapshot?: VillageCensusSnapshot
): CensusFormValues {
  const values = emptyFormValues(schema);
  if (!snapshot) {
    return values;
  }

  const formRows = snapshot.formData?.rows ?? [];
  formRows.forEach(row => {
    const rowKey = row.row_key;
    if (!rowKey || !values.rows[rowKey] || !row.measures) {
      return;
    }
    Object.entries(row.measures).forEach(([measureKey, measureValue]) => {
      if (measureKey in values.rows[rowKey]) {
        values.rows[rowKey][measureKey] = String(measureValue ?? "");
      }
    });
  });

  snapshot.facts?.forEach(fact => {
    const row = values.rows[fact.rowKey];
    if (!row) {
      return;
    }
    if ("animal_quantity" in row && row.animal_quantity === "") {
      row.animal_quantity = String(fact.animalQuantity ?? 0);
    }
    if ("household_quantity" in row && row.household_quantity === "") {
      row.household_quantity = String(fact.householdQuantity ?? 0);
    }
  });

  const summary = snapshot.formData?.summary ?? {};
  Object.entries(summary).forEach(([key, value]) => {
    if (key in values.summary) {
      values.summary[key] = String(value ?? "");
    }
  });
  if (
    values.summary[VILLAGE_HOUSEHOLD_KEY] === "" &&
    typeof snapshot.villageHouseholdQuantity === "number"
  ) {
    values.summary[VILLAGE_HOUSEHOLD_KEY] = String(
      snapshot.villageHouseholdQuantity
    );
  }
  if (
    values.summary[ANIMAL_HOUSEHOLD_KEY] === "" &&
    typeof snapshot.animalHouseholdQuantity === "number"
  ) {
    values.summary[ANIMAL_HOUSEHOLD_KEY] = String(
      snapshot.animalHouseholdQuantity
    );
  }
  return values;
}

export function buildAnimalFormData(
  schema: CensusSchema,
  values: CensusFormValues
): CensusFormBuildResult {
  const fieldErrors: Record<string, string> = {};
  const summary: Record<string, number> = {};
  animalSummaryFields(schema).forEach(field => {
    const raw = values.summary[field.key] ?? "";
    const quantity = parseQuantity(raw);
    if (quantity === null) {
      fieldErrors[fieldKeyForSummary(field.key)] = raw.trim()
        ? "Must be zero or greater"
        : "Required";
      return;
    }
    summary[field.key] = quantity;
  });

  const villageHouseholds = summary[VILLAGE_HOUSEHOLD_KEY];
  const animalHouseholds = summary[ANIMAL_HOUSEHOLD_KEY];
  if (
    typeof villageHouseholds === "number" &&
    typeof animalHouseholds === "number" &&
    animalHouseholds > villageHouseholds
  ) {
    fieldErrors[fieldKeyForSummary(ANIMAL_HOUSEHOLD_KEY)] =
      "Animal households cannot exceed village households";
  }

  const rows: Array<{ row_key: string; measures: Record<string, number> }> = [];
  (schema.rows ?? []).forEach(row => {
    const rowKey = censusRowKey(row);
    if (!rowKey) {
      return;
    }
    const measures: Record<string, number> = {};
    measuresForRow(row, schema.measures ?? []).forEach(measure => {
      const raw = values.rows[rowKey]?.[measure.key] ?? "";
      const quantity = parseQuantity(raw);
      if (quantity === null) {
        fieldErrors[fieldKeyForRow(rowKey, measure.key)] = raw.trim()
          ? "Must be zero or greater"
          : "Required";
        return;
      }
      measures[measure.key] = quantity;
    });
    rows.push({ row_key: rowKey, measures });
  });

  if (schema.layout === "grouped_species") {
    Object.assign(
      fieldErrors,
      validateGroupedAnimalQuantities(schema, summary, rows)
    );
  }

  if (Object.keys(fieldErrors).length) {
    return { ok: false, fieldErrors };
  }
  return {
    ok: true,
    formData: {
      summary,
      rows,
    },
  };
}

export function validateGroupedAnimalQuantities(
  schema: CensusSchema,
  summary: Record<string, number>,
  rows: Array<{ row_key: string; measures: Record<string, number> }>
): Record<string, string> {
  const fieldErrors: Record<string, string> = {};
  const animalHouseholds = summary[ANIMAL_HOUSEHOLD_KEY];
  const measuresByRow = Object.fromEntries(
    rows.map(row => [row.row_key, row.measures])
  );

  (schema.groups ?? []).forEach(group => {
    const householdRowKey = group.household_row_key || `group:${group.key}`;
    const groupMeasures = measuresByRow[householdRowKey];
    if (!groupMeasures) {
      return;
    }
    const groupHh = groupMeasures.household_quantity;
    if (typeof groupHh !== "number") {
      return;
    }
    if (typeof animalHouseholds === "number" && groupHh > animalHouseholds) {
      fieldErrors[fieldKeyForRow(householdRowKey, "household_quantity")] =
        "Group households cannot exceed animal households";
    }

    const totalHeads = (group.species_row_keys ?? []).reduce((sum, rowKey) => {
      const heads = measuresByRow[rowKey]?.animal_quantity;
      return typeof heads === "number" ? sum + heads : sum;
    }, 0);

    if (totalHeads > 0 && groupHh < 1) {
      fieldErrors[fieldKeyForRow(householdRowKey, "household_quantity")] =
        "Group households must be at least 1 when animal quantity is greater than zero";
    }
    if (groupHh === 0 && totalHeads > 0) {
      fieldErrors[fieldKeyForRow(householdRowKey, "household_quantity")] =
        "Group animal quantities must be zero when households is zero";
    }
  });

  return fieldErrors;
}
