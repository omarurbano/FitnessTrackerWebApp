import React, { useState } from 'react';
import Modal from "./Modal";


export default function SearchUser()
{
    const [userEmail, setuserEmail] = useState("");
    const [open, setOpen] = useState(false);
    const [userinfo, setUserInfo] = useState([]);
    
    const[uName, setName] = useState("");
    const[uEmail, setEmail] = useState("");
    const[uPassword, setPassword] = useState("");

    const fetchUser = async () =>{
        const response = await fetch("http://localhost:5050/user/" + encodeURIComponent(userEmail));
        const json = await response.json();

        if(response.ok)
        {  
            const {name, email, password} = json;
            setUserInfo(json);
            setName(name);
            setEmail(email);
            console.log(json);
            setOpen(true);
        }
    }

    // Searching for user based on the email provided
    const handleSubmit = async (e) => {
        e.preventDefault();
        fetchUser();
        console.log(userinfo);
    }

    // Handle updates made to user info in modal
    const handleModalClck = async (e) => {
        if(uPassword == "")
        {
            const {password} = userinfo;
            setPassword(password)
        }
        if(uEmail == "")
        {
            const {email} = userinfo;
            setEmail(email)
        }
        if(uName == "")
        {
            const {name} = userinfo;
            setName(name)
        }

        const {password} = userinfo
        const data = {uName, uEmail, uPassword, password};

        const response = await fetch('http://localhost:5050/user/' + userEmail, {
            method: 'PATCH',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if(response.ok)
        {  
            setName("");
            setEmail("");
            setPassword("");
            setOpen(false);
        }
        
    }

    return ( 
        <div className='mb-4'>
            {/* Search user form */}
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
            
            {/* Modal to edit user information */}
            <Modal open = {open} onClose={() => setOpen(false)}>
                <div className='grid grid-cols-1 gap-2'>
                    <div className='flex justify-center'> 
                        <header className='text-xl font-bold'> Edit User</header>
                    </div>

                    <div className='flex justify-start'> 
                        <p className='text-md font-bold underline'>{userinfo.name}:</p>
                        <input 
                            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green-800"
                            type="text"
                            placeholder="Name"
                            value={uName}
                            onChange={(e) => setName(e.target.value)}
                            />
                    </div>

                    <div className='flex justify-start'> 
                        <p className='text-md font-bold underline'>{userinfo.email}:</p>
                        <input 
                            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green-800"
                            type="text"
                            placeholder="Email"
                            value={uEmail}
                            onChange={(e) => setEmail(e.target.value)}
                            />
                    </div>

                    <div className='flex justify-start'> 
                        <p className='text-md font-bold underline'>Password:</p>
                        <input 
                            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green-800"
                            type="text"
                            placeholder="Type new password to reset"
                            value={uPassword}
                            onChange={(e) => setPassword(e.target.value)}
                            />
                    </div>

                    <div className='flex justify-center'>
                        <button onClick={handleModalClck} className='border bg-gray-200'>Update</button>
                    </div>
                </div>
            </Modal>
        </div>
    );

}
