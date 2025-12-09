import React, { useState, useEffect } from 'react';
import Profile from '../assets/Images/Hero.png'
import { FaHtml5, FaCss3Alt, FaReact, FaFigma } from "react-icons/fa";
import { SiJavascript, SiTypescript, SiTailwindcss, SiNextdotjs, SiNodedotjs } from "react-icons/si";
import { get } from '../utils/api';

const About = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await get('/services');
        const data = await response.json();
        setServices(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching services:', error);
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return (
    <section id="about" className="py-20 px-4 md:px-10 lg:px-20 bg-black min-h-screen">
      <div className="absolute top-0 left-0 right-0 h-1/3 z-5 bg-gradient-to-b from-blue-500/20 to-transparent"></div>

      <div className="container mx-auto px-4">
        <div className="text-center mb-10 mt-5">
          <h3 className='text-2xl md:text-sm text-center  font-light mb-4 text-white/50'>Get to know me</h3>
          <h2 className="text-3xl md:text-4xl font-regular mb-4 bg-clip-text tracking-[0.5rem] text-blue-400">
            About Me
          </h2>
          <div className="w-24 h-0.5 bg-blue-400 mx-auto rounded-full"></div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 md:gap-12 items-center mx-auto">
          <div className="w-full md:w-2/5 flex justify-center">
            <div className="relative">
              <div className="profile-placeholder w-64 h-64 md:w-full md:h-full rounded-2xl shadow-2xl flex items-center justify-center">
                <img src={Profile} alt="Hero" className="object-contain w-full h-full" />
              </div>
            </div>
          </div>

          <div className="w-full md:w-3/5">
            <div className="rounded-2xl p-6 md:p-8 shadow-xl border">
              <h3 className="text-xl text-center md:text-left md:text-2xl font-regular mb-4 md:mb-6 text-blue-400">Who and what is Me..</h3>
              <h1 className='text-md text-center md:text-left md:text-4xl font-bold mb-4 md:mb-6 text-white '>I'm a passionate Designer and Developer</h1>
              <p className="text-base md:text-md text-justify mb-6 text-gray-300 leading-relaxed">
                I am a passionate UI/UX Designer, Graphics Designer, and Web Developer with a keen eye for aesthetics and functionality. I specialize in creating visually appealing and user-friendly designs that enhance digital experiences. With expertise in modern design tools and web technologies, I strive to bring creativity and innovation to every project I work on. Whether it's designing intuitive interfaces, crafting stunning graphics, or developing responsive websites, I am dedicated to delivering high-quality results.
              </p>

              <hr className='w-full h-0.5 bg-white/50'></hr>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mt-6 mb-6 w-full text-white">
                <div>
                  <p className="text-sm text-left">
                    <span className="font-medium">Name:</span> Amal P Anil
                  </p>
                </div>

                <div>
                  <p className="text-sm text-left">
                    <span className="font-medium">Email:</span>
                    <span className="text-blue-400 ml-2">amalpanil200@gmail.com</span>
                  </p>
                </div>

                <div>
                  <p className="text-sm text-left">
                    <span className="font-medium">Phone:</span>
                    <span className="text-blue-400 ml-2">+91 98765 43210</span>
                  </p>
                </div>

                <div>
                  <p className="text-sm text-left">
                    <span className="font-medium">Location:</span>
                    <span className="text-blue-400 ml-2">Kerala, India</span>
                  </p>
                </div>
              </div>
              <hr className='w-full h-0.5 bg-white/50'></hr>

              <div className="flex flex-wrap gap-4 mt-8">
                <button className="px-4 py-2 md:px-6 md:py-3 bg-blue-400 text-white font-medium rounded-[5px] hover:from-blue-500 hover:to-cyan-400 transition-all duration-300 transform hover:-translate-y-1 shadow-lg">
                  Download Resume
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-16 md:mt-20">
          <h3 className="text-md font-light mb-5 text-center  text-white/50">Services I offer to my clients</h3>
          <div className="relative">
            <h1 className='text-3xl md:text-4xl font-bold mb-5 text-center  text-white'>My Services</h1>

            {/* Services items */}
            {loading ? (
              <div className="flex justify-center items-center h-32">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-8 md:mt-10">
                {services.map((service) => (
                  <div key={service.id} className='flex flex-col h-auto min-h-[240px] gap-4 bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-800'>
                    <div className='text-blue-400 text-4xl'>
                      {service.icon}
                    </div>
                    <h2 className='text-xl text-left font-bold text-white'>{service.title}</h2>
                    <p className='text-gray-300 text-left'>{service.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* logo loop */}
        <div className="mx-4 md:mx-10 lg:mx-20 py-10 overflow-hidden relative">
          {/* Fade overlay on left side */}
          <div className="absolute left-0 top-0 bottom-0 w-10 md:w-20 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none"></div>
          {/* Fade overlay on right side */}
          <div className="absolute right-0 top-0 bottom-0 w-10 md:w-20 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none"></div>
          <div className="relative h-20 flex items-center">
            <div className="animate-loop-scroll flex whitespace-nowrap absolute">
              <div className="mx-4 md:mx-8 text-white text-3xl md:text-4xl"><FaHtml5 /></div>
              <div className="mx-4 md:mx-8 text-white text-3xl md:text-4xl"><FaCss3Alt /></div>
              <div className="mx-4 md:mx-8 text-white text-3xl md:text-4xl"><SiJavascript /></div>
              <div className="mx-4 md:mx-8 text-white text-3xl md:text-4xl"><SiTypescript /></div>
              <div className="mx-4 md:mx-8 text-white text-3xl md:text-4xl"><FaReact /></div>
              <div className="mx-4 md:mx-8 text-white text-3xl md:text-4xl"><SiTailwindcss /></div>
              <div className="mx-4 md:mx-8 text-white text-3xl md:text-4xl"><SiNextdotjs /></div>
              <div className="mx-4 md:mx-8 text-white text-3xl md:text-4xl"><SiNodedotjs /></div>
              <div className="mx-4 md:mx-8 text-white text-3xl md:text-4xl"><FaFigma /></div>
              {/* Duplicate for seamless loop */}
              <div className="mx-4 md:mx-8 text-white text-3xl md:text-4xl"><FaHtml5 /></div>
              <div className="mx-4 md:mx-8 text-white text-3xl md:text-4xl"><FaCss3Alt /></div>
              <div className="mx-4 md:mx-8 text-white text-3xl md:text-4xl"><SiJavascript /></div>
              <div className="mx-4 md:mx-8 text-white text-3xl md:text-4xl"><SiTypescript /></div>
              <div className="mx-4 md:mx-8 text-white text-3xl md:text-4xl"><FaReact /></div>
              <div className="mx-4 md:mx-8 text-white text-3xl md:text-4xl"><SiTailwindcss /></div>
              <div className="mx-4 md:mx-8 text-white text-3xl md:text-4xl"><SiNextdotjs /></div>
              <div className="mx-4 md:mx-8 text-white text-3xl md:text-4xl"><SiNodedotjs /></div>
              <div className="mx-4 md:mx-8 text-white text-3xl md:text-4xl"><FaFigma /></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;