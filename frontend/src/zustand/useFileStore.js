import { create } from "zustand";

import {
  userFiles,
  createFile,
  deleteFile,
  updatedFile,
} from "../utils/fileApi.js";
import { sendCodeToServer } from "../utils/executeApi.js";

const useFileStore = create((set) => {
  // Function to fetch user files (runs automatically)
  const getUserFiles = async () => {
    const data = await userFiles();
    set({ filesLoading: true }); // Show loading state
    set({ activeFile: data?.at(0) }); // setting the first file as active file
    set({ files: data, filesLoading: false });
  };

  // Auto-run function: Fetch user files when store initializes
  getUserFiles();

  return {
    // State
    files: [],
    filterFiles: [],
    showNewFileField: false,
    filesLoading: true,
    isActiveFileSave: true,
    activeFile: {},
    codeOutput: {
      success: true,
      output: [],
    },
    isLoading: false,

    clearOutputConsole: () =>
      set({ codeOutput: { success: true, output: [] } }),
    setShowNewFile: (currState) => set({ showNewFileField: currState }),
    setFilesLoading: (currState) => set({ filesLoading: currState }),
    saveActiveFile: (value) => set({ isActiveFileSave: value }),

    setFilterFiles: (currInput) =>
      set((state) => {
        if (!currInput) return { filterFiles: [] };

        const newFiles = state.files.filter((file) =>
          file.fileName.includes(currInput)
        );
        return { filterFiles: newFiles };
      }),

    setEditorValue: (value) => {
      set((state) => {
        return {
          activeFile: { ...state.activeFile, content: value },
          isActiveFileSave: false,
        };
      });
    },

    makeFileActive: (fileID) => {
      if (!fileID) {
        return set({ activeFile: {} });
      }

      set((state) => {
        var updatedFiles = state.files.map((file) =>
          file._id === state.activeFile?._id
            ? { ...file, content: state.activeFile.content }
            : file
        );

        const file = state.files.find((file) => file._id === fileID);
        return { files: [...updatedFiles], activeFile: file };
      });
    },

    createNewFile: async (fileName, extension) => {
      const newFile = await createFile(fileName, extension);

      if (newFile === null) {
        return set((state) => ({ files: state.files }));
      }

      set((state) => ({ files: [...state.files, newFile] }));
    },

    deleteUserFile: async (fileID) => {
      const file = await deleteFile(fileID);
      if (file) {
        set((state) => ({
          files: state.files.filter((file) => file._id !== fileID),
        }));
      }
    },

    saveUserCode: async (fileID, code = "") => {
      if (!fileID) {
        console.log("file id is not defined", fileID);
        return;
      }
      // just saving user written code on server, not updating state
      await updatedFile(fileID, code);
    },

    getCodeOutput: async (activeFile) => {
      if (!activeFile) {
        console.log("No file been selected");
        return;
      }

      set({ isLoading: true });
      const data = await sendCodeToServer(activeFile);

      if (data === null) {
        return set({
          codeOutput: {
            success: false,
            output: ["Something went wrong in server!!, try again later"],
          },
          isLoading: false,
        });
      }

      if (!data?.success) {
        return set({
          codeOutput: { success: false, output: data?.error },
          isLoading: false,
        });
      }

      set({
        codeOutput: { success: true, output: data?.data.split("\n") },
        isLoading: false,
      });
    },

    getUserFiles, // Expose getUserFiles for manual triggers if needed
  };
});

export { useFileStore };
