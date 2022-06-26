import { SectionViewModel } from "components/admin/formBuilder/sectionViewModel";
import { observer } from "mobx-react";
import { FC } from "react";

type Props = {
  value: SectionViewModel | undefined;
};

const Section: FC<Props> = ({ value: section }) => {
  if (!section) {
    return null;
  }

  return (
    <div className="md:w-3/4 w-full">
      {section.isNameEditing ? (
        <input
          className="border-b bg-blue-200 py-2 px-4"
          autoFocus
          value={section.name}
          onChange={e => section.setName(e.target.value)}
          onBlur={() => section.setIsNameEditing(false)}
          onKeyDown={e => {
            if (e.key === "Enter") {
              e.preventDefault();
              section.setIsNameEditing(false);
            }
          }}
        />
      ) : (
        <button
          className="hover:bg-blue-200 py-2 px-4"
          onClick={() => section.setIsNameEditing(true)}
        >
          {section.name}
        </button>
      )}
    </div>
  );
};

export default observer(Section);
