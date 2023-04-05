import { resolve, extname } from "node:path";
import sharp from "sharp";
import { getExtname } from "./core/getExtname";
import os from "node:os";
import fs from "node:fs";
import { createUnplugin } from "unplugin";
import type { Options } from "./types";

const extRE = /\.(png|jpeg|jpg|webp|wb2|avif)$/i;

export default createUnplugin<Options>((options?: Options) => {
	return {
		name: "unplugin-starter",
		apply: "build",
		enforce: "pre",
		async generateBundle(_: any, bundler: any) {
			Object.keys(bundler).forEach(async (key: string) => {
				console.log("key", key);
				const ext = getExtname(key);
				if (key.match(extRE)) {
					const bundle = bundler[key];
					const buffer = await sharp(bundle.source)
						[ext]({
							quality: 75,
						})
						.toBuffer();
					await sharp(buffer).toFile("buffer.jpeg");
					bundler[key] = {
						fileName: bundle.fileName,
						name: bundle.name,
						source: buffer,
						isAsset: true,
						type: "asset",
					};
					console.log(key, bundler[key]);
				}
			});
			return bundler;
		},
	};
});
