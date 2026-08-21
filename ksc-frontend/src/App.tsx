import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import WhatsAppButton from './components/common/WhatsAppButton';
import { StickyActionBar } from "./components/layout/StickyActionBar";
import { ScrollToTop } from "./components/common/ScrollToTop";
import { ScrollReveal } from "./components/common/ScrollReveal";
import { ThemeProvider } from './services/ThemeContext';

import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Founder } from "./pages/Founder";
import { Chairman } from "./pages/Chairman";
import { Academic } from "./pages/Academic";
import { Facilities } from "./pages/Facilities";
import { Curriculum } from "./pages/Curriculum";
import { Gallery } from "./pages/Gallery";
import { ExamUpdate } from "./pages/ExamUpdate";
import { Contact } from "./pages/Contact";
import { Admissions } from "./pages/Admissions";
import { University } from "./pages/University";
import { NotFound } from "./pages/NotFound";

function AdminRedirect() {
  useEffect(() => {
    window.location.href = import.meta.env.VITE_BACKEND_URL + "/admin";
  }, []);
  return <div className="p-8 text-center text-gray-500 font-medium mt-20">Redirecting to CMS Dashboard...</div>;
}

function App() {
  return (
    <ThemeProvider>
      <Router>
        <ScrollToTop />
        <ScrollReveal />
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/founder" element={<Founder />} />
              <Route path="/chairman" element={<Chairman />} />
              <Route path="/academic" element={<Academic />} />
              <Route path="/facilities" element={<Facilities />} />
              <Route path="/curriculum" element={<Curriculum />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/exam-update" element={<ExamUpdate />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/admissions" element={<Admissions />} />
              <Route path="/university/:id" element={<University />} />
              <Route path="/admin" element={<AdminRedirect />} />
              {/* fallback — unknown paths show the homepage */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
          <StickyActionBar />
        </div>
      </Router>
      <WhatsAppButton />
    </ThemeProvider>
  );
}
export default App;
