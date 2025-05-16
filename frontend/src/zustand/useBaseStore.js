import { create } from "zustand";

const useBaseStore = create((set) => {
  return {
    //   states
    isOutputConActive: false,

    setOutputContainer: (state) => set({ isOutputConActive: state }),
  };
});

export { useBaseStore };
