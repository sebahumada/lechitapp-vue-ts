<template>



    <h2>Registros fecha <span class="badge bg-primary link-click" @click="handleAddRegister">{{ dateFormat }}</span></h2>
    <h3>Total <span class="badge bg-success">{{ sum }} ml</span></h3>

    <template v-if="registers.length > 0">
        <div class='table-responsive'>


            <table class="table text-center" :class="ui.darkMode?'table-dark text-info':'table-secondary table-hover'">
                <thead class="table-borderless">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Tipo</th>
                        <th scope="col">Cantidad</th>
                        <th scope="col">Hora</th>
                        <th scope="col"><i class="bi bi-pencil-square"></i></th>
                        <th scope="col"><i class="bi bi-trash"></i></th>



                    </tr>
                </thead>
                <tbody>

                    <tr>

                    </tr>



                    <tr v-for="({ tipo, cantidad, hora, id }, i) in registers " key={id}>
                        <th>{{ i + 1 }}</th>
                        <td>{{ tipo }}</td>
                        <td>{{ cantidad }} ml</td>
                        <td>{{ hora }}</td>
                        <td>

                            <i @click="handleEdit(id)" class="bi bi-pencil-square"></i>

                        </td>
                        <td>

                            <i @click="handleDelete(id)" class="bi bi-trash"></i>
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
import { sumBy } from 'lodash';
import { Register } from '../../../../interfaces/interfaces';
import dayjs from 'dayjs';
import { useRegisterStore } from '../../../../store/registerStore';
import { useRouter } from 'vue-router';
import { useUiStore } from '../../../../store/uiStore';


const ui = useUiStore();

const router = useRouter();


const props = defineProps<{
    registers: Register[],
    date: string
}>()

const registerStore = useRegisterStore();
const emit = defineEmits(['deleteRegister'])

const dateFormat = dayjs(props.date).format('DD-MM-YYYY');

const sum = sumBy(props.registers, 'cantidad');

const handleEdit = async (id: string): Promise<void> => {


    

    registerStore.setId(id);
    router.push({ name: 'edit' });


}

const handleAddRegister = ()=>{
    registerStore.setDateLastRegister(props.date);
    router.push({name: 'add'});
}

const handleDelete = (id: string): void => {

    emit('deleteRegister', id);
}

</script>

<style scoped>
.link-click {
    cursor: pointer;
}
</style>