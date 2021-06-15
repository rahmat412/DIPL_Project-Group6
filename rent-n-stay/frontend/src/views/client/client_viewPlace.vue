<template>
  <div>
  <navbar />
    <main>
      <section class="pb-20 bg-blueGray-200">
        <div
          class="relative pt-16 pb-32 flex content-center items-center justify-center"
        >
            <div class="container mx-auto px-4">
                    <div
                        class="relative flex flex-col min-w-0 break-words bg-white w-full shadow-lg rounded-lg"
                    >
                        <div class="px-4 py-5 flex-auto">
                          <div class="flex flex-wrap">
                            <div class="pt-6 w-full px-4">
                                <h6 class="text-xl font-bold">{{place.placeName}}</h6>
                            </div>
                            <div class="pt-6 w-full px-4">
                                <img :src="'http://localhost:5000/'+place.placeImage" class="card-img-top" alt="..." />
                            </div>
                            <div class="lg:pt-6 pt-6 w-full px-4">
                                <p class="text-blueGray-500 font-bold">
                                    Price: Rp. {{place.placePrice}}
                                </p>
                                <p class="text-blueGray-500 font-bold">
                                    Type: {{place.placeCategory}}
                                </p>
                                <p class="text-blueGray-500 font-bold">
                                    Location: {{address.addressDistrict}}, {{address.addressRegency}}
                                </p>
                            </div>
                            <div class="pt-6 w-full md:w-4/12 px-4">
                              <p class="text-blueGray-500 font-bold">
                                General Facility:
                              </p>
                            </div>
                            <div class="w-full px-4" v-for="facility in facilities" :key="facility.facilityID">
                              <p v-if="facility.facilityType=='General Facility'" class="text-blueGray-500 font-semibold">
                                {{facility.facilityName}}
                              </p>
                            </div>
                            <div class="pt-6 w-full md:w-4/12 px-4">
                              <p class="text-blueGray-500 font-bold">
                                Room Facility:
                              </p>
                            </div>
                            <div class="w-full px-4" v-for="facility in facilities" :key="facility.facilityID">
                              <p v-if="facility.facilityType=='Room Facility'" class="text-blueGray-500 font-semibold">
                                {{facility.facilityName}}
                              </p>
                            </div>
                            <div class="pt-6 w-4/12 px-4">
                              <p class="text-blueGray-500 font-bold">
                                Parking Facility:
                              </p>
                            </div>
                            <div class="w-full px-4" v-for="facility in facilities" :key="facility.facilityID">
                              <p v-if="facility.facilityType=='Parking Facility'" class="text-blueGray-500 font-semibold">
                                {{facility.facilityName}}
                              </p>
                            </div>
                            <div class="lg:pt-6 pt-6 w-full px-4 text-center">
                              <a 
                                class="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" 
                                type="button"
                                href="javascript:void(0);" 
                                @click="showModalAdd()">
                                Submit Order
                              </a>
                            </div>
                            
                          </div>
                        </div>
                </div>
            </div>
        </div>
        <ModalAdd
            :id="placeid"
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
import ModalAdd from '@/views/client/client_submitOrder.vue';
import axios from "axios";

export default {
  components: {
    Navbar,
    FooterComponent,
    ModalAdd
  },
  data() {
    return {
      place: [],
      address: [],
      facilities: [],
      placeid:"",
      isModalAddVisible: false,
      isModalEditVisible: false,
    };
  },
  created() {
    this.getPlace();
  },
  methods:{
    showModalAdd() {
      this.isModalAddVisible = true;
    },
    closeModalAdd() {
      this.isModalAddVisible = false;
    },
    async getPlace(){
        this.placeid = this.$route.params.id;
        await axios
        .get("http://localhost:5000/place/" + this.placeid)
        .then((response) => {this.place = response.data;})
        .catch((error) => console.log(error));
        await axios
        .get("http://localhost:5000/addressPlace/" + this.placeid)
        .then((response) => {this.address = response.data;})
        .catch((error) => console.log(error));
        await axios
        .get("http://localhost:5000/facilityPlace/" + this.placeid)
        .then((response) => {this.facilities = response.data;})
        .catch((error) => console.log(error));
    },
  },
};
</script>