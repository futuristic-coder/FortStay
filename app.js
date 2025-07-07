const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js")

const MONGO_URL ="mongodb://127.0.0.1:27017/FortStay";

main().then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.error("Error connecting to MongoDB", err);
});

async function main(){
    await mongoose.connect(MONGO_URL);
}

app.get("/", (req, res) => {
    res.send("Hello World!");
}); 

app.get("/testlisting", async (req ,res)=>{
    let sampleListing = new Listing({
        title: "My new",
        description: "BY the beach",
        price:"1400",
        location:"q",
        country:"INDIA",
    });

    await sampleListing.save();
    console.log("Sample was saved");
    res.send ("successful")
})

app.listen(8080 ,() =>{
    console.log("Server is running on port 8080");
});