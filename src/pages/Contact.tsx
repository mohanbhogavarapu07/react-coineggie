
import React from 'react';
import { MainLayout } from '@/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { MapPin, Phone, Mail, Clock, Building } from 'lucide-react';

const Contact = () => {
  return (
    <MainLayout>
      <section className="bg-gradient-to-b from-finance-charcoal to-finance-charcoal/90 text-white py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Get in Touch</h1>
            <p className="text-xl text-white/80">
              Have questions or need assistance? Our team is here to help.
            </p>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold text-finance-charcoal mb-6">Send Us a Message</h2>
              <p className="text-finance-charcoal/70 mb-8">
                Fill out the form below and our team will get back to you as soon as possible.
              </p>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">Full Name</label>
                    <Input id="name" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">Email Address</label>
                    <Input id="email" type="email" placeholder="john@example.com" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">Subject</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General Inquiry</SelectItem>
                      <SelectItem value="support">Customer Support</SelectItem>
                      <SelectItem value="partnership">Partnership Opportunities</SelectItem>
                      <SelectItem value="feedback">Feedback</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">Message</label>
                  <Textarea id="message" placeholder="How can we help you?" rows={6} />
                </div>
                
                <div>
                  <Button className="bg-finance-green hover:bg-finance-green/90 text-white">
                    Send Message
                  </Button>
                </div>
              </form>
            </div>
            
            <div>
              <h2 className="text-3xl font-bold text-finance-charcoal mb-6">Contact Information</h2>
              <p className="text-finance-charcoal/70 mb-8">
                Reach out directly through our contact details below.
              </p>
              
              <div className="space-y-6">
                <Card className="p-6">
                  <div className="flex flex-col space-y-4">
                    <div className="flex items-start gap-4">
                      <Building className="h-5 w-5 text-finance-green flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold">FinTech Innovators Inc.</h3>
                        <p className="text-sm text-finance-charcoal/70">Parent company of DigitSage</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <MapPin className="h-5 w-5 text-finance-green flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold">Our Address</h3>
                        <p className="text-sm text-finance-charcoal/70">
                          123 Financial District<br />
                          Suite 456<br />
                          San Francisco, CA 94111
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <Phone className="h-5 w-5 text-finance-green flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold">Phone</h3>
                        <p className="text-sm text-finance-charcoal/70">+1 (555) 123-4567</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <Mail className="h-5 w-5 text-finance-green flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold">Email</h3>
                        <p className="text-sm text-finance-charcoal/70">contact@digitsage.com</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <Clock className="h-5 w-5 text-finance-green flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold">Business Hours</h3>
                        <p className="text-sm text-finance-charcoal/70">
                          Monday - Friday: 9:00 AM - 6:00 PM<br />
                          Saturday - Sunday: Closed
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
                
                <div className="rounded-lg overflow-hidden h-64 bg-gray-200">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d50470.07476441645!2d-122.43297047433626!3d37.76131248295695!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858080b9b0a253%3A0x70b82140f30f8534!2sSan%20Francisco%2C%20CA%2094111!5e0!3m2!1sen!2sus!4v1651870694221!5m2!1sen!2sus" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen 
                    loading="lazy"
                    title="Office Location"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-finance-charcoal mb-6">Join FinTech Innovators Inc.</h2>
            <p className="text-finance-charcoal/70 mb-8">
              DigitSage is a product of FinTech Innovators Inc., a leading financial technology company dedicated to making financial knowledge accessible to everyone.
            </p>
            <Button className="bg-finance-green hover:bg-finance-green/90 text-white">
              View Career Opportunities
            </Button>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Contact;
