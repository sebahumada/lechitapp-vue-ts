import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
// import { createRouter, createWebHashHistory,  RouteRecordRaw } from 'vue-router';
import isAuthenticatedGuard from './auth-guard';
import authRouter from '../modules/auth/router'
import homeRouter from '../modules/home/router'


const routes: RouteRecordRaw[] = [
    {
        path:'/auth',
        ...authRouter
    },
    {
        path:'/',
        beforeEnter: [isAuthenticatedGuard],
        ...homeRouter
    }
]

const router = createRouter({ 
    history: createWebHistory(),
    routes
});
// const router = createRouter({ 
//     history: createWebHashHistory(),
//     routes
// });

export default router;