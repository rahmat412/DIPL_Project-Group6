import { createWebHistory, createRouter } from "vue-router";

// layouts
import Admin1 from "@/layouts/Admin_v.vue";
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
import SearchPlace from "@/views/SearchPlace.vue";
import Home from "@/views/Index.vue";
import indexTemp from "@/views/Index_temp.vue";
import alert from "@/views/alert.vue";

// admin menu
import Admin from "@/layouts/Admin.vue";
import Dashboard from "@/views/admin/Dashboard.vue";
import M_Admin from "@/views/admin/ManageAdmin.vue";
import Client from "@/views/admin/ManageClient.vue";
import Owner from "@/views/admin/ManageOwner.vue";
import Place from "@/views/admin/ManagePlace.vue";
import Address from "@/views/admin/ManageAddress.vue";
import Facility from "@/views/admin/ManageFacility.vue";
import Order from "@/views/admin/ManageOrder.vue";

// client menu
import PlaceDetail from "@/views/client/client_viewPlace.vue";
import orderClient from "@/views/client/client_viewOrder.vue";

// owner menu
import orderOwner from "@/views/owner/owner_viewOrder.vue";
import PlaceOwner from "@/views/owner/owner_viewPlace.vue";

// routes
const router = createRouter({
    history: createWebHistory(),
    routes: [{
            path: "/admin1",
            redirect: "/admin1/dashboard",
            component: Admin1,
            beforeEnter: requireAuth,
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
            beforeEnter: requireAuth,
            meta: {
                roles: 'admin'
            },
            children: [{
                    path: "/admin/dashboard",
                    component: Dashboard,
                }, {
                    path: "/admin/admin",
                    component: M_Admin,
                    meta: {
                        roles: 'super-admin'
                    },
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
        }, {
            path: "/landing",
            component: Landing,
            beforeEnter: requireAuth,
            meta: {
                roles: 'owner'
            }
        }, {
            path: "/temp",
            component: indexTemp,
        }, {
            path: "/places",
            component: SearchPlace,
        }, {
            path: "/places/:id",
            component: PlaceDetail,
        }, {
            path: "/ViewOrderClient",
            component: orderClient,
            beforeEnter: requireAuth,
            meta: {
                roles: 'client'
            }
        }, {
            path: "/ViewOrderOwner",
            component: orderOwner,
            beforeEnter: requireAuth,
            meta: {
                roles: 'owner'
            }
        }, {
            path: "/ManagePlace",
            component: PlaceOwner,
            beforeEnter: requireAuth,
            meta: {
                roles: 'owner'
            }
        }, {
            path: "/profile",
            component: Profile,
            beforeEnter: requireAuth,
            meta: {
                roles: 'client'
            }
        }, {
            path: "/alert",
            component: alert,
        }, {
            path: "/",
            component: Home,
        },

    ]
});

function requireAuth(to, from, next) {
    function proceed() {
        if (localStorage.getItem('role') != null) {
            switch (to.meta.roles) {
                case 'client':
                    next();
                    break;
                case 'owner':
                    if (localStorage.getItem('role') <= 2) {
                        next();
                    } else {
                        next({ path: '/alert' });
                    }
                    break;
                case 'admin':
                    if (localStorage.getItem('role') <= 1) {
                        next();
                    } else {
                        next({ path: '/alert' });
                    }
                    break;
                case 'super-admin':
                    if (localStorage.getItem('role') <= 0) {
                        next();
                    } else {
                        next({ path: '/alert' });
                    }
                    break;
                default:
                    next({ path: '/alert' });
                    break;
            }
        } else {
            next({ path: '/alert' });
        }
    }
    if (localStorage.getItem('jwt') == null) {
        next({
            path: '/auth/login'
        })
    } else {
        proceed();
    }
}

export default router;