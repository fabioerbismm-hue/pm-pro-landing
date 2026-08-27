import {cp, copyFile, mkdir, readdir} from "node:fs/promises";
import {join} from "node:path";

const root = process.cwd();
const standalone = join(root, ".next", "standalone");

await mkdir(join(standalone, ".next"), {recursive: true});
await cp(join(root, "public"), join(standalone, "public"), {recursive: true});
await cp(join(root, ".next", "static"), join(standalone, ".next", "static"), {
  recursive: true,
});

// Hostinger's CDN can retain an older HTML document after a deployment while
// the hashed Next.js CSS asset it references has already been replaced. Keep
// aliases for the known cached stylesheet names so that those documents remain
// styled until the CDN entry expires or is purged.
const cssDirectory = join(standalone, ".next", "static", "css");
const cssFiles = (await readdir(cssDirectory)).filter((file) =>
  file.endsWith(".css"),
);
const currentCss = cssFiles[0];
const legacyCssFiles = ["f3d42200b968bf26.css"];

if (currentCss) {
  await Promise.all(
    legacyCssFiles.map((legacyCss) =>
      copyFile(join(cssDirectory, currentCss), join(cssDirectory, legacyCss)),
    ),
  );
}
