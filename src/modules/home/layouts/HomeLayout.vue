<template>
   

<div class="sticky">
    <button class="btn btn-outline-black btn-lg float-start" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
    <i class="fas fa-bars"></i> 
    </button>
    <!-- <span class="text-center ms-1">
        
        <img src="../../../assets/lechitapp.png" alt="bebe" class="img-responsive imgBebe" >
        
        
    </span> -->
    <p class="text-center align-content-center"><img src="../../../assets/lechitapp.png" alt="bebe" class="img-responsive imgBebe" ></p>
    <div class="offcanvas offcanvas-start bg-success text-white" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel" >
    <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="offcanvasExampleLabel"><strong>MENÚ</strong></h5>
        <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body">
        <div class="menu-offcanvas">
            <router-link :to="{name: 'principal'}" @click="close"><i className="fas fa-home"></i> Home</router-link>
            <br />
            <br />
            <router-link :to="{name: 'add'}" @click="close"><i className="fas fa-pen"></i> Ingresar</router-link>
            <br />
            <br />
            <router-link :to="{name: 'list'}" @click="close"><i className="fas fa-list-ol"></i> Listado</router-link>
            <br />
            <br />
            <router-link :to="{name: 'statistics'}" @click="close"><i className="fas fa-chart-area"></i> Estadísticas</router-link>
            <br />
            <br />
            <router-link :to="{}"  @click="handleSalir"><i className="fas fa-sign-out-alt"></i> Salir</router-link>
            <br />
            <br />

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
    background-color: #ffffff;
    border-color: #ffffff;
    margin-left: -10px;
}

.imgBebe {
    max-width: 30%;    
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


</style>






