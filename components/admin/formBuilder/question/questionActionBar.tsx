import {
  ChevronDownIcon,
  ChevronUpIcon,
  TrashIcon,
} from "@heroicons/react/solid";
import { QuestionViewModel } from "components/admin/formBuilder/question/questionViewModel";
import { observer } from "mobx-react";
import { FC, ReactNode } from "react";

export type QuestionActionBarProps = {
  children: (question: QuestionViewModel) => ReactNode;
  value: QuestionViewModel;
  onDelete: (id: string) => void;
};

const Bar: FC<QuestionActionBarProps> = ({
  children,
  value: question,
  onDelete,
}) => {
  return (
    <>
      <div className="w-full pt-4 flex justify-end items-center">
        {/* Trash icon */}
        <button
          type="button"
          className="group hover:bg-white rounded-3xl w-11 h-11"
          onClick={e => {
            e.preventDefault();
            onDelete(question.id);
          }}
        >
          <TrashIcon className="mx-2 w-7 h-7 text-blue-300 group-hover:text-blue-600" />
        </button>
        <span className="inline-block border-l-2 border-blue-200 w-2">
          &nbsp;
        </span>
        {/* More advance menu */}
        <button
          type="button"
          className="group hover:bg-white rounded-full w-10 h-10"
          onClick={e => {
            e.preventDefault();
            question.toggleAdvanceOn();
          }}
        >
          <span className="m-2 w-6 h-6 text-blue-300 group-hover:text-blue-600 inline-block">
            {question.isAdvanceOn ? <ChevronUpIcon /> : <ChevronDownIcon />}
          </span>
        </button>
      </div>
      {question.isAdvanceOn && children(question)}
    </>
  );
};

export const QuestionActionBar = observer(Bar);
