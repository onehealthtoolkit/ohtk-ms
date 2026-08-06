import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { FormRuntimeViewModel } from "components/report/formRuntimeViewModel";
import { FormQuestion } from "components/formRenderer/question";
import Spinner from "components/widgets/spinner";
import { Observer, observer } from "mobx-react";
import { MouseEvent, useEffect, useRef } from "react";
import tw from "tailwind-styled-components";
import { useTranslation } from "react-i18next";

type FormRuntimeProps = {
  viewModel: FormRuntimeViewModel;
  /** Called when user finishes the last section successfully (validated). */
  onSubmit: () => void | Promise<void>;
  submitLabel?: string;
};

/**
 * Runtime form UI derived from form simulation (sections, stepper, next/back).
 * Submits via parent callback (real mutation), not simulation endpoint.
 */
const FormRuntime = ({
  viewModel: form,
  onSubmit,
  submitLabel,
}: FormRuntimeProps) => {
  const { t } = useTranslation();
  if (form.errorRendering) {
    return (
      <div className="text-red-500 text-lg text-center p-4">
        {t("report.form.errorDefinition", "Error reading form definition!")}
      </div>
    );
  }

  return (
    <div className="flex flex-col relative w-full">
      <Stepper viewModel={form} />
      <h3 className="text-center bg-gray-100 p-4 font-medium">
        {form.currentSection
          ? form.currentSection?.label
          : t("report.form.blank", "Blank Form")}
      </h3>
      <FormInput viewModel={form} />
      {form.submitError && (
        <div className="text-red-600 text-sm p-3 border border-red-200 rounded mt-2">
          {form.submitError}
        </div>
      )}
      <Footer
        viewModel={form}
        onSubmit={onSubmit}
        submitLabel={
          submitLabel || t("form.button.submit", "Submit")
        }
      />
    </div>
  );
};

export default observer(FormRuntime);

const FormInput = ({
  viewModel: form,
}: {
  viewModel: FormRuntimeViewModel;
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  useEffect(() => {
    contentRef.current?.scrollTo(0, 0);
  }, [form.currentSection]);

  return (
    <Observer>
      {() => (
        <div
          ref={contentRef}
          className="text-left overflow-y-auto overscroll-y-contain min-h-[320px]"
        >
          {form.currentSection?.questions?.length ? (
            form.currentSection?.questions.map((question, index) => (
              <FormQuestion
                key={index + question.label}
                question={question}
                definition={form.definitionRaw}
              />
            ))
          ) : (
            <div className="text-center text-lg text-gray-500 p-4">
              {t("report.form.noQuestions", "No questions")}
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
  disabled:opacity-50
`;

const Footer = ({
  viewModel: form,
  onSubmit,
  submitLabel,
}: {
  viewModel: FormRuntimeViewModel;
  onSubmit: () => void | Promise<void>;
  submitLabel: string;
}) => {
  const { t } = useTranslation();
  return (
    <Observer>
      {() => (
        <div
          className={`flex flex-row gap-8 mt-4 pt-4 border-t-2 border-gray-300
          ${form.isFirst ? "justify-end" : "justify-center"}`}
        >
          {form.isFirst ? null : (
            <NavigateButton
              type="button"
              onClick={(e: MouseEvent<HTMLButtonElement>) => {
                e.preventDefault();
                form.previous();
              }}
            >
              <ChevronLeftIcon className="h-5 w-5 text-white" />
              <span className="mr-2">{t("form.button.back", "Back")}</span>
            </NavigateButton>
          )}
          {form.isLast ? (
            <NavigateButton
              type="button"
              disabled={form.isSubmitting}
              onClick={async (e: MouseEvent<HTMLButtonElement>) => {
                e.preventDefault();
                form.next();
                const data = form.buildValidatedData();
                if (!data) return;
                await onSubmit();
              }}
            >
              {!form.isSubmitting ? (
                <span>
                  {form.currentSection
                    ? submitLabel
                    : t("form.button.skip", "Skip")}
                </span>
              ) : (
                <Spinner />
              )}
            </NavigateButton>
          ) : (
            <NavigateButton
              type="button"
              onClick={(e: MouseEvent<HTMLButtonElement>) => {
                e.preventDefault();
                form.next();
              }}
            >
              <span className="ml-2">{t("form.button.next", "Next")}</span>
              <ChevronRightIcon className="h-5 w-5 text-white" />
            </NavigateButton>
          )}
        </div>
      )}
    </Observer>
  );
};

const Stepper = observer(
  ({ viewModel }: { viewModel: FormRuntimeViewModel }) => {
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
