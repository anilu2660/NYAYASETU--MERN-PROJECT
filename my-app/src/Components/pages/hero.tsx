"use client";
import { ArrowRight, Shield, Users, FileText } from "lucide-react";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-br from-primary via-primary-light to-accent text-primary-foreground py-24 md:py-32 overflow-hidden">
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
            <span className="text-sm font-medium">🇮🇳 Government of India</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight animate-fade-in-up delay-200 tracking-tight">
            <span className="block">Digital Justice for</span>
            <span className="block text-gradient-hero animate-gradient">Every Citizen</span>
          </h1>

          <p className="text-xl md:text-2xl mb-12 max-w-4xl mx-auto text-primary-foreground/90 leading-relaxed animate-fade-in-up delay-300">
            Empowering access to justice through technology. Track cases, access legal aid,
            file documents, and connect with judicial services 
            <span className="font-semibold text-accent-light"> seamlessly</span>.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16 animate-fade-in-up delay-500">
            <Link href="/services" className="btn-hero group animate-glow">
              <span className="mr-2">🚀 Explore Services</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/casetrack"
              className="btn-secondary bg-white/10 border-white/20 text-white hover:bg-white hover:text-primary transform hover:scale-105 active:scale-95 transition-all duration-200"
            >
              🔍 Track Your Case
            </Link>
          </div>

          {/* Enhanced Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto animate-fade-in-up delay-700">
            <div className="group flex flex-col items-center p-8 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-accent-light to-accent rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform duration-300">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold mb-2 group-hover:text-accent-light transition-colors">50K+</h3>
              <p className="text-primary-foreground/80 font-medium">Cases Tracked</p>
              <div className="w-12 h-1 bg-accent-light rounded-full mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>

            <div className="group flex flex-col items-center p-8 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-accent-light to-accent rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform duration-300">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold mb-2 group-hover:text-accent-light transition-colors">25K+</h3>
              <p className="text-primary-foreground/80 font-medium">Citizens Served</p>
              <div className="w-12 h-1 bg-accent-light rounded-full mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>

            <div className="group flex flex-col items-center p-8 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-accent-light to-accent rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform duration-300">
                <FileText className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold mb-2 group-hover:text-accent-light transition-colors">15K+</h3>
              <p className="text-primary-foreground/80 font-medium">Documents Filed</p>
              <div className="w-12 h-1 bg-accent-light rounded-full mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
