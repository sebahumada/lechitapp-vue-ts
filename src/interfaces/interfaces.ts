

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