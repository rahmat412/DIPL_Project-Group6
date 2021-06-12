<template>
  <div class="container mx-auto px-4 h-full">
    <div class="flex content-center items-center justify-center h-full">
      <div class="w-full lg:w-6/12 px-4">
        <div
          class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0"
        >
          <div class="rounded-t mb-0 px-6 py-6">
            <div class="text-center mb-3">
              <h6 class="text-blueGray-500 text-lg font-bold">
                Register
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
                  v-model="state.name"
                />
                <span v-if="v$.name.$error" class="text-sm px-2 text-red-500">{{v$.name.$errors[0].$message}}</span>
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
                  v-model="state.email"
                />
                <span v-if="v$.email.$error" class="text-sm px-2 text-red-500">{{v$.email.$errors[0].$message}}</span>
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
                  v-model="state.password"
                />
                <span v-if="v$.password.$error" class="text-sm px-2 text-red-500">{{v$.password.$errors[0].$message}}</span>
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
                  v-model="state.phone"
                />
                <span v-if="v$.phone.$error" class="text-sm px-2 text-red-500">{{v$.phone.$errors[0].$message}}</span>
              </div>

              <div class="text-center mt-6">
                <button
                  @click="register"
                  class="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                  type="button"
                >
                  Create Account
                </button>
              </div>
            </form>
            <div class="flex flex-wrap mt-6 relative">
              <div class="w-full text-right">
                <small>Already have an account? </small>
                <router-link to="/auth/login" class="text-blueGray-600 font-bold">
                  <small>Log in</small>
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
import useValidate from '@vuelidate/core';
import { required, email, minLength } from '@vuelidate/validators';
import { reactive, computed } from 'vue';
import Swal from 'sweetalert2';
import axios from 'axios';
export default {
  setup(){
    const state = reactive ({
      name: "",
      email: "",
      password: "",
      phone: "",
    })
    const rules = computed(() => {
      return {
        name: { required },
        email: { required, email },
        password: { required, minLength: minLength(6) },
        phone: { required },
      }
    })
    const v$ = useValidate(rules,state)
    return {
      state,
      v$,
    }
  },
  methods: {
    // Create New account
    async register() {
      this.v$.$validate()
      if (this.v$.$error) {
        return
      }   
      try {
        await axios.post("http://localhost:5000/register", {
          clientID: Math.random().toString(36).substring(2),
          clientName: this.state.name,
          clientEmail: this.state.email,
          clientPassword: this.state.password,
          clientPhone: this.state.phone,
        });
        this.sAlert("success","Yeay..","Register Success")
        this.$router.push("/auth/login");
      } catch (err) {
        console.log(err);
        this.sAlert("error","Oops..","The email has been registered")
      }
    },
    sAlert: function(ico, tit, txt) {
      Swal.fire({
        icon: ico,
        title: tit,
        text: txt,
        showConfirmButton: false,
        timer: 1500
      });
    }
  },
};
</script>
