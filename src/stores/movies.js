  import { defineStore } from "pinia";
import axios from "axios";

const baseUrl = "http://localhost:3000";
// const baseUrl = "https://movie-fikar-server.herokuapp.com"

export const moviesStore = defineStore("movies", {
  state: () => {
    return {
      movies: [],
      genres: [],
      upcomingMovies: [],
      actors: [],
      currentPage: 1
    };
  },
  actions: {
    async fetchGenres() {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=93a882d2427e407e913daed9d97fc683`);
        // console.log(response.data.genres);
        this.genres = response.data.genres;
      } catch (error) {
        console.log(error);
      }
    },

    async fetchMoviesPopular() {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=93a882d2427e407e913daed9d97fc683`);
        // console.log(response.data.results);
        this.movies = response.data.results;
      } catch (error) {
        console.log(error);
      }
    },

    async fetchUpcomingMovies() {
      try {
      const response = await axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=93a882d2427e407e913daed9d97fc683`);
      // console.log(this.upcomingMovies);
      this.upcomingMovies = response.data.results.slice(1, 6);
      } catch (error) {
        console.log(error);
      }
    },

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
      this.currentPage += 1;
      this.fetchActors(this.currentPage);
    },
    previous() {
      this.currentPage -= 1;
      this.fetchActors(this.currentPage);
    },

  },
});
