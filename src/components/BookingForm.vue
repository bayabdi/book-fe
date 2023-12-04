<template>
    <div>
        <button v-if="!isShow" @click="isShow = true;">Book appointment</button>
        <div v-if="isShow">
            <div>
                <label for="datetime">From date and time:</label><br/>
                <input
                    v-model="fromTime"
                    type="datetime-local"
                    id="datetime"
                    name="fromDatetimeInput"
                    :min="today"
                >
            </div>
            <div>
                <label for="duration">Duration:</label><br/>
                <select v-model="duration" id="duration" name="duration">
                    <option v-for="item in durations" :key="item.value" :value="item.value">{{ item.text }}</option>
                </select>
            </div>
            <div>
                <label for="reason">Reason:</label><br/>
                <textarea v-model="reason" placeholder="Type reason..."></textarea>
            </div>
            <button @click="book()">Book</button>
            <button @click="isShow = false">Cancel</button>
        </div>
        <MyBookingList v-if="!isShow"/>
    </div>
</template>
  
<script>
import MyBookingList from '@/components/MyBookingList.vue'
// eslint-disable-next-line no-unused-vars
import { isBefore, isAfter } from 'date-fns';

export default {
    components: {
        MyBookingList,
    },
    data() {
        return {
            isShow: false,
            fromTime: null,
            duration: 15,
            durations: [{
                'text': '15 min',
                'value': 15
            }, {
                'text': '30 min',
                'value': 30
            }, {
                'text': '60 min',
                'value': 60
            }, {
                'text': '120 min',
                'value': 120
            }],
            reason: '',
        };
    },
    methods: {
        book() {
            this.$store.dispatch('book', {
                duration: this.duration,
                startTime: this.fromTime,
                reason: this.reason,
                status: 1
            });
        },
        disableSpecificDates() {
            // Disable specific dates in the dropdown
            const datetimeInput = document.getElementById('datetime');
            const options = datetimeInput.getElementsByTagName('option');

            for (let i = 0; i < options.length; i++) {
                const optionValue = options[i].value;
                if (this.disabledDates.includes(optionValue)) {
                options[i].disabled = true;
                }
            }
        },
    },
    computed: {
        today() {
            let currentDate = new Date();
            currentDate.setHours(currentDate.getHours() + 1);
            
            const today = currentDate.toISOString().split('.')[0].substring(0, 16);
            console.log(today.length)
            console.log(today)
            return today;
        }
    },
    mounted() {
        // this.disableSpecificDates()
    }
};
</script>
  