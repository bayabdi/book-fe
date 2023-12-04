import { createStore } from 'vuex';
import axios from '@/plugins/axios';
import router from '@/router/index';

const store = createStore({
  state: {
    user: null,
    token: null,
    appointments: [],
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
            if(error.response != undefined && error.response.status == 400) { alert(error.response.data.detail) }
            else { alert(error) }
            // commit('SET_TOKEN', null)
          });
      }
      catch (error)
      {
        console.log(error)
      }
    },
    async myBookList({ commit }, status) {
      try {
        const token = localStorage.getItem('token')
        
        const headers = {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json', // Adjust the content type as needed
        };

        axios.get('/appointment/list?status=' + status, { headers })
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
    async pendingBookList({ commit }) {
      try {
        const token = localStorage.getItem('token')
        
        const headers = {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json', // Adjust the content type as needed
        };

        axios.get('/appointment/list_by_status?status=1', { headers })
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
    // eslint-disable-next-line no-unused-vars
    async changeStatus({ commit }, model) {
      try {
        const token = localStorage.getItem('token')
        
        const headers = {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json', // Adjust the content type as needed
        };
        console.log(model)
        axios.post('/appointment/change_status', model, { headers })
          .then(response => {
            console.log(response)
            window.location.reload();
          })
          .catch(error => {
            if(error.response != undefined && error.response.status == 400) { alert(error.response.data.detail) }
            else { alert(error) }
          });
      }
      catch (error)
      {
        console.log(error)
      }
    },
    // eslint-disable-next-line no-unused-vars
    async checkAvailability({ commit }, model) {
      try {
        const token = localStorage.getItem('token')
        
        const headers = {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json', // Adjust the content type as needed
        };
        console.log(model)
        axios.post('/appointment/check_availability', model, { headers })
          .then(response => {
            if (response.data == true)
              alert("Can fit!")
            else
              alert("No, can't fit!")
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
    
    async logout({commit}) {
      commit('SET_USER', null)
      commit('SET_TOKEN', null)
    },

    // eslint-disable-next-line no-unused-vars
    async register({ commit }, user) {
      axios.post('/user/register', user)
        .then(response => {
          console.log(response)
          window.location.reload();
        })
        .catch(error => {
          // Handle error
          alert(error);
        });
    },
  },
});

export default store;
