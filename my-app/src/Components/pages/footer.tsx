import { Scale, Mail, Phone, MapPin, Facebook, Twitter, Youtube, Instagram, ArrowRight, ChevronRight } from "lucide-react";
import { Button } from "@/Components/Components/button";
import Link from "next/link";

const Footer = () => {
  const quickLinks = [
    { name: "About Nyaysetu", href: "#about" },
    { name: "Privacy Policy", href: "#privacy" },
    { name: "Terms of Service", href: "#terms" },
    { name: "Accessibility", href: "#accessibility" },
    { name: "Sitemap", href: "#sitemap" }
  ];

  const services = [
    { name: "AI Legal Assistant", href: "#legal-assistant" },
    { name: "Case Tracking", href: "#case-tracking" },
    { name: "eFiling Services", href: "#efiling" },
    { name: "Legal Aid", href: "#legal-aid" },
    { name: "Court Information", href: "#court-info" }
  ];

  const resources = [
    { name: "Legal Forms", href: "#forms" },
    { name: "Court Procedures", href: "#procedures" },
    { name: "Legal Glossary", href: "#glossary" },
    { name: "FAQ", href: "#faq" },
    { name: "User Guide", href: "#guide" }
  ];

  const socialLinks = [
    { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
    { icon: Youtube, href: "https://youtube.com", label: "YouTube" },
    { icon: Instagram, href: "https://instagram.com", label: "Instagram" }
  ];

  return (
    <footer className="relative bg-gradient-to-b from-primary to-primary-dark text-primary-foreground overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/40 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-secondary/30 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute top-1/2 left-1/3 w-72 h-72 bg-secondary-light/20 rounded-full blur-3xl animate-bounce-slow"></div>
      </div>
      
      {/* Geometric Pattern Overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.2'%3E%3Cpath d='M20 0L0 20h20V0zm0 40V20h20L20 40z'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>
      
      {/* Main Footer */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            <div className="flex items-center space-x-3">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-secondary to-accent blur-xl opacity-60 rounded-xl group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative w-14 h-14 bg-gradient-to-br from-secondary to-accent rounded-xl flex items-center justify-center transform group-hover:rotate-3 transition-transform duration-300 shadow-lg">
                  <Scale className="w-8 h-8 text-primary-foreground" />
                </div>
              </div>
              <div>
                <h3 className="text-2xl md:text-3xl font-bold tracking-tight">Nyaysetu</h3>
                <p className="text-accent-light text-sm">Gateway for Justice</p>
              </div>
            </div>
            <p className="text-primary-foreground/90 leading-relaxed max-w-md text-base">
              Empowering citizens with digital access to justice through innovative technology. 
              Making legal services accessible, transparent, and efficient for everyone.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-4 pt-2">
              <div className="group flex items-center space-x-3 hover:translate-x-1 transition-transform duration-300">
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center backdrop-blur-sm">
                  <Phone className="w-5 h-5 text-accent-light" />
                </div>
                <span className="text-primary-foreground/90 group-hover:text-accent-light transition-colors duration-300">1800-123-456 (Toll Free)</span>
              </div>
              <div className="group flex items-center space-x-3 hover:translate-x-1 transition-transform duration-300">
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center backdrop-blur-sm">
                  <Mail className="w-5 h-5 text-accent-light" />
                </div>
                <span className="text-primary-foreground/90 group-hover:text-accent-light transition-colors duration-300">support@nyaysetu.gov.in</span>
              </div>
              <div className="group flex items-center space-x-3 hover:translate-x-1 transition-transform duration-300">
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center backdrop-blur-sm">
                  <MapPin className="w-5 h-5 text-accent-light" />
                </div>
                <span className="text-primary-foreground/90 group-hover:text-accent-light transition-colors duration-300">Ministry of Law & Justice, New Delhi</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-5 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full">
              <span className="text-sm font-medium text-accent-light">Quick Links</span>
            </div>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="group flex items-center text-primary-foreground/90 hover:text-accent-light transition-all duration-300 hover:translate-x-1"
                  >
                    <div className="mr-2 w-1.5 h-1.5 rounded-full bg-accent-light opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <span>{link.name}</span>
                    <ChevronRight className="ml-1 w-4 h-4 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-5 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
            <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full">
              <span className="text-sm font-medium text-accent-light">Our Services</span>
            </div>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.name}>
                  <Link 
                    href={service.href}
                    className="group flex items-center text-primary-foreground/90 hover:text-accent-light transition-all duration-300 hover:translate-x-1"
                  >
                    <div className="mr-2 w-1.5 h-1.5 rounded-full bg-accent-light opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <span>{service.name}</span>
                    <ChevronRight className="ml-1 w-4 h-4 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-5 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
            <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full">
              <span className="text-sm font-medium text-accent-light">Resources</span>
            </div>
            <ul className="space-y-3">
              {resources.map((resource) => (
                <li key={resource.name}>
                  <Link 
                    href={resource.href}
                    className="group flex items-center text-primary-foreground/90 hover:text-accent-light transition-all duration-300 hover:translate-x-1"
                  >
                    <div className="mr-2 w-1.5 h-1.5 rounded-full bg-accent-light opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <span>{resource.name}</span>
                    <ChevronRight className="ml-1 w-4 h-4 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-16 pt-10 border-t border-white/10 animate-fade-in-up" style={{ animationDelay: '500ms' }}>
          <div className="max-w-4xl mx-auto">
            <div className="relative group bg-gradient-to-br from-accent/20 to-primary-light/10 rounded-2xl p-8 backdrop-blur-sm border border-white/10 overflow-hidden">
              {/* Background Decoration */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-accent/20 rounded-full blur-3xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary-light/20 rounded-full blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
              
              <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-8">
                <div className="md:flex-1 space-y-3">
                  <div className="inline-flex items-center px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full mb-2">
                    <span className="text-sm font-medium text-accent-light">✉️ Newsletter</span>
                  </div>
                  <h4 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-2">Stay Updated</h4>
                  <p className="text-primary-foreground/90 mb-2 leading-relaxed">
                    Subscribe for updates on legal services, new features, and resources to empower your legal journey.  
                  </p>
                </div>
                
                <div className="md:flex-1">
                  <div className="relative group/form">
                    <div className="flex flex-col sm:flex-row gap-3">
                      <input
                        type="email"
                        placeholder="Enter your email address"
                        className="flex-1 px-5 py-3 rounded-xl bg-white/10 border border-white/20 text-primary-foreground placeholder:text-primary-foreground/60 focus:outline-none focus:ring-2 focus:ring-accent-light/50 transition-all duration-300"
                      />
                      <Button 
                        className="group relative px-6 py-3 bg-gradient-to-r from-accent to-accent-light text-primary-foreground font-medium rounded-xl hover:shadow-lg transform hover:scale-105 active:scale-95 transition-all duration-200"
                      >
                        <span className="flex items-center justify-center">
                          <span className="mr-2">Subscribe</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                        </span>
                      </Button>
                    </div>
                    {/* Glow effect on focus within */}
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-accent to-primary-light opacity-0 blur-xl group-hover/form:opacity-20 transition-opacity duration-300 rounded-xl"></div>
                  </div>
                  <p className="text-xs text-primary-foreground/60 mt-3 italic">
                    By subscribing, you agree to our Privacy Policy and consent to receiving updates.  
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="relative z-10 border-t border-white/10 animate-fade-in-up" style={{ animationDelay: '600ms' }}>
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-primary-foreground/80 text-sm">
              © 2025 <span className="text-accent-light font-medium">Nyaysetu</span> - Gateway for Justice. All rights reserved. | Ministry of Law and Justice, Government of India
            </div>
            
            {/* Social Links */}
            <div className="flex items-center gap-5">
              <span className="text-primary-foreground/80 text-sm">Follow us:</span>
              <div className="flex items-center gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className="group w-10 h-10 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm hover:bg-white/20 transition-all duration-300 hover:scale-110"
                    aria-label={social.label}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <social.icon className="w-5 h-5 text-primary-foreground/80 group-hover:text-accent-light transition-colors duration-300" />
                    {/* Glow effect on hover */}
                    <div className="absolute inset-0 bg-accent/30 opacity-0 group-hover:opacity-50 blur-xl rounded-full transition-opacity duration-300"></div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;