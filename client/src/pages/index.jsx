import React from 'react';
import Header from '../layouts/navbar';
import Hero_section from '../components/Hero_section';
import About from '../components/About';
import Projects from '../components/Projects';
import Contact from '../components/Contact';
import Footer from '../layouts/footer';

const IndexPage = () => {
  return (
    <div className="App">
      <Header />
      <Hero_section />

    </div>
  );
};

export default IndexPage;