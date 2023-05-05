/* eslint-disable @next/next/no-img-element */
import { ChangeEventHandler, FC, forwardRef, ReactElement } from "react";
import { PlusIcon } from "@heroicons/react/solid";
import Spinner from "components/widgets/spinner";
import tw from "tailwind-styled-components";
import dynamic from "next/dynamic";
import { useTranslation } from "react-i18next";

export * from "./tabs";

export const AreaFieldNoSSR = dynamic(() => import("./areaField"), {
  loading: () => <p>A map is loading</p>,
  ssr: false,
});

export const AddButton = forwardRef(function AddButton(
  props: React.PropsWithoutRef<{ onClick?: () => void }>,
  ref: React.Ref<HTMLAnchorElement>
) {
  const { t } = useTranslation();

  return (
    <a
      ref={ref}
      {...props}
      className="
        px-4 
        py-2 
        border
      text-white
      bg-[#67C687] 
      border-blue-300
      hover:border-green-500
      hover:bg-green-500
        rounded
        flex 
        justify-center 
        items-center
        cursor-pointer
      "
    >
      <PlusIcon className="h-5 w-5 text-white mr-2" />
      <span>{t("form.button.add", "Add")}</span>
    </a>
  );
});

export const DownloadButton = tw.button`
  border
  text-white
  bg-[#4C81F1] 
  border-blue-300
  hover:border-blue-500
  rounded
  h-12
  flex
  justify-center
  items-center
  mr-4
  px-5
`;

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
        h-11        
        px-3
        text-grey-darker
      "
    />
  );
};

export const Select = forwardRef(SelectInput);

const CheckboxInput = (
  props: {
    id: string;
    label: string;
    value: string;
    checked?: boolean;
    defaultChecked?: boolean;
    disabled: boolean;
    name?: string;
    onChange?: ChangeEventHandler<HTMLInputElement>;
  },
  ref: React.Ref<HTMLInputElement>
) => {
  return (
    <div className="flex items-center mb-4">
      <input
        ref={ref}
        type="checkbox"
        {...props}
        className="
          w-4 h-4 text-blue-600 
          bg-gray-100 rounded border-gray-300 
          focus:ring-blue-500 dark:focus:ring-blue-600 
          dark:ring-offset-gray-800 focus:ring-2 
          dark:bg-gray-700 dark:border-gray-600
        "
      />
      <label
        htmlFor={props.id}
        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
      >
        {props.label}
      </label>
    </div>
  );
};

export const Checkbox = forwardRef(CheckboxInput);

const RadioInput = (
  props: {
    id: string;
    name: string;
    label: string;
    value: string;
    checked?: boolean;
    defaultChecked?: boolean;
    disabled: boolean;
    onChange?: ChangeEventHandler<HTMLInputElement>;
  },
  ref: React.Ref<HTMLInputElement>
) => {
  return (
    <div className="flex items-center mb-4">
      <input
        ref={ref}
        type="radio"
        {...props}
        className="
          w-4 h-4 text-blue-600 
          bg-gray-100 rounded border-gray-300 
          focus:ring-blue-500 dark:focus:ring-blue-600 
          dark:ring-offset-gray-800 focus:ring-2 
          dark:bg-gray-700 dark:border-gray-600
        "
      />
      <label
        htmlFor={props.id}
        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
      >
        {props.label}
      </label>
    </div>
  );
};

export const Radio = forwardRef(RadioInput);

export const Label = tw.label`
  block 
  text-[#1D1E1E] 
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
  bg-[#4C81F1] 
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
> = props => {
  return (
    <form
      noValidate
      className="
      grid 
      grid-cols-2 
      gap-4 
      md:gap-8
      bg-white
    "
      onSubmit={e => {
        e.preventDefault();
      }}
      {...props}
    >
      {props.children}
    </form>
  );
};

interface FieldGroupProps {
  children: ReactElement | ReactElement[];
  $size?: "full" | "half";
  className?: string;
}

export const FieldGroup: FC<FieldGroupProps> = tw.div`
  p-4 
  md:p-8
  rounded-md
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
  p-4
  md:p-8
  col-span-full
  flex 
  items-center 
  justify-start
`;

type DivideProps = { hilight?: boolean; thin?: boolean };
export const Divide: FC<DivideProps> = tw.hr`
  
  rounded
  mx-4
  ${(p: DivideProps) => {
    const results = [];
    if (p.hilight) {
      results.push("border-[#1a8297]");
    }
    if (p.thin) {
      results.push("border-1");
    } else {
      results.push("border-2");
    }
    return results.join(" ");
  }}
`;

export const UserAvatar = ({ url }: { url?: string }) => {
  return (
    <div className="overflow-hidden relative w-10 h-10 bg-gray-100 rounded-full dark:bg-gray-600">
      {url ? (
        <img src={url} alt={url} />
      ) : (
        <svg
          className="absolute -left-1 w-12 h-12 text-gray-400"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
            clipRule="evenodd"
          ></path>
        </svg>
      )}
    </div>
  );
};
