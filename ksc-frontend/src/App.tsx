import { useEffect, Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import WhatsAppButton from './components/common/WhatsAppButton';
import { StickyActionBar } from "./components/layout/StickyActionBar";
import { ScrollToTop } from "./components/common/ScrollToTop";
import { ScrollReveal } from "./components/common/ScrollReveal";
import { ThemeProvider } from './services/ThemeContext';

const Home = lazy(() => import("./pages/Home").then(m => ({ default: m.Home })));
const About = lazy(() => import("./pages/About").then(m => ({ default: m.About })));
const Founder = lazy(() => import("./pages/Founder").then(m => ({ default: m.Founder })));
const Chairman = lazy(() => import("./pages/Chairman").then(m => ({ default: m.Chairman })));
const Academic = lazy(() => import("./pages/Academic").then(m => ({ default: m.Academic })));
const Facilities = lazy(() => import("./pages/Facilities").then(m => ({ default: m.Facilities })));
const Curriculum = lazy(() => import("./pages/Curriculum").then(m => ({ default: m.Curriculum })));
const Gallery = lazy(() => import("./pages/Gallery").then(m => ({ default: m.Gallery })));
const ExamUpdate = lazy(() => import("./pages/ExamUpdate").then(m => ({ default: m.ExamUpdate })));
const Contact = lazy(() => import("./pages/Contact").then(m => ({ default: m.Contact })));
const Admissions = lazy(() => import("./pages/Admissions").then(m => ({ default: m.Admissions })));
const University = lazy(() => import("./pages/University").then(m => ({ default: m.University })));
const NotFound = lazy(() => import("./pages/NotFound").then(m => ({ default: m.NotFound })));

function AdminRedirect() {
  useEffect(() => {
    window.location.href = import.meta.env.VITE_BACKEND_URL + "/admin";
  }, []);
  return <div className="p-8 text-center text-gray-500 font-medium mt-20">Redirecting to CMS Dashboard...</div>;
}

function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="w-12 h-12 border-4 border-slate-200 border-t-ksc-red rounded-full animate-spin"></div>
    </div>
  );
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
            <Suspense fallback={<PageLoader />}>
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
            </Suspense>
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
