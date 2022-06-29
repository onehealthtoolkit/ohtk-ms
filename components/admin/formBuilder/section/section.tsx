import { QuestionList } from "components/admin/formBuilder/question";
import { SectionViewModel } from "components/admin/formBuilder/section/sectionViewModel";
import { observer } from "mobx-react";
import { FC } from "react";

type Props = {
  value: SectionViewModel | undefined;
};

const Section: FC<Props> = ({ value: section }) => {
  if (!section) {
    return null;
  }

  return (
    <div className="text-gray-900 md:pl-4 w-full md:w-3/4">
      <div className={"flex flex-col md:min-h-[400px] "}>
        {section.isLabelEditing ? (
          <input
            className="bg-blue-100 py-2 px-4"
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
        ) : (
          <button
            className="hover:bg-blue-100 py-2 px-4 w-full text-left border-b border-gray-200"
            onClick={() => section.setIsLabelEditing(true)}
          >
            {section.label}
          </button>
        )}
        <QuestionList
          values={section.questions}
          onMoveDown={questionId => section.moveItemDown(questionId)}
          onMoveUp={questionId => section.moveItemUp(questionId)}
          onSelect={questionId => section.selectQuestion(questionId)}
        />
      </div>
      <div className="p-4 flex justify-end ">
        <button
          type="button"
          className="flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-800 focus:z-10 focus:ring-2 focus:ring-blue-200 "
        >
          <span onClick={() => section.addQuestion()}>Add Question</span>
        </button>
      </div>
    </div>
  );
};

export default observer(Section);
