const announcementService = require("../services/announcementService");

const { getIO } = require("../sockets/socket");




// GET ALL ANNOUNCEMENTS

exports.getAnnouncements = async(req,res,next)=>{

    try{

        const announcements =
        await announcementService.getAnnouncements();


        res.json(announcements);


    }catch(error){

        next(error);

    }

};







// GET ONE ANNOUNCEMENT

exports.getAnnouncement = async(req,res,next)=>{

    try{

        const announcement =
        await announcementService.getAnnouncement(
            req.params.id
        );


        if(!announcement){

            return res.status(404).json({

                message:"Announcement not found"

            });

        }


        res.json(announcement);



    }catch(error){

        next(error);

    }

};







// CREATE ANNOUNCEMENT

exports.createAnnouncement = async(req,res,next)=>{

    try{

        const data = {

            title:req.body.title,

            message:req.body.message,

            station:req.body.station,

            createdBy:req.user
            ? req.user.id
            : null

        };


        const announcement =
        await announcementService.createAnnouncement(
            data
        );



        const io = getIO();


        if(io){

            io.emit(
                "newAnnouncement",
                announcement
            );

        }



        res.status(201).json(announcement);



    }catch(error){

        next(error);

    }

};








// UPDATE ANNOUNCEMENT

exports.updateAnnouncement = async(req,res,next)=>{

    try{

        const announcement =
        await announcementService.updateAnnouncement(

            req.params.id,

            req.body

        );


        const io = getIO();


        if(io){

            io.emit(
                "updatedAnnouncement",
                announcement
            );

        }



        res.json(announcement);



    }catch(error){

        next(error);

    }

};








// DELETE ANNOUNCEMENT

exports.deleteAnnouncement = async(req,res,next)=>{

    try{

        await announcementService.deleteAnnouncement(
            req.params.id
        );


        const io = getIO();


        if(io){

            io.emit(
                "deletedAnnouncement",
                {
                    id:req.params.id
                }
            );

        }



        res.json({

            message:"Announcement deleted"

        });



    }catch(error){

        next(error);

    }

};