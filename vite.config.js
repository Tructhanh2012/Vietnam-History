import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // ckeditor5({ theme: require.resolve("@ckeditor/ckeditor5-theme-lark") }),
  ],
  server: {
    port: 3000,
  },
});
