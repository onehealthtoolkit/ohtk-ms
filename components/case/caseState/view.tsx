import { CaseStateViewViewModel } from "components/case/caseState/viewViewModel";
import FormRenderer, { FormRendererViewModel } from "components/formRenderer";
import ErrorDisplay from "components/widgets/errorDisplay";
import { MaskingLoader } from "components/widgets/forms";
import { formatDateTime } from "lib/datetime";
import { CaseState, CaseStateTransition } from "lib/services/case/case";
import { DeepStateStep } from "lib/services/stateStep/stateStep";
import { observer } from "mobx-react";
import { useRouter } from "next/router";
import { FC, useState } from "react";

type CaseStateViewProps = {
  viewModel: CaseStateViewViewModel;
};

const CaseStateView: FC<CaseStateViewProps> = ({
  viewModel,
}: CaseStateViewProps) => {
  return (
    <MaskingLoader loading={viewModel.isLoading}>
      <>
        {viewModel.states.map(caseState => (
          <CaseStateStep
            key={caseState.id}
            caseState={caseState}
            onTransitionSelect={(transitionId, formData) =>
              viewModel.forwardState(caseState.id, transitionId, formData)
            }
          ></CaseStateStep>
        ))}
        <ErrorDisplay message={viewModel.errorMessage} />
      </>
    </MaskingLoader>
  );
};

export default observer(CaseStateView);

type CaseStateStepProps = {
  caseState: CaseState;
  onTransitionSelect: (
    transitionId: string,
    formData?: Record<string, any>
  ) => void;
};

const CaseStateStep: FC<CaseStateStepProps> = ({
  caseState,
  onTransitionSelect,
}: CaseStateStepProps) => {
  return (
    <div className="border border-gray-300 rounded-md shadow md:w-1/2 mb-8">
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
  );
};

type PendingStepProps = {
  stateStep: DeepStateStep;
  onTransitionSelect: (
    transitionId: string,
    formData?: Record<string, any>
  ) => void;
};

type PendingStepState = {
  transitionId?: string;
  formRenderer?: FormRendererViewModel;
};

const PendingStep: FC<PendingStepProps> = ({
  stateStep,
  onTransitionSelect,
}: PendingStepProps) => {
  const [state, setState] = useState<PendingStepState>({});

  return !stateStep.isStopState ? (
    <>
      <div
        className={`grid grid-cols-${
          stateStep.toTransitions?.length || 0
        } gap-4`}
      >
        {stateStep.toTransitions?.map(
          transition =>
            transition && (
              <button
                key={transition.id}
                className={`p-2 bg-blue-200 hover:bg-blue-300 rounded-sm w-full border-2 
                ${
                  state.transitionId === transition.id
                    ? "border-blue-500"
                    : "border-transparent"
                }`}
                onClick={e => {
                  e.preventDefault();

                  if (transition.formDefinition) {
                    const form = new FormRendererViewModel(
                      // form id
                      crypto.randomUUID(),
                      transition.formDefinition!,
                      // onFormComplete
                      (formData?: Record<string, any>) => {
                        onTransitionSelect(transition.id, formData);
                      },
                      // onFormCancel
                      (message?: string) => {
                        console.log("cancel form:", message);
                        setState({});
                      }
                    );
                    setState({
                      transitionId: transition.id,
                      formRenderer: form,
                    });
                  } else {
                    onTransitionSelect(transition.id);
                  }
                }}
              >
                {transition.toStep?.name}
              </button>
            )
        )}
      </div>
      {state.formRenderer && (
        <div className="mt-4">
          <FormRenderer viewModel={state.formRenderer} height="500px" />
        </div>
      )}
    </>
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
      <div>Data: {stateTransition.formData}</div>
    </div>
  );
};
