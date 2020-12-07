
const express = require('express');
const app = express()
const subscriberModel = require('./models/subscribers')

// Your code goes here

app.get('/subscribers', async (req, res)=>{
    res.send(await subscriberModel.find());
});

// app.get('/subscribers/names', async (req, res)=>{
//     const fullResults = await subscriberModel.find();
//     const mappedResults = fullResults.map((doc)=>{
//         return{
//             name: doc.name,
//             subscribedChannel: doc.subscribedChannel
//         }
//     })
//     // const mappedResults = fullResults.map((doc)=>({
//     //     name: doc.name,
//     //     subscribedChannel: doc.subscribedChannel
//     // }));
//     res.send(mappedResults);
// });

// using mongoose Projection 
app.get('/subscribers/names', async (req, res)=>{
    const projectedResults = await subscriberModel.find().select({
        name: true,
        subscribedChannel: true,
        _id: false
    });
    res.send(projectedResults);
});

app.get("/subscribers/:id", async (req, res)=>{
    const idToSearch = req.params.id;
    try {
        const doc = await subscriberModel.findOne({_id: idToSearch});
        if(doc == null){
            res.status(400).send({message: "Id not found"})
        }else{
            res.send(doc);
        }
    }catch(err){
        res.status(400).send({message: err.message});
    }
});




















module.exports = app;
