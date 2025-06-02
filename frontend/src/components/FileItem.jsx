import { useShallow } from "zustand/shallow";

import { useFileStore } from "../zustand/useFileStore";
import { langLogos, MdDelete, GoDotFill } from "../constant.jsx";

const FileItem = ({ data }) => {
  const { activeFile, isActiveFileSave, deleteUserFile, makeFileActive } =
    useFileStore(
      useShallow((state) => ({
        activeFile: state.activeFile,
        isActiveFileSave: state.isActiveFileSave,
        deleteUserFile: state.deleteUserFile,
        makeFileActive: state.makeFileActive,
      }))
    );

  function handleDeletFile(e, id) {
    // this will stop the bubbling, of the evet emitter
    e.stopPropagation();

    // before deleting the active file, seting active file defualt to hide the editor
    makeFileActive(null);
    // then deleting the file from list
    deleteUserFile(id);
  }

  function handleClick(id) {
    if (!id) return;

    makeFileActive(id);
  }

  return (
    <li
      className={`group flex items-center justify-between px-2 py-1.5 rounded hover:bg-zinc-800 transition-colors cursor-pointer ${
        data._id === activeFile?._id && "bg-zinc-800 border-2 border-blue"
      }`}
      onClick={() => handleClick(data._id)}
    >
      <div className="flex items-center gap-2">
        <span aria-hidden="true">{langLogos[data.extension]}</span>
        <span className="text-zinc-300 text-sm">
          {data.fileName}.{data.extension}
        </span>
      </div>
      <div className="text-zinc-500 hover:text-zinc-300 ">
        {!isActiveFileSave && data._id === activeFile?._id ? (
          <GoDotFill className="text-light-grey" />
        ) : (
          <MdDelete
            className="opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={(e) => handleDeletFile(e, data._id)}
          />
        )}
      </div>
    </li>
  );
};

export default FileItem;
