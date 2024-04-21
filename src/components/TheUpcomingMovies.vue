<script>
import axios from "axios";
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel';

export default {
  name: "TheUpcomingMovies",
  data() {
    return {
      upcomingMovies: [],
    };
  },
  components: {
    Carousel,
    Slide,
    Pagination,
  },
  mounted() {
    this.fetchUpcomingMovies();
  },
  methods: {
    async fetchUpcomingMovies() {
      const response = await axios.get(
        "https://api.themoviedb.org/3/movie/upcoming?api_key=93a882d2427e407e913daed9d97fc683&language=en-US&page=1"
      );

      this.upcomingMovies = response.data.results.slice(1, 6);
      console.log(this.upcomingMovies);
    },
  },
};
</script>

<template>
  <div id="example" class="mb-5">
    <h2 class="uppercase text-yellow-500 font-semibold text-lg mt-20 ml-2">
      Upcoming Movies
    </h2>
    <Carousel :itemsToShow="2.5" :wrapAround="true"
      :controls-visible="true"
      :clickable="false"
      :key="upcomingMovies.length"
      :listData="upcomingMovies"
      :height="500"
    >
      <Slide :index="i" :key="i" v-for="(movie, i) in this.upcomingMovies">
        <div class="carousel__item">
          <router-link :to="`/movie/${movie.id}`">
          <img :src="'https://image.tmdb.org/t/p/w500/' + movie.poster_path"/>
          </router-link>
        </div>
      </Slide>
    </Carousel>
  </div>
</template>

<style scoped>
.carousel__slide > .carousel__item {
  transform: scale(1);
  opacity: 0.5;
  transition: 0.5s;
}
.carousel__slide--visible > .carousel__item {
  opacity: 1;
  transform: rotateY(0);
}
.carousel__slide--next > .carousel__item {
  transform: scale(0.8) translate(10px);
}
.carousel__slide--prev > .carousel__item {
  transform: scale(0.8) translate(-10px);
}
.carousel__slide--active > .carousel__item {
  transform: scale(1);
}
</style>
