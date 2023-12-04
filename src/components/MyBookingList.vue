<template>
    <div>
        <h1>My appointments:</h1>
        <div>
            <button class="pending-button" @click="bookList(1)">List of PENDINGs</button>
            <button class="approved-button" @click="bookList(2)">List of PLANNEDs</button>
            <button class="declined-button" @click="bookList(3)">List of DECLINEDs</button>
        </div>
        <table style="max-width: 700px; margin-left: auto; margin-right: auto;">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Start Time</th>
                    <th>Duration</th>
                    <th>Status</th>
                    <th>Reason</th>
                </tr>
            </thead>
            <tr v-for="appointment in appointments" :key="appointment.id">
                <td><h2>{{ appointment.id }}</h2></td>
                <td>{{ formatDateString(appointment.startTime) }}</td>
                <td><h4>{{ appointment.duration }} min</h4></td>
                <td>
                    <p v-if="appointment.status == 1" style="color: blueviolet;">PENDING</p>
                    <p v-if="appointment.status == 2" style="color: green;">PLANNED</p>
                    <p v-if="appointment.status == 3" style="color: red;">DECLINED</p>
                </td>
                <td><h4 style="text-align: left; color: gray;">{{ appointment.reason }}</h4></td>        
            </tr>
        </table>
    </div>
</template>
  
<script>
export default {
    components: {
    },
    data() {
        return {
        };
    },
    computed: {
        appointments() {
            return this.$store.state.appointments
        }
    },
    methods: {
        formatDateString(inputDateString) {
            const dateObject = new Date(inputDateString);
            const formattedDate = `${dateObject.getFullYear()}-${(dateObject.getMonth() + 1).toString().padStart(2, '0')}-${dateObject.getDate().toString().padStart(2, '0')} ${dateObject.getHours().toString().padStart(2, '0')}:${dateObject.getMinutes().toString().padStart(2, '0')}`;

            return formattedDate;
        },
        bookList(status) {
            this.$store.dispatch('myBookList', status);
        }
    },
    mounted() {
        this.$store.dispatch('myBookList', 1);
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
      border-radius: 8px;
      overflow: hidden;
    }

    th, td {
      padding: 15px;
      text-align: left;
      border-bottom: 1px solid #ddd;
    }

    th {
      background-color: #3498db;
      color: #fff;
    }

    tr:hover {
      background-color: #f5f5f5;
    }

    td:first-child {
      border-top-left-radius: 8px;
      border-bottom-left-radius: 8px;
    }

    td:last-child {
      border-top-right-radius: 8px;
      border-bottom-right-radius: 8px;
    }

    .pending-button, .approved-button, .declined-button{
    display: inline-block;
    padding: 10px 20px;
    font-size: 16px;
    text-align: center;
    text-decoration: none;
    cursor: pointer;
    border-radius: 5px;
    transition: background-color 0.3s, color 0.3s;
    margin: 0 10px;
}

    .pending-button {
        background-color: #bc34db;
        color: #fff;
    }

    .approved-button {
        background-color: #34db34;
        color: #fff;
    }

    .declined-button {
        background-color: #e74c3c;
        color: #fff;
    }

    .pending-button:hover, .approved-button:hover, .cancel-button:hover {
        background-color: #2980b9;
    }
</style>