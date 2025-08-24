"use client";
import Link from "next/link";
import { ArrowRight, FileText, Users, Upload, BookOpen } from "lucide-react";


const Index = () => {
  const quickServices = [
    { icon: FileText, title: "Track Cases", link: "/casetrack", description: "Monitor your case status" },
    { icon: Users, title: "Legal Aid", link: "/legalaid", description: "Get free legal assistance" },
    { icon: Upload, title: "eFiling", link: "/efile", description: "File documents online" },
    { icon: BookOpen, title: "Resources", link: "/resource", description: "Access legal documents" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Enhanced Quick Services */}
      <section className="relative py-20 bg-gradient-to-b from-secondary via-secondary/50 to-background overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 right-20 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-20 left-20 w-48 h-48 bg-accent/30 rounded-full blur-2xl animate-float"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16 animate-fade-in-up">
            <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full mb-6">
              <span className="text-sm font-medium text-primary">⚡ Quick Access Portal</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Popular 
              <span className="text-gradient-primary">Services</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Access our most popular services with just one click
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {quickServices.map((service, index) => {
              const emojis = ['🔍', '⚖️', '📄', '📚'];
              return (
                <Link 
                  key={index} 
                  href={service.link} 
                  className="card-elegant group hover:scale-105 transform transition-all duration-300 animate-fade-in-up relative overflow-hidden"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  {/* Hover Background Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Icon */}
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-r from-primary to-primary-light rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:rotate-6 transition-transform duration-300 shadow-lg">
                      <span className="text-2xl">{emojis[index]}</span>
                    </div>
                    
                    {/* Animated Ring */}
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-16 border-2 border-primary/20 rounded-2xl group-hover:scale-110 group-hover:border-primary/40 transition-all duration-300"></div>
                  </div>
                  
                  <div className="relative z-10 text-center">
                    <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      {service.description}
                    </p>
                    
                    {/* Enhanced Access Button */}
                    <div className="inline-flex items-center px-4 py-2 bg-primary/10 text-primary font-medium rounded-lg hover:bg-primary hover:text-primary-foreground group-hover:scale-105 transition-all duration-200">
                      <span className="mr-2">Access Now</span>
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                  
                  {/* Corner Decoration */}
                  <div className="absolute top-4 right-4 w-2 h-2 bg-accent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
