// Basic Express setup

const express = require("express");
const path = require("path");
const app = express();
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.get("/", (req, res) => {
  res.send("Hello World!");
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

// app.get("/listings", async (req, res) => {
//   let slisting = new Listing({
//     title: "My New Title 2",
//     description: "This is a description for my listing.",
//     price: 1232,
//     location: "New York City",
//     country: "United States of America",
//   });

//   await slisting.save();
//   res.send("its done");
// });

// Index Route setup

app.get("/listings", async (req, res) => {
  const allListings = await Listing.find({});
  res.render("index.ejs", { allListings: allListings });
});

// New Route Setup

app.get("/listings/new", (req, res) => {
  res.render("new.ejs");
});

//Show Route Setup

app.get("/listings/:id", async (req, res) => {
  const listing = await Listing.findById(req.params.id);
  res.render("show.ejs", { listing: listing });
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
