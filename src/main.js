import Vue from 'vue';

import { createProvider } from './vue-apollo';
import App from './App.vue';

Vue.config.productionTip = false;

new Vue({
  apolloProvider: createProvider(),
  render: h => h(App),
}).$mount(`#app`);
