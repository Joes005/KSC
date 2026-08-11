import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { FloatingWhatsApp } from "./components/common/FloatingWhatsApp";
import { ScrollToTop } from "./components/common/ScrollToTop";

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

function App() {
  return (
    <Router>
      <ScrollToTop />
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
            {/* fallback — unknown paths show the homepage */}
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
        <Footer />
        <FloatingWhatsApp />
      </div>
    </Router>
  );
}

export default App;