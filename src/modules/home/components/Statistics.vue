<template>
    <h1>Estadísticas</h1>


    <label for="customRange" class="form-label">Semanas Atrás: {{ weeksBehind }}</label>
    <input type="range" v-model="weeksBehind" class="form-range" id="customRange" min="0" max="52" step="1"
        :class="ui.darkMode ? 'bg-dark text-info' : ''" />





    <template v-if="isReady">

        <template v-if="lastWeekRegisters.length > 0">
            <Week :registers="lastWeekRegisters" />
            <br />
            <ListWeek :registers="lastWeekRegisters" />

        </template>
        <template v-else>
            <div>No hay registros.</div>
        </template>
    </template>
    <template v-else>
        <div class="spinner-border mt-4" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    </template>
</template>

<script lang="ts" setup>
import { onBeforeMount, ref, watch } from 'vue';
import { getLastWeekRegisters } from '../../../firebase/querys';
import { WeekRegister } from '../../../interfaces/interfaces';
import { useUiStore } from '../../../store/uiStore';
import Week from './charts/Week.vue';
import ListWeek from './list/ListWeek.vue';
const ui = useUiStore();

const isReady = ref<boolean>(false);

const lastWeekRegisters = ref<WeekRegister[]>([]);
const weeksBehind = ref<number>(0);

onBeforeMount(async () => {

    isReady.value = false;
    lastWeekRegisters.value = await getLastWeekRegisters(weeksBehind.value);

    isReady.value = true;
})


watch(async () => weeksBehind.value,
    async (val, prev) => {
        isReady.value = false;
        const dateChange = await val;
        if (dateChange) {

            lastWeekRegisters.value = await getLastWeekRegisters(await val);
        } else {
            weeksBehind.value = await prev;
        }
        isReady.value = true;
    }
);




</script>