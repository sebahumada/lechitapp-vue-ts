import { ref } from 'vue';
import { CountDown } from '../../../interfaces/interfaces';
import { convertMinsToHrsMins, getDiferenciaFecha, getDiferenciaFechaSec } from '../helpers/fechas';



export const useCuentaAtras = (fechaProxima:string):CountDown=>{


    const cuentaAtras = ref<number>(getDiferenciaFecha(fechaProxima));
    const segundosFaltantes = ref<number>(getDiferenciaFechaSec(fechaProxima));


    
        const diferencia = getDiferenciaFecha(fechaProxima);
        const segundos = getDiferenciaFechaSec(fechaProxima);

        cuentaAtras.value = diferencia;
        segundosFaltantes.value = segundos;   
        
    return{
        mensaje: cuentaAtras.value>=0?`En ${convertMinsToHrsMins(cuentaAtras.value, segundosFaltantes.value)}`:
        cuentaAtras?
        `Atrasado por ${convertMinsToHrsMins(cuentaAtras.value*-1, segundosFaltantes.value)}`:
        `Espere...`,
        minutos: cuentaAtras.value && !isNaN(cuentaAtras.value)?cuentaAtras.value:0
    }

}