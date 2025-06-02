import mongoose from "mongoose";

const fileSchema = new mongoose.Schema(
  {
    fileName: { type: String, required: true },
    content: { type: String, default: "" }, // Code written by the user
    extension: { type: String, required: true }, // what type of file is this
    userID: { type: mongoose.Types.ObjectId, key: "User" },
  },
  { timestamps: true }
);

const File = mongoose.model("File", fileSchema);

export { File };
