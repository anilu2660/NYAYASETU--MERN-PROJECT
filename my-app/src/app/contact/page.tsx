"use client";
import { useState } from "react";
import { Phone, Mail, MapPin, Clock, Send, MessageSquare, User, Building } from "lucide-react";


const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    category: "",
    message: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
  };

  const contactMethods = [
    {
      icon: Phone,
      title: "Phone Support",
      details: ["+91-11-23384700 (NALSA)", "+91-11-23385954 (General)"],
      description: "Available Mon-Fri, 9:00 AM - 6:00 PM",
      action: "Call Now"
    },
    {
      icon: Mail,
      title: "Email Support",
      details: ["support@nyayasetu.gov.in", "nalsa@gov.in"],
      description: "Response within 24 hours",
      action: "Send Email"
    },
    {
      icon: MessageSquare,
      title: "Live Chat",
      details: ["Instant messaging support"],
      description: "Available Mon-Fri, 9:00 AM - 6:00 PM",
      action: "Start Chat"
    },
    {
      icon: Building,
      title: "Visit Office",
      details: ["Jaisalmer House, 26 Man Singh Road", "New Delhi - 110011"],
      description: "Mon-Fri, 9:30 AM - 5:30 PM",
      action: "Get Directions"
    }
  ];

  const departments = [
    {
      name: "Case Tracking Support",
      phone: "+91-11-23384701",
      email: "casetracking@nyayasetu.gov.in",
      description: "Assistance with case status and tracking issues"
    },
    {
      name: "eFiling Support",
      phone: "+91-11-23384702",
      email: "efiling@nyayasetu.gov.in",
      description: "Technical support for electronic filing"
    },
    {
      name: "Legal Aid Services",
      phone: "+91-11-23384703",
      email: "legalaid@nyayasetu.gov.in",
      description: "Information about legal aid and assistance"
    },
    {
      name: "Technical Support",
      phone: "+91-11-23384704",
      email: "tech@nyayasetu.gov.in",
      description: "Website and portal technical issues"
    }
  ];

  const courtRegistries = [
    {
      court: "Supreme Court of India",
      address: "Tilak Marg, New Delhi - 110001",
      phone: "+91-11-23384024",
      email: "registry@sci.gov.in",
      timings: "Mon-Fri: 9:30 AM - 5:00 PM"
    },
    {
      court: "Delhi High Court",
      address: "Sher Shah Road, New Delhi - 110003",
      phone: "+91-11-23864563",
      email: "delhihighcourt@gov.in",
      timings: "Mon-Fri: 9:30 AM - 5:00 PM"
    },
    {
      court: "District Court Complex",
      address: "Dwarka Courts Complex, New Delhi",
      phone: "+91-11-28085001",
      email: "districtcourt@delhicourts.nic.in",
      timings: "Mon-Fri: 9:30 AM - 5:00 PM"
    }
  ];

  return (
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
              <span className="text-sm font-medium">📞 24/7 Support Available</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-8 animate-fade-in-up delay-200 tracking-tight">
              <span className="block">Contact</span>
              <span className="block text-gradient-hero animate-gradient">Us</span>
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/90 max-w-4xl mx-auto leading-relaxed animate-fade-in-up delay-300">
              Get in touch with us for support, information, or assistance with your 
              <span className="font-semibold text-accent-light">legal needs</span>
            </p>
            
            {/* Enhanced CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12 animate-fade-in-up delay-500">
              <button className="btn-hero animate-glow">
                📞 Call Support Now
              </button>
              <button className="btn-secondary bg-white/10 border-white/20 text-white hover:bg-white hover:text-primary">
                💬 Start Live Chat
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="py-8 bg-warning text-warning-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-lg font-bold mb-2">Emergency Legal Aid Helpline</h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="tel:15100" className="flex items-center font-bold text-xl">
                <Phone className="h-6 w-6 mr-2" />
                15100 (Toll Free)
              </a>
              <span className="text-warning-foreground/80">Available 24/7 for emergency legal assistance</span>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="relative py-20 bg-gradient-to-b from-background via-secondary/30 to-background overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-20 right-20 w-72 h-72 bg-accent/30 rounded-full blur-3xl animate-bounce-slow"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/10 rounded-full blur-2xl animate-float"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full mb-4">
              <span className="text-sm font-medium text-primary">🤝 How to Reach Us</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gradient-primary mb-4 tracking-tight">Get in Touch</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Choose the best way to reach us based on your needs and 
              <span className="font-semibold text-primary">get instant support</span>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactMethods.map((method, index) => {
              const gradients = [
                'from-blue-500 to-blue-600',
                'from-green-500 to-green-600', 
                'from-purple-500 to-purple-600',
                'from-orange-500 to-orange-600'
              ];
              const emojis = ['📞', '📧', '💬', '🏢'];
              
              return (
                <div 
                  key={index} 
                  className="card-elegant text-center group hover:scale-105 transform transition-all duration-300 animate-fade-in-up relative overflow-hidden"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  {/* Hover Background Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Enhanced Icon */}
                  <div className="relative text-center mb-6">
                    <div className={`w-20 h-20 bg-gradient-to-r ${gradients[index]} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:rotate-6 transition-transform duration-300 shadow-xl`}>
                      <span className="text-3xl">{emojis[index]}</span>
                    </div>
                    
                    {/* Animated Ring */}
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-20 h-20 border-2 border-primary/20 rounded-2xl group-hover:scale-110 group-hover:border-primary/40 transition-all duration-300"></div>
                  </div>
                  
                  <div className="relative z-10">
                    <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">{method.title}</h3>
                    
                    <div className="space-y-2 mb-4">
                      {method.details.map((detail, idx) => (
                        <p key={idx} className="text-foreground font-medium text-sm">{detail}</p>
                      ))}
                    </div>
                    
                    <p className="text-muted-foreground text-sm mb-6 leading-relaxed">{method.description}</p>
                    
                    <button className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary to-primary-light text-primary-foreground font-medium rounded-xl hover:shadow-lg transform hover:scale-105 active:scale-95 transition-all duration-200 group/btn w-full justify-center relative z-20">
                      <span className="mr-2">{method.action}</span>
                      <span className="transform group-hover/btn:translate-x-1 transition-transform duration-200">→</span>
                      
                      {/* Button Glow Effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary-light rounded-xl opacity-0 group-hover/btn:opacity-30 blur-xl transition-opacity duration-300"></div>
                    </button>
                  </div>
                  
                  {/* Corner Decoration */}
                  <div className="absolute top-4 right-4 w-2 h-2 bg-accent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="relative bg-gradient-to-br from-secondary via-secondary/80 to-background py-20 overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-80 h-80 bg-primary/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse-slow"></div>
        </div>
        
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="card-elegant backdrop-blur-sm border border-white/10 shadow-2xl animate-fade-in-up">
            <div className="text-center mb-10">
              <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full mb-4">
                <span className="text-sm font-medium text-primary">📝 Contact Form</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gradient-primary mb-4 tracking-tight">Send us a Message</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Fill out the form below and we&apos;ll get back to you 
                <span className="font-semibold text-primary">within 24 hours</span>
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="input-professional"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="input-professional"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="input-professional"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Category *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="input-professional"
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="case-tracking">Case Tracking</option>
                    <option value="efiling">eFiling Support</option>
                    <option value="legal-aid">Legal Aid</option>
                    <option value="technical">Technical Issue</option>
                    <option value="general">General Inquiry</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="input-professional"
                  placeholder="Brief description of your inquiry"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={5}
                  className="input-professional"
                  placeholder="Please provide detailed information about your inquiry"
                  required
                ></textarea>
              </div>

              <button type="submit" className="btn-hero w-full">
                <Send className="mr-2 h-5 w-5" />
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Department Contacts */}
      <section className="relative py-20 bg-gradient-to-b from-background to-secondary/30 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-72 h-72 bg-accent/30 rounded-full blur-3xl animate-bounce-slow"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-primary/20 rounded-full blur-3xl animate-float"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full mb-4">
              <span className="text-sm font-medium text-primary">🏢 Specialized Support</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gradient-primary mb-4 tracking-tight">Department Contacts</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Direct contact information for specific departments and 
              <span className="font-semibold text-primary">specialized services</span>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {departments.map((dept, index) => {
              const deptEmojis = ['🔍', '📄', '⚖️', '🛠️'];
              
              return (
                <div 
                  key={index} 
                  className="card-elegant group hover:scale-105 transform transition-all duration-300 animate-fade-in-up relative overflow-hidden"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  {/* Hover Background Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-primary/20 to-accent/20 rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                        <span className="text-xl">{deptEmojis[index]}</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{dept.name}</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">{dept.description}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-3 pt-4 border-t border-border/50">
                      <div className="group/item flex items-center hover:translate-x-1 transition-transform duration-200">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mr-3">
                          <Phone className="h-4 w-4 text-primary" />
                        </div>
                        <a href={`tel:${dept.phone}`} className="text-primary hover:text-primary-light transition-colors font-medium">
                          {dept.phone}
                        </a>
                      </div>
                      <div className="group/item flex items-center hover:translate-x-1 transition-transform duration-200">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mr-3">
                          <Mail className="h-4 w-4 text-primary" />
                        </div>
                        <a href={`mailto:${dept.email}`} className="text-primary hover:text-primary-light transition-colors font-medium text-sm">
                          {dept.email}
                        </a>
                      </div>
                    </div>
                  </div>
                  
                  {/* Corner Decoration */}
                  <div className="absolute top-4 right-4 w-2 h-2 bg-accent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Court Registries */}
      <section className="relative bg-gradient-to-br from-secondary via-secondary/80 to-background py-20 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-80 h-80 bg-accent/30 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-float"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full mb-4">
              <span className="text-sm font-medium text-primary">🏛️ Court Information</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gradient-primary mb-4 tracking-tight">Court Registries</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Contact information for major court registries in 
              <span className="font-semibold text-primary">Delhi NCR</span>
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {courtRegistries.map((court, index) => {
              const courtEmojis = ['⚖️', '🏛️', '🏢'];
              
              return (
                <div 
                  key={index} 
                  className="card-elegant group hover:scale-105 transform transition-all duration-300 animate-fade-in-up relative overflow-hidden"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  {/* Hover Background Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-primary/20 to-accent/20 rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                        <span className="text-xl">{courtEmojis[index]}</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors leading-tight">{court.court}</h3>
                      </div>
                    </div>
                    
                    <div className="space-y-3 text-sm">
                      <div className="group/item flex items-start hover:translate-x-1 transition-transform duration-200">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mr-3 mt-0.5">
                          <MapPin className="h-4 w-4 text-primary" />
                        </div>
                        <span className="text-muted-foreground leading-relaxed">{court.address}</span>
                      </div>
                      
                      <div className="group/item flex items-center hover:translate-x-1 transition-transform duration-200">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mr-3">
                          <Phone className="h-4 w-4 text-primary" />
                        </div>
                        <a href={`tel:${court.phone}`} className="text-primary hover:text-primary-light transition-colors font-medium">
                          {court.phone}
                        </a>
                      </div>
                      
                      <div className="group/item flex items-center hover:translate-x-1 transition-transform duration-200">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mr-3">
                          <Mail className="h-4 w-4 text-primary" />
                        </div>
                        <a href={`mailto:${court.email}`} className="text-primary hover:text-primary-light transition-colors font-medium text-xs">
                          {court.email}
                        </a>
                      </div>
                      
                      <div className="group/item flex items-center hover:translate-x-1 transition-transform duration-200">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mr-3">
                          <Clock className="h-4 w-4 text-primary" />
                        </div>
                        <span className="text-muted-foreground">{court.timings}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Corner Decoration */}
                  <div className="absolute top-4 right-4 w-2 h-2 bg-accent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Office Location */}
      <section className="relative py-20 bg-gradient-to-b from-background via-secondary/30 to-background overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-20 right-20 w-72 h-72 bg-accent/30 rounded-full blur-3xl animate-float"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full mb-4">
              <span className="text-sm font-medium text-primary">📍 Physical Location</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gradient-primary mb-4 tracking-tight">Visit Our Office</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Main office of the Department of Justice - 
              <span className="font-semibold text-primary">NyayaSetu Portal</span>
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="card-elegant group hover:scale-105 transform transition-all duration-300 animate-fade-in-up relative overflow-hidden">
              {/* Hover Background Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary/20 to-accent/20 rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                    <span className="text-xl">🏢</span>
                  </div>
                  <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">Office Details</h3>
                </div>
                
                <div className="space-y-6">
                  <div className="group/item flex items-start hover:translate-x-2 transition-transform duration-300">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mr-4 mt-1">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2 group-item/hover:text-primary transition-colors">Address</h4>
                      <p className="text-muted-foreground leading-relaxed">
                        Department of Justice<br />
                        Ministry of Law and Justice<br />
                        Jaisalmer House, 26 Man Singh Road<br />
                        New Delhi - 110011, India
                      </p>
                    </div>
                  </div>
                  
                  <div className="group/item flex items-start hover:translate-x-2 transition-transform duration-300">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mr-4 mt-1">
                      <Clock className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2 group-item/hover:text-primary transition-colors">Office Hours</h4>
                      <p className="text-muted-foreground leading-relaxed">
                        Monday to Friday: 9:30 AM - 5:30 PM<br />
                        Saturday & Sunday: Closed<br />
                        Public Holidays: Closed
                      </p>
                    </div>
                  </div>
                  
                  <div className="group/item flex items-start hover:translate-x-2 transition-transform duration-300">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mr-4 mt-1">
                      <User className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2 group-item/hover:text-primary transition-colors">Visitor Information</h4>
                      <p className="text-muted-foreground leading-relaxed">
                        Valid photo ID required for entry<br />
                        Prior appointment recommended<br />
                        Security check mandatory
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Corner Decoration */}
              <div className="absolute top-4 right-4 w-2 h-2 bg-accent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>

            <div className="card-elegant group hover:scale-105 transform transition-all duration-300 animate-fade-in-up relative overflow-hidden" style={{ animationDelay: '200ms' }}>
              {/* Hover Background Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary/20 to-accent/20 rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                    <span className="text-xl">🗺️</span>
                  </div>
                  <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">Location Map</h3>
                </div>
                
             
              </div>
              
              {/* Corner Decoration */}
              <div className="absolute top-4 right-4 w-2 h-2 bg-accent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default Contact;