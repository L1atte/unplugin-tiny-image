import { createUnplugin } from "unplugin";
import type { Options } from "./core/types";
import { generateBundleHook } from "./core/generateBundleHook";
import { Context } from "./core/ctx";
import { InputOptions } from "rollup";
import { consola } from "consola";


export default createUnplugin<Options>(() => {
	return {
		name: "unplugin-tiny-image",
		apply: "build",
		enforce: "pre",
		async generateBundle(_: any, bundler: any) {
			await generateBundleHook(bundler);
			return bundler;
		},
	};
});
