// import express
import express from "express";

// import function from controller
import { showAdmin, showAdminById, createAdmin, updateAdmin, deleteAdmin } from "../controllers/admin_c.js";
import { showOwner, showOwnerById, createOwner, updateOwner, deleteOwner } from "../controllers/owner_c.js";
import { showClient, showClientById, createClient, updateClient, deleteClient } from "../controllers/client_c.js";
import { showOrder, showOrderById, showOrderActiveByClient, showOrderActiveByOwner, showOrderHistoryByClient, showOrderHistoryByOwner, createOrder, updateOrder, updateOrderStatus, deleteOrder } from "../controllers/order_c.js";
import { showPlace, showPlaceById, showPlaceByOwner, showPlaceBySearch, createPlace, updatePlace, deletePlace, showPlaceByKey } from "../controllers/place_c.js";
import { showFacility, showFacilityById, showFacilityByPlace, createFacility, updateFacility, deleteFacility } from "../controllers/facility_c.js";
import { showAddress, showAddressById, showAddressByPlace, createAddress, updateAddress, deleteAddress } from "../controllers/address_c.js";
import { register, login, logout } from "../controllers/auth_c.js";


// init express router
const router = express.Router();

router.use(express.urlencoded({ extended: false }));
router.use(express.json());

import multer from "multer";
const upload = multer({
    dest: './image'
});

router.post('/upload', upload.single('file'), (req, res) => {
    res.json(req.file)
});

// register
router.post('/register', register);

// login
router.post('/login', login);

// logout
router.post('/logout', logout);

// Get All Admin
router.get('/admin', showAdmin);

// Get Single Admin
router.get('/admin/:id', showAdminById);

// Create New Admin
router.post('/admin', createAdmin);

// Update Admin
router.put('/admin/:id', updateAdmin);

// Delete Admin
router.delete('/admin/:id', deleteAdmin);

// Get All Owner
router.get('/owner', showOwner);

// Get Single Owner
router.get('/owner/:id', showOwnerById);

// Create New Owner
router.post('/owner', createOwner);

// Update Owner
router.put('/owner/:id', updateOwner);

// Delete Owner
router.delete('/owner/:id', deleteOwner);

// Get All Client
router.get('/client', showClient);

// Get Single Client
router.get('/client/:id', showClientById);

// Create New Client
router.post('/client', createClient);

// Update Client
router.put('/client/:id', updateClient);

// Delete Client
router.delete('/client/:id', deleteClient);

// Get All Place
router.get('/place', showPlace);

router.get('/placeKey/:key', showPlaceByKey);

// Get Single Place
router.get('/place/:id', showPlaceById);

// Get Place by Owner
router.get('/placeOwner/:id', showPlaceByOwner);

// Get Place by status
router.get('/placeSearch/:key', showPlaceBySearch);

// Create New Place
router.post('/place', createPlace);

// Update Place
router.put('/place/:id', updatePlace);

// Delete Place
router.delete('/place/:id', deletePlace);

// Get All Order
router.get('/Order', showOrder);

// Get Single order
router.get('/order/:id', showOrderById);

// Get order active by client
router.get('/orderActiveClient/:id', showOrderActiveByClient);

// Get order history by client
router.get('/orderHistoryClient/:id', showOrderHistoryByClient);

// Get order active by owner
router.get('/orderActiveOwner/:id', showOrderActiveByOwner);

// Get order history by owner
router.get('/orderHistoryOwner/:id', showOrderHistoryByOwner);

// Create New Status
router.post('/order', createOrder);

// Update Order
router.put('/order/:id', updateOrder);

// Update Order by status
router.put('/orderStatus/:id', updateOrderStatus);

// Delete Order
router.delete('/order/:id', deleteOrder);

// Get All Facility
router.get('/facility', showFacility);

// Get Single Facility
router.get('/facility/:id', showFacilityById);

// Get Single Facility
router.get('/facilityPlace/:id', showFacilityByPlace);

// Create New Facility
router.post('/facility', createFacility);

// Update Facility
router.put('/facility/:id', updateFacility);

// Delete Facility
router.delete('/facility/:id', deleteFacility);

// Get All Address
router.get('/address', showAddress);

// Get Single Address
router.get('/address/:id', showAddressById);

// Get Single Address
router.get('/addressPlace/:id', showAddressByPlace);

// Create New Address
router.post('/address', createAddress);

// Update Address
router.put('/address/:id', updateAddress);

// Delete Address
router.delete('/address/:id', deleteAddress);

// export default router
export default router;