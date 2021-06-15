import db from "../config/database.js";

// Get All Addresss
export const getAddress = (result) => {
    db.query("SELECT * FROM address natural join place", (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
}

// Get Single Address
export const getAddressById = (id, result) => {
    db.query("SELECT * FROM address natural join place WHERE addressID = ?", [id], (err, results) => {
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

// Get Single Address by place
export const getAddressByPlace = (id, result) => {
    db.query("SELECT * FROM address WHERE placeID = ?", [id], (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results[0]);
        }
    });
}

// Insert Address to Database
export const insertAddress = (data, result) => {
    db.query("INSERT INTO address SET ?", [data], (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
}

// Update Address to Database
export const updateAddressById = (data, id, result) => {
    db.query("UPDATE address SET placeID = ?, addressStreet = ?, addressDistrict = ?, addressRegency = ?, addressPostcode = ? WHERE addressID = ?", [data.place_id, data.address_street, data.address_district, data.address_regency, data.address_postcode, id], (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
}

// Delete Address to Database
export const deleteAddressById = (id, result) => {
    db.query("DELETE FROM address WHERE acilityID = ?", [id], (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
}