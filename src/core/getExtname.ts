import { extname } from "path";
import { ImageExt, sharpEncodeMap } from "./model";

function getExtname(path: string): Exclude<ImageExt, "jpg"> {
	const key = extname(path).slice(1);

	return sharpEncodeMap.get(key as ImageExt) ?? "png";
}

export { getExtname };
