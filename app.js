const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js")
const path = require("path");
const methodOverride = require("method-override");


const MONGO_URL ="mongodb://127.0.0.1:27017/FortStay";

main().then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.error("Error connecting to MongoDB", err);
});

async function main(){
    await mongoose.connect(MONGO_URL);
}


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));




app.get("/", (req, res) => {
    res.send("Hello World!");
}); 

app.get("/listings", async (req,res)=>{
    const allListings= await Listing.find({});
    res.render("listings/index.ejs", {allListings})
})

app.get("/listings/new",(req,res)=>{
    res.render("listings/new.ejs")
    
})

app.get("/listings/:id", async (req,res)=>{
    let {id} =req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs", {listing})

})

app.post("/listings", async (req,res) => {
    const newListing = new Listing(req.body.listing)
    await newListing.save();
    res.redirect("/listings")
})

app.get("/listings/:id/edit",async(req,res)=>{
    let{id}= req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs",{listing})
})

app.put("/listings/:id", async(req,res)=>{
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.listing});
    res.redirect(`/listings/${id}`)
})


app.listen(8080 ,() =>{
    console.log("Server is running on port 8080");
});