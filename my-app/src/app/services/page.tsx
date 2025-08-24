"use client";

import { 
    FileText, 
    Search, 
    Users, 
    Upload, 
    Phone, 
    BookOpen,
    Clock,
    Shield,
    Gavel,
    Building,
    Scale,
    HelpCircle
  } from "lucide-react";
  import Link  from "next/link";
  import ProtectedRoute from "../../Components/ProtectedRoute";
  

  const Services = () => {
    const services = [
      {
        icon: Search,
        title: "Case Tracking",
        description: "Track your legal cases across different courts including Supreme Court, High Courts, District & Subordinate Courts.",
        features: ["Real-time status updates", "Court dates & notifications", "Hearing history", "Case documents access"],
        link: "/casetrack",
        color: "from-blue-500 to-blue-600"
      },
      {
        icon: Users,
        title: "Legal Aid Services",
        description: "Access free legal aid and connect with qualified lawyers for legal assistance and guidance.",
        features: ["Free legal consultation", "Lawyer directory", "Legal document templates", "Court procedure guidance"],
        link: "/legalaid",
        color: "from-green-500 to-green-600"
      },
      {
        icon: Upload,
        title: "eFiling Portal",
        description: "Electronically file legal documents, applications, and appeals through our secure digital platform.",
        features: ["Document upload & verification", "Online payment gateway", "Filing status tracking", "Digital receipts"],
        link: "/efile",
        color: "from-purple-500 to-purple-600"
      },
      {
        icon: BookOpen,
        title: "Legal Resources",
        description: "Comprehensive database of legal information, laws, rules, and procedural guidelines.",
        features: ["Law database search", "Legal forms & templates", "Court rules & procedures", "Legal glossary"],
        link: "/resource",
        color: "from-amber-500 to-amber-600"
      },
      {
        icon: Building,
        title: "Court Information",
        description: "Find detailed information about various courts, their jurisdictions, and contact details.",
        features: ["Court directory", "Jurisdiction details", "Contact information", "Court timings"],
        link: "/contact",
        color: "from-indigo-500 to-indigo-600"
      },
      {
        icon: Clock,
        title: "Cause List",
        description: "Access daily cause lists and court schedules for timely appearance and case preparation.",
        features: ["Daily cause lists", "Court calendar", "Hearing schedules", "Judge assignments"],
        link: "/casetrack",
        color: "from-rose-500 to-rose-600"
      }
    ];
  
    const additionalServices = [
      {
        icon: Gavel,
        title: "Live Court Streaming",
        description: "Watch live court proceedings for select cases and courts."
      },
      {
        icon: Shield,
        title: "Tele Law Services",
        description: "Connect with legal experts through video conferencing for remote consultation."
      },
      {
        icon: Scale,
        title: "Fast Track Courts",
        description: "Information and services related to fast track court proceedings."
      },
      {
        icon: HelpCircle,
        title: "Traffic Violation Portal",
        description: "Pay traffic fines and access violation-related services online."
      }
    ];
  
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-background">
          {/* Enhanced Header with Modern Design */}
        <section className="relative bg-gradient-to-br from-primary via-primary-light to-accent text-primary-foreground py-24 overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-72 h-72 bg-white/20 rounded-full blur-3xl animate-pulse-slow"></div>
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent/30 rounded-full blur-3xl animate-bounce-slow"></div>
            <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-white/10 rounded-full blur-2xl animate-float"></div>
          </div>
          
          {/* Geometric Pattern Overlay */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='1.5'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '60px 60px'
            }}></div>
          </div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6 animate-fade-in-up">
                <span className="text-sm font-medium">🏛️ Digital Justice Platform</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold mb-8 animate-fade-in-up delay-200 tracking-tight">
                <span className="block">Our</span>
                <span className="block text-gradient-hero animate-gradient">Services</span>
              </h1>
              <p className="text-xl md:text-2xl text-primary-foreground/90 max-w-4xl mx-auto leading-relaxed animate-fade-in-up delay-300">
                Comprehensive digital services for seamless access to justice and 
                <span className="font-semibold text-accent-light">legal resources</span>
              </p>
              
              {/* Enhanced CTA Button */}
              <div className="mt-12 animate-fade-in-up delay-500">
                <button className="btn-hero animate-glow">
                  🚀 Explore All Services
                </button>
              </div>
            </div>
          </div>
        </section>
  
        {/* Enhanced Main Services Section */}
        <section className="py-20 relative">
          {/* Subtle Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Cpath d='m20 20 20 20-20-20z'/%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '40px 40px'
            }}></div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="text-center mb-16 animate-fade-in-up">
              <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full mb-6">
                <FileText className="h-4 w-4 text-primary mr-2" />
                <span className="text-sm font-medium text-primary">Core Digital Services</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Primary 
                <span className="text-gradient-primary">Services</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Essential judicial services designed to make legal processes accessible and efficient
              </p>
            </div>
  
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => {
                const icons = ['🔍', '⚖️', '📄', '📚', '🏢', '⏰'];
                return (
                  <div 
                    key={index} 
                    className="card-elegant group hover:scale-105 transform transition-all duration-300 animate-fade-in-up relative overflow-hidden"
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    {/* Hover Background Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {/* Icon */}
                    <div className="relative">
                      <div className={`w-20 h-20 bg-gradient-to-r ${service.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:rotate-6 transition-transform duration-300 shadow-lg`}>
                        <span className="text-3xl">{icons[index]}</span>
                      </div>
                      
                      {/* Animated Ring */}
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-20 h-20 border-2 border-primary/20 rounded-2xl group-hover:scale-110 group-hover:border-primary/40 transition-all duration-300"></div>
                    </div>
                    
                    <div className="relative z-10">
                      <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-muted-foreground mb-6 leading-relaxed">
                        {service.description}
                      </p>
                      
                      {/* Features List */}
                      <ul className="space-y-2 mb-6">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center text-sm text-muted-foreground">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3"></div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                      
                      {/* Enhanced Service Button */}
                      <Link 
                        href={service.link}
                        className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary to-primary-light text-primary-foreground font-medium rounded-xl hover:shadow-lg transform hover:scale-105 active:scale-95 transition-all duration-200 group/btn w-full justify-center relative z-20"
                        style={{ pointerEvents: 'auto' }}
                      >
                        <span className="mr-2">Access Service</span>
                        <span className="transform group-hover/btn:translate-x-1 transition-transform duration-200">→</span>
                        
                        {/* Button Glow Effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary-light rounded-xl opacity-0 group-hover/btn:opacity-30 blur-xl transition-opacity duration-300"></div>
                      </Link>
                    </div>
                    
                    {/* Corner Decoration */}
                    <div className="absolute top-4 right-4 w-2 h-2 bg-accent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
  
        {/* Additional Services */}
        <section className="bg-secondary py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Additional Services</h2>
              <p className="text-lg text-muted-foreground">
                Extended services to support various legal and administrative needs
              </p>
            </div>
  
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {additionalServices.map((service, index) => (
                <div key={index} className="card-elegant text-center group">
                  <service.icon className="h-12 w-12 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">{service.title}</h3>
                  <p className="text-sm text-muted-foreground">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
  
        {/* CTA Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-primary to-primary-light rounded-2xl p-8 md:p-12 text-center text-primary-foreground">
              <h2 className="text-3xl font-bold mb-4">Need Assistance?</h2>
              <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
                Our support team is available to help you navigate through our services and answer any questions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact" className="btn-accent">
                  Contact Support
                </Link>
                <Link href="/legalaid" className="btn-secondary bg-white/10 border-white/20 text-white hover:bg-white hover:text-primary">
                  Get Legal Aid
                </Link>
              </div>
            </div>
          </div>
        </section>
        </div>
      </ProtectedRoute>
    );
  };
  
  export default Services;
