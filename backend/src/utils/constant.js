const langExtensions = {
  js: "js",
  py: "py",
  java: "java",
  go: "go",
};

const mainCommand = {
  js: "node",
  py: "python",
  java: "java",
  go: "go run",
};

const envVar = {
  MONGOOSE_URL: process.env.DB_URL,
};

export { langExtensions, mainCommand, envVar };
