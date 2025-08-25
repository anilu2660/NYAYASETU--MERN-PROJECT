import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // If no API key is configured, return a helpful fallback response
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({
        response: `Thank you for your legal question: "${message}"\n\nI'm currently in demo mode as the Gemini API key needs to be configured. Here's some general legal guidance:\n\n• For specific legal advice, please consult with a qualified lawyer\n• You can contact the Bar Council of India for lawyer referrals\n• Legal aid services are available for those who qualify\n• Always verify legal information from authoritative sources\n\nTo enable full AI responses, please configure your Gemini API key in the environment variables.`,
        timestamp: new Date().toISOString()
      });
    }

    // Get the generative model
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    // Create a legal assistant prompt
    const legalPrompt = `You are a professional Legal Assistant AI specializing in Indian law and legal matters. You provide helpful, accurate, and ethical legal information while being clear that you cannot replace professional legal advice.

Key guidelines:
- Provide informative responses about legal concepts, procedures, and rights
- Always remind users to consult qualified lawyers for specific legal advice
- Focus on Indian legal system, laws, and procedures
- Be professional, clear, and helpful
- If unsure about specific legal details, recommend consulting legal professionals
- Never provide advice that could be construed as practicing law without a license

User question: ${message}

Please provide a helpful, informative response:`;

    // Generate response
    const result = await model.generateContent(legalPrompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({
      response: text,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Chatbot API error:', error);
    
    // Handle specific Gemini API errors
    if (error instanceof Error) {
      if (error.message.includes('API_KEY')) {
        return NextResponse.json({
          response: "I'm currently in demo mode. To enable full AI responses, please configure your Gemini API key. In the meantime, I recommend consulting with a qualified lawyer for specific legal advice.",
          timestamp: new Date().toISOString()
        });
      }
      if (error.message.includes('QUOTA_EXCEEDED') || error.message.includes('rate limit') || error.message.includes('resource_exhausted')) {
        return NextResponse.json({
          response: `Thank you for your question about legal matters. I'm currently experiencing high demand and rate limits on the free tier of the AI service.\n\nHere's some general guidance while the service recovers:\n\n• For urgent legal matters, please consult a qualified lawyer immediately\n• You can find lawyers through the Bar Council of India directory\n• Legal aid services are available for eligible individuals\n• Many law firms offer free initial consultations\n\nPlease try again in a few minutes, or consider upgrading to a premium AI service for priority access.`,
          timestamp: new Date().toISOString()
        });
      }
    }

    return NextResponse.json({
      response: `I apologize, but I'm experiencing technical difficulties right now. This often happens with free tier API services due to high demand.\n\nFor immediate legal assistance, I recommend:\n• Contacting a local lawyer\n• Calling legal helplines in your area\n• Visiting legal aid centers\n• Checking with your local bar association\n\nPlease try again in a few minutes when the service recovers.`,
      timestamp: new Date().toISOString()
    });
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Legal Assistant Chatbot API',
    status: 'active',
    version: '1.0.0'
  });
}
