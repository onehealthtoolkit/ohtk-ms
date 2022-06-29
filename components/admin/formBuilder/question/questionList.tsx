import Question, {
  QuestionViewModel,
} from "components/admin/formBuilder/question";
import { MovePositionBar } from "components/admin/formBuilder/shared";
import { observer } from "mobx-react";
import { FC } from "react";

type Props = {
  values: QuestionViewModel[];
  onMoveUp: (questionId: string) => void;
  onMoveDown: (questionId: string) => void;
  onSelect: (questionId: string) => void;
};

const List: FC<Props> = ({
  values: questions,
  onMoveDown,
  onMoveUp,
  onSelect,
}) => {
  return (
    <>
      {questions.length > 0 ? (
        questions.map(question => (
          <div
            className={`mt-4 bg-white rounded-md flex items-stretch ${
              question.isCurrent
                ? "border-2 border-blue-400"
                : "border border-gray-200"
            }`}
            key={question.id}
            onMouseOver={() => (question.isHovered = true)}
            onMouseOut={() => (question.isHovered = false)}
          >
            <MovePositionBar
              targetId={question.id}
              visible={question.isHovered}
              onMoveDown={onMoveDown}
              onMoveUp={onMoveUp}
            />
            <Question value={question} onSelect={onSelect} />
          </div>
        ))
      ) : (
        <p className="text-gray-500 mt-4">No questions</p>
      )}
    </>
  );
};

export const QuestionList = observer(List);
