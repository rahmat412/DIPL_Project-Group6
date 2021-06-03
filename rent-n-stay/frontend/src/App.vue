<template>
  <div v-on="alertDisplay" id="app">
    <router-view />
  </div>
</template>
<script>
  export default {
    data() {
      return {}
    },
    methods: {
      alertDisplay() {
        if(!this.$router.meta.isAdmin){
          this.$swal({
          title: "Warning",
          text: "You don't have permission to access this page",
          type: 'warning',
          confirmButtonText: 'OK',
          showLoaderOnConfirm: true
          })
        }
      }
    }
  }
</script>