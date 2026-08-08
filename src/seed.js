require("dotenv").config();

const mongoose=require("mongoose");
const bcrypt=require("bcrypt");

const User=require("./models/User");
const Station=require("./models/Station");


mongoose.connect(process.env.MONGO_URI)
.then(async()=>{

await User.deleteMany();
await Station.deleteMany();


const password =
await bcrypt.hash("123456",10);


await User.create({
email:"admin@test.com",
password
});


await Station.insertMany([
{
name:"Sadat",
line:"Line 1",
order:1
},
{
name:"Tahrir",
line:"Line 1",
order:2
}
]);


console.log("Seed completed");

process.exit();

});