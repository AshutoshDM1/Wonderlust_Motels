// Initialise the data in mongo database file

const mongoose = require("mongoose");
const initdata = require("./data.js");
const Listing = require("../models/Listing.js");

const mongoUrl = "mongodb+srv://downlodemaster2:eAGmRemCcdSQB6LO@cluster0.1d21wvg.mongodb.net/wanderlust";

async function main() {
  await mongoose.connect(mongoUrl);
}
main()
  .then(() => console.log(`Connected to Database`))
  .catch((err) => console.error("Error connecting to database", err));

const initDb = async () => {
  await Listing.deleteMany({});
  await Listing.insertMany(initdata.data)
  await mongoose.connect(mongoUrl);
};

initDb();