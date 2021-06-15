<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div class="modal">
        <header class="modal-header">
            <h6 class="text-emerald-500 text-lg font-bold">
                Order Submission
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
                  class="text-left block uppercase text-emerald-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Client Name
                </label>
                <input
                  type="text"
                  class="disabled border-0 px-3 py-3 placeholder-emerald-300 text-emerald-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="Client Name"
                  v-model="client.clientName"
                  disabled
                />
              </div>

              <div class="relative w-full mb-3">
                <label
                  class="text-left block uppercase text-emerald-600 text-xs font-bold mb-2 mt-2"
                  htmlFor="grid-password"
                >
                  Place Name
                </label>
                <input
                  type="text"
                  class="disabled border-0 px-3 py-3 placeholder-emerald-300 text-emerald-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="Place Name"
                  v-model="place.placeName"
                  disabled
                />
              </div>

              <div class="relative w-full mb-3">
                <label
                  class="text-left block uppercase text-emerald-600 text-xs font-bold mb-2 mt-2"
                  htmlFor="grid-password"
                >
                  Place Price / Month
                </label>
                <input
                  type="text"
                  class="disabled border-0 px-3 py-3 placeholder-emerald-300 text-emerald-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="Place Price"
                  v-model="place.placePrice"
                  disabled
                />
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
                  v-model="state.range"
                  :min-date='new Date()'
                  is-range
                  is-expanded
                  />
                <span v-if="v$.range.$error" class="text-sm px-2 text-red-500">{{v$.range.$errors[0].$message}}</span>
              </div>

              <div class="text-center mt-6">
                <footer class="modal-footer">
                <button
                  @click="addOrder()"
                  class="bg-emerald-800 text-white active:bg-emerald-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                  type="button"
                >
                  Order
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
import useValidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { reactive, computed } from 'vue';
import Swal from 'sweetalert2';
import axios from "axios";
export default {
  setup(){
    const state = reactive ({
      range: {
        start: "",
        end: "",
      },
    })
    const rules = computed(() => {
      return {
        range: {
          start: { required },
          end: { required },
        },
      }
    })
    const v$ = useValidate(rules,state)
    return {
      state,
      v$,
    }
  },
  data() {
    return {
      client:{},
      place:{},
      clientid:"",
    };
  },
  props: ['id'],
  created() {
    this.getClient();
    this.getPlace();
  },
  methods: {
    async addOrder() {
      this.v$.$validate()
      if (this.v$.$error) {
        return
      } 
      try {
        await axios.post("http://localhost:5000/order", {
          orderID: Math.random().toString(36).substring(2),
          clientID: this.clientid,
          placeID: this.id,
          orderDate: new Date(),
          orderCheckIn: this.state.range.start,
          orderCheckOut: this.state.range.end,
          orderStatus: "Requested"
        });
        this.sAlert("success","Yeay..","Order Success");
        this.close();
      } catch (err) {
        console.log(err);
        this.sAlert("error","Oops..","Order Failed");
      }
    },
    async getClient() {
      this.clientid = localStorage.getItem('user')
      try {
        const response = await axios.get('http://localhost:5000/client/'+this.clientid);
        this.client = response.data;
      } catch (err) {
        console.log(err);
        this.sAlert("warning","You are not client","Can not order with this account");
      }
    },
    async getPlace() {
      try {
        const response = await axios.get('http://localhost:5000/place/'+this.id);
        this.place = response.data;
      } catch (err) {
        console.log(err);
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
    },
    close() {
      this.$emit('close');
      this.$router.go();
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