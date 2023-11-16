// vite.config.ts
import { defineConfig } from "file:///C:/Users/cxw/Desktop/%E4%B8%AA%E4%BA%BA/cxwii-admin-da/node_modules/.pnpm/vite@4.1.4_awukbdnbbu5ha4vqpadl73lpsy/node_modules/vite/dist/node/index.js";
import vue from "file:///C:/Users/cxw/Desktop/%E4%B8%AA%E4%BA%BA/cxwii-admin-da/node_modules/.pnpm/@vitejs+plugin-vue@4.0.0_vite@4.1.4+vue@3.2.47/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import path from "path";
import VueJsx from "file:///C:/Users/cxw/Desktop/%E4%B8%AA%E4%BA%BA/cxwii-admin-da/node_modules/.pnpm/@vitejs+plugin-vue-jsx@3.0.1_vite@4.1.4+vue@3.2.47/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
import { createSvgIconsPlugin } from "file:///C:/Users/cxw/Desktop/%E4%B8%AA%E4%BA%BA/cxwii-admin-da/node_modules/.pnpm/vite-plugin-svg-icons@2.0.1_vite@4.1.4/node_modules/vite-plugin-svg-icons/dist/index.mjs";
import EslintPlugin from "file:///C:/Users/cxw/Desktop/%E4%B8%AA%E4%BA%BA/cxwii-admin-da/node_modules/.pnpm/vite-plugin-eslint@1.8.1_eslint@8.46.0+vite@4.1.4/node_modules/vite-plugin-eslint/dist/index.mjs";
import VueI18nPlugin from "file:///C:/Users/cxw/Desktop/%E4%B8%AA%E4%BA%BA/cxwii-admin-da/node_modules/.pnpm/@intlify+unplugin-vue-i18n@0.12.2_vue-i18n@9.2.2/node_modules/@intlify/unplugin-vue-i18n/lib/vite.mjs";
var __vite_injected_original_dirname = "C:\\Users\\cxw\\Desktop\\\u4E2A\u4EBA\\cxwii-admin-da";
var vite_config_default = defineConfig({
  // 改变路径
  base: "./",
  plugins: [
    vue(),
    // tsx语法支持
    VueJsx(),
    // svg支持
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), "src/assets/svgs")],
      symbolId: "icon-[dir]-[name]"
    }),
    // i18n控制台警告解决
    // 文档https://github.com/intlify/bundle-tools/tree/main/packages/unplugin-vue-i18n#intlifyunplugin-vue-i18n
    VueI18nPlugin({
      runtimeOnly: true,
      compositionOnly: true,
      include: [path.resolve(__vite_injected_original_dirname, "src/locales/**")]
    }),
    // eslint
    EslintPlugin({
      cache: false,
      include: ["src/**/*.vue", "src/**/*.ts", "src/**/*.tsx"]
      // 检查的文件
    })
  ],
  resolve: {
    // 路径别名
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "src"),
      "@_public": path.resolve(__vite_injected_original_dirname, "public")
    }
  },
  server: {
    // 自动打开浏览器
    open: false,
    // 端口
    port: 9527,
    // 代理
    proxy: {
      "/api": {
        target: "http://127.0.0.1:9528",
        changeOrigin: true,
        rewrite: (path2) => path2.replace(/^\/api/, "")
      }
    }
  },
  // three模型的一些文件后缀名
  assetsInclude: ["**/*.glb", "**/*.gltf"]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxjeHdcXFxcRGVza3RvcFxcXFxcdTRFMkFcdTRFQkFcXFxcY3h3aWktYWRtaW4tZGFcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXGN4d1xcXFxEZXNrdG9wXFxcXFx1NEUyQVx1NEVCQVxcXFxjeHdpaS1hZG1pbi1kYVxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvY3h3L0Rlc2t0b3AvJUU0JUI4JUFBJUU0JUJBJUJBL2N4d2lpLWFkbWluLWRhL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcclxuaW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnXHJcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXHJcbmltcG9ydCBWdWVKc3ggZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlLWpzeCdcclxuaW1wb3J0IHsgY3JlYXRlU3ZnSWNvbnNQbHVnaW4gfSBmcm9tICd2aXRlLXBsdWdpbi1zdmctaWNvbnMnXHJcbmltcG9ydCBFc2xpbnRQbHVnaW4gZnJvbSAndml0ZS1wbHVnaW4tZXNsaW50J1xyXG5pbXBvcnQgVnVlSTE4blBsdWdpbiBmcm9tICdAaW50bGlmeS91bnBsdWdpbi12dWUtaTE4bi92aXRlJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuICAvLyBcdTY1MzlcdTUzRDhcdThERUZcdTVGODRcclxuICBiYXNlOiBcIi4vXCIsXHJcbiAgcGx1Z2luczogW1xyXG4gICAgdnVlKCksXHJcbiAgICAvLyB0c3hcdThCRURcdTZDRDVcdTY1MkZcdTYzMDFcclxuICAgIFZ1ZUpzeCgpLFxyXG4gICAgLy8gc3ZnXHU2NTJGXHU2MzAxXHJcbiAgICBjcmVhdGVTdmdJY29uc1BsdWdpbih7XHJcbiAgICAgIGljb25EaXJzOiBbcGF0aC5yZXNvbHZlKHByb2Nlc3MuY3dkKCksICdzcmMvYXNzZXRzL3N2Z3MnKV0sXHJcbiAgICAgIHN5bWJvbElkOiAnaWNvbi1bZGlyXS1bbmFtZV0nXHJcbiAgICB9KSxcclxuICAgIC8vIGkxOG5cdTYzQTdcdTUyMzZcdTUzRjBcdThCNjZcdTU0NEFcdTg5RTNcdTUxQjNcclxuICAgIC8vIFx1NjU4N1x1Njg2M2h0dHBzOi8vZ2l0aHViLmNvbS9pbnRsaWZ5L2J1bmRsZS10b29scy90cmVlL21haW4vcGFja2FnZXMvdW5wbHVnaW4tdnVlLWkxOG4jaW50bGlmeXVucGx1Z2luLXZ1ZS1pMThuXHJcbiAgICBWdWVJMThuUGx1Z2luKHtcclxuICAgICAgcnVudGltZU9ubHk6IHRydWUsXHJcbiAgICAgIGNvbXBvc2l0aW9uT25seTogdHJ1ZSxcclxuICAgICAgaW5jbHVkZTogW3BhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMvbG9jYWxlcy8qKicpXVxyXG4gICAgfSksXHJcbiAgICAvLyBlc2xpbnRcclxuICAgIEVzbGludFBsdWdpbih7XHJcbiAgICAgIGNhY2hlOiBmYWxzZSxcclxuICAgICAgaW5jbHVkZTogWydzcmMvKiovKi52dWUnLCAnc3JjLyoqLyoudHMnLCAnc3JjLyoqLyoudHN4J10gLy8gXHU2OEMwXHU2N0U1XHU3Njg0XHU2NTg3XHU0RUY2XHJcbiAgICB9KVxyXG4gIF0sXHJcbiAgcmVzb2x2ZToge1xyXG4gICAgLy8gXHU4REVGXHU1Rjg0XHU1MjJCXHU1NDBEXHJcbiAgICBhbGlhczoge1xyXG4gICAgICAnQCc6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMnKSxcclxuICAgICAgJ0BfcHVibGljJzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ3B1YmxpYycpXHJcbiAgICB9XHJcbiAgfSxcclxuICBzZXJ2ZXI6IHtcclxuICAgIC8vIFx1ODFFQVx1NTJBOFx1NjI1M1x1NUYwMFx1NkQ0Rlx1ODlDOFx1NTY2OFxyXG4gICAgb3BlbjogZmFsc2UsXHJcbiAgICAvLyBcdTdBRUZcdTUzRTNcclxuICAgIHBvcnQ6IDk1MjcsXHJcbiAgICAvLyBcdTRFRTNcdTc0MDZcclxuICAgIHByb3h5OiB7XHJcbiAgICAgICcvYXBpJzoge1xyXG4gICAgICAgIHRhcmdldDogJ2h0dHA6Ly8xMjcuMC4wLjE6OTUyOCcsXHJcbiAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLFxyXG4gICAgICAgIHJld3JpdGU6IChwYXRoKSA9PiBwYXRoLnJlcGxhY2UoL15cXC9hcGkvLCAnJylcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgLy8gdGhyZWVcdTZBMjFcdTU3OEJcdTc2ODRcdTRFMDBcdTRFOUJcdTY1ODdcdTRFRjZcdTU0MEVcdTdGMDBcdTU0MERcclxuICBhc3NldHNJbmNsdWRlOiBbJyoqLyouZ2xiJywgJyoqLyouZ2x0ZiddXHJcbn0pXHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBZ1UsU0FBUyxvQkFBb0I7QUFDN1YsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sVUFBVTtBQUNqQixPQUFPLFlBQVk7QUFDbkIsU0FBUyw0QkFBNEI7QUFDckMsT0FBTyxrQkFBa0I7QUFDekIsT0FBTyxtQkFBbUI7QUFOMUIsSUFBTSxtQ0FBbUM7QUFRekMsSUFBTyxzQkFBUSxhQUFhO0FBQUE7QUFBQSxFQUUxQixNQUFNO0FBQUEsRUFDTixTQUFTO0FBQUEsSUFDUCxJQUFJO0FBQUE7QUFBQSxJQUVKLE9BQU87QUFBQTtBQUFBLElBRVAscUJBQXFCO0FBQUEsTUFDbkIsVUFBVSxDQUFDLEtBQUssUUFBUSxRQUFRLElBQUksR0FBRyxpQkFBaUIsQ0FBQztBQUFBLE1BQ3pELFVBQVU7QUFBQSxJQUNaLENBQUM7QUFBQTtBQUFBO0FBQUEsSUFHRCxjQUFjO0FBQUEsTUFDWixhQUFhO0FBQUEsTUFDYixpQkFBaUI7QUFBQSxNQUNqQixTQUFTLENBQUMsS0FBSyxRQUFRLGtDQUFXLGdCQUFnQixDQUFDO0FBQUEsSUFDckQsQ0FBQztBQUFBO0FBQUEsSUFFRCxhQUFhO0FBQUEsTUFDWCxPQUFPO0FBQUEsTUFDUCxTQUFTLENBQUMsZ0JBQWdCLGVBQWUsY0FBYztBQUFBO0FBQUEsSUFDekQsQ0FBQztBQUFBLEVBQ0g7QUFBQSxFQUNBLFNBQVM7QUFBQTtBQUFBLElBRVAsT0FBTztBQUFBLE1BQ0wsS0FBSyxLQUFLLFFBQVEsa0NBQVcsS0FBSztBQUFBLE1BQ2xDLFlBQVksS0FBSyxRQUFRLGtDQUFXLFFBQVE7QUFBQSxJQUM5QztBQUFBLEVBQ0Y7QUFBQSxFQUNBLFFBQVE7QUFBQTtBQUFBLElBRU4sTUFBTTtBQUFBO0FBQUEsSUFFTixNQUFNO0FBQUE7QUFBQSxJQUVOLE9BQU87QUFBQSxNQUNMLFFBQVE7QUFBQSxRQUNOLFFBQVE7QUFBQSxRQUNSLGNBQWM7QUFBQSxRQUNkLFNBQVMsQ0FBQ0EsVUFBU0EsTUFBSyxRQUFRLFVBQVUsRUFBRTtBQUFBLE1BQzlDO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQTtBQUFBLEVBRUEsZUFBZSxDQUFDLFlBQVksV0FBVztBQUN6QyxDQUFDOyIsCiAgIm5hbWVzIjogWyJwYXRoIl0KfQo=
