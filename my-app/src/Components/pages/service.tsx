
import Link from "next/link";
import { 
  MessageCircle, 
  Search, 
  FileText, 
  Gavel, 
  Users, 
  Clock,
  Shield,
  Smartphone,
  Globe,
  FileCheck,
  Headphones,
  BookOpen
} from "lucide-react";

const services = [
  {
    icon: MessageCircle,
    title: "AI Legal Assistant",
    description: "Get instant answers to your legal questions with our advanced AI chatbot trained on Indian legal system.",
    features: ["24/7 Availability", "Multi-language Support", "Legal Document Help"],
    color: "text-blue-600",
    link: "/"
  },
  {
    icon: Search,
    title: "Case Tracking",
    description: "Track your court cases in real-time across all Indian courts with detailed status updates.",
    features: ["Real-time Updates", "SMS Notifications", "Court Calendar"],
    color: "text-green-600",
    link: "/casetrack"
  },
  {
    icon: FileText,
    title: "eFiling Services",
    description: "File your legal documents electronically with our secure and efficient eFiling system.",
    features: ["Secure Upload", "Digital Signatures", "Status Tracking"],
    color: "text-purple-600",
    link: "/efile"
  },
  {
    icon: Users,
    title: "Legal Aid Access",
    description: "Connect with legal aid services and find qualified lawyers for your legal needs.",
    features: ["Lawyer Directory", "Free Consultations", "Legal Aid Programs"],
    color: "text-orange-600",
    link: "/legalaid"
  },
  {
    icon: Gavel,
    title: "Court Information",
    description: "Access comprehensive information about courts, judges, and judicial procedures.",
    features: ["Court Directories", "Judge Information", "Procedure Guides"],
    color: "text-red-600",
    link: "/contact"
  },
  {
    icon: Smartphone,
    title: "Mobile App",
    description: "Access all services on-the-go with our feature-rich mobile application.",
    features: ["Cross-platform", "Offline Access", "Push Notifications"],
    color: "text-indigo-600",
    link: "/"
  }
];

const additionalFeatures = [
  { icon: Clock, title: "Fast Track Courts", description: "Information about expedited court processes" },
  { icon: Shield, title: "Data Security", description: "Bank-level encryption for all your data" },
  { icon: Globe, title: "Multi-language", description: "Available in 12 Indian languages" },
  { icon: FileCheck, title: "Document Verification", description: "Verify authenticity of legal documents" },
  { icon: Headphones, title: "Help Desk", description: "Dedicated support for technical assistance" },
  { icon: BookOpen, title: "Legal Resources", description: "Comprehensive legal knowledge base" }
];

