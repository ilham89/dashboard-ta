import { createApp } from "vue";
import App from "./App.vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "element-plus/theme-chalk/dark/css-vars.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import "./style.css";
import router from "./router";
import { VueQueryPlugin } from "vue-query";

// auto import components
const requireComponent = require.context("@/components", false, /\.vue$/);

const app = createApp(App);

requireComponent.keys().forEach((fileName) => {
  const componentConfig = requireComponent(fileName);

  app.component(
    componentConfig.default.name,
    componentConfig.default || componentConfig
  );
});

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

const vueQueryPluginOptions = {
  queryClientConfig: {
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchInterval: false,
        staleTime: 100000,
      },
    },
  },
};

app
  .use(router)
  .use(VueQueryPlugin, vueQueryPluginOptions)
  .use(ElementPlus)
  .mount("#app");
