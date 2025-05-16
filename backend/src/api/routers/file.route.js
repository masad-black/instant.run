import express from "express";
import {
  createFile,
  deleteFile,
  getAllFiles,
  updateCodeInFile,
  fileAttributeChanges,
  runCode,
} from "../controllers/file.controller.js";

const router = express.Router();

router.get("/:email", getAllFiles);

router.post("/updatecode", updateCodeInFile);

router.post("/createfile/:email", createFile);

router.post("/runcode", runCode);

router.patch("/fileupdates", fileAttributeChanges);

router.delete("/deletefile", deleteFile);

export { router };
