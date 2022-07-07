import { FC, forwardRef, ReactElement } from "react";
import { PlusIcon } from "@heroicons/react/solid";
import Spinner from "components/widgets/spinner";
import tw from "tailwind-styled-components";

export * from "./tabs";

export const AddButton = forwardRef(function addButton(
  props: React.PropsWithoutRef<{}>,
  ref: React.Ref<HTMLAnchorElement>
) {
  return (
    <a
      ref={ref}
      {...props}
      className="
        px-4 
        py-2 
        border
      text-white
      bg-blue-500 
      border-blue-300
      hover:border-blue-500
        rounded
        flex 
        justify-center 
        items-center
        cursor-pointer
      "
    >
      <PlusIcon className="h-5 w-5 text-white mr-2" />
      <span>Add</span>
    </a>
  );
});

const Input = (
  props: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >,
  ref: React.Ref<HTMLInputElement>
) => {
  return (
    <input
      ref={ref}
      {...props}
      className="
        shadow
        appearance-none
        border
        rounded
        w-full
        py-2
        px-3
        text-grey-darker
      "
    />
  );
};

export const TextInput = forwardRef(Input);

export const TextAreaRef = (
  props: React.DetailedHTMLProps<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  >,
  ref: React.Ref<HTMLTextAreaElement>
) => {
  return (
    <textarea
      ref={ref}
      {...props}
      className="
        shadow
        appearance-none
        border
        rounded
        w-full
        py-2
        px-3
        text-grey-darker
        text-sm
      "
    />
  );
};

export const TextArea = forwardRef(TextAreaRef);

const SelectInput = (
  props: React.DetailedHTMLProps<
    React.SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  >,
  ref: React.Ref<HTMLSelectElement>
) => {
  return (
    <select
      ref={ref}
      {...props}
      className="
        shadow
        border
        rounded
        w-full
        py-2
        px-3
        text-grey-darker
      "
    />
  );
};

export const Select = forwardRef(SelectInput);

export const Label = tw.label`
  block 
  text-grey-darker 
  text-sm 
  font-bold 
  mb-2
`;

export const ErrorText = tw.p`
  text-red-700 
  text-xs 
  italic 
  h-2
  leading-5
`;

export const SaveButton = tw.button`
  border
  text-white
  bg-blue-500 
  border-blue-300
  hover:border-blue-500
  rounded
  w-24
  h-12
  flex
  justify-center
  items-center
  mr-4
`;

export const CancelButton = tw.button`
  border
  border-gray-300
  bg-gray-100 
  hover:border-gray-400
  rounded
  w-24
  h-12
  flex
  justify-center
  items-center
`;

export const Masking = tw.div`
  w-full 
  h-full 
  flex 
  justify-center 
  items-center 
  absolute 
  top-0 
  bg-white 
  opacity-60 
  z-50 
  right-0
`;

type LoaderProps = { children: ReactElement; loading: boolean };

export const MaskingLoader: FC<LoaderProps> = ({ children, loading }) =>
  loading ? (
    <div className="relative">
      {children}
      <Masking>
        <Spinner size={12} />
      </Masking>
    </div>
  ) : (
    children
  );

export const Form: FC<
  React.DetailedHTMLProps<
    React.FormHTMLAttributes<HTMLFormElement>,
    HTMLFormElement
  >
> = props => (
  <form
    className="
      grid 
      grid-cols-2 
      gap-4 
      md:gap-8
    "
    {...props}
  >
    {props.children}
  </form>
);

interface FieldGroupProps {
  children: ReactElement | ReactElement[];
  $size?: "full" | "half";
  className?: string;
}

export const FieldGroup: FC<FieldGroupProps> = tw.div`
  p-4 
  md:p-8
  rounded-md
  bg-gray-50
  ${(p: FieldGroupProps) => {
    const cls = p.className || "";
    switch (p.$size) {
      case "half":
        return `col-span-full md:col-span-1 ${cls}`;
      default:
        return `col-span-full ${cls}`;
    }
  }}
`;

type FieldProps = FieldGroupProps;

export const Field: FC<FieldProps> = tw.div`
  mb-4
  ${(p: FieldProps) => {
    const cls = p.className || "";
    switch (p.$size) {
      case "half":
        return `w-full md:w-1/2  ${cls}`;
      default:
        return `w-full  ${cls}`;
    }
  }}
`;

export const FormMessage = tw.div`
  col-span-full
  flex 
  items-center 
  justify-start
  bg-red-100
  p-4
  rounded-md
`;

export const FormAction = tw.div`
  col-span-full
  flex 
  items-center 
  justify-start
`;
