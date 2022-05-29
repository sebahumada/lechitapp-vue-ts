<template>
  <form @submit.prevent="handleSubmit">
    <div class="form-floating mb-3">
      <select name="tipo" v-model="form.tipo" value id="flTipo" class="form-select" :class="ui.darkMode?'bg-black text-info':''">
        <option value="Relleno">Relleno</option>
        <option value="Relleno">Comida</option>
        <option value="Materna">Materna</option>
      </select>
      <label for="flTipo">Ingresa Tipo</label>
    </div>

    <div class="form-floating mb-3">
      <input
        type="number"
        name="cantidad"
        id="flCantidad"
        v-model="form.cantidad"
        min="0"
        max="999"
        class="form-control"
        :class="ui.darkMode?'bg-black text-info':''"
      />
      <label for="flCantidad">Ingresa Cantidad (ml)</label>
    </div>

    <div class="form-floating mb-3">
      <input
        type="date"
        name="fecha"
        id="flFecha"
        v-model="form.fecha"
        :min="semana"
        :max="hoy"
        class="form-control"
        :class="ui.darkMode?'bg-black text-info':''"
      />
      <label for="flFecha">Ingresa Fecha</label>
    </div>

    <div class="form-floating mb-3">
      <input type="time" name="hora" id="flHora" v-model="form.hora" class="form-control" :class="ui.darkMode?'bg-black text-info':''"/>
      <label for="flHora">Ingresa Hora</label>
    </div>
    
    <button type="submit" class="mt-2 btn" :class="ui.darkMode?'btn-outline-success':'btn-success text-info'">
      <i class="bi bi-save"></i>
      {{ tipo }}
    </button>
  </form>
</template>


<script lang="ts" setup>
import dayjs from 'dayjs';
import { ref } from 'vue';
import { Formulario } from '../../../../interfaces/interfaces';
import { useUiStore } from '../../../../store/uiStore';

const ui = useUiStore();



const hoy = dayjs().format('YYYY-MM-DD');
const semana = dayjs().add(-7, 'day').format('YYYY-MM-DD')

const props = defineProps<{
  tipo: string
  formEntry: Formulario
}>()



const emit = defineEmits(['submitForm'])
const form = ref<Formulario>({
  cantidad: props.formEntry.cantidad,
  fecha: props.formEntry.fecha,
  hora: props.formEntry.hora,
  nocturno: props.formEntry.nocturno,
  tipo: props.formEntry.tipo
});

const handleSubmit = () => {
  emit('submitForm', form.value);
}

</script>