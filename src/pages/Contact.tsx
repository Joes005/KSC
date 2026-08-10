import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SITE_CONFIG } from '../data/config';
import { MapPin, Phone, Mail, Clock, MessageCircle, Send } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

export function Contact() {
  const [searchParams] = useSearchParams();
  const courseId = searchParams.get('course') || '';
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    course: courseId,
    message: ''
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Frontend only - no backend connected yet
    console.log("Form submitted:", formData);
    setIsSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold mb-4 text-ksc-dark">Contact Us</h1>
          <p className="text-lg text-muted-foreground">
            Get in touch with us for any inquiries about admissions, courses, or student support. Our team is here to help you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border h-full">
              <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-full bg-ksc-light flex items-center justify-center text-primary shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Address</h3>
                    <p className="text-muted-foreground text-sm">{SITE_CONFIG.contact.address}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-full bg-ksc-light flex items-center justify-center text-primary shrink-0">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Phone</h3>
                    <p className="text-muted-foreground text-sm">{SITE_CONFIG.contact.phone}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-full bg-ksc-light flex items-center justify-center text-primary shrink-0">
                    <MessageCircle size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">WhatsApp</h3>
                    <p className="text-muted-foreground text-sm">{SITE_CONFIG.contact.whatsapp}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-full bg-ksc-light flex items-center justify-center text-primary shrink-0">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <p className="text-muted-foreground text-sm">{SITE_CONFIG.contact.email}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-full bg-ksc-light flex items-center justify-center text-primary shrink-0">
                    <Clock size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Working Hours</h3>
                    <p className="text-muted-foreground text-sm">{SITE_CONFIG.contact.workingHours}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Enquiry Form */}
          <div className="lg:col-span-3">
            <div className="bg-white p-8 rounded-2xl shadow-sm border h-full">
              <h2 className="text-2xl font-bold mb-6">Send an Enquiry</h2>
              
              {isSubmitted ? (
                <div className="bg-green-50 text-green-800 p-6 rounded-lg border border-green-200 text-center">
                  <h3 className="text-xl font-semibold mb-2">Thank You!</h3>
                  <p>Your enquiry has been submitted. Our team will contact you shortly.</p>
                  <Button variant="outline" className="mt-4" onClick={() => setIsSubmitted(false)}>
                    Send another enquiry
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">Full Name <span className="text-red-500">*</span></label>
                      <Input id="name" name="name" required value={formData.name} onChange={handleChange} placeholder="Enter your full name" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-sm font-medium">Mobile Number <span className="text-red-500">*</span></label>
                      <Input id="phone" name="phone" type="tel" required value={formData.phone} onChange={handleChange} placeholder="Enter your mobile number" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">Email Address</label>
                      <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Enter your email address" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="course" className="text-sm font-medium">Course Interested In</label>
                      <Input id="course" name="course" value={formData.course} onChange={handleChange} placeholder="E.g., BA Tamil, MBA" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">Message <span className="text-red-500">*</span></label>
                    <textarea 
                      id="message" 
                      name="message" 
                      required 
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="How can we help you?"
                      className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                    />
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4 pt-2">
                    <Button type="submit" className="flex-1">
                      <Send size={18} className="mr-2" /> Submit Enquiry
                    </Button>
                    <Button type="button" variant="outline" className="flex-1" asChild>
                      <a href={`https://wa.me/${SITE_CONFIG.contact.whatsapp}?text=Hello, I have an enquiry.`} target="_blank" rel="noopener noreferrer">
                        <MessageCircle size={18} className="mr-2" /> Contact via WhatsApp
                      </a>
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
