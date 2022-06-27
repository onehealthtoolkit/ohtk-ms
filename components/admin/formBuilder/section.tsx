import Question from "components/admin/formBuilder/question";
import { SectionViewModel } from "components/admin/formBuilder/sectionViewModel";
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
      <div
        className={
          "flex flex-col md:min-h-[400px] bg-white border-t border-l border-r p-4 border-gray-200"
        }
      >
        {section.isNameEditing ? (
          <input
            className="border-b bg-blue-200 py-2 px-4"
            autoFocus
            value={section.name}
            onChange={e => section.setName(e.target.value)}
            onBlur={() => section.setIsNameEditing(false)}
            onKeyDown={e => {
              if (e.key === "Enter") {
                e.preventDefault();
                section.setIsNameEditing(false);
              }
            }}
          />
        ) : (
          <button
            className="hover:bg-blue-200 py-2 px-4 w-full text-left border-b border-gray-200"
            onClick={() => section.setIsNameEditing(true)}
          >
            {section.name}
          </button>
        )}
        {section.questions.length > 0 ? (
          section.questions.map(question => (
            <Question key={question.id} value={question} />
          ))
        ) : (
          <p className="text-gray-500 mt-4">No questions</p>
        )}
      </div>
      <div className="border-l border-r border-b border-gray-200 p-4 flex justify-end bg-white ">
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
