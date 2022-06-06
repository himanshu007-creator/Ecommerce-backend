const verifyToken = require("../Middleware/Verify");
const Catalog = require("../Models/catalogModel")
const router = require("express").Router();
const User = require("../Models/userModel")
const Order = require("../Models/orderModel")

router.post("/create-catalog", verifyToken, async(req, res) => {
    const user = req.user;
    const catalog = new Catalog({
        userId: user.id,
        products: req.body.products,
    })
    try {
        const savedCatalog = await catalog.save();
        const userUpdated = await User.updateOne({ _id: user._id }, { $set: { catalog: String(savedCatalog._id) } })
            // User.updateOne({ _id: user.id }, { $set: { pproducts: req.products } });
        res.status(200).json([savedCatalog, user])
    } catch (err) {
        res.status(400).json("not done");
    }
})
router.get("/orders", verifyToken, async(req, res) => {
    const user = req.user;
    try {
        const orders = await Order.find({ sellerId: user.id });
        if (orders.length == 0 || !orders) res.status(400).json("No orders found");
        res.status(400).json(orders);
    } catch (err) {
        res.status(400).json("Unable to get orders RN");
    }

})
module.exports = router