<template>
  <app-header />
</template>

<script>
import AppHeader from './AppHeader.vue'
export default {
    name: 'Home',
    data(){
        return{}
    },
    components:{
        AppHeader,
    },

    created(){
        this.$store.dispatch('fetchMovies');
    }
}
</script>

<style>

</style>