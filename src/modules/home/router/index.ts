

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
        {
            path:'/edit',
            name:'edit',
            component: ()=> import('../views/EditView.vue')           

        },
        {
            path:'/list',
            name:'list',
            component: ()=> import('../views/ListView.vue')           

        },
        {
            path:'/statistics',
            name:'statistics',
            component: ()=> import('../views/StatisticsView.vue')           

        },
    ]


}