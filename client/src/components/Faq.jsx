import { useState } from 'react';

export default function FAQ() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);

  return (
    
    <div className="max-w-xl mx-auto overflow-hidden">
    {/* first question */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 text-left font-medium text-gray-800 bg-gray-100 hover:bg-gray-200 rounded-md"
      >
        <span>Is CoreTrack is free app?</span>
        <svg
          className={`w-4 h-4 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="p-5 bg-white border-t border-gray-100">
          <p className="mb-2 text-gray-600">
            Yes! If you're looking for a free calorie counter app, you're in the right place. Simply sign up for your free account here and start tracking your food.
            The CoreTrack app does a lot more than track calories in foods. You can also track workouts and see your progression towards your goals.
          </p>
        </div>
      )}
      {/* Second question */}
      <button
        onClick={() => setIsOpen1(!isOpen1)}
        className="w-full flex items-center justify-between p-5 text-left font-medium text-gray-800 bg-gray-100 hover:bg-gray-200 rounded-md"
      >
        <span>How to track calories with CoreTrack?</span>
        <svg
          className={`w-4 h-4 transform transition-transform duration-200 ${isOpen1 ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen1 && (
        <div className="p-5 bg-white border-t border-gray-100">
          <p className="mb-2 text-gray-600">
            If you want to know how many calories are in the foods you eat, or how many calories you eat each day, the CoreTrack app makes it easy.
            Sign up for a free account, then you can quickly look up calories and nutrients for any food AND track it all to see the impact of food on your health and fitness goals.
          </p>
        </div>
      )}
      {/* Third question */}
      <button
        onClick={() => setIsOpen2(!isOpen2)}
        className="w-full flex items-center justify-between p-5 text-left font-medium text-gray-800 bg-gray-100 hover:bg-gray-200 rounded-md"
      >
        <span>What else can you track besides calories?</span>
        <svg
          className={`w-4 h-4 transform transition-transform duration-200 ${isOpen2 ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen2 && (
        <div className="p-5 bg-white border-t border-gray-100">
          <p className="mb-2 text-gray-600">
            The best thing about CoreTrack is that it's an all-in-one app. You don't need a separate apps for weight tracking or fitness tracking.
            All CoreTrack members can track their weight/exercises goals alongside their calories and nutrition goals.
          </p>
        </div>
      )}
      <div className='h-10'></div>
    </div>
    


    
  );
}
