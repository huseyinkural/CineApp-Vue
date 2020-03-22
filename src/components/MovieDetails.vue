<template>
    <section>
        <loader v-if="isLoading"/>
        <section v-if="hasDetails">
            <backdrop-image :imageName="movie.backdrop_path"/>
            <div class="container pt-5">
                <div class="row">
                    <div class="col-sm-4">
                        <poster :posterName="movie.poster_path"/>
                    </div>
                    <div class="col-sm-8 details">
                        <h2>{{movie.title}}</h2>
                        <p>{{movie.overview}}</p>
                        <div>Runtime: {{runtime}}</div>
                        <div>Average rating: {{movie.vote_average.toFixed(1)}}</div>
                        <div>Production Company: {{movie.production_companies[0].name}}</div>
                        <div>Release Date: {{movie.release_date}}</div>
                        <h4 class="mt-3">Cast</h4>
                        <img 
                        v-for="person in movie.cast"
                        :src="castAvatar(person.profile_path)"
                        :key="person.id"
                        class="cast-avatar">
                        <h4 class="mt-3">Trailers</h4> 
                        <a v-for="trailer in trailers" :href="trailer.url" :key="trailer" class="trailer" target="_blank">                        
                            <span></span>
                            <img :src="trailer.thumbnail" />                    
                        </a>
                        <a :href="ticketsPath" class="btn btn-success ticket-button">Get Tickets</a>
                                              
                    
                    </div>
                </div>
            </div>
            
        </section>
    </section>
</template>

<script>
import Loader from './Loader.vue';
import BackdropImage from './BackdropImage.vue';
import Poster from './Poster.vue';
export default {
    data(){
        return {
            hasDetails: false,
            isLoading: true
        }
    },

    created(){     
        this.$store.dispatch('fetchMovieDetails', this.movieId).then( ()=>{
            console.log("data fecthed"); 
            this.isLoading = false;
            this.hasDetails = true;
        });
    },
    methods: {
        castAvatar(path) {
            return 'https://image.tmdb.org/t/p/w45'+path;
        }

    },
    computed: {
        movieId(){
            return this.$route.params.id;
        },
        movie() {                     
            return this.$store.state.movieDetails[this.movieId];
        },
        runtime() {
            const {runtime} = this.movie;
            const hours = Math.floor(runtime / 60);
            const minutes = runtime % 60;

            return hours+'h -'+ minutes+'m';
        },
        trailers() {
            const trailers = [];

            this.movie.videos.results.forEach((video) => {
                if(video.type === 'Trailer'){
                    trailers.push({
                        thumbnail: 'https://i.ytimg.com/vi/'+video.key+'/sddefault.jpg',
                        url: 'https://youtube.com/watch?v='+video.key,
                    });
                }
            });

            return trailers;
        },
        ticketsPath(){
            return '/movie/'+this.movieId+'/tickets'
        }

    },
    components: {
        Loader,
        BackdropImage,
        Poster,
    }
    
}
</script>

<style>
.details {
    color: #FFF;
}
.cast-avatar {
    width: 45px;
    height: 45px;
    border-radius: 45px;
    border: 2px solid #fff;
    box-sizing: border-box;
    margin-right: 5px;

}

.trailer {
    width: 150px;
    height: 110px;
    display: inline-block;
    margin-right: 20px;
    position: relative;
}
.trailer img{
    width: 100%;
    height: 100%;
}

.trailer span{
    background-image: url('http://icons.iconarchive.com/icons/dakirby309/simply-styled/256/YouTube-icon.png');
    background-size: 75px 75px;
    position: absolute;
    width: 75px;
    height: 75px;
    top: 18px;
    left: 36px;
    display: block;
}

.ticket-button {
    position: absolute;
    top: 0;
    right: 15px;
}
</style>