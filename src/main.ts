import { createApp } from 'vue'
import { createPinia } from 'pinia';
import App from './App.vue'
import "bootstrap/dist/js/bootstrap.js";
import "bootstrap/dist/js/bootstrap.bundle.js";
import './styles/styles.scss'
import router from './router';

createApp(App)
.use(createPinia())
.use(router)
.mount('#app')
