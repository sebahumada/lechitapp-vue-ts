<template>
    <template v-if="registers.length > 0">
        <div class='table-responsive'>


            <table class="table text-center" :class="ui.darkMode?'table-dark text-info':'table-secondary table-hover'">
                <thead class="table-borderless">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Fecha</th>
                        <th scope="col">Cantidad</th>
                        <th scope="col"><i class="bi bi-pencil-square"></i></th>
                        



                    </tr>
                </thead>
                <tbody>

                    <tr>

                    </tr>



                    <tr v-for="({ fecha, cantidad }, i) in registers ">
                        <th>{{ i + 1 }}</th>
                        <td>{{ dayjs(`${fecha}`).format('DD-MM-YYYY') }}</td>
                        <td>{{ cantidad }} ml</td>  
                        <td>
                            <i @click="handleEdit(fecha)" class="bi bi-pencil-square"></i>
                        </td>
                    </tr>

                </tbody>
            </table>
        </div>
    </template>
    <template v-else>
        <span>No hay registros.</span>
    </template>
</template>


<script lang="ts" setup>
import { WeekRegister } from '../../../../interfaces/interfaces';
import { useUiStore } from '../../../../store/uiStore';
import dayjs from 'dayjs';
import { useRegisterStore } from '../../../../store/registerStore';
import { useRouter } from 'vue-router';

const ui = useUiStore();

const props = defineProps<{
    registers: WeekRegister[]
    
}>()

const registerStore = useRegisterStore();
const router = useRouter();

const handleEdit = (fecha:string)=>{
    registerStore.setDateLastRegister(fecha);
    router.push({ name:'list' });
}

</script>