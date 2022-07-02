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
          className="border-b bg-blue-200 py-2 px-4 w-full"
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
        <button
          className="hover:bg-blue-200 py-2 px-4 w-full text-left border-b border-gray-200"
          onClick={() => question.setIsLabelEditing(true)}
        >
          {question.label}
        </button>
      )}
      {question.isDescriptionEditing ? (
        <input
          className="border-b bg-blue-200 py-2 px-4 w-full text-sm"
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
        <button
          className="hover:bg-blue-200 py-2 px-4 w-full text-left border-b border-gray-200 text-sm"
          onClick={() => question.setIsDescriptionEditing(true)}
        >
          {question.description}
        </button>
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
      {question.label}
    </div>
  );
};

export default observer(Question);
