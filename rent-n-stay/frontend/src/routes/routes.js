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
import Home from "@/views/Index.vue";
import indexTemp from "@/views/Index_temp.vue";

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
            path: "/profile",
            component: Profile,
            beforeEnter: requireAuth,
            meta: {
                roles: 'client'
            }
        }, {
            path: "/",
            component: Home,
        },
        { path: "/:pathMatch(.*)*", redirect: "/" },
    ]
});

function requireAuth(to, from, next) {
    function proceed() {
        if (localStorage.getItem('jwt') != null) {
            if (localStorage.getItem('role') != null) {
                switch (to.meta.roles) {
                    case 'client':
                        next();
                        break;
                    case 'owner':
                        if (localStorage.getItem('role') <= 2) {
                            next();
                        } else {
                            next({ component: Home });
                        }
                        break;
                    case 'admin':
                        if (localStorage.getItem('role') <= 1) {
                            next();
                        } else {
                            next({ component: Home });
                        }
                        break;
                    case 'super-admin':
                        if (localStorage.getItem('role') <= 0) {
                            next();
                        } else {
                            next({ component: Home });
                        }
                        break;
                    default:
                        next({ component: Home });
                        break;
                }
            } else {
                next({ component: Home });
            }
        } else {
            next({ component: Home });
        }
    }
    if (localStorage.getItem('jwt') == null) {
        next({
            path: '/auth/login',
            params: { nextUrl: to.fullPath }
        })
    } else {
        proceed();
    }
}

export default router;