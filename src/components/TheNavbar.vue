<script>
import { RouterLink } from 'vue-router'
export default {}
</script>

<template>
  <div class="flex">
    <RouterLink to="/" class="ml-5">
      <div>
        <img src="../assets/mF.png" alt="" />
      </div>
    </RouterLink>

    <ul class="flex mt-5">
      <li>
        <RouterLink to="/" class="ml-5"> Movies </RouterLink>
      </li>

      <li>
        <RouterLink to="/actors" class="ml-5"> Actors </RouterLink>
      </li>
    </ul>
  </div>
</template>

<style></style>
