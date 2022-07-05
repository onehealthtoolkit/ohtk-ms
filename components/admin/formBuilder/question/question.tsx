import { FieldList } from "components/admin/formBuilder/field";
import {
  FieldMenus,
  QuestionViewModel,
} from "components/admin/formBuilder/question";
import { observer } from "mobx-react";
import { FC } from "react";

type Props = {
  value: QuestionViewModel;
  onSelect: (id: string) => void;
};

const Question: FC<Props> = ({ value: question, onSelect }) => {
  return question.isCurrent ? (
    <div className="pt-4 pr-4 flex-grow">
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
      <FieldList
        values={question.fields}
        onMoveDown={fieldId => question.moveItemDown(fieldId)}
        onMoveUp={fieldId => question.moveItemUp(fieldId)}
        onSelect={fieldId => question.selectField(fieldId)}
        onDelete={fieldId => question.deleteField(fieldId)}
      />
      <FieldMenus value={question} />
    </div>
  ) : (
    <div className="p-4 flex-grow" onClick={() => onSelect(question.id)}>
      {question.label || <span className="text-gray-400">Question</span>}
    </div>
  );
};

export default observer(Question);
