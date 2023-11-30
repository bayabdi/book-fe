<template>
    <div>
        Dashboard
        <h1 v-if="is_manager">Manager</h1>
        <h4>{{ email }}</h4>
        <h4>{{ fullName }}</h4>
        <h4>{{ phoneNumber }}</h4>
        <BookingForm v-if="!is_manager" />
        <BookingTracking v-else/>
    </div>
</template>

<script>
import BookingForm from '@/components/BookingForm.vue'
import BookingTracking from '@/components/BookingTracking.vue'

export default {
    name: 'LoginView',
    components: {
        BookingForm,
        BookingTracking
    },
    computed: {
        fullName() {
            if (this.$store.state.user === null)
                return ''
            return this.$store.state.user.full_name
        },
        email() {
            if (this.$store.state.user === null)
                return ''
            return this.$store.state.user.email
        },
        phoneNumber() {
            if (this.$store.state.user === null)
                return ''
            return this.$store.state.user.phone_number
        },
        id() {
            if (this.$store.state.user === null)
                return ''
            return this.$store.state.user.id
        },
        is_manager() {
            if (this.$store.state.user === null)
                return false
            return this.$store.state.user.is_manager
        }
    },
    async mounted () {
        this.$store.dispatch('getCurrentUser');
    }
}
</script>
    