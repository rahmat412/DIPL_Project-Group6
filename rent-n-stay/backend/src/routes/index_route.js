module.exports = app => {
    // import express
    const express = require("express");

    // import function from controller
    const { showClient, showClientById, createClient, updateClient, deleteClient } = require("../controllers/client_c.js");

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

    app.use('/api/clients', router);
}