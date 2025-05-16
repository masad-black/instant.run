import { File } from "../../schemas/file.schema.js";
import { User } from "../../schemas/user.schema.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { langExtensions } from "../../utils/constant.js";

// getting all the files user created at once
async function getAllFiles(req, res) {
  try {
    const { email } = req.params;

    // checking if the id is null
    if (!email) {
      return res.send(
        new ApiResponse(
          false,
          300,
          "Invalid request",
          null,
          "Data is missing in fields"
        )
      );
    }

    const userExist = await User.findOne({ email: email });
    if (!userExist) {
      const newUser = await User.create({ email });

      return res.send(
        new ApiResponse(
          true,
          200,
          "User is create beacuse this user doesn't exist",
          newUser
        )
      );
    }

    const files = await User.findOne({ email }).populate("files").exec();

    return res.send(
      new ApiResponse(true, 200, "User created files", files.files)
    );
  } catch (error) {
    console.log(`Error while creating file - ${error}`);
    res.send(
      new ApiResponse(
        false,
        500,
        "Invalid request",
        null,
        "Internal serve error"
      )
    );
  }
}

async function updateCodeInFile(req, res) {
  try {
    const { data } = req.body;
    const { fileID, code } = data;

    // checking for missing data in fields
    if (!fileID) {
      return res.send(
        new ApiResponse(
          false,
          300,
          "Invalid request",
          null,
          "Data is missing in fields"
        )
      );
    }

    const updatedFile = await File.updateOne(
      { _id: fileID },
      {
        $set: {
          content: code,
        },
      }
    );
    if (updatedFile.modifiedCount === 1) {
      // file is updated
      res.send(new ApiResponse(true, 200, "File updated", null));
    } else {
      res.send(
        new ApiResponse(
          false,
          300,
          "Invalid request",
          null,
          "File id is not correct"
        )
      );
    }
  } catch (error) {
    console.log(`Error while updating file code - ${error}`);
    res.send(
      new ApiResponse(
        false,
        500,
        "Invalid request",
        null,
        "Internal serve error"
      )
    );
  }
}

// this will create a new file
async function createFile(req, res) {
  try {
    const { email } = req.params;
    const { data } = req.body;
    const { fileName, extension } = data;

    // checking for missing data in fields
    if (!fileName || !extension || !email) {
      return res.send(
        new ApiResponse(
          false,
          300,
          "Invalid request",
          null,
          "Data is missing in fields"
        )
      );
    }

    // checking  file extension support
    if (!langExtensions[extension]) {
      return res.send(
        new ApiResponse(
          false,
          300,
          "Invalid request",
          null,
          "Provided files extension is not supported"
        )
      );
    }

    const userExist = await User.findOne({ email: email });
    if (!userExist) {
      return res.send(
        new ApiResponse(
          false,
          300,
          "Invalid request",
          null,
          "User email is not cirrect"
        )
      );
    }

    const newFile = await File.insertOne({
      fileName,
      extension,
    });

    newFile.userID = userExist._id;
    userExist.files.push(newFile._id);

    await newFile.save();
    await userExist.save();

    res.send(
      new ApiResponse(true, 200, "New file is created", {
        fileName: newFile.fileName,
        extension: newFile.extension,
        _id: newFile._id,
        content: newFile.content,
      })
    );
  } catch (error) {
    console.log(`Error while creating file - ${error}`);
    res.send(
      new ApiResponse(
        false,
        500,
        "Invalid request",
        null,
        "Internal serve error"
      )
    );
  }
}

// deleting any specific user file
async function deleteFile(req, res) {
  try {
    const { fileID, email } = req.body;

    // cheking missing value
    if (!fileID) {
      return res.send(
        new ApiResponse(
          false,
          300,
          "Invalid request",
          null,
          "Data is missing in fields"
        )
      );
    }

    const response = await File.deleteOne({ _id: fileID });
    await User.findOneAndUpdate(
      { email },
      { $pull: { files: fileID } },
      { new: true }
    );

    // if count is zero that means no file is deleted
    if (response.deletedCount === 0) {
      return res.send(
        new ApiResponse(
          false,
          300,
          "Invalid request",
          null,
          "File id is not correct"
        )
      );
    }

    return res.send(new ApiResponse(true, 200, "File is deleted", true));
  } catch (error) {
    console.log(`Error while deleting file - ${error}`);
    res.send(
      new ApiResponse(
        false,
        500,
        "Invalid request",
        null,
        "Internal serve error"
      )
    );
  }
}

// changing name or extension etc
async function fileAttributeChanges(req, res) {
  try {
    const { updatedName, updatedExtension, fileID } = req.body;

    // if both of them are null
    if (!updatedName && !updatedExtension) {
      return res.send(
        new ApiResponse(
          false,
          300,
          "Invalid request",
          null,
          "Data is missing in fields"
        )
      );
    }

    // cheking missing value
    if (!fileID) {
      return res.send(
        new ApiResponse(
          false,
          300,
          "Invalid request",
          null,
          "Data is missing in fields"
        )
      );
    }

    if (updatedName) {
      // if user wana change file name
      const updatedFile = await File.findByIdAndUpdate(
        { _id: fileID },
        {
          $set: {
            fileName: updatedName,
          },
        },
        { new: true, projection: { _id: 1, fileName: 1, extension: 1 } }
      );
      return res.send(
        new ApiResponse(true, 200, "File is updated", updatedFile)
      );
    } else if (updatedExtension) {
      // if user wana change file extension
      const updatedFile = await File.findByIdAndUpdate(
        { _id: fileID },
        {
          $set: {
            extension: updatedExtension,
          },
        },
        { new: true, projection: { _id: 1, fileName: 1, extension: 1 } }
      );
      return res.send(
        new ApiResponse(true, 200, "File is updated", updatedFile)
      );
    }
  } catch (error) {
    console.log(`Error while changing file attributes - ${error}`);
    res.send(
      new ApiResponse(
        false,
        500,
        "Invalid request",
        null,
        "Internal serve error"
      )
    );
  }
}

async function runCode(req, res) {
  try {
    const { code, language } = req.body;

    res.send(code, language);
  } catch (error) {
    console.log(`Error while changing file attributes - ${error}`);
    res.send(
      new ApiResponse(
        false,
        500,
        "Invalid request",
        null,
        "Internal serve error"
      )
    );
  }
}

export {
  getAllFiles,
  updateCodeInFile,
  createFile,
  deleteFile,
  fileAttributeChanges,
  runCode,
};
