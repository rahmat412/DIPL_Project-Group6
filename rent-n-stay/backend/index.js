// import express
import express from "express";
// import cors
import cors from "cors";
// import routes
import Router from "./routes/routes.js";

// init express
const app = express();

const allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
}

app.use(allowCrossDomain);

// use express json
app.use(express.json());

// use cors
app.use(cors());

app.use(express.static('image'));

// use router
app.use(Router);

app.listen(5000, () => console.log('Server running at http://localhost:5000'));