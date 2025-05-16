import { HiOutlineX } from "react-icons/hi";
import { RiDeleteBin6Line } from "react-icons/ri";
import Loader from "./ui/Loader";

import { useBaseStore } from "../zustand/useBaseStore";
import { useShallow } from "zustand/shallow";
import { useFileStore } from "../zustand/useFileStore";

const Output = () => {
  const { setOutputContainer } = useBaseStore(
    useShallow((state) => ({
      setOutputContainer: state.setOutputContainer,
    }))
  );
  const { codeOutput, isLoading, clearOutputConsole } = useFileStore(
    useShallow((state) => ({
      codeOutput: state.codeOutput,
      isLoading: state.isLoading,
      clearOutputConsole: state.clearOutputConsole,
    }))
  );

  // removing all output form the container
  function handleOnClear() {
    clearOutputConsole();
  }

  // hidding the output container
  function handleOnClose() {
    setOutputContainer(false);
  }

  return (
    <div className="bg-[#1A1F2C] border border-zinc-800 rounded-md shadow-lg w-[50%] h-full flex flex-col">
      <header className="flex items-center justify-between border-b border-zinc-800 p-2">
        <div className="flex items-center gap-x-2">
          <h5 className="text-zinc-300 text-sm font-medium">Console Output</h5>
          <button
            onClick={handleOnClose}
            className="text-zinc-500 hover:text-zinc-300 transition-colors p-1 rounded hover:bg-zinc-800/50"
          >
            <HiOutlineX className="text-sm hover:cursor-pointer" />
          </button>
        </div>
        <div
          className="flex items-center gap-x-1.5 px-2 py-1 rounded hover:bg-zinc-800/70 transition-colors cursor-pointer"
          onClick={handleOnClear}
        >
          <RiDeleteBin6Line className="text-zinc-400" />
          <span className="text-xs text-zinc-400 font-medium">
            Clear console
          </span>
        </div>
      </header>

      <div className="h-[90vh] overflow-auto p-3 font-mono text-sm">
        {isLoading ? (
          <Loader />
        ) : (
          codeOutput?.output.map((item, index) => (
            <div
              key={index}
              className={`${
                codeOutput.success ? "text-zinc-300" : "text-red-400"
              } text-lg mb-1 leading-relaxed border-l-2 border-zinc-700 pl-2 select-text hover:border-blue-500 transition-colors`}
            >
              {item}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Output;
