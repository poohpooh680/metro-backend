const stationService = require("../services/stationService");



// CREATE STATION

exports.createStation = async (req, res, next) => {

    try {

        const station =
        await stationService.createStation(
            req.body
        );


        res.status(201).json(station);


    } catch (error) {

        next(error);

    }

};





// GET ALL STATIONS

exports.getStations = async (req, res, next) => {

    try {

        const stations =
        await stationService.getAllStations();


        res.status(200).json(stations);


    } catch (error) {

        next(error);

    }

};





// GET ONE STATION

exports.getStation = async (req, res, next) => {

    try {

        const station =
        await stationService.getStationById(
            req.params.id
        );


        if(!station){

            return res.status(404).json({

                message:"Station not found"

            });

        }


        res.json(station);


    } catch(error){

        next(error);

    }

};






// UPDATE STATION

exports.updateStation = async (req, res, next) => {

    try {

        const station =
        await stationService.updateStation(

            req.params.id,

            req.body

        );


        res.json(station);


    } catch(error){

        next(error);

    }

};







// DELETE STATION

exports.deleteStation = async (req, res, next) => {

    try {

        await stationService.deleteStation(
            req.params.id
        );


        res.json({

            message:"Station deleted"

        });


    } catch(error){

        next(error);

    }

};