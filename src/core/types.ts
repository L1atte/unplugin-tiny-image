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

export interface LoggerCtx {
	fileName: string;
	newSize: number | string;
	oldSize: number | string;
	startTime: number | string | Date;
}
