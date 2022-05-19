<template>
    <h1 :class="ui.darkMode?'text-black':'text-light'" class="animate__animated animate__flash animate__infinite infinite">&#9644;</h1>
     
        <hr :class="ui.darkMode?'text-black':'text-light'" />
        <div class="row align-items-start align-content-center">
            <div class="col-sm">
                <div class="card mb-3" :class="ui.darkMode?'text-black bg-dark':'text-white bg-light'">
                    <div class="card-header animate__animated animate__flash animate__infinite infinite">
                        <i class="far fa-clock animate__animated animate__flash animate__infinite infinite"></i> &#9644;
                        
                    </div>
                    <div class="card-body">
                        
                            <h2 class="card-title animate__animated animate__flash animate__infinite infinite"><strong>&#9644;</strong></h2>
                        
                        <p class="card-text animate__animated animate__flash animate__infinite infinite"> &#9644; </p>

                        <p class="card-text animate__animated animate__flash animate__infinite infinite">&#9644;</p>
                    </div>
                </div>
            </div>

            <div class="col-sm">
                <div class="card mb-3 card-reg-edit" :class="ui.darkMode?'text-black bg-dark':'text-white bg-light'">
                    <div class="card-header animate__animated animate__flash animate__infinite infinite">
                        <i class="fas fa-history animate__animated animate__flash animate__infinite infinite"></i> &#9644;
                        <i class="fas fa-edit float-end"></i>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title animate__animated animate__flash animate__infinite infinite"><strong>&#9644;</strong></h5>

                        <p class="card-text animate__animated animate__flash animate__infinite infinite">&#9644;</p>
                        <p class="card-text animate__animated animate__flash animate__infinite infinite">&#9644;</p>
                    </div>
                </div>
            </div>

            <div class="col-sm">
                <div class="card mb-3" :class="ui.darkMode?'text-black bg-dark':'text-white bg-light'">
                    <div class="card-header animate__animated animate__flash animate__infinite infinite">
                        <i class="fas fa-plus animate__animated animate__flash animate__infinite infinite"></i> &#9644;
                    </div>
                    <div class="card-body">
                        <h5 class="card-title animate__animated animate__flash animate__infinite infinite"><strong>&#9644;</strong></h5>
                        <p class="card-text animate__animated animate__flash animate__infinite infinite">&#9644;</p>
                        <p class="card-text"></p>
                    </div>
                </div>
            </div>

            <div class="col-sm">
                <div class="card mb-3" :class="ui.darkMode?'text-black bg-dark':'text-white bg-light'">
                    <div class="card-header animate__animated animate__flash animate__infinite infinite">
                        <i class="fas fa-calculator animate__animated animate__flash animate__infinite infinite"></i> &#9644;
                    </div>
                    <div class="card-body">
                        <h5 class="card-title animate__animated animate__flash animate__infinite infinite"><strong>&#9644;</strong></h5>
                        <p
                            class="card-text animate__animated animate__flash animate__infinite infinite"
                        >&#9644;</p>
                        <p class="card-text"></p>
                    </div>
                </div>
            </div>
        </div>

</template>

<script lang="ts" setup>
import { useUiStore } from '../../../store/uiStore';


const ui = useUiStore();


</script>


<style scoped>


.card, .card-header {
    border-radius: 20px;
    
}


.card-reg-edit{
    cursor: pointer;
}
</style>