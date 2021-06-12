<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div class="modal">
        <header class="modal-header">
            <h6 class="text-emerald-500 text-lg font-bold">
                Edit Owner
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
                  Name
                </label>
                <input
                  type="text"
                  class="border-0 px-3 py-3 placeholder-emerald-300 text-emerald-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="Name"
                  v-model="state.name"
                />
                <span v-if="v$.name.$error" class="text-left block text-sm px-2 text-red-500">{{v$.name.$errors[0].$message}}</span>
              </div>

              <div class="relative w-full mb-3">
                <label
                  class="text-left block uppercase text-emerald-600 text-xs font-bold mb-2 mt-2"
                  htmlFor="grid-password"
                >
                  Email
                </label>
                <input
                  type="email"
                  class="border-0 px-3 py-3 placeholder-emerald-300 text-emerald-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="Email"
                  v-model="state.email"
                />
                <span v-if="v$.email.$error" class="text-left block text-sm px-2 text-red-500">{{v$.email.$errors[0].$message}}</span>
              </div>

              <div class="relative w-full mb-3">
                <label
                  class="text-left block uppercase text-emerald-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Password
                </label>
                <input
                  type="password"
                  class="border-0 px-3 py-3 placeholder-emerald-300 text-emerald-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="Password"
                  v-model="state.password"
                />
                <span v-if="v$.password.$error" class="text-left block text-sm px-2 text-red-500">{{v$.password.$errors[0].$message}}</span>
              </div>

              <div class="relative w-full mb-3">
                <label
                  class="text-left block uppercase text-emerald-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Phone Number
                </label>
                <input
                  type="text"
                  class="border-0 px-3 py-3 placeholder-emerald-300 text-emerald-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="Phone Number"
                  v-model="state.phone"
                />
                <span v-if="v$.phone.$error" class="text-left block text-sm px-2 text-red-500">{{v$.phone.$errors[0].$message}}</span>
              </div>

              <div class="text-center mt-6">
                <footer class="modal-footer">
                <button
                  @click="editOwner()"
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
import { required, email, minLength } from '@vuelidate/validators';
import { reactive, computed } from 'vue';
import Swal from 'sweetalert2';
import axios from "axios";
export default {
  setup(){
    const state = reactive ({
      id: "",
      name: "",
      email: "",
      password: "",
      phone: "",
    })
    const rules = computed(() => {
      return {
        id: { required },
        name: { required },
        email: { required, email },
        password: { required, minLength: minLength(6) },
        phone: { required },
      }
    })
    const v$ = useValidate(rules,state)
    return {
      state,
      v$,
    }
  },
  props: ['id'],
  created() {
    this.getOwner();
  },
  methods: {
    async getOwner() {
      this.v$.$validate()
      if (this.v$.$error) {
        return
      } 
      try {
        await axios.get(
          'http://localhost:5000/owner/'+this.id
        ).then((response) => {
          this.state.id = response.data.ownerID;
          this.state.name = response.data.ownerName;
          this.state.email = response.data.ownerEmail;
          this.state.password = response.data.ownerPassword;
          this.state.phone = response.data.ownerPhone;
        })
      } catch (err) {
        console.log(err);
      }
    },
    async editOwner() {
      try {
        await axios.put('http://localhost:5000/owner/'+this.id,
          {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            phone: this.state.phone,
          }
        );
        this.sAlert("success","Yeay..","Editing Owner Success");
        this.close();
      } catch (err) {
        console.log(err);
        this.sAlert("error","Oops..","Editing Owner Failed");
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