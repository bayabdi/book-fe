<template>
    <form @submit.prevent="login">
      <label for="email">Username:</label>
      <input type="email" id="email" v-model="credentials.email" /><br>
  
      <label for="password">Password:</label>
      <input type="password" id="password" v-model="credentials.password" /><br>
  
      <button type="submit">Login</button>
    </form>
</template>
  
<script>
export default {
    data() {
        return {
        credentials: {
            email: '',
            password: '',
        },
        };
    },
    methods: {
        async login() {
        try {
            // Call the login action from Vuex
            await this.$store.dispatch('login', this.credentials);

            // Optionally, you can redirect the user or perform other actions after successful login
        } catch (error) {
            // Handle login error
            // alert('Login error:', error);
        }
        },
    },
};
</script>
  