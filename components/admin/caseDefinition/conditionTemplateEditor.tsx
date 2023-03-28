import { FormVariableItem } from "components/admin/formBuilder";

import { useEffect } from "react";
import Editor, { useMonaco } from "@monaco-editor/react";

type ConditionTemplateEditorProps = {
  value?: string;
  onChange: (value?: string) => void;
  variableList: Array<FormVariableItem>;
  placeholder?: string;
};

const ConditionTemplateEditor = ({
  value,
  onChange,
  variableList,
}: ConditionTemplateEditorProps) => {
  const monaco = useMonaco();

  useEffect(() => {
    let editor: any;
    if (monaco) {
      editor = monaco.languages.registerCompletionItemProvider("python", {
        triggerCharacters: ["."],
        provideCompletionItems: (model: any, position: any) => {
          const wordAtPosition = model.getWordAtPosition({
            lineNumber: position.lineNumber,
            column: Math.max(position.column - 1, 0),
          });
          if (wordAtPosition?.word == "data") {
            return {
              suggestions: variableList.map(item => {
                return {
                  label: item.label,
                  kind: monaco.languages.CompletionItemKind.Property,
                  insertText: item.label,
                };
              }),
            };
          }
          return {
            suggestions: variableList.map(item => {
              return {
                label: item.value,
                kind: monaco.languages.CompletionItemKind.Property,
                insertText: item.value,
              };
            }),
          };
        },
      });
    }

    return () => {
      if (editor) editor.dispose();
    };
  }, [monaco, variableList]);

  return (
    <Editor
      height="150px"
      className="border border-gray-300 rounded"
      theme="vs"
      defaultLanguage="python"
      onChange={onChange}
      defaultValue={value}
      options={{
        glyphMargin: false,
        folding: false,
        lineNumbers: "off",
        lineDecorationsWidth: 5,
        lineNumbersMinChars: 5,
        minimap: {
          enabled: false,
        },
        scrollbar: {
          vertical: "auto",
          horizontal: "auto",
          verticalScrollbarSize: 0,
          verticalSliderSize: 20,
        },
      }}
    />
  );
};

export default ConditionTemplateEditor;
