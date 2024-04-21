<script>
export default {
  // props: ["value", "mediaURL", "isVideo"],
  props: {
    value: {
      required: true,
    },
    mediaURL: {
      required: true,
    },
    isVideo: {
      required: true
    }
  },
  methods: {
    close() {
      this.$emit("tutup", !this.value);
    },
  },
  created() {
    this.value
  }
};
</script>

<template>
  <div
    style="background-color: rgba(0, 0, 0, 0.5)"
    class="fixed top-0 left-0 w-full h-full flex items-center shadow-lg overflow-y-auto z-50"
    tabindex="0"
    v-show="value"
  >
    <div class="container mx-auto lg:px-32 rounded-lg overflow-y-auto">
      <div class="bg-gray-900 rounded">
        <!-- CLOSE BUTTON -->
        <div class="flex justify-end pr-4 pt-2">
          <button
            v-on:click.prevent="close()"
            class="text-3xl leading-none hover:text-gray-300"
          >
            &times;
          </button>
        </div>

        <!-- VIDEO -->
        <div class="modal-body px-8 py-8">
          <div
            class="responsive-container overflow-hidden relative"
            :style="isVideo ? { 'padding-top': '56.25%' } : {}"
          >
            <img :src="mediaURL" v-if="!isVideo" />
            <iframe
              class="responsive-iframe absolute top-0 left-0 w-full h-full"
              style="border: 0"
              allow="autoplay; encrypted-media"
              allowfullscreen
              v-if="isVideo"
              :src="mediaURL"
            ></iframe>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<style></style>
