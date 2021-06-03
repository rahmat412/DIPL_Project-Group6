import { getAdmin, getAdminById, getAdminByEmail, insertAdmin, updateAdminById, deleteAdminById } from "../models/admin_m.js";

// Get All Admins
export const showAdmin = (req, res) => {
    getAdmin((err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
}

// Get Single Admin 
export const showAdminById = (req, res) => {
    getAdminById(req.params.id, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
}

// Create New Admin
export const createAdmin = (req, res) => {
    const data = req.body;
    getAdminByEmail(data.adminEmail, (err, admin) => {
        if (err) {
            insertAdmin(data, (err, results) => {
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

// Update Admin
export const updateAdmin = (req, res) => {
    const data = req.body;
    const id = req.params.id;
    updateAdminById(data, id, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
}

// Delete Admin
export const deleteAdmin = (req, res) => {
    const id = req.params.id;
    deleteAdminById(id, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
}