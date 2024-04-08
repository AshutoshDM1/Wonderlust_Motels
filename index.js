// Basic Express setup
require('dotenv').config();
const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.get("/", (req, res) => {
  res.redirect("listing");
});

// Basic Ejs setup

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));

// Basic MongoDB setup
// const mongoUrl = "mongodb://127.0.0.1:27017/wanderlust";
const mongoUrl = "mongodb+srv://downlodemaster2:eAGmRemCcdSQB6LO@cluster0.1d21wvg.mongodb.net/wanderlust?retryWrites=true&w=majority&appName=Cluster0";

const mongoose = require("mongoose");
async function main() {
  await mongoose.connect(mongoUrl);
}
main()
  .then(() => console.log(`Connected to Database`))
  .catch((err) => console.error("Error connecting to database", err));

// Now wonderlust Router setup

const Listing = require("./models/Listing.js");


// Index Route setup

app.get("/listing", async (req, res) => {
  const allListings = await Listing.find({});
  res.render("index.ejs", { allListings: allListings });
});

// New Route Setup

app.get("/listings/new", (req, res) => {
  res.render("new.ejs");
});

//Show Route Setup

app.get("/listings/:id", async (req, res) => {
  let listing = await Listing.findById(req.params.id);
  res.render("show.ejs", {listing : listing});
});

// create new route setup

app.post("/listings", (req, res) => {
  const newListing = Listing(req.body.listing);
  res.send({ newListing });
});

// Edit Route Setup

app.get("/listings/:id/edit", async (req, res) => {
  let { id } = req.params;

  const listing = await Listing.findById(id);
  res.render("edit.ejs", { listing: listing });
});
// Using Method override to update the route setup

const methodOverride = require("method-override");
app.use(methodOverride("_method"));

// Update Route Setup Put

app.put("/listings/:id", async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  res.redirect("/listing");
});

// Delete Route Setup
app.delete("/listings/:id", async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findByIdAndDelete(id);
  res.redirect("/listing");
});



//// Day - 2 

// using ejs mate 

const ejsmate  = require('ejs-mate');
app.engine("ejs", ejsmate);

// Day -3 

// Making Public Folder for static files and images to be used in the project setup

app.use(express.static(path.join(__dirname, "/public")));