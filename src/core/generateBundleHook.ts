import { getExtname } from "./getExtname";
import sharp from "sharp";
const extRE = /\.(png|jpeg|jpg|webp|wb2|avif)$/i;

async function generateBundleHook(bundler: any) {
	await Object.keys(bundler).forEach(async (key: string) => {
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
}

export { generateBundleHook };
