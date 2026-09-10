import { FieldViewModel } from "components/admin/formBuilder/field";
import { FormViewModel } from "components/admin/formBuilder/formViewModel";
import { QuestionViewModel } from "components/admin/formBuilder/question";
import {
  ComparableOperatorViewModel,
  ConditionDefinition,
  Definition,
} from "components/admin/formBuilder/shared";
import animalSickDeathDefinition from "components/admin/formBuilder/village-animal-sick-death-definition.json";

const membershipValues = "Cattle, Buffalo, Sheep, Goat";

function fieldConditionDefinition(operator = "in"): Definition {
  return {
    subforms: {},
    sections: [
      {
        label: "Condition owner",
        questions: [
          {
            label: "Field owner",
            description: "",
            fields: [
              {
                id: "disease",
                label: "Disease",
                name: "disease",
                type: "text",
                required: false,
                condition: {
                  name: "animal_species",
                  operator,
                  value: membershipValues,
                },
              },
            ],
          },
        ],
      },
    ],
  };
}

function parse(definition: Definition) {
  const form = new FormViewModel();
  form.parse(definition);
  return form;
}

function questionWithCondition(form: FormViewModel): QuestionViewModel {
  const question = form.sections
    .flatMap(section => section.questions)
    .find(question => Object.keys(question.condition.toJson()).length > 0);

  if (!question) {
    throw new Error("Expected a question with a condition");
  }
  return question;
}

function fieldWithCondition(form: FormViewModel): FieldViewModel {
  const field = form.sections
    .flatMap(section => section.questions)
    .flatMap(question => question.fields)
    .find(field => Object.keys(field.condition.toJson()).length > 0);

  if (!field) {
    throw new Error("Expected a field with a condition");
  }
  return field;
}

function comparableCondition(owner: QuestionViewModel | FieldViewModel) {
  const condition = owner.condition.instance;
  expect(condition).toBeInstanceOf(ComparableOperatorViewModel);
  return condition as ComparableOperatorViewModel;
}

function conditionJson(owner: QuestionViewModel | FieldViewModel) {
  const definition = owner.toJson() as Definition;
  return definition.condition as unknown as ConditionDefinition;
}

describe("Form Builder saved conditions", () => {
  it("parses the Animal Sick/Death question in condition and preserves it through a label-only round trip", () => {
    const form = parse(animalSickDeathDefinition as Definition);
    const question = questionWithCondition(form);

    const condition = comparableCondition(question);
    expect(condition.name).toBe("animal_species");
    expect(condition.operator).toBe("in");
    expect(condition.value).toBe(membershipValues);

    question.setLabel("Disease (updated label only)");
    const savedDefinition = JSON.parse(form.jsonString) as Definition;
    const reopenedQuestion = questionWithCondition(parse(savedDefinition));

    expect(conditionJson(reopenedQuestion)).toEqual({
      name: "animal_species",
      operator: "in",
      value: membershipValues,
    });
  });

  it("parses and preserves a field-owned in condition", () => {
    const field = fieldWithCondition(parse(fieldConditionDefinition()));

    const condition = comparableCondition(field);
    expect(condition.name).toBe("animal_species");
    expect(condition.operator).toBe("in");
    expect(condition.value).toBe(membershipValues);
    expect(conditionJson(field)).toEqual({
      name: "animal_species",
      operator: "in",
      value: membershipValues,
    });
  });

  it.each(["has_one_of", "hasOneOf", "isOneOf"])(
    "normalizes %s for the editor while preserving membership values",
    operator => {
      const field = fieldWithCondition(
        parse(fieldConditionDefinition(operator))
      );
      const condition = comparableCondition(field);

      expect(condition.operator).toBe("in");
      expect(condition.name).toBe("animal_species");
      expect(condition.value).toBe(membershipValues);
      expect(conditionJson(field)).toEqual({
        name: "animal_species",
        operator: "in",
        value: membershipValues,
      });
    }
  );

  it.each(["=", "!=", ">", ">=", "<", "<=", "contain", "between"])(
    "round trips the existing %s comparison operator",
    operator => {
      const field = fieldWithCondition(
        parse(fieldConditionDefinition(operator))
      );

      const condition = comparableCondition(field);
      expect(condition.operator).toBe(operator);
      expect(conditionJson(field)).toEqual({
        name: "animal_species",
        operator,
        value: membershipValues,
      });
    }
  );

  it("does not add a condition when the definition has none", () => {
    const form = parse({
      subforms: {},
      sections: [
        {
          label: "No condition",
          questions: [
            {
              label: "Question",
              description: "",
              fields: [],
            },
          ],
        },
      ],
    });

    expect(form.sections[0].questions[0].toJson().condition).toBeUndefined();
  });
});
