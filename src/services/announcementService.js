const Announcement = require("../models/Announcement");


exports.createAnnouncement = async(data)=>{

    const announcement = await Announcement.create(data);

    return announcement;

};



exports.getAnnouncements = async()=>{

    const announcements = await Announcement.find()
    .populate("station")
    .sort({createdAt:-1});


    return announcements;

};



exports.getAnnouncement = async(id)=>{

    return await Announcement.findById(id)
    .populate("station");

};



exports.updateAnnouncement = async(id,data)=>{

    return await Announcement.findByIdAndUpdate(
        id,
        data,
        {new:true}
    );

};



exports.deleteAnnouncement = async(id)=>{

    return await Announcement.findByIdAndDelete(id);

};