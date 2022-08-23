import { useState } from "react";

type ChipsProps = {
  value: string;
  selected?: boolean;
  onClick: () => void;
};

const Chips: React.FC<ChipsProps> = ({ value, selected, onClick }) => {
  return (
    <span
      onClick={() => onClick()}
      className={`${
        selected && "bg-slate-200"
      }  px-6 py-2 leading-4 rounded-full border border-gray-300 text-[#5E7284] font-['Kanit'] font-normal text-sm flex align-center w-max cursor-pointer active:bg-gray-300 transition duration-300 ease`}
    >
      {value}
    </span>
  );
};

type SelectableChipsProps = {
  initialChips: string[];
  value: string[];
  onChangeChips: (value: string[]) => void;
};

const SelectableChips: React.FC<SelectableChipsProps> = ({
  initialChips,
  value,
  onChangeChips,
}) => {
  const [selectedChips, setSelectedChips] = useState<string[]>(value);

  const selectChip = (value: string) => {
    if (isSelected(value)) {
      let array = [...selectedChips];
      let result = array.filter(text => {
        return text != value;
      });
      setSelectedChips(result);
      onChangeChips(result);
    } else {
      let array = [...selectedChips];
      array.unshift(value);
      setSelectedChips(array);
      onChangeChips(array);
    }
  };

  const selectAll = () => {
    if (!isSelectAll()) {
      setSelectedChips(value);
      onChangeChips(value);
    }
  };

  const isSelected = (value: string) => {
    let array = [...selectedChips];
    return array.includes(value);
  };

  const isSelectAll = () => {
    return selectedChips.length == initialChips.length;
  };

  return (
    <>
      <span
        className={` ${
          isSelectAll() ? " bg-[#5E7284] text-white" : "text-[#5E7284]"
        } px-6 py-2 leading-4  rounded-full border border-gray-300  font-['Kanit'] font-normal text-sm flex align-center w-max cursor-pointer active:bg-gray-300 transition duration-300 ease`}
        onClick={() => selectAll()}
      >
        All types
      </span>

      {initialChips.map(item => (
        <Chips
          key={item}
          value={item}
          onClick={() => selectChip(item)}
          selected={isSelected(item)}
        />
      ))}
    </>
  );
};

export default SelectableChips;
