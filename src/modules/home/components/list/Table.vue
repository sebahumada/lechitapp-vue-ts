<template>



    <h2>Registros fecha <span class="badge bg-primary">{{ dateFormat }}</span></h2>
    <h3>Total <span class="badge bg-success">{{ sum }} ml</span></h3>

    <template v-if="registers.length > 0">
        <div class='table-responsive'>


            <table class="table table-secondary table-striped text-center table-hover">
                <thead class="table-borderless">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Tipo</th>
                        <th scope="col">Cantidad</th>
                        <th scope="col">Hora</th>
                        <th scope="col"><i class="fas fa-edit"></i></th>
                        <th scope="col"><i class="fas fa-trash-alt"></i></th>



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

                            <i @click="handleEdit(id)" class="fas fa-edit"></i>

                        </td>
                        <td>

                            <i @click="handleDelete(id)" class="fas fa-trash-alt"></i>
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

const router = useRouter();


const props = defineProps<{
    registers: Register[],
    date: string
}>()


const emit = defineEmits(['deleteRegister'])

const dateFormat = dayjs(props.date).format('DD-MM-YYYY');

const sum = sumBy(props.registers, 'cantidad');

const handleEdit = async (id: string): Promise<void> => {


    const registerStore = useRegisterStore();

    registerStore.setId(id);
    router.push({ name: 'edit' })


}

const handleDelete = (id: string): void => {

    emit('deleteRegister', id);
}

</script>