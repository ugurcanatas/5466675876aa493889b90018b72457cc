import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import FixedToolbar from "./components/FixedToolbar";
import Sidebar from "./components/Sidebar";
import PaginationButtons from "./components/PaginationButtons";
import vuetify from "./plugins/vuetify";

Vue.config.productionTip = false;

Vue.component("fixed-toolbar", FixedToolbar);
Vue.component("sidebar", Sidebar);
Vue.component("pagination-buttons", PaginationButtons);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
