import db from "../config/database.js";

// Get All Owners
export const getOwner = (result) => {
    db.query("SELECT * FROM owner", (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
}

// Get Single Owner
export const getOwnerById = (id, result) => {
    db.query("SELECT * FROM owner WHERE ownerID = ?", [id], (err, results) => {
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

// Get Single Owner by email
export const getOwnerByEmail = (email, result) => {
    db.query("SELECT * FROM owner WHERE ownerEmail = ?", [email], (err, results) => {
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

// Insert Owner to Database
export const insertOwner = (data, result) => {
    db.query("INSERT INTO owner SET ?", [data], (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
}

// Update Owner to Database
export const updateOwnerById = (data, id, result) => {
    db.query("UPDATE owner SET OwnerName = ?, ownerEmail = ?, ownerPassword = ?, ownerPhone = ? WHERE OwnerID = ?", [data.owner_name, data.owner_email, owner_password, owner_phone, id], (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
}

// Delete Owner to Database
export const deleteOwnerById = (id, result) => {
    db.query("DELETE FROM owner WHERE OwnerID = ?", [id], (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
}