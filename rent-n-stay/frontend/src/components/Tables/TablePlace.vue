<template>
  <div
    class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded"
    :class="[ 'bg-emerald-900 text-white']"
  >
    <div class="rounded-t mb-0 px-4 py-3 border-0">
      <div class="flex flex-wrap items-center">
        <div class="relative w-full px-4 max-w-full flex-grow flex-1">
          <h3
            class="font-semibold text-lg"
            :class="['text-white']"
          >
            Manage Place
          </h3>
        </div>
        <div class="relative w-full px-4 text-right max-w-full flex-grow flex-1">
          <a href="javascript:void(0);" @click="showModalAdd()">
            <i class="fas fa-plus-square fa-2x text-blueGray-300"></i>
          </a>
        </div>
      </div>
    </div>
    <div class="block w-full overflow-x-auto">
      <!-- Projects table -->
      <table class="items-center w-full bg-transparent border-collapse">
        <thead>
          <tr>
            <th
              class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
              :class="[
                'bg-emerald-800 text-emerald-300 border-emerald-700',
              ]"
            >
              ID
            </th>
            <th
              class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
              :class="[
                'bg-emerald-800 text-emerald-300 border-emerald-700',
              ]"
            >
              Place Name
            </th>
            <th
              class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
              :class="[
                'bg-emerald-800 text-emerald-300 border-emerald-700',
              ]"
            >
              Owner Name
            </th>
            <th
              class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
              :class="[
                'bg-emerald-800 text-emerald-300 border-emerald-700',
              ]"
            >
              Place Price
            </th>
            <th
              class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
              :class="[
                'bg-emerald-800 text-emerald-300 border-emerald-700',
              ]"
            >
              Place Category
            </th>
            <th
              class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
              :class="[
                'bg-emerald-800 text-emerald-300 border-emerald-700',
              ]"
            >
              Place Image
            </th>
            <th
              class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
              :class="[
                'bg-emerald-800 text-emerald-300 border-emerald-700',
              ]"
            ></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="place in places" :key="place.placeID">
            <td
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
            >
              {{place.placeID}}
            </td>
            <td
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
            >
              {{place.placeName}}
            </td>
            <td
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
            >
              {{place.ownerName}}
            </td>
            <td
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
            >
              {{place.placePrice}}
            </td>
            <td
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
            >
              {{place.placeCategory}}
            </td>
            <td
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
            >
              {{place.placeImage}}
            </td>
            <td
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right"
            >
                <TableDropdown :id="place.placeID"/>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <ModalAdd
      v-show="isModalAddVisible"
      @close="closeModalAdd"
    />
  </div>
</template>

<script>
import axios from "axios";
import TableDropdown from "@/components/Dropdowns/TableDropdown/place.vue";
import ModalAdd from '@/components/Modal/ModalAddPlace.vue';

export default {
  components: {
    ModalAdd,
    TableDropdown,
  },
  data() {
    return {
      isModalAddVisible: false,
      dropdownPopoverShow: false,
      places: {}, 
    };
  },
  created() {
    this.getPlaces();
  },
  methods: {
    showModalAdd() {
      this.isModalAddVisible = true;
    },
    closeModalAdd() {
      this.isModalAddVisible = false;
    },
    // Get All Places
    async getPlaces() {
      try {
        const response = await axios.get("http://localhost:5000/place");
        this.places = response.data;
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>