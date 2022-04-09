import { collection, query, orderBy as ordby, limit, getDocs, where } from "@firebase/firestore";
import { orderBy, sumBy } from "lodash";
import { db } from ".";
import { Register } from "../interfaces/interfaces";



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