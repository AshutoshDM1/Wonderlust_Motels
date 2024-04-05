const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const listingSchema = new Schema(
  {
    title : { type: String, required: true },
    description: { type: String, required: true },
    image : { 
      url: {
        type : String
      },
      filename : { 
        type: String,
      default : "listing-image1",
    }
    },
    price: { type: Number, required: true },
    location:{type:String},
    country: { type: String}
  }
)

const Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;