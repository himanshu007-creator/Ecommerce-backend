const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    sellerId: {
        type: String,
        required: true
    },
    buyerId: {
        type: String,
        required: true
    },
    products: [{
        name: {
            type: String,
            required: true,
            unique: true
        },
        quantity: {
            type: Number,
            required: true,
            default: 1
        }
    }]

}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);