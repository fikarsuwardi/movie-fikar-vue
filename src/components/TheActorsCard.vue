<script>
import { RouterLink } from "vue-router";

export default {
  name: "TheActorsCard",
  props: ["actor"],
  computed: {
    profileImage() {
      return (
        "https://image.tmdb.org/t/p/w235_and_h235_face/" +
        this.actor.profile_path
      );
    },
  },
};
</script>

<template>
  <div>
    <RouterLink :to="`/actor/${this.actor.id}`">
      <img :src="profileImage" alt="" />
      <h3>{{ actor.name }}</h3>
    </RouterLink>
  </div>
</template>

<style></style>
