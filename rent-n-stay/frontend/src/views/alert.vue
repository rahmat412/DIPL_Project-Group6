<template>
  <div>
  </div>
</template>
<script>
import Swal from 'sweetalert2';
export default {
  created() {
    this.sAlert();
  },
  methods: {
   sAlert(){
     Swal.fire({
      icon: "warning",
      title: "Are you lost?",
      text: "You don't have permission to access this page",
     })
     this.$router.push("/")
   }
  },
};
</script>
