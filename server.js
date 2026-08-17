require("dotenv").config();


const http = require("http");

const app = require("./src/app");

const connectDB = require("./src/config/db");


const { Server } = require("socket.io");

const { setupSocket } = require("./src/sockets/socket");



const PORT = process.env.PORT || 5000;



// Connect database

connectDB();



// Create HTTP server

const server = http.createServer(app);



// Socket.io setup

const io = new Server(server, {

    cors: {

        origin: "*",

        methods: [

            "GET",

            "POST"

        ]

    }

});




// Setup socket events

setupSocket(io);




// Start server

server.listen(PORT, () => {


    console.log(

        `Server running on port ${PORT}`

    );


});