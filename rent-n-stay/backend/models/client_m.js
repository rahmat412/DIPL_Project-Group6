import db from "../config/database.js";

// Get All Clients
export const getClient = (result) => {
    db.query("SELECT * FROM client", (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
}

// Get Single Client
export const getClientById = (id, result) => {
    db.query("SELECT * FROM client WHERE clientID = ?", [id], (err, results) => {
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

// Get Single Client by email
export const getClientByEmail = (email, result) => {
    db.query("SELECT * FROM client WHERE clientEmail = ?", [email], (err, results) => {
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

// Insert Client to Database
export const insertClient = (data, result) => {
    db.query("INSERT INTO client SET ?", [data], (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
}

// Update Client to Database
export const updateClientById = (data, id, result) => {
    db.query("UPDATE client SET ClientName = ?, clientEmail = ?, clientPassword = ?, clientPhone = ? WHERE ClientID = ?", [data.name, data.email, data.password, data.phone, id], (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
}

// Delete Client to Database
export const deleteClientById = (id, result) => {
    db.query("DELETE FROM client WHERE ClientID = ?", [id], (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
}