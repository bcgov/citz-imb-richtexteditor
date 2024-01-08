import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import postcss from "rollup-plugin-postcss";
import svg from "rollup-plugin-svg-import";

export default [
  {
    input: "src/index.ts",
    output: [
      {
        dir: "build",
        format: "esm",
        sourcemap: true,
      },
    ],
    external: ["react", "react-dom"],
    plugins: [
      resolve(),
      commonjs(),
      postcss({ extensions: [".css"] }),
      svg(),
      typescript({ tsconfig: "./tsconfig.json", outputToFilesystem: true }),
    ],
  },
];
