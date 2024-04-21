<script>
import ThePopularMoviesCard from "../components/ThePopularMoviesCard.vue";
import { mapState, mapWritableState, mapActions } from "pinia";
import { moviesStore } from "../stores/movies";

export default {
  name: "ThePopularMovies",
  components: {
    ThePopularMoviesCard,
  },
  computed: {
    ...mapState(moviesStore, ["movies", "genres"]),
    ...mapWritableState(moviesStore, [""]),
  },
  methods: {
    ...mapActions(moviesStore, ["fetchGenres", "fetchMoviesPopular"]),
  },
  created() {
    this.fetchGenres()
    this.fetchMoviesPopular()
  },
};
</script>

<template>
  <div class="mx-5">
    <h2 class="uppercase mt-5 text-yellow-500 text-lg font-semibold">
      Popular Movies
    </h2>

    <div
      class="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-8"
    >
      <ThePopularMoviesCard 
        v-for="movie in movies"
        :key="movie.id"
        :movie="movie"
        :genres="genres"
      />
    </div>
  </div>
</template>

<style></style>
