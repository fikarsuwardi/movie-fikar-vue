import { defineStore } from "pinia";
import axios from "axios";

const baseUrl = "http://localhost:3000";
// const baseUrl = "https://movie-fikar-server.herokuapp.com"

export const actorsStore = defineStore("actors", {
  state: () => {
    return {
      actors: [],
      currentPage: 5
    };
  },
  actions: {
    async fetchActors() {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/person/popular?api_key=93a882d2427e407e913daed9d97fc683`, {
          page: 2
        })
        this.actors = response.data.results;
      } catch (error) {
        console.log(error);
      }
    },

    next() {
      this.currentPage += 1;
      // this.fetchActors(this.currentPage);
    },
    previous() {
      this.currentPage -= 1;
      // this.fetchActors(this.currentPage);
    },

  },
});
