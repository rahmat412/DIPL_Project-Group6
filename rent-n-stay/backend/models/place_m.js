import db from "../config/database.js";

// Get All Places
export const getPlace = (result) => {
    db.query("SELECT * FROM place natural join owner", (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
}

export const getPlaceAddress = (result) => {
    db.query("SELECT * FROM place natural join owner natural join address", (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
}

export const getPlaceDesc = (result) => {
    db.query("SELECT * FROM place natural join owner natural join address ORDER BY placePrice desc", (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
}

export const getPlaceAsc = (result) => {
    db.query("SELECT * FROM place natural join owner natural join address ORDER BY placePrice asc", (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
}

// Get Order Active by client
export const getPlaceBySearch = (key, result) => {
    db.query("SELECT * FROM place WHERE placeName LIKE '%" + [key] + "%'", (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
}

// Get Single Place
export const getPlaceById = (id, result) => {
    db.query("SELECT * FROM place natural join owner WHERE placeID = ?", [id], (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
            return false;
        } else {
            if (results.length > 0) {
                result(false, results[0]);
            } else {
                result(true, null);
            }
        }
    });
}

// Get Place by owner
export const getPlaceByOwner = (id, result) => {
    db.query("SELECT * FROM place natural join owner WHERE ownerID = ?", [id], (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
}

// Insert Place to Database
export const insertPlace = (data, result) => {
    db.query("INSERT INTO place SET ?", [data], (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
}

// Update Place to Database
export const updatePlaceById = (data, id, result) => {
    db.query("UPDATE place SET ownerID = ?, placeName = ?, placePrice = ?, placeCategory = ? WHERE placeID = ?", [data.owner_id, data.place_name, data.place_price, data.place_category, id], (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
}

// Delete Place to Database
export const deletePlaceById = (id, result) => {
    db.query("DELETE FROM place WHERE placeID = ?", [id], (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
}