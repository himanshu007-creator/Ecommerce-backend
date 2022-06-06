const router = require("express").Router();
const User = require("../Models/userModel")
const Order = require("../Models/orderModel")
const verifyToken = require("../Middleware/Verify")
const userModel = require("../Models/userModel");

router.get("/list-of-sellers", async(req, res) => {
    try {
        const buyers = await User.findOne({ role: "Buyer" });
        !buyers && res.status(400).json("NONE")

        res.status(200).json(buyers);

    } catch (err) {
        res.status(400).json(err);
    }
})

router.get("/seller-catalog/:seller_id", async(req, res) => {
    try {
        let seller_id = req.params.seller_id;
        const buyers = await User.findOne({ _id: seller_id });
        !buyers && res.status(400).json("NONE")

        res.status(200).json(buyers);

    } catch (err) {
        res.status(400).json(err);
    }
})


router.post("/create-order/:seller_id", verifyToken, async(req, res) => {
    try {
        const user = req.user
        let seller_id = req.params.seller_id;
        const seller = await User.findOne({ _id: seller_id });
        !seller && res.status(400).json("NONE")

        var order = new Order({
            sellerId: seller_id,
            buyerId: user.id,
            products: req.body.products
        });
        console.log(order)
        const savedOrder = await order.save();
        res.status(200).json({ savedOrder });
    } catch (err) {
        res.status(400).json(err);
    }
})

module.exports = router