<template>
   

<div class="sticky">
    <button class="btn btn-outline-black btn-lg float-start btnMenu text-success" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
    <i class="fas fa-bars"></i> 
    </button>
    <!-- <span class="text-center ms-1">
        
        <img src="../../../assets/lechitapp.png" alt="bebe" class="img-responsive imgBebe" >
        
        
    </span> -->
    <p class="text-center align-content-center me-4">
        <!-- <img src="../../../assets/lechitapp.png" alt="bebe" class="img-responsive imgBebe" > -->
        <img src="../../../assets/lechitapp.svg" alt="bebe" class="img-responsive imgBebe" >
        
        
    </p>
    <div class="offcanvas offcanvas-start bg-success text-white" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel" >
    <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="offcanvasExampleLabel"><strong>MENÚ</strong></h5>
        <button type="button" class="btn-close btn-close-white text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body">
        <div class="menu-offcanvas">

            <div v-for="item in menuItems" class="mb-3">
                <template v-if="item.to">
                    <router-link :to="{name: item.to}" @click="close"><i :class="item.icon"></i> {{ item.text }}</router-link>                
                </template>
                <template v-else>
                    <router-link :to="{}" @click="handleSalir"><i :class="item.icon"></i> {{ item.text }}</router-link>
                </template>                
            </div>
        </div>
        
        
    </div>
    </div>

</div>
    <div id="contenido">
        <router-view></router-view>

    </div>

</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { auth } from '../../../firebase';
import { menuItems } from '../helpers/menu';





const router = useRouter();

const close = ()=>{
    let closeCanvas = document.querySelector('[data-bs-dismiss="offcanvas"]') as HTMLButtonElement;
    closeCanvas.click();
    
}

const handleSalir = async ()=>{
        await auth.signOut();
        
        console.log('saliendo...');

        router.push({name: 'login'});
        
        
        

    }


</script>

<style scoped>

.sticky{
    position: sticky;
    top: 0;
    z-index: 1;    
    background-color: #F8FAEF;
    border-color: #F8FAEF;
    margin-left: -10px;
}




@media only screen and (min-width: 768px) {
    .imgBebe {
    max-width: 15%;
    padding-top: 5px;
    
    margin-bottom: 5px;    
    }
}

@media only screen and (max-width: 768px) {
    .imgBebe {
    max-width: 25%;
    padding-top: 5px;
    margin-top: 5px;
    margin-bottom: 5px;

}
}


a{
    color:#ffffff;
    text-decoration: none;
}


#contenido, .offcanvas-body, .offcanvas-header{
    font-family: 'Roboto', sans-serif;
    
}

.menu-offcanvas{
    font-weight: bold;
}

.btnMenu:focus, .btnMenu:active{
outline: none !important;
   box-shadow: none;
}


</style>






