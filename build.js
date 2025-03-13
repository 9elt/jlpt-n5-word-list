import CleanCSS from "clean-css";

const build = await Bun.build({
    entrypoints: ["src/index.js"],
    outdir: "dist",
    minify: false,
});

if (!build.success) {
    console.error(build);
    process.exit(1);
}

await Bun.write(
    "dist/index.css",
    new CleanCSS().minify(
        await Bun.file("src/index.css").text()
    ).styles
);
