import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { UniversityCard } from '../components/common/UniversityCard';
import { UNIVERSITIES } from '../data/universities';
import { SITE_CONFIG } from '../data/config';
import { GraduationCap, BookOpen, Users, Trophy, ArrowRight } from 'lucide-react';

export function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-ksc-light py-20 lg:py-32 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-ksc-dark leading-tight mb-6 animate-in slide-in-from-bottom-4 duration-700">
              Build Your Future Through <span className="text-ksc-gold">Flexible Education</span>
            </h1>
            <p className="text-lg md:text-xl text-ksc-dark/80 mb-8 max-w-2xl leading-relaxed animate-in slide-in-from-bottom-5 duration-700 delay-150">
              Explore recognized higher-education programmes through KARUR STUDY CENTER and take the next step towards your academic and career goals.
            </p>
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 animate-in slide-in-from-bottom-6 duration-700 delay-300">
              <Button size="lg" asChild>
                <Link to="/courses">Explore Courses</Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-white" asChild>
                <Link to="/admissions">Apply Now</Link>
              </Button>
            </div>
          </div>
        </div>
        {/* Decorative background element */}
        <div className="absolute -right-20 -bottom-20 opacity-10 pointer-events-none hidden md:block">
          <GraduationCap size={400} />
        </div>
      </section>

      {/* Admission Announcement */}
      <section className="py-12 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center justify-center">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse mr-3"></span>
            Admissions Open — Academic Year 2026–27
          </h2>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {UNIVERSITIES.map(u => (
              <span key={u.id} className="bg-white/10 px-4 py-2 rounded-full text-sm font-medium border border-white/20">
                {u.shortName}
              </span>
            ))}
          </div>
          <Button variant="gold" size="lg" asChild>
            <Link to="/courses">View Programmes <ArrowRight size={18} className="ml-2" /></Link>
          </Button>
        </div>
      </section>

      {/* Universities Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our University Programmes</h2>
            <p className="text-muted-foreground text-lg">
              We provide information and guidance for distance and online education programmes from recognized universities.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {UNIVERSITIES.map(univ => (
              <UniversityCard key={univ.id} university={univ} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-ksc-light">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose KARUR STUDY CENTER</h2>
            <p className="text-muted-foreground text-lg">
              Dedicated support to help you succeed in your distance education journey.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: BookOpen, title: "Academic Guidance", desc: "Expert advice to choose the right programme." },
              { icon: Users, title: "Student Assistance", desc: "Continuous support throughout your course." },
              { icon: GraduationCap, title: "Exam Guidance", desc: "Timely updates on exams and hall tickets." },
              { icon: Trophy, title: "Study Material Support", desc: "Assistance with learning resources." }
            ].map((feature, i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-4">
                  <feature.icon size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
