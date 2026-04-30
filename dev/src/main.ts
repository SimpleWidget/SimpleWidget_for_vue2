import Vue from 'vue';
import App from './App.vue';

import { SButton } from '../../packages/base/button/index';
import { SSelect } from '../../packages/base/select/index';
import { SOption } from '../../packages/base/option/index';
import { STable } from '../../packages/base/table/index';
import { SBadge } from '../../packages/base/badge/index';
import { STag } from '../../packages/base/tag/index';

Vue.use(SButton);
Vue.use(SSelect);
Vue.use(SOption);
Vue.use(STable);
Vue.use(SBadge);
Vue.use(STag);

new Vue({
  render: h => h(App),
}).$mount('#dev');