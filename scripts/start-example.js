const { EntoliList } = require("entoli");
const { readdirSync, symlinkSync } = require("fs");
const { join } = require("path");
const { spawn } = require("child_process");
const process = require("process");

const base = ".\\examples";

const examples = readdirSync(base, { withFileTypes: true })
  .filter((dir) => dir.isDirectory())
  .filter((dir) => !["assets"].includes(dir.name))
  .map((dir) => [dir.name, join(base, dir.name)]);

console.log(`Which example do you want to start?`);
let choice = new EntoliList(examples, {
  enterMessage: false,
  exitMessage: false,
  preventExit: true,
});

choice().then((choice) => {
  if (!choice) {
    return;
  }
  const [slug, path] = choice;
  console.log(`Starting example at ${path}`);
  try {
    symlinkSync(
      join(process.cwd(), "create-itto", "src", "index.html"),
      join(process.cwd(), path, "index.html"),
      "file"
    );
  } catch (error) {
    console.error(error);
  }
  const vite = spawn("npm run start:examples", [`/${slug}/`], {
    shell: true,
    stdio: "inherit",
  });
  vite.stdout?.on("data", (data) => process.stdout.write(data));
  vite.stderr?.on("data", (data) => process.stdout.write(data));
});
