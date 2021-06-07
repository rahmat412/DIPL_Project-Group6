import { getOrder, getOrderById, insertOrder, updateOrderById, deleteOrderById, getOrderActiveByClient, getOrderActiveByOwner, getOrderHistoryByClient, getOrderHistoryByOwner } from "../models/order_m.js";

// Get All Orders
export const showOrder = (req, res) => {
    getOrder((err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
}

// Get Single Order 
export const showOrderById = (req, res) => {
    getOrderById(req.params.id, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
}

// Get Order Active by Client
export const showOrderActiveByClient = (req, res) => {
    getOrderActiveByClient(req.params.id, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
}

// Get Order History by Client
export const showOrderHistoryByClient = (req, res) => {
    getOrderHistoryByClient(req.params.id, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
}

// Get Order Active by Owner
export const showOrderActiveByOwner = (req, res) => {
    getOrderActiveByOwner(req.params.id, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
}

// Get Order History by Owner
export const showOrderHistoryByOwner = (req, res) => {
    getOrderHistoryByOwner(req.params.id, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
}

// Create New Order
export const createOrder = (req, res) => {
    const data = req.body;
    insertOrder(data, (err, results) => {
        if (err) {
            res.status(500).send({ message: err });
        } else {
            res.send({ message: "Order was created!" });
        }
    });
}

// Update Order
export const updateOrder = (req, res) => {
    const data = req.body;
    const id = req.params.id;
    updateOrderById(data, id, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
}

// Update Order
export const updateOrderStatus = (req, res) => {
    const data = req.body;
    const id = req.params.id;
    updateOrderById(data, id, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
}

// Delete Order
export const deleteOrder = (req, res) => {
    const id = req.params.id;
    deleteOrderById(id, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
}