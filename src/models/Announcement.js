const mongoose = require("mongoose");

const announcementSchema = new mongoose.Schema(
{
    title:{
        type:String,
        required:true,
        trim:true
    },

    message:{
        type:String,
        required:true,
        trim:true
    },

    station:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Station",
        required:true
    },

    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }

},
{
    timestamps:true
});


module.exports = mongoose.model(
    "Announcement",
    announcementSchema
);