<template>
  <div>
    <navbar />
    <main class="profile-page">
      <section class="relative block h-600-px">
        <div
          class="absolute top-0 w-full h-full bg-center bg-cover"
          style="
            background-image: url('https://apollo-singapore.akamaized.net/v1/files/m6n4cy860n2k3-ID/image;s=850x0');
          "
        >
          <span
            id="blackOverlay"
            class="w-full h-full absolute opacity-50 bg-black"
          ></span>
        </div>
        <div
          class="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
          style="transform: translateZ(0);"
        >
          <svg
            class="absolute bottom-0 overflow-hidden"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
            <polygon
              class="text-blueGray-200 fill-current"
              points="2560 0 2560 100 0 100"
            ></polygon>
          </svg>
        </div>
      </section>
      <section class="relative py-16 bg-blueGray-200">
        <div class="container mx-auto px-4">
          <div
            class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64"
          >
            <div class="px-0">
                <div
    class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0"
  >
    <div class="rounded-t bg-white mb-0 px-6 py-6">
      <div class="text-center flex justify-between">
        <h6 class="text-blueGray-700 text-xl font-bold">My Account</h6>
        <button
          @click="updateProfile"
          class="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
          type="button"
        >
          Edit
        </button>
      </div>
    </div>
    <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
      <form>
        <h6 class="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
        </h6>
        
        <div class="flex flex-wrap">
          <div class="w-full lg:w-6/12 px-4">
            <div class="relative w-full mb-3">
              <label
                class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                Username
              </label>
              <input
                type="text"
                class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                placeholder="Username"
                v-model.lazy="uname"
                name="uname"
                required
              />
            </div>
          </div>
          <div class="w-full lg:w-6/12 px-4">
            <div class="relative w-full mb-3">
              <label
                class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                Email address
              </label>
              <input
                type="text"
                class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                placeholder="Email"
                v-model.lazy="uemail"
                name="uemail"
                required
              />
            </div>
          </div>
          <div class="w-full lg:w-6/12 px-4">
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
                v-model.lazy="uphone"
                name="uphone"
                required
              />
            </div>
          </div>
          <div class="w-full lg:w-6/12 px-4">
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
                  v-model.lazy="upassword"
                  name="upassword"
                  required
                />
            </div>
          </div>
        </div>

      </form>
    </div>
  </div>
            </div>
          </div>
        </div>
      </section>
    </main>
    <footer-component />
  </div>
</template>
<script>
import Navbar from "@/components/Navbars/IndexNavbar.vue";
import FooterComponent from "@/components/Footers/Footer.vue";
import axios from "axios";

export default {
  data() {
    return {
      uname: "",
      uemail: "",
      upassword: "",
      uphone: "",
    };
  },
  components: {
    Navbar,
    FooterComponent,
  },
  created: function () {
    this.getProfile();
  },
  methods: {
    // Get Product By Id
    async getProfile() {
      try {
        var role = localStorage.getItem('role');
        var id = localStorage.getItem('user');
        if (role==1){
          axios.get(
            'http://localhost:5000/admin/'+id
          ).then((response) => {
              this.uname = response.data.adminName;
              this.uemail = response.data.adminEmail;
              this.upassword = response.data.adminPassword;
              this.uphone = response.data.adminPhone;
            })
        } else if (role==2){
          axios.get(
            'http://localhost:5000/owner/'+id
          ).then((response) => {
              this.uname = response.data.ownerName;
              this.uemail = response.data.ownerEmail;
              this.upassword = response.data.ownerPassword;
              this.uphone = response.data.ownerPhone;
            })
        } else if (role==3){
          axios.get(
            'http://localhost:5000/client/'+id
          ).then((response) => {
              this.uname = response.data.clientName;
              this.uemail = response.data.clientEmail;
              this.upassword = response.data.clientPassword;
              this.uphone = response.data.clientPhone;
            })
        } else {
          this.uname = "admin";
          this.uemail = "admin";
          this.upassword = "admin";
          this.uphone = "+62";
        }
      } catch (err) {
        console.log(err);
      }
    },
 
    // Update product
    async updateProfile() {
      try {
        var role = localStorage.getItem('role');
        var id = localStorage.getItem('user');
        var api;
        if (role==1){
          api='http://localhost:5000/admin/'+id;
        } else if (role==2){
          api='http://localhost:5000/owner/'+id;
        } else if (role==3){
          api='http://localhost:5000/client/'+id;
        }
        await axios.put(api,
          {
            name: this.uname,
            email: this.uemail,
            password: this.upassword,
            phone: this.uphone,
          }
        );
        this.$router.go()
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>
