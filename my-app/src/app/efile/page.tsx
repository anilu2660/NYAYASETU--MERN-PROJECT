"use client";
import { useState } from "react";
import { Upload, FileText, CreditCard, CheckCircle, Clock, Shield, Loader } from "lucide-react";
import FileUpload from "../../Components/FileUpload";
import RazorpayPayment from "../../Components/RazorpayPayment";
import { createOrder, processPaymentSuccess, PaymentResponse } from "../../lib/paymentService";

const EFiling = () => {
  const [filingType, setFilingType] = useState("");
  const [courtLevel, setCourtLevel] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [showPayment, setShowPayment] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentOrder, setPaymentOrder] = useState<any>(null);
  const [customerDetails, setCustomerDetails] = useState({
    name: "",
    email: "",
    phone: ""
  });

  const courtLevels = [
    { value: "supreme", label: "Supreme Court of India" },
    { value: "high", label: "High Court" },
    { value: "district", label: "District Court" },
    { value: "subordinate", label: "Subordinate Court" }
  ];

  const filingTypes = [
    { value: "petition", label: "Writ Petition" },
    { value: "appeal", label: "Appeal" },
    { value: "application", label: "Application" },
    { value: "complaint", label: "Complaint" },
    { value: "bail", label: "Bail Application" },
    { value: "revision", label: "Revision Petition" }
  ];

  const requiredDocuments = [
    "Main petition/application document",
    "Supporting affidavits",
    "Relevant case citations",
    "Previous court orders (if any)",
    "Identity proof of petitioner",
    "Advocate enrollment certificate"
  ];

  const fees = {
    supreme: { petition: 5000, appeal: 3000, application: 1000 },
    high: { petition: 2000, appeal: 1500, application: 500 },
    district: { petition: 500, appeal: 300, application: 200 },
    subordinate: { petition: 200, appeal: 150, application: 100 }
  };


  const getEstimatedFee = () => {
    if (courtLevel && filingType && fees[courtLevel as keyof typeof fees]) {
      const courtFees = fees[courtLevel as keyof typeof fees];
      return courtFees[filingType as keyof typeof courtFees] || 0;
    }
    return 0;
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!courtLevel || !filingType) {
      alert('Please select court level and filing type');
      return;
    }
    
    if (uploadedFiles.length === 0) {
      alert('Please upload at least one document');
      return;
    }
    
    // Get form data
    const formData = new FormData(e.target as HTMLFormElement);
    const petitionerName = formData.get('petitionerName') as string;
    const respondentName = formData.get('respondentName') as string;
    const caseSubject = formData.get('caseSubject') as string;
    const advocateName = formData.get('advocateName') as string;
    const enrollmentNumber = formData.get('enrollmentNumber') as string;
    
    if (!petitionerName || !respondentName || !caseSubject || !advocateName || !enrollmentNumber) {
      alert('Please fill all required fields');
      return;
    }
    
    try {
      setIsProcessingPayment(true);
      
      // Create payment order
      const totalAmount = getEstimatedFee() + 50; // Filing fee + service charge
      const order = await createOrder(totalAmount);
      
      setPaymentOrder(order);
      setCustomerDetails({
        name: petitionerName,
        email: formData.get('email') as string || 'user@example.com',
        phone: formData.get('phone') as string || '9999999999'
      });
      
      setShowPayment(true);
      
    } catch (error) {
      console.error('Error creating payment order:', error);
      alert('Error initiating payment. Please try again.');
    } finally {
      setIsProcessingPayment(false);
    }
  };

  const handlePaymentSuccess = async (response: PaymentResponse) => {
    try {
      setIsProcessingPayment(true);
      
      // Process the successful payment
      const result = await processPaymentSuccess(response, {
        courtLevel,
        filingType,
        uploadedFiles,
        customerDetails,
        paymentOrder
      });
      
      if (result.success) {
        alert(`Payment successful! Your filing number is: ${result.filingNumber}`);
        
        // Reset form
        setCourtLevel('');
        setFilingType('');
        setUploadedFiles([]);
        setShowPayment(false);
        setPaymentOrder(null);
        setCustomerDetails({ name: '', email: '', phone: '' });
        
        // Reset form fields
        const form = document.querySelector('form') as HTMLFormElement;
        if (form) form.reset();
      }
      
    } catch (error) {
      console.error('Payment processing error:', error);
      alert('Error processing payment. Please contact support.');
    } finally {
      setIsProcessingPayment(false);
    }
  };

  const handlePaymentFailure = (error: any) => {
    console.error('Payment failed:', error);
    alert('Payment failed. Please try again.');
    setShowPayment(false);
    setPaymentOrder(null);
  };

  const handlePaymentClose = () => {
    setShowPayment(false);
    setPaymentOrder(null);
  };

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
              <span className="text-sm font-medium">📄 Digital Filing System</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-8 animate-fade-in-up delay-200 tracking-tight">
              <span className="block">eFiling</span>
              <span className="block text-gradient-hero animate-gradient">Portal</span>
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/90 max-w-4xl mx-auto leading-relaxed animate-fade-in-up delay-300">
              File legal documents electronically across all court levels with our 
              <span className="font-semibold text-accent-light">secure digital platform</span>
            </p>
            
            {/* Enhanced CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12 animate-fade-in-up delay-500">
              <button className="btn-hero animate-glow">
                🚀 Start New Filing
              </button>
              <button className="btn-secondary bg-white/10 border-white/20 text-white hover:bg-white hover:text-primary">
                🔍 Track Filing Status
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Security Notice */}
      <section className="py-8 bg-warning text-warning-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center">
            <Shield className="h-6 w-6 mr-3" />
            <span className="font-semibold">Secure Platform: All documents are encrypted and stored securely as per government standards</span>
          </div>
        </div>
      </section>

      {/* Filing Form */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="card-elegant">
            <h2 className="text-2xl font-bold text-foreground mb-6">New eFiling</h2>
            
            <form className="space-y-6" onSubmit={handleFormSubmit}>
              {/* Court Level Selection */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Select Court Level *
                </label>
                <select 
                  value={courtLevel}
                  onChange={(e) => setCourtLevel(e.target.value)}
                  className="input-professional"
                >
                  <option value="">Choose Court Level</option>
                  {courtLevels.map((court) => (
                    <option key={court.value} value={court.value}>{court.label}</option>
                  ))}
                </select>
              </div>

              {/* Filing Type Selection */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Select Filing Type *
                </label>
                <select 
                  value={filingType}
                  onChange={(e) => setFilingType(e.target.value)}
                  className="input-professional"
                >
                  <option value="">Choose Filing Type</option>
                  {filingTypes.map((type) => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
              </div>

              {/* Case Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Petitioner/Appellant Name *
                  </label>
                  <input 
                    type="text" 
                    name="petitionerName"
                    className="input-professional" 
                    placeholder="Enter full name" 
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Respondent Name *
                  </label>
                  <input 
                    type="text" 
                    name="respondentName"
                    className="input-professional" 
                    placeholder="Enter respondent name" 
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Case Subject/Title *
                </label>
                <input 
                  type="text" 
                  name="caseSubject"
                  className="input-professional" 
                  placeholder="Brief description of the case" 
                  required
                />
              </div>

              {/* Contact Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Email Address
                  </label>
                  <input 
                    type="email" 
                    name="email"
                    className="input-professional" 
                    placeholder="Enter your email address" 
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Phone Number
                  </label>
                  <input 
                    type="tel" 
                    name="phone"
                    className="input-professional" 
                    placeholder="Enter your phone number" 
                  />
                </div>
              </div>

              {/* Advocate Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Advocate Name *
                  </label>
                  <input 
                    type="text" 
                    name="advocateName"
                    className="input-professional" 
                    placeholder="Advocate name" 
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Enrollment Number *
                  </label>
                  <input 
                    type="text" 
                    name="enrollmentNumber"
                    className="input-professional" 
                    placeholder="Bar Council enrollment number" 
                    required
                  />
                </div>
              </div>

              {/* Document Upload */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Upload Documents *
                </label>
                <FileUpload
                  onFilesSelected={(files) => {
                    console.log('Files selected for eFiling:', files);
                  }}
                  onFileUpload={(uploadedFiles) => {
                    console.log('Files uploaded for eFiling:', uploadedFiles);
                    // Update the uploadedFiles state with file names
                    const fileNames = uploadedFiles.map(file => file.name);
                    setUploadedFiles(fileNames);
                  }}
                  maxFiles={20}
                  maxSize={10}
                  acceptedTypes={['.pdf', '.doc', '.docx', '.jpg', '.jpeg', '.png']}
                  className="mb-4"
                />
              </div>

              {/* Fee Calculation */}
              {courtLevel && filingType && (
                <div className="bg-secondary p-4 rounded-lg">
                  <h3 className="font-semibold text-foreground mb-2">Fee Calculation</h3>
                  <div className="flex justify-between items-center">
                    <span>Filing Fee:</span>
                    <span className="font-semibold">₹{getEstimatedFee().toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Service Charge:</span>
                    <span className="font-semibold">₹50</span>
                  </div>
                  <div className="border-t border-border mt-2 pt-2">
                    <div className="flex justify-between items-center font-bold">
                      <span>Total Amount:</span>
                      <span>₹{(getEstimatedFee() + 50).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <div className="flex gap-4">
                <button type="button" className="btn-secondary flex-1">
                  Save as Draft
                </button>
                <button 
                  type="submit" 
                  className="btn-hero flex-1"
                  disabled={isProcessingPayment}
                >
                  {isProcessingPayment ? (
                    <>
                      <Loader className="mr-2 h-5 w-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <CreditCard className="mr-2 h-5 w-5" />
                      Proceed to Payment
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Required Documents */}
      <section className="bg-secondary py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Required Documents Checklist</h2>
            <p className="text-lg text-muted-foreground">
              Ensure you have all necessary documents before starting the eFiling process
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {requiredDocuments.map((doc, index) => (
              <div key={index} className="card-elegant">
                <div className="flex items-start">
                  <FileText className="h-5 w-5 text-primary mr-3 mt-1" />
                  <div>
                    <p className="font-medium text-foreground">{doc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">eFiling Process</h2>
            <p className="text-lg text-muted-foreground">
              Simple step-by-step process to file your documents electronically
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-primary to-primary-light rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">1. Prepare Documents</h3>
              <p className="text-muted-foreground">Gather and digitize all required documents in PDF format</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-primary to-primary-light rounded-full flex items-center justify-center mx-auto mb-4">
                <Upload className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">2. Upload & Fill</h3>
              <p className="text-muted-foreground">Upload documents and fill the online application form</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-primary to-primary-light rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCard className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">3. Pay Fees</h3>
              <p className="text-muted-foreground">Make secure online payment for filing and service charges</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-primary to-primary-light rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">4. Track Status</h3>
              <p className="text-muted-foreground">Receive confirmation and track your filing status online</p>
            </div>
          </div>
        </div>
      </section>

      {/* Status Check */}
      <section className="bg-gradient-to-r from-primary to-primary-light text-primary-foreground py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Check Your Filing Status</h2>
          <p className="text-xl text-primary-foreground/90 mb-8">
            Already filed a document? Track its status using your filing number
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input 
              type="text" 
              placeholder="Enter Filing Number"
              className="flex-1 px-4 py-3 rounded-lg text-foreground"
            />
            <button className="btn-accent">
              <Clock className="mr-2 h-5 w-5" />
              Track Status
            </button>
          </div>
                 </div>
       </section>

       {/* Razorpay Payment Component */}
       {showPayment && paymentOrder && (
         <RazorpayPayment
           amount={paymentOrder.amount / 100} // Convert back from paise
           currency="INR"
           orderId={paymentOrder.id}
           customerName={customerDetails.name}
           customerEmail={customerDetails.email}
           customerPhone={customerDetails.phone}
           onSuccess={handlePaymentSuccess}
           onFailure={handlePaymentFailure}
           onClose={handlePaymentClose}
         />
       )}
     </div>
   );
 };

export default EFiling;