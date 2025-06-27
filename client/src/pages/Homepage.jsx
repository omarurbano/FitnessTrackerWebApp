import { NavLink } from "react-router-dom";

export default function Homepage() {
    return (
        
      <div className="container mx-15 px-15 shadow-xl">
        {/*Container box with green background */}
        <div className="bg-green-800 py-16 mb-10 flex items-center">
            <img src="/src/assets/nutrition_phone.jpg" alt="phone" className="px-1 rounded-md shadow-md size-1/3 m-1 object-cover"/>
            <text className="px-6">
                <p className="text-2xl text-white">#1 nutrition app </p>
                <p className="text-6xl text-white text-pretty font-bold font-stretch-normal tracking-wide ml-5px">Nutrition tracking for real life</p>
            </text>
        </div>
        
        {/* Header */}
        <div className="mb-10">
            <p className="text-6xl text-green-800/100 text-center self-center font-bold">Hit your goals in 1-2-3!</p>
        </div>

        {/* Facts */}
        <div className="justify-items-center mb-10"> 
            <div className="fact1 flex flex-row items-center justify-center gap-4 mb-10 transform h-64 transition duration-500 hover:scale-125">
                
                <img src="/src/assets/telephone-nutrition-app.jpg" alt="Checking Data" className="border-2 rounded-md shadow-md h-48 w-1/4"/>
                <text>
                    <p className="text-5xl font-bold text-green-800/100">1</p>
                    <p className="text-2xl font-bold">
                        Keeping track of your nutrition made easy
                    </p> 
                    <p>Scan nutrition labels to record your calorie intake </p>
                </text>
            </div>

            <div className="fact2 flex flex-row items-center justify-center gap-4 mb-10 transform h-64 transition duration-500 hover:scale-125">
                
                <img src="/src/assets/Checking-Data.jpg" alt="Checking Data" className="border-2 rounded-md shadow-md h-48 w-1/4"/>
                <text>
                    <p className="text-5xl font-bold text-green-800/100">2</p>
                    <p className="text-2xl font-bold">
                        Follow your progress every step of the way
                    </p> 
                    <p>Input various workouts, including weight training</p>
                    <p>,running and much more!</p>
                </text>
            </div>

            <div className="fact3 flex flex-row items-center justify-center gap-4 transform h-64 transition duration-500 hover:scale-125">
                
                <img src="/src/assets/success_hoodie.jpg" alt="Checking Data" className="border-2 rounded-md shadow-md h-48 w-1/4"/>
                <text>
                    <p className="text-5xl font-bold text-green-800/100">3</p>
                    <p className="text-2xl font-bold">
                        Eat healthier and crush your goals
                    </p> 
                    <p>Get an overview of the foods you eat and how much </p>
                    <p>calories you burn. See what needs to get done to accomplish</p>
                    <p>your goals</p>
                </text>
            </div>
        </div>
         

         {/*Reviews  */}
        <div className="mb-10">
            <p className="text-6xl text-green-800/100 text-center self-center font-bold">Customer Reviews</p>
        </div>
        <div className="flex flex-row justify-center gap-20">

            <div className="review1 box-content size-48 border-2 shadow-md p-2 rounded-md grid grid-cols-1 justify-items-center">
                <p>This has helped me improved in my nutrition and make gains at the gym!</p>
                <img src="/src/assets/butchCoug.jpg" alt="Butch Cougar" className="rounded-full shadow-md size-12 mb-3 self-end"></img>
                <p>-Butch Cougar</p>
            </div>

            <div className="review1 box-content size-48 border-2 shadow-md p-2 rounded-md grid grid-cols-1 justify-items-center">
                <p>CoreTrack has helped me keep my workouts organize and see my progress!</p>
                <img src="/src/assets/butchCoug2.jpg" alt="Butch Cougar" className="rounded-full shadow-md size-12 mb-3 self-end"></img>
                <p>-Butch Cougar II</p>
            </div>

            <div className="review1 box-content size-48 border-2 shadow-md p-2 rounded-md grid grid-cols-1 justify-items-center">
                <p>The nutrition look up is game changer! I see everything I am taking in and can adjust as needed.</p>
                <img src="/src/assets/butchCoug3.jpeg" alt="Butch Cougar" className="rounded-full shadow-md size-12 mb-3 self-end"></img>
                <p>-Butch Cougar III</p>
            </div>

        </div>
      </div>
    );
  }