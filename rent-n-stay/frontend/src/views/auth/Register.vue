<template>
  <div class="container mx-auto px-4 h-full">
    <div class="flex content-center items-center justify-center h-full">
      <div class="w-full lg:w-6/12 px-4">
        <div
          class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0"
        >
          <div class="rounded-t mb-0 px-6 py-6">
            <div class="text-center mb-3">
              <h6 class="text-blueGray-500 text-sm font-bold">
                Sign up
              </h6>
            </div>
          </div>
          <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
            <form>
              <div class="relative w-full mb-3">
                <label
                  class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Name
                </label>
                <input
                  type="text"
                  class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="Name"
                  v-model="client_name"
                />
              </div>

              <div class="relative w-full mb-3">
                <label
                  class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Email
                </label>
                <input
                  type="email"
                  class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="Email"
                  v-model="client_email"
                />
              </div>

              <div class="relative w-full mb-3">
                <label
                  class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Password
                </label>
                <input
                  type="password"
                  class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="Password"
                  v-model="client_password"
                />
              </div>

              <div class="relative w-full mb-3">
                <label
                  class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Phone Number
                </label>
                <input
                  type="text"
                  class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="Phone Number"
                  v-model="client_phone"
                />
              </div>

              <div class="text-center mt-6">
                <button
                  @click="saveClient"
                  class="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                  type="button"
                >
                  Create Account
                </button>
              </div>
            </form>
            <div class="flex flex-wrap mt-6 relative">
              <div class="w-1/2">
                <a href="javascript:void(0)" class="text-blueGray-200">
              
                </a>
              </div>
              <div class="w-1/2 text-right">
                <small>Already have an account? </small>
                <router-link to="/auth/login" class="text-blueGray-600 font-bold">
                  <small>Sign in</small>
                </router-link>
              </div>
            </div>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import axios
import axios from "axios";
// to generate id with randomstring
// import cryptoRandomString from 'crypto-random-string';
// var crypto = require("crypto");
var id = Math.random().toString(36).substring(2);
 
export default {
  name: "AddClient",
  data() {
    return {
      client_name: "",
      client_email: "",
      client_password: "",
      client_phone: "",
    };
  },
  methods: {
    // Create New product
    async saveClient() {
      try {
        await axios.post("http://localhost:5000/clients", {
          clientID: id,
          clientName: this.client_name,
          clientEmail: this.client_email,
          clientPassword: this.client_password,
          clientPhone: this.client_phone,
        });
        this.client_name = "";
        this.client_email = "";
        this.client_password = "";
        this.client_phone = "";
        this.$router.push("/auth/register");
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>
