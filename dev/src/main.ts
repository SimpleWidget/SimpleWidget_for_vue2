import Vue from 'vue';
import App from './App.vue';

import { SButton } from '../../packages/base/button/index';

Vue.use(SButton);

new Vue({
  render: h => h(App),
}).$mount('#dev');