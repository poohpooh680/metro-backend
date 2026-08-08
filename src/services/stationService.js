const Station = require("../models/Station");



// Get all stations
exports.getAllStations = async()=>{

    return await Station.find()
    .sort({
        order:1
    });

};




// Get one station
exports.getStationById = async(id)=>{

    return await Station.findById(id);

};




// Create station
exports.createStation = async(data)=>{

    return await Station.create(data);

};




// Update station
exports.updateStation = async(id,data)=>{

    return await Station.findByIdAndUpdate(

        id,

        data,

        {
            new:true
        }

    );

};




// Delete station
exports.deleteStation = async(id)=>{

    return await Station.findByIdAndDelete(id);

};