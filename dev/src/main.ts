import Vue from 'vue';
import App from './App.vue';

import { SButton } from '../../packages/base/button/index';
import { SInput } from '../../packages/base/input/index';
import { STextarea } from '../../packages/base/textarea/index';
import { SSelect } from '../../packages/base/select/index';
import { SOption } from '../../packages/base/option/index';
import { SCheckbox } from '../../packages/base/checkbox/index';
import { SCheckboxGroup } from '../../packages/base/checkbox-group/index';
import { SRadio } from '../../packages/base/radio/index';
import { SRadioGroup } from '../../packages/base/radio-group/index';
import { SSwitch } from '../../packages/base/switch/index';
import { STable } from '../../packages/base/table/index';
import { SBadge } from '../../packages/base/badge/index';
import { STag } from '../../packages/base/tag/index';
import { SAlert } from '../../packages/base/alert/index';
import { SDialog } from '../../packages/base/dialog/index';

Vue.use(SButton);
Vue.use(SInput);
Vue.use(STextarea);
Vue.use(SSelect);
Vue.use(SOption);
Vue.use(SCheckbox);
Vue.use(SCheckboxGroup);
Vue.use(SRadio);
Vue.use(SRadioGroup);
Vue.use(SSwitch);
Vue.use(STable);
Vue.use(SBadge);
Vue.use(STag);
Vue.use(SAlert);
Vue.use(SDialog);

new Vue({
  render: h => h(App),
}).$mount('#dev');