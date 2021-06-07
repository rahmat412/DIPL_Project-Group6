import { getAddress, getAddressById, getAddressByPlace, insertAddress, updateAddressById, deleteAddressById } from "../models/address_m.js";

// Get All Addresss
export const showAddress = (req, res) => {
    getAddress((err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
}

// Get Single Address 
export const showAddressById = (req, res) => {
    getAddressById(req.params.id, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
}

// Get Address Place
export const showAddressByPlace = (req, res) => {
    getAddressByPlace(req.params.id, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
}

// Create New Address
export const createAddress = (req, res) => {
    const data = req.body;
    insertAddress(data, (err, results) => {
        if (err) {
            res.status(500).send({ message: err });
        } else {
            res.send({ message: "Address was created!" });
        }
    });
}

// Update Address
export const updateAddress = (req, res) => {
    const data = req.body;
    const id = req.params.id;
    updateAddressById(data, id, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
}

// Delete Address
export const deleteAddress = (req, res) => {
    const id = req.params.id;
    deleteAddressById(id, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
}