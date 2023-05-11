import { join, resolve } from "path";
import { getSize } from "./getFileSize";
import { getExtname } from "./getExtname";
import sharp from "sharp";
import { LoggerCtx, ResolvedConfiguration } from "./types";
import consola from "consola";

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
		const startTime = new Date();

		const res = Object.keys(bundler).map(async (key: string) => {
			const ext = getExtname(key);
			if (key.match(extRE)) {
				const bundle = bundler[key];
				const fileName = bundle.name;
				const oldSize = bundle.source.length;
				let newSize = oldSize;

				const buffer = await sharp(bundle.source)
					[ext]({
						quality: 75,
						lossless: true,
					})
					.toBuffer();

				newSize = buffer.length && buffer.length;
				bundle.source = buffer;

				const logInfo: LoggerCtx = {
					fileName,
					startTime,
					oldSize,
					newSize,
				};
				this.logger(logInfo);
			}
		});
		await Promise.all(res);
	}

	logger(info: LoggerCtx) {
		const { fileName, oldSize, newSize, startTime } = info;

		consola.log("");
		consola.info(`file name: ${fileName}`);
		consola.success(getSize(oldSize).toString(), "➡️ ", getSize(newSize).toString());
		consola.success(`compressibility: ${((+newSize / +oldSize) * 100).toFixed(2)}%`);
		consola.success(`cost time: ${Date.now() - +startTime}ms`);
	}
}

export { Context };
