<template>
    <h1>Listado</h1>

    <div class="form-floating mb-3">

        <input type="date" name="fechaQ" v-model="dateQuery" :max="today" class="form-control float-end"
            :class="ui.darkMode ? 'bg-black text-info' : ''" />
        <label for="flFecha">Ingresa Fecha</label>

    </div>

    

    <template v-if="isReady">
        <Table :registers="registers" :date="dateQuery" @deleteRegister="handleDelete($event)" />
        <div>
            <Today :registers="registers" mensaje="Gráfico" />

        </div>
    </template>
    <template v-else>
        <div className="spinner-border mt-4" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    </template>

</template>

<script lang="ts" setup>
import Table from './Table.vue';
import dayjs from 'dayjs';
import { ref, watch, onBeforeMount } from 'vue';
import { Register } from '../../../../interfaces/interfaces';
import { getDayRegisters, deleteRegister } from '../../../../firebase/querys';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import Today from '../charts/Today.vue';
import { useUiStore } from '../../../../store/uiStore';
import { useRegisterStore } from '../../../../store/registerStore';


const ui = useUiStore();
const dateQuery = ref<string>(dayjs().format('YYYY-MM-DD'));
const today = dayjs().format('YYYY-MM-DD');
const isReady = ref<boolean>(false);
const registers = ref<Register[]>([]);
const registerStore = useRegisterStore();
const idDelete = ref<string>('');


onBeforeMount(async () => {

    isReady.value = false;
    
    let mountDate = registerStore.dateLastRegister.length>0?registerStore.dateLastRegister:today;   
    dateQuery.value = mountDate;
    
    registers.value = await getDayRegisters(mountDate);
    registerStore.setDateLastRegister('');
    isReady.value = true;

})

const handleDelete = async (id: string) => {

    Swal.fire({
        title: 'Está seguro?',
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: 'Si',
        cancelButtonText: 'Cancelar',
        allowOutsideClick: false

    }).then((result) => {

        if (result.isConfirmed) {

            deleteRegister(id).then((resp) => {

                if (resp) {
                    Swal.fire('Registro eliminado');
                    idDelete.value = id;
                } else {
                    Swal.fire('Registro no se pudo eliminar', '', 'error');
                }
            })
        }
    });


}




watch(async () => dateQuery.value,
    async (val, prev) => {
        isReady.value = false;
        const dateChange = await val;
        if (dateChange) {

            registers.value = await getDayRegisters(await val);
        } else {
            dateQuery.value = await prev;
        }
        isReady.value = true;
    }
);

watch(async () => idDelete.value,
    async (val) => {
        isReady.value = false;



        registers.value = await getDayRegisters(await dateQuery.value);
        isReady.value = true;
    });



</script>