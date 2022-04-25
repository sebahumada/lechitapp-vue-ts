<script setup lang="ts">
import { useUiStore } from './store/uiStore';
const ui = useUiStore();

let matched = window.matchMedia('(prefers-color-scheme: dark)').matches;
if(matched){
  ui.setDarkMode(true);
  document.querySelector('body')!.className ='container bg-dark text-info';
}
else{
  ui.setDarkMode(false);
  document.querySelector('body')!.className ='container bg-light';
}
	

</script>

<template>
  <router-view></router-view>
</template>

