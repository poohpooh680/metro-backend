const announcementService = require("../services/announcementService");

const { getIO } = require("../sockets/socket");




// GET ANNOUNCEMENTS

exports.getAnnouncements = async(req,res,next)=>{

    try{


        const announcements =
        await announcementService.getAnnouncements({

            station: req.query.station,

            page: req.query.page,

            limit: req.query.limit,

            type: req.query.type,

            startDate: req.query.startDate,

            endDate: req.query.endDate

        });



        res.status(200).json(announcements);



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



        res.status(200).json(announcement);



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

            createdBy:req.user.id

        };



        const announcement =
        await announcementService.createAnnouncement(
            data
        );



        const io = getIO();



        if(io){

            io.to(
                req.body.station
            ).emit(
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



        if(!announcement){

            return res.status(404).json({

                message:"Announcement not found"

            });

        }



        const io = getIO();



        if(io){

            io.to(
                announcement.station.toString()
            ).emit(
                "updatedAnnouncement",
                announcement
            );

        }



        res.status(200).json(announcement);



    }catch(error){

        next(error);

    }

};








// DELETE ANNOUNCEMENT

exports.deleteAnnouncement = async(req,res,next)=>{

    try{


        const announcement =
        await announcementService.deleteAnnouncement(

            req.params.id

        );



        if(!announcement){

            return res.status(404).json({

                message:"Announcement not found"

            });

        }



        const io = getIO();



        if(io){

            io.to(
                announcement.station.toString()
            ).emit(
                "deletedAnnouncement",
                announcement
            );

        }



        res.status(200).json({

            message:"Announcement deleted"

        });



    }catch(error){

        next(error);

    }

};