import { readdirSync, readFileSync, writeFileSync, statSync } from "fs";
import { resolve, join } from "path";

/**
 * Removes all imports of *.svg files in *.d.ts files.
 * The bundling process for declaration files can't handle svg imports.
 */

const buildDir = resolve("build");

const processDirectory = (directory) => {
  const files = readdirSync(directory);

  files.forEach((file) => {
    const filePath = join(directory, file);
    const fileStat = statSync(filePath);

    if (fileStat.isDirectory()) {
      processDirectory(filePath); // Recursively inspect the directory
    } else if (file.endsWith(".d.ts")) {
      let fileContent = readFileSync(filePath, "utf-8");
      // Remove lines that import SVG files
      fileContent = fileContent
        .split("\n")
        .filter(
          (line) =>
            !(
              line.trim().startsWith("import") ||
              (line.trim().startsWith("export") && line.includes(".svg"))
            )
        )
        .join("\n");

      // Write the cleaned file content back to the file
      writeFileSync(filePath, fileContent);
    }
  });
};

processDirectory(buildDir);
