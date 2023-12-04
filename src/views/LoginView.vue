<template>
  <div>
    <div v-if="isLogin">
      <LoginForm/>
      <div class="create-account-button">
        <p>Do you want to create new Account?</p>
        <button @click="isLogin = false">Sign Up</button>
      </div>
    </div>
    <div v-else>
      <RegistrationForm/>
      <div class="create-account-button">
        <p>Already have an account?</p>
        <button @click="isLogin = true">Sign In</button>
      </div>
    </div>
  </div>
</template>
  
<script>
import LoginForm from '@/components/LoginForm.vue'
import RegistrationForm from '@/components/RegistrationForm.vue';

export default {
  name: 'LoginView',
  components: {
    LoginForm,
    RegistrationForm
  },
  data() {
    return {
      isLogin: true
    }
  }
}
</script>

<style>
form {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

label {
  display: block;
  margin-bottom: 8px;
}

input {
  width: 100%;
  padding: 8px;
  margin-bottom: 16px;
  box-sizing: border-box;
}

button {
  background-color: #4caf50;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

button:hover {
  background-color: #45a049;
}


.create-account-button {
  text-align: center;
  margin-top: 20px;
}

.create-account-button p {
  margin-bottom: 10px;
}

.create-account-button button {
  background-color: #3498db;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.create-account-button button:hover {
  background-color: #2980b9;
}
</style>
