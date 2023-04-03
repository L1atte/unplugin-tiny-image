import path from "node:path";
import os from "node:os";
import fs from "node:fs";
import { createUnplugin } from "unplugin";
import type { Options } from "./types";

export default createUnplugin<Options>((options?: Options) => {
	let outputPath: string;
	return {
		name: "unplugin-starter",
		apply: "build",
		enforce: "pre",
		async load(id) {
			return null;
		},
		configResolved(resolvedConfig: { root: string; build: { outDir: string } }) {
			outputPath = path.resolve(resolvedConfig.root, resolvedConfig.build.outDir);
		},
		async generateBundle(_: any, bundler: any) {
			console.log(outputPath, "this is output path");
			console.log("-------------------");
			console.log(bundler, "this is bundler");
			return null;
		},
	};
});
