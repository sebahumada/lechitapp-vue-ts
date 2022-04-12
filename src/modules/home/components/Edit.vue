import { onBeforeMount } from 'vue';
<template>
    <h1>Editar</h1>
    <template v-if="isReady">
        <Form :form-entry="form!" :tipo="tipo" @submit-form="editar($event)"/>
    </template>
    <template v-else>
        <div className="spinner-border mt-4" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    </template>
</template>


<script lang="ts" setup>
import { onBeforeMount, ref } from 'vue';
import { getRegisterById, editRegister, validateRegister } from '../../../firebase/querys';
import { Formulario } from '../../../interfaces/interfaces';
import { useRegisterStore } from '../../../store/registerStore';
import Form from './form/Form.vue';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import { useRouter } from 'vue-router';


const registerStore = useRegisterStore();

const form = ref<Formulario>();
const tipo ='Editar';
const isReady = ref<boolean>(false);
const id = ref<string>('');

const router = useRouter();

onBeforeMount(async()=>{
    isReady.value = false;
    id.value = registerStore.registerId;   
    
    const register = await getRegisterById(id.value); 

    form.value = {
        cantidad: register.cantidad,
        fecha: register.fecha,
        hora: register.hora,
        nocturno: register.nocturno,
        tipo: register.tipo 
    }

    isReady.value = true;


})

const editar = async(props:Formulario)=>{
    
    if(!validateRegister(props)) {
        Swal.fire('Registro incompleto','','error');
        return;
    }

    Swal.fire({
        title:'Espere',
        showDenyButton: false,
        showCancelButton: false,
        allowOutsideClick: false,
        didOpen: ()=>{
            Swal.showLoading()
        }
    })
    
    const resp = await editRegister(id.value,props);

    if(resp){
        Swal.fire({
                title: 'Registro editado correctamente!',
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