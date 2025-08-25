"use client";
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, MessageCircle, Loader, Copy, ThumbsUp, ThumbsDown } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  isTyping?: boolean;
}

const ChatComponent = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [chatStarted, setChatStarted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);
    setIsTyping(true);

    try {
      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: inputMessage }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();

      // Simulate typing effect
      setTimeout(() => {
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: data.response || "I apologize, but I'm having trouble processing your request right now. Please try again.",
          sender: 'bot',
          timestamp: new Date()
        };

        setMessages(prev => [...prev, botMessage]);
        setIsTyping(false);
      }, 1000);

    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I'm sorry, I'm experiencing technical difficulties. Please try again later.",
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
      setIsTyping(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const startChat = () => {
    setChatStarted(true);
    // Add welcome message when chat starts
    const welcomeMessage: Message = {
      id: '1',
      content: "Hello! I'm your Legal Assistant powered by AI. I can help you with legal questions, document analysis, case research, and legal advice. How can I assist you today?",
      sender: 'bot',
      timestamp: new Date()
    };
    setMessages([welcomeMessage]);
    // Focus input after starting
    setTimeout(() => {
      inputRef.current?.focus();
    }, 500);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 relative overflow-hidden">
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mix-blend-multiply filter blur-2xl opacity-25 animate-float animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-slow"></div>
        <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mix-blend-multiply filter blur-2xl opacity-15 animate-float animation-delay-4000"></div>
      </div>

      {/* Enhanced Header */}
      <div className="relative z-10 bg-white/5 backdrop-blur-xl border-b border-white/10 shadow-2xl">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative group">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 via-pink-500 to-indigo-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-purple-500/25 transition-all duration-300 group-hover:scale-105">
                  <Bot className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full border-3 border-white animate-pulse shadow-lg"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500 via-pink-500 to-indigo-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white flex items-center gap-3 mb-1">
                  Legal Assistant AI
                  <Sparkles className="w-6 h-6 text-yellow-400 animate-spin-slow" />
                </h1>
                <p className="text-sm text-gray-300 flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  Powered by Gemini AI • Always Online • Ultra-Fast Responses
                </p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-3 text-xs text-gray-400">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                <span>Secure</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>Private</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                <span>AI-Powered</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Chat Container */}
      <div className="relative z-10 max-w-6xl mx-6 h-[700px] flex flex-col bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl my-8">
        {!chatStarted ? (
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="text-center max-w-2xl">
              <div className="relative mb-8">
                <div className="w-24 h-24 bg-gradient-to-br from-purple-500 via-pink-500 to-indigo-500 rounded-3xl flex items-center justify-center mx-auto shadow-2xl animate-float">
                  <Bot className="w-12 h-12 text-white" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500 via-pink-500 to-indigo-500 rounded-3xl blur-xl opacity-30 animate-pulse-slow"></div>
              </div>
              
              <h2 className="text-4xl font-bold text-white mb-4 animate-fade-in-up">
                Welcome to Legal Assistant AI
              </h2>
              
              <p className="text-xl text-gray-300 mb-8 leading-relaxed animate-fade-in-up" style={{animationDelay: '0.2s'}}>
                Get instant legal guidance, document analysis, and case research powered by advanced AI technology. 
                Your personal legal expert is ready to help.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 hover:bg-white/15 transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-white font-semibold mb-2">Instant Answers</h3>
                  <p className="text-gray-400 text-sm">Get immediate responses to legal questions</p>
                </div>
                
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 hover:bg-white/15 transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-white font-semibold mb-2">AI-Powered</h3>
                  <p className="text-gray-400 text-sm">Advanced AI for accurate legal guidance</p>
                </div>
                
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 hover:bg-white/15 transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Bot className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-white font-semibold mb-2">24/7 Available</h3>
                  <p className="text-gray-400 text-sm">Always ready to assist you</p>
                </div>
              </div>
              
              <button
                onClick={startChat}
                className="group relative px-8 py-4 bg-gradient-to-br from-purple-600 via-pink-600 to-indigo-600 hover:from-purple-700 hover:via-pink-700 hover:to-indigo-700 text-white font-semibold rounded-3xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-purple-500/25 animate-fade-in-up overflow-hidden"
                style={{animationDelay: '0.6s'}}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-pink-600 to-indigo-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur"></div>
                <div className="relative z-10 flex items-center gap-3">
                  <MessageCircle className="w-6 h-6" />
                  <span className="text-lg">Start Chat with AI</span>
                  <Sparkles className="w-5 h-5 group-hover:animate-spin-slow" />
                </div>
              </button>
              
              <p className="text-xs text-gray-500 mt-4 animate-fade-in-up" style={{animationDelay: '0.8s'}}>
                🔒 Secure • 🔐 Private • ⚡ Ultra-Fast Responses
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-purple-500/50 scrollbar-track-transparent hover:scrollbar-thumb-purple-500/70 transition-colors">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in-up`}
                >
                  {message.sender === 'bot' && (
                    <div className="relative group">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-500 via-pink-500 to-indigo-500 rounded-xl flex items-center justify-center flex-shrink-0 mt-1 shadow-lg group-hover:shadow-purple-500/25 transition-all duration-300 group-hover:scale-110">
                        <Bot className="w-5 h-5 text-white" />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-500 via-pink-500 to-indigo-500 rounded-xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
                    </div>
                  )}
                  
                  <div className={`group max-w-[85%] ${message.sender === 'user' ? 'order-1' : ''}`}>
                    <div
                      className={`p-5 rounded-3xl relative transform transition-all duration-300 hover:scale-[1.02] ${
                        message.sender === 'user'
                          ? 'bg-gradient-to-br from-purple-600 via-pink-600 to-indigo-600 text-white ml-auto shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40'
                          : 'bg-white/10 backdrop-blur-xl text-white border border-white/20 shadow-lg shadow-black/10 hover:bg-white/15 hover:border-white/30'
                      }`}
                    >
                      <p className="text-base leading-relaxed whitespace-pre-wrap font-medium">{message.content}</p>
                      
                      {/* Enhanced Message Actions */}
                      <div className="flex items-center justify-between mt-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <span className="text-xs opacity-70 font-medium bg-black/20 px-2 py-1 rounded-full">{formatTime(message.timestamp)}</span>
                        <div className="flex gap-2">
                          <button
                            onClick={() => copyMessage(message.content)}
                            className="p-2 hover:bg-white/20 rounded-xl transition-all duration-200 hover:scale-110 active:scale-95"
                            title="Copy message"
                          >
                            <Copy className="w-4 h-4" />
                          </button>
                          {message.sender === 'bot' && (
                            <>
                              <button className="p-2 hover:bg-green-500/20 rounded-xl transition-all duration-200 hover:scale-110 active:scale-95" title="Good response">
                                <ThumbsUp className="w-4 h-4 hover:text-green-400" />
                              </button>
                              <button className="p-2 hover:bg-red-500/20 rounded-xl transition-all duration-200 hover:scale-110 active:scale-95" title="Poor response">
                                <ThumbsDown className="w-4 h-4 hover:text-red-400" />
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {message.sender === 'user' && (
                    <div className="relative group">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-500 rounded-xl flex items-center justify-center flex-shrink-0 mt-1 shadow-lg group-hover:shadow-blue-500/25 transition-all duration-300 group-hover:scale-110">
                        <User className="w-5 h-5 text-white" />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-500 rounded-xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
                    </div>
                  )}
                </div>
              ))}

              {/* Enhanced Typing Indicator */}
              {isTyping && (
                <div className="flex gap-3 justify-start animate-fade-in-up">
                  <div className="relative group">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 via-pink-500 to-indigo-500 rounded-xl flex items-center justify-center flex-shrink-0 mt-1 shadow-lg animate-pulse">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500 via-pink-500 to-indigo-500 rounded-xl blur opacity-30 animate-pulse"></div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-5 rounded-3xl shadow-lg">
                    <div className="flex gap-2 items-center">
                      <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-bounce"></div>
                      <div className="w-3 h-3 bg-gradient-to-r from-pink-400 to-indigo-400 rounded-full animate-bounce animation-delay-200"></div>
                      <div className="w-3 h-3 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full animate-bounce animation-delay-400"></div>
                      <span className="ml-2 text-sm text-gray-300 font-medium">AI is thinking...</span>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Enhanced Input Area */}
            <div className="p-6 bg-white/5 backdrop-blur-xl border-t border-white/10">
              <div className="flex gap-4 items-end">
                <div className="flex-1 relative group">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me anything about legal matters..."
                    className="w-full p-5 pr-14 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 focus:bg-white/15 transition-all duration-300 text-base font-medium group-hover:border-white/30"
                    disabled={isLoading}
                  />
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 transition-colors duration-300">
                    <MessageCircle className={`w-6 h-6 ${inputMessage.trim() ? 'text-purple-400' : 'text-gray-400'}`} />
                  </div>
                </div>
                
                <button
                  onClick={sendMessage}
                  disabled={!inputMessage.trim() || isLoading}
                  className="relative p-5 bg-gradient-to-br from-purple-600 via-pink-600 to-indigo-600 hover:from-purple-700 hover:via-pink-700 hover:to-indigo-700 disabled:from-gray-600 disabled:to-gray-700 text-white rounded-3xl transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:scale-100 disabled:cursor-not-allowed shadow-lg hover:shadow-purple-500/25 group overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-pink-600 to-indigo-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur"></div>
                  <div className="relative z-10">
                    {isLoading ? (
                      <Loader className="w-6 h-6 animate-spin" />
                    ) : (
                      <Send className="w-6 h-6" />
                    )}
                  </div>
                </button>
              </div>
              
              <div className="flex justify-center mt-4">
                <div className="flex items-center gap-2 text-xs text-gray-400 bg-black/20 px-3 py-2 rounded-full">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                  <p>AI can make mistakes. Verify important legal information.</p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translate(0px, 0px) scale(1) rotate(0deg); }
          25% { transform: translate(20px, -30px) scale(1.05) rotate(1deg); }
          50% { transform: translate(-15px, 20px) scale(0.95) rotate(-1deg); }
          75% { transform: translate(25px, 10px) scale(1.02) rotate(0.5deg); }
        }
        
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.05); }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        
        .animation-delay-400 {
          animation-delay: 0.4s;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .scrollbar-thin {
          scrollbar-width: thin;
        }
        
        .scrollbar-thumb-purple-500\/50 {
          scrollbar-color: rgba(168, 85, 247, 0.5) transparent;
        }
        
        .scrollbar-thumb-purple-500\/70:hover {
          scrollbar-color: rgba(168, 85, 247, 0.7) transparent;
        }
        
        /* Custom scrollbar for webkit browsers */
        .overflow-y-auto::-webkit-scrollbar {
          width: 6px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-track {
          background: transparent;
        }
        
        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: rgba(168, 85, 247, 0.5);
          border-radius: 3px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: rgba(168, 85, 247, 0.7);
        }
      `}</style>
    </section>
  );
};

export default ChatComponent;