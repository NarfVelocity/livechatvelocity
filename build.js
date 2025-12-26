// build.js
const esbuild = require("esbuild");

esbuild.build({
  entryPoints: ["src/widget.js"],
  bundle: true,
  format: "iife",
  platform: "browser",
  target: ["es2018"],
  outfile: "dist/bundle.js",
  sourcemap: true,
  define: {
    "process.env.NODE_ENV": '"production"'
  }
}).catch((err) => {
  console.error(err);
  process.exit(1);
});
