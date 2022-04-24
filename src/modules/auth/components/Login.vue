<template>
    <div class="container mt-4" :class="ui.darkMode?'bg-dark text-info':'bg-light text-dark'">
        <template v-if="isReady">
            <template v-if="!isLogged">

                <p class="text-center align-content-center me-4">
                    
                    <img src="../../../assets/lechitapp.svg" alt="bebe" class="img-responsive imgBebe" >
                    <div class="mt-5">
                        <button class='btn' :class="ui.darkMode?'btn-outline-success':'btn-success text-light'" @click="signInWithGoogle"><i class="fab fa-google"></i> Ingresar con Google</button>

                    </div>

                    <div class="m-3 fixed-bottom">
               
                    <template v-if="!ui.darkMode">
                        <span @click="handleDarkMode" class="text-success"><i class="fas fa-moon"></i> Modo Oscuro</span>
                        

                    </template>
                    <template v-else>
                        <span @click="handleDarkMode" class="text-success"><i class="fas fa-sun"></i> Modo Claro</span>
                            
                    </template>
               
                
            </div>
                    
                    </p>

            </template>
            <template v-else>
                <div className="spinner-border mt-4" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </template>
        </template>

        <template v-else>
            <span>Cargando...</span>
        </template>
        
    </div>
</template>


<script lang="ts" setup>

import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from '@firebase/auth';
import { onBeforeMount, ref } from 'vue';
import { auth } from '../../../firebase';
import { useRouter } from 'vue-router';
import { useUiStore } from '../../../store/uiStore';




const ui = useUiStore();

const handleDarkMode = ()=>{
    ui.setDarkMode(!ui.darkMode);
    if(ui.darkMode){

        document.querySelector('body')!.className ='container bg-dark text-info'
    } else {
        document.querySelector('body')!.className ='container bg-light'

    }
}

onBeforeMount(()=>{
    onAuthStateChanged(auth, user => {
        isReady.value = false;
        if(!user){
            isLogged.value = false;
            isReady.value = true;
        } else{
            isLogged.value = true;

            userProfile.value = {
            displayName: user.displayName,
            email: user.email,
            photoUrl: user.photoURL
        }

        isReady.value = true;

        
        }
    
    });

    
})

const isLogged = ref(false);
const isReady = ref(false);
const userProfile = ref({});
const router = useRouter();
const seconds = ref(2);

setInterval(()=>{
if(isReady.value && seconds.value===0){
router.push({ name:'principal' })
} else {
    seconds.value = seconds.value - 1;
}

}, 1000)


const provider = new GoogleAuthProvider();

const signInWithGoogle = ():void=>{

    console.log('Hola Mundo');

    signInWithPopup(auth,provider)
    .then( ({user}) => {
        
        // console.log(user);
        isLogged.value = true;
        
        userProfile.value = {
            displayName: user.displayName,
            email: user.email,
            photoUrl: user.photoURL
        }
        
    }).catch( (error) =>{
      console.log(error)
    });
    

}



</script>

<style scoped>

span{
    cursor: pointer;
}

</style>

