import { defineConfig } from 'vite'
import type { PluginOption } from 'vite'
import Unplugin from '../../src/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    Unplugin({}) as PluginOption,
  ],
})
