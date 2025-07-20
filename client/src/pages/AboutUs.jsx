import React from 'react';

const AboutUs = () => {
    return (
        <div className="bg-white py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-4xl font-extrabold text-gray-900 text-center">
                    About CoreTrack
                </h1>
                <p className="mt-4 text-lg text-gray-600 text-center">
                    Your all-in-one solution for a healthier lifestyle.
                </p>

                <div className="mt-10 prose prose-indigo prose-lg text-gray-500 mx-auto">
                    <p>
                        At CoreTrack, we believe that tracking your fitness and nutrition shouldn't be complicated. Our mission is to provide you with simple, powerful tools to monitor your progress, understand your habits, and achieve your health goals, whether you're a seasoned athlete or just starting your fitness journey.
                    </p>
                    <p>
                        Our application allows you to seamlessly log your meals, scan nutrition labels, record your workouts, and visualize your progress over time. We're dedicated to creating an intuitive and supportive experience that empowers you to take control of your well-being.
                    </p>
                    <h2 className="text-2xl font-bold text-gray-900 mt-8">Our Vision</h2>
                    <p>
                        We envision a world where everyone has the knowledge and motivation to live their healthiest life. By simplifying data tracking and providing clear insights, CoreTrack aims to be your trusted partner every step of the way.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;