const express = require("express");

const router = express.Router();


const {
    createStation,
    getStations
} = require("../controllers/stationController");


const validate = require("../middleware/validate");

const {
    stationValidation
} = require("../validators/stationValidator");



/**
 * @swagger
 * tags:
 *   name: Stations
 *   description: Metro station management
 */





/**
 * @swagger
 * /api/stations:
 *   post:
 *     summary: Create a new station
 *     tags: [Stations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - location
 *               - line
 *             properties:
 *               name:
 *                 type: string
 *                 example: Main Station
 *               location:
 *                 type: string
 *                 example: Cairo
 *               line:
 *                 type: string
 *                 example: Line 1
 *     responses:
 *       201:
 *         description: Station created
 *       400:
 *         description: Validation error
 */

router.post(
    "/",
    stationValidation,
    validate,
    createStation
);





/**
 * @swagger
 * /api/stations:
 *   get:
 *     summary: Get all stations
 *     tags: [Stations]
 *     responses:
 *       200:
 *         description: List of stations
 */

router.get(
    "/",
    getStations
);



module.exports = router;