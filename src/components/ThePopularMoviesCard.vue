<script>
import { mapState, mapWritableState, mapActions } from "pinia";
import { moviesStore } from "../stores/movies";
import { RouterLink } from "vue-router";

export default {
  name: "ThePopularMoviesCard",
  props: ["movie", "genres"],
  computed: {
    ...mapState(moviesStore, [""]),
    ...mapWritableState(moviesStore, [""]),
    posterPath() {
      return "https://image.tmdb.org/t/p/w500/" + this.movie.poster_path;
    },
  },
  methods: {
    ...mapActions(moviesStore, [""]),
    genreTypeName(genreId, index) {
      for (const item of this.genres) {
        if (item.id == genreId) {
          if (this.movie.genre_ids.length - 1 == index) {
            return item.name;
          } else {
            return item.name + ", ";
          }
        }
      }
    },
  },
  created() {},
};
</script>

<template>
  <div>
    <!-- IMAGE -->
    <RouterLink :to="`/movie/${movie.id}`">
      <img
        :src="posterPath"
        class="hover:opacity-75 tansition easy-in-out duration-150"
      />
    </RouterLink>
    <!-- TITLES -->
    <h3>{{ movie.title }}</h3>

    <div class="flex">
      <!-- LOGO BINTANG -->
      <svg
        class="fill-current text-yellow-500 w-4 h-4 mt-1"
        viewBox="0 0 24 24"
      >
        <g data-name="Layer 2">
          <path
            d="M17.56 21a1 1 0 01-.46-.11L12 18.22l-5.1 2.67a1 1 0 01-1.45-1.06l1-5.63-4.12-4a1 1 0 01-.25-1 1 1 0 01.81-.68l5.7-.83 2.51-5.13a1 1 0 011.8 0l2.54 5.12 5.7.83a1 1 0 01.81.68 1 1 0 01-.25 1l-4.12 4 1 5.63a1 1 0 01-.4 1 1 1 0 01-.62.18z"
            data-name="star"
          />
        </g>
      </svg>
      <!-- RATING -->
      <span class="ml-2"
        >{{ movie.vote_average * 10 }}% | {{ movie.release_date }}
      </span>
      <br />
    </div>

    <!-- GENRE -->
    <span class="text-sm text-gray-500">
      <span :key="genre" v-for="(genre, index) in movie.genre_ids">
        {{ genreTypeName(genre, index) }}
      </span>
    </span>
  </div>
</template>

<style></style>
