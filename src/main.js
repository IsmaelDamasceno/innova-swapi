import { createApp } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import App from './App.vue';
import Home from './components/Home.vue';
import Character from './components/Character.vue';

const routes = [
    {
        path: "/",
        component: Home
    },
    {
        path: "/character/:name",
        component: Character
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
});
const app = createApp(App);
app.use(router);
app.mount('#app');
