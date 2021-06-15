<template>
  <div>
  <navbar />
    <main>
      <section class="pb-20 bg-blueGray-200">
        <div
          class="relative pt-16 pb-32 flex content-center items-center justify-center"
        >
          <div class="container mx-auto px-4">
            
            <div class="flex flex-wrap">
              <div class="lg:pt-12 pt-6 w-full md:w-12/12 px-4">
                <h1 class="text-blueGray-800 font-bold text-4xl text-center">
                  Find your best place...
                </h1>
              </div>
            </div>

            <div class="flex flex-wrap">
              <div class="lg:pt-12 pt-6 w-10/12 px-4 text-center">
                <span
                  class="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3"
                >
                  <i class="fas fa-search"></i>
                </span>
                <input
                  v-model="search"
                  type="text"
                  placeholder="Search"
                  class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full pl-10"
                />
              </div>
              <div class="lg:pt-12 pt-6 w-2/12 px-4 text-center flex-1">
                <select
                  class="border-0 px-3 py-3 placeholder-blueGray-300 text-emerald-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  v-model="key"
                  @change="mounted(key)"
                >
                  <option disabled>
                    Sort By
                  </option>
                  <option value="all">
                    All
                  </option>
                  <option value="asc">
                    Price - Low to High
                  </option>
                  <option value="desc">
                    Price - High to Low
                  </option>
                </select>
              </div>
            </div>
              
            <div class="flex flex-wrap">
              <div class="lg:pt-6 pt-6 w-full md:w-4/12 px-4 text-center" v-for="place in places" :key="place.id">
                <card-place :place="place"/>
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
import CardPlace from "@/components/Cards/CardPlace.vue";
import axios from "axios";

export default {
  components: {
    Navbar,
    FooterComponent,
    CardPlace
  },
  data() {
    return {
      places: [],
      search: "",
      key: "",
    };
  },
  created() {
    this.mounted("all");
  },
  methods: {
    setPlaces(data) {
      this.places = data;
    },
    async searchPlace() {
      await axios
      .get('http://localhost:5000/placeSearch/'+this.search)
      .then((response) => this.setPlaces(response.data))
      .catch((error) => console.log(error));
    },
    async mounted(key) {
      await axios
        .get('http://localhost:5000/placeKey/'+key)
        .then((response) => this.setPlaces(response.data))
        .catch((error) => console.log(error));
    },
  },
};
</script>
