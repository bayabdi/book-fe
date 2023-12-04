<template>
    <div>
        <button v-if="!isShow" @click="isShow = true;" class="book-appointment-button">Book appointment</button>
        <div v-if="isShow">
            <div>
                <label for="datetime">From date and time:</label><br/>
                <input
                    v-model="fromTime"
                    type="datetime-local"
                    id="datetime"
                    name="fromDatetimeInput"
                    :min="today"
                    class="input"
                >
            </div>
            <div class="select-container">
                <label for="duration">Duration:</label><br/>
                <select class="input" v-model="duration" id="duration" name="duration">
                    <option v-for="item in durations" :key="item.value" :value="item.value">{{ item.text }}</option>
                </select>
            </div>
            <div>
                <label for="reason">Reason:</label><br/>
                <textarea class="input" v-model="reason" placeholder="Type reason..."></textarea>
            </div>
            <button @click="book()" class="book-button">Book</button>
            <button @click="isShow = false" class="cancel-button">Cancel</button>
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

<style scoped>
.book-appointment-button {
  display: inline-block;
  padding: 15px 30px;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease, color 0.3s ease;
  background-color: #3498db;
  color: #fff;
  border: 2px solid #3498db;
  margin-top: 20px;
}

.book-appointment-button:hover {
  background-color: #fff;
  color: #3498db;
}

@media only screen and (max-width: 600px) {
  .book-appointment-button {
    display: block;
    width: 100%;
    margin-bottom: 10px;
  }
}
label {
    font-size: 16px;
    margin-top: 18px;
    margin-bottom: -8px;
    display: block;
}

.input {
    width: 200px;
    padding: 10px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
}

.input:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 5px rgba(52, 152, 219, 0.5);
}


.book-button, .cancel-button {
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

.book-button {
    background-color: #3498db;
    color: #fff;
}

.cancel-button {
    background-color: #e74c3c;
    color: #fff;
}

.book-button:hover, .cancel-button:hover {
    background-color: #2980b9;
}
</style>
  