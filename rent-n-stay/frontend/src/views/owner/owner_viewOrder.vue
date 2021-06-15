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
                  Your Order
                </h1>
              </div>
            </div>

            <div class="flex flex-wrap">
              <div class="lg:pt-12 pt-6 w-4/12 px-4 text-center">
                <button
                    class="bg-white text-blueGray-700 active:bg-blueGray-50 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none lg:mr-0 lg:mb-0 ml-0 mb-3 ease-linear transition-all duration-150"
                    type="button"
                    @click="recent"
                >
                    Recent
                </button>
              </div>
              <div class="lg:pt-12 pt-6 w-4/12 px-4 text-center">
                <button
                    class="bg-white text-blueGray-700 active:bg-blueGray-50 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none lg:mr-0 lg:mb-0 ml-0 mb-3 ease-linear transition-all duration-150"
                    type="button"
                    @click="history"
                >
                    History
                </button>
              </div>
            </div>

            <div class="flex flex-wrap">
              <div class="lg:pt-6 pt-6 w-full md:w-4/12 px-4 text-center" v-for="order in orders" :key="order.id">
                <card-order :order="order"/>
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
import CardOrder from "@/components/Cards/CardOrderOwner.vue";
import axios from "axios";

export default {
  components: {
      Navbar,
      FooterComponent,
      CardOrder
    },
  data() {
    return {
      orders: [],
      places: [],
  };
  },
  created() {
    this.recent();
  },
  methods: {
    setOrders(data) {
      this.orders = data;
    },
    async recent() {
      const id = localStorage.getItem('user');
      await axios
        .get('http://localhost:5000/orderActiveOwner/'+id)
        .then((response) => this.setOrders(response.data))
        .catch((error) => console.log(error));
    
    },
    async history() {
      const id = localStorage.getItem('user');
      await axios
        .get('http://localhost:5000/orderHistoryOwner/'+id)
        .then((response) => this.setOrders(response.data))
        .catch((error) => console.log(error));
    },
  }
}
</script>