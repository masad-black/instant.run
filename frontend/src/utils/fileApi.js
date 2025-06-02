import axios from "axios";

// creating a custome axios client (this will be merged with each req below)
export const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

async function createFile(fileName, extension) {
  try {
    const { data } = await axiosClient.post(
      `files/createfile/${window.localStorage.getItem("email")}`,
      {
        data: {
          fileName,
          extension,
        },
      }
    );

    console.log("file: ", data);

    if (!data.success) {
      throw new Error("Server responded with failure status");
    }

    return data.data;
  } catch (error) {
    console.log(`Error while sending req for creating file - ${error} `);
    return null;
  }
}

async function userFiles() {
  try {
    const { data } = await axiosClient.get(
      `files/${window.localStorage.getItem("email")}`
    );

    console.log("data: ", data);
    if (!data.success) {
      throw new Error("Server responded with failure status");
    }

    return data.data;
  } catch (error) {
    console.log(`Error while getting user files - ${error} `);
    return null;
  }
}

async function deleteFile(fileID) {
  try {
    const { data } = await axiosClient.delete("files/deletefile", {
      data: { fileID, email: window.localStorage.getItem("email") },
    });

    if (!data.success) {
      throw new Error("Server responded with failure status");
    }

    return data.data;
  } catch (error) {
    console.log(`Error while deleting file - ${error} `);
    return null;
  }
}

async function updatedFile(fileID, code) {
  try {
    const { data } = await axiosClient.post("files/updatecode", {
      data: {
        fileID,
        code,
      },
    });

    if (!data.success) {
      throw new Error("Server responded with failure status");
    }

    return data.data;
  } catch (error) {
    console.error(`Error while updating file - `, error);
    return null;
  }
}

export { createFile, userFiles, deleteFile, updatedFile };
