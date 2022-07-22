<template>
    <h5>Desde <span class="badge bg-success">{{fechas[0]}}</span> al <span class="badge bg-success">{{fechas[fechas.length-1]}}</span></h5>
    <br />
    <Line
            :chart-options="chartOptions"
            :chart-data="chartData"
            :chart-id="chartId"
            :dataset-id-key="datasetIdKey"
            :width="400"
            :height="200"
        />
</template>

<script lang="ts" setup>
import { Line } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js'
import { WeekRegister } from '../../../../interfaces/interfaces';
import dayjs from 'dayjs';


ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement);

const props = defineProps<{
    registers: WeekRegister[]
}>()

const fechas = Array.from(props.registers, x => dayjs(`${x.fecha}`).format('DD-MM-YYYY'));
const cantidades = Array.from(props.registers, x => x.cantidad);



const chartOptions = { responsive: true }
const chartData = {
    labels: fechas,
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