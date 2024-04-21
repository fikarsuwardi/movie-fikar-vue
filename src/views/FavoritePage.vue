<script>
import TheFavoriteMovieCard from "../components/TheFavoriteMovieCard.vue";

import axios from "axios";
const baseUrl = "http://localhost:3000";
// const baseUrl = "https://movie-fikar-server.herokuapp.com"

export default {
  name: "FavoritePage",
  components: {
    TheFavoriteMovieCard,
  },
  data() {
    return {
      moviesFavorite: []
    }
  },
  methods: {
    async fetchMoviesFavorite() {
      try {
        const response = await axios.get(`${baseUrl}/favourite/`, {
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        });
        console.log(response);
        this.moviesFavorite = response.data
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {
    this.fetchMoviesFavorite()
  },

};
</script>

<template>
  <div class="container mx-auto">
    <div class="mx-5">
      <h2 class="uppercase mt-5 text-yellow-500 text-lg font-semibold">
        Favorite Movie
      </h2>

      <div
        class="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-8"
      >
        <TheFavoriteMovieCard v-for="el in moviesFavorite" :key="el.id" :el2="el"
        v-on:fetchMovies="fetchMoviesFavorite"
         />
      </div>
    </div>
  </div>
</template>
