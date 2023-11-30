<template>
    <div>
        <h1>My appointments:</h1>
        <table style="max-width: 600px; margin-left: auto; margin-right: auto;">
            <tr v-for="appointment in appointments" :key="appointment.id">
                <td><h2>{{ appointment.id }}</h2></td>
                <td>{{ formatDateString(appointment.startTime) }}</td>
                <td><h4>{{ appointment.duration }} min</h4></td>
                <td>
                    <p v-if="appointment.status == 1" style="color: blueviolet;">PENDING</p>
                    <p v-if="appointment.status == 2" style="color: green;">CONFIRMED</p>
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
            const formattedDate = `${dateObject.getFullYear()}-${(dateObject.getMonth() + 1).toString().padStart(2, '0')}-${dateObject.getDate().toString().padStart(2, '0')} ${dateObject.getHours().toString().padStart(2, '0')}:${dateObject.getMinutes().toString().padStart(2, '0')}:${dateObject.getSeconds().toString().padStart(2, '0')}`;

            return formattedDate;
        }
    },
    mounted() {
        this.$store.dispatch('myBookList');
    }
};
</script>
  