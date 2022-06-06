const mongoose = require("mongoose");

const catalogSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true
    },

    products: [{
        name: {
            type: String,
            required: true,
            unique: true
        },
        price: {
            type: Number,
            required: true,
        }
    }]

}, { timestamps: true });

module.exports = mongoose.model("Catalog", catalogSchema)