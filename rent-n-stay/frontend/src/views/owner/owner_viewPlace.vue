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
                  Manage your Places
                </h1>
              </div>
            </div>
            
            <div class="flex flex-wrap">
                <div class=" w-full md:w-12/12 px-4">
                    <button @click="showModalAdd()" class="mt-4 bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
                            <i class="fas fa-plus"></i> Add Place
                    </button>
                </div>
            </div>

            <div class="flex flex-wrap">
              <div class="lg:pt-6 pt-6 w-full md:w-4/12 px-4 text-center" v-for="place in places" :key="place.id">
                <card-place :place="place"/>
              </div>
            </div>
            
          </div>
        </div>
        <ModalAdd
            v-show="isModalAddVisible"
            @close="closeModalAdd"
        />
      </section>
    </main>  
  <footer-component />
  </div>
</template>

<script>
import Navbar from "@/components/Navbars/IndexNavbar.vue";
import FooterComponent from "@/components/Footers/Footer.vue";
import CardPlace from "@/components/Cards/CardEditPlace.vue";
import ModalAdd from '@/components/Modal/ModalAddPlace.vue';
import axios from "axios";

export default {
  components: {
    Navbar,
    FooterComponent,
    ModalAdd,
    CardPlace
  },
  data() {
    return {
      places: [],
      isModalAddVisible: false,
    };
  },
  created() {
    this.mounted();
  },
  methods: {
    showModalAdd() {
      this.isModalAddVisible = true;
    },
    closeModalAdd() {
      this.isModalAddVisible = false;
    },
    setPlaces(data) {
      this.places = data;
    },
    async mounted() {
      const id = localStorage.getItem('user')
      await axios
        .get('http://localhost:5000/placeOwner/'+id)
        .then((response) => this.setPlaces(response.data))
        .catch((error) => console.log(error));
    },
  },
};
</script>
