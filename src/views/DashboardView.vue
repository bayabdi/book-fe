<template>
    <div>
        Dashboard
    </div>
</template>

<script>
export default {
    name: 'LoginView',
    components: {},
    async mounted () {
        this.$store.dispatch('getCurrentUser');
    }
}
</script>
    