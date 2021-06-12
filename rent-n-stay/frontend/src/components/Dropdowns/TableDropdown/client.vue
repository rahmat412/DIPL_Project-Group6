<template>
  <div>
    <a
      class="text-blueGray-500 py-1 px-3"
      href=""
      ref="btnDropdownRef"
      v-on:click="toggleDropdown($event)"
    >
      <i class="fas fa-ellipsis-v"></i>
    </a>
    <div
      ref="popoverDropdownRef"
      class="bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
      v-bind:class="{
        hidden: !dropdownPopoverShow,
        block: dropdownPopoverShow,
      }"
    >
      <a
        href="javascript:void(0);"
        @click="showModalEdit()"
        class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
      >
        <i class="fas fa-edit"></i>
        Edit
      </a>
      
      <a
        href=""
        @click="deleteClient(id)"
        class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
      >
        <i class="fas fa-trash"></i>
        Delete
      </a>
    </div>
    <ModalEdit
      :id="id"
      v-show="isModalEditVisible"
      @close="closeModalEdit"
    />
  </div>
</template>
<script>
import { createPopper } from "@popperjs/core";
import ModalEdit from '@/components/Modal/ModalEditClient.vue';
import Swal from 'sweetalert2';
import axios from "axios";
export default {
  data() {
    return {
      dropdownPopoverShow: false,
      isModalEditVisible: false,
    };
  },
  components: {
    ModalEdit,
  },
  props:['id'],
  methods: {
    showModalEdit() {
      this.isModalEditVisible = true;
    },
    closeModalEdit() {
      this.isModalEditVisible = false;
    },
    toggleDropdown: function (event) {
      event.preventDefault();
      if (this.dropdownPopoverShow) {
        this.dropdownPopoverShow = false;
      } else {
        this.dropdownPopoverShow = true;
        createPopper(this.$refs.btnDropdownRef, this.$refs.popoverDropdownRef, {
          placement: "bottom-start",
        });
      }
    },
    // Delete Client
    async deleteClient(id) {
      try {
        await axios.delete(`http://localhost:5000/client/${id}`);
        this.sAlert("success","Yeay..","Deleting Client Success");
      } catch (err) {
        console.log(err);
        this.sAlert("error","Oops..","Deleting Client Failed");
      }
    },
    sAlert: function(ico, tit, txt) {
      Swal.fire({
        icon: ico,
        title: tit,
        text: txt,
        showConfirmButton: false,
        timer: 2000
      });
    },
  },
};
</script>
