import { NavLink } from "react-router-dom";

export default function ContactUs() {
    return (
        // Container box with green background
        <div className="container mx-15 px-15 shadow-xl">
            <div className="mb-10">
                <p className="text-4xl text-green-800/100 text-center self-center font-bold">Contact Us</p>
            </div>
            
            <div className="flex justify-center">
                <form className="w-full max-w-lg">
                    {/* Name field */}
                    <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/3">
                        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                            Full Name
                        </label>
                        </div>
                        <div className="md:w-2/3">
                        <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green-800" id="inline-full-name" type="text" value="Butch Cougar"/>
                        </div>
                    </div>

                    {/* Email Field */}
                    <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/3">
                        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                            Email
                        </label>
                        </div>
                        <div className="md:w-2/3">
                        <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green-800" id="inline-full-name" type="text" value="Email Address"/>
                        </div>
                    </div>

                    {/* Drop down options */}
                    <div className="md:flex md:items-end justify-end mb-10">
                        <div className="md:w-2/6">
                            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="block">
                                Options
                            </label>
                        </div>
                        <select className="block appearance-none w-4/6 bg-gray-200 border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                            <option>Choose</option>
                            <option>Question</option>
                            <option>Account Issues</option>
                            <option>Password Reset</option>
                            <option>Other</option>
                        </select>
                    </div>

                    <div className="md:flex md:items-start justify-end mb-10">
                        <div className="md:w-2/6">
                            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="large-input">
                                Description
                            </label>
                        </div>
                       
                        <input type="text" id="large-input" className="block w-4/6 p-24 border border-gray-300 rounded-lg bg-gray-200 text-base focus:ring-green-800 focus:border-green-800"/>

                        {/* <input type="text" id="large-input" class="block w-4/6 p-24 text-gray-800 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-green-800"/> */}
                    </div>

                    {/* Send button */}
                    <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/3"/>
                        <div className="md:w-2/3">
                            <button className="shadow bg-green-800 hover:bg-green-600 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button">
                                Send
                            </button>
                        </div>
                    </div>

                </form>
            </div>

        </div>
    );
  }