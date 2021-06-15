<template>
    
        <div
            class="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg"
        >
            <div class="px-4 py-5 flex-auto">
                <h6 class="text-xl font-bold">Order ID: {{order.orderID}}</h6>
                <p class="text-blueGray-500 font-semibold">
                    Order Date: {{order.orderDate.substring(0,10)}}
                </p>
                <p class="text-blueGray-500 font-semibold">
                    Check-In: {{order.orderCheckIn.substring(0,10)}}
                </p>
                <p class="text-blueGray-500 font-semibold">
                    Check-Out: {{order.orderCheckOut.substring(0,10)}}
                </p>
                <p class="text-blueGray-500 font-semibold">
                    Client Name: {{client.clientName}} 
                </p>
                <p class="text-blueGray-500 font-semibold">
                    Client Phone Number: {{client.clientPhone}} 
                </p>
                <p class="text-blueGray-500 font-semibold">
                    Place Name: {{place.placeName}}
                </p>
                <p class="text-blueGray-500 font-semibold">
                    Price: Rp. {{place.placePrice}}
                </p>
                <p class="text-blueGray-500 font-semibold">
                    Status: {{order.orderStatus}}
                </p>
                <router-link :to="'/places/'+order.placeID">
                    <button class="mt-4 bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
                        <i class="fas fa-eye"></i> View Place
                    </button>
                </router-link>
                <button v-if="order.orderStatus=='Requested'" @click="status('Accepted')" class="bg-yellow-500 text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
                    <i class="fas fa-check"></i> Accept
                </button>
                <button v-if="order.orderStatus=='Requested'" @click="status('Declined')" class="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
                    <i class="fas fa-ban"></i> Declined
                </button>
                <button v-if="order.orderStatus=='Accepted'" @click="status('In Progress')" class="bg-lightBlue-500 text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
                    <i class="fas fa-clock"></i> In Progress
                </button>
                <button v-if="order.orderStatus=='In Progress'" @click="status('Completed')" class="bg-emerald-500 text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
                    <i class="fas fa-check"></i> Complete
                </button>
            </div>
        </div>  
</template>
<script>
import Swal from 'sweetalert2';
import axios from "axios";
export default {
    props: ["order"],
    data() {
        return {
            place: [],
            client: [],
        };
    },
    created() {
        this.getPlace(),
        this.getClient()
    },
    methods: {
        async status(stats){
            try {
                await axios.put('http://localhost:5000/order/'+this.order.orderID,
                {
                    client_id: this.order.clientID,
                    place_id: this.order.placeID,
                    order_checkin: this.orderCheckin,
                    order_checkout: this.orderCheckOut,
                    order_status: stats
                });
                this.sAlert("success","Yeay..","Updating Order Success");
                this.$router.go()
            } catch (err) {
                console.log(err);
                this.sAlert("error","Oops..","Updating Order Failed");
            }
        },
        async getPlace(){
            await axios
            .get("http://localhost:5000/place/" + this.order.placeID)
            .then((response) => this.place = response.data)
            .catch((error) => console.log(error));
        },
        async getClient(){
            await axios
            .get("http://localhost:5000/client/" + this.order.clientID)
            .then((response) => this.client = response.data)
            .catch((error) => console.log(error));
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
    },
};
</script>