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
                    <td><button @click="changeStatus(appointment.id, 2)">Approve</button></td>
                    <td><button @click="changeStatus(appointment.id, 3)">Decline</button></td>
                    <td><button @click="checkAvailability(appointment.startTime, appointment.duration)">Check fitness</button></td>
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
  