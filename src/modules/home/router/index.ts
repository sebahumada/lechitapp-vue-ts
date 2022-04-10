

export default {

    name:'home',
    component: ()=> import('../layouts/HomeLayout.vue'),
    children: [
        {
            path:'/',
            name:'principal',
            component: ()=> import('../views/HomeView.vue')           

        },
        {
            path:'/add',
            name:'add',
            component: ()=> import('../views/AddView.vue')           

        },
    ]


}