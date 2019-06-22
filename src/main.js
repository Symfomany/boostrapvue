import Vue from "vue";
import "./plugins/vuetify";

import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueFuse from "vue-fuse";
import VueVirtualScroller from "vue-virtual-scroller";

Vue.config.productionTip = false;
Vue.use(VueFuse);
Vue.use(VueVirtualScroller);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
