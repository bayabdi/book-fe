import { createStore } from 'vuex';
import axios from '@/plugins/axios';
import router from '@/router/index';

const store = createStore({
  state: {
    user: null,
    token: null
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },
    SET_TOKEN(state, token) {
      state.token = token
      localStorage.setItem('token', token)
    }
    // Add other mutations as needed
  },
  actions: {
    async login({ commit }, credentials) {
      axios.post('/user/login', credentials)
        .then(response => {
          commit('SET_TOKEN', response.data);
          router.push('/dashboard')
        })
        .catch(error => {
          // Handle error
          alert(error);
        });
    },
    async getCurrentUser({ commit }, ) {
      try {
        const token = localStorage.getItem('token')
        
        const headers = {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json', // Adjust the content type as needed
        };

        axios.post('/user/test', {}, { headers })
          .then(response => {
            commit('SET_USER', response.data)
          })
          .catch(error => {
            console.error('Axios error:', error);
            commit('SET_TOKEN', null)
            
          });
      }
      catch (error)
      {
        console.log(error)
      }
    },
  },
});

export default store;
