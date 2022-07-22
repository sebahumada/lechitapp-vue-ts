import { defineStore } from 'pinia'

export const useRegisterStore = defineStore({
  id: 'register',

  state: () => ({
    registerId: '',
    dateLastRegister: ''
  }),
  getters: {
    
  },
  actions: {
    setId(payload:string):void {
      this.registerId = payload;
    },
    setDateLastRegister(payload:string):void{
      this.dateLastRegister = payload;
    }
  }
})
