import { defineConfig } from "vite";
import Inspect from "vite-plugin-inspect";
import react from "@vitejs/plugin-react";
import type { PluginOption } from "vite";
import Unplugin from "../../src/vite";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), Inspect(), Unplugin({ test: "test" }) as PluginOption],
});
