import { ImagePool } from "@squoosh/lib/build";
import { cpus } from "node:os";
import fs from "fs/promises";

const imagePool = new ImagePool(cpus().length);
const file = await fs.readFile("./test.jpg");
const image = imagePool.ingestImage(file);
const encodeOptions = {
	mozjpeg: {},
	jxl: {
		quality: 90,
	},
};
await image.encode(encodeOptions);
//@ts-ignore
const rawEncodedImage = image.encodedWith.mozjpeg.binary;

fs.writeFile("./new.jpg", rawEncodedImage);
console.log("success");
