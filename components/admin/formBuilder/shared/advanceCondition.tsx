import { FieldViewModel } from "components/admin/formBuilder/field";
import { QuestionViewModel } from "components/admin/formBuilder/question";
import {
  comparableOperatorLabelValues,
  ComparableOperatorViewModel,
  TOperatorKey,
} from "components/admin/formBuilder/shared/operatorViewModel";
import { observer } from "mobx-react";
import { FC } from "react";

type AdvanceProps = {
  viewModel: FieldViewModel | QuestionViewModel;
};

const Advance: FC<AdvanceProps> = ({ viewModel }) => {
  const instance = viewModel.condition.instance;
  if (instance) {
    if (instance.isLogical) {
      return <div>TODO... Logical operation is to be implemented</div>;
    } else {
      const operatorViewModel = instance as ComparableOperatorViewModel;
      let title = "{s} advance condition";
      if (viewModel instanceof FieldViewModel) {
        title = title.replace("{s}", "Field");
      }
      if (viewModel instanceof QuestionViewModel) {
        title = title.replace("{s}", "Question");
      }

      return (
        <>
          <h3 className="text-blue-500">{title}</h3>
          <div className="w-full mt-4 flex flex-col ">
            <div className="flex text-sm w-full">
              <div className="w-1/3 flex flex-col items-stretch">
                <label>Name</label>
                <input
                  className="border border-gray-200 py-2 px-4 w-full rounded-sm"
                  type={"text"}
                  value={operatorViewModel.name}
                  onChange={e => {
                    operatorViewModel.name = e.target.value;
                  }}
                />
              </div>
              <div className="w-1/3 pl-2 flex flex-col items-stretch">
                <label>Operator</label>
                <select
                  className="border border-gray-200 py-2 px-4 w-full rounded-sm"
                  value={operatorViewModel.operator}
                  onChange={e => {
                    operatorViewModel.operator = e.target.value as TOperatorKey;
                  }}
                >
                  {comparableOperatorLabelValues.map(item => (
                    <option key={`option-${item.value}`} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-1/3 pl-2 flex flex-col items-stretch">
                <label>Value</label>
                <input
                  className="border border-gray-200 py-2 px-4 w-full rounded-sm"
                  type={"text"}
                  value={operatorViewModel.value}
                  onChange={e => {
                    operatorViewModel.value = e.target.value;
                  }}
                />
              </div>
            </div>
          </div>
        </>
      );
    }
  }
  return null;
};

export const AdvanceCondition = observer(Advance);
