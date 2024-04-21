<script>
import ThePopularMovies from '../components/ThePopularMovies.vue'
import TheUpcomingMovies from '../components/TheUpcomingMovies.vue'

import { mapState, mapWritableState, mapActions } from 'pinia'
import { moviesStore } from '../stores/movies'

export default {
  name: 'HomePage',
  components: {
    ThePopularMovies,
    TheUpcomingMovies
  },
  computed: {
    ...mapState(moviesStore, ['']),
    ...mapWritableState(moviesStore, [''])
  },
  methods: {
    ...mapActions(moviesStore, [''])
  },
  created() {}
}
</script>

<template>
  <div class="container mx-auto">
    <ThePopularMovies />
    <TheUpcomingMovies />
  </div>
</template>

<style></style>
