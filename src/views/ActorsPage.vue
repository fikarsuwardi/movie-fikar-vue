<script>
import TheActorsCard from "../components/TheActorsCard.vue";
import { mapState, mapWritableState, mapActions } from "pinia";
import { actorsStore } from "../stores/actors";
import axios from "axios";
const baseUrl = "http://localhost:3000";
// const baseUrl = "https://movie-fikar-server.herokuapp.com"

let currentPage = 1;

export default {
  name: "ActorsPage",
  components: { TheActorsCard },
  data() {
    return{
      actors: [],
    }
  },
  computed: {
    ...mapState(actorsStore, ["", ""]),
    ...mapWritableState(actorsStore, [""]),
  },
  methods: {
    ...mapActions(actorsStore, ["fetchActors", "next", "previous"]),
    async fetchActors(page) {
      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/person/popular?api_key=93a882d2427e407e913daed9d97fc683&language=en-US&page=" +
            page
        );
        this.actors = response.data.results;
        // this.actors.push(...response.data.results);
      } catch (error) {
        console.log(error);
      }
    },

    next() {
      currentPage += 1;
      this.fetchActors(currentPage);
    },
    previous() {
      currentPage -= 1;
      this.fetchActors(currentPage);
    },
  },
  created() {
    this.fetchActors(currentPage);
    this.next()
    this.previous()
  },
};
</script>

<template>
  <div class="container mx-auto px-4 py-16">
    <h2 class="text-yellow-500 text-lg font-semibold">POPULAR ACTORS</h2>

    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
    >
      <TheActorsCard
        v-for="actor in actors"
        :key="actor.id"
        :actor="actor"
      />
    </div>
    <!-- PAGINATION -->
    <div class="text-center mt-5">
      <a href="" v-on:click.prevent="previous"> Previous </a>
      <a href="" v-on:click.prevent="next" class="ml-5"> Next </a>
    </div>
  </div>
</template>

<style></style>
