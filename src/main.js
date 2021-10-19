import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import FixedToolbar from "./components/FixedToolbar";
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false;

Vue.component("fixed-toolbar", FixedToolbar);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App)
}).$mount("#app");
