
<template>
    <template v-if="isReady">
        <h1>Resumen
            <span class="float-end h5 link-click" :class="ui.darkMode ? 'text-info' : 'text-dark'" @click="handleReload"><i
                    class="bi bi-arrow-repeat"></i></span>
        </h1>
        <hr />

        <div class="row align-items-start align-content-center">

            <div class="col-sm">
                <div class="card text-white bg-danger mb-3">
                    <div class="card-header">
                        <i class="bi bi-alarm"></i> Próxima Leche
                    </div>
                    <div class="card-body">
                        <template v-if="minutes >= 0">
                            <h5 class="card-title"><strong>{{ message }}</strong></h5>
                        </template>
                        <template v-else>
                            <h3 class="card-title">
                                <strong>{{ message }}</strong>
                            </h3>

                            
                            <button v-show="minutes<=-30" class="btn btn-success mb-3" @click="handleAddRegisterFast">Agregar rápido?</button>
                            
                        </template>
                        <p class="card-text">{{ dateNextRegister }}</p>

                        <p class="card-text link-click" @click="handleEditConfig"><i class="bi bi-gear-fill"></i> (cada
                            {{ convertMinutosaHoras(minutesNextRegister) }})</p>
                    </div>
                </div>
            </div>

            <div class="col-sm">
                <div class="card text-white bg-primary mb-3 link-click"
                    @click="handleLastRegisterEdit(lastRegister!.id)">
                    <div class="card-header">
                        <i class="bi bi-clock-history"></i> Última Leche
                        <i class="bi bi-pencil-square float-end"></i>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title"><strong>{{ lastDate }}</strong></h5>

                        <p class="card-text">{{ lastRegister?.cantidad }} ml</p>
                        <p class="card-text">{{ lastRegister?.tipo }}</p>
                    </div>
                </div>
            </div>

            <div class="col-sm">
                <div class="card text-black bg-warning mb-3 link-click"
                    @click="handleGoToList">
                    <div class="card-header">
                        <i class="bi bi-plus"></i> Cantidad hoy
                    </div>
                    <div class="card-body">
                        <h5 class="card-title"><strong>{{ todayCount[1] }} ml.</strong></h5>
                        <p class="card-text">{{ todayCount[0] }} mamaderas</p>
                        <p class="card-text"><br /></p>
                    </div>
                </div>
            </div>

            <div class="col-sm">
                <div class="card text-white bg-success mb-3">
                    <div class="card-header">
                        <i class="bi bi-calculator"></i> Comparación ayer
                    </div>
                    <div class="card-body">
                        <h5 class="card-title"><strong>{{ diferenciaMl(todayCount[1] - yesterdayCount[1]) }}</strong>
                        </h5>
                        <p class="card-text">{{ diferenciaMamaderas(todayCount[0] - yesterdayCount[0]) }}</p>
                        <p class="card-text"><br /></p>
                    </div>
                </div>
            </div>



        </div>

        <div>
            <Today :registers="todayRegisters" />

        </div>
    </template>

    <template v-else>
        <!-- <div class="spinner-border mt-4" role="status">
            <span class="visually-hidden">Loading...</span>
        </div> -->
        <HomeFake />
    </template>
</template>


<script lang="ts" setup>
import { getLastRegister, getDayCount, getDayRegisters, getConfig, insertRegister } from '../../../firebase/querys';
import { onBeforeMount, ref } from 'vue';
import { Register, Formulario } from '../../../interfaces/interfaces';
import dayjs from 'dayjs';
import { useCuentaAtras } from '../composables/useCuentaAtras';
import Today from './charts/Today.vue';
import { convertMinutosaHoras } from '../helpers/fechas';
import { diferenciaMamaderas, diferenciaMl } from '../helpers/textos';
import { useRegisterStore } from '../../../store/registerStore';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import HomeFake from './HomeFake.vue';
import { useUiStore } from '../../../store/uiStore';



const router = useRouter();
const ui = useUiStore();
const registerStore = useRegisterStore();
const lastRegister = ref<Register>();
const isReady = ref<boolean>(false);
const todayCount = ref<number[]>([]);
const yesterdayCount = ref<number[]>([]);
const minutesNextRegister = ref<number>(0);
const dateNextRegister = ref<string>('');
const lastDate = ref<string>('');
const message = ref<string>('');
const minutes = ref<number>(0);
const todayRegisters = ref<Register[]>([]);

const fastRegisterDate = ref<string>('');
const fastRegisterTime = ref<string>('');


onBeforeMount(async () => {
    await loadData();
});


const loadData = async () => {
    isReady.value = false;

    const today = dayjs().format('YYYY-MM-DD');
    const yesterday = dayjs().add(-1, 'day').format('YYYY-MM-DD');

    lastRegister.value = await getLastRegister();
    todayCount.value = await getDayCount(today);
    yesterdayCount.value = await getDayCount(yesterday);
    todayRegisters.value = await getDayRegisters(today);

    minutesNextRegister.value = await (await getConfig()).minutosProximaLeche;




    lastDate.value = dayjs(`${lastRegister.value.fecha} ${lastRegister.value.hora}`).format('DD-MM-YYYY HH:mm');

    dateNextRegister.value = dayjs(`${lastRegister.value.fecha} ${lastRegister.value.hora}`).add(minutesNextRegister.value, 'minutes').format('DD-MM-YYYY HH:mm');
    fastRegisterDate.value = dayjs(`${lastRegister.value.fecha} ${lastRegister.value.hora}`).add(minutesNextRegister.value, 'minutes').format('YYYY-MM-DD');
    fastRegisterTime.value = dayjs(`${lastRegister.value.fecha} ${lastRegister.value.hora}`).add(minutesNextRegister.value, 'minutes').format('HH:mm');


    const { mensaje, minutos } = useCuentaAtras(dateNextRegister.value);

    message.value = mensaje;
    minutes.value = minutos;

    isReady.value = true;
}

setInterval(() => {
    const { mensaje, minutos } = useCuentaAtras(dateNextRegister.value);
    message.value = mensaje;
    minutes.value = minutos;
}, 1000);

const handleEditConfig = () => {
    router.push({ name: 'config' });
}

const handleReload = async () => {
    await loadData();
}

const handleGoToList = ()=>{
    router.push({ name: 'list'});
}


const handleAddRegisterFast = async()=>{

    const registerForm:Formulario = {
        cantidad: 150,
        fecha: fastRegisterDate.value,
        hora:fastRegisterTime.value,
        tipo:'Relleno',
        nocturno: false
    }

    console.log(registerForm);
    

    Swal.fire({
        title:'Espere',
        showDenyButton: false,
        showCancelButton: false,
        allowOutsideClick: false,
        didOpen: ()=>{
            Swal.showLoading()
        }
    });

    const resp = await insertRegister(registerForm);

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
                    registerStore.setDateLastRegister(registerForm.fecha);
                    router.push({ name:'list' })
                } 
              });
    }

}

const handleLastRegisterEdit = (id: string | undefined) => {

    if (id) {



        Swal.fire({
            title: 'Desea editar el registro?',
            showDenyButton: false,
            showCancelButton: true,
            confirmButtonText: 'Si',
            cancelButtonText: 'Cancelar',
            allowOutsideClick: false

        }).then((result) => {

            if (result.isConfirmed) {                

                registerStore.setId(id);
                router.push({ name: 'edit' });
            }
        });

    }


}





</script>

<style scoped>
.card,
.card-header {
    border-radius: 20px;
}

.link-click {
    cursor: pointer;
}
</style>