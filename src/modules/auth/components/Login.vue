<template>
    <div class="container">
        <template v-if="isReady">
            <template v-if="!isLogged">
                <button class='btn btn-primary' @click="signInWithGoogle"><i class="fab fa-google"></i> Ingresar con Google</button>
            </template>
            <template v-else>
                <span>{{ JSON.stringify(userProfile,null,3)}}</span>
                <br />
                <span>Entrando en {{ seconds }}s.</span>
                <br />
                <button class='btn btn-danger' @click="handleSalir">
                   <i class="fas fa-sign-out-alt"></i> Salir
                </button>
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
const seconds = ref(5);

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
        
        console.log(user);
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


const handleSalir = async ()=>{
        await auth.signOut();
        
        console.log('saliendo...');
        
        isLogged.value = false;
        userProfile.value = {};
        

    }
</script>

