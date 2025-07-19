import { useState,useEffect } from "react";
import CDetails from "../components/ContactUsDetails"
import SearchUser from "../components/SearchUser";

export default function AdminDash() {
    const [messages, setMessages] = useState(null);

    useEffect(()=>{
        const fetchMessages = async () =>{
            const response = await fetch('http://localhost:5050/contactus')
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

    const onDelete = (id) => {
        setMessages(prev => prev.filter(m => m._id !== id));
      }

    return (
        <div className="container mx-15 px-15 shadow-xl">
            <div className="mb-10 mt-2 text-3xl font-bold px-3">
                <p>Welcome, {"Insert name here"}</p>
            </div>
            
            <div className="mb-4 text-2xl px-10">
                <p>Inquires from Users:</p>
            </div>
            {/* Fetching all our contact us messages from the server */}
            <div className = "messages mb-4 mx-10 shadow-sm grid grid-cols-1 gap-2">
                {messages && messages.map((mssg) => (
                    // <p key={mssg._id}>{mssg.id}</p>
                    
                    <CDetails key={mssg._id} mssg = {mssg} onDelete={onDelete}/>
                    
                ))}

            </div>

            <div className="mb-4 px-10">
                <p className="mb-2 text-2xl">Look Up User:</p>
                <SearchUser/>
            </div>
            

        </div>

);
}
