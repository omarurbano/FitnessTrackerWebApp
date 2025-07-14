import React, { useState } from 'react';
import Modal from "./Modal"


export default function CDetails({mssg})
{

    const [open, setOpen] = useState(false);
    
    const testFunc = () =>{
        console.log(mssg._id);
        setOpen(true);
    }

    return(
    //console.log("Made it here");
    

        <div className="bg-white contact-us-deets border p-2 hover:bg-gray-200 focus:outline-2 focus:outline-offset-2 focus:outline-gray-200 active:bg-gray-300" onClick={testFunc}>
            <h4><strong>From:</strong>{mssg.Name}</h4>
            <p><strong>Recieved:</strong>{mssg.createdAt}</p>
            <p><strong>Type:</strong> {mssg.Option}</p>
            <p><strong>Message:</strong>{mssg.Description}</p>
            
            <Modal open = {open} onClose={() => setOpen(false)}>
                <p>Testing modal now</p>
            </Modal>
           
        </div>

        
    

    );
}