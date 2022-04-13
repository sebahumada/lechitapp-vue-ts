<template>
    <div class="mb-4" v-if="props.registers.length>0">       
        <h3>{{ mensaje? mensaje:'Hoy'}}</h3>
            <Line
                :chart-options="chartOptions"
                :chart-data="chartData"
                :chart-id="chartId"
                :dataset-id-key="datasetIdKey"
                :width="400"
                :height="150"
            />
        
    </div>
</template>


<script lang="ts" setup>
import { Line } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js'
import { Register } from '../../../../interfaces/interfaces';

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement);


const props = defineProps<{
    registers: Register[],
    mensaje?:string
}>()

const horas = Array.from(props.registers, x => x.hora);
const cantidades = Array.from(props.registers, x => x.cantidad);



const chartOptions = { responsive: true }
const chartData = {
    labels: horas,
    datasets: [
        {
            label: 'ml. leche',
            backgroundColor: '#f87979',
            borderColor: '#f87979',
            data: cantidades,
            fill: true

        }
    ]
}

const chartId = 'bar-chart';
const datasetIdKey = 'label';





</script>