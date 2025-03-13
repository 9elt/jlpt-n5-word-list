import CleanCSS from "clean-css";

const build = await Bun.build({
    entrypoints: ["src/index.js"],
    outdir: "docs",
    minify: true,
});

if (!build.success) {
    console.error(build);
    process.exit(1);
}

await Bun.write(
    "docs/index.css",
    new CleanCSS().minify(
        await Bun.file("src/index.css").text()
    ).styles
);

await Bun.write("docs/index.html", Bun.file("src/index.html"));
