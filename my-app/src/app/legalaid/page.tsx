"use client";
import { useState } from "react";
import { Users, Phone, Mail, FileText, Download, ExternalLink, Heart, Upload, X } from "lucide-react";
import ProtectedRoute from "../../Components/ProtectedRoute";
import Link from "next/link";
import FileUpload from "../../Components/FileUpload";

const LegalAid = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedService, setSelectedService] = useState("");

  const aidCategories = [
    { id: "all", label: "All Services" },
    { id: "criminal", label: "Criminal Cases" },
    { id: "civil", label: "Civil Matters" },
    { id: "family", label: "Family Disputes" },
    { id: "consumer", label: "Consumer Rights" },
    { id: "labor", label: "Labor Issues" }
  ];

  const legalAidServices = [
    {
      title: "Free Legal Consultation",
      description: "Get free legal advice from qualified advocates for your legal matters",
      category: "all",
      eligibility: "Income below ₹9,000 per month",
      documents: ["Income Certificate", "Identity Proof", "Address Proof"]
    },
    {
      title: "Criminal Defense Aid",
      description: "Legal representation for criminal cases including bail applications",
      category: "criminal",
      eligibility: "Accused persons unable to afford legal representation",
      documents: ["Court Notice", "Income Certificate", "Case Documents"]
    },
    {
      title: "Civil Litigation Support",
      description: "Assistance with civil matters including property disputes and contracts",
      category: "civil",
      eligibility: "Parties to civil disputes with limited financial means",
      documents: ["Legal Notice", "Property Documents", "Income Proof"]
    },
    {
      title: "Family Court Assistance",
      description: "Help with divorce, maintenance, custody and domestic violence cases",
      category: "family",
      eligibility: "Women, children, and vulnerable family members",
      documents: ["Marriage Certificate", "Income Documents", "Complaint Copy"]
    },
    {
      title: "Consumer Protection",
      description: "Legal aid for consumer complaints and protection of consumer rights",
      category: "consumer",
      eligibility: "Consumers facing unfair trade practices",
      documents: ["Purchase Receipt", "Complaint Details", "Identity Proof"]
    },
    {
      title: "Labor Rights Support",
      description: "Assistance for workers' rights, wage disputes, and workplace issues",
      category: "labor",
      eligibility: "Workers and laborers in disputes with employers",
      documents: ["Employment Proof", "Salary Slips", "Complaint Details"]
    }
  ];

  const legalAidInstitutions = [
    {
      name: "National Legal Services Authority (NALSA)",
      description: "Apex body for legal aid in India",
      contact: "+91-11-23384700",
      email: "nalsa@gov.in",
      website: "https://nalsa.gov.in/"
    },
    {
      name: "State Legal Services Authority",
      description: "State-level legal aid coordination",
      contact: "Varies by state",
      email: "Contact respective SLSA",
      website: "https://legalservices.maharashtra.gov.in/"
    },
    {
      name: "District Legal Services Authority",
      description: "District-level legal aid services",
      contact: "Contact local DLSA",
      email: "Varies by district",
      website: "https://legalservices.maharashtra.gov.in/"
    }
  ];

  const documents = [
    {
      title: "Legal Aid Application Form",
      description: "Standard application form for legal aid services",
      type: "PDF",
      url: "https://cdnbbsr.s3waas.gov.in/s3ec01639d79cc857a6c76c2723b7e014f/uploads/2023/03/2023032438.pdf"
    },
    {
      title: "Income Certificate Format",
      description: "Format for income certificate required for legal aid",
      type: "PDF",
      url: "https://cdnbbsr.s3waas.gov.in/s3ec03706608cfdbcc1886bb7eea5513f9/uploads/2023/06/2023060741.pdf"
    },
    {
      title: "Eligibility Guidelines",
      description: "Complete guidelines for legal aid eligibility",
      type: "PDF",
      url: "https://cdnbbsr.s3waas.gov.in/s3ec045c80985bd40b8ce792f8c786bb23/uploads/2023/10/2023103163-1.pdf"
    },
    {
      title: "Lawyer Panel List",
      description: "List of empaneled lawyers for legal aid",
      type: "PDF",
      url: "https://legalaffairs.gov.in/existing-panel-counsel"
    }
  ];

  const filteredServices = selectedCategory === "all" 
    ? legalAidServices 
    : legalAidServices.filter(service => service.category === selectedCategory);

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
              <span className="text-sm font-medium">⚖️ Free Legal Assistance</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-8 animate-fade-in-up delay-200 tracking-tight">
              <span className="block">Legal Aid</span>
              <span className="block text-gradient-hero animate-gradient">Services</span>
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/90 max-w-4xl mx-auto leading-relaxed animate-fade-in-up delay-300">
              Free legal assistance for those who cannot afford legal representation. 
              <span className="font-semibold text-accent-light">Justice for all</span>, regardless of economic status.
            </p>
            
            {/* Enhanced CTA Buttons */}
                         <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12 animate-fade-in-up delay-500">
               <button 
                 className="btn-hero animate-glow"
                 onClick={() => {
                   setSelectedService("General Legal Aid");
                   setShowUploadModal(true);
                 }}
               >
                 📞 Apply for Legal Aid
               </button>
               <button className="btn-secondary bg-white/10 border-white/20 text-white hover:bg-white hover:text-primary">
                 📄 Download Forms
               </button>
             </div>
          </div>
        </div>
      </section>

      {/* Quick Contact */}
      <section className="py-8 bg-success text-success-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <Heart className="h-6 w-6 mr-3" />
              <span className="text-lg font-semibold">Emergency Legal Aid Helpline</span>
            </div>
            <div className="flex items-center space-x-6">
              <a href="tel:15100" className="flex items-center hover:text-success-foreground/80 transition-colors">
                <Phone className="h-5 w-5 mr-2" />
                <span className="font-semibold">15100 (Toll Free)</span>
              </a>
              <span className="text-success-foreground/80">Available 24/7</span>
            </div>
          </div>
        </div>
      </section>

      {/* Service Categories */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Legal Aid Categories</h2>
            <p className="text-lg text-muted-foreground">
              Browse legal aid services by category to find the assistance you need
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            {aidCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  selectedCategory === category.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((service, index) => (
              <div key={index} className="card-service">
                <div className="flex items-center mb-4">
                  <Users className="h-8 w-8 text-primary mr-3" />
                  <h3 className="text-xl font-bold text-foreground">{service.title}</h3>
                </div>
                
                <p className="text-muted-foreground mb-4 leading-relaxed">{service.description}</p>
                
                <div className="space-y-3 mb-4">
                  <div>
                    <h4 className="font-semibold text-foreground text-sm">Eligibility:</h4>
                    <p className="text-sm text-muted-foreground">{service.eligibility}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-foreground text-sm">Required Documents:</h4>
                    <ul className="text-sm text-muted-foreground">
                      {service.documents.map((doc, idx) => (
                        <li key={idx} className="flex items-center">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></div>
                          {doc}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                                 <button 
                   className="btn-hero w-full"
                   onClick={() => {
                     setSelectedService(service.title);
                     setShowUploadModal(true);
                   }}
                 >
                   Apply for Aid
                 </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Legal Aid Institutions */}
      <section className="bg-secondary py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Legal Aid Institutions</h2>
            <p className="text-lg text-muted-foreground">
              Connect with authorized legal aid institutions across the country
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {legalAidInstitutions.map((institution, index) => (
              <div key={index} className="card-elegant">
                <h3 className="text-xl font-bold text-foreground mb-3">{institution.name}</h3>
                <p className="text-muted-foreground mb-4">{institution.description}</p>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 text-primary mr-2" />
                    <span>{institution.contact}</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 text-primary mr-2" />
                    <span>{institution.email}</span>
                  </div>
                                     <div className="flex items-center">
                     <ExternalLink className="h-4 w-4 text-primary mr-2" />
                     <Link href={institution.website} target="_blank" rel="noopener noreferrer">
                       <button className="btn-secondary text-sm">
                         Visit Website
                       </button>
                     </Link>
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Documents Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Download Forms & Documents</h2>
            <p className="text-lg text-muted-foreground">
              Essential forms and documents for legal aid applications
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {documents.map((doc, index) => (
              <div key={index} className="card-elegant text-center group">
                <FileText className="h-12 w-12 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-lg font-semibold text-foreground mb-2">{doc.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{doc.description}</p>
                <Link href={doc.url}>
                <button className="btn-secondary w-full">
                  <Download className="mr-2 h-4 w-4" />
                  Download {doc.type}
                </button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="bg-gradient-to-r from-primary to-primary-light text-primary-foreground py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-8">How to Apply for Legal Aid</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl font-bold">1</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Check Eligibility</h3>
              <p className="text-primary-foreground/80">Verify if you meet the income and category criteria</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Gather Documents</h3>
              <p className="text-primary-foreground/80">Collect required documents and certificates</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Submit Application</h3>
              <p className="text-primary-foreground/80">Fill and submit application to nearest DLSA</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl font-bold">4</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Get Assistance</h3>
              <p className="text-primary-foreground/80">Receive assigned lawyer and legal support</p>
            </div>
          </div>
                 </div>
       </section>

       {/* Upload Modal */}
       {showUploadModal && (
         <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
           <div className="bg-background rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
             <div className="p-6 border-b border-border">
               <div className="flex items-center justify-between">
                 <h3 className="text-xl font-bold text-foreground">
                   Apply for Legal Aid - {selectedService}
                 </h3>
                 <button
                   onClick={() => setShowUploadModal(false)}
                   className="p-2 hover:bg-secondary rounded-lg transition-colors"
                 >
                   <X className="h-5 w-5 text-muted-foreground" />
                 </button>
               </div>
               <p className="text-muted-foreground mt-2">
                 Please upload the required documents for your legal aid application
               </p>
             </div>
             
             <div className="p-6 space-y-6">
               {/* Document Upload */}
               <div>
                 <label className="block text-sm font-medium text-foreground mb-2">
                   Upload Documents *
                 </label>
                 <FileUpload
                   onFilesSelected={(files) => {
                     console.log('Files selected:', files);
                   }}
                   onFileUpload={(uploadedFiles) => {
                     console.log('Files uploaded:', uploadedFiles);
                   }}
                   maxFiles={10}
                   maxSize={10}
                   acceptedTypes={['.pdf', '.doc', '.docx', '.jpg', '.jpeg', '.png']}
                 />
               </div>

               {/* Application Form */}
               <div className="space-y-4">
                 <div>
                   <label className="block text-sm font-medium text-foreground mb-2">
                     Full Name *
                   </label>
                   <input
                     type="text"
                     className="input-professional"
                     placeholder="Enter your full name"
                     required
                   />
                 </div>
                 
                 <div>
                   <label className="block text-sm font-medium text-foreground mb-2">
                     Contact Number *
                   </label>
                   <input
                     type="tel"
                     className="input-professional"
                     placeholder="Enter your contact number"
                     required
                   />
                 </div>
                 
                 <div>
                   <label className="block text-sm font-medium text-foreground mb-2">
                     Email Address
                   </label>
                   <input
                     type="email"
                     className="input-professional"
                     placeholder="Enter your email address"
                   />
                 </div>
                 
                 <div>
                   <label className="block text-sm font-medium text-foreground mb-2">
                     Brief Description of Case *
                   </label>
                   <textarea
                     rows={4}
                     className="input-professional"
                     placeholder="Please provide a brief description of your legal matter"
                     required
                   ></textarea>
                 </div>
               </div>

               {/* Action Buttons */}
               <div className="flex gap-3 pt-4">
                 <button
                   onClick={() => setShowUploadModal(false)}
                   className="btn-secondary flex-1"
                 >
                   Cancel
                 </button>
                 <button className="btn-hero flex-1">
                   Submit Application
                 </button>
               </div>
             </div>
           </div>
         </div>
       )}
       </div>
     </ProtectedRoute>
   );
 };

export default LegalAid;
