import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import vuetify from './plugins/vuetify';
import VueApexCharts from 'vue-apexcharts';
import '@babel/polyfill'

Vue.use(VueAxios, axios);
Vue.use(VueApexCharts);
Vue.component('apexchart', VueApexCharts);

axios.defaults.baseURL='http://localhost:4000'

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
