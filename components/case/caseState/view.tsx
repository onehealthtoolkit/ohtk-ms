import FormTransition from "components/case/caseState/formTransition";
import { CaseStateViewViewModel } from "components/case/caseState/viewViewModel";
import ErrorDisplay from "components/widgets/errorDisplay";
import { MaskingLoader } from "components/widgets/forms";
import { renderData } from "components/widgets/renderData";
import { formatDateTime } from "lib/datetime";
import { CaseState, CaseStateTransition } from "lib/services/case/case";
import { DeepStateStep } from "lib/services/stateStep/stateStep";
import { observer } from "mobx-react";
import { useRouter } from "next/router";
import { FC, ReactElement } from "react";

type CaseStateViewProps = {
  viewModel: CaseStateViewViewModel;
  onTransitionComplete: () => void;
};

const CaseStateView: FC<CaseStateViewProps> = ({
  viewModel,
  onTransitionComplete,
}: CaseStateViewProps) => {
  return (
    <MaskingLoader loading={viewModel.isLoading}>
      <>
        {viewModel.states.map((caseState, index) => (
          <CaseStateStep
            key={caseState.id}
            caseState={caseState}
            onTransitionSelect={(transitionId, formDefinition) =>
              viewModel.showFormTransitionDialog(transitionId, formDefinition)
            }
          >
            {index < viewModel.states.length - 1 ? <StateArrow /> : null}
          </CaseStateStep>
        ))}
        <ErrorDisplay message={viewModel.errorMessage} />
        {viewModel.formTransitionViewModel && (
          <FormTransition
            viewModel={viewModel.formTransitionViewModel}
            onTransitionComplete={() => {
              viewModel.formTransitionViewModel?.close();
              onTransitionComplete();
            }}
          />
        )}
      </>
    </MaskingLoader>
  );
};

const StateArrow = () => {
  return (
    <div className="w-full md:w-1/2 my-4">
      <div className="w-5 h-10 bg-gray-300 mx-auto"></div>
      <div
        className="mx-auto w-0 h-0 
                  border-l-[20px] border-l-transparent
                  border-t-[15px] border-t-gray-300
                  border-r-[20px] border-r-transparent
                "
      ></div>
    </div>
  );
};

export default observer(CaseStateView);

type OnTransitionSelect = (id: string, formDefinition?: string) => void;

type CaseStateStepProps = {
  caseState: CaseState;
  onTransitionSelect: OnTransitionSelect;
  children: ReactElement | null;
};

const CaseStateStep: FC<CaseStateStepProps> = ({
  caseState,
  onTransitionSelect,
  children,
}: CaseStateStepProps) => {
  return (
    <>
      <div className="border border-gray-300 rounded-md shadow md:w-1/2">
        <h3
          className={`py-4 px-4 md:px-8 text-xl rounded-t-md border ${
            caseState.transition
              ? "bg-gray-200 border-gray-200 text-gray-600"
              : "bg-blue-600 border-blue-600 text-white"
          }`}
        >
          {caseState.state.name}
        </h3>
        <div className="px-4 md:px-8 py-2 md:py-4">
          {caseState.transition ? (
            <CompleteStep stateTransition={caseState.transition} />
          ) : (
            <PendingStep
              stateStep={caseState.state}
              onTransitionSelect={onTransitionSelect}
            />
          )}
        </div>
      </div>
      {children}
    </>
  );
};

type PendingStepProps = {
  stateStep: DeepStateStep;
  onTransitionSelect: OnTransitionSelect;
};

const PendingStep: FC<PendingStepProps> = ({
  stateStep,
  onTransitionSelect,
}: PendingStepProps) => {
  return !stateStep.isStopState ? (
    <div
      className={`grid grid-cols-${stateStep.toTransitions?.length || 0} gap-4`}
    >
      {stateStep.toTransitions?.map(
        transition =>
          transition && (
            <button
              key={transition.id}
              className={`p-2 bg-blue-200 hover:bg-blue-300 rounded-sm 
                  w-full border-2 focus:z-10 focus:ring-2 focus:ring-blue-200
                `}
              onClick={e => {
                e.preventDefault();
                onTransitionSelect(transition.id, transition.formDefinition);
              }}
            >
              {transition.toStep?.name}
            </button>
          )
      )}
    </div>
  ) : (
    <div>End of step</div>
  );
};

type CompleteStepProps = {
  stateTransition: CaseStateTransition;
};

const CompleteStep: FC<CompleteStepProps> = ({
  stateTransition,
}: CompleteStepProps) => {
  const router = useRouter();
  const data = JSON.parse(stateTransition.formData || "{}");
  return (
    <div className="text-base flex flex-wrap">
      <div className="w-1/2 mb-4">
        By {"  "}
        {stateTransition.createdBy.firstName + "  "}
        {stateTransition.createdBy.lastName}
      </div>
      <div className="w-1/2 mb-4 text-right">
        at {formatDateTime(stateTransition.createdAt, router.locale)}
      </div>
      {renderData(data)}
    </div>
  );
};
