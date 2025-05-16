import { useState } from "react";
import { useShallow } from "zustand/shallow";

import { FilePlus } from "../constant";
import { useFileStore } from "../zustand/useFileStore";

const Search = () => {
  const [file, setFile] = useState("");
  const { setShowNewFile, setFilterFiles } = useFileStore(
    useShallow((state) => ({
      setShowNewFile: state.setShowNewFile,
      setFilterFiles: state.setFilterFiles,
    }))
  );

  function handleChange(e) {
    setFile(e.target.value);

    const fileName = e.target.value;

    setFilterFiles(fileName);
  }

  function handleClick() {
    setShowNewFile(true);
  }

  return (
    <>
      <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800">
        <h2 className="text-sm font-medium text-zinc-200">Files</h2>
        <button
          className="p-1.5 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800 hover:cursor-pointer 
          transition-all duration-300 flex items-center justify-center mr-2"
          onClick={handleClick}
        >
          <FilePlus size={18} />
        </button>
      </div>

      <div className="px-3 py-2">
        <div className="relative">
          <input
            value={file}
            onChange={handleChange}
            type="text"
            placeholder="search file..."
            className="h-8 pl-8 text-sm bg-zinc-800/70 border-zinc-700 text-zinc-300 placeholder:text-zinc-500 focus-visible:ring-zinc-700"
          />
        </div>
      </div>
    </>
  );
};

export default Search;
