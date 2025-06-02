import express from "express";

import { executeUserCode } from "../../utils/executeCode.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { data } = req.body;

    const output = await executeUserCode(
      data.content,
      data.fileName,
      data.extension
    );
    res.send(new ApiResponse(true, 200, "Your code executed", output));
  } catch (error) {
    const internalCodeError = error.message.split("workspace").slice(1);
    res.send(
      new ApiResponse(false, 500, "Invalid request", null, internalCodeError)
    );
  }
});

export { router };
