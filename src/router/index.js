import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
    { path: "/", name: "Home", component: () => import("../views/Home.vue") },
    { path: "/med", name: "med", component: () => import("../views/second.vue") },//其他的子網頁直接放在裡面
    { path: "/event", name: "event", component: () => import("../views/Event.vue") },//其他的子網頁直接放在裡面
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router