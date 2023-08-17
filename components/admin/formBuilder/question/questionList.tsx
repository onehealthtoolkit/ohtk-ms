import Question, {
  QuestionViewModel,
} from "components/admin/formBuilder/question";
import { MovePositionBar } from "components/admin/formBuilder/shared";
import { observer } from "mobx-react";
import { FC, useState } from "react";

export type DragItem = {
  index: number;
  isDragging: boolean;
};

type Props = {
  values: QuestionViewModel[];
  onMoveUp: (questionId: string) => void;
  onMoveDown: (questionId: string) => void;
  onSelect: (questionId: string) => void;
  onDelete: (questionId: string) => void;
  onMoveQuestion: (fromIndex: number, toIndex: number) => void;
};

const List: FC<Props> = ({
  values: questions,
  onMoveDown,
  onMoveUp,
  onSelect,
  onDelete,
  onMoveQuestion,
}) => {
  const [dragItem] = useState<DragItem>({ index: 0, isDragging: false });

  return (
    <>
      {questions.length > 0 ? (
        questions.map((question, i) => (
          <div
            className={`mt-4 bg-white rounded-md flex items-stretch relative ${
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
            <Question
              value={question}
              onSelect={onSelect}
              onDelete={onDelete}
              dragItem={dragItem}
              index={i}
              onMoveQuestion={onMoveQuestion}
            />
          </div>
        ))
      ) : (
        <p className="text-gray-500 mt-4">No questions</p>
      )}
    </>
  );
};

export const QuestionList = observer(List);
