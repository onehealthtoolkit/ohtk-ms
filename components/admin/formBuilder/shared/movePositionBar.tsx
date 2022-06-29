import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/solid";
import { FC } from "react";

type MovePositionBarProps = {
  targetId: string;
  visible: boolean;
  onMoveUp: (id: string) => void;
  onMoveDown: (id: string) => void;
};

export const MovePositionBar: FC<MovePositionBarProps> = ({
  targetId,
  visible,
  onMoveDown,
  onMoveUp,
}) => {
  return (
    <div
      className={`flex flex-col justify-between text-sm font-medium bg-transparent rounded-l-sm overflow-clip ${
        visible ? "visible" : "invisible"
      }`}
    >
      <ChevronUpIcon
        className="text-white w-5 h-5 bg-blue-300 hover:bg-blue-600 cursor-pointer"
        onClick={() => onMoveUp(targetId)}
      />
      <ChevronDownIcon
        className="text-white w-5 h-5 bg-blue-300 hover:bg-blue-600 cursor-pointer"
        onClick={() => onMoveDown(targetId)}
      />
    </div>
  );
};
