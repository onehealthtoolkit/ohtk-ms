import { FormVariableItem } from "components/admin/formBuilder";
import {
  KeyboardEvent,
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import ReactDOM from "react-dom";
import {
  BaseEditor,
  createEditor,
  Descendant,
  Editor,
  Element,
  Node,
  Range,
  Text,
  Transforms,
} from "slate";
import { withHistory } from "slate-history";
import {
  Editable,
  ReactEditor,
  RenderElementProps,
  Slate,
  useFocused,
  useSelected,
  withReact,
} from "slate-react";

type CustomElement = ParagraphElement | MentionElement;
type CustomText = { text: string; bold?: true };

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

function elementToString(node: Node): string {
  if (Text.isText(node)) {
    return node.text;
  } else if (Element.isElement(node) && node.type === "mention") {
    return node.character;
  } else {
    return node.children.map(elementToString).join("");
  }
}

// Define a serializing function that takes a value and returns a string.
const serialize = (value: Descendant[]) => {
  return (
    value
      // Return the string content of each paragraph in the value's children.
      .map(n => elementToString(n))
      // Join them all with line breaks denoting paragraphs.
      .join("\n")
  );
};

// Define a deserializing function that takes a string and returns a value.
const deserialize = (value: string | null) => {
  // Return a value array of children derived by splitting the string.
  return (
    value?.split("\n").map(line => {
      return {
        children: [{ text: line }],
      };
    }) || [
      {
        children: [{ text: "" }],
      },
    ]
  );
};

type DataTemplateFieldProps = {
  value: string | null;
  onChange: (value: string) => void;
  variableList: Array<FormVariableItem>;
  placeholder: string;
  className?: string;
};

const DataTemplateField = ({
  value,
  onChange,
  variableList,
  placeholder,
  className,
}: DataTemplateFieldProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [target, setTarget] = useState<Range | undefined | null>();
  const [index, setIndex] = useState(0);
  const [search, setSearch] = useState("");
  const renderElement = useCallback(
    (props: RenderElementProps) => <RenderElement {...props} />,
    []
  );
  const editor = useMemo(
    () => withMentions(withReact(withHistory(createEditor()))),
    []
  );

  const initialValue = useMemo(
    () => deserialize(value) as Descendant[],
    [value]
  );

  const chars = variableList.filter(c =>
    c.label.toLowerCase().startsWith(search.replace("=", "").toLowerCase())
  );
  // .slice(0, 10);

  const onKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (target) {
        switch (event.key) {
          case "ArrowDown":
            event.preventDefault();
            const prevIndex = index >= chars.length - 1 ? 0 : index + 1;
            setIndex(prevIndex);
            break;
          case "ArrowUp":
            event.preventDefault();
            const nextIndex = index <= 0 ? chars.length - 1 : index - 1;
            setIndex(nextIndex);
            break;
          case "Tab":
          case "Enter":
            event.preventDefault();
            Transforms.select(editor, target);
            insertMention(editor, "{{ " + chars[index].value + " }}");
            setTarget(null);
            break;
          case "Escape":
            event.preventDefault();
            setTarget(null);
            break;
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [index, search, target]
  );

  useEffect(() => {
    if (target && chars.length > 0) {
      const el = ref.current;
      const domRange = ReactEditor.toDOMRange(editor, target);
      const rect = domRange.getBoundingClientRect();
      if (el) {
        el.style.top = `${rect.top + window.pageYOffset + 24}px`;
        el.style.left = `${rect.left + window.pageXOffset}px`;
      }
    }
  }, [chars.length, editor, index, search, target]);

  return (
    <Slate
      editor={editor}
      value={initialValue}
      onChange={value => {
        console.log("onchange value", value);
        const isAstChange = editor.operations.some(
          op => "set_selection" !== op.type
        );
        if (isAstChange) {
          const str = serialize(value);
          console.log("result", str);
          onChange(str);
        }

        const { selection } = editor;

        if (selection && Range.isCollapsed(selection)) {
          const [start] = Range.edges(selection);
          const wordBefore = Editor.before(editor, start, { unit: "word" });
          const before = wordBefore && Editor.before(editor, wordBefore);
          const beforeRange = before && Editor.range(editor, before, start);
          const beforeText = beforeRange && Editor.string(editor, beforeRange);
          const beforeMatch =
            beforeText && beforeText.match(/^(\{(=[\w-_]*)|\{([\w-_]+))$/);
          const after = Editor.after(editor, start);
          const afterRange = Editor.range(editor, start, after);
          const afterText = Editor.string(editor, afterRange);
          const afterMatch = afterText.match(/^(\s|$)/);
          console.log("before text=", beforeText, "before match=", beforeMatch);

          if (beforeMatch && afterMatch) {
            setTarget(beforeRange);
            setSearch(beforeMatch[2] || beforeMatch[3]);
            setIndex(0);
            return;
          }
        }
        setTarget(null);
      }}
    >
      <Editable
        className={`
          shadow
          appearance-none
          border
          rounded
          w-full
          py-2
          px-3
          text-grey-darker
          h-[250px]
          overflow-y-auto
          text-[10.5pt]
          ${className}
        `}
        renderElement={renderElement}
        onKeyDown={onKeyDown}
        placeholder={placeholder || "Enter some text..."}
      />
      <small className="text-gray-500">
        ℹ Type {"{="} to see available template variables, then follow by any
        letters to filter. Use arrow key [Up/Down] to move cursor, then [Enter]
        to make a selection.
      </small>
      {target && chars.length > 0 && (
        <Portal>
          <div
            ref={ref}
            style={{
              top: "-9999px",
              left: "-9999px",
              position: "absolute",
              zIndex: 1,
              padding: "3px",
              background: "white",
              borderRadius: "4px",
              boxShadow: "0 1px 5px rgba(0,0,0,.2)",
            }}
            data-cy="mentions-portal"
          >
            {chars.map((char, i) => (
              <div
                key={`${char.value}-${char.type}`.replaceAll(/\s/g, "")}
                style={{
                  padding: "1px 3px",
                  borderRadius: "3px",
                  background: i === index ? "#B4D5FF" : "transparent",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-end",
                }}
              >
                <div>{char.label}</div>
                <div className="font-normal text-sm text-gray-500 pl-4">
                  {char.type}
                </div>
              </div>
            ))}
          </div>
        </Portal>
      )}
    </Slate>
  );
};

export default DataTemplateField;

export type ParagraphElement = {
  type: "paragraph";
  align?: string;
  children: Descendant[];
};

export type MentionElement = {
  type: "mention";
  character: string;
  children: CustomText[];
};

const withMentions = (editor: Editor) => {
  const { isInline, isVoid } = editor;

  editor.isInline = element => {
    return element.type === "mention" ? true : isInline(element);
  };

  editor.isVoid = element => {
    return element.type === "mention" ? true : isVoid(element);
  };

  return editor;
};

const insertMention = (editor: Editor, character: string) => {
  const mention: MentionElement = {
    type: "mention",
    character,
    children: [{ text: "" }],
  };
  Transforms.insertNodes(editor, mention);
  Transforms.move(editor);
};

const RenderElement = (props: RenderElementProps) => {
  const { attributes, children, element } = props;
  switch (element.type) {
    case "mention":
      return <Mention {...props} />;
    default:
      return <p {...attributes}>{children}</p>;
  }
};

const Mention = ({ attributes, children, element }: RenderElementProps) => {
  const selected = useSelected();
  const focused = useFocused();
  const character = (element.type === "mention" && element.character) || "";

  return (
    <span
      {...attributes}
      contentEditable={false}
      data-cy={`mention-${character.replace(" ", "-")}`}
      style={{
        padding: "3px 3px 2px",
        margin: "0 1px",
        verticalAlign: "baseline",
        display: "inline-block",
        borderRadius: "4px",
        backgroundColor: "#eee",
        boxShadow: selected && focused ? "0 0 0 2px #B4D5FF" : "none",
      }}
    >
      {children}
      {character}
    </span>
  );
};

export const Portal = ({ children }: { children: ReactElement }) => {
  return typeof document === "object"
    ? ReactDOM.createPortal(children, document.body)
    : null;
};