const ServicesSection = () => {
  return (
    <section className="relative py-20 bg-gradient-to-b from-background via-secondary/30 to-background overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-accent/30 rounded-full blur-3xl animate-bounce-slow"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/10 rounded-full blur-2xl animate-float"></div>
      </div>
      
      {/* Geometric Pattern Overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Cpath d='m20 20 20 20-20-20z'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Enhanced Section Header */}
        <div className="text-center space-y-6 mb-20 animate-fade-in-up">
          <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full mb-4">
            <span className="text-sm font-medium text-primary">🚀 Digital Innovation</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-gradient-primary tracking-tight">
            Comprehensive
            <span className="block text-gradient-hero animate-gradient">Legal Services</span>
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Empowering citizens with digital access to justice through 
            <span className="font-semibold text-primary">innovative technology</span> and user-friendly legal services.
          </p>
        </div>

        {/* Enhanced Main Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {services.map((service, index) => {
            const gradients = [
              'from-blue-500 to-blue-600',
              'from-green-500 to-green-600', 
              'from-purple-500 to-purple-600',
              'from-orange-500 to-orange-600',
              'from-red-500 to-red-600',
              'from-indigo-500 to-indigo-600'
            ];
            const emojis = ['🤖', '🔍', '📄', '⚖️', '🏛️', '📱'];
            
            return (
              <div 
                key={service.title}
                className="card-elegant group hover:scale-105 transform transition-all duration-300 animate-fade-in-up relative overflow-hidden"
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
                
                <div className="relative z-10 text-center">
                  <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  
                  {/* Features List */}
                  <ul className="space-y-2 mb-6 text-left">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  {/* Enhanced Learn More Button */}
                  <Link href={service.link}>
                    <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary to-primary-light text-primary-foreground font-medium rounded-xl hover:shadow-lg transform hover:scale-105 active:scale-95 transition-all duration-200 group/btn w-full justify-center relative z-20">
                      <span className="mr-2">Learn More</span>
                      <span className="transform group-hover/btn:translate-x-1 transition-transform duration-200">→</span>
                      
                      {/* Button Glow Effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary-light rounded-xl opacity-0 group-hover/btn:opacity-30 blur-xl transition-opacity duration-300"></div>
                    </div>
                  </Link>
                </div>
                
                {/* Corner Decoration */}
                <div className="absolute top-4 right-4 w-2 h-2 bg-accent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            );
          })}
        </div>

        {/* Enhanced Additional Features */}
        <div className="relative bg-gradient-to-br from-primary/10 via-primary/5 to-accent/10 rounded-3xl p-10 backdrop-blur-sm border border-primary/10 animate-fade-in-up" style={{ animationDelay: '800ms' }}>
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 bg-primary/20 rounded-full mb-4">
              <span className="text-sm font-medium text-primary">✨ Enhanced Features</span>
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-gradient-primary mb-3">
              Additional Features & Support
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover more ways our platform enhances your legal experience
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {additionalFeatures.map((feature, index) => {
              const featureEmojis = ['⚡', '🛡️', '🌐', '✅', '🎧', '📚'];
              return (
                <div 
                  key={feature.title}
                  className="group text-center space-y-4 p-4 rounded-2xl hover:bg-white/50 dark:hover:bg-white/5 transition-all duration-300 hover:scale-105 animate-fade-in-up relative overflow-hidden"
                  style={{ animationDelay: `${900 + (index * 100)}ms` }}
                >
                  {/* Hover Background Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                  
                  {/* Enhanced Icon */}
                  <div className="relative">
                    <div className="mx-auto w-14 h-14 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300 shadow-lg">
                      <span className="text-2xl">{featureEmojis[index]}</span>
                    </div>
                    
                    {/* Animated Ring */}
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-14 h-14 border-2 border-primary/10 rounded-2xl group-hover:scale-110 group-hover:border-primary/30 transition-all duration-300"></div>
                  </div>
                  
                  <div className="relative z-10">
                    <h4 className="font-bold text-sm text-foreground group-hover:text-primary transition-colors">
                      {feature.title}
                    </h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                  
                  {/* Corner Decoration */}
                  <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-accent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Enhanced CTA Section */}
        <div className="text-center mt-20 animate-fade-in-up" style={{ animationDelay: '1200ms' }}>
          <div className="relative bg-gradient-to-br from-primary via-primary-light to-accent rounded-3xl p-12 text-primary-foreground overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-4 right-4 w-32 h-32 bg-white/20 rounded-full blur-2xl animate-pulse-slow"></div>
              <div className="absolute bottom-4 left-4 w-24 h-24 bg-accent/30 rounded-full blur-xl animate-float"></div>
            </div>
            
            {/* Geometric Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Ccircle cx='15' cy='15' r='1'/%3E%3C/g%3E%3C/svg%3E")`,
                backgroundSize: '30px 30px'
              }}></div>
            </div>
            
            <div className="relative z-10">
              {/* Badge */}
              <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-6">
                <span className="text-sm font-medium">🎆 Join the Revolution</span>
              </div>
              
              <h3 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
                Ready to Access 
                <span className="block text-accent-light">Justice?</span>
              </h3>
              
              <p className="text-xl md:text-2xl mb-10 opacity-90 max-w-3xl mx-auto leading-relaxed">
                Join thousands of citizens who have simplified their legal journey with 
                <span className="font-semibold text-accent-light">Nyaysetu</span>
              </p>
              
              {/* Enhanced CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <button className="group relative px-8 py-4 bg-white text-primary font-semibold rounded-2xl hover:bg-white/90 transform hover:scale-105 active:scale-95 transition-all duration-200 shadow-xl">
                  <span className="relative z-10 flex items-center justify-center">
                    <span className="mr-2">🚀 Get Started Today</span>
                  </span>
                  <div className="absolute inset-0 bg-white rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300"></div>
                </button>
                
                <button className="group relative px-8 py-4 bg-white/10 border-2 border-white/30 text-white font-semibold rounded-2xl hover:bg-white hover:text-primary transform hover:scale-105 active:scale-95 transition-all duration-200 backdrop-blur-sm">
                  <span className="relative z-10 flex items-center justify-center">
                    <span className="mr-2">🎥 Watch Demo</span>
                  </span>
                  <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-300"></div>
                </button>
              </div>
              
              {/* Stats Preview */}
              <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent-light">50K+</div>
                  <div className="text-sm opacity-80">Happy Users</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent-light">99.9%</div>
                  <div className="text-sm opacity-80">Uptime</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent-light">24/7</div>
                  <div className="text-sm opacity-80">Support</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;