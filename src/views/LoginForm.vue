<script>
import { mapActions, mapState } from "pinia";
import { userStore } from "../stores/user";

export default {
  name: "LoginForm",
  data() {
    return {
      objLogin: {
        email: "",
        password: "",
      },
    };
  },
  computed: {
    ...mapState(userStore, ["isLogin"]),
  },
  methods: {
    ...mapActions(userStore, ["doLogin"]),

    loginButton() {
      this.doLogin(this.objLogin);
    },
  },
}; // batas export default
</script>

<template>
  <!-- This is an example component -->
  <div class="h-screen font-sans login bg-cover">
    <div
      class="container mx-auto h-full flex flex-1 justify-center items-center"
    >
      <div class="w-full max-w-lg">
        <div class="leading-loose">
          <form
            class="max-w-sm m-4 p-10 bg-white bg-opacity-25 rounded shadow-xl"
            method="post"
            v-on:submit.prevent="loginButton"
          >
            <p class="text-white font-medium text-center text-lg font-bold">
              LOGIN
            </p>
            <div class="">
              <label class="block text-sm text-white" for="email">Email</label>
              <input
                class="w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"
                type="email"
                id="email"
                placeholder="Input email"
                aria-label="email"
                required
                v-model="objLogin.email"
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
                v-model="objLogin.password"
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
            <div class="text-center">
              <a
                class="inline-block right-0 align-baseline font-light text-sm text-500 hover:text-red-400"
                v-on:click.prevent="this.$router.push('/register')"
              >
                Belum punya akun?
              </a>
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
