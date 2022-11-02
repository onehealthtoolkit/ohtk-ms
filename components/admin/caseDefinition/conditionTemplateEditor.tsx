import { FormVariableItem } from "components/admin/formBuilder";
import AceEditor from "react-ace";

import { Ace } from "ace-builds";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/webpack-resolver";
import { useEffect, useRef } from "react";
import ReactAce from "react-ace/lib/ace";

type ConditionTemplateEditorProps = {
  value?: string;
  onChange: (value: string) => void;
  variableList: Array<FormVariableItem>;
  placeholder?: string;
};

const ConditionTemplateEditor = ({
  value,
  onChange,
  variableList,
  placeholder,
}: ConditionTemplateEditorProps) => {
  const aceRef = useRef<ReactAce>(null);

  useEffect(() => {
    if (aceRef.current) {
      const idx = aceRef.current.editor.completers.findIndex(
        completer =>
          completer.identifierRegexps &&
          completer.identifierRegexps[0].test("formvariables")
      );

      if (idx !== -1) {
        aceRef.current.editor.completers.splice(idx, 1);
      }

      aceRef.current.editor.completers.push({
        identifierRegexps: [new RegExp("formvariables")],
        getCompletions: function (
          _editor: any,
          _session: any,
          _pos: any,
          _prefix: any,
          callback: Ace.CompleterCallback
        ) {
          var completions: Ace.Completion[] = [];
          // we can use session and pos here to decide what we are going to show
          variableList.forEach(function (variable) {
            completions.push({
              value: variable.value,
              meta: variable.type,
              score: 1,
            });
          });
          callback(null, completions);
        },
      });
    }
  }, [variableList]);

  return (
    <AceEditor
      mode="python"
      theme="github"
      onChange={onChange}
      name="UNIQUE_ID_OF_DIV"
      defaultValue={value}
      placeholder={placeholder}
      editorProps={{ $blockScrolling: true }}
      setOptions={{
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        enableSnippets: true,
        minLines: 10,
        maxLines: 10,
        showLineNumbers: false,
        showGutter: false,
      }}
      className="border border-gray-300 rounded"
      ref={aceRef}
    />
  );
};

export default ConditionTemplateEditor;
