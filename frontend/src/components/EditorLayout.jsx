import { useShallow } from "zustand/shallow";

import { LiaGripLinesVerticalSolid } from "../constant.jsx";
import { Sidebar, CodeEditor, Output } from "../components";
import { useFileStore } from "../zustand/useFileStore";
import { useBaseStore } from "../zustand/useBaseStore";

const EditorLayout = () => {
  const { isOutputConActive } = useBaseStore(
    useShallow((state) => ({
      isOutputConActive: state.isOutputConActive,
    }))
  );
  const { activeFile } = useFileStore(
    useShallow((state) => ({
      activeFile: state.activeFile,
    }))
  );

  return (
    <div className="relative flex w-full h-full space-x-2">
      <div className="grid grid-cols-[15rem_1rem_auto] space-x-0.5 w-full h-full">
        <Sidebar />
        <div className="flex items-center justify-center">
          <LiaGripLinesVerticalSolid
            size="5rem"
            className="hover:cursor-w-resize text-white"
          />
        </div>
        {activeFile?._id && <CodeEditor />}
      </div>
      {isOutputConActive && <Output />}
    </div>
  );
};

export default EditorLayout;
