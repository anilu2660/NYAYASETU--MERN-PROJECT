"use client";
import { useEffect } from 'react';

interface RazorpayPaymentProps {
  amount: number;
  currency?: string;
  orderId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  onSuccess: (response: any) => void;
  onFailure: (error: any) => void;
  onClose: () => void;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

const RazorpayPayment = ({
  amount,
  currency = 'INR',
  orderId,
  customerName,
  customerEmail,
  customerPhone,
  onSuccess,
  onFailure,
  onClose
}: RazorpayPaymentProps) => {
  useEffect(() => {
    // Load Razorpay script
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      initializePayment();
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const initializePayment = () => {
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_YOUR_TEST_KEY', // Replace with your actual key
      amount: amount * 100, // Razorpay expects amount in paise
      currency: currency,
      name: 'NyayaSetu Portal',
      description: `eFiling Payment - ${orderId}`,
      order_id: orderId,
      handler: function (response: any) {
        onSuccess(response);
      },
      prefill: {
        name: customerName,
        email: customerEmail,
        contact: customerPhone
      },
      notes: {
        address: 'NyayaSetu Portal - Government of India',
        filing_type: 'eFiling Payment'
      },
      theme: {
        color: '#2563eb'
      },
      modal: {
        ondismiss: function() {
          onClose();
        }
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return null; // This component doesn't render anything visible
};

export default RazorpayPayment;
