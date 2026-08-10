import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, MessageCircle, Mail } from 'lucide-react';
import { SITE_CONFIG } from '../../data/config';
import { Button } from '../ui/Button';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Universities', path: '/universities' },
    { name: 'Courses', path: '/courses' },
    { name: 'Admissions', path: '/admissions' },
    { name: 'Student Services', path: '/student-services' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Updates', path: '/updates' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      {/* Top Bar */}
      <div className="bg-primary text-primary-foreground py-2 px-4 text-xs sm:text-sm">
        <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
          <div className="font-medium mb-2 sm:mb-0">
            Admissions Open — Academic Year 2026–27
          </div>
          <div className="flex items-center space-x-4">
            <a href={`tel:${SITE_CONFIG.contact.phone}`} className="flex items-center hover:text-ksc-gold transition-colors">
              <Phone size={14} className="mr-1" /> {SITE_CONFIG.contact.phone}
            </a>
            <a href={`https://wa.me/${SITE_CONFIG.contact.whatsapp}`} className="flex items-center hover:text-ksc-gold transition-colors" target="_blank" rel="noopener noreferrer">
              <MessageCircle size={14} className="mr-1" /> WhatsApp
            </a>
            <a href={`mailto:${SITE_CONFIG.contact.email}`} className="flex items-center hover:text-ksc-gold transition-colors hidden md:flex">
              <Mail size={14} className="mr-1" /> Email Us
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          {/* We will use a text logo if the image isn't perfect, but let's assume we have the logo or text */}
          <div className="flex flex-col">
            <span className="font-bold text-xl md:text-2xl tracking-tight text-primary leading-tight">
              KARUR STUDY CENTER
            </span>
            <span className="text-xs text-muted-foreground font-medium tracking-widest uppercase">
              Education & Guidance
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center space-x-1 lg:space-x-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors hover:text-primary hover:bg-muted ${
                isActive(link.path) ? 'text-primary bg-muted' : 'text-foreground/80'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden lg:flex items-center space-x-3">
          <Button variant="outline" asChild>
            <a href={`https://wa.me/${SITE_CONFIG.contact.whatsapp}`} target="_blank" rel="noopener noreferrer">
              WhatsApp Us
            </a>
          </Button>
          <Button asChild>
            <Link to="/admissions">Apply Now</Link>
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden p-2 text-foreground"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t bg-white absolute w-full shadow-lg">
          <nav className="flex flex-col p-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`px-4 py-3 text-sm font-medium rounded-md transition-colors ${
                  isActive(link.path) ? 'text-primary bg-muted' : 'text-foreground/80'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 flex flex-col space-y-3">
              <Button className="w-full" variant="outline" asChild>
                <a href={`https://wa.me/${SITE_CONFIG.contact.whatsapp}`} target="_blank" rel="noopener noreferrer">
                  WhatsApp Us
                </a>
              </Button>
              <Button className="w-full" asChild>
                <Link to="/admissions">Apply Now</Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
