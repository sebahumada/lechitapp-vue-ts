
<template>

    <template v-if="isReady">
        <h1>Resumen</h1>
                <hr />
                <div class="row align-items-start align-content-center">
                <div class="col-sm">
                <div class="card text-white bg-danger mb-3" >
                    <div class="card-header"><i className="far fa-clock"></i> Próxima Leche</div>
                    <div class="card-body">
                        <template v-if="minutes>=0">
                            <h4 class="card-title">{{ message }}</h4>
                        </template>
                        <template v-else>
                            <h2 class="card-title">{{ message }}</h2>
                        </template>
                        <p class="card-text">{{ dateNextRegister}}</p>
            </div>
            </div>
                </div>
                <div class="col-sm">
                <div class="card text-white bg-primary mb-3" >
            <div class="card-header"><i class="fas fa-history"></i> Última Leche</div>
            <div class="card-body">
                <h5 class="card-title">{{ lastDate}} </h5>
               
                <p class="card-text">{{ lastRegister?.cantidad}} ml</p>
                <p class="card-text">{{ lastRegister?.tipo}}</p>
            </div>
            </div>
                </div>
                <div class="col-sm">
                <div class="card text-black bg-warning mb-3" >
            <div class="card-header"><i class="fas fa-plus"></i> Cantidad hoy</div>
            <div class="card-body">
                <h5 class="card-title">{{ todayCount[1] }} ml.</h5>
                <p class="card-text">{{ todayCount[0] }} mamaderas</p>
            </div>
            </div>
                </div>

                <div class="col-sm">
                <div class="card text-white bg-success mb-3" >
            <div class="card-header"><i class="fas fa-calculator"></i> Comparación ayer</div>
            <div class="card-body">
                <h5 class="card-title">{{ todayCount[1] - yesterdayCount[1]  }} ml.</h5>
                <p class="card-text"></p>
            </div>
            </div>
                </div>
            </div>

    </template>

    <template v-else>
        Espere...
    </template>

    

</template>


<script lang="ts" setup>
import { getLastRegister, getDayCount } from '../../../firebase/querys';
import { onBeforeMount, ref } from 'vue';
import { Register } from '../../../interfaces/interfaces';
import dayjs from 'dayjs';
import { useCuentaAtras } from '../composables/useCuentaAtras';

const lastRegister=ref<Register>();
const isReady = ref<boolean>(false);
const todayCount = ref<number[]>([]);
const yesterdayCount = ref<number[]>([]);
const minutesNextRegister = 200;//!nocturno? 140: 180;
const dateNextRegister = ref<string>('');

const lastDate = ref<string>('');

const message = ref<string>('');
const minutes = ref<number>(0);


onBeforeMount(async()=>{
    isReady.value = false;

    const today=dayjs().format('YYYY-MM-DD');
    const yesterday = dayjs().add(-1,'day') .format('YYYY-MM-DD');

    lastRegister.value = await getLastRegister();
    todayCount.value = await getDayCount(today);
    yesterdayCount.value = await getDayCount(yesterday);

    

    lastDate.value = dayjs(`${lastRegister.value.fecha} ${lastRegister.value.hora}`).format('DD-MM-YYYY HH:mm');

    dateNextRegister.value = dayjs(`${lastRegister.value.fecha} ${lastRegister.value.hora}`).add(minutesNextRegister,'minutes').format('DD-MM-YYYY HH:mm');

    const {mensaje, minutos}=useCuentaAtras(dateNextRegister.value);

    message.value = mensaje;
    minutes.value = minutos;

    isReady.value = true;
});

setInterval(()=>{
    const {mensaje, minutos}=useCuentaAtras(dateNextRegister.value);

    message.value = mensaje;
    minutes.value = minutos;
},1000);





</script>