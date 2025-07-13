import express from "express";
import { client } from '../db/connection.js';
import { ObjectId } from "mongodb";
import { Timestamp } from "mongodb";

const router = express.Router();
const cDB = client.db('contactUsDB');         
let collection = cDB.collection('submissions');

// Get all submissions in latest ones first, and only the ones that have not been resolved
router.get('/', async (req, res) => {
    //let results = await collection.find({}).toArray();
    let results = await collection.find({isResolved: false}).sort({createdAt: -1}).toArray();
    //collection.find({isResolved: false})
    res.send(results).status(200);

});

//Get a single submission
router.get('/:id', async (req,res)=>{
    
    let query = { _id: new ObjectId(req.params.id) };
    let result = await collection.findOne(query);
    if(!result)
    {
        res.send("Not found").status(404);
    }
    res.send(result).status(200);
});

//Post a submission
router.post('/', async (req,res) => {
    try {
        console.log("Made it to router post");
        const {sName, sEmail, sOption, sDescription} = req.body;
        let newDocument = {
            Name: sName,
            Email: sEmail,
            Option: sOption,
            Description: sDescription,
            createdAt: new Date(),
            updatedAt: new Date(),
            isResolved: false
        };  
        //const newSub = { sName, sEmail, sOption, sDescription, };
        const result = await collection.insertOne(newDocument);
        console.log(result);
        res.json({
            status: "SUCCESS",
            message: "Contact us submission successfully submitted",
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to add submission' });
    }
});

//Delete operation, but not actually deleting, just setting to resolve so it doesnt show in get
router.delete('/:id', async (req,res)=>
{
    //res.json({mssg: 'update a submission'})
    try {
        const query = { _id: new ObjectId(req.params.id) };
        const updates = {
            $set: {
                isResolved: true,
                updatedAt: new Date() 
            },
        };
        let result = await collection.updateOne(query, updates);
        res.send(result).status(200);

    } catch (err) {
        console.error(err);
        res.status(500).send("Error updating record");
    }
});

//We are only allowing the updates to occur on isResolved and updatedAt, everything else will remain the same
router.patch('/:id', async (req,res)=>{
    //res.json({mssg: 'update a submission'})
    try {
        const query = { _id: new ObjectId(req.params.id) };
        const updates = {
            $set: {
                isResolved: true,
                updatedAt: new Date() 
            },
        };
        let result = await collection.updateOne(query, updates);
        res.send(result).status(200);

    } catch (err) {
        console.error(err);
        res.status(500).send("Error updating record");
    }
});


export default router;