import { collection, query, orderBy as ordby, limit, getDocs, where, addDoc, doc, getDoc, updateDoc, deleteDoc } from "@firebase/firestore";
import { orderBy, sumBy } from "lodash";
import { db } from ".";
import { Register, Formulario } from '../interfaces/interfaces';



export const getLastRegister = async():Promise<Register>=>{

    let result={} as Register;

    const lecheCollectionRef = collection(db,'gaspiLeche');        
    const q = query(lecheCollectionRef,  ordby('fecha','desc'), ordby('hora','desc') ,limit(1));
                    
    const data = await getDocs(q);

    const resultAux = data.docs.map( (doc) => ({ id: doc.id, ...doc.data() }));

    if( resultAux && resultAux.length>0){

        
        result = (resultAux[0] as Register);
    }

    return result;
}


export const insertRegister = async(register:Formulario):Promise<boolean> =>{

    let resp=false;
    try {
        const lecheCollectionRef = collection(db,'gaspiLeche');

        await addDoc(lecheCollectionRef, register );
        resp=true;

    } catch (error) {
        console.error(error);
    }

    return resp;

}


export const editRegister = async(id:string, register:Formulario):Promise<boolean> =>{

    let resp = false;

    try {
        
        const docRef = doc(db,'gaspiLeche',id);
        await updateDoc(docRef, {
            ...register
        });

        resp = true;

    } catch (error) {
        console.error(error);
        
    }


    return resp;

}

export const deleteRegister = async(id:string):Promise<boolean> => {

    let resp = false;

    try {
        
        const userDoc = doc(db,'gaspiLeche', id);
        await deleteDoc(userDoc);

        resp = true;

    } catch (error) {
        console.error(error);
    }

    return resp;

}

export const getRegisterById = async(id:string):Promise<Register> => {

    const docRef = doc(db,'gaspiLeche',id);
    const dataResp=await getDoc(docRef);

    const registerAux = {
        id: dataResp.id,
        ...dataResp.data()
    }

    const register = registerAux as Register;

    return register;
    
}

export const getDayRegisters = async(day:string):Promise<Register[]> =>{

    let result:Register[]=[];
    const lecheCollectionRef = collection(db,'gaspiLeche');
                    
    const q = query(lecheCollectionRef, where('fecha','==',day));
    
    const data = await getDocs(q);

    const resultado = data.docs.map( (doc) => ({ id: doc.id, ...doc.data() }));
    if(resultado && resultado.length>0){

        const orden = orderBy(resultado,['hora'],['asc']); 
        result = orden as Register[];
    }

    return result;

}

export const getDayCount = async(day:string):Promise<number[]> =>{

    let count:number[] = [0,0];

    const dayRegisters = await getDayRegisters(day);

    if(dayRegisters && dayRegisters.length>0){
        count[0] = dayRegisters.length;
        count[1] = sumBy(dayRegisters,'cantidad');
    }

    return count;

}