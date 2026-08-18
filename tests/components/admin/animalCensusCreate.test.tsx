/**
 * @jest-environment jsdom
 */
import { fireEvent, render, screen } from "@testing-library/react";
import AnimalCensusCreate from "components/admin/animalCensus/create";
import { AnimalCensusCreateViewModel } from "components/admin/animalCensus/createViewModel";
import { emptyFormValues } from "components/admin/animalCensus/formData";
import { CensusDefinitionVersion, CensusSchema } from "lib/services/census";
import { runInAction } from "mobx";

jest.mock("next/router", () => ({
  useRouter: () => ({
    query: {},
    push: jest.fn(),
    pathname: "/admin/census/animal/create",
  }),
}));

jest.mock("lib/store", () => ({
  __esModule: true,
  default: () => ({ authorityId: 1 }),
}));

jest.mock("lib/services/provider", () => ({
  __esModule: true,
  default: () => ({
    villageService: {},
    censusDefinitionService: {},
    censusRoundService: {},
    censusSnapshotService: {},
  }),
}));

const groupedSchema: CensusSchema = {
  layout: "grouped_species",
  summary_fields: [
    { key: "village_household_quantity", label: "Village households" },
    { key: "animal_household_quantity", label: "Households with animals" },
  ],
  groups: [
    {
      key: "LARGE_RUMINANT",
      label: "Cattle and buffalo",
      household_row_key: "group:LARGE_RUMINANT",
      species_row_keys: ["species:CATTLE", "species:BUFFALO"],
    },
  ],
  rows: [
    {
      row_key: "group:LARGE_RUMINANT",
      label: "Cattle and buffalo",
      measures: [{ key: "household_quantity", label: "Households" }],
    },
    {
      row_key: "species:CATTLE",
      label: "Cattle",
      measures: [{ key: "animal_quantity", label: "Animal quantity" }],
    },
    {
      row_key: "species:BUFFALO",
      label: "Buffalo",
      measures: [{ key: "animal_quantity", label: "Animal quantity" }],
    },
  ],
};

function typeDigits(input: HTMLElement, text: string) {
  let current = "";
  for (const char of text) {
    current += char;
    fireEvent.change(input, { target: { value: current } });
  }
}

function formViewModel() {
  const viewModel = new AnimalCensusCreateViewModel(
    {} as never,
    {} as never,
    {} as never,
    {} as never,
    {}
  );
  const definition: CensusDefinitionVersion = {
    id: "1",
    version: 1,
    status: "PUBLISHED",
    schema: groupedSchema,
    runtimeSchema: groupedSchema,
    definition: {
      id: "1",
      kind: "ANIMAL",
      enabled: true,
      sortOrder: 1,
    },
  };
  runInAction(() => {
    viewModel.step = "form";
    viewModel.selectedVillageId = "11";
    viewModel.villages = [
      {
        id: "11",
        code: "ST-01",
        name: "Ban Test",
        active: true,
        authorityId: 1,
      },
    ];
    viewModel.selectedOccurrenceId = "9";
    viewModel.occurrences = [
      {
        id: "9",
        occurrenceKey: "DEMO_ANIMAL_2026",
        status: "OPEN",
        mode: "PRODUCTION",
        startDate: "2026-01-01",
        softFinishDate: "2026-12-01",
        hardFinishDate: "2026-12-31",
      } as never,
    ];
    viewModel.definition = definition;
    viewModel.values = emptyFormValues(groupedSchema);
  });
  return viewModel;
}

describe("animal census create form binding", () => {
  it("keeps multi-digit values while typing village, group, and species fields", () => {
    const viewModel = formViewModel();
    render(<AnimalCensusCreate viewModel={viewModel} />);

    const villageHouseholds = screen.getByLabelText("Village households");
    const animalHouseholds = screen.getByLabelText("Households with animals");
    const groupHouseholds = screen.getByLabelText("Households");
    const cattle = screen.getByLabelText("Cattle");
    const buffalo = screen.getByLabelText("Buffalo");

    typeDigits(villageHouseholds, "25");
    typeDigits(animalHouseholds, "20");
    typeDigits(groupHouseholds, "8");
    typeDigits(cattle, "12");
    typeDigits(buffalo, "3");

    expect(villageHouseholds).toHaveValue("25");
    expect(animalHouseholds).toHaveValue("20");
    expect(groupHouseholds).toHaveValue("8");
    expect(cattle).toHaveValue("12");
    expect(buffalo).toHaveValue("3");
    expect(viewModel.values.summary.village_household_quantity).toBe("25");
    expect(
      viewModel.values.rows["group:LARGE_RUMINANT"].household_quantity
    ).toBe("8");
    expect(viewModel.values.rows["species:CATTLE"].animal_quantity).toBe("12");
    expect(viewModel.values.rows["species:BUFFALO"].animal_quantity).toBe("3");
  });
});
