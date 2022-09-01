import { FieldList } from "components/admin/formBuilder/field";
import {
  FieldMenus,
  QuestionViewModel,
} from "components/admin/formBuilder/question";
import { QuestionActionBar } from "components/admin/formBuilder/question/questionActionBar";
import {
  AdvanceCondition,
  ConfirmDialog,
} from "components/admin/formBuilder/shared";
import { observer } from "mobx-react";
import { FC, useRef } from "react";
import { useTranslation } from "react-i18next";

type Props = {
  value: QuestionViewModel;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
};

const Question: FC<Props> = ({ value: question, onSelect, onDelete }) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();
  const onDeleteConfirm = () => {
    question.registerDialog("confirmDelete")?.open(question);
  };

  return question.isCurrent ? (
    <div className="pt-4 pr-4 flex-col flex gap-2 w-full" ref={elementRef}>
      <h4 className="text-xs text-gray-600">Question label</h4>
      {question.isLabelEditing ? (
        <input
          className="bg-blue-50 py-2 px-4 w-full"
          autoFocus
          value={question.label}
          onChange={e => question.setLabel(e.target.value)}
          onBlur={() => question.setIsLabelEditing(false)}
          onKeyDown={e => {
            if (e.key === "Enter") {
              e.preventDefault();
              question.setIsLabelEditing(false);
            }
          }}
        />
      ) : (
        <input
          className="border-b border-gray-200 hover:border-blue-600 py-2 px-4 rounded w-full cursor-pointer"
          type={"text"}
          value={question.label}
          placeholder="Question Label"
          readOnly
          onClick={() => question.setIsLabelEditing(true)}
        />
      )}
      <h4 className="text-xs text-gray-600">Question description</h4>
      {question.isDescriptionEditing ? (
        <input
          className="bg-blue-50 py-2 px-4 w-full text-sm"
          autoFocus
          value={question.description}
          onChange={e => question.setDescription(e.target.value)}
          onBlur={() => question.setIsDescriptionEditing(false)}
          onKeyDown={e => {
            if (e.key === "Enter") {
              e.preventDefault();
              question.setIsDescriptionEditing(false);
            }
          }}
        />
      ) : (
        <input
          className="border-b border-gray-200 hover:border-blue-600 py-2 px-4 rounded w-full text-sm cursor-pointer"
          type={"text"}
          value={question.description}
          placeholder="Description"
          readOnly
          onClick={() => question.setIsDescriptionEditing(true)}
        />
      )}
      <QuestionActionBar value={question} onDelete={onDeleteConfirm}>
        {question => <AdvanceCondition viewModel={question} />}
      </QuestionActionBar>

      <h4 className="text-xs text-gray-600">Fields</h4>
      <div className="p-2 mb-4 border-dotted border-2">
        <FieldList
          values={question.fields}
          onMoveDown={fieldId => question.moveItemDown(fieldId)}
          onMoveUp={fieldId => question.moveItemUp(fieldId)}
          onSelect={fieldId => question.selectField(fieldId)}
          onDelete={fieldId => question.deleteField(fieldId)}
        />
        <FieldMenus value={question} />
      </div>
      <ConfirmDialog
        viewModel={question.dialog("confirmDelete")}
        title={t("dialog.title.confirmDelete", "Confirm delete")}
        content={t("dialog.content.confirmDelete", "Are you sure?")}
        onYes={(question: QuestionViewModel) => onDelete(question.id)}
        onNo={() => question.dialog("confirmDelete")?.close()}
        container={elementRef.current?.parentElement}
      />
    </div>
  ) : (
    <div className="p-4 flex-grow" onClick={() => onSelect(question.id)}>
      {question.label || <span className="text-gray-400">Question</span>}
    </div>
  );
};

export default observer(Question);
