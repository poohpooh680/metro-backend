require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const User = require("./src/models/User");
const Station = require("./src/models/Station");


const seedDatabase = async () => {

    try {

        await mongoose.connect(
            process.env.MONGO_URI
        );


        console.log("Database connected for seed");


        // Clear previous seed data
        await User.deleteMany({});
        await Station.deleteMany({});


        // Create hashed admin password
        const password =
            await bcrypt.hash(
                "123456",
                10
            );


        // Create admin account
        await User.create({

            name: "Admin",

            email: "admin@test.com",

            password,

            role: "admin"

        });


        // Insert metro stations
        await Station.insertMany([

            {
                name: "Sadat",
                line: "Line 1",
                order: 1
            },

            {
                name: "Tahrir",
                line: "Line 1",
                order: 2
            },

            {
                name: "Nasser",
                line: "Line 1",
                order: 3
            },

            {
                name: "Attaba",
                line: "Line 2",
                order: 1
            },

            {
                name: "Mohamed Naguib",
                line: "Line 2",
                order: 2
            }

        ]);


        console.log("Seed completed successfully");


        await mongoose.connection.close();

        process.exit(0);


    } catch (error) {

        console.error(
            "Seed failed:",
            error.message
        );


        await mongoose.connection.close();

        process.exit(1);

    }

};


seedDatabase();