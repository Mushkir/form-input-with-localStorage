import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
    base: "/form-input-with-localStorage/",

    build: {
        rollupOptions: {
            input: {
                index: resolve(__dirname, 'index.html'),
                details: resolve(__dirname, 'all_details.html'),
                main: resolve(__dirname, './assets/js/main.js'),
                utils: resolve(__dirname, './assets/js/utils.js')
            }
        },

    }
})