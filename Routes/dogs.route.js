const express = require("express");
const dogsRouter = express.Router()
const fs = require("fs")
let DBpath = __dirname + "/db.json"
let RDpath = __dirname + "/randomImages.json"
//!GET A DOG
dogsRouter.get("/", async (req, res) => {
    try {
        const Data = fs.readFileSync(DBpath, "utf-8")
        res.json(JSON.parse(Data));
    } catch (err) {
        console.log(err);
        res.json({ Error: err })
    }
});
//!GET A DOG by ID
dogsRouter.get("/id/:id", async (req, res) => {
    let id = req.params.id
    try {
        const Data = JSON.parse(fs.readFileSync(DBpath, "utf-8")).dogs
        let instance = Data.filter((item) => item.id == id)[0]
        console.log(instance);
        res.json(instance);
    } catch (err) {
        console.log(err);
        res.json({ Error: err })
    }
});

//!POST A DOG
dogsRouter.post("/create", async (req, res) => {
    let dog = req.body
    let dogs = JSON.parse(fs.readFileSync(DBpath, "utf-8")).dogs
    dog.id = dog.name + dog.age
    console.log("To Add", dog);
    dogs.push(dog)
    try {
        fs.writeFileSync(DBpath, JSON.stringify({ dogs: dogs }))
        res.json({ Message: "New Dog Created", create: "true" });
    } catch (err) {
        console.log(err);
        res.json({ Error: err })
    }
});

//!DELETE DOG
dogsRouter.delete("/delete/:id", async (req, res) => {
    let id = req.params.id
    try {
        let dogs = JSON.parse(fs.readFileSync(DBpath, "utf-8")).dogs
        dogs = dogs.filter((item) => item.id != id)
        fs.writeFileSync(DBpath, JSON.stringify({ dogs: dogs }))
        res.json({ Message: `Dog Deleted with ID ${id}`, deleted: "true" });
    } catch (err) {
        console.log(err);
        res.json({ Error: err })
    }
});
//!EDIT DOG
dogsRouter.patch("/edit/:id", async (req, res) => {
    let id = req.params.id
    let payload = req.body
    try {
        let dogs = JSON.parse(fs.readFileSync(DBpath, "utf-8")).dogs
        for (let doggo of dogs) {
            if (doggo.id == id) {
                console.log(doggo);
                doggo.name = payload.name
                doggo.age = payload.age
                doggo.place = payload.place
                doggo.gender = payload.gender
                break
            }
        }
        fs.writeFileSync(DBpath, JSON.stringify({ dogs: dogs }))
        res.json({ Message: `Dog Updated with ID ${id}`, edited: "true" });
    } catch (err) {
        console.log(err);
        res.json({ Error: err })
    }
});

//? <!----------------------------------------------- < For random image generation> ----------------------------------------------->

//!Random img A DOG
dogsRouter.post("/image", async (req, res) => {
    let image = req.body.image
    let Images = JSON.parse(fs.readFileSync(RDpath, "utf-8")).Images
    Images.push(image)
    try {
        fs.writeFileSync(RDpath, JSON.stringify({ Images: Images }))
        res.json({ Message: "New Image Added", create: "true" });
    } catch (err) {
        console.log(err);
        res.json({ Error: err })
    }
});
// ! GET RANDOM IMAGES
dogsRouter.get("/getrandomimages", async (req, res) => {
    try {
        let Images = JSON.parse(fs.readFileSync(RDpath, "utf-8")).Images
        res.json({ Message: "Images Are Here", Images: Images });
    } catch (err) {
        console.log(err);
        res.json({ Error: err })
    }
});

module.exports = { dogsRouter };