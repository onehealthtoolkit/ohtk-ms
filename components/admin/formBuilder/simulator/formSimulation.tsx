import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import { FormSimulationViewModel } from "components/admin/formBuilder/simulator/formSimulationViewModel";
import { FormQuestion } from "components/formRenderer/question";
import Spinner from "components/widgets/spinner";
import { Observer, observer } from "mobx-react";
import { useEffect, useRef } from "react";
import tw from "tailwind-styled-components";

type FormSimulationProps = {
  viewModel?: FormSimulationViewModel;
  rendererDataTemplate: string;
  onSubmit?: () => void;
};

const FormSimulation = ({
  viewModel: form,
  onSubmit,
  rendererDataTemplate,
}: FormSimulationProps) => {
  if (!form) {
    return null;
  }

  if (rendererDataTemplate) form.rendererDataTemplate = rendererDataTemplate;

  return !form.errorRendering ? (
    <div className={`flex flex-col relative w-full`}>
      <Stepper viewModel={form} />
      <h3 className="text-center bg-gray-100 p-4 font-medium">
        {form.currentSection ? form.currentSection?.label : "Blank Form"}
      </h3>

      <FormInput viewModel={form} />
      {form.isSubmitted && (
        <div className="rounded p-4 border-2 border-green-30">
          <div className="text-green-600 text-2xl">
            Simulating submission is complete
          </div>
          <div className="text-green-700">Case Definitions: </div>
          <ul className="text-gray-600 pl-10 list-disc">
            {form.simulatorIncidentReportType?.caseDefinitions.map(item => (
              <li key={item.id}>{item.description}</li>
            ))}
          </ul>
          <div className="text-green-700">Reporter Alerts:</div>
          <ul className="text-gray-600 pl-10 list-disc">
            {form.simulatorIncidentReportType?.reporterNotifications.map(
              item => (
                <li key={item.id}>{item.name}</li>
              )
            )}
          </ul>
          <div className="text-green-700">Description:</div>
          <ul className="text-gray-600 pl-10">
            <li>{form.simulatorIncidentReportType?.rendererData}</li>
          </ul>
        </div>
      )}
      <Footer viewModel={form} onSubmit={onSubmit} />
    </div>
  ) : (
    <div className="text-red-500 text-lg text-center p-4">
      Error reading form definition!
    </div>
  );
};

export default observer(FormSimulation);

const FormInput = ({
  viewModel: form,
}: {
  viewModel: FormSimulationViewModel;
}) => {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    contentRef.current?.scrollTo(0, 0);
  }, [form.currentSection]);

  return (
    <Observer>
      {() => (
        <div
          ref={contentRef}
          className="text-left overflow-y-auto overscroll-y-contain min-height-[500px]"
        >
          {form.currentSection?.questions?.length ? (
            form.currentSection?.questions.map((question, index) => (
              <FormQuestion
                key={index + question.label}
                question={question}
                definition={form.definition}
              />
            ))
          ) : (
            <div className="text-center text-lg text-gray-500 p-4">
              No questions
            </div>
          )}
        </div>
      )}
    </Observer>
  );
};

const NavigateButton = tw.button`
  flex justify-center items-center px-4 py-2 text-sm 
  font-medium text-white bg-blue-600 hover:bg-blue-800 
  focus:z-10 focus:ring-2 focus:ring-blue-200 w-1/2
`;

const Footer = ({
  viewModel: form,
  onSubmit,
}: {
  viewModel: FormSimulationViewModel;
  onSubmit?: () => void;
}) => {
  return (
    <Observer>
      {() => (
        <div
          className={`flex flex-row gap-8 mt-4 pt-4 border-t-2 border-gray-300
          ${form.isFirst ? "justify-end" : "justify-center"}`}
        >
          {form.isFirst ? null : (
            <NavigateButton
              onClick={(e: MouseEvent) => {
                e.preventDefault();
                form.previous();
              }}
            >
              <ChevronLeftIcon className="h-5 w-5 text-white" />
              <span className="mr-2">Back</span>
            </NavigateButton>
          )}
          {form.isLast ? (
            <NavigateButton
              disabled={form.isSubmitting}
              onClick={(e: MouseEvent) => {
                e.preventDefault();
                form.next();
                console.log("isSubmitting", form.form?.toJsonValue());
                if (form.isSubmitting && onSubmit) {
                  onSubmit();
                }
              }}
            >
              {!form.isSubmitting ? (
                <span>{form.currentSection ? "Submit" : "Skip"}</span>
              ) : (
                <Spinner />
              )}
            </NavigateButton>
          ) : (
            <NavigateButton
              onClick={(e: MouseEvent) => {
                e.preventDefault();
                form.next();
              }}
            >
              <span className="ml-2">Next</span>
              <ChevronRightIcon className="h-5 w-5 text-white" />
            </NavigateButton>
          )}
        </div>
      )}
    </Observer>
  );
};

const Stepper = observer(
  ({ viewModel }: { viewModel: FormSimulationViewModel }) => {
    const pages = [...Array<number>(viewModel.form?.sections.length || 0)];
    return pages.length > 1 ? (
      <div className="flex flex-row flex-wrap justify-center bg-gray-100 pt-4 font-medium">
        {pages.map((_, index) => (
          <div
            className="flex flex-row justify-center items-center"
            key={"step" + index}
          >
            <div
              className={`rounded-full h-8 w-8 bg-white text-center leading-7 border-2
              ${
                index === viewModel.form?.currentSecitonIdx
                  ? "border-blue-400"
                  : "border-gray-300"
              }`}
            >
              {index + 1}
            </div>
            {index < pages.length - 1 && (
              <div className="h-1 w-4 bg-gray-300"></div>
            )}
          </div>
        ))}
      </div>
    ) : null;
  }
);
