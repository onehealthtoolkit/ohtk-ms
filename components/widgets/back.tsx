import { ChevronLeftIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import tw from "tailwind-styled-components";

const BackButton = tw.button`
  border
  border-gray-300
  bg-gray-100 
  hover:border-gray-400
  rounded
  w-24
  h-12
  justify-center
  items-center
  inline-flex
`;

const Back = () => {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <div className="mt-6 p-4 md:p-8 col-span-full flex items-center justify-start">
      <BackButton type="button" onClick={() => router.back()}>
        <ChevronLeftIcon className="mr-2 -ml-1 w-5 h-5" />
        {t("form.button.back", "Back")}
      </BackButton>
    </div>
  );
};

export default Back;
