import { useState,useEffect } from "react";
import Table from "../components/Table";
import CDetails from "../components/ContactUsDetails"

export default function AdminDash() {
    const [messages, setMessages] = useState(null);

    useEffect(()=>{
        const fetchMessages = async () =>{
            const response = await fetch('http://localhost:5050/contactus')
            // const response = await fetch('http://localhost:5050/contactus', {
            // method: 'GET',
            // headers: {
            //     'Content-Type': 'application/json'
            // }
            // });
            const json = await response.json();

            if(response.ok)
            {  
                setMessages(json);
                console.log(json);
                console.log(messages);
            }
        }
        fetchMessages();
        console.log(messages);
    }, [])

    return (
        <div className="container mx-15 px-15 shadow-xl">
            <div className="mb-10 mt-2 text-3xl font-bold px-3">
                <p>Welcome, {"Insert name here"}</p>
            </div>
            
            <div className="mb-4 text-2xl px-10">
                <p>Inquires from Users:</p>
            </div>
            {/* <Table/> */}
            <div className = "messages mx-10 shadow-sm grid grid-cols-1 gap-2">
                {messages && messages.map((mssg) => (
                    // <p key={mssg._id}>{mssg.id}</p>
                    
                    <CDetails key={mssg._id} mssg = {mssg}/>
                    
                ))}

            </div>
            

        </div>

);
}
