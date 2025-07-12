import express from "express";
import { client } from '../db/connection.js';
import { Timestamp } from "mongodb";

const router = express.Router();
const cDB = client.db('contactUsDB');         
let collection = cDB.collection('submissions');

// Get all submissions
router.get('/', async (req, res) => {
    //let results = await collection.find({}).toArray();
    let results = await collection.find({}).sort({createdAt: -1}).toArray();
    res.send(results).status(200);

});

//Get a single submission
router.get('/:id', (req,res)=>{
    res.json({mssg: 'Get a single submission'})
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

//Delete a submission
router.delete('/:id', (req,res)=>{
    res.json({mssg: 'delete a  submission'})
});

//update
router.patch('/:id', (req,res)=>{
    res.json({mssg: 'update a submission'})
});


export default router;