<template>
  <div v-on="alertDisplay()" id="app">
    <router-view />
  </div>
</template>
<script>
import { useSwal } from "@/plugins/useSwal.js";
export default {
  data() {
    return {}
  },
  methods : {
    alertDisplay: function(){
      const Swal = useSwal();
      // var meta = this.$router.meta.role;
      var str = "hello";
      if (localStorage.getItem('role') == 4){
        Swal.fire({
          icon: "error",
          title: str,
          text: "Something went wrong!",
          showConfirmButton: false,
          timer: 1000
        });
      }
    } 
  }
}
</script>