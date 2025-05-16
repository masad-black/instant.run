import { promisify } from "node:util";
import child_process from "node:child_process";
import fs from "fs";
import path from "path";

import { langExtensions, mainCommand } from "./constant.js";

const exec = promisify(child_process.exec);

async function executeUserCode(content, fileName, extension) {
  // making the absolute path
  const mainPath = path.resolve("files");
  const file = `${fileName}.${langExtensions[extension]}`;
  // and joininng with the file name
  const filePath = path.join(mainPath, file).replace(/\\/g, "/");

  try {
    //  writing user code in fil
    fs.writeFileSync(`${filePath}`, content, function (err) {
      if (err) {
        return console.log(`Error while writing in file : ${err}`);
      }
      console.log("user code is written in file!!");
    });

    if (extension === "ts") {
      var dockerCommand = `docker run --rm -v ${filePath}:/workspace/${file} compiler:2 tsc /workspace/${file}  node /workspace/${fileName}.js`;
    } else {
      var dockerCommand = `docker run --rm -v ${filePath}:/workspace/${file} compiler:2 ${mainCommand[extension]} /workspace/${file}`;
    }

    // this will run the docker image
    const { stdout, stderr } = await exec(dockerCommand);

    if (stderr) {
      return stderr;
    }

    return stdout;
  } catch (error) {
    console.log(`Error in exec file -  ${error}`);
    throw Error(error);
  }
}

export { executeUserCode };
