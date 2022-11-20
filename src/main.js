import Vue from "vue";
import App from "./App.vue";
import "./output.css";
import "flowbite";
import "tw-elements";
import router from "./router";
import store from "./store";
require("@toast-ui/editor/dist/toastui-editor.css");
Vue.config.productionTip = false;
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
