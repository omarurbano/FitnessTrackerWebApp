import {useState} from "react"

export default function ContactUs() {
    
    const [sName, setName] = useState('')
    const [sEmail, setEmail] = useState('')
    const [sOption, setOption] = useState('')
    const [sDescription, setDescription] = useState('')
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault();

        const csDetails = {sName, sEmail, sOption, sDescription}
        const response = await fetch('http://localhost:5050/contactus', {
            method: 'POST',
            body: JSON.stringify(csDetails),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const json = await response.json();

        if(!response.ok){
            setError(json.error);
        }
        if(response.ok){
            setName('');
            setEmail('');
            setDescription('');
            setOption('');
            setError(null);
            console.log('new submission added', json);
            
        }
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="mb-10">
                <p className="text-4xl text-green-800/100 text-center self-center font-bold">Contact Us</p>
            </div>
            
            <div className="flex justify-center">
                <form className="w-full max-w-lg" onSubmit={handleSubmit}>
                    {/* Name field */}
                    <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/3">
                            <label 
                                className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" 
                                htmlFor="inline-full-name">
                                Full Name
                            </label>
                        </div>
                        <div className="md:w-2/3">
                            <input 
                                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green-800" 
                                id="inline-full-name" 
                                type="text"
                                placeholder="Butch Cougar"
                                name="fullName"
                                onChange={(e) => setName(e.target.value)}
                                value={sName}
                                required/>
                        </div>
                    </div>

                    {/* Email Field */}
                    <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/3">
                            <label 
                                className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" 
                                htmlFor="inline-full-name">
                                Email
                            </label>
                        </div>
                        <div className="md:w-2/3">
                            <input 
                                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green-800" 
                                id="inline-full-name" 
                                type="email"
                                name="Email"
                                placeholder="Email Address"
                                onChange={(e) => setEmail(e.target.value)}
                                value={sEmail}
                                required/>
                        </div>
                    </div>

                    {/* Drop down options */}
                    <div className="md:flex md:items-end justify-end mb-10">
                        <div className="md:w-2/6">
                            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="block">
                                Options
                            </label>
                        </div>
                        <select 
                            className="block appearance-none w-4/6 bg-gray-200 border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                            onChange={(e) => setOption(e.target.value)}
                            value={sOption}>
                            <option value="" disabled>Choose</option>
                            <option value="Question">Question</option>
                            <option value="Account Issues">Account Issues</option>
                            <option value="Password Reset">Password Reset</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    <div className="md:flex md:items-start justify-end mb-10">
                        <div className="md:w-2/6">
                            <label 
                                className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                                htmlFor="large-input">
                                Description
                            </label>
                        </div>
                        <textarea
                            id="large-input"
                            name="description"
                            placeholder="Description here:"
                            className="block w-4/6 h-32 p-2 text-left bg-gray-200 border-2 border-gray-200 rounded text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green-800"
                            onChange={(e)=>setDescription(e.target.value)}
                            value={sDescription}
                            required
                        ></textarea>
                    </div>

                    {/* Send button */}
                    <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/3"/>
                        <div className="md:w-2/3">
                            <button 
                                className="shadow bg-green-800 hover:bg-green-600 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                                type="submit"
                                id="submitBtn">
                                Send
                            </button>
                        </div>
                    </div>

                </form>
            </div>

        </div>
        
    );
  }