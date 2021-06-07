import { getFacility, getFacilityById, getFacilityByPlace, insertFacility, updateFacilityById, deleteFacilityById } from "../models/facility_m.js";

// Get All Facilitys
export const showFacility = (req, res) => {
    getFacility((err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
}

// Get Single Facility 
export const showFacilityById = (req, res) => {
    getFacilityById(req.params.id, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
}

// Get Facility Place
export const showFacilityByPlace = (req, res) => {
    getFacilityByPlace(req.params.id, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
}

// Create New Facility
export const createFacility = (req, res) => {
    const data = req.body;
    insertFacility(data, (err, results) => {
        if (err) {
            res.status(500).send({ message: err });
        } else {
            res.send({ message: "Facility was created!" });
        }
    });
}

// Update Facility
export const updateFacility = (req, res) => {
    const data = req.body;
    const id = req.params.id;
    updateFacilityById(data, id, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
}

// Delete Facility
export const deleteFacility = (req, res) => {
    const id = req.params.id;
    deleteFacilityById(id, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
}