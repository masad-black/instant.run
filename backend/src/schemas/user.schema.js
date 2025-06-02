import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    // List of files
    files: [
      {
        type: mongoose.Types.ObjectId,
        ref: "File",
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export { User };
