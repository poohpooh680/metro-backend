require("dotenv").config();

const http = require("http");
const app = require("./src/app");
const connectDB = require("./src/config/db");

const { Server } = require("socket.io");
const { setIO } = require("./src/sockets/socket");


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


// Give socket instance to socket.js
setIO(io);


// Socket events
io.on("connection", (socket) => {

    console.log(
        "User connected:",
        socket.id
    );


    socket.on("joinRoom", (room) => {

        socket.join(room);

        console.log(
            `Joined room: ${room}`
        );

    });


    socket.on("disconnect", () => {

        console.log(
            "User disconnected:",
            socket.id
        );

    });

});


// Start server
server.listen(PORT, () => {

    console.log(
        `Server running on port ${PORT}`
    );

});