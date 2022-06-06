const express = require("express");
const app = express();
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const cors = require("cors");
const authRouter = require("./Routes/Auth")
const buyerRoute = require("./Routes/Buyer")
const sellerRoute = require("./Routes/Seller")
dotenv.config();
app.use(cors());
app.use(express.json());
mongoose.connect(process.env.DB_STR, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    autoIndex: true,
}).then(() => { console.log("DB connected") }).catch((err) => { console.log(err) })

var listener = app.listen(process.env.PORT || 3000, () => {
    console.log("working at " + listener.address().port)
})

// app.get("/yo", () => {
//     console.log("HEHE");
// })

app.use("/api/auth", authRouter);
app.use("/api/buyer", buyerRoute);
app.use("/api/seller", sellerRoute);