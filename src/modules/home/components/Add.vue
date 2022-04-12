<template>
   
        <h1>Ingresar</h1>
        <Form :form-entry="form" :tipo="tipo" @submit-form="ingresar($event)"/>
    
    
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import dayjs from 'dayjs';
import { Formulario } from '../../../interfaces/interfaces';
import Form from './form/Form.vue';
import { insertRegister } from '../../../firebase/querys';

const router = useRouter();


const form:Formulario =  {
        cantidad: 120,
        fecha:dayjs().format('YYYY-MM-DD'),
        hora:dayjs().format('HH:mm'),
        tipo:'Relleno',
        nocturno: false    
    };
const tipo ='Ingresar';



const ingresar = async(props:Formulario)=>{

    Swal.fire({
        title:'Espere',
        showDenyButton: false,
        showCancelButton: false,
        allowOutsideClick: false,
        didOpen: ()=>{
            Swal.showLoading()
        }
    })
    
    const resp = await insertRegister(props);

    if(resp){
        Swal.fire({
                title: 'Registro ingresado correctamente!',
                showDenyButton: false,
                showCancelButton: false,
                confirmButtonText: 'OK',
                denyButtonText: `Cancelar`,
                allowOutsideClick: false
              }).then((result) => {
                
                if (result.isConfirmed) {
                    router.push({ name:'list' })
                } 
              });
    }
    
    
}


</script>