import React, { useState } from 'react';
import { FaInstagram, FaGithub, FaLinkedin } from "react-icons/fa";
import { FaUpwork } from "react-icons/fa6";
import { post } from '../utils/api';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    setSubmitSuccess(false);

    try {
      const response = await post('/contact', formData);
      const data = await response.json();

      if (data.success) {
        setSubmitSuccess(true);
        // Reset form
        setFormData({ name: '', email: '', message: '' });
      } else {
        setSubmitError(data.message || 'An error occurred. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitError('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-32 bg-gradient-to-br from-gray-950 via-black to-gray-900 text-white overflow-hidden relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative container mx-auto px-4 z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-block mb-6">
            <span className="text-blue-400 text-sm font-semibold tracking-widest uppercase">Get In Touch</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-linear-to-r from-blue-300 via-blue-300 to-blue-300 text-transparent bg-clip-text">
            Let's Connect
          </h2>
          <p className="text-gray-300 max-w-3xl mx-auto text-lg leading-relaxed">
            Have a project in mind or want to discuss opportunities? I'd love to hear from you. Let's create something amazing together!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Contact Cards - Left Column */}
          <div className="lg:col-span-1 space-y-6">
            {/* Email Card */}
            <div className="group relative bg-linear-to-br from-blue-900/40 to-blue-900/10 backdrop-blur-xl rounded-2xl p-6 border border-blue-500/30 hover:border-blue-400/60 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20">
              <div className="absolute inset-0 bg-linear-to-r from-blue-900/40 to-blue-900/ 50 group-hover:from-purple-600/5 group-hover:to-blue-600/5 rounded-2xl transition-all duration-300"></div>
              <div className="relative">
                <div className="flex items-start mb-4">
                  <div className="bg-linear-to-br from-blue-900/40 to-blue-900/10 p-4 rounded-xl mr-4 group-hover:scale-110 transition-transform duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-left text-white text-lg">Email</h4>
                    <p className="text-gray-400 text-sm">Drop me a line</p>
                  </div>
                </div>
                <p className="text-blue-200 font-semibold text-left ml-18">john.doe@example.com</p>
              </div>
            </div>

            {/* Phone Card */}
            <div className="group relative bg-linear-to-br from-blue-900/40 to-blue-900/10 backdrop-blur-xl rounded-2xl p-6 border border-blue-500/30 hover:border-blue-400/60 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20">
              <div className="absolute inset-0 bg-linear-to-r from-blue-600/0 to-blue-600/0 group-hover:from-blue-600/5 group-hover:to-blue-600/5 rounded-2xl transition-all duration-300"></div>
              <div className="relative">
                <div className="flex items-start mb-4">
                  <div className="bg-linear-to-br from-blue-400/30 to-blue-600/30 p-4 rounded-xl mr-4 group-hover:scale-110 transition-transform duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-left text-lg">Phone</h4>
                    <p className="text-gray-400 text-sm">Call me anytime</p>
                  </div>
                </div>
                <p className="text-blue-200 font-semibold ml-18 text-left">+1 (555) 123-4567</p>
              </div>
            </div>

            {/* Location Card */}
            <div className="group relative bg-linear-to-br from-blue-900/40 to-blue-900/10 backdrop-blur-xl rounded-2xl p-6 border border-blue-500/30 hover:border-blue-400/60 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20">
              <div className="absolute inset-0 bg-linear-to-r from-blue-600/0 to-blue-600/0 group-hover:from-blue-600/5 group-hover:to-blue-600/5 rounded-2xl transition-all duration-300"></div>
              <div className="relative">
                <div className="flex items-start mb-4">
                  <div className="bg-linear-to-br from-blue-400/30 to-blue-600/30 p-4 rounded-xl mr-4 group-hover:scale-110 transition-transform duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-lg text-left">Location</h4>
                    <p className="text-gray-400 text-sm">Where I'm based</p>
                  </div>
                </div>
                <p className="text-blue-200 font-semibold text-left ml-18">San Francisco, CA</p>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-4">
              <h4 className="font-bold text-lg mb-4 text-white">Follow Me</h4>
              <div className="flex gap-3 justify-center">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="group relative bg-gray-800/50 hover:bg-linear-to-br hover:from-purple-600 hover:to-pink-600 p-4 rounded-full transition-all duration-300 transform hover:scale-110 border border-gray-700 hover:border-transparent">
                  <FaGithub />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="group relative bg-gray-800/50 hover:bg-linear-to-br hover:from-purple-600 hover:to-pink-600 p-4 rounded-full transition-all duration-300 transform hover:scale-110 border border-gray-700 hover:border-transparent">
                  <FaLinkedin />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="group relative bg-gray-800/50 hover:bg-linear-to-br hover:from-purple-600 hover:to-pink-600 p-4 rounded-full transition-all duration-300 transform hover:scale-110 border border-gray-700 hover:border-transparent">
                  <FaInstagram />
                </a>
                <a href="https://upwork.com" target="_blank" rel="noopener noreferrer" className="group relative bg-gray-800/50 hover:bg-linear-to-br hover:from-purple-600 hover:to-pink-600 p-4 rounded-full transition-all duration-300 transform hover:scale-110 border border-gray-700 hover:border-transparent">
                  <FaUpwork />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form - Right Column */}
          <div className="lg:col-span-2">
            <div className="relative bg-linear-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-2xl rounded-3xl p-10 border border-gray-700/50 shadow-2xl hover:shadow-purple-500/10 transition-all duration-300">
              <div className="absolute inset-0 bg-linear-to-r from-purple-600/5 to-pink-600/5 rounded-3xl opacity-0 hover:opacity-100 transition-opacity duration-300"></div>

              <div className="relative">
                <h3 className="text-3xl font-bold mb-2 text-white">Send Me a Message</h3>
                <p className="text-gray-400 mb-8">I'll respond as soon as possible</p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {submitSuccess && (
                    <div className="success-message bg-linear-to-r from-green-900/50 to-emerald-900/50 border border-green-500/50 text-green-200 p-4 rounded-xl animate-pulse">
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-green-400 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <div>
                          <p className="font-semibold">Thank you!</p>
                          <p className="text-sm text-green-100">I'll get back to you soon.</p>
                        </div>
                      </div>
                    </div>
                  )}
                  {submitError && (
                    <div className="error-message bg-linear-to-r from-red-900/50 to-rose-900/50 border border-red-500/50 text-red-200 p-4 rounded-xl">
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-red-400 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                        {submitError}
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-gray-200 font-semibold mb-3">Full Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        disabled={isSubmitting}
                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-500 transition-all duration-300 hover:border-gray-500/80 disabled:opacity-50"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-gray-200 font-semibold mb-3">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="your.email@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        disabled={isSubmitting}
                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-500 transition-all duration-300 hover:border-gray-500/80 disabled:opacity-50"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-gray-200 font-semibold mb-3">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      placeholder="Tell me about your project or inquiry..."
                      rows="6"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-500 transition-all duration-300 resize-none hover:border-gray-500/80 disabled:opacity-50"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-4 px-8 rounded-lg font-bold bg-linear-to-r from-blue-600 to-blue-600 hover:from-blue-700 hover:to-blue-700 text-white transform transition-all duration-300 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex items-center justify-center gap-2 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'shadow-lg hover:shadow-blue-500/50'
                      }`}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 9l3 3m0 0l-3-3m3 3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  );
};

export default Contact;
