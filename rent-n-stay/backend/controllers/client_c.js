import { getClient, getClientById, insertClient, updateClientById, deleteClientById } from "../models/client_m.js";

// Get All Clients
export const showClient = (req, res) => {
    getClient((err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
}

// Get Single Client 
export const showClientById = (req, res) => {
    getClientById(req.params.id, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
}

// Create New Client
export const createClient = (req, res) => {
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
export const updateClient = (req, res) => {
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
export const deleteClient = (req, res) => {
    const id = req.params.id;
    deleteClientById(id, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
}