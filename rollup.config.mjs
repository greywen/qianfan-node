import typescript from "@rollup/plugin-typescript";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { babel } from "@rollup/plugin-babel";
import json from "@rollup/plugin-json";
import cleanup from "rollup-plugin-cleanup";

const production = process.env.NODE_ENV === "production";

export default [
  {
    input: "src/qianfan.ts",
    output: [
      {
        file: "dist/qianfan.js",
        format: "umd",
        name: "qianfan",
        sourcemap: production ? false : "inline",
      }
    ],
    plugins: [
      typescript(),
      nodeResolve(),
      commonjs(),
      babel({ babelHelpers: "bundled" }),
      json(),
      production && cleanup(),
      // production && terser(),
    ],
  },
];
