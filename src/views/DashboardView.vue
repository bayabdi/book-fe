<template>
    <div>
        Dashboard
        <h1 v-if="is_manager">Manager</h1>
        <h1>{{ email }}</h1>
        <h2>{{ fullName }}</h2>
        <h2>{{ phoneNumber }}</h2>
    </div>
</template>

<script>
export default {
    name: 'LoginView',
    components: {},
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
        console.log(this.$store.state)
    }
}
</script>
    