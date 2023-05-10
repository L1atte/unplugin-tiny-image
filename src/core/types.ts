export interface Options {
	// define your plugin options here
}

export interface ResolvedConfiguration {
	base: string;
	command: string;
	root?: string;
	cwd?: string;
	outDir: string;
	assetsDir?: string;
	isBuild: boolean;
	cacheDir?: string;
	outputPath?: string;
}
