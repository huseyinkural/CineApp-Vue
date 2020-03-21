<template>
    <div>
        Hello
    </div>
</template>

<script>
export default {

    

    created(){     
        this.$store.dispatch('fetchMovieDetails', this.movieId).then( ()=>{
            console.log("data fecthed"); 
        });
    },
    computed: {
        movieId(){
            return this.$route.params.id;
        },
        details() {                     
            return this.$store.state.movieDetails[this.movieId];
        }

    }
    
}
</script>