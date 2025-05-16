import { useEffect } from "react";
import { useShallow } from "zustand/shallow";

import { Header, EditorLayout } from "../components";
import { useFileStore } from "../zustand/useFileStore.js";
import { useAuth0 } from "@auth0/auth0-react";

const Compiler = () => {
  const { isAuthenticated, user } = useAuth0();
  const { activeFile, saveActiveFile, saveUserCode } = useFileStore(
    useShallow((state) => ({
      activeFile: state.activeFile,
      saveActiveFile: state.saveActiveFile,
      saveUserCode: state.saveUserCode,
    }))
  );

  function handleKeyDown(e) {
    if (e.key === "s" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault(); // Prevent the default save action

      // saving the code on the server
      saveUserCode(activeFile?._id, activeFile?.content);
      saveActiveFile(true);
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      window.localStorage.setItem("email", user.email);
    }
  }, [isAuthenticated, user]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [activeFile?.content]);

  return (
    <div className="w-screen h-screen">
      <div className="flex flex-col w-full h-full bg-green-500 overflow-hidden">
        <div className="h-12">
          <Header />
        </div>
        <div className="bg-[#323232] h-[calc(100%-48px)] p-2 ">
          <EditorLayout />
        </div>
      </div>
    </div>
  );
};

export default Compiler;
