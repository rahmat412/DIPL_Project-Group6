<template>
  <nav
    class="top-0 fixed z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg bg-white shadow"
  >
    <div
      class="container px-4 mx-auto flex flex-wrap items-center justify-between"
    >
      <div
        class="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start"
      >
        <router-link to="/">
          <a
            class="text-blueGray-700 text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase"
            href="#"
          >
            <img
              alt="..."
              :src="RnS"
              class="max-w-150-px"
            />
          </a>
        </router-link>
        <button
          class="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
          type="button"
          v-on:click="setNavbarOpen"
        >
          <i class="fas fa-bars"></i>
        </button>
      </div>
      <div
        class="lg:flex flex-grow items-center"
        :class="[navbarOpen ? 'block' : 'hidden']"
        id="example-navbar-warning"
      >
        <ul class="flex flex-col lg:flex-row list-none lg:ml-auto">
          <div v-if=is_admin>
            <li class="flex items-center">
              <index-dropdown />
            </li>
          </div>
          
          <div>
            <li class="flex items-center ">
              <router-link to="/" class="text-blueGray-600 font-bold">
                <a
                  class="hover:text-blueGray-500 text-blueGray-700 px-3 py-3 flex items-center text-s uppercase font-bold"
                  target="_blank"
                >
                  Home
                </a>
              </router-link>
            </li>
          </div>

          <div>
            <li class="flex items-center ">
              <router-link to="/places" class="text-blueGray-600 font-bold">
                <a
                  class="hover:text-blueGray-500 text-blueGray-700 px-3 py-3 flex items-center text-s uppercase font-bold"
                  target="_blank"
                >
                  Rent
                </a>
              </router-link>
            </li>
          </div>

          <div v-if="is_client">
            <li class="flex items-center ">
              <router-link to="/ViewOrderClient" class="text-blueGray-600 font-bold">
                <a
                  class="hover:text-blueGray-500 text-blueGray-700 px-3 py-2 flex items-center text-s uppercase font-bold"
                  target="_blank"
                >
                  <i class="fas fa-shopping-bag fa-2x text-blueGray-300"></i>
                </a>
              </router-link>
            </li>
          </div>

          <div v-if="is_owner">
            <li class="flex items-center ">
              <router-link to="/ManagePlace" class="text-blueGray-600 font-bold">
                <a
                  class="hover:text-blueGray-500 text-blueGray-700 px-3 py-3 flex items-center text-s uppercase font-bold"
                  target="_blank"
                >
                  Manage Place
                </a>
              </router-link>
            </li>
          </div>

          <div v-if="is_owner">
            <li class="flex items-center ">
              <router-link to="/ViewOrderOwner" class="text-blueGray-600 font-bold">
                <a
                  class="hover:text-blueGray-500 text-blueGray-700 px-3 py-3 flex items-center text-s uppercase font-bold"
                  target="_blank"
                >
                  <i class="fas fa-shopping-bag fa-2x text-blueGray-300"></i>
                </a>
              </router-link>
            </li>
          </div>

          <div v-if="isLoggedIn">
            <li class="flex items-center ">
              <user-dropdown />
            </li>
          </div>

          <div v-else>
            <li class="flex items-center">
              <auth-dropdown/>
            </li>
          </div>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import IndexDropdown from "@/components/Dropdowns/IndexDropdown.vue";
import UserDropdown from "@/components/Dropdowns/UserDropdown.vue";
import AuthDropdown from "@/components/Dropdowns/AuthDropdown.vue";
import RnS from "@/assets/img/rns_2.png";

export default {
  data() {
    return {
      navbarOpen: false,
      RnS,
    };
  },
  computed : {
      isLoggedIn : function(){ return localStorage.getItem('jwt') != null},
      is_admin : function(){ return (localStorage.getItem('role') == 1) || (localStorage.getItem('role') == 0)},
      is_owner : function(){ return localStorage.getItem('role') == 2},
      is_client : function(){ return localStorage.getItem('role') == 3},
      
  },
  methods: {
    setNavbarOpen: function () {
      this.navbarOpen = !this.navbarOpen;
    },
    async LogOut() {
      localStorage.removeItem('user');
      localStorage.removeItem('role');
      localStorage.removeItem('jwt');
    }
  },
  components: {
    IndexDropdown,
    UserDropdown,
    AuthDropdown
  },
};
</script>
