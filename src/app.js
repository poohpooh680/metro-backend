const express = require("express");
const cors = require("cors");

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./docs/swagger");


const app = express();


// Middleware
app.use(cors());

app.use(express.json());



// Routes
const authRoutes = require("./routes/authRoutes");

const stationRoutes = require("./routes/stationRoutes");

const announcementRoutes = require("./routes/announcementRoutes");


const errorHandler = require("./middleware/errorHandler");



// API routes

app.use(
    "/api/v1/auth",
    authRoutes
);


app.use(
    "/api/v1/stations",
    stationRoutes
);


app.use(
    "/api/v1/announcements",
    announcementRoutes
);



// Swagger Documentation

app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec)
);



// Health check (required by rubric)

app.get(
    "/health",
    (req,res)=>{

        res.json({

            status:"ok"

        });

    }
);



// Test route

app.get(
    "/",
    (req,res)=>{

        res.json({

            message:"Metro API running"

        });

    }
);



// Error handler (must be last)

app.use(errorHandler);



module.exports = app;