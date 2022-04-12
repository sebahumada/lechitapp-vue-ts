<template>
    <div class="container">
        <template v-if="isReady">
            <template v-if="!isLogged">
                <button class='btn btn-primary' @click="signInWithGoogle"><i class="fab fa-google"></i> Ingresar con Google</button>
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



</script>

