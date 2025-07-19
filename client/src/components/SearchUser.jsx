import React, { useState } from 'react';
import Modal from "./Modal"


export default function SearchUser()
{
    const [userEmail, setuserEmail] = useState("");
    const [open, setOpen] = useState(false);
    const [userinfo, setUserInfo] = useState([]);

    // function fetchUser()
    // {
    //     fetch("http://localhost:5050/user" + userEmail)
    //       .then((res) => res.json())
    //       .then((data) => {
    //         setUserInfo(data);
    //         setOpen(true);
    //     })
    //       .catch((err) => console.log(err));
    // };
    const fetchUser = async () =>{
        const response = await fetch("http://localhost:5050/user/" + encodeURIComponent(userEmail))
        const json = await response.json();

        if(response.ok)
        {  
            setUserInfo(json);
            console.log(json);
            setOpen(true);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        fetchUser();
        
        
        console.log(userinfo);
    }

    return ( 
        <div className='mb-4'>
            <form onSubmit={handleSubmit}>
                
                <div className='flex justify-start'>
                    <div className="md:w-2/3">
                        <input 
                            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green-800" 
                            id="inline-full-name" 
                            type="text"
                            placeholder="User Email"
                            name="uEmail"
                            onChange={(e) => setuserEmail(e.target.value)}
                            value={userEmail}/>
                    </div>
                    
                    
                    
                    <div className="md:w-2/3">
                        <button 
                            className="shadow bg-green-800 hover:bg-green-600 focus:shadow-outline focus:outline-none text-white font-bold py-1 px-2 rounded"
                            type="submit"
                            id="submitBtn">
                            Search
                        </button>
                    </div>
                </div>
                

            </form>

            <Modal open = {open} onClose={() => setOpen(false)}>
                <div className='grid grid-cols-1 gap-2'>
                    <p className='text-xl font-bold underline'>Testing</p>
                    {/* <p className="text-wrap">{mssg.Description}</p> */}
                    {/* <textarea
                            id="large-input"
                            name="description"
                            placeholder="Description here:"
                            className="block w-full h-32 p-2 text-left bg-gray-200 border-2 border-gray-200 rounded text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green-800"
                            onChange={(e)=>setResponse(e.target.value)}
                            value={sendResponse}
                    ></textarea>
                    <button className='border bg-gray-200' onClick={responseModal}>Send</button> */}
                </div>
            </Modal>
        </div>
    );

}
