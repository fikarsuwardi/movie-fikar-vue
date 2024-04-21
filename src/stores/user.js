import { defineStore } from "pinia";
import axios from "axios";
import Swal from "sweetalert2/dist/sweetalert2.js";

const baseUrl = "http://localhost:3000";
// const baseUrl = "https://movie-fikar-server.herokuapp.com"

export const userStore = defineStore("user", {
  state: () => {
    return {
      isLogin: false,
    };
    
  },

  actions: {
    // REGISTER
    async doRegister(objRegister) {
      try {
        const response = await axios.post(`${baseUrl}/user/register`, {
          nickname: objRegister.nickname,
          email: objRegister.email,
          password: objRegister.password,
        });
        console.log(response, "ini dari doRegister");
        this.router.push("/login");
        Swal.fire({
          icon: "success",
          text: "Register Success, please check your email",
        });
      } catch (err) {
        console.log(err);
        Swal.fire({
          icon: "error",
          text: err.response.data.error.message,
        });
      }
    },

    // LOGIN FORM
    async doLogin(objLogin) {
      try {
        const response = await axios.post(`${baseUrl}/user/login`, {
          email: objLogin.email,
          password: objLogin.password,
        });
        console.log(response, "ini dari doLogin");
        const token = response.data.access_token;
        localStorage.setItem("access_token", token);

        this.$state.isLogin = true;
        this.router.push("/");

        Swal.fire({
          icon: "success",
          text: "Login Success",
        });
      } catch (err) {
        console.log(err);
        Swal.fire({
          icon: "error",
          text: err.response.data.error.message,
        });
      }
    },

    // LOGOUT
    doLogout() {
      this.isLogin = false;
      localStorage.clear();
      this.router.push("/");
      Swal.fire({
        icon: "success",
        text: "Logout Success",
      });
    },
  },
});
