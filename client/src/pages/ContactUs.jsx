import { NavLink } from "react-router-dom";

export default function ContactUs() {
    return (
        // Container box with green background
        <div className="container mx-15 px-15 shadow-xl">
            <div className="mb-10">
                <p className="text-4xl text-green-800/100 text-center self-center font-bold">Contact Us</p>
            </div>
            
            <div className="flex justify-center">
                <form class="w-full max-w-lg">
                    {/* Name field */}
                    <div class="md:flex md:items-center mb-6">
                        <div class="md:w-1/3">
                        <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                            Full Name
                        </label>
                        </div>
                        <div class="md:w-2/3">
                        <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green-800" id="inline-full-name" type="text" value="Butch Cougar"/>
                        </div>
                    </div>

                    {/* Email Field */}
                    <div class="md:flex md:items-center mb-6">
                        <div class="md:w-1/3">
                        <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                            Email
                        </label>
                        </div>
                        <div class="md:w-2/3">
                        <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green-800" id="inline-full-name" type="text" value="Email Address"/>
                        </div>
                    </div>

                    {/* Drop down options */}
                    <div class="md:flex md:items-end justify-end mb-10">
                        <div class="md:w-2/6">
                            <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="block">
                                Options
                            </label>
                        </div>
                        <select class="block appearance-none w-4/6 bg-gray-200 border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                            <option>Choose</option>
                            <option>Question</option>
                            <option>Account Issues</option>
                            <option>Password Reset</option>
                            <option>Other</option>
                        </select>
                    </div>

                    <div class="md:flex md:items-start justify-end mb-10">
                        <div class="md:w-2/6">
                            <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="large-input">
                                Description
                            </label>
                        </div>
                       
                        <input type="text" id="large-input" class="block w-4/6 p-24 border border-gray-300 rounded-lg bg-gray-200 text-base focus:ring-green-800 focus:border-green-800"/>

                        {/* <input type="text" id="large-input" class="block w-4/6 p-24 text-gray-800 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-green-800"/> */}
                    </div>

                    {/* Send button */}
                    <div class="md:flex md:items-center mb-6">
                        <div class="md:w-1/3"/>
                        <div class="md:w-2/3">
                            <button class="shadow bg-green-800 hover:bg-green-600 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button">
                                Send
                            </button>
                        </div>
                    </div>

                </form>
            </div>
            {/* Footer */}
            <div>
                <footer className="flex flex-col items-center justify-center">
                    <p>&copy; 2025 CoreTrack. All rights reserved.</p>
                    {/* <a href="https://google.com">Contact Us</a> */}
                    <NavLink className="inline-flex items-center justify-center whitespace-nowrap text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 h-9 rounded-md px-3 mb-1" to="/ContactUs">
                        Contact Us
                    </NavLink>
                    {/* <a href="https://google.com">About Us</a> */}
                    <NavLink className="inline-flex items-center justify-center whitespace-nowrap text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 h-9 rounded-md px-3 mb-1" to="/about-us">
                        About Us
                    </NavLink>
                    <div className="flex flex row items-center justify-center">
                        {/* <!-- Facebook --> */}
                        <span class="[&>svg]:h-5 [&>svg]:w-5">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 320 512">
                            {/* <!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc. --> */}
                            <path
                            d="M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5c16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0C129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z" />
                        </svg>
                        </span>

                        {/* <!-- TikTok --> */}
                        <span class="[&>svg]:h-5 [&>svg]:w-5">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 448 512">
                            {/* <!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc. --> */}
                            <path
                            d="M448 209.9a210.1 210.1 0 0 1 -122.8-39.3V349.4A162.6 162.6 0 1 1 185 188.3V278.2a74.6 74.6 0 1 0 52.2 71.2V0l88 0a121.2 121.2 0 0 0 1.9 22.2h0A122.2 122.2 0 0 0 381 102.4a121.4 121.4 0 0 0 67 20.1z" />
                        </svg>
                        </span>

                        {/* <!-- Instagram --> */}
                        <span class="[&>svg]:h-5 [&>svg]:w-5">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 448 512">
                            {/* <!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc. --> */}
                            <path
                            d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                        </svg>
                        </span>

                        {/* <!-- Discord --> */}
                        <span class="[&>svg]:h-5 [&>svg]:w-5">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 640 512">
                            {/* <!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc. --> */}
                            <path
                            d="M524.5 69.8a1.5 1.5 0 0 0 -.8-.7A485.1 485.1 0 0 0 404.1 32a1.8 1.8 0 0 0 -1.9 .9 337.5 337.5 0 0 0 -14.9 30.6 447.8 447.8 0 0 0 -134.4 0 309.5 309.5 0 0 0 -15.1-30.6 1.9 1.9 0 0 0 -1.9-.9A483.7 483.7 0 0 0 116.1 69.1a1.7 1.7 0 0 0 -.8 .7C39.1 183.7 18.2 294.7 28.4 404.4a2 2 0 0 0 .8 1.4A487.7 487.7 0 0 0 176 479.9a1.9 1.9 0 0 0 2.1-.7A348.2 348.2 0 0 0 208.1 430.4a1.9 1.9 0 0 0 -1-2.6 321.2 321.2 0 0 1 -45.9-21.9 1.9 1.9 0 0 1 -.2-3.1c3.1-2.3 6.2-4.7 9.1-7.1a1.8 1.8 0 0 1 1.9-.3c96.2 43.9 200.4 43.9 295.5 0a1.8 1.8 0 0 1 1.9 .2c2.9 2.4 6 4.9 9.1 7.2a1.9 1.9 0 0 1 -.2 3.1 301.4 301.4 0 0 1 -45.9 21.8 1.9 1.9 0 0 0 -1 2.6 391.1 391.1 0 0 0 30 48.8 1.9 1.9 0 0 0 2.1 .7A486 486 0 0 0 610.7 405.7a1.9 1.9 0 0 0 .8-1.4C623.7 277.6 590.9 167.5 524.5 69.8zM222.5 337.6c-29 0-52.8-26.6-52.8-59.2S193.1 219.1 222.5 219.1c29.7 0 53.3 26.8 52.8 59.2C275.3 311 251.9 337.6 222.5 337.6zm195.4 0c-29 0-52.8-26.6-52.8-59.2S388.4 219.1 417.9 219.1c29.7 0 53.3 26.8 52.8 59.2C470.7 311 447.5 337.6 417.9 337.6z" />
                        </svg>
                        </span>
                    </div>
                </footer>
            </div>

        </div>
    );
  }