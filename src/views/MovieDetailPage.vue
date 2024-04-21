<script>
import axios from "axios";
import { RouterLink } from "vue-router";
import TheMovieDetailPageCast from "../components/TheMovieDetailPageCast.vue";
import TheMovieDetailPageMedia from "../components/TheMovieDetailPageMedia.vue";
import { mapState, mapWritableState, mapActions } from "pinia";
import { userStore } from "../stores/user";
import Swal from "sweetalert2/dist/sweetalert2.js";

// const baseUrl = "http://localhost:3000";
// const baseUrl = "https://movie-fikar-server.herokuapp.com"

export default {
  name: "MovieDetailPage",
  components: {
    TheMovieDetailPageCast,
    TheMovieDetailPageMedia,
  },
  data() {
    return {
      movie: {
        credits: {
          crew: {},
        },
        images: {
          backdrops: {},
        },
      },
      modelOpen: false,
      isVideo: false,
      mediaURL: "",
    };
  },


  methods: {
    async fetchMovie(movieId) {
      try {
        const response = await axios.get(
        "https://api.themoviedb.org/3/movie/" +
          movieId +
          "?api_key=93a882d2427e407e913daed9d97fc683&language=en-US&append_to_response=credits%2Cvideos%2Cimages"
      );
        this.movie = response.data;
      } catch (error) {
        console.log(error);
      }
    },

    openYouTubeModel() {
      this.mediaURL = this.youtubeVideo();
      this.isVideo = true;
      this.modelOpen = true;
    },
    openImageModel() {
      this.isVideo = false;
      this.modelOpen = true;
    },
    youtubeVideo() {
      if (!this.movie.videos) return;
      return (
        "https://www.youtube.com/embed/" + this.movie.videos.results[0].key
      );
    },

    tutup() {
      this.modelOpen = false
      this.isVideo = false
    },

    async buttonFavourite(title, image, vote, release, genre, movieId) {
      try {
        const response = await axios.post(`${baseUrl}/favourite/add`, {
          title: title,
          imageUrl: image,
          vote: vote,
          release: release,
          genre: genre,
          movieId: movieId
        }, {
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        });
        console.log(response, "ini tess");
        Swal.fire({
            icon: "success",
            text: "Added to favorite",
          });
      } catch (error) {
        console.log(error);
        Swal.fire({
            icon: "error",
            text: "Movie already favourite",
          });
      }
    }
  },

   mounted() {
    this.fetchMovie(this.$route.params.id);
  },

  computed: {
    ...mapState(userStore, ["isLogin"]),
    posterPath() {
      return "https://image.tmdb.org/t/p/w500/" + this.movie.poster_path;
    },
  },
};
</script>

<template>
  <div>
    <!-- DETAIL MOVIE -->
    <div class="container mx-auto flex mt-20 border-b border-gray-600 pb-2">
      <!-- POSTER BESAR -->
      <img :src="posterPath" alt="" class="w-64 md:w-full" />
      <div class="ml-24">
        <!-- TITLE MOVIE -->
        <h1 class="text-4xl font-semibold">{{ this.movie.title }}</h1>

        <span class="text-gray-500 text-sm flex">
          <!-- LOGO BINTANG -->
          <svg
            class="fill-current text-yellow-500 w-4 h-4 mr-1"
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
          {{ this.movie.vote_average * 10 }} % | {{ movie.release_date }}
          <!-- GENRE -->
          <span :key="index" v-for="(item, index) in movie.genres" class="ml-1">
            {{ item.name }}
            <span v-if="movie.genres.length - 1 != index">,</span>
          </span>
        </span>

        <!-- DESCRIPTION -->
        <p class="mt-5">
          {{ this.movie.overview }}
        </p>

        <!-- FEATURED CAST -->
        <div class="mt-5">
          <span class="mt-5 font-semibold">Featured Cast</span>

          <div class="flex">
            <div :key="index" v-for="(crew, index) in movie.credits.crew">
              <div v-if="index < 2" class="flex flex-col mt-5 mr-5">
                <span>{{ crew.name }}</span>

                <span class="text-gray-500">{{ crew.job }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- TRAILER DAN FAVORITE -->
        <div class="mt-5">
          <!-- PLAY TRAILER -->
          <a
            href="#"
            @click.prevent="openYouTubeModel"
            target="blank"
            class="rounded bg-yellow-500 px-5 py-3 inline-flex text-black cursor-auto"
          >
            <!-- LOGO PLAY -->
            <svg class="w-6 h-6 fill-current" viewBox="0 0 24 24">
              <path d="M0 0h24v24H0z" fill="none" />
              <path
                d="M10 16.5l6-4.5-6-4.5v9zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
              />
            </svg>

            <span class="ml-3">Play Trailer</span>
          </a>

          <!-- FAVORITE -->
          <a
            v-if="isLogin === true"
            href="#"
            @click.prevent="buttonFavourite(this.movie.title, posterPath, this.movie.vote_average * 10, movie.release_date, movie.genres[0].name, movie.id )"
            class="rounded bg-yellow-500 px-5 py-3 inline-flex text-black ml-5"
          >
            <img src="../assets/heart-white.png" alt="" />
            <span class="ml-3">Favourite</span>
          </a>
        </div>
      </div>
    </div>

    <TheMovieDetailPageCast :casts="movie.credits.cast" />
    <TheMovieDetailPageMedia
      :value="modelOpen"
      :mediaURL="mediaURL"
      :isVideo="isVideo"
      v-on:tutup="tutup"
    />
  </div>
</template>

<style></style>
