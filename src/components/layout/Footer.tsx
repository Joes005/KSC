import React from 'react';
import { Link } from 'react-router-dom';
import { SITE_CONFIG } from '../../data/config';
import { MapPin, Phone, Mail, MessageCircle } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Column 1 */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold mb-4">{SITE_CONFIG.name}</h3>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              {SITE_CONFIG.description}
            </p>
            <div className="space-y-2 pt-4 text-sm text-primary-foreground/80">
              <div className="flex items-start space-x-2">
                <MapPin size={18} className="shrink-0 mt-0.5" />
                <span>{SITE_CONFIG.contact.address}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone size={18} />
                <span>{SITE_CONFIG.contact.phone}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MessageCircle size={18} />
                <span>{SITE_CONFIG.contact.whatsapp}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail size={18} />
                <span>{SITE_CONFIG.contact.email}</span>
              </div>
            </div>
          </div>

          {/* Column 2 */}
          <div>
            <h4 className="font-semibold text-lg mb-6 border-b border-primary-foreground/20 pb-2 inline-block">Quick Links</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/80">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/courses" className="hover:text-white transition-colors">Courses</Link></li>
              <li><Link to="/universities" className="hover:text-white transition-colors">Universities</Link></li>
              <li><Link to="/admissions" className="hover:text-white transition-colors">Admissions</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h4 className="font-semibold text-lg mb-6 border-b border-primary-foreground/20 pb-2 inline-block">Programmes</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/80">
              <li><Link to="/courses?level=UG" className="hover:text-white transition-colors">Undergraduate (UG)</Link></li>
              <li><Link to="/courses?level=PG" className="hover:text-white transition-colors">Postgraduate (PG)</Link></li>
              <li><Link to="/courses?level=Diploma" className="hover:text-white transition-colors">Diploma Programmes</Link></li>
              <li><Link to="/courses?level=Certificate" className="hover:text-white transition-colors">Certificate Programmes</Link></li>
              <li><Link to="/courses?level=Vocational" className="hover:text-white transition-colors">Vocational Programmes</Link></li>
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <h4 className="font-semibold text-lg mb-6 border-b border-primary-foreground/20 pb-2 inline-block">Student Support</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/80">
              <li><Link to="/student-services" className="hover:text-white transition-colors">Admission Guidance</Link></li>
              <li><Link to="/updates" className="hover:text-white transition-colors">Exam Updates</Link></li>
              <li><Link to="/student-services" className="hover:text-white transition-colors">Study Materials</Link></li>
              <li><Link to="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Support</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-primary-foreground/20 flex flex-col md:flex-row justify-between items-center text-sm text-primary-foreground/60">
          <p>© {new Date().getFullYear()} {SITE_CONFIG.name}. All Rights Reserved.</p>
          <div className="mt-4 md:mt-0 flex space-x-4">
            <Link to="/faq" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/contact" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
