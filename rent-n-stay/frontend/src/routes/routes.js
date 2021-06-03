import { createWebHistory, createRouter } from "vue-router";

// layouts
import Admin1 from "@/layouts/admin_v.vue";
import Auth from "@/layouts/Auth.vue";

// views for Admin layout
import Dashboard1 from "@/views/admin_/Dashboard.vue";
import Settings from "@/views/admin_/Settings.vue";
import Tables from "@/views/admin_/Tables.vue";
import Maps from "@/views/admin_/Maps.vue";

// views for Auth layout
import Login from "@/views/auth/Login.vue";
import Register from "@/views/auth/Register.vue";

// views without layouts
import Landing from "@/views/Landing.vue";
import Profile from "@/views/Profile.vue";
import Home from "@/views/Index.vue";
import indexTemp from "@/views/Index_temp.vue";

//coba
import Admin from "@/layouts/Admin.vue";
import Dashboard from "@/views/admin/Dashboard.vue";
import Client from "@/views/admin/ManageClient.vue";
import Owner from "@/views/admin/ManageOwner.vue";
import Place from "@/views/admin/ManagePlace.vue";
import Address from "@/views/admin/ManageAddress.vue";
import Facility from "@/views/admin/ManageFacility.vue";
import Order from "@/views/admin/ManageOrder.vue";

// routes

const router = createRouter({
    history: createWebHistory(),
    routes: [{
        path: "/admin1",
        redirect: "/admin1/dashboard",
        component: Admin1,
        children: [{
                path: "/admin1/dashboard",
                component: Dashboard1,
            },
            {
                path: "/admin1/settings",
                component: Settings,
            },
            {
                path: "/admin1/tables",
                component: Tables,
            },
            {
                path: "/admin1/maps",
                component: Maps,
            },
        ],
    }, {
        path: "/admin",
        redirect: "/admin/dashboard",
        component: Admin,
        children: [{
                path: "/admin/dashboard",
                component: Dashboard,
            }, {
                path: "/admin/client",
                component: Client,
            },
            {
                path: "/admin/owner",
                component: Owner,
            },
            {
                path: "/admin/place",
                component: Place,
            },
            {
                path: "/admin/address",
                component: Address,
            },
            {
                path: "/admin/facility",
                component: Facility,
            },
            {
                path: "/admin/Order",
                component: Order,
            },
        ],
        meta: {
            requiresAuth: true,
            isAdmin: true,
        }
    }, {
        path: "/auth",
        redirect: "/auth/login",
        component: Auth,
        children: [{
                path: "/auth/login",
                component: Login,
            },
            {
                path: "/auth/register",
                component: Register,
            },
        ],
        meta: {
            guest: true,
        }
    }, {
        path: "/landing",
        component: Landing,
        meta: {
            requiresAuth: true,
        }
    }, {
        path: "/temp",
        component: indexTemp,
    }, {
        path: "/profile",
        component: Profile,
        meta: {
            requiresAuth: true,
        }
    }, {
        path: "/",
        component: Home,
    }]
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (localStorage.getItem('jwt') == null) {
            next({
                path: '/auth/login',
                params: { nextUrl: to.fullPath }
            })
        } else {
            let role = JSON.parse(localStorage.getItem('role'))
            if (to.matched.some(record => record.meta.isAdmin)) {
                if (role == 1) {
                    next()
                } else {
                    if (to.matched.some(record => record.meta.isOwner)) {
                        if (role == 2) {
                            next()
                        } else {
                            if (role == 3) {
                                next()
                            } else {
                                next({ component: Home })
                            }
                        }
                    }
                }
            } else {
                next()
            }
        }
    } else if (to.matched.some(record => record.meta.guest)) {
        if (localStorage.getItem('jwt') == null) {
            next()
        } else {
            next({
                component: Home
            })
        }
    } else {
        next()
    }
})

export default router;