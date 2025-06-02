import { useEffect, useState } from "react";
import { useShallow } from "zustand/shallow";

import { langExist, langLogos, CiFileOn } from "../constant.jsx";
import { useFileStore } from "../zustand/useFileStore.js";

const NewFile = () => {
  const [fileName, setName] = useState("");
  const [currExtension, setExtension] = useState("");
  const { createNewFile, setShowNewFile } = useFileStore(
    useShallow((state) => ({
      createNewFile: state.createNewFile,
      setShowNewFile: state.setShowNewFile,
    }))
  );

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (!fileName) {
        alert("Please enter the fiele name!!!");
        return;
      }

      const splitName = fileName.split(".");
      const ext = splitName.at(splitName.length - 1);

      if (!langExist[ext]) {
        alert("The extension you provided is not correct!!!");
        return;
      }

      const name = splitName.slice(0, splitName.length - 1).join(".");

      createNewFile(name, ext);
      setShowNewFile(false);
      setName("");
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [fileName]);

  return (
    <div
      className="flex items-center gap-x-2 border border-zinc-700 bg-zinc-800/50 rounded-md px-3
     py-1.5 hover:border-zinc-600 transition-colors focus-within:ring-1 focus-within:ring-zinc-500"
    >
      {currExtension ? (
        langLogos[currExtension]
      ) : (
        <CiFileOn className="text-light-grey" />
      )}

      <div>
        <input
          type="text"
          value={fileName}
          onChange={(e) => setName(e.target.value)}
          className="border-none outline-none text-sm font-medium text-zinc-300 placeholder:text-zinc-500 w-full "
        />
      </div>
    </div>
  );
};

export default NewFile;
