require("dotenv").config();

const request = require("supertest");
const mongoose = require("mongoose");

const app = require("../src/app");
const connectDB = require("../src/config/db");


let token;
let announcementId;


beforeAll(async()=>{

    await connectDB();


    const login = await request(app)

    .post("/api/v1/auth/login")

    .send({

        email:"admin@test.com",

        password:"123456"

    });


    token = login.body.token;

});



afterAll(async()=>{

    await mongoose.connection.close();

});




describe("MetroSync API Tests", ()=>{


    test("GET /api/v1/stations returns 200", async()=>{


        const response = await request(app)

        .get("/api/v1/stations");


        expect(response.statusCode)

        .toBe(200);


        expect(Array.isArray(response.body))

        .toBe(true);


    });







    test("POST /api/v1/auth/login returns JWT token", async()=>{


        const response = await request(app)

        .post("/api/v1/auth/login")

        .send({

            email:"admin@test.com",

            password:"123456"

        });



        expect(response.statusCode)

        .toBe(200);


        expect(response.body.token)

        .toBeDefined();


    });








    test("POST announcement without token returns 401", async()=>{


        const response = await request(app)

        .post("/api/v1/announcements")

        .send({

            title:"Delay",

            message:"Train delayed",

            station:"6a82face789ecc91d7c68128"

        });



        expect(response.statusCode)

        .toBe(401);


    });









    test("POST /api/v1/announcements creates announcement", async()=>{


        const stations = await request(app)

        .get("/api/v1/stations");


        const stationId = stations.body[0]._id;



        const response = await request(app)

        .post("/api/v1/announcements")

        .set(
            "Authorization",
            `Bearer ${token}`
        )

        .send({

            title:"Test Delay",

            message:"Train delayed 5 minutes",

            station:stationId

        });



        expect(response.statusCode)

        .toBe(201);



        expect(response.body.title)

        .toBe("Test Delay");



        announcementId = response.body._id;


    });









    test("GET /api/v1/announcements returns announcements", async()=>{


        const response = await request(app)

        .get("/api/v1/announcements");



        expect(response.statusCode)

        .toBe(200);



        expect(Array.isArray(response.body))

        .toBe(true);


    });









    test("PUT /api/v1/announcements/:id updates announcement", async()=>{


        const response = await request(app)

        .put(
            `/api/v1/announcements/${announcementId}`
        )

        .set(
            "Authorization",
            `Bearer ${token}`
        )

        .send({

            message:"Updated delay message"

        });



        expect(response.statusCode)

        .toBe(200);



        expect(response.body.message)

        .toBe("Updated delay message");


    });









    test("DELETE /api/v1/announcements/:id deletes announcement", async()=>{


        const response = await request(app)

        .delete(
            `/api/v1/announcements/${announcementId}`
        )

        .set(
            "Authorization",
            `Bearer ${token}`
        );



        expect(response.statusCode)

        .toBe(200);



        expect(response.body.message)

        .toBe("Announcement deleted");


    });



});