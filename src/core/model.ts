type ImageExt = "jpeg" | "png" | "jpeg" | "avif" | "webp" | "jpg";

const sharpEncodeMap: Map<ImageExt, Exclude<ImageExt, "jpg">> = new Map([
	["jpeg", "jpeg"],
	["png", "png"],
	["jpg", "jpeg"],
	["avif", "avif"],
	["webp", "webp"],
]);

export { ImageExt, sharpEncodeMap };
