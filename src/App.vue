<script>
import { RouterView } from 'vue-router'
import { mapState, mapWritableState, mapActions } from 'pinia'
import { moviesStore } from './stores/movies'
import { userStore } from './stores/user'
import TheNavbar from './components/TheNavbar.vue'
import TheSearchbar from './components/TheSearchbar.vue'

export default {
  components: {
    RouterView,
    TheNavbar,
    TheSearchbar
  },
  computed: {
    ...mapState(moviesStore, ['']),
    ...mapWritableState(userStore, ['isLogin'])
  },
  methods: {
    ...mapActions(moviesStore, [''])
  },
  created() {
    if (localStorage.getItem('access_token')) {
      this.isLogin = true
    } else {
      this.isLogin = false
    }
  }
}
</script>

<template>
  <div id="app" class="">
    <div class="flex justify-between border-b border-gray-500">
      <TheNavbar />
      <TheSearchbar />
    </div>

    <RouterView />
  </div>
</template>

<style></style>
