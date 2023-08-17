import { QuestionList } from "components/admin/formBuilder/question";
import { SectionActionBar } from "components/admin/formBuilder/section/sectionActionBar";
import { SectionViewModel } from "components/admin/formBuilder/section/sectionViewModel";
import { ConfirmDialog } from "components/admin/formBuilder/shared";
import { observer } from "mobx-react";
import { FC, useRef } from "react";
import { useTranslation } from "react-i18next";

type Props = {
  value: SectionViewModel | undefined;
  onDelete: (id: string) => void;
};

const Section: FC<Props> = ({ value: section, onDelete }) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  if (!section) {
    return null;
  }

  const onDeleteConfirm = () => {
    section.registerDialog("confirmDelete")?.open(section);
  };

  return (
    <div className="text-gray-900 md:pl-4 w-full md:w-3/4" ref={elementRef}>
      <div className={"flex flex-col md:min-h-[400px] gap-2"}>
        <h4 className="text-xs text-gray-600">Section</h4>
        <div className="flex flex-row w-full">
          <input
            className="bg-blue-50 py-2 px-4 flex flex-1 rounded"
            type="text"
            autoFocus
            value={section.label}
            onChange={e => section.setLabel(e.target.value)}
            onBlur={() => section.setIsLabelEditing(false)}
            onKeyDown={e => {
              if (e.key === "Enter") {
                e.preventDefault();
                section.setIsLabelEditing(false);
              }
            }}
          />

          <SectionActionBar value={section} onDelete={onDeleteConfirm} />
        </div>

        <h4 className="text-xs text-gray-600">Questions</h4>
        <div className="p-4 border-dotted border-2 rounded">
          <QuestionList
            values={section.questions}
            onMoveDown={questionId => section.moveItemDown(questionId)}
            onMoveUp={questionId => section.moveItemUp(questionId)}
            onSelect={questionId => section.selectQuestion(questionId)}
            onDelete={questionId => section.deleteQuestion(questionId)}
            onMoveQuestion={(fromIndex: number, toIndex: number) => {
              section.moveQuestion(fromIndex, toIndex);
            }}
          />

          <div className="p-4 flex justify-end ">
            <button
              type="button"
              className="flex justify-center rounded px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-800 focus:z-10 focus:ring-2 focus:ring-blue-200 "
            >
              <span onClick={() => section.addQuestion()}>Add Question</span>
            </button>
          </div>
        </div>
      </div>

      <ConfirmDialog
        viewModel={section.dialog("confirmDelete")}
        content={t("dialog.content.confirmDelete", "Are you sure?")}
        onYes={(section: SectionViewModel) => onDelete(section.id)}
        onNo={() => section.dialog("confirmDelete")?.close()}
        container={elementRef.current?.parentElement}
      />
    </div>
  );
};

export default observer(Section);
