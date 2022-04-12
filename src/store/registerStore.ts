import { defineStore } from 'pinia'

export const useRegisterStore = defineStore({
  id: 'register',

  state: () => ({
    registerId: ''
  }),
  getters: {
    
  },
  actions: {
    setId(payload:string):void {
      this.registerId = payload;
    }
  }
})
