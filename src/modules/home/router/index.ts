

export default {

    name:'home',
    component: ()=> import('../layouts/HomeLayout.vue'),
    children: [
        {
            path:'/',
            name:'principal',
            component: ()=> import('../views/HomeView.vue'),
            

        }
    ]


}