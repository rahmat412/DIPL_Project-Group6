const { getClient, getClientById, insertClient, updateClientById, deleteClientById } = require("../models/client_m.js");

// Get All Clients
export constshowClient = (req, res) => {
    getClient((err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
}

// Get Single Client 
export constshowClientById = (req, res) => {
    getClientById(req.params.id, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
}

// Create New Client
export constcreateClient = (req, res) => {
    const data = req.body;
    insertClient(data, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
}

// Update Client
export constupdateClient = (req, res) => {
    const data = req.body;
    const id = req.params.id;
    updateClientById(data, id, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
}

// Delete Client
export constdeleteClient = (req, res) => {
    const id = req.params.id;
    deleteClientById(id, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
}