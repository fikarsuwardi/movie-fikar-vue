<script>
import { mapState, mapWritableState, mapActions } from "pinia";
import { moviesStore } from "../stores/movies";
import { RouterLink } from "vue-router";
import axios from "axios";
import Swal from "sweetalert2/dist/sweetalert2.js";

// const baseUrl = "http://localhost:3000";
// const baseUrl = "https://movie-fikar-server.herokuapp.com"

export default {
  name: "TheFavoriteMovieCard",
  props: ["el2"],
  emits: ["fetchMovies"],
  computed: {
    ...mapState(moviesStore, [""]),
    ...mapWritableState(moviesStore, [""]),
  },
  methods: {
    ...mapActions(moviesStore, [""]),
    
    async hapus() {
      try {
        const response = await axios.delete(`${baseUrl}/favourite/delete/${this.el2.id}`, {
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        })
        this.$router.push(`/`)
        console.log(response);
        Swal.fire({
            icon: "success",
            text: "Delete Success",
        });
      } catch (error) {
        console.log(error);
      }
    }
  },
  created() {
    this.el2.id
    this.fetchMovies
  },
};
</script>

<template>
  <div>
    <!-- IMAGE -->
    <div class="flex justify-end pr-0 pt-2">
      <button
        v-on:click.prevent="hapus"
        class="text-3xl leading-none hover:text-gray-300"
      >
        &times;
      </button>
    </div>
    <RouterLink :to="`/movie/${el2.movieId}`">
      <img
        :src="el2.imageUrl"
        class="hover:opacity-75 tansition easy-in-out duration-150"
      />
    </RouterLink>
    <!-- TITLES -->
    <h3>{{ el2.title }}</h3>

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
      <span class="ml-2"> {{ el2.vote }}% | {{ el2.release }} </span>
      <br />
    </div>

    <!-- GENRE -->
    <span class="text-sm text-gray-500">
      <span>
        {{ el2.genre }}
      </span>
    </span>
  </div>
</template>

<style></style>
