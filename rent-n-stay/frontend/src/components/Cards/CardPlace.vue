<template>
    
        <div
            class="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg"
        >
            <div class="px-4 py-5 flex-auto">
                <div
                    class="text-white p-3 text-center inline-flex items-center justify-center"
                >
                    <img :src="'http://localhost:5000/'+place.placeImage" class="card-img-top" alt="..." />
                </div>
                <h6 class="text-xl font-bold">{{place.placeName}}</h6>
                <p class="text-blueGray-500 font-semibold">
                    Price: Rp. {{place.placePrice}}
                </p>
                <p class="text-blueGray-500 font-semibold">
                    Type: {{place.placeCategory}}
                </p>
                <p class="text-blueGray-500 font-semibold">
                    Location: {{place.addressDistrict}}, {{place.addressRegency}}
                </p>
                <router-link :to="'/places/'+place.placeID">
                    <button class="mt-4 bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
                        Rent
                    </button>
                </router-link>
            </div>
        </div>  
</template>
<script>
export default {
    props: ["place"],
    data() {
        return {
        };
    },
    methods: {

    },
};
</script>