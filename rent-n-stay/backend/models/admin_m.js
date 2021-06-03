import db from "../config/database.js";

// Get All Admin
export const getAdmin = (result) => {
    db.query("SELECT * FROM admin", (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
}

// Get Single Admin
export const getAdminById = (id, result) => {
    db.query("SELECT * FROM admin WHERE adminID = ?", [id], (err, results) => {
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

// Get Single Admin by email
export const getAdminByEmail = (email, result) => {
    db.query("SELECT * FROM admin WHERE adminEmail = ?", [email], (err, results) => {
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

// Insert Admin to Database
export const insertAdmin = (data, result) => {
    db.query("INSERT INTO admin SET ?", [data], (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
}

// Update Admin to Database
export const updateAdminById = (data, id, result) => {
    db.query("UPDATE admin SET adminName = ?, adminEmail = ?, adminPassword = ?, adminPhone = ? WHERE AdminID = ?", [data.name, data.email, data.password, data.phone, id], (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
}

// Delete Admin to Database
export const deleteAdminById = (id, result) => {
    db.query("DELETE FROM admin WHERE adminID = ?", [id], (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
}