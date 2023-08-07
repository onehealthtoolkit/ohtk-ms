import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import { FormTransitionViewModel } from "components/case/caseState/formTransitionViewModel";
import { FormQuestion } from "components/formRenderer/question";
import BaseModalDialog from "components/widgets/dialogs/baseModalDialog";
import Spinner from "components/widgets/spinner";
import { Observer, observer } from "mobx-react";
import { useRef } from "react";
import { Trans, useTranslation } from "react-i18next";
import tw from "tailwind-styled-components";

type FormTransitionProps = {
  viewModel: FormTransitionViewModel;
  onTransitionComplete?: () => void;
};

const FormTransition = ({
  viewModel: form,
  onTransitionComplete,
}: FormTransitionProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  return (
    <BaseModalDialog
      store={form}
      heightClassName="min-h-[480px] h-[840px] max-h-[96vh]"
      widthClassName="min-w-[385px] w-[40vw] max-w-[90vw]"
      renderContent={() =>
        !form.errorRendering ? (
          <div className={`flex flex-col relative w-full h-full`}>
            <Stepper viewModel={form} />
            <h3 className="text-center bg-gray-100 p-4 font-medium">
              {form.currentSection
                ? form.currentSection?.label
                : t("dialog.title.confirmTransition", "Confirm transition")}
            </h3>
            <div
              ref={contentRef}
              className="text-left flex-grow overflow-y-auto overscroll-y-contain"
            >
              <FormInput viewModel={form} />
              {form.errorForwardState && (
                <div className="rounded p-4 border-2 border-red-300 text-red-500">
                  Transition incomplete, failed to forward case state.
                </div>
              )}
            </div>
            <Footer
              viewModel={form}
              onTransitionComplete={onTransitionComplete}
            />
          </div>
        ) : (
          <div className="text-red-500 text-lg text-center p-4">
            Error reading form definition!
          </div>
        )
      }
      renderAction={() => null}
    />
  );
};

export default observer(FormTransition);

const FormInput = ({
  viewModel: form,
}: {
  viewModel: FormTransitionViewModel;
}) => {
  return (
    <Observer>
      {() => (
        <>
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
              <Trans
                i18nKey="dialog.content.confirmTransition"
                defaults={`Are you want to change status to ${form.transition.toStep?.name} ?`}
                values={{ stepName: form.transition.toStep?.name }}
              />
            </div>
          )}
        </>
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
  onTransitionComplete,
}: {
  viewModel: FormTransitionViewModel;
  onTransitionComplete?: () => void;
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
              onClick={() => {
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
              onClick={async () => {
                if (form.currentSection) {
                  if (form.currentSection.validate()) {
                    const success = await form.submit();
                    if (success) {
                      onTransitionComplete && onTransitionComplete();
                    }
                  }
                } else {
                  // skip validation for empty form
                  const success = await form.submit();
                  if (success) {
                    onTransitionComplete && onTransitionComplete();
                  }
                }
              }}
            >
              {!form.isSubmitting ? (
                <span>{form.currentSection ? "Submit" : "Confirm"}</span>
              ) : (
                <Spinner />
              )}
            </NavigateButton>
          ) : (
            <NavigateButton
              onClick={() => {
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
  ({ viewModel }: { viewModel: FormTransitionViewModel }) => {
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
