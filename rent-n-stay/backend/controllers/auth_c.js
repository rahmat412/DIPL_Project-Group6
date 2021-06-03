import { loginAdmin, loginOwner, loginClient, insertClient } from "../models/auth_m.js";
import { getClientByEmail } from "../models/client_m.js";
import config from "../config/config.js ";
import jwt from "jsonwebtoken";

export const register = (req, res) => {
    const data = req.body;
    getClientByEmail(data.clientEmail, (err, reg) => {
        if (err) {
            insertClient(data, (err, results) => {
                if (err) {
                    res.status(500).send({ message: err });
                } else {
                    res.send({ message: "User was registered successfully!" });
                }
            });
        } else {
            res.status(500).send({ message: "email has already registered" });
        }
    });
}

export const login = (req, res) => {
    const data = req.body;
    loginAdmin(data, (err, admin) => {
        if (err) {
            loginOwner(data, (err, owner) => {
                if (err) {
                    loginClient(data, (err, client) => {
                        if (err) {
                            res.status(500).send({ message: "invalid email or password" });
                        } else {
                            const token = jwt.sign({ id: client.clientID }, config.secret, {
                                expiresIn: 86400 // expires in 24 hours
                            });
                            res.send({ token: token, user: client.clientID, role: 3 });
                        }
                    });
                } else {
                    const token = jwt.sign({ id: owner.ownerID }, config.secret, {
                        expiresIn: 86400 // expires in 24 hours
                    });
                    res.send({ token: token, user: owner.ownerID, role: 2 });
                }
            });
        } else {
            const token = jwt.sign({ id: admin.adminID }, config.secret, {
                expiresIn: 86400 // expires in 24 hours
            });
            res.send({ token: token, user: admin.adminID, role: 1 });
        }
    });
}

export const logout = (req, res) => {
    const data = req.body;
    data.localStorage.removeItem('user');
    data.localStorage.removeItem('jwt');
}