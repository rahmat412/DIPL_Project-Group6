<template>
  <footer class="relative bg-blueGray-200 pt-8 pb-6">
    <div class="container mx-auto px-4">
      <hr class="my-6 border-blueGray-300" />
      <div
        class="flex flex-wrap items-center md:justify-between justify-center"
      >
        <div class="w-full md:w-4/12 px-4 mx-auto text-center">
          <div class="text-sm text-blueGray-500 font-semibold py-1">
            Copyright © {{ date }}
            <a
              href="https://www.creative-tim.com?ref=vn-footer"
              class="text-blueGray-500 hover:text-blueGray-800"
            >
              Creative Tim
            </a>
            .
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
<script>
export default {
  data() {
    return {
      date: new Date().getFullYear(),
    };
  },
};
</script>
