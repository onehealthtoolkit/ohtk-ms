import { ChevronLeftIcon, PencilAltIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import tw from "tailwind-styled-components";

const BackButton = tw.button`
  border
  border-gray-300
  bg-gray-100 
  hover:border-gray-400
  hover:bg-gray-200
  rounded
  w-24
  h-12
  justify-center
  items-center
  inline-flex
`;

const EditButton = tw.button`
  border
  text-white
  bg-[color:var(--button-bg-color)]
  border-[color:var(--button-border-color)]
  hover:border-[color:var(--button-border-hover-color)]
  hover:bg-[color:var(--button-hover-color)]
  active:bg-[color:var(--button-bg-active-color)]
  active:border-[color:var(--button-border-active-color)]
  active:text-[color:var(--button-text-active-color)]
  rounded
  w-24
  h-12
  flex
  justify-center
  items-center
  ml-4
`;

type ViewActionButtonsProps = {
  editUrl?: string;
};

const ViewActionButtons: React.FC<ViewActionButtonsProps> = ({ editUrl }) => {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <div className="mt-6 md:mt-14 col-span-full flex items-center justify-start">
      <BackButton type="button" onClick={() => router.back()}>
        <ChevronLeftIcon className="mr-2 -ml-1 w-5 h-5" />
        {t("form.button.back", "Back")}
      </BackButton>
      {editUrl && (
        <EditButton
          type="button"
          onClick={() => {
            if (editUrl) router.push(editUrl);
          }}
        >
          <PencilAltIcon className="mr-2 -ml-1 w-5 h-5" />
          {t("form.button.edit", "Edit")}
        </EditButton>
      )}
    </div>
  );
};

export default ViewActionButtons;
