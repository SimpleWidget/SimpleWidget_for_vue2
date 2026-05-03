import SConfirmBox from './confirm-box.vue';

SConfirmBox.install = function (app) {
  app.component('SConfirmBox', SConfirmBox);
};

export { SConfirmBox };