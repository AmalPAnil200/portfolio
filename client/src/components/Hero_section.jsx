import React, { useState, useEffect } from 'react';
import heroImage from '../assets/Images/Hero.png';
import { FaInstagram } from "react-icons/fa";
import { FaBehance } from "react-icons/fa6";
import { FaUpwork } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa";
import BlurText from "../components/React-bits/Motion";
import DarkVeil from '../components/React-bits/DarkVeil';

const Hero_section = () => {
    const [text, setText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [loopNum, setLoopNum] = useState(0);
    const [typingSpeed, setTypingSpeed] = useState(150);
    const [temperature, setTemperature] = useState(25); // Default temperature in Celsius
    const [humidity, setHumidity] = useState(60); // Default humidity in percentage

    const handleAnimationComplete = () => {
        console.log('Animation completed!');
    };

    const roles = ["Designer", "Developer"];

    useEffect(() => {
        const handleType = () => {
            const i = loopNum % roles.length;
            const fullText = roles[i];

            setText(isDeleting
                ? fullText.substring(0, text.length - 1)
                : fullText.substring(0, text.length + 1)
            );

            setTypingSpeed(isDeleting ? 30 : 150);

            if (!isDeleting && text === fullText) {
                setTimeout(() => setIsDeleting(true), 1000);
            } else if (isDeleting && text === '') {
                setIsDeleting(false);
                setLoopNum(loopNum + 1);
            }
        };

        const timer = setTimeout(handleType, typingSpeed);
        return () => clearTimeout(timer);
    }, [text, isDeleting, loopNum, typingSpeed, roles]);

    // Simulate changing weather data
    useEffect(() => {
        const weatherTimer = setInterval(() => {
            setTemperature(prev => prev + (Math.random() > 0.5 ? 0.1 : -0.1));
            setHumidity(prev => Math.min(100, Math.max(0, prev + (Math.random() > 0.5 ? 0.2 : -0.2))));
        }, 5000);

        return () => clearInterval(weatherTimer);
    }, []);

    return (
        <div className="relative h-screen w-full flex items-center justify-center overflow-hidden">
            {/* <div style={{ width: '100%', height: '600px', position: 'relative', zIndex: 1, opacity:'20%' }}>
                <DarkVeil />
            </div> */}

            {/* Content */}
            <div className="absolute left-250 bottom-120 z-10 text-center text-white px-4">
                {/* Name */}
                <BlurText
                    text="Amal P Anil"
                    delay={150}
                    animateBy="words"
                    direction="top"
                    onAnimationComplete={handleAnimationComplete}
                    className="text-4xl mb-2 font-bold"
                />

                {/* Animated text */}
                <div className="text-xl md:text-sm mb-2 animate-fade-in-up delay-100">
                    I'm a <span className="text-blue-400 font-semibold">{text}</span>
                    <span className="ml-1 inline-block w-0.5 h-3 bg-white animate-pulse"></span>
                </div>
            </div>

            {/* Gradient overlay - Apple-inspired blue shade (top only) */}
            <div className="absolute top-0 left-0 right-0 h-1/3 z-5 bg-gradient-to-b from-blue-500/20 to-transparent"></div>

            {/* Weather information - Bottom Left */}
            <div className="absolute bottom-8 right-8 z-10 bg-opacity-10 backdrop-blur-sm rounded-xl p-4 text-white  shadow-lg">
                <div className="flex space-x-6">
                    <div className="flex flex-row items-center space-x-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <span className="text-lg font-medium mt-1">{temperature.toFixed(1)}°</span>
                        <span className="text-xs text-gray-300 mt-1">TEMP</span>
                    </div>
                    <div className="flex flex-row items-center space-x-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4 4 0 003 15z" />
                        </svg>
                        <span className="text-lg font-medium mt-1">{humidity.toFixed(1)}%</span>
                        <span className="text-xs text-gray-300 mt-1">HUMID</span>
                    </div>
                </div>
            </div>

            <div className='absolute inset-0 bg-no-repeat bg-center z-1 '>
                <img src={heroImage} alt="Hero" className="object-contain w-full h-full" />
            </div>

            {/* Background image */}

            <div className="absolute inset-0 bg-black opacity-100 z-0"></div>

            {/* Social media icons */}
            <div className="absolute  lg:top-8 left-8 z-10 lg:top-auto lg:bottom-8">
                <div className="flex flex-col space-y-4">
                    {/* Using simple shapes as placeholders for social media icons */}
                    <a href="#" className="text-white text-2xl p-3 rounded-full hover:bg-opacity-30 transition-all duration-300 transform hover:scale-110">
                        <FaInstagram />                    </a>
                    <a href="#" className="text-white text-2xl p-3 rounded-full hover:bg-opacity-30 transition-all duration-300 transform hover:scale-110">
                        <FaBehance />                   </a>
                    <a href="#" className="text-white text-2xl p-3 rounded-full hover:bg-opacity-30 transition-all duration-300 transform hover:scale-110">
                        <FaUpwork />                    </a>
                    <a href="#" className="text-white text-2xl p-3 rounded-full hover:bg-opacity-30 transition-all duration-300 transform hover:scale-110">
                        <FaWhatsapp />                    </a>
                </div>
            </div>
        </div>
    );
};

export default Hero_section;