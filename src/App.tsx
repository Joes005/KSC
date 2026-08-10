import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { FloatingWhatsApp } from './components/common/FloatingWhatsApp';

// Pages
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Universities } from './pages/Universities';
import { Courses } from './pages/Courses';
import { CourseDetails } from './pages/CourseDetails';
import { Admissions } from './pages/Admissions';
import { StudentServices } from './pages/StudentServices';
import { Gallery } from './pages/Gallery';
import { Updates } from './pages/Updates';
import { FAQ } from './pages/FAQ';
import { Contact } from './pages/Contact';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/universities" element={<Universities />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/:id" element={<CourseDetails />} />
            <Route path="/admissions" element={<Admissions />} />
            <Route path="/student-services" element={<StudentServices />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/updates" element={<Updates />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
        <FloatingWhatsApp />
      </div>
    </Router>
  );
}

export default App;
