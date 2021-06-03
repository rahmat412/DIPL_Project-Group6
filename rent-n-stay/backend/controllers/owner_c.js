import { getOwner, getOwnerById, getOwnerByEmail, insertOwner, updateOwnerById, deleteOwnerById } from "../models/owner_m.js";

// Get All Owners
export const showOwner = (req, res) => {
    getOwner((err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
}

// Get Single Owner 
export const showOwnerById = (req, res) => {
    getOwnerById(req.params.id, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
}

// Create New Owner
export const createOwner = (req, res) => {
    const data = req.body;
    getOwnerByEmail(data.ownerEmail, (err, owner) => {
        if (err) {
            insertOwner(data, (err, results) => {
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

// Update Owner
export const updateOwner = (req, res) => {
    const data = req.body;
    const id = req.params.id;
    updateOwnerById(data, id, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
}

// Delete Owner
export const deleteOwner = (req, res) => {
    const id = req.params.id;
    deleteOwnerById(id, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
}