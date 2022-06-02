import { createApp } from 'vue';
import 'ant-design-vue/dist/antd.css';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';

const pinia = createPinia();

createApp(App).use(pinia).use(router).mount('#app');
