const mongoose = require("mongoose");

const gemregistrationSchema = new mongoose.Schema(
    {
        name: {
            type: String
        },
        email: {
            type: String
        },
        contact: {
            type: Number
        },
        aadhar:{
            type: Number
        },
        companyName: {
            type: String
        },
        panNumber: {
            type: String
        },
        websiteAddress: {
            type: String
        },
        gst: {
            type: String
        },
        startDate:{
            type:Date
        },
        address: {
            type: String
        },
        country: {
            type: String
        },
        state:{
            type:String
        },
        city: {
            type: String
        },
        zip: {
            type: Number
        }
    },
    { timestamps: true }
);

const gemregistrationForm = mongoose.model("Gem-Registration", gemregistrationSchema);

module.exports = gemregistrationForm;
