import { GlobeAltIcon } from "@heroicons/react/outline";
import { BaseSyntheticEvent, useState } from "react";
import { useTranslation } from "react-i18next";

const LanguageSelect = () => {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language);

  const handleLangChange = (evt: BaseSyntheticEvent) => {
    const lang = evt.target.value;
    setLanguage(lang);
    i18n.changeLanguage(lang);
  };

  return (
    <div className="flex">
      <label
        className="inline-flex items-center text-grey-darker text-sm font-bold"
        htmlFor="lang"
      >
        <GlobeAltIcon className="h-5 w-5 text-gray-500" />
      </label>
      <select id="lang" onChange={handleLangChange} value={language}>
        <option value="en">English</option>
        <option value="th">ภาษาไทย</option>
        <option value="km">ភាសាខ្មែរ</option>
        <option value="la">ພາສາລາວ</option>
      </select>
    </div>
  );
};

export default LanguageSelect;
