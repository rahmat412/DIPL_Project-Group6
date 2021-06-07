import db from "../config/database.js";

// Get All Orders
export const getOrder = (result) => {
    db.query("SELECT * FROM orders natural join place natural join client", (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
}

// Get Single Order
export const getOrderById = (id, result) => {
    db.query("SELECT * FROM orders WHERE orderID = ?", [id], (err, results) => {
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

// Get Order Active by client
export const getOrderActiveByClient = (id, result) => {
    db.query("SELECT * FROM orders WHERE clientID = ? (orderStatus = 'Requested' or orderStatus = 'Accepted' orderStatus ='In Progress') order by date desc", [id], (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
}

// Get Order History by client
export const getOrderHistoryByClient = (id, result) => {
    db.query("SELECT * FROM orders WHERE clientID = ? (orderStatus = 'Completed' or orderStatus = 'Declined' or orderStatus ='Cancelled') order by date desc", [id], (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
}

// Get Order Active by owner
export const getOrderActiveByOwner = (id, result) => {
    db.query("SELECT * FROM orders WHERE ownerID = ? (orderStatus = 'Requested' or orderStatus = 'Accepted' orderStatus ='In Progress') order by date desc", [id], (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
}

// Get Order History by client
export const getOrderHistoryByOwner = (id, result) => {
    db.query("SELECT * FROM orders WHERE ownerID = ? (orderStatus = 'Completed' or orderStatus = 'Declined' or orderStatus ='Cancelled') order by date desc", [id], (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
}

// Insert Order to Database
export const insertOrder = (data, result) => {
    db.query("INSERT INTO orders SET ?", [data], (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
}

// Update Order by status to Database
export const updateOrderByStatus = (data, id, result) => {
    db.query("UPDATE orders SET orderStatus = ? WHERE orderID = ?", [data.order_status, id], (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
}

// Update Order to Database
export const updateOrderById = (data, id, result) => {
    db.query("UPDATE orders SET clientID = ?, placeID = ?, orderDate = ?, orderCheckIn = ?, orderCheckOut = ?, orderStatus = ? WHERE orderID = ?", [data.client_id, data.place_id, data.order_date, data.order_checkin, data.order_checkout, data.order_status, id], (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
}

// Delete Order to Database
export const deleteOrderById = (id, result) => {
    db.query("DELETE FROM orders WHERE orderID = ?", [id], (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
}