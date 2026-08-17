const Announcement = require("../models/Announcement");



// Create announcement

exports.createAnnouncement = async(data)=>{

    return await Announcement.create(data);

};





// Get announcements with station filter + pagination

exports.getAnnouncements = async(options)=>{


    const {

        station,

        page = 1,

        limit = 10,

        type,

        startDate,

        endDate

    } = options;



    const filter = {};



    if(station){

        filter.station = station;

    }



    if(type){

        filter.type = type;

    }



    if(startDate || endDate){

        filter.createdAt = {};

        if(startDate){

            filter.createdAt.$gte = new Date(startDate);

        }


        if(endDate){

            filter.createdAt.$lte = new Date(endDate);

        }

    }



    const skip = (page - 1) * limit;



    return await Announcement.find(filter)

    .populate("station")

    .sort({

        createdAt:-1

    })

    .skip(skip)

    .limit(Number(limit));


};





// Get one announcement

exports.getAnnouncement = async(id)=>{


    return await Announcement.findById(id)

    .populate("station");


};





// Update announcement

exports.updateAnnouncement = async(id,data)=>{


    return await Announcement.findByIdAndUpdate(

        id,

        data,

        {
            new:true
        }

    );


};





// Delete announcement

exports.deleteAnnouncement = async(id)=>{


    return await Announcement.findByIdAndDelete(id);


};