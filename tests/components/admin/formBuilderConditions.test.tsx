/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import { FieldActionBar } from "components/admin/formBuilder/field/fieldActionBar";
import { FieldViewModel } from "components/admin/formBuilder/field/fieldViewModel";
import { FormViewModel } from "components/admin/formBuilder/formViewModel";
import { QuestionActionBar } from "components/admin/formBuilder/question/questionActionBar";
import {
  AdvanceCondition,
  Definition,
} from "components/admin/formBuilder/shared";

const membershipValues = "Cattle, Buffalo, Sheep, Goat";

const definition: Definition = {
  subforms: {},
  sections: [
    {
      label: "Condition owner",
      questions: [
        {
          label: "Question owner",
          description: "",
          condition: {
            name: "animal_species",
            operator: "in",
            value: membershipValues,
          },
          fields: [
            {
              id: "disease",
              label: "Disease",
              name: "disease",
              type: "text",
              required: false,
              condition: {
                name: "animal_species",
                operator: "in",
                value: membershipValues,
              },
            },
          ],
        },
      ],
    },
  ],
};

function parse() {
  const form = new FormViewModel();
  form.parse(definition);
  const question = form.sections[0].questions[0];
  return { question, field: question.fields[0] as FieldViewModel };
}

describe("Form Builder condition editor", () => {
  it("shows a saved question in condition after Advanced is expanded", () => {
    const { question } = parse();
    question.toggleAdvanceOn();

    render(
      <QuestionActionBar value={question} onDelete={jest.fn()}>
        {viewModel => <AdvanceCondition viewModel={viewModel} />}
      </QuestionActionBar>
    );

    expect(
      screen.getByRole("heading", { name: "Question display condition" })
    ).toBeInTheDocument();
    expect(screen.getByDisplayValue("animal_species")).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toHaveValue("in");
    expect(screen.getByDisplayValue(membershipValues)).toBeInTheDocument();
  });

  it("shows a saved field in condition after Advanced is expanded", () => {
    const { field } = parse();
    field.toggleAdvanceOn();

    render(
      <FieldActionBar value={field} onDelete={jest.fn()}>
        {viewModel => <AdvanceCondition viewModel={viewModel} />}
      </FieldActionBar>
    );

    expect(
      screen.getByRole("heading", { name: "Field display condition" })
    ).toBeInTheDocument();
    expect(screen.getByDisplayValue("animal_species")).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toHaveValue("in");
    expect(screen.getByDisplayValue(membershipValues)).toBeInTheDocument();
  });
});
