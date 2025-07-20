import React, { useState } from 'react';
import Modal from "./Modal"


export default function CDetails({mssg, onDelete})
{

    const [open, setOpen] = useState(false);
    const [response, setResponse] = useState("");
    
    // Open Modal when a message is clicked
    const OnMssgClick = () =>{
        console.log(mssg._id);
        setOpen(true);
    }

    // Format the createOn
    const formatLocalDate = (date) =>
        new Date(date).toLocaleDateString("en-CA") + " | " + new Date(date).toLocaleTimeString("en-CA"); // e.g. "2025-07-18"

    // When a messaged is replied to, will send a delete request to mark it as resolved and will update page
    // Will also send an email to the person who contacted with the reply
    const responseModal = async (e) => {
        console.log(response);
        const email = mssg.Email;
        const option = mssg.Option;
        const data = {email, response, option};

        await fetch('http://localhost:5050/sendreply', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(_res => _res.json())
        .catch(err => console.log(err));

        const res = await fetch('http://localhost:5050/contactus/' + mssg._id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        //setOpen(false);
        if (res.ok) {
            setTimeout(2000);
            setOpen(false);
            onDelete(mssg._id);
        } else {
            console.error("Failed to delete");
        }
        
    }

    return(
        // Single message from contact us
        <div className="bg-white contact-us-deets border rounded-md shadow-md p-2 hover:bg-gray-200 focus:outline-2 focus:outline-offset-2 focus:outline-gray-200 active:bg-gray-300" onClick={OnMssgClick}>
            <h4><strong>From:</strong>{mssg.Name}</h4>
            <p><strong>Recieved:</strong>{formatLocalDate(mssg.createdAt)}</p>
            <p><strong>Type:</strong> {mssg.Option}</p>
            <p className='line-clamp-2'><strong>Message:</strong>{mssg.Description}</p>
            
            {/* When admin clicks on a message, will be able to reply to it */}
            <Modal open = {open} onClose={() => setOpen(false)}>
                <div className='grid grid-cols-1 gap-2'>
                    <p className='text-xl font-bold underline'>From: {mssg.Name}</p>
                    <p className="text-wrap">{mssg.Description}</p>
                    <textarea
                            id="large-input"
                            name="description"
                            placeholder="Description here:"
                            className="block w-full h-32 p-2 text-left bg-gray-200 border-2 border-gray-200 rounded text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green-800"
                            onChange={(e)=>setResponse(e.target.value)}
                            value={response}
                    ></textarea>
                    <button className='border bg-gray-200' onClick={responseModal}>Send</button>
                </div>
            </Modal>
           
        </div>
        
    );
}