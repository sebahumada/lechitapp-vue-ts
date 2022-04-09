<template>
   

<div class="sticky">
    <button class="btn btn-outline-black btn-lg" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
    <i class="fas fa-bars"></i> 
    </button>
    <span class="text-center ms-1">
        
        <img src="../../../assets/lechitapp.png" alt="bebe" class="img-responsive imgBebe" >
        
    </span>
    <div class="offcanvas offcanvas-start bg-success text-white" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel" >
    <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="offcanvasExampleLabel">Lechitapp</h5>
        <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body">
        Menu
        
    </div>
    </div>

</div>  
    <router-view></router-view>

</template>


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
    max-width: 20%;    
}

</style>






