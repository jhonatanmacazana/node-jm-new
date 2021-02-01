var OS = require("os");

import New from "./New";

const usage = () => {
  console.log("Usage: jm-new [PROJECT TYPE]");
  console.log("Example: jm-new c");
  console.log(
    "Available project types can be found by running `jm-new --types` or at https://github.com/jhonatanmacazana/vscode-boilerplates"
  );
};

const main = async () => {
  const types = process.argv.slice(2);

  if (!types || types.length === 0) {
    usage();
    return;
  }

  if (/^((--?)?types|-t)$/i.test(types.join())) {
    console.log("Fetching available types...");
    try {
      const types = await New.getTypes();
      console.log(types.join(OS.EOL));
    } catch (err) {
      if (err.statusCode) {
        console.error(
          `Could not access file from GitHub. Recieved status code ${err.statusCode} `
        );
      } else {
        console.error("An unexpected error occurred.");
        console.error(err);
      }
    }
    return;
  }

  types.forEach(type => {
    type = type.charAt(0).toUpperCase() + type.slice(1);

    try {
      New.writeTemplate({ type });
      console.log(`Created .gitignore file for flag type ${types}.`);
    } catch (err) {
      if (err.statusCode) {
        console.log("There is no gitignore for " + type);
        console.log(
          "Available project types can be found by running `gitignore -types` or at https://github.com/github/gitignore"
        );
        console.error("Recieved status code " + err.statusCode);
      } else {
        console.error("An unexpected error occurred.");
        console.error(err);
      }
    }
  });
};

main();
