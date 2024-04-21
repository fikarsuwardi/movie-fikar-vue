<script>
import { mapActions, mapState } from "pinia";
import { userStore } from "../stores/user";

export default {
  name: "RegisterForm",
  data() {
    return {
      objRegister: {
        nickname: "",
        email: "",
        password: "",
      },
    };
  },
  computed: {
    ...mapState(userStore, ["isLogin"]),
  },
  methods: {
    ...mapActions(userStore, ["doRegister"]),

    registerButton() {
      this.doRegister(this.objRegister);
    },
  },
};
</script>

<template>
  <div class="h-screen font-sans login bg-cover">
    <div
      class="container mx-auto h-full flex flex-1 justify-center items-center"
    >
      <div class="w-full max-w-lg">
        <div class="leading-loose">
          <form
            class="max-w-sm m-4 p-10 bg-white bg-opacity-25 rounded shadow-xl"
            v-on:submit.prevent="registerButton"
          >
            <p class="text-white font-medium text-center text-lg font-bold">
              REGISTER
            </p>
            <div class="">
              <label class="block text-sm text-white" for="text"
                >Username</label
              >
              <input
                class="w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"
                type="text"
                id="text"
                placeholder="Input username"
                aria-label="email"
                required
                v-model="objRegister.nickname"
              />
            </div>
            <div class="">
              <label class="block text-sm text-white" for="email">Email</label>
              <input
                class="w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"
                type="email"
                id="email"
                placeholder="Input email"
                aria-label="email"
                required
                v-model="objRegister.email"
              />
            </div>
            <div class="mt-2">
              <label class="block text-sm text-white">Password</label>
              <input
                class="w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"
                type="password"
                id="password"
                placeholder="Input password"
                arial-label="password"
                required
                v-model="objRegister.password"
              />
            </div>

            <div class="mt-4 items-center flex justify-between">
              <button
                class="px-4 py-1 text-white font-light tracking-wider bg-gray-900 hover:bg-gray-800 rounded"
                type="submit"
              >
                Enter
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.login {
  /*
    background: url('https://tailwindadmin.netlify.app/dist/images/login-new.jpeg');
  */
  background: url("http://bit.ly/2gPLxZ4");
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
