import IntegerField from "lib/opsvForm/models/fields/integerField";
import TextField from "lib/opsvForm/models/fields/textField";
import Form from "lib/opsvForm/models/form";
import { FormType, parseForm } from "lib/opsvForm/models/json";
import Section from "lib/opsvForm/models/section";

const testForm: FormType = {
  id: "12323",
  sections: [
    {
      label: "section 1",
      description: "section 1 descrition",
      questions: [
        {
          label: "Name",
          fields: [
            {
              id: "1",
              type: "text",
              name: "first_name",
              label: "First Name",
              required: true,
              requiredMessage: "this field is required",
              minLength: 3,
              minLengthMessage: "must more than 3",
              maxLength: 100,
              maxLengthMessage: "must less than 100",
            },
            {
              id: "2",
              type: "integer",
              name: "age",
              label: "Age",
              min: 10,
              minMessage: "more than 10",
              max: 20,
              maxMessage: "less than 20",
              required: true,
              requiredMessage: "this field is required",
            },
          ],
        },
      ],
    },
    {
      label: "section 2",
      questions: [
        {
          label: "Address",
          fields: [
            {
              id: "3",
              type: "text",
              name: "zip_code",
              label: "Zip code",
            },
            {
              id: "4",
              type: "decimal",
              name: "salary",
              label: "salary",
              required: true,
              requiredMessage: "salary is required",
            },
          ],
        },
      ],
    },
  ],
};

describe("Form", () => {
  it("navigation", () => {
    const form = new Form("formid");
    form.sections = [
      new Section("section1"),
      new Section("section2"),
      new Section("section3"),
    ];

    expect(form.currentSectionIdx).toBe(0);
    expect(form.couldGoToNextSection).toBeTruthy();
    expect(form.couldGoToPreviousSection).toBeFalsy();
    expect(form.currentSection.label).toBe("section1");

    form.next();
    expect(form.currentSectionIdx).toBe(1);
    expect(form.couldGoToNextSection).toBeTruthy();
    expect(form.couldGoToPreviousSection).toBeTruthy();
    expect(form.currentSection.label).toBe("section2");

    form.next();
    expect(form.currentSectionIdx).toBe(2);
    expect(form.couldGoToNextSection).toBeFalsy();
    expect(form.couldGoToPreviousSection).toBeTruthy();
    expect(form.currentSection.label).toBe("section3");

    form.next();
    expect(form.currentSectionIdx).toBe(2);
    expect(form.couldGoToNextSection).toBeFalsy();
    expect(form.couldGoToPreviousSection).toBeTruthy();
    expect(form.currentSection.label).toBe("section3");

    form.previous();
    expect(form.currentSectionIdx).toBe(1);
    expect(form.couldGoToNextSection).toBeTruthy();
    expect(form.couldGoToPreviousSection).toBeTruthy();
    expect(form.currentSection.label).toBe("section2");

    form.previous();
    expect(form.currentSectionIdx).toBe(0);
    expect(form.couldGoToNextSection).toBeTruthy();
    expect(form.couldGoToPreviousSection).toBeFalsy();
    expect(form.currentSection.label).toBe("section1");
  });

  it("validation should be check to all field in section", () => {
    const form = parseForm(testForm);
    form.currentSection.validate();
    const firstNameField = form.getField("first_name");
    const ageField = form.getField("age");
    expect(firstNameField.invalidMessage).toBeDefined();
    expect(ageField.invalidMessage).toBeDefined();
  });

  it("validation", () => {
    const form = parseForm(testForm);
    expect(form.currentSection.validate()).toBeFalsy();
    form.getField<TextField>("first_name").value = "test";
    expect(form.currentSection.validate()).toBeFalsy();
    form.getField<IntegerField>("age").value = 22;
    expect(form.currentSection.validate()).toBeFalsy();
    form.getField<IntegerField>("age").value = 18;
    expect(form.currentSection.validate()).toBeTruthy();
  });

  it("should not goto next section if not validated", () => {
    const form = parseForm(testForm);
    expect(form.currentSecitonIdx).toBe(0);

    expect(form.currentSection.validate()).toBeFalsy();
    form.next();
    expect(form.currentSecitonIdx).toBe(0);

    form.getField<TextField>("first_name").value = "test";
    form.getField<IntegerField>("age").value = 18;

    form.next();
    expect(form.currentSecitonIdx).toBe(1);
  });

  it("load json definition", () => {
    const source: FormType = testForm;
    const form = parseForm(source);
    expect(form.id).toEqual("12323");
    expect(form.numberOfSections).toBe(2);
    expect(form.sections[0].label).toBe(source["sections"][0]["label"]);
    expect(form.sections[0].questions.length).toBe(1);
    expect(form.sections[0].questions[0].label).toBe(
      source["sections"][0]["questions"][0]["label"]
    );
    expect(form.sections[0].questions[0].description).toBe(
      source["sections"][0]["questions"][0]["description"]
    );
    expect(form.sections[0].questions[0].fields.length).toBe(2);
  });

  describe("form values", () => {
    it("flatten fields", () => {
      const form: Form = parseForm({
        id: "1",
        sections: [
          {
            label: "section1",
            questions: [
              {
                label: "q1",
                fields: [
                  {
                    type: "text",
                    id: "f1",
                    name: "firstname",
                  },
                  {
                    type: "text",
                    id: "f2",
                    name: "lastname",
                  },
                ],
              },
            ],
          },
        ],
      });
      const field1 = form.values.getDelegate("firstname").getField();
      expect(field1).toBeDefined();
      expect(field1.id).toBe("f1");
      const field2 = form.values.getDelegate("lastname").getField();
      expect(field2).toBeDefined();
      expect(field2.id).toBe("f2");
    });

    it("nested field", () => {
      const form: Form = parseForm({
        id: "1",
        sections: [
          {
            label: "section1",
            questions: [
              {
                label: "q1",
                name: "info",
                fields: [
                  {
                    type: "text",
                    id: "f1",
                    name: "firstname",
                  },
                  {
                    type: "text",
                    id: "f2",
                    name: "lastname",
                  },
                ],
              },
            ],
          },
        ],
      });
      const field1 = form.values.getDelegate("info.firstname").getField();
      expect(field1).toBeDefined();
      expect(field1.id).toBe("f1");

      expect(form.getField("info.firstname")).toBeDefined();

      const field2 = form.values.getDelegate("info.lastname").getField();
      expect(field2).toBeDefined();
      expect(field2.id).toBe("f2");
    });
  });
});
