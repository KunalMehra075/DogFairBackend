const express = require("express");
const app = express();
const cors = require("cors");
const { dogsRouter } = require("./Routes/dogs.route");
require("dotenv").config();
app.use(cors("*"))
app.use(express.json());

app.use("/dogs", dogsRouter)

app.get("/", (req, res) => {
    try {
        res.json({ Message: "Welcome to Dog Fair App" });
    } catch (err) {
        console.log(err);
        res.json({ Error: err })
    }
});

app.listen(process.env.PORT, async () => {
    try {
        // await connection;
        console.log("Connected to DB");
    } catch (err) {
        console.log("Error connecting to DB");
    }
    console.log(`Server is Rocking on port ${process.env.PORT}`);
});
