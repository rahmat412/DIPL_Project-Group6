// import express
import express from "express";

// import function from controller
import { showAdmin, showAdminById, createAdmin, updateAdmin, deleteAdmin } from "../controllers/admin_c.js";
import { showOwner, showOwnerById, createOwner, updateOwner, deleteOwner } from "../controllers/owner_c.js";
import { showClient, showClientById, createClient, updateClient, deleteClient } from "../controllers/client_c.js";
import { register, login, logout } from "../controllers/auth_c.js";

// init express router
const router = express.Router();

router.use(express.urlencoded({ extended: false }));
router.use(express.json());

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

// export default router
export default router;