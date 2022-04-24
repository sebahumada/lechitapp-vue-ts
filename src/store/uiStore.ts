import { defineStore } from 'pinia'


export const useUiStore = defineStore({
    id: 'ui',
    state: ()=>({
        darkMode: false
    }),
    getters: {
    
    },
    actions: {
      setDarkMode(payload:boolean):void {
        this.darkMode = payload;
      }
    }


});