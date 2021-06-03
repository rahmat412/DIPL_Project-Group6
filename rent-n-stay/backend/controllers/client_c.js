import { getClient, getClientById, getClientByEmail, insertClient, updateClientById, deleteClientById } from "../models/client_m.js";

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
    getClientByEmail(data.clientEmail, (err, reg) => {
        if (err) {
            insertClient(data, (err, results) => {
                if (err) {
                    res.status(500).send({ message: err });
                } else {
                    res.send({ message: "User was registered successfully!" });
                }
            });
        } else {
            res.status(500).send({ message: "email has already registered" });
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