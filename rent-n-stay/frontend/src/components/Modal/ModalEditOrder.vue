<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div class="modal">
        <header class="modal-header">
            <h6 class="text-emerald-500 text-lg font-bold">
                Edit Order
            </h6>
          <a
            type="button"
            class="btn-close"
            @click="close"
          >
            <i class="fas fa-times"></i>
          </a>
        </header>

        <section class="modal-body">
            <form>
              <div class="relative w-full mb-3">
                <label
                  class="text-left block uppercase text-emerald-600 text-xs font-bold mb-2 mt-2"
                  htmlFor="grid-password"
                >
                  ID
                </label>
                <input
                  type="text"
                  class="disabled border-0 px-3 py-3 placeholder-emerald-300 text-emerald-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="ID"
                  v-model="uid"
                  disabled
                />
              </div>

              <div class="relative w-full mb-3">
                <label
                  class="text-left block uppercase text-emerald-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Client Name
                </label>
                <select 
                  v-model="uclientid"
                  class="border-0 px-3 py-3 placeholder-emerald-300 text-emerald-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                >
                  <option
                    v-for="client in clients" :key="client.clientID"
                    v-bind:value="client.clientID"
                  >
                    {{client.clientID}} - {{ client.clientName }}
                  </option>
                </select>
              </div>

              <div class="relative w-full mb-3">
                <label
                  class="text-left block uppercase text-emerald-600 text-xs font-bold mb-2 mt-2"
                  htmlFor="grid-password"
                >
                  Place Name
                </label>
                <select 
                  v-model="uplaceid"
                  class="border-0 px-3 py-3 placeholder-emerald-300 text-emerald-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                >
                  <option
                    v-for="place in places" :key="place.placeID"
                    v-bind:value="place.placeID"
                  >
                    {{place.placeID}} - {{ place.placeName }}
                  </option>
                </select>
              </div>

              <div class="text-center relative w-full mb-3">
                <label
                  class="text-left block uppercase text-emerald-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Order Check-In & Check-Out
                </label>
                <v-date-picker
                  color="green"
                  v-model="range"
                  :min-date='new Date()'
                  is-range
                  is-expanded
                  />
              </div>

              <div class="relative w-full mb-3">
                <label
                  class="text-left block uppercase text-emerald-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Status
                </label>
                <select 
                  v-model="ustatus"
                  placeholder="Select Owner"
                  class="border-0 px-3 py-3 placeholder-emerald-300 text-emerald-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                >
                  <option
                    v-for="stat in stats" :key="stat"
                    v-bind:value="stat"
                  >
                    {{stat}}
                  </option>
                </select>
              </div>

              <div class="text-center mt-6">
                <footer class="modal-footer">
                <button
                  @click="editOrder()"
                  class="bg-emerald-800 text-white active:bg-emerald-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                  type="button"
                >
                  Edit
                </button>
                </footer>
              </div>
            </form>
        </section>
      </div>
    </div>
  </transition>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      uid: "",
      uplaceid: "",
      uclientid: "",
      range: {
        start: new Date(),
        end: new Date(),
      },
      clients:{},
      places:{},
      ustatus:"",
      stats:['Requested','Accepted','Declined','Cancelled','In Progress','Completed']
    };
  },
  props: ['id'],
  created() {
    this.getOrder();
    this.getClients();
    this.getPlaces();
  },
  methods: {
    getOrder() {
      try {
        axios.get(
          'http://localhost:5000/order/'+this.id
        ).then((response) => {
          this.uid = response.data.orderID;
          this.uclientid = response.data.clientID;
          this.uplaceid = response.data.placeID;
          this.range.start = response.data.orderCheckIn;
          this.range.end = response.data.orderCheckOut;
          this.ustatus = response.data.orderStatus;
        })
      } catch (err) {
        console.log(err);
      }
    },
    async getClients() {
      try {
        const response = await axios.get("http://localhost:5000/client");
        this.clients = response.data;
      } catch (err) {
        console.log(err);
      }
    },
    async getPlaces() {
      try {
        const response = await axios.get("http://localhost:5000/place");
        this.places = response.data;
      } catch (err) {
        console.log(err);
      }
    },
    async editOrder() {
      try {
        await axios.put('http://localhost:5000/order/'+this.id,
          {
            client_id: this.uclientid,
            place_id: this.uplaceid,
            order_date: new Date(),
            order_checkin: this.range.start,
            order_checkout: this.range.end,
            order_status: this.ustatus
          }
        );
        this.$router.go()
      } catch (err) {
        console.log(err);
      }
    },
    close() {
      this.$emit('close');
    },
  },
};
</script>
<style>
  .modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal {
    background: #FFFFFF;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
    border-radius: 5px;
  }

  .modal-header,
  .modal-footer {
    padding: 20px;
    display: flex;
  }

  .modal-header {
    position: relative;
    border-bottom: 1px solid #eeeeee;
    color: #4AAE9B;
    justify-content: space-between;
  }

  .modal-footer {
    border-top: 1px solid #eeeeee;
    flex-direction: column;
  }

  .modal-body {
    position: relative;
    width: 500px;
    padding: 20px 20px;
  }

  .btn-close {
    position: absolute;
    top: 0;
    right: 0;
    border: none;
    font-size: 20px;
    padding: 20px 20px;
    cursor: pointer;
    font-weight: bold;
    color: #4AAE9B;
    background: transparent;
  }

  .modal-fade-enter,
  .modal-fade-leave-to {
    opacity: 0;
  }

  .modal-fade-enter-active,
  .modal-fade-leave-active {
    transition: opacity .5s ease;
  }
</style>