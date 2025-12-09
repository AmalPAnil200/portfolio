import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from './pages/index'
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Layout from './layouts/Layout';
import AdminLogin from './admin/AdminLogin';
import AdminPanel from './admin/AdminPanel';
import AdminHome from './admin/AdminHome';
import ProjectsManagement from './admin/ProjectsManagement';
import ServicesManagement from './admin/ServicesManagement';
import DesignWorkManagement from './admin/DesignWorkManagement';
import MessagesManagement from './admin/MessagesManagement';
import Settings from './admin/Settings';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/about' element={<About />} />
          <Route path='/' element={<Index />} />
          <Route path='/projects' element={<Projects />} />
          <Route path='/contact' element={<Contact />} />
        </Route>
        <Route path='/admin/login' element={<AdminLogin />} />
        <Route element={<AdminPanel />}> 
          <Route path='/admin/dashboard' element={<AdminHome />} />
          <Route path='/admin/projects' element={<ProjectsManagement />} />
          <Route path='/admin/design-works' element={<DesignWorkManagement />} />
          <Route path='/admin/services' element={<ServicesManagement />} />
          <Route path='/admin/messages' element={<MessagesManagement />} />
          <Route path='/admin/settings' element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;