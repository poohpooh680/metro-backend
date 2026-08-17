let io;


const viewers = {};



// Save Socket.io instance

const setIO = (socketIO) => {

    io = socketIO;

};



// Get Socket.io instance

const getIO = () => {

    return io;

};




// Handle socket events

const setupSocket = (socketIO) => {


    io = socketIO;



    io.on("connection", (socket)=>{


        console.log(
            "Socket connected:",
            socket.id
        );



        let currentStation = null;



        // Passenger joins a station room

        socket.on(
            "joinStation",
            (stationId)=>{


                // Remove from previous room

                if(currentStation){

                    socket.leave(currentStation);


                    viewers[currentStation] =
                    Math.max(
                        (viewers[currentStation] || 1) - 1,
                        0
                    );


                    io.to(currentStation)
                    .emit(
                        "presenceUpdate",
                        {
                            stationId: currentStation,

                            viewers:
                            viewers[currentStation]
                        }
                    );

                }



                currentStation = stationId;



                socket.join(stationId);



                viewers[stationId] =
                (viewers[stationId] || 0) + 1;



                io.to(stationId)
                .emit(
                    "presenceUpdate",
                    {
                        stationId,

                        viewers:
                        viewers[stationId]
                    }
                );


            }
        );




        // Disconnect

        socket.on(
            "disconnect",
            ()=>{


                if(currentStation){


                    viewers[currentStation] =
                    Math.max(
                        (viewers[currentStation] || 1) - 1,
                        0
                    );



                    io.to(currentStation)
                    .emit(
                        "presenceUpdate",
                        {
                            stationId: currentStation,

                            viewers:
                            viewers[currentStation]
                        }
                    );


                }



                console.log(
                    "Socket disconnected:",
                    socket.id
                );


            }
        );


    });


};




module.exports = {

    setIO,

    getIO,

    setupSocket

};