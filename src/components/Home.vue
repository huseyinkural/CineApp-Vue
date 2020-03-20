<template>
  <section>
    <app-header />
    <loader v-if="isLoading" />
  </section>
</template>

<script>
import AppHeader from './AppHeader.vue';
import Loader from './Loader.vue';

export default {
    name: 'Home',
    data(){
        return{
            isLoading: true,
        }
    },
    components:{
        AppHeader,
        Loader,
    },

    created(){
        this.$store.dispatch('fetchMovies').then(()=> {
            this.isLoading = false;
        });
    }
}
</script>

<style>

</style>