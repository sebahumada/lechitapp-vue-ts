import { onAuthStateChanged } from "@firebase/auth";
import { RouteLocationNormalized } from "vue-router";
import { auth } from "../firebase";


const isAuthenticatedGuard = async(to: RouteLocationNormalized, from: RouteLocationNormalized, next: Function) =>{

    const usuario = await getCurrentUser();

    if(!usuario){
        next({ name: 'login'});
    } else{
        next(); 
    }    
    
}


const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = onAuthStateChanged(auth,user => {
            unsubscribe();
            resolve(user);
        }, reject);
    })
};



export default isAuthenticatedGuard;