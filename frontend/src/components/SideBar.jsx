import { useShallow } from "zustand/shallow";
import { useAuth0 } from "@auth0/auth0-react";

import { Search, FileItem, NewFile } from "../components";
import { Loader } from "../components/ui";
import { useFileStore } from "../zustand/useFileStore.js";

const Sidebar = () => {
  const { isAuthenticated } = useAuth0();
  const { showNewFileField, filesLoading, files, filterFiles } = useFileStore(
    useShallow((state) => ({
      showNewFileField: state.showNewFileField,
      filesLoading: state.filesLoading,
      files: state.files,
      filterFiles: state.filterFiles,
    }))
  );

  return (
    <div className="w-60 h-full  flex flex-col">
      {filesLoading ? (
        <Loader />
      ) : (
        <>
          <Search />
          <div className="flex-1 overflow-auto">
            <ul className="p-2 space-y-1">
              {showNewFileField && <NewFile />}
              {isAuthenticated ? (
                filterFiles.length > 0 ? (
                  <>
                    {filterFiles?.map((file) => (
                      <FileItem key={file._id} data={file} />
                    ))}
                  </>
                ) : (
                  <>
                    {files.length === 0 ? (
                      <p className="text-light-grey text-sm text-center">
                        create new files!!!
                      </p>
                    ) : (
                      files?.map((file) => (
                        <FileItem key={file._id} data={file} />
                      ))
                    )}
                  </>
                )
              ) : (
                <p className="text-light-grey text-sm text-center">
                  not loged in!!!
                </p>
              )}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
