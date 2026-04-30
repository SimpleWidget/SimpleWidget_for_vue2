import SButton from './button.vue';

SButton.install = function (app) {
  app.component('SButton', SButton);
};

export { SButton };