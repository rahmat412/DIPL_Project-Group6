import { getPlace, getPlaceById, getPlaceByOwner, getPlaceBySearch, insertPlace, updatePlaceById, deletePlaceById, getPlaceAsc, getPlaceAddress, getPlaceDesc } from "../models/place_m.js";

// Get All Places
export const showPlace = (req, res) => {
    getPlace((err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
}

// Get All Places
export const showPlaceByKey = (req, res) => {
    if (req.params.key == "all") {
        getPlaceAddress((err, results) => {
            if (err) {
                res.send(err);
            } else {
                res.json(results);
            }
        });
    } else if (req.params.key == "desc") {
        getPlaceDesc((err, results) => {
            if (err) {
                res.send(err);
            } else {
                res.json(results);
            }
        });
    } else if (req.params.key == "asc") {
        getPlaceAsc((err, results) => {
            if (err) {
                res.send(err);
            } else {
                res.json(results);
            }
        });
    }
}

// Get Single Place 
export const showPlaceById = (req, res) => {
    getPlaceById(req.params.id, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
}

// Get Place by status
export const showPlaceBySearch = (req, res) => {
    getPlaceBySearch(req.params.key, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
}

// Get Place by Owner
export const showPlaceByOwner = (req, res) => {
    getPlaceByOwner(req.params.id, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
}

// Get Place by Owner
export const showImage = (req, res) => {
    res.send('/image/1.jpg')
}

// Create New Place
export const createPlace = (req, res) => {
    const data = req.body;
    insertPlace(data, (err, results) => {
        if (err) {
            res.status(500).send({ message: err });
        } else {
            res.send({ message: "Place was created!" });
        }
    });
}

// Update Place
export const updatePlace = (req, res) => {
    const data = req.body;
    const id = req.params.id;
    updatePlaceById(data, id, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
}

// Delete Place
export const deletePlace = (req, res) => {
    const id = req.params.id;
    deletePlaceById(id, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
}