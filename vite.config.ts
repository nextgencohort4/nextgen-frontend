import path from "path";
import react from "@vitejs/plugin-react";
import {defineConfig} from "vite";

export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            "/api": {
                target: "https://nextgen-shoes-backend.vercel.app",
                changeOrigin: true,
                secure: false,
                ws: true,
            },
        }
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
});
