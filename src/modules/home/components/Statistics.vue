<template>
    <h1>Estadísticas</h1>
    <h3>Última semana</h3>

    <template v-if="isReady">
        
        <Week :registers="lastWeekRegisters" />
        <br />
        <ListWeek :registers="lastWeekRegisters"/>
    </template>
    <template v-else>
        <div class="spinner-border mt-4" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    </template>
</template>

<script lang="ts" setup>
import { onBeforeMount, ref } from 'vue';
import { getLastWeekRegisters } from '../../../firebase/querys';
import { WeekRegister } from '../../../interfaces/interfaces';
import Week from './charts/Week.vue';
import ListWeek from './list/ListWeek.vue';

const isReady = ref<boolean>(false);

const lastWeekRegisters = ref<WeekRegister[]>([]);


onBeforeMount(async()=>{

    isReady.value = false;
    lastWeekRegisters.value = await getLastWeekRegisters();
    
    isReady.value = true;
})




</script>