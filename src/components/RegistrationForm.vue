<template>
    <form @submit.prevent="registerUser">
      <label>Email:</label>
      <input v-model="user.email" type="email" required />
  
      <label>Full Name:</label>
      <input v-model="user.full_name" type="text" required />
  
      <label>Phone Number:</label>
      <input v-model="user.phone_number" type="text" required />
  
      <label>Password:</label>
      <input v-model="user.password" type="password" required />
  
      <button type="submit">Register</button>
    </form>
  </template>
  
  <script>
  export default {
    data() {
      return {
        user: {
          email: '',
          full_name: '',
          phone_number: '',
          password: ''
        }
      };
    },
    methods: {
      registerUser() {
        this.$store.dispatch('register', this.user);
      }
    }
  };
  </script>
