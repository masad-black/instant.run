import { TbBrandCpp } from "react-icons/tb";
import { FaGolang } from "react-icons/fa6";
import { FaHtml5, FaCss3, FaJava, FaPython, FaJsSquare } from "react-icons/fa";
import { BiLogoTypescript } from "react-icons/bi";
export { MdDelete } from "react-icons/md";
export { GoDotFill } from "react-icons/go";
export { LiaGripLinesVerticalSolid } from "react-icons/lia";
export { CiFileOn } from "react-icons/ci";

export { Play, ChevronDown, ChevronUp, FilePlus } from "lucide-react";

// if the user type any of these ext, then it mean's these are supported
const langExist = {
  js: 1,
  py: 1,
  java: 1,
  go: 1,
};

// using full form for Editor (for some suggestions)
const langFullExt = {
  js: "javascript",
  py: "python",
  java: "java",
  go: "golang",
};

const langLogos = {
  js: <FaJsSquare className="text-yellow-400" />,
  py: <FaPython className="text-blue-500" />,
  java: <FaJava className="text-red-500" />,
  go: <FaGolang className="text-blue-500" />,
};

export { langExist, langLogos, langFullExt };
