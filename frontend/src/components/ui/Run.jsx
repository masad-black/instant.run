import { useShallow } from "zustand/shallow";

import { Play } from "../../constant.jsx";
import { useFileStore } from "../../zustand/useFileStore";
import { useBaseStore } from "../../zustand/useBaseStore.js";

const Run = () => {
  const { activeFile, getCodeOutput } = useFileStore(
    useShallow((state) => ({
      activeFile: state.activeFile,
      getCodeOutput: state.getCodeOutput,
    }))
  );
  const { setOutputContainer } = useBaseStore(
    useShallow((state) => ({
      setOutputContainer: state.setOutputContainer,
    }))
  );

  function handleClick() {
    setOutputContainer(true);
    getCodeOutput(activeFile);
  }

  return (
    <button
      className="bg-green-600 hover:bg-green-500 hover:cursor-pointer text-white rounded-md flex items-center gap-1.5
     px-4 py-1.5 h-8 transition-all duration-300 ease-out hover:shadow-md hover:shadow-green-500/20 hover:scale-105"
      onClick={handleClick}
    >
      <Play
        size={14}
        className="transition-transform duration-300 group-hover:translate-x-0.5"
      />
      <span className="font-medium">Run</span>
    </button>
  );
};

export default Run;
