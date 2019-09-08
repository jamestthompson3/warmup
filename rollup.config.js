import commonJS from "rollup-plugin-commonjs";
import htmlTemplate from "rollup-plugin-generate-html-template";
import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";

export default {
  input: "./src/index.js",
  output: {
    file: "./build/bundle.js",
    format: "iife",
    name: "Warmup"
  },
  plugins: [
    serve({
      contentBase: ["build", "static"],
      verbose: true
    }),
    livereload(),
    commonJS(),
    htmlTemplate({
      template: "./src/main.html",
      target: "index.html"
    })
  ]
};
