const mongoose = require("mongoose");

const stationSchema = new mongoose.Schema({

name:{
    type:String,
    required:true
},

line:{
    type:String,
    required:true
},

order:{
    type:Number,
    default:0
}

});


module.exports = mongoose.model("Station",stationSchema);