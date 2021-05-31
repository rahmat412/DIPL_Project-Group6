// import express
import express from "express";

// import function from controller
import { showClient, showClientById, createClient, updateClient, deleteClient } from "../controllers/client_c.js";

// init express router
const router = express.Router();

// Get All Client
router.get('/clients', showClient);

// Get Single Client
router.get('/clients/:id', showClientById);

// Create New Client
router.post('/clients', createClient);

// Update Client
router.put('/clients/:id', updateClient);

// Delete Client
router.delete('/clients/:id', deleteClient);

// export default router
export default router;