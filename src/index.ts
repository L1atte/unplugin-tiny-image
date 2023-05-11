import { createUnplugin } from "unplugin";
import type { Options } from "./core/types";
import { Context } from "./core/ctx";

export default createUnplugin<Options>(() => {
	const ctx = new Context();

	return {
		name: "unplugin-tiny-image",
		apply: "build",
		enforce: "pre",

		vite: {
			async configResolved(config) {
				ctx.handleMergeConfig(config);
			},
		},

		async generateBundle(_: any, bundler: any) {
			await ctx.generateBundleHook(bundler);
			return bundler;
		},
	};
});
