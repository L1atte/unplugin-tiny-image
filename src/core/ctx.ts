import { join, resolve } from "path";
import { getExtname } from "./getExtname";
import sharp from "sharp";
import { ResolvedConfiguration } from "./types";

const extRE = /\.(png|jpeg|jpg|webp|wb2|avif)$/i;

class Context {
	config: ResolvedConfiguration | any;

	handleMergeConfig(userConfig: any) {
		const {
			base,
			command,
			root,
			build: { assetsDir, outDir },
			options,
		} = userConfig;
		const cwd = process.cwd();
		const isBuild = command === "build";
		const cacheDir = join(root, "node_modules", ".cache", "unplugin-tiny-image");
		const outputPath = resolve(root, outDir);
		const config = {
			base,
			command,
			root,
			cwd,
			outDir,
			assetsDir,
			isBuild,
			cacheDir,
			outputPath,
		};
		this.config = config;
	}

	async generateBundleHook(bundler: any) {
		const res = Object.keys(bundler).map(async (key: string) => {
			console.log("========");
			const ext = getExtname(key);
			if (key.match(extRE)) {
				const bundle = bundler[key];
				const buffer = await sharp(bundle.source)
					[ext]({
						quality: 75,
						lossless: true,
					})
					.toBuffer();
				console.log("buffer", buffer);

				bundle.source = buffer;
			}
		});
		await Promise.all(res);
	}
}

export { Context };
