<script >
import axios from "axios"
import { RouterLink } from 'vue-router'
import TheSearchbarDropdown from "./TheSearchbarDropdown.vue";


export default {
    name: "TheSearchbar",
    components: { 
      TheSearchbarDropdown
    },
    data() {
        return {
            searchResult: [],
            searchTerm: "",
            showSearchResult: false,
        };
    },

    methods: {
        debounceSearch(event) {
            clearTimeout(this.debounce);
            this.debounce = setTimeout(() => {
                if (event.target.value.length > 3) {
                    this.fetchSearch(event.target.value);
                }
                else {
                    this.showSearchResult = false;
                }
            }, 600);
        },

        async fetchSearch(term) {
            try {
                const response = await axios.get("https://api.themoviedb.org/3/search/movie?api_key=93a882d2427e407e913daed9d97fc683&query=" + term);
                this.searchResult = response.data.results;
                this.showSearchResult = response.data.results ? true : false;
            }
            catch (error) {
                console.log(error);
            }
        },

        handleFocus() {
            if (this.searchTerm != "") {
                this.showSearchResult = true;
            }
        },

        posterPath(poster_path) {
            if (poster_path) {
                return "https://image.tmdb.org/t/p/w500/" + poster_path;
            }
            else {
                return "https://via.placeholder.com/50x75";
            }
        },
    },
};

</script>

<template>
 <div class="mt-5 flex relative">

   <!-- INPUT SEARCHBAR -->
    <input
      ref="searchBox"
      type="text"
      class="rounded-full bg-gray-600 px-7 w-50 h-10 mr-3 focus:outline-none focus:outline-shawod"
      placeholder="Search Movie...."
      @input="debounceSearch"
      v-model="searchTerm"
      @focus="handleFocus"
    />

    <!-- ICON KACA PEMBESAR -->
    <div class="absolute top-0">
      <svg
        class="fill-current w-4 text-gray-300 mt-2 ml-2 mt-3"
        viewBox="0 0 24 24"
      >
        <path
          class="heroicon-ui"
          d="M16.32 14.9l5.39 5.4a1 1 0 01-1.42 1.4l-5.38-5.38a8 8 0 111.41-1.41zM10 16a6 6 0 100-12 6 6 0 000 12z"
        />
      </svg>
    </div>

    <!-- DROPDOWN HASIL PENCARIAN -->
    <div class="absolute mt-12 rounded bg-gray-600 w-60 z-50">
      <ul class="mt-3" v-if="showSearchResult">
        <li :key="index" v-for="(movie, index) in searchResult">
          <router-link
            :to="`/movie/${movie.id}`"
            @click.native="showSearchResult = false"
            class="flex items-center border-b border-gray-500 p-1"
          >
            <img :src="posterPath(movie.poster_path)" alt="" class="w-10" />
            <span class="ml-3">{{ movie.title }}</span>
          </router-link>
        </li>
      </ul>

      <!-- KALAU GAK ADA RESULT -->
      <ul class="px-3" v-if="searchResult.length == 0 && showSearchResult">
        <li>No result found for "{{ searchTerm }}"</li>
      </ul>
      
    </div>

  <!-- INI UNTUK PROFILE USER -->
   <TheSearchbarDropdown />

  </div>
</template>

<style>

</style>
