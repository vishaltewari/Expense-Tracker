const express = require('express')
var cors = require('cors')
const dotenv=require('dotenv')
const { MongoClient } = require('mongodb');
const bodyparser=require('body-parser')
//dotnev and mongo db of npm used
dotenv.config()

const url = 'mongodb://localhost:27017/';
const client = new MongoClient(url);

const dbName = 'expensesdata';
const app = express()
const port = 3000
app.use(bodyparser.json())
app.use(cors())
 client.connect();
 
//  console.log(process.env.MONGO_URI) // remove this after you've confirmed it is working
 
 app.get('/',async (req, res) => {      //function to get data,get all the details
    const db = client.db(dbName);
    const collection = db.collection('details');
    const findResult = await collection.find({}).toArray();
  res.json(findResult)
})
 app.post('/',async (req, res) => {      //function to insert data,Save the detail  
    const detail=req.body
    const db = client.db(dbName);
    const collection = db.collection('details');
    console.log(req.body)
    const findResult = await collection.insertOne(detail);
 res.send({success:true,result:findResult})
})
//delete the detail by id
app.delete('/',async (req, res) => {      //function to insert data,Save the detail  
    const detail=req.body
    const db = client.db(dbName);
    const collection = db.collection('details');
    const findResult = await collection.deleteOne(detail);
 res.send({success:true,result:findResult})
})
app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})