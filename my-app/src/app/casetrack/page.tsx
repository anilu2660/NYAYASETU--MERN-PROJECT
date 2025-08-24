"use client";
import { useState } from "react";
import { Search, Calendar, FileText, Clock, MapPin, User, Phone } from "lucide-react";
import ProtectedRoute from "../../Components/ProtectedRoute";

const CaseTracking = () => {
  const [searchType, setSearchType] = useState("caseNumber");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<CaseResult | null>(null);

  interface CaseResult {
    caseNumber: string;
    petitioner: string;
    respondent: string;
    court: string;
    courtHall: string;
    judge: string;
    status: string;
    nextHearing: string;
    caseType: string;
    filingDate: string;
    lastUpdated: string;
    stage: string;
    lawyer: string;
  }
  

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate search results
    if (searchQuery) {
      setSearchResults({
        caseNumber: "CRL.A. 1234/2024",
        petitioner: "State of Delhi",
        respondent: "Rajesh Kumar",
        court: "Delhi High Court",
        courtHall: "Court Room No. 15",
        judge: "Hon'ble Justice Pradeep Nandrajog",
        status: "Listed for Hearing",
        nextHearing: "2024-02-15",
        caseType: "Criminal Appeal",
        filingDate: "2024-01-10",
        lastUpdated: "2024-02-01",
        stage: "Arguments",
        lawyer: "Adv. Amit Sharma"
      });
    }
  };

  const courtLevels = [
    {
      name: "Supreme Court of India",
      description: "Apex court of the country for constitutional and appellate matters",
      website: "https://www.sci.gov.in/"
    },
    {
      name: "High Courts",
      description: "Principal civil courts at state level with appellate jurisdiction",
      website: "https://doj.gov.in/"
    },
    {
      name: "District Courts",
      description: "Trial courts with original and appellate jurisdiction",
      website: "https://districts.ecourts.gov.in/"
    },
    {
      name: "Subordinate Courts",
      description: "Lower courts including CJM, ACJM, and Metropolitan Magistrate courts",
      website: "https://ecourts.gov.in/"
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
              <span className="text-sm font-medium">🏛️ Integrated Court System</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-8 animate-fade-in-up delay-200 tracking-tight">
              <span className="block">Case Tracking</span>
              <span className="block text-gradient-hero animate-gradient">System</span>
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/90 max-w-4xl mx-auto leading-relaxed animate-fade-in-up delay-300">
              Track your legal cases across all court levels in real-time with our 
              <span className="font-semibold text-accent-light"> intelligent tracking system</span>
            </p>
            
            {/* Enhanced CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12 animate-fade-in-up delay-500">
              <button className="btn-hero animate-glow">
                🚀 Start Tracking Now
              </button>
              <button className="btn-secondary bg-white/10 border-white/20 text-white hover:bg-white hover:text-primary">
                📖 View Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Search Section */}
      <section className="py-20 relative">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Cpath d='m20 20 20 20-20-20z'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="card-elegant animate-fade-in-up backdrop-blur-sm">
            <div className="text-center mb-8">
              <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full mb-4">
                <Search className="h-4 w-4 text-primary mr-2" />
                <span className="text-sm font-medium text-primary">Advanced Case Search</span>
              </div>
              <h2 className="text-3xl font-bold text-foreground mb-2">Find Your Case</h2>
              <p className="text-muted-foreground">Search across all court levels with our intelligent tracking system</p>
            </div>
            
            {/* Search Type Selection */}
            <div className="flex flex-wrap gap-4 mb-6 justify-center" style={{ zIndex: 100 }}>
              {[
                { value: "caseNumber", label: "Case Number" },
                { value: "partyName", label: "Party Name" },
                { value: "filingNumber", label: "Filing Number" },
                { value: "advocate", label: "Advocate Name" }
              ].map((type) => {
                const isActive = searchType === type.value;
                return (
                  <button
                    key={type.value}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      setSearchType(type.value);
                    }}
                    className={`
                      px-6 py-3 rounded-lg font-medium transition-all duration-200 
                      border-2 cursor-pointer select-none outline-none
                      focus:outline-none focus:ring-2 focus:ring-blue-500
                      hover:scale-105 active:scale-95
                      ${
                        isActive
                          ? "bg-blue-600 text-white border-blue-600 shadow-lg"
                          : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-blue-50 hover:border-blue-400"
                      }
                    `}
                    style={{
                      zIndex: 101,
                      position: 'relative',
                      pointerEvents: 'auto',
                      userSelect: 'none'
                    }}
                  >
                    {type.label}
                  </button>
                );
              })}
            </div>

            {/* Search Form */}
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={`Enter ${searchType === 'caseNumber' ? 'case number' : searchType === 'partyName' ? 'party name' : searchType === 'filingNumber' ? 'filing number' : 'advocate name'}`}
                  className="input-professional pl-10"
                />
              </div>
              
              <button type="submit" className="btn-hero w-full">
                <Search className="mr-2 h-5 w-5" />
                Search Case
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Enhanced Search Results */}
      {searchResults && (
        <section className="pb-20 relative">
          {/* Subtle Background */}
          <div className="absolute inset-0 bg-gradient-to-b from-background to-secondary/20"></div>
          
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="card-elegant animate-fade-in-up backdrop-blur-sm border border-primary/10">
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 bg-gradient-to-r from-success to-success-light rounded-xl flex items-center justify-center mr-4">
                  <FileText className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-foreground">Case Details Found</h3>
                  <p className="text-muted-foreground">Here are the details for your case</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Basic Information */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-foreground border-b border-border pb-2">
                    Basic Information
                  </h4>
                  
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 text-primary mr-3" />
                      <div>
                        <p className="text-sm text-muted-foreground">Case Number</p>
                        <p className="font-medium">{searchResults.caseNumber}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <User className="h-5 w-5 text-primary mr-3" />
                      <div>
                        <p className="text-sm text-muted-foreground">Petitioner vs Respondent</p>
                        <p className="font-medium">{searchResults.petitioner} vs {searchResults.respondent}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <MapPin className="h-5 w-5 text-primary mr-3" />
                      <div>
                        <p className="text-sm text-muted-foreground">Court</p>
                        <p className="font-medium">{searchResults.court}</p>
                        <p className="text-sm text-muted-foreground">{searchResults.courtHall}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Status & Timeline */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-foreground border-b border-border pb-2">
                    Status & Timeline
                  </h4>
                  
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 text-success mr-3" />
                      <div>
                        <p className="text-sm text-muted-foreground">Current Status</p>
                        <p className="font-medium text-success">{searchResults.status}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 text-primary mr-3" />
                      <div>
                        <p className="text-sm text-muted-foreground">Next Hearing</p>
                        <p className="font-medium">{searchResults.nextHearing}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <User className="h-5 w-5 text-primary mr-3" />
                      <div>
                        <p className="text-sm text-muted-foreground">Presiding Judge</p>
                        <p className="font-medium">{searchResults.judge}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Details */}
              <div className="mt-8 pt-6 border-t border-border">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Case Type</p>
                    <p className="font-medium">{searchResults.caseType}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Filing Date</p>
                    <p className="font-medium">{searchResults.filingDate}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Current Stage</p>
                    <p className="font-medium">{searchResults.stage}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Enhanced Court Levels Section */}
      <section className="relative bg-gradient-to-b from-secondary via-secondary/50 to-background py-20 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 right-20 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-20 left-20 w-48 h-48 bg-accent/30 rounded-full blur-2xl animate-float"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16 animate-fade-in-up">
            <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full mb-6">
              <FileText className="h-4 w-4 text-primary mr-2" />
              <span className="text-sm font-medium text-primary">Integrated Court System</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Track Cases Across 
              <span className="text-gradient-primary"> All Court Levels</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our intelligent system provides seamless integration with all levels of the Indian judicial hierarchy
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {courtLevels.map((court, index) => {
              const icons = ['🏛️', '⚖️', '🏢', '📋'];
              return (
                <div 
                  key={index} 
                  className="card-elegant text-center group hover:scale-105 transform transition-all duration-300 animate-fade-in-up relative overflow-hidden"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  {/* Hover Background Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Icon */}
                  <div className="relative">
                    <div className="w-20 h-20 bg-gradient-to-br from-primary via-primary-light to-accent rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:rotate-6 transition-transform duration-300 shadow-lg">
                      <span className="text-3xl">{icons[index]}</span>
                    </div>
                    
                    {/* Animated Ring */}
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-20 h-20 border-2 border-primary/20 rounded-2xl group-hover:scale-110 group-hover:border-primary/40 transition-all duration-300"></div>
                  </div>
                  
                  <div className="relative z-10">
                    <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                      {court.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                      {court.description}
                    </p>
                    
                    {/* Enhanced Portal Button */}
                    <a 
                      href={court.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary to-primary-light text-primary-foreground font-medium rounded-xl hover:shadow-lg transform hover:scale-105 active:scale-95 transition-all duration-200 group/btn relative z-20"
                      style={{ pointerEvents: 'auto' }}
                    >
                      <span className="mr-2">Visit Portal</span>
                      <span className="transform group-hover/btn:translate-x-1 transition-transform duration-200">→</span>
                      
                      {/* Button Glow Effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary-light rounded-xl opacity-0 group-hover/btn:opacity-30 blur-xl transition-opacity duration-300"></div>
                    </a>
                  </div>
                  
                  {/* Corner Decoration */}
                  <div className="absolute top-4 right-4 w-2 h-2 bg-accent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              );
            })}
          </div>
          
          {/* Additional Info Section */}
          <div className="mt-16 text-center animate-fade-in-up" style={{ animationDelay: '600ms' }}>
            <div className="inline-flex items-center px-6 py-3 bg-primary/10 backdrop-blur-sm rounded-full">
              <Clock className="h-5 w-5 text-primary mr-2" />
              <span className="text-sm font-medium text-primary">Real-time updates across all court levels</span>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Help Section */}
      <section className="relative py-20 bg-gradient-to-br from-background via-secondary/30 to-background overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-32 h-32 bg-primary/30 rounded-full blur-2xl animate-pulse-slow"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-accent/30 rounded-full blur-3xl animate-float"></div>
        </div>
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <div className="animate-fade-in-up">
            <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full mb-6">
              <Phone className="h-4 w-4 text-primary mr-2" />
              <span className="text-sm font-medium text-primary">24/7 Support Available</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Need Help with 
              <span className="text-gradient-primary">Case Tracking?</span>
            </h2>
            
            <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
              Our dedicated support team is available around the clock to assist you with case searches, 
              status inquiries, and any technical questions you might have.
            </p>
          </div>
          
          {/* Support Options Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            <div className="card-elegant text-center p-6 hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-primary to-primary-light rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Phone className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Phone Support</h3>
              <p className="text-sm text-muted-foreground mb-4">Direct line to our support experts</p>
              <p className="text-primary font-medium">+91-11-23385954</p>
            </div>
            
            <div className="card-elegant text-center p-6 hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-accent to-accent-light rounded-2xl flex items-center justify-center mx-auto mb-4">
                <User className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Live Chat</h3>
              <p className="text-sm text-muted-foreground mb-4">Instant messaging with our team</p>
              <p className="text-accent font-medium">Available 24/7</p>
            </div>
            
            <div className="card-elegant text-center p-6 hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-success to-success-light rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FileText className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Help Center</h3>
              <p className="text-sm text-muted-foreground mb-4">Comprehensive guides and FAQs</p>
              <p className="text-success font-medium">Self-service resources</p>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '400ms' }}>
            <a 
              href="tel:+91-11-23385954" 
              className="btn-hero transform hover:scale-105 active:scale-95 transition-all duration-200"
            >
              <Phone className="mr-2 h-5 w-5" />
              Call Support Now
            </a>
            
            <button className="btn-secondary border-2 border-primary/20 hover:border-primary hover:bg-primary hover:text-primary-foreground transform hover:scale-105 active:scale-95 transition-all duration-200">
              <User className="mr-2 h-5 w-5" />
              Start Live Chat
            </button>
            
            <button className="btn-outline text-foreground border-border hover:bg-secondary transform hover:scale-105 active:scale-95 transition-all duration-200">
              <FileText className="mr-2 h-5 w-5" />
              Browse Help Center
            </button>
          </div>
          
          {/* Additional Info */}
          <div className="mt-12 p-6 bg-primary/5 rounded-2xl border border-primary/10 animate-fade-in-up" style={{ animationDelay: '600ms' }}>
            <div className="flex items-center justify-center mb-3">
              <Clock className="h-5 w-5 text-primary mr-2" />
              <span className="text-sm font-medium text-primary">Response Time Guarantee</span>
            </div>
            <p className="text-sm text-muted-foreground">
              We commit to responding to all support requests within 2 hours during business hours, 
              and within 6 hours for after-hours inquiries.
            </p>
          </div>
        </div>
      </section>
      </div>
    </ProtectedRoute>
  );
};

export default CaseTracking;
