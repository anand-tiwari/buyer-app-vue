import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faSort,
  faEdit,
  faTrash,
  faSave,
  faCancel,
} from "@fortawesome/free-solid-svg-icons";

library.add(faSort);
library.add(faEdit);
library.add(faTrash);
library.add(faSave);
library.add(faCancel);
createApp(App)
  .use(store)
  .use(router)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");
