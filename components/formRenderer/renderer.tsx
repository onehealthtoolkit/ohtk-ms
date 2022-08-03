import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import { FormQuestion } from "components/formRenderer/question";
import {
  FormRendererViewModel,
  RendererState,
} from "components/formRenderer/rendererViewModel";
import { Observer, observer } from "mobx-react";
import { FC, useRef } from "react";

export type FormRendererProps = {
  viewModel: FormRendererViewModel;
  height: string; // ie. 300px, 100%, 800vh, 10em
};

const FormRenderer: FC<FormRendererProps> = ({ viewModel: form, height }) => {
  const contentRef = useRef<HTMLDivElement>(null);

  return !form.errorRendering ? (
    <div className={`flex flex-col relative w-full h-full`}>
      <Stepper viewModel={form} />
      <h3 className="text-center bg-gray-100 p-4 font-medium">
        {form.state == RendererState.formInput
          ? form.currentSection
            ? form.currentSection?.label
            : "Blank form!"
          : "Confirmation"}
      </h3>
      <div
        ref={contentRef}
        className="overflow-y-auto"
        style={{ height: height }}
      >
        {form.state == RendererState.formInput && (
          <FormInput viewModel={form} />
        )}
        {form.state == RendererState.confirmation && (
          <ConfirmSubmit viewModel={form} />
        )}
      </div>
      <Footer
        viewModel={form}
        onNavigate={() => contentRef.current?.scrollTo(0, 0)}
      />
    </div>
  ) : (
    <div className="text-red-500 text-lg text-center p-4">
      Error reading form definition!
    </div>
  );
};

export default observer(FormRenderer);

const FormInput = ({
  viewModel: form,
}: {
  viewModel: FormRendererViewModel;
}) => {
  return (
    <Observer>
      {() => (
        <>
          {form.currentSection?.questions?.length ? (
            form.currentSection?.questions.map((question, index) => (
              <FormQuestion key={index + question.label} question={question} />
            ))
          ) : (
            <div className="text-center text-lg text-gray-500 p-4">
              No questions
            </div>
          )}
        </>
      )}
    </Observer>
  );
};

const ConfirmSubmit = ({
  viewModel: form,
}: {
  viewModel: FormRendererViewModel;
}) => {
  return (
    <Observer>
      {() => (
        <div className="p-4">
          <h4 className="text-medium text-gray-800">
            Did this incident occur in your own authority?
          </h4>
          <div className="flex flex-col gap-2 mt-4">
            <label className="flex items-center ml-2">
              <input
                className="mr-2"
                type={"radio"}
                value={"yes"}
                checked={form.incidentInAuthority === "yes"}
                onChange={e => (form.incidentInAuthority = e.target.value)}
              />
              Yes
            </label>
            <label className="flex items-center ml-2">
              <input
                className="mr-2"
                type={"radio"}
                value={"no"}
                checked={form.incidentInAuthority === "no"}
                onChange={e => (form.incidentInAuthority = e.target.value)}
              />
              No
            </label>
          </div>
        </div>
      )}
    </Observer>
  );
};

const Footer = ({
  viewModel: form,
  onNavigate,
}: {
  viewModel: FormRendererViewModel;
  onNavigate: (direction: string) => void;
}) => {
  return (
    <Observer>
      {() => (
        <div className="flex flex-row justify-center gap-8 mt-8">
          <button
            type="button"
            className="flex justify-center items-center px-4 py-2 text-sm 
              font-medium text-white bg-blue-600 hover:bg-blue-800 
              focus:z-10 focus:ring-2 focus:ring-blue-200 w-1/2
            "
            onClick={() => {
              form.previous();
              onNavigate("back");
            }}
          >
            <ChevronLeftIcon className="h-5 w-5 text-white" />
            <span className="mr-2">Back</span>
          </button>
          {form.state == RendererState.formInput && (
            <button
              type="button"
              className="flex justify-center items-center px-4 py-2 text-sm 
              font-medium text-white bg-blue-600 hover:bg-blue-800 
              focus:z-10 focus:ring-2 focus:ring-blue-200 w-1/2
            "
              onClick={() => {
                form.next();
                if (form.isSectionValid) {
                  onNavigate("next");
                }
              }}
            >
              <span className="ml-2">Next</span>
              <ChevronRightIcon className="h-5 w-5 text-white" />
            </button>
          )}
          {form.state == RendererState.confirmation && (
            <button
              type="button"
              className="flex justify-center items-center px-4 py-2 text-sm 
              font-medium text-white bg-blue-600 hover:bg-blue-800 
              focus:z-10 focus:ring-2 focus:ring-blue-200 w-1/2
            "
              onClick={() => form.submit()}
            >
              <span>Submit</span>
            </button>
          )}
        </div>
      )}
    </Observer>
  );
};

const Stepper = observer(
  ({ viewModel }: { viewModel: FormRendererViewModel }) => {
    const pages = [...Array<number>(viewModel.form?.sections.length || 0)];
    return (
      <div className="flex flex-row justify-center bg-gray-100 pt-4 font-medium">
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
              <div className="h-1 w-6 bg-gray-300"></div>
            )}
          </div>
        ))}
      </div>
    );
  }
);
