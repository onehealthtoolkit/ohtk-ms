import tw from "tailwind-styled-components";

export const SearchButton = tw.button`
  px-4
  py-2
  text-white
  bg-blue-500
  border-blue-300
  hover:border-blue-500
  rounded
  border-l
  mr-1
`;

export const ResetButton = tw.button`
  px-4
  py-2
  text-white
  bg-gray-600
  hover:border-gray-800
  rounded
  border-l
`;

export const FilterTextInput = tw.input`
  px-4 py-2 w-80 border-gray-300 border mr-2
`;
