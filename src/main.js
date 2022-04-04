import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import VueApexCharts from "vue-apexcharts";
Vue.use(VueApexCharts);

Vue.component("apex-chart", VueApexCharts);

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
