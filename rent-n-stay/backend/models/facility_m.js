import db from "../config/database.js";

// Get All Facilitys
export const getFacility = (result) => {
    db.query("SELECT * FROM facility natural join place", (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
}

// Get Single Facility
export const getFacilityById = (id, result) => {
    db.query("SELECT * FROM facility WHERE facilityID = ?", [id], (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            if (results.length > 0) {
                result(false, results[0]);
            } else {
                result(true, null);
            }
        }
    });
}

// Get Single Facility by place
export const getFacilityByPlace = (id, result) => {
    db.query("SELECT * FROM facility WHERE placeID = ?", [id], (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
}

// Insert Facility to Database
export const insertFacility = (data, result) => {
    db.query("INSERT INTO facility SET ?", [data], (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
}

// Update Facility to Database
export const updateFacilityById = (data, id, result) => {
    db.query("UPDATE facility SET facilityName = ?, facilityType = ?, placeID = ? WHERE facilityID = ?", [data.name, data.type, data.place_id, id], (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
}

// Delete Facility to Database
export const deleteFacilityById = (id, result) => {
    db.query("DELETE FROM facility WHERE acilityID = ?", [id], (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
}