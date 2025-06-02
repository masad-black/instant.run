import Editor from "@monaco-editor/react";
import { useShallow } from "zustand/shallow";

import { useFileStore } from "../zustand/useFileStore";
import { langFullExt } from "../constant";
import { useAuth0 } from "@auth0/auth0-react";

const CodeEditor = () => {
  const { isAuthenticated } = useAuth0();
  const { editorRef, activeFile, setShowNewFile, setEditorValue } =
    useFileStore(
      useShallow((state) => ({
        editorRef: state.editorRef,
        activeFile: state.activeFile,
        setShowNewFile: state.setShowNewFile,
        setEditorValue: state.setEditorValue,
      }))
    );

  function handleClick() {
    // this will hide the new file container/input field
    setShowNewFile(false);
  }

  function handleChangeInEditor(value) {
    // formating the code

    setEditorValue(value);
  }

  return (
    <div className="border border-zinc-800 rounded-md overflow-hidden shadow-md w-full h-full">
      <div className="w-full h-full bg-[#1A1F2C]" onClick={handleClick}>
        {isAuthenticated && (
          <Editor
            ref={editorRef}
            className="w-full h-full"
            theme="vs-dark"
            options={{
              fontSize: 22,
              fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              lineHeight: 1.6,
              padding: { top: 8, bottom: 8 },
              letterSpacing: 1,
              renderLineHighlight: "all",
              cursorBlinking: "smooth",
              cursorSmoothCaretAnimation: "on",
              smoothScrolling: true,
              tabSize: 2,
            }}
            onChange={handleChangeInEditor}
            language={langFullExt[activeFile?.extension]}
            value={activeFile?.content}
          />
        )}
      </div>
    </div>
  );
};

export default CodeEditor;
