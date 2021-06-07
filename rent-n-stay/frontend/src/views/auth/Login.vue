<template>
  <div class="container mx-auto px-4 h-full">
    <div class="flex content-center items-center justify-center h-full">
      <div class="w-full lg:w-4/12 px-4">
        <div
          class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0"
        >
          <div class="rounded-t mb-0 px-6 py-6">
            <div class="text-center mb-3">
              <h6 class="text-blueGray-500 text-sm font-bold">
                Log in
              </h6>
            </div>
            <hr class="mt-6 border-b-1 border-blueGray-300" />
          </div>
          <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
            <form>
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
                  v-model="email"
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
                  v-model="password"
                />
              </div>
              <div class="text-center mt-6">
                <button
                  @click="LogIn"
                  class="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                  type="button"
                >
                  Log In
                </button>
              </div>
            </form>
            <div class="flex flex-wrap mt-6 relative">
              <div class="w-1/2">
                <a href="javascript:void(0)" class="text-blueGray-200">
              
                </a>
              </div>
              <div class="w-1/2 text-right">
                <small>Don't have an account? </small>
                <router-link to="/auth/register" class="text-blueGray-600 font-bold">
                  <small>Register</small>
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
import axios from "axios";
export default {
  data(){
    return {
      email : "",
      password : "",
    }
  },
  methods : {
    LogIn: function() {
      axios.post("http://localhost:5000/login", {
        email: this.email,
        password: this.password
      })
      .then(response => {   
        let role = response.data.role;
        localStorage.setItem('user',response.data.user);
        localStorage.setItem('role',response.data.role);
        localStorage.setItem('jwt',response.data.token);
        if (localStorage.getItem('jwt') != null){
          this.$emit('loggedIn')
          if(this.$route.params.nextUrl != null){
            this.$router.push(this.$route.params.nextUrl);
          } else {
            if(role == 1){
              this.$router.push("/admin");
            } else if(role == 2){
              this.$router.push("/profile");
            } else if(role == 3){
              this.$router.push("/profile");
            } else {
              this.$router.push("/admin");
            }
          }
        }
      })
      .catch(function (error) {          
        console.error(error.response);
      });
    },
  },
};
</script>
