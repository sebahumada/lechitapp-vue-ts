<template>
    <template v-if="isReady">
        <h1>Configuración</h1>
        <br />
        <div class="table-responsive">
            <table class="table table-secondary table-striped text-center table-hover">
                <thead class="table-borderless">
                    <tr>
                        <th scope="col">Minutos Próximo Registro</th>
                        <th scope="col">Actualizado a</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{{ config?.minutosProximaLeche }}</td>
                        <td>{{ config?.fechaUpdate }}</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <form @submit.prevent="handleSubmit">
            <div class="form-floating mb-3">
                <select
                    name="minutosProximaLeche"
                    v-model="configForm!.minutosProximaLeche"
                    value
                    id="flTipo"
                    class="form-select"
                >
                    <option value="180">180 min. (3h)</option>
                    <option value="210">210 min. (3h:30m)</option>
                    <option value="240">240 min. (4h)</option>
                </select>
                <label for="flTipo">Selecciona minutos</label>
            </div>

            <button type="submit" class="btn btn-success mt-2">
                <i class="fas fa-save"></i>
                Editar
            </button>
        </form>
    </template>
    <template v-else>
        <div class="spinner-border mt-4" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    </template>
</template>


<script lang="ts" setup>
import dayjs from "dayjs";
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import { onBeforeMount, ref } from "vue";
import { getConfig, updateConfig } from "../../../firebase/querys";
import { Config, ConfigForm } from "../../../interfaces/interfaces";
import { useRouter } from "vue-router";

const config = ref<Config>({ fechaUpdate: '', minutosProximaLeche: 0 });
const configForm = ref<ConfigForm>();
const isReady = ref<boolean>(false);

onBeforeMount(async () => {

    isReady.value = false;
    config.value = await getConfig();
    configForm.value = {
        fechaUpdate: config.value.fechaUpdate,
        minutosProximaLeche: String(config.value.minutosProximaLeche)
    }
    isReady.value = true;

})
const router = useRouter();

const handleSubmit = async () => {

    config.value!.fechaUpdate = dayjs().format('DD-MM-YYYY HH:mm');
    config.value!.minutosProximaLeche = Number(configForm.value!.minutosProximaLeche);

    Swal.fire({
        title: 'Espere',
        showDenyButton: false,
        showCancelButton: false,
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading()
        }
    });
    const resp = await updateConfig(config.value);

    if (resp) {
        Swal.fire('Registro editado');
        router.push({ name:'principal' })

    } else {
        Swal.fire('Registro no se pudo editar', '', 'error');
    }


}


</script>