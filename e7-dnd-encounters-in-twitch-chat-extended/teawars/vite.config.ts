import { NodeModulesPolyfillPlugin } from "@esbuild-plugins/node-modules-polyfill";
import { defineConfig } from "vite";

// TODO after upgrading to socket io client v4, check whether we still need to polyfill
export default defineConfig({
    optimizeDeps: {
        esbuildOptions: {
            plugins: [NodeModulesPolyfillPlugin()],
        },
    },
    server: {
        open: true,
    },
    build: {
        outDir: "build",
    },
});
