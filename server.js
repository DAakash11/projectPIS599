const express = require('express');
const path = require('path');
const { MongoClient, ServerApiVersion } = require("mongodb");
const mongoose = require('mongoose');

const app = express()
app.use(express.json())
const port = 3000

const uri = "mongodb+srv://hotelroombookings:rooms123@cluster0.x5wvw.mongodb.net/roombooking?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri,  {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server (optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
run().catch(console.dir);


main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(uri);
}

const { Schema } = mongoose;

const roomSchema = new Schema({
    roomname: String, 
    bookedBy: String,
    price: Number,
});

const Rooms = mongoose.model('roomsdata', roomSchema);

app.get('/api', async (req, res) => {
    const dataHolder = await Rooms.find({})
    res.send(dataHolder)
    ;(await dataHolder).forEach(element => {
        console.log(element.roomname);
        console.log(element.bookedBy);
        console.log(element.custname);
        console.log(element.price);
    });
})

app.post('/api', async (req, res) => {
    const dataHolder = new Rooms({
        roomname : req.body.roomname,
        bookedBy : req.body.bookedBy,
        price : req.body.price,
    })
    await dataHolder.save()
    res.send('Room created successfully..')
    console.log('Room created successfully..')
})

app.delete('/api/:id', async (req, res) => {
    await Rooms.findByIdAndDelete(req.params.id)
    res.send('Rooms deleted successfully..')
    console.log('Rooms deleted successfully..')
})

app.patch('/api/:id', async (req, res) => {
    await Rooms.findByIdAndUpdate(req.params.id, req.body)
    res.send('Rooms updated successfully..')
    console.log('Rooms updated successfully..')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;
