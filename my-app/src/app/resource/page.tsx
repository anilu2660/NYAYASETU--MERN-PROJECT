"use client";
import { useState, useRef } from "react";
import { BookOpen, Download, Search, ExternalLink, FileText, Video, Gavel, Scale } from "lucide-react";

const Resources = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const filterRef = useRef<HTMLDivElement>(null);

  const categories = [
    { id: "all", label: "All Resources" },
    { id: "laws", label: "Laws & Acts" },
    { id: "rules", label: "Court Rules" },
    { id: "forms", label: "Legal Forms" },
    { id: "procedures", label: "Procedures" },
    { id: "videos", label: "Video Guides" }
  ];

  const resources = [
    {
      title: "Bhartiya Nyaya Sahita 2023",
      description: "Complete text of the Indian Penal Code with latest amendments",
      category: "laws",
      type: "PDF",
      size: "2.5 MB",
      downloads: 15420,
      icon: Scale,
      url: "https://www.mha.gov.in/sites/default/files/250883_english_01042024.pdf"
    },
    {
      title: "Code of Criminal Procedure (CrPC)",
      description: "Criminal procedure code with section-wise explanations",
      category: "laws",
      type: "PDF",
      size: "3.2 MB",
      downloads: 12350,
      icon: Gavel,
      url: "https://www.indiacode.nic.in/bitstream/123456789/15272/1/the_code_of_criminal_procedure,_1973.pdf"
    },
    {
      title: "Civil Procedure Code (CPC)",
      description: "Complete civil procedure code for civil litigation",
      category: "laws",
      type: "PDF",
      size: "2.8 MB",
      downloads: 9800,
      icon: BookOpen,
      url: "https://www.indiacode.nic.in/bitstream/123456789/11087/1/the_code_of_civil_procedure%2C_1908.pdf"
    },
    {
      title: "Supreme Court Rules",
      description: "Latest rules and procedures for Supreme Court proceedings",
      category: "rules",
      type: "PDF",
      size: "1.5 MB",
      downloads: 8750,
      icon: FileText,
      url: "https://cdnbbsr.s3waas.gov.in/s3ec0490f1f4972d133619a60c30f3559e/uploads/2024/01/2024011691-1.pdf"
    },
    {
      title: "High Court Rules",
      description: "Standardized rules for High Court procedures across states",
      category: "rules",
      type: "PDF",
      size: "2.1 MB",
      downloads: 7200,
      icon: FileText,
      url: "https://www.allahabadhighcourt.in/rules/hcrulespartIchItoVIII.pdf"
    },
    {
      title: "Bail Application Format",
      description: "Standard format for bail applications with guidelines",
      category: "forms",
      type: "DOC",
      size: "150 KB",
      downloads: 25600,
      icon: FileText,
      url: "http://206.189.129.190/amaadhikar/pdf/Bail-Application-1.pdf"
    },
    {
      title: "Petition Format for Writ",
      description: "Template for filing writ petitions in High Courts",
      category: "forms",
      type: "DOC",
      size: "200 KB",
      downloads: 18900,
      icon: FileText,
      url: "https://cdnbbsr.s3waas.gov.in/s3ec0490f1f4972d133619a60c30f3559e/uploads/2024/01/2024011726.pdf"
    },
    {
      title: "How to File a Case",
      description: "Step-by-step video guide for filing cases in court",
      category: "videos",
      type: "Video",
      duration: "15 mins",
      views: 45000,
      icon: Video,
      url: "https://www.youtube.com/watch?v=Y8RG9a_vXXA"
    },
    {
      title: "Court Procedures Explained",
      description: "Comprehensive guide to court procedures and etiquette",
      category: "procedures",
      type: "PDF",
      size: "1.8 MB",
      downloads: 12500,
      icon: BookOpen,
      url:  "https://cdnbbsr.s3waas.gov.in/s3ec0490f1f4972d133619a60c30f3559e/documents/misc/practice.pdf_0.pdf"
    },
    {
      title: "Legal Terminology Dictionary",
      description: "Complete dictionary of legal terms and their meanings",
      category: "procedures",
      type: "PDF",
      size: "3.5 MB",
      downloads: 8900,
      icon: BookOpen,
      url: "https://mjc.olemiss.edu/wp-content/uploads/sites/134/2020/01/Handbook-of-Legal-Terminology-2020.pdf"
    }
  ];

  const legalDatabases = [
    {
      name: "Supreme Court Judgments",
      description: "Search and access Supreme Court judgments from 1950 onwards",
      url: "https://www.sci.gov.in/judgements-case-no/",
      icon: Scale
    },
    {
      name: "High Court Judgments",
      description: "State High Court judgments and orders database",
      url: "https://indiankanoon.org/",
      icon: Gavel
    },
    {
      name: "Legislative Database",
      description: "Central and state legislation, acts, and ordinances",
      url: "https://legislative.gov.in/",
      icon: BookOpen
    },
    {
      name: "Law Commission Reports",
      description: "Reports and recommendations by the Law Commission of India",
      url: "https://lawcommissionofindia.nic.in/",
      icon: FileText
    }
  ];

  const quickLinks = [
    { title: "Constitution of India", url: "https://lddashboard.legislative.gov.in/sites/default/files/coi/COI_2024.pdf ", type: "PDF" },
    { title: "Evidence Act", url: "https://www.indiacode.nic.in/bitstream/123456789/15351/1/iea_1872.pdf", type: "PDF" },
    { title: "Contract Act", url: "https://www.indiacode.nic.in/bitstream/123456789/2187/2/A187209.pdf", type: "PDF" },
    { title: "Companies Act", url: "https://www.indiacode.nic.in/bitstream/123456789/2114/5/A2013-18.pdf", type: "PDF" },
    { title: "Labour Laws", url: "https://ncib.in/pdf/ncib_pdf/Labour%20Act.pdf", type: "PDF" },
    { title: "Family Laws", url: "https://highcourtchd.gov.in/hclscc/subpages/pdf_files/4.pdf", type: "PDF" },
    { title: "Property Laws", url: "https://www.indiacode.nic.in/bitstream/123456789/2338/1/A1882-04.pdf", type: "PDF" },
    { title: "Cyber Laws", url: "https://www.ncib.in/pdf/cyber-law.pdf", type: "PDF" }
  ];

  const filteredResources = resources.filter(resource => {
    const matchesCategory = selectedCategory === "all" || resource.category === selectedCategory;
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
              <span className="text-sm font-medium">📚 Legal Knowledge Hub</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-8 animate-fade-in-up delay-200 tracking-tight">
              <span className="block">Legal</span>
              <span className="block text-gradient-hero animate-gradient">Resources</span>
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/90 max-w-4xl mx-auto leading-relaxed animate-fade-in-up delay-300">
              Comprehensive collection of legal documents, forms, procedures, and 
              <span className="font-semibold text-accent-light">educational materials</span>
            </p>
            
            {/* Enhanced CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12 animate-fade-in-up delay-500">
              <button className="btn-hero animate-glow"
               onClick={() => {
               filterRef.current?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                🔍 Search Resources
              </button>
              <button className="btn-secondary bg-white/10 border-white/20 text-white hover:bg-white hover:text-primary"
               onClick={() => {
               filterRef.current?.scrollIntoView({ behavior: "smooth" });
                }}
            >
                📁 Browse Categories
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-12 bg-secondary" ref={filterRef} >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="card-elegant">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Search Bar */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search laws, forms, procedures..."
                    className="input-professional pl-10"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap gap-2" style={{position:"relative",zIndex: 10}}>
                {categories.map((category) => (
               <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      selectedCategory === category.id
                         ? "bg-primary text-primary-foreground"
                         : "bg-background text-foreground hover:bg-primary hover:text-primary-foreground"
                }`}
                  >
                  {category.label} 
                </button>

                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredResources.map((resource, index) => (
              <div key={index} className="card-service group">
                <div className="flex items-center justify-between mb-4">
                  <resource.icon className="h-8 w-8 text-primary" />
                  <span className="text-xs font-medium text-muted-foreground bg-secondary px-2 py-1 rounded">
                    {resource.type}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-foreground mb-2">{resource.title}</h3>
                <p className="text-muted-foreground mb-4 text-sm leading-relaxed">{resource.description}</p>

                <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                  <span>{resource.type === "Video" ? `${resource.duration}` : `Size: ${resource.size}`}</span>
                  <span>{resource.type === "Video" ? `${resource.views?.toLocaleString()} views` : `${resource.downloads?.toLocaleString()} downloads`}</span>
                </div>

                <button className="btn-hero w-full group"
                onClick={() => window.open(resource.url, "_blank", "noopener,noreferrer")}>
                  <Download className="mr-2 h-4 w-4 group-hover:translate-y-1 transition-transform" />
                  {resource.type === "Video" ? "Watch Now" : "Download"}
                </button>
              </div>
            ))}
          </div>

          {filteredResources.length === 0 && (
            <div className="text-center py-12">
              <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No resources found</h3>
              <p className="text-muted-foreground">Try adjusting your search terms or category filter</p>
            </div>
          )}
        </div>
      </section>

      {/* Legal Databases */}
      <section className="bg-secondary py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Legal Databases</h2>
            <p className="text-lg text-muted-foreground">
              Access comprehensive legal databases and judgment repositories
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {legalDatabases.map((database, index) => (
              <div key={index} className="card-elegant text-center group hover:scale-105">
                <database.icon className="h-12 w-12 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-lg font-semibold text-foreground mb-2">{database.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{database.description}</p>
               {database.url ? (
        <button
          className="btn-hero inline-flex items-center justify-center w-full mt-2"
          onClick={() => window.open(database.url, "_blank", "noopener,noreferrer")}
        >
          Access Database
          <ExternalLink className="ml-1 h-4 w-4" />
        </button>
      ) : (
        <span className="inline-flex items-center text-muted-foreground font-medium cursor-not-allowed">
          Database Unavailable
        </span>
      )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Quick Access</h2>
            <p className="text-lg text-muted-foreground">
              Frequently accessed legal documents and resources
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {quickLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                className="card-elegant text-center group hover:scale-105 transition-all duration-200"
              >
                <FileText className="h-8 w-8 text-primary mx-auto mb-2 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-sm font-medium text-foreground mb-1">{link.title}</h3>
                <span className="text-xs text-muted-foreground">{link.type}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Help Section */}
      <section className="bg-gradient-to-r from-primary to-primary-light text-primary-foreground py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Need Help Finding Resources?</h2>
          <p className="text-xl text-primary-foreground/90 mb-8">
            Our legal research team can help you find specific documents or resources
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-accent">
              Request Research Assistance
            </button>
            <button className="btn-secondary bg-white/10 border-white/20 text-white hover:bg-white hover:text-primary"
              onClick={() => window.open("/contact", "_blank", "noopener,noreferrer")} >
              Contact Library
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Resources;