import babel from "rollup-plugin-babel";
import { terser } from "rollup-plugin-terser";
import path from "path";

export default {
  input: path.resolve(__dirname, "source/index.js"),
  external: ["@babel/standalone"],
  plugins: [
    babel({
      exclude: /node_modules/
    }),
    terser()
  ],
  
  output: [
    {
      dir: path.resolve(__dirname, "dist"),
      globals: {
        "@babel/standalone": "Babel"
      },
      file: "gryte.js",
      format: "es",
      sourcemap: false
    }
  ]
};
