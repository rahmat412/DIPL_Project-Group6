<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div class="modal">
        <header class="modal-header">
            <h6 class="text-emerald-500 text-lg font-bold">
                Edit Place
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
                  class="text-left block uppercase text-emerald-600 text-xs font-bold mb-2 mt-2"
                  htmlFor="grid-password"
                >
                  Place Name
                </label>
                <input
                  type="text"
                  class="border-0 px-3 py-3 placeholder-emerald-300 text-emerald-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="Place Name"
                  v-model="uname"
                />
              </div>

              <div class="relative w-full mb-3">
                <label
                  class="text-left block uppercase text-emerald-600 text-xs font-bold mb-2 mt-2"
                  htmlFor="grid-password"
                >
                  Owner Name
                </label>
                <select 
                  v-model="uownerid"
                  class="border-0 px-3 py-3 placeholder-emerald-300 text-emerald-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                >
                  <option
                    v-for="owner in owners" :key="owner.ownerID"
                    v-bind:value="owner.ownerID"
                  >
                    {{owner.ownerID}} - {{ owner.ownerName }}
                  </option>
                </select>
              </div>

              <div class="relative w-full mb-3">
                <label
                  class="text-left block uppercase text-emerald-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Price
                </label>
                <input
                  type="number"
                  class="border-0 px-3 py-3 placeholder-emerald-300 text-emerald-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="Price"
                  v-model="uprice"
                />
              </div>

              <div class="relative w-full mb-3">
                <label
                  class="text-left block uppercase text-emerald-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Category
                </label>
                <select 
                  v-model="ucategory"
                  class="border-0 px-3 py-3 placeholder-emerald-300 text-emerald-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                >
                  <option
                    v-for="cat in cats" :key="cat"
                    v-bind:value="cat"
                  >
                    {{cat}}
                  </option>
                </select>
              </div>

              <div class="text-center mt-6">
                <footer class="modal-footer">
                <button
                  @click="editPlace()"
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
      uname: "",
      uownerid: "",
      uprice: "",
      ucategory: "",
      cats:["Apartment","Boarding House","Dormitory"],
      owners: {},
    }
  },
  props: ['id'],
  created() {
    this.getPlace();
    this.getOwners();
  },
  methods: {
    async getPlace() {
      try {
        await axios.get(
          'http://localhost:5000/place/'+this.id
        ).then((response) => {
          this.uid = response.data.placeID;
          this.uname = response.data.placeName;
          this.uownerid = response.data.ownerID;
          this.uprice = response.data.placePrice;
          this.ucategory = response.data.placeCategory;
        })
      } catch (err) {
        console.log(err);
      }
    },
    async getOwners() {
      try {
        const response = await axios.get("http://localhost:5000/owner");
        this.owners = response.data;
      } catch (err) {
        console.log(err);
      }
    },
    async editPlace() {
      try {
        await axios.put('http://localhost:5000/place/'+this.id,
          {
            owner_id: this.uownerid,
            place_name: this.uname,
            place_price: this.uprice,
            place_category: this.ucategory,
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