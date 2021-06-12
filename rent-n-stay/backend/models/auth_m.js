import db from "../config/database.js";

// Insert Client to Database
export const insertClient = (data, result) => {
    db.query("INSERT INTO client SET ?", [data], (err, results) => {
        if (err) {
            console.log(err);
            result("Email has been registered", null);
        } else {
            result(null, results);
        }
    });
}

// Get admin email and password
export const loginAdmin = (data, result) => {
    db.query("SELECT * FROM admin WHERE adminEmail = ? AND adminPassword = ?", [data.email, data.password], (err, results) => {
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

// Get owner email and password
export const loginOwner = (data, result) => {
    db.query("SELECT * FROM owner WHERE ownerEmail = ? AND ownerPassword = ?", [data.email, data.password], (err, results) => {
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

// Get owner email and password
export const loginClient = (data, result) => {
    db.query("SELECT * FROM client WHERE clientEmail = ? AND clientPassword = ?", [data.email, data.password], (err, results) => {
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