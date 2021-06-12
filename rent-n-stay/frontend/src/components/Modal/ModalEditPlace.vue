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
                  v-model="state.id"
                  disabled
                />
                <span v-if="v$.id.$error" class="text-left block text-sm px-2 text-red-500">{{v$.id.$errors[0].$message}}</span>
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
                  v-model="state.name"
                />
                <span v-if="v$.name.$error" class="text-left block text-sm px-2 text-red-500">{{v$.name.$errors[0].$message}}</span>
              </div>

              <div class="relative w-full mb-3">
                <label
                  class="text-left block uppercase text-emerald-600 text-xs font-bold mb-2 mt-2"
                  htmlFor="grid-password"
                >
                  Owner Name
                </label>
                <select 
                  v-model="state.ownerid"
                  class="border-0 px-3 py-3 placeholder-emerald-300 text-emerald-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                >
                  <option
                    v-for="owner in owners" :key="owner.ownerID"
                    v-bind:value="owner.ownerID"
                  >
                    {{owner.ownerID}} - {{ owner.ownerName }}
                  </option>
                </select>
                <span v-if="v$.ownerid.$error" class="text-left block text-sm px-2 text-red-500">{{v$.ownerid.$errors[0].$message}}</span>
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
                  v-model="state.price"
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
                  v-model="state.category"
                  class="border-0 px-3 py-3 placeholder-emerald-300 text-emerald-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                >
                  <option
                    v-for="cat in cats" :key="cat"
                    v-bind:value="cat"
                  >
                    {{cat}}
                  </option>
                </select>
                <span v-if="v$.category.$error" class="text-left block text-sm px-2 text-red-500">{{v$.category.$errors[0].$message}}</span>
              </div>

              <div class="relative w-full mb-3">
                <label
                  class="text-left block uppercase text-emerald-600 text-xs font-bold mb-4"
                  htmlFor="grid-password"
                >
                  Place Image
                </label>
                <div v-if="!state.image">
                  <input
                    style="display:none"
                    type="file"
                    @change="selectFile"
                    ref="fileInput"
                  >
                  <a
                    class="bg-emerald-500 text-white active:bg-emerald-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                    @click="$refs.fileInput.click()"
                  >
                    Pick Image 
                  </a>
                  <span v-if="message" class="text-sm px-2 text-red-500">{{message}}</span>
                  <span v-if="v$.image.$error" class="text-left block text-sm px-2 text-red-500">{{v$.image.$errors[0].$message}}</span>
                </div>
                <div v-else class="text-center">
                  <img :src="preview" v-if="preview"/>
                  <img :src="'http://localhost:5000/'+state.image" v-else/>
                  <label
                    class="text-left block uppercase text-emerald-600 text-xs font-bold mb-4"
                  >
                    {{state.image.name}}
                  </label>
                  <a
                    class="bg-emerald-500 text-white active:bg-emerald-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-4 w-full ease-linear transition-all duration-150"
                    @click="removeImage">
                    Remove image
                  </a>
                </div>
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
import useValidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { reactive, computed } from 'vue';
import Swal from 'sweetalert2';
import axios from "axios";
export default {
  setup(){
    const state = reactive ({
      id: "",
      name: "",
      ownerid: "",
      price: "",
      category: "",
      image: "",
    })
    const rules = computed(() => {
      return {
        id: { required },
        name: { required },
        ownerid: { required },
        price:{ required },
        category: { required },
        image: { required },
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
      preview: null,
      message: "",
      temp: "",
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
          this.state.id = response.data.placeID;
          this.state.name = response.data.placeName;
          this.state.ownerid = response.data.ownerID;
          this.state.price = response.data.placePrice;
          this.state.category = response.data.placeCategory;
          this.state.image = response.data.placeImage;
          this.temp = this.state.image
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
      this.v$.$validate()
      if (this.v$.$error) {
        return
      }
      const formData = new FormData();
      formData.append('file', this.state.image);
      const img = await axios.post("http://localhost:5000/upload", formData)
      if(this.state.image==this.temp){
        img.data.filename = this.temp
      }
      try {
        await axios.put('http://localhost:5000/place/'+this.id,
          {
            owner_id: this.state.ownerid,
            place_name: this.state.name,
            place_price: this.state.price,
            place_category: this.state.category,
            place_image: img.data.filename,
          }
        );
        this.sAlert("success","Yeay..","Editing Place Success");
        this.close();
      } catch (err) {
        console.log(err);
        this.sAlert("error","Oops..","Editing Place Failed");
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
      this.$router.go()
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