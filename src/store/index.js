import { createStore } from 'vuex';
import axios from '@/plugins/axios';
import router from '@/router/index';

const store = createStore({
  state: {
    user: null,
    token: null,
    appointments: []
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },
    SET_TOKEN(state, token) {
      if (token === null) {
        localStorage.removeItem('token');
        window.location.reload();
      }
      else { localStorage.setItem('token', token) }
      state.token = token
    },
    SET_APPOINTMENTS(state, appointments){
      state.appointments = appointments
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

        axios.post('/user/get_current_user', {}, { headers })
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
    // eslint-disable-next-line no-unused-vars
    async book({ commit }, appointment) {
      try {
        const token = localStorage.getItem('token')
        
        const headers = {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json', // Adjust the content type as needed
        };

        axios.post('/appointment/add', appointment, { headers })
          .then(response => {
            console.log(response)
            window.location.reload();
          })
          .catch(error => {
            alert(error)
            // commit('SET_TOKEN', null)
          });
      }
      catch (error)
      {
        console.log(error)
      }
    },
    async myBookList({ commit }) {
      try {
        const token = localStorage.getItem('token')
        
        const headers = {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json', // Adjust the content type as needed
        };

        axios.get('/appointment/list', { headers })
          .then(response => {
            commit('SET_APPOINTMENTS', response.data)
          })
          .catch(error => {
            alert(error)
            // commit('SET_TOKEN', null)
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
