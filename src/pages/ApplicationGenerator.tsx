import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, Send, Sparkles, Download, Copy, 
  CheckCircle, RefreshCw, Zap, Clipboard, 
  MessageSquare, PenTool, Award, BookOpen
} from 'lucide-react';
import { TypeAnimation } from 'react-type-animation';
import Sidebar from '../components/Sidebar';
import { generateEssayWithLlama, generateFeedbackWithLlama, enhanceEssayWithLlama } from '../services/llama';
import { downloadPDF } from '../utils/pdfGenerator';

const ApplicationGenerator: React.FC = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [scholarshipName, setScholarshipName] = useState('');
  const [essayPrompt, setEssayPrompt] = useState('');
  const [personalInfo, setPersonalInfo] = useState({
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    phone: '(555) 123-4567',
    address: '123 University Ave, College Town, CA 94321',
    education: 'Stanford University, Computer Science, 3.8 GPA',
    activities: 'Robotics Club President, Volunteer at Local Food Bank, Hackathon Winner',
  });
  const [generatingEssay, setGeneratingEssay] = useState(false);
  const [essayContent, setEssayContent] = useState('');
  const [essayFeedback, setEssayFeedback] = useState('');
  const [isGeneratingFeedback, setIsGeneratingFeedback] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionComplete, setSubmissionComplete] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isEnhancingEssay, setIsEnhancingEssay] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  
  const essayRef = useRef<HTMLDivElement>(null);
  
  // Generate essay using Llama 3.1 Nemotron
  const generateEssay = async () => {
    if (!scholarshipName || !essayPrompt) return;
    
    setGeneratingEssay(true);
    setEssayContent('');
    
    try {
      const generatedEssay = await generateEssayWithLlama({
        scholarshipName,
        essayPrompt,
        personalInfo
      });
      
      setEssayContent(generatedEssay);
    } catch (error) {
      console.error('Error generating essay:', error);
      // Show error message to user
    } finally {
      setGeneratingEssay(false);
    }
  };
  
  // Generate feedback using Llama 3.1 Nemotron
  const generateFeedback = async () => {
    if (!essayContent) return;
    
    setIsGeneratingFeedback(true);
    
    try {
      const feedback = await generateFeedbackWithLlama(essayContent);
      setEssayFeedback(feedback);
    } catch (error) {
      console.error('Error generating feedback:', error);
      // Show error message to user
    } finally {
      setIsGeneratingFeedback(false);
    }
  };
  
  // Enhance essay using Llama 3.1 Nemotron
  const enhanceEssay = async () => {
    if (!essayContent || !essayFeedback) return;
    
    setIsEnhancingEssay(true);
    
    try {
      const enhancedEssay = await enhanceEssayWithLlama(essayContent, essayFeedback);
      setEssayContent(enhancedEssay);
    } catch (error) {
      console.error('Error enhancing essay:', error);
      // Show error message to user
    } finally {
      setIsEnhancingEssay(false);
    }
  };
  
  const copyToClipboard = () => {
    if (essayContent) {
      navigator.clipboard.writeText(essayContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };
  
  const handleSubmit = () => {
    setIsSubmitting(true);
    
    // Simulate submission process
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmissionComplete(true);
      setShowConfetti(true);
      
      setTimeout(() => {
        setShowConfetti(false);
      }, 5000);
    }, 3000);
  };
  
  const resetForm = () => {
    setActiveStep(1);
    setScholarshipName('');
    setEssayPrompt('');
    setEssayContent('');
    setEssayFeedback('');
    setSubmissionComplete(false);
  };
  
  // Handle PDF download
  const handleDownloadPDF = async () => {
    if (!essayContent) return;
    
    setIsGeneratingPDF(true);
    
    try {
      await downloadPDF({
        scholarshipName,
        essayPrompt,
        personalInfo,
        essayContent
      }, `${scholarshipName.replace(/\s+/g, '-').toLowerCase()}-application.pdf`);
    } catch (error) {
      console.error('Error downloading PDF:', error);
      // Show error message to user
    } finally {
      setIsGeneratingPDF(false);
    }
  };
  
  // Confetti effect
  useEffect(() => {
    if (showConfetti && typeof window !== 'undefined') {
      const createConfetti = () => {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.animationDuration = Math.random() * 3 + 2 + 's';
        confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
        document.body.appendChild(confetti);
        
        setTimeout(() => {
          confetti.remove();
        }, 5000);
      };
      
      const interval = setInterval(createConfetti, 100);
      return () => clearInterval(interval);
    }
  }, [showConfetti]);
  
  // Steps data
  const steps = [
    { number: 1, title: 'Scholarship Details' },
    { number: 2, title: 'Personal Information' },
    { number: 3, title: 'Generate Application' },
    { number: 4, title: 'Review & Submit' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      
      <style>{`
        .confetti {
          position: fixed;  
          width: 10px;
          height: 10px;
          background-color: #f00;
          border-radius: 50%;
          top: -10px;
          z-index: 100;
          animation: fall linear forwards;
        }
        
        @keyframes fall {
          to {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
        
        .typing-cursor {
          display: inline-block;
          width: 2px;
          height: 1em;
          background-color: currentColor;
          margin-left: 2px;
          animation: blink 1s step-end infinite;
        }
        
        @keyframes blink {
          from, to { opacity: 1; }
          50% { opacity: 0; }
        }
        
        .glow-on-hover {
          position: relative;
          z-index: 1;
        }
        
        .glow-on-hover::after {
          content: '';
          position: absolute;
          top: -5px;
          left: -5px;
          right: -5px;
          bottom: -5px;
          background: linear-gradient(45deg, #10b981, #39ff14, #14b8a6, #a7f3d0);
          background-size: 400% 400%;
          z-index: -1;
          filter: blur(15px);
          opacity: 0;
          transition: opacity 0.3s;
          border-radius: inherit;
          animation: gradient-shift 15s ease infinite;
        }
        
        .glow-on-hover:hover::after {
          opacity: 0.7;
        }
      `}</style>
      
      <div className="lg:ml-[240px] p-4 md:p-8">
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-display font-bold primary-gradient-text">
            AI Application Generator
          </h1>
          <p className="text-gray-600 mt-2">
            Create perfect scholarship applications with our AI-powered assistant
          </p>
        </motion.div>
        
        {/* Steps Progress */}
        <motion.div 
          className="glassmorphism p-6 rounded-xl mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex flex-wrap justify-between relative">
            {/* Progress Line */}
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2 z-0"></div>
            <div 
              className="absolute top-1/2 left-0 h-1 bg-primary-500 -translate-y-1/2 z-0 transition-all duration-500"
              style={{ width: `${(activeStep - 1) / (steps.length - 1) * 100}%` }}
            ></div>
            
            {steps.map((step) => (
              <div 
                key={step.number} 
                className="z-10 flex flex-col items-center relative"
                style={{ width: `${100 / steps.length}%` }}
              >
                <motion.div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium mb-2 ${
                    step.number < activeStep 
                      ? 'bg-primary-500 text-white' 
                      : step.number === activeStep 
                      ? 'primary-gradient text-white' 
                      : 'bg-gray-200 text-gray-500'
                  }`}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => {
                    if (step.number < activeStep) {
                      setActiveStep(step.number);
                    }
                  }}
                >
                  {step.number < activeStep ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    step.number
                  )}
                </motion.div>
                <span className="text-xs text-center font-medium">{step.title}</span>
              </div>
            ))}
          </div>
        </motion.div>
        
        {/* Step Content */}
        <motion.div 
          className="glassmorphism p-6 rounded-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <AnimatePresence mode="wait">
            {/* Step 1: Scholarship Details */}
            {activeStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-full primary-gradient flex items-center justify-center mr-4">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">Scholarship Details</h2>
                    <p className="text-gray-600">Tell us about the scholarship you're applying for</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2" htmlFor="scholarship-name">
                      Scholarship Name
                    </label>
                    <input
                      id="scholarship-name"
                      type="text"
                      value={scholarshipName}
                      onChange={(e) => setScholarshipName(e.target.value)}
                      className="glassmorphism px-4 py-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
                      placeholder="e.g., Gates Millennium Scholars Program"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2" htmlFor="essay-prompt">
                      Essay Prompt
                    </label>
                    <textarea
                      id="essay-prompt"
                      value={essayPrompt}
                      onChange={(e) => setEssayPrompt(e.target.value)}
                      className="glassmorphism px-4 py-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all min-h-[120px]"
                      placeholder="e.g., Describe how you have demonstrated leadership ability both in and out of school."
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2" htmlFor="word-count">
                        Word Count Limit
                      </label>
                      <input
                        id="word-count"
                        type="number"
                        className="glassmorphism px-4 py-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
                        placeholder="e.g., 500"
                        defaultValue={500}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2" htmlFor="deadline">
                        Application Deadline
                      </label>
                      <input
                        id="deadline"
                        type="date"
                        className="glassmorphism px-4 py-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
                        defaultValue="2025-06-01"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end pt-4">
                  <motion.button
                    onClick={() => setActiveStep(2)}
                    className="px-6 py-3 primary-gradient text-white rounded-lg font-medium flex items-center button-glow"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={!scholarshipName || !essayPrompt}
                  >
                    Next Step
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </motion.button>
                </div>
              </motion.div>
            )}
            
            {/* Step 2: Personal Information */}
            {activeStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-full primary-gradient flex items-center justify-center mr-4">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">Personal Information</h2>
                    <p className="text-gray-600">Review and update your personal details</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2" htmlFor="name">
                      Full Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={personalInfo.name}
                      onChange={(e) => setPersonalInfo({...personalInfo, name: e.target.value})}
                      className="glassmorphism px-4 py-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2" htmlFor="email">
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={personalInfo.email}
                      onChange={(e) => setPersonalInfo({...personalInfo, email: e.target.value})}
                      className="glassmorphism px-4 py-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2" htmlFor="phone">
                      Phone Number
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      value={personalInfo.phone}
                      onChange={(e) => setPersonalInfo({...personalInfo, phone: e.target.value})}
                      className="glassmorphism px-4 py-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2" htmlFor="address">
                      Address
                    </label>
                    <input
                      id="address"
                      type="text"
                      value={personalInfo.address}
                      onChange={(e) => setPersonalInfo({...personalInfo, address: e.target.value})}
                      className="glassmorphism px-4 py-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2" htmlFor="education">
                      Education
                    </label>
                    <input
                      id="education"
                      type="text"
                      value={personalInfo.education}
                      onChange={(e) => setPersonalInfo({...personalInfo, education: e.target.value})}
                      className="glassmorphism px-4 py-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2" htmlFor="activities">
                      Extracurricular Activities & Achievements
                    </label>
                    <textarea
                      id="activities"
                      value={personalInfo.activities}
                      onChange={(e) => setPersonalInfo({...personalInfo, activities: e.target.value})}
                      className="glassmorphism px-4 py-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all min-h-[100px]"
                    />
                  </div>
                </div>
                
                <div className="flex justify-between pt-4">
                  <motion.button
                    onClick={() => setActiveStep(1)}
                    className="px-6 py-3 glassmorphism hover:bg-gray-100 rounded-lg font-medium flex items-center"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Previous
                  </motion.button>
                  
                  <motion.button
                    onClick={() => setActiveStep(3)}
                    className="px-6 py-3 primary-gradient text-white rounded-lg font-medium flex items-center button-glow"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Next Step
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </motion.button>
                </div>
              </motion.div>
            )}
            
            {/* Step 3: Generate Application */}
            {activeStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-full primary-gradient flex items-center justify-center mr-4">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">Generate Application</h2>
                    <p className="text-gray-600">Our AI will create a personalized application essay</p>
                  </div>
                </div>
                
                <div className="glassmorphism p-6 rounded-xl mb-6">
                  <div className="flex items-start mb-4">
                    <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center mr-3 flex-shrink-0">
                      <MessageSquare className="w-5 h-5 text-primary-600" />
                    </div>
                    <div className="flex-1">
                      <div className="bg-white p-4 rounded-lg rounded-tl-none shadow-sm">
                        <p className="text-sm">
                          I'll help you create a compelling essay for the <span className="font-medium">{scholarshipName || "scholarship"}</span>. 
                          Based on your profile and the essay prompt, I'll generate a personalized response that highlights your strengths and experiences.
                        </p>
                      </div>
                      <div className="flex space-x-2 mt-2">
                        <button 
                          onClick={generateEssay}
                          className="px-4 py-2 primary-gradient text-white rounded-lg text-sm font-medium flex items-center button-glow"
                          disabled={generatingEssay}
                        >
                          {generatingEssay ? (
                            <>
                              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                              Generating...
                            </>
                          ) : (
                            <>
                              <Zap className="w-4 h-4 mr-2" />
                              Generate Essay
                            </>
                          )}
                        </button>
                        <button className="px-4 py-2 glassmorphism hover:bg-gray-100 rounded-lg text-sm font-medium">
                          Customize Tone
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  {generatingEssay && (
                    <div className="flex items-start mt-6">
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3 flex-shrink-0">
                        <PenTool className="w-5 h-5 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <div className="bg-white p-4 rounded-lg rounded-tl-none shadow-sm">
                          <div className="flex items-center space-x-2 mb-2">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                            <span className="text-sm text-green-600 font-medium">AI is writing your essay...</span>
                          </div>
                          <TypeAnimation
                            sequence={[
                              'Analyzing your profile and achievements...',
                              1000,
                              'Crafting a compelling narrative...',
                              1000,
                              'Tailoring content to scholarship requirements...',
                              1000,
                              'Optimizing language and structure...',
                              1000,
                              'Finalizing your personalized essay...',
                            ]}
                            wrapper="p"
                            speed={50}
                            className="text-sm text-gray-600"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {essayContent && !generatingEssay && (
                    <div className="mt-6">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-medium">Generated Essay</h3>
                        <div className="flex space-x-2">
                          <button 
                            onClick={copyToClipboard}
                            className="p-2 glassmorphism hover:bg-gray-100 rounded-lg text-sm flex items-center"
                            title="Copy to clipboard"
                          >
                            {copied ? (
                              <CheckCircle className="w-4 h-4 text-green-600" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </button>
                          <button 
                            onClick={handleDownloadPDF}
                            className="p-2 glassmorphism hover:bg-gray-100 rounded-lg text-sm flex items-center"
                            title="Download as PDF"
                            disabled={isGeneratingPDF}
                          >
                            {isGeneratingPDF ? (
                              <RefreshCw className="w-4 h-4 animate-spin" />
                            ) : (
                              <Download className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </div>
                      
                      <div 
                        ref={essayRef}
                        className="bg-white p-6 rounded-lg shadow-sm prose prose-sm max-w-none"
                      >
                        {essayContent.split('\n\n').map((paragraph, index) => (
                          <p key={index}>{paragraph}</p>
                        ))}
                      </div>
                      
                      <div className="flex justify-center mt-6">
                        <button 
                          onClick={generateFeedback}
                          className="px-4 py-2 glassmorphism hover:bg-primary-50 rounded-lg text-sm font-medium flex items-center"
                          disabled={isGeneratingFeedback}
                        >
                          {isGeneratingFeedback ? (
                            <>
                              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                              Analyzing...
                            </>
                          ) : (
                            <>
                              <Clipboard className="w-4 h-4 mr-2" />
                              Get AI Feedback
                            </>
                          )}
                        </button>
                      </div>
                      
                      {essayFeedback && !isGeneratingFeedback && (
                        <motion.div 
                          className="mt-6 bg-white p-6 rounded-lg shadow-sm"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                        >
                          <h3 className="font-medium mb-4 flex items-center">
                            <Sparkles className="w-4 h-4 mr-2 text-primary-600" />
                            AI Feedback & Suggestions
                          </h3>
                          <div dangerouslySetInnerHTML={{ __html: essayFeedback }} />
                          
                          <div className="flex justify-end mt-4">
                            <button 
                              onClick={enhanceEssay}
                              className="px-4 py-2 primary-gradient text-white rounded-lg text-sm font-medium flex items-center button-glow"
                              disabled={isEnhancingEssay}
                            >
                              {isEnhancingEssay ? (
                                <>
                                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                                  Enhancing...
                                </>
                              ) : (
                                <>
                                  <Zap className="w-4 h-4 mr-2" />
                                  Enhance Essay
                                </>
                              )}
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  )}
                </div>
                
                <div className="flex justify-between pt-4">
                  <motion.button
                    onClick={() => setActiveStep(2)}
                    className="px-6 py-3 glassmorphism hover:bg-gray-100 rounded-lg font-medium flex items-center"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Previous
                  </motion.button>
                  
                  <motion.button
                    onClick={() => setActiveStep(4)}
                    className="px-6 py-3 primary-gradient text-white rounded-lg font-medium flex items-center button-glow"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={!essayContent}
                  >
                    Next Step
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </motion.button>
                </div>
              </motion.div>
            )}
            
            {/* Step 4: Review & Submit */}
            {activeStep === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-full primary-gradient flex items-center justify-center mr-4">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">Review & Submit</h2>
                    <p className="text-gray-600">Review your application before submitting</p>
                  </div>
                </div>
                
                {submissionComplete ? (
                  <motion.div 
                    className="text-center py-10"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <motion.div 
                      className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    >
                      <CheckCircle className="w-10 h-10 text-green-600" />
                    </motion.div>
                    
                    <h3 className="text-2xl font-bold mb-2">Application Submitted!</h3>
                    <p className="text-gray-600 mb-6">
                      Your application for {scholarshipName} has been successfully submitted.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-3">
                      <button 
                        onClick={resetForm}
                        className="px-6 py-3 glassmorphism hover:bg-gray-100 rounded-lg font-medium flex items-center justify-center"
                      >
                        <RefreshCw className="w-5 h-5 mr-2" />
                        Create New Application
                      </button>
                      <button 
                        onClick={handleDownloadPDF}
                        className="px-6 py-3 primary-gradient text-white rounded-lg font-medium flex items-center justify-center button-glow"
                        disabled={isGeneratingPDF}
                      >
                        {isGeneratingPDF ? (
                          <>
                            <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                            Generating PDF...
                          </>
                        ) : (
                          <>
                            <FileText className="w-5 h-5 mr-2" />
                            Download Application PDF
                          </>
                        )}
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <>
                    <div className="glassmorphism p-6 rounded-xl mb-6">
                      <h3 className="font-medium mb-4">Application Summary</h3>
                      
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="text-sm font-medium text-gray-500">Scholarship</h4>
                            <p>{scholarshipName}</p>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-gray-500">Applicant</h4>
                            <p>{personalInfo.name}</p>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-gray-500">Email</h4>
                            <p>{personalInfo.email}</p>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-gray-500">Phone</h4>
                            <p>{personalInfo.phone}</p>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">Essay Prompt</h4>
                          <p className="text-sm">{essayPrompt}</p>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium text-gray-500 mb-2">Essay Preview</h4>
                          <div className="bg-white p-4 rounded-lg max-h-60 overflow-y-auto text-sm">
                            {essayContent.split('\n\n').map((paragraph, index) => (
                              <p key={index} className="mb-2">{paragraph}</p>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between pt-4">
                      <motion.button
                        onClick={() => setActiveStep(3)}
                        className="px-6 py-3 glassmorphism hover:bg-gray-100 rounded-lg font-medium flex items-center"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Previous
                      </motion.button>
                      
                      <motion.button
                        onClick={handleSubmit}
                        className="px-6 py-3 primary-gradient text-white rounded-lg font-medium flex items-center button-glow glow-on-hover"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                            Submitting...
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5 mr-2" />
                            Submit Application
                          </>
                        )}
                      </motion.button>
                    </div>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default ApplicationGenerator;