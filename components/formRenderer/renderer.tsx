import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import { FormQuestion } from "components/formRenderer/question";
import {
  FormRendererViewModel,
  RendererState,
} from "components/formRenderer/rendererViewModel";
import { Observer, observer } from "mobx-react";
import { FC } from "react";

export type FormRendererProps = {
  viewModel: FormRendererViewModel;
};

const FormRenderer: FC<FormRendererProps> = ({ viewModel: form }) => {
  return (
    <div className="flex flex-col relative w-full h-screen">
      {form.state == RendererState.formInput && (
        <>
          <h3 className="text-center bg-gray-100 p-4 font-medium">
            {form.currentSection?.label}
          </h3>
          <FormInput viewModel={form} />
        </>
      )}
      {form.state == RendererState.confirmation && (
        <>
          <h3 className="text-center bg-gray-100 p-4 font-medium">Confirm</h3>
          <ConfirmSubmit viewModel={form} />
        </>
      )}
      <Footer viewModel={form} />
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
        <div className="h-3/5 overflow-y-auto">
          {form.currentSection?.questions.map((question, index) => (
            <FormQuestion key={index + question.label} question={question} />
          ))}
        </div>
      )}
    </Observer>
  );
};

const ConfirmSubmit = ({
  viewModel: form,
}: {
  viewModel: FormRendererViewModel;
}) => {
  console.log(form.id);
  return (
    <Observer>
      {() => <div className="h-3/5 overflow-y-auto">confirm submit</div>}
    </Observer>
  );
};

const Footer = ({ viewModel: form }: { viewModel: FormRendererViewModel }) => {
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
            onClick={() => form.previous()}
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
              onClick={() => form.next()}
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
