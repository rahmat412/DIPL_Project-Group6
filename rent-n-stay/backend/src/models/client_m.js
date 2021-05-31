const db = require("../config/database .js");

// Get All Clients
export constgetClient = (result) => {
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
export constgetClientById = (id, result) => {
    db.query("SELECT * FROM client WHERE clientID = ?", [id], (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results[0]);
        }
    });
}

// Insert Client to Database
export constinsertClient = (data, result) => {
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
export constupdateClientById = (data, id, result) => {
    db.query("UPDATE client SET ClientName = ?, clientEmail, clientPassword, clientPhone = ? WHERE ClientID = ?", [data.clientName, data.clientEmail, clientPassword, clientPhone, id], (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
}

// Delete Client to Database
export constdeleteClientById = (id, result) => {
    db.query("DELETE FROM client WHERE ClientID = ?", [id], (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
}