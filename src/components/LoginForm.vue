<template>
    <form @submit.prevent="login">
        <div class="input-field">
            <label class="label" for="email">Username:</label>
            <input type="email" id="email" placeholder="Enter email..." v-model="credentials.email" /><br>
        </div>

        <div class="input-field">
            <label class="label" for="password">Password:</label>
            <input class="password" placeholder="Enter password..." type="password" id="password" v-model="credentials.password" /><br>
        </div>
        <div>
            <button class="btn" type="submit">Login</button>
        </div>
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
