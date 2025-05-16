import { axiosClient } from "./fileApi.js";

async function sendCodeToServer(activeFileData) {
  try {
    const { data } = await axiosClient.post("quickcode", {
      data: {
        content: activeFileData.content,
        fileName: activeFileData.fileName,
        extension: activeFileData.extension,
      },
    });

    return data;
  } catch (error) {
    console.log(`Error while sending code to server - ${error}`);
    return null;
  }
}

export { sendCodeToServer };
