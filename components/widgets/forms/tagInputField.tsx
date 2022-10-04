import { useMemo } from "react";
import { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

type TagInputFieldProps = {
  value: string[];
  onValueChange?: (value: string[]) => void;
};

export default function TagInputField({
  value,
  onValueChange,
}: TagInputFieldProps) {
  const id = useMemo(() => uuidv4(), []);
  const [input, setInput] = useState("");
  const [tags, setTags] = useState(value || Array<string>());
  const [isKeyReleased, setIsKeyReleased] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    console.log("tags", tags);
    onValueChange && onValueChange(tags);
  }, [tags, onValueChange]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setInput(value);
  };

  const onKeyDown = (e: KeyboardEvent) => {
    const { key } = e;
    const trimmedInput = input.trim();

    if (
      (key === "," || key === "Enter") &&
      trimmedInput.length &&
      !tags.includes(trimmedInput)
    ) {
      e.preventDefault();
      setTags(prevState => [...prevState, trimmedInput]);
      setInput("");
    }

    if (key === "Backspace" && !input.length && tags.length && isKeyReleased) {
      const tagsCopy = [...tags];
      const poppedTag = tagsCopy.pop();
      e.preventDefault();
      setTags(tagsCopy);
      poppedTag && setInput(poppedTag);
    }

    setIsKeyReleased(false);
  };

  const onKeyUp = () => {
    setIsKeyReleased(true);
  };

  const deleteTag = (index: number) => {
    setTags(prevState => prevState.filter((tag, i) => i !== index));
  };

  return (
    <>
      <label
        className={`flex overflow-auto w-full max-w-full bg-white 
        items-center px-4 rounded cursor-pointer 
        ${
          isFocused
            ? "bg-blue-50 outline-2 outline outline-blue-600"
            : "hover:border-blue-600 border-b border-gray-200"
        }
      `}
        htmlFor={`field${id}`}
      >
        {tags.map((tag, index) => (
          <div
            key={tag}
            className={`flex items-center pl-2 mr-2 border text-sm h-6 rounded
            ${
              isFocused
                ? "border-gray-500 bg-white"
                : "border-blue-200 bg-blue-50"
            }
          `}
          >
            {tag}
            <button
              onClick={() => deleteTag(index)}
              className="text-xs text-gray-500 mx-1 -mt-2"
            >
              x
            </button>
          </div>
        ))}
        <input
          id={`field${id}`}
          value={input}
          placeholder="Enter a tag"
          onKeyDown={onKeyDown}
          onKeyUp={onKeyUp}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`py-2 px-4 text-sm border-none focus:outline-none focus:border-none
        ${isFocused ? "bg-blue-50" : "bg-white"}`}
        />
      </label>
      <small className="text-gray-500 text-[.7rem]">
        Type , (comma) or hit [Enter] to input tag
      </small>
    </>
  );
}
