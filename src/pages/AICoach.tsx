import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Bot, User, Sparkles, Lightbulb, FileText, Pencil } from 'lucide-react';
import Card, { CardContent, CardHeader } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Sidebar from '../components/Sidebar';
import { chatMessages as initialChatMessages } from '../data/mockData';
import { ChatMessage } from '../types';
import { generateGeminiResponse } from '../services/geminiService';

const AICoach: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(initialChatMessages);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const handleSendMessage = async () => {
    if (input.trim() === '') return;
    
    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      message: input,
      timestamp: new Date().toISOString()
    };
    
    setMessages([...messages, userMessage]);
    setInput('');
    setIsTyping(true);
    
    try {
      // Get response from Gemini API
      const response = await generateGeminiResponse(input);
      
      const aiMessage: ChatMessage = {
        id: Date.now().toString(),
        sender: 'ai',
        message: response,
        timestamp: new Date().toISOString()
      };
      
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      
      const errorMessage: ChatMessage = {
        id: Date.now().toString(),
        sender: 'ai',
        message: "I'm sorry, I encountered an error while processing your request. Please try again later.",
        timestamp: new Date().toISOString()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex">
      <Sidebar />
         <div className="lg:ml-[240px] p-4 md:p-8">
                <motion.div 
                  className="mb-8"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h1 className="text-3xl font-display font-bold primary-gradient-text">
                  AI Scholarship Coach                  </h1>
                  <p className="text-gray-600 mt-2">
                  Get personalized guidance for your scholarship journey                  </p>
                </motion.div>
                
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Chat Area */}
          <div className="lg:col-span-3">
            <Card className="h-[calc(100vh-220px)] flex flex-col">
              <CardHeader className="border-b">
                <div className="flex items-center">
                  <div className="bg-primary-100 p-2 rounded-lg mr-3">
                    <Bot className="text-primary-600" size={24} />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">ScholarAI Assistant</h2>
                    <p className="text-sm text-gray-500">Powered by Google Gemini</p>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="flex-1 overflow-y-auto p-4">
                <div className="space-y-4">
                  {messages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`flex max-w-[80%] ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                        <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${
                          msg.sender === 'user' 
                            ? 'bg-primary-100 text-primary-600 ml-2' 
                            : 'bg-gray-100 text-gray-600 mr-2'
                        }`}>
                          {msg.sender === 'user' ? <User size={16} /> : <Bot size={16} />}
                        </div>
                        
                        <div className={`p-3 rounded-lg ${
                          msg.sender === 'user'
                            ? 'bg-primary-600 text-white'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          <p className="whitespace-pre-wrap">{msg.message}</p>
                          <p className={`text-xs mt-1 ${
                            msg.sender === 'user' ? 'text-primary-100' : 'text-gray-500'
                          }`}>
                            {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="flex">
                        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center mr-2">
                          <Bot size={16} />
                        </div>
                        <div className="p-3 rounded-lg bg-gray-100">
                          <div className="flex space-x-1">
                            <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                            <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                            <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>
              </CardContent>
              
              <div className="p-4 border-t">
                <div className="flex space-x-2">
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Ask me anything about scholarships..."
                    className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none"
                    rows={2}
                  />
                  <Button 
                    onClick={handleSendMessage}
                    disabled={input.trim() === '' || isTyping}
                    className="self-end"
                  >
                    <Send size={18} />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
          
          {/* Suggestions Panel */}
          <div className="lg:col-span-1">
            <Card className="h-[calc(100vh-220px)] overflow-y-auto">
              <CardHeader>
                <h2 className="text-lg font-semibold">Suggested Actions</h2>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <SuggestionButton 
                    icon={<Sparkles size={18} />}
                    text="Generate scholarship recommendations"
                    onClick={() => setInput("Can you recommend scholarships that match my profile? I'm a computer science major with a 3.8 GPA and leadership experience.")}
                  />
                  
                  <SuggestionButton 
                    icon={<FileText size={18} />}
                    text="Help with application essays"
                    onClick={() => setInput("I need help writing a compelling scholarship essay about my leadership experience. Can you provide an outline?")}
                  />
                  
                  <SuggestionButton 
                    icon={<Lightbulb size={18} />}
                    text="Interview preparation tips"
                    onClick={() => setInput("What are some tips for scholarship interviews? I have one coming up next week.")}
                  />
                  
                  <SuggestionButton 
                    icon={<Pencil size={18} />}
                    text="Review my application"
                    onClick={() => setInput("Can you help me review my scholarship application? I want to make sure I'm presenting myself in the best light.")}
                  />
                </div>
                
                <div className="mt-8 p-4 bg-primary-50 rounded-lg">
                  <h3 className="font-medium text-primary-800 mb-2">Pro Tip</h3>
                  <p className="text-sm text-primary-700">
                    Ask the AI to help you craft personalized responses for scholarship applications based on your unique experiences and strengths.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

interface SuggestionButtonProps {
  icon: React.ReactNode;
  text: string;
  onClick: () => void;
}

const SuggestionButton: React.FC<SuggestionButtonProps> = ({ icon, text, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors text-left"
    >
      <div className="mr-3 text-primary-600">{icon}</div>
      <span>{text}</span>
    </button>
  );
};

export default AICoach;