import { resolve, extname } from "node:path";
import sharp from "sharp";
import { getExtname } from "./core/getExtname";
import os from "node:os";
import fs from "node:fs";
import { createUnplugin } from "unplugin";
import type { Options } from "./types";
import { generateBundleHook } from "./core/generateBundleHook";

const extRE = /\.(png|jpeg|jpg|webp|wb2|avif)$/i;

export default createUnplugin<Options>((options?: Options) => {
	return {
		name: "unplugin-starter",
		apply: "build",
		enforce: "pre",
		async generateBundle(_: any, bundler: any) {
			await generateBundleHook(bundler);
			return bundler;
		},
	};
});
