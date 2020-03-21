<template>
    <section>
        <loader v-if="isLoading"/>
    </section>
</template>

<script>
import Loader from './Loader.vue';
export default {
    data(){
        return {
            isLoading: true
        }
    },

    created(){     
        this.$store.dispatch('fetchMovieDetails', this.movieId).then( ()=>{
            console.log("data fecthed"); 
            this.isLoading = false;
        });
    },
    computed: {
        movieId(){
            return this.$route.params.id;
        },
        details() {                     
            return this.$store.state.movieDetails[this.movieId];
        }

    },
    components: {
        Loader,
    }
    
}
</script>