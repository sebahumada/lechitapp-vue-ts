

export interface FirebaseConfig {

    apiKey:string;
    authDomain:string;
    projectId:string;
    storageBucket:string;
    messagingSenderId:string;
    appId:string;
}

export interface Register {
    cantidad:number;
    fecha: string;
    hora: string;
    nocturno: boolean;
    tipo: string;
    id:string;
}

export interface Formulario {
    cantidad:number;
    fecha: string;
    hora: string;
    nocturno: boolean;
    tipo: string;    
}

export interface CountDown {

    mensaje:string;
    minutos:number;

}

export interface WeekRegister {
    fecha:string;
    cantidad:number;
}