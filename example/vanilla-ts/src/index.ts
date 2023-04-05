import sharp from "sharp";

await sharp("test.jpeg").toFile("hello.jpeg");

const buffer = await sharp("test.jpeg").toBuffer();
console.log(buffer.length);

await sharp(buffer).toFile("buffer.jpeg");
