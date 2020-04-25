import babel from "rollup-plugin-babel";
import { terser } from "rollup-plugin-terser";
import { uglify } from "rollup-plugin-uglify";
import scss from "rollup-plugin-scss";
import path from "path";

export default {
  input: path.resolve(__dirname, "source/index.js"),
  external: ["@babel/standalone"],
  plugins: [
    babel({
      exclude: /node_modules/,
    }),
    terser(),
    scss({
      output: true,
      output: path.resolve(__dirname, "dist/gryte.css"),
    }),
    uglify(),
  ],

  output: [
    {
      globals: {
        "@babel/standalone": "Babel",
      },
      file: path.resolve(__dirname, "dist/gryte.js"),
      format: "es",
      sourcemap: false,
    },
  ],
};
