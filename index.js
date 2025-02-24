const express = require('express');
const urlRoute = require("./routers/url");
const URL = require("./models/url");

const { connectToMongoDB } = require('./connection');

const app = express();
const port = 8001;

connectToMongoDB("mongodb+srv://abhishekkumarit6:IBWeG37vzB8g8Luu@cluster0.hbdc3.mongodb.net/urlShortner").then(()=>{
    console.log("Mongodb connected");
});

app.use(express.json());

app.use("/", urlRoute);


app.get('/:shortId', async(req, res)=>{
    console.log("checking 19");
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId,
    },{
        $push:{
            visitHistory:{
                timestamp:Date.now(),
            }
            
        }
    });
    res.redirect(entry.redirectURL);
})


app.listen(port, ()=>console.log(" server sucessfully listening at "+    port))