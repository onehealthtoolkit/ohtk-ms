import { QuestionViewModel } from "components/admin/formBuilder/question";
import { SectionViewModel } from "components/admin/formBuilder/section";
import { BaseDialog } from "components/admin/formBuilder/shared/dialog/baseDialog";
import { FormBuilderDialogViewModel } from "components/admin/formBuilder/shared/dialog/dialogViewModel";

type Props = {
  viewModel: FormBuilderDialogViewModel | undefined;
  title?: string;
  sections: SectionViewModel[];
  onSelect: (section: SectionViewModel) => void;
  onCancel: () => void;
  container?: Element | DocumentFragment | null;
};

export const MoveQuestionDialog = ({
  viewModel: store,
  title,
  sections,
  onSelect,
  onCancel,
  container,
}: Props) => {
  return (
    <BaseDialog
      centerContent={false}
      container={container}
      store={store}
      title={title}
      renderContent={(question: QuestionViewModel) => (
        <ul className="p-2 text-sm">
          {sections.map(section => {
            return (
              <li
                key={section.id}
                className={`flex text-sm items-center mt-2 relative flex-row group 
                  ${question.section.id !== section.id ? "cursor-pointer" : ""}
                `}
                onClick={() => onSelect(section)}
              >
                {question.section.id !== section.id ? (
                  <>
                    <div
                      className="mr-2 rounded-full w-5 h-5 border border-gray-400 
                      bg-white group-hover:bg-blue-100"
                    ></div>
                    <input
                      className="block border-b border-gray-200 py-2 px-4 flex-grow 
                        rounded mr-2 group-hover:bg-blue-100 cursor-pointer"
                      type={"text"}
                      value={section.label}
                      placeholder="Label"
                      readOnly
                    />
                  </>
                ) : (
                  <p
                    className="block border-b border-gray-200 py-2 pl-11 pr-4 flex-grow 
                      rounded mr-2 bg-gray-100 text-left"
                  >
                    {section.label}
                  </p>
                )}
              </li>
            );
          })}
        </ul>
      )}
      renderAction={(dialog: FormBuilderDialogViewModel) => (
        <div
          className="grid 
        grid-cols-2 
        gap-4 
        "
        >
          <button
            className="p-2 text-sm bg-gray-300 rounded-sm w-full text-black"
            onClick={e => {
              e.preventDefault();
              onCancel();
              dialog.close();
            }}
          >
            Cancel
          </button>
        </div>
      )}
    />
  );
};
