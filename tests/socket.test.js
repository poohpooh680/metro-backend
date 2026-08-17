require("dotenv").config();

const { io } = require("socket.io-client");
const http = require("http");
const request = require("supertest");
const mongoose = require("mongoose");

const app = require("../src/app");
const { Server } = require("socket.io");

const connectDB = require("../src/config/db");


let server;
let ioServer;
let client;

let token;
let stationId;
let announcementId;



beforeAll(async()=>{


    await connectDB();



    server = http.createServer(app);



    ioServer = new Server(server,{
        cors:{
            origin:"*"
        }
    });



    require("../src/sockets/socket")
    .setupSocket(ioServer);




    await new Promise((resolve)=>{


        server.listen(()=>{


            const port =
            server.address().port;


            client = io(
                `http://localhost:${port}`
            );


            client.on(
                "connect",
                resolve
            );


        });


    });




    const login =
    await request(app)
    .post("/api/v1/auth/login")
    .send({

        email:"admin@test.com",

        password:"123456"

    });



    token = login.body.token;




    const stations =
    await request(app)
    .get("/api/v1/stations");



    stationId =
    stations.body[0]._id;



});







afterAll(async()=>{


    if(client){

        client.disconnect();

    }



    if(ioServer){

        ioServer.close();

    }



    if(server){

        server.close();

    }



    if(mongoose.connection.readyState){

        await mongoose.connection.close();

    }


});









test(
    "Socket connects",
    ()=>{


        expect(client.connected)
        .toBe(true);


    }
);









test(
    "Client joins station room",
    (done)=>{


        client.once(
            "presenceUpdate",
            (data)=>{


                expect(data.stationId)
                .toBe(stationId);


                done();


            }
        );



        client.emit(
            "joinStation",
            stationId
        );


    }
);









test(
    "Create announcement emits newAnnouncement",
    async()=>{


        client.emit(
            "joinStation",
            stationId
        );



        const event =
        new Promise((resolve)=>{


            client.once(
                "newAnnouncement",
                resolve
            );


        });




        const response =
        await request(app)
        .post("/api/v1/announcements")
        .set(
            "Authorization",
            `Bearer ${token}`
        )
        .send({

            title:"Socket Test",

            message:"Realtime message",

            station:stationId

        });



        announcementId =
        response.body._id;




        const data =
        await event;



        expect(data.title)
        .toBe("Socket Test");


    }
);









test(
    "Update announcement emits updatedAnnouncement",
    async()=>{


        const event =
        new Promise((resolve)=>{


            client.once(
                "updatedAnnouncement",
                resolve
            );


        });




        await request(app)

        .put(
            `/api/v1/announcements/${announcementId}`
        )

        .set(
            "Authorization",
            `Bearer ${token}`
        )

        .send({

            message:"Updated realtime message"

        });




        const data =
        await event;



        expect(data.message)
        .toBe("Updated realtime message");


    }
);









test(
    "Delete announcement emits deletedAnnouncement",
    async()=>{


        const event =
        new Promise((resolve)=>{


            client.once(
                "deletedAnnouncement",
                resolve
            );


        });




        await request(app)

        .delete(
            `/api/v1/announcements/${announcementId}`
        )

        .set(
            "Authorization",
            `Bearer ${token}`
        );




        const data =
        await event;



        expect(data._id)
        .toBe(announcementId);


    }
);