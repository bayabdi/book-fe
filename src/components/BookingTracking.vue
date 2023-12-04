<template>
    <div>
        <h1>Appoinments to Approve:</h1>
        <table style="max-width: 1000px; margin-left: auto; margin-right: auto;">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Start Time</th>
                    <th>Duration</th>
                    <th>Full Name</th>
                    <th>Email</th>
                    <th>Phone Number</th>
                    <th>Reason</th>
                    <th></th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="appointment in appointments" :key="appointment.id">
                    <td>{{ appointment.id }}</td>
                    <td><h4>{{ formatDateString(appointment.startTime) }}</h4></td>
                    <td>{{ appointment.duration }} min</td>
                    <td><h4>{{ appointment.fullName }}</h4></td>
                    <td>{{ appointment.email }}</td>
                    <td><h4>{{ appointment.phoneNumber }}</h4></td>
                    <td style="text-align: left;">{{ appointment.reason }}</td>
                    <td><button class="approve-button" @click="changeStatus(appointment.id, 2)">Approve</button></td>
                    <td><button class="decline-button" @click="changeStatus(appointment.id, 3)">Decline</button></td>
                    <td><button class="check-availability-btn" @click="checkAvailability(appointment.startTime, appointment.duration)">Check Availability</button></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
  
<script>
export default {
    components: {
    },
    data() {
        return {};
    },
    methods: {
        formatDateString(inputDateString) {
            const dateObject = new Date(inputDateString);
            const formattedDate = `${dateObject.getFullYear()}-${(dateObject.getMonth() + 1).toString().padStart(2, '0')}-${dateObject.getDate().toString().padStart(2, '0')} ${dateObject.getHours().toString().padStart(2, '0')}:${dateObject.getMinutes().toString().padStart(2, '0')}`;

            return formattedDate;
        },
        changeStatus(id, status) {
            this.$store.dispatch('changeStatus', {
                'id': id,
                'status': status
            })
        },
        checkAvailability(startTime, duration) {
            this.$store.dispatch('checkAvailability', {
                'startTime': startTime,
                'duration': duration
            })
        }
    },
    computed: {
        appointments() {
            return this.$store.state.appointments
        }
    },
    mounted() {
        this.$store.dispatch('pendingBookList');
    }
};
</script>

<style scoped>
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 20px 0;
      background-color: #fff;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    th, td {
      padding: 15px;
      text-align: left;
      border-bottom: 1px solid #ddd;
    }

    th {
      background-color: #41b983;
      color: #fff;
    }

    /* Add some hover effect */
    tr:hover {
      background-color: #f5f5f5;
    }

    /* Style for responsive tables */
    @media only screen and (max-width: 600px) {
      table, thead, tbody, th, td, tr {
        display: block;
      }

      th {
        display: none;
      }

      td {
        border: none;
        position: relative;
        padding-left: 50%;
        text-align: left;
      }

      td:before {
        content: attr(data-label);
        position: absolute;
        left: 0;
        width: 50%;
        padding-left: 15px;
        font-weight: bold;
      }
    }

    .approve-button {
      padding: 10px 20px;
      font-size: 16px;
      font-weight: bold;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      cursor: pointer;
      border: 2px solid #27ae60;
      color: #fff;
      background-color: #2ecc71;
      border-radius: 5px;
      transition: background-color 0.3s, color 0.3s, border-color 0.3s;
    }

    /* Hover effect */
    .approve-button:hover {
      background-color: #27ae60;
      color: #fff;
      border-color: #27ae60;
    }

    .decline-button {
      display: inline-block;
      padding: 10px 20px;
      font-size: 16px;
      font-weight: bold;
      text-align: center;
      text-decoration: none;
      cursor: pointer;
      color: #fff;
      background-color: #e74c3c;
      border: 2px solid #c0392b;
      border-radius: 5px;
      transition: background-color 0.3s;
    }

    .decline-button:hover {
      background-color: #c0392b;
    }

    .check-availability-btn {
      display: inline-block;
      padding: 15px 30px;
      font-size: 16px;
      font-weight: bold;
      text-align: center;
      text-decoration: none;
      cursor: pointer;
      border: 2px solid #3498db;
      border-radius: 5px;
      color: #3498db;
      background-color: #fff;
      transition: background-color 0.3s, color 0.3s;
    }

    .check-availability-btn:hover {
      background-color: #3498db;
      color: #fff;
    }
</style>