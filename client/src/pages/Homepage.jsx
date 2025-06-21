
export default function Homepage() {
    return (
      <div className="container mx-15 px-15 shadow-xl">
        <div className="bg-blue-500 h-fit mb-10 flex items-center">
            <img src="/src/assets/nutrition_phone.jpg" alt="phone" className="border-2 rounded-md shadow-md size-1/3 m-1 object-cover"/>
            <text>
                <p className="text-2xl text-white">#1 nutrition app </p>
                <p className="text-6xl text-white text-pretty font-bold font-stretch-normal tracking-wide ml-5px">Nutrition tracking for real life</p>
            </text>
            
            
        </div>
        
        <div className="mb-10">
            <p className="text-6xl text-blue-600/100 text-center self-center font-bold">Hit your goals in 1-2-3!</p>
        </div>

        <div className="justify-items-center"> 
        <div className="fact1 flex flex-row items-center justify-center gap-4 mb-10">
            
            <img src="/src/assets/telephone-nutrition-app.jpg" alt="Checking Data" className="border-2 rounded-md shadow-md h-48 w-1/4"/>
            <text>
                <p className="text-5xl font-bold text-blue-600/100">1</p>
                <p className="text-2xl font-bold">
                    Keeping track of your nutrition made easy
                </p> 
                <p>Scan nutrition labels to record your calorie intake </p>
            </text>
        </div>

        <div className="fact2 flex flex-row items-center justify-center gap-4 mb-10">
            
            <img src="/src/assets/Checking-Data.jpg" alt="Checking Data" className="border-2 rounded-md shadow-md h-48 w-1/4"/>
            <text>
                <p className="text-5xl font-bold text-blue-600/100">2</p>
                <p className="text-2xl font-bold">
                    Follow your progress every step of the way
                </p> 
                <p>Input various workouts, including weight training</p>
                <p>,running and much more!</p>
            </text>
        </div>

        <div className="fact3 flex flex-row items-center justify-center gap-4">
            
            <img src="/src/assets/success_hoodie.jpg" alt="Checking Data" className="border-2 rounded-md shadow-md h-48 w-1/4"/>
            <text>
                <p className="text-5xl font-bold text-blue-600/100">3</p>
                <p className="text-2xl font-bold">
                    Eat healthier and crush your goals
                </p> 
                <p>Get an overview of the foods you eat and how much </p>
                <p>calories you burn. See what needs to get done to accomplish</p>
                <p>your goals</p>
            </text>
        </div>
        </div>  

        
      </div>
    );
  }