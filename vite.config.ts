import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import checker from 'vite-plugin-checker'
import svgr from 'vite-plugin-svgr'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    checker({
      typescript: true,
    }),
    svgr({
      include: "**/*.svg",
    }),
  ],
  base: '/breakthrough-bot/',
  server: {
    open: true,
    port: 3000,
  },
});
