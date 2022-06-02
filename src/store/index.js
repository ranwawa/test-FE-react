import { defineStore } from 'pinia';

export const useUser = defineStore('user', {
  state: () => {
    const name = localStorage.getItem('name');
    const password = localStorage.getItem('password');

    return {
      name,
      password,
    };
  },
});

export default useUser;
