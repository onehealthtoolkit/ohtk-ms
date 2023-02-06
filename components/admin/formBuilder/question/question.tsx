import { FieldList } from "components/admin/formBuilder/field";
import {
  FieldMenus,
  QuestionViewModel,
} from "components/admin/formBuilder/question";
import { QuestionActionBar } from "components/admin/formBuilder/question/questionActionBar";
import { SectionViewModel } from "components/admin/formBuilder/section";
import {
  AdvanceCondition,
  ConfirmDialog,
} from "components/admin/formBuilder/shared";
import { MoveQuestionDialog } from "components/admin/formBuilder/shared/dialog/moveQuestionDialog";
import { observer } from "mobx-react";
import { FC, useRef } from "react";
import { useTranslation } from "react-i18next";

type Props = {
  value: QuestionViewModel;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
};

const Menus: FC<{ value: QuestionViewModel; onSelect: (id: string) => void }> =
  observer(({ value: question, onSelect }) => {
    return (
      <div className="">
        <div className="py-4 flex flex-col z-10 right-10 top-0 absolute">
          <button
            type="button"
            className="hover:bg-blue-300 hover:text-white rounded-full w-8 h-8 flex justify-center items-center"
            onClick={() => onSelect("-----")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l7.5-7.5 7.5 7.5m-15 6l7.5-7.5 7.5 7.5"
              />
            </svg>
          </button>
        </div>
        <div className="py-4 flex flex-col items-end z-10 right-3 top-0 absolute">
          <button
            type="button"
            className="hover:bg-blue-300 hover:text-white rounded-full w-8 h-8 flex justify-center items-center"
            onClick={() => question.toggleMenus()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
          {question.isMenusOpen && (
            <div className=" bg-white divide-y divide-gray-100 rounded shadow-md w-auto">
              <ul className="py-1 text-sm text-gray-700 ">
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={e => {
                      e.preventDefault();
                      question.toggleMenus();
                      question.registerDialog("moveQuestion")?.open(question);
                    }}
                  >
                    Move
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    );
  });

const Question: FC<Props> = ({ value: question, onSelect, onDelete }) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  const onDeleteConfirm = () => {
    question.registerDialog("confirmDelete")?.open(question);
  };

  const onMoveSection = (from: SectionViewModel, to: SectionViewModel) => {
    console.log("from", from.label, "to", to.label);
    to.form.selectSection(to.id);
    to.addQuestion();
    to.currentQuestion?.parse(question.toJson());
    from.deleteQuestion(question.id);
  };

  return question.isCurrent ? (
    <div className="pt-4 pr-4 flex-col flex gap-2 w-full" ref={elementRef}>
      <Menus value={question} onSelect={onSelect} />
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
          onClick={e => {
            e.preventDefault();
            return question.setIsLabelEditing(true);
          }}
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
      <div className="p-2 mb-4 border-dotted border-2 rounded">
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
      <MoveQuestionDialog
        viewModel={question.dialog("moveQuestion")}
        title={t(
          "dialog.title.moveQuestion",
          "Select other section for this question"
        )}
        sections={question.section.form.sections}
        onSelect={(section: SectionViewModel) =>
          onMoveSection(question.section, section)
        }
        onCancel={() => {}}
        container={elementRef.current?.parentElement}
      />
    </div>
  ) : (
    <div className="p-4 flex-grow" onClick={() => onSelect(question.id)}>
      <div>
        {question.label || <span className="text-gray-400">Question</span>}
      </div>
      <div className="text-xs font-thin text-gray-600 italic">
        {question.description}
      </div>
    </div>
  );
};

export default observer(Question);
