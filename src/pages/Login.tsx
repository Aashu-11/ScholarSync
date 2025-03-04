import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Award, Notebook as Robot, FileText, Calendar, MessageSquare } from 'lucide-react';
import Button from '../components/ui/Button';
import Card, { CardContent } from '../components/ui/Card';
import { useAuth } from '../contexts/AuthContext';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { loginWithGoogle } = useAuth();

  const handleGoogleSignIn = async () => {
    setError('');
    setIsLoading(true);
    try {
      await loginWithGoogle();
      onLogin();
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to sign in with Google');
    } finally {
      setIsLoading(false);
    }
  };

  const features = [
    {
      icon: <Award className="text-primary-600" size={24} />,
      title: 'AI-Powered Matching',
      description: 'Our advanced algorithms match you with scholarships that fit your unique profile.'
    },
    {
      icon: <Robot className="text-primary-600" size={24} />,
      title: 'Application Generator',
      description: 'AI-driven tools to help you craft compelling applications and essays.'
    },
    {
      icon: <MessageSquare className="text-primary-600" size={24} />,
      title: 'Virtual Scholarship Coach',
      description: 'Get real-time guidance and answers to your questions from our AI assistant.'
    },
    {
      icon: <FileText className="text-primary-600" size={24} />,
      title: 'Document Management',
      description: 'Securely store and manage all your application documents in one place.'
    },
    {
      icon: <Calendar className="text-primary-600" size={24} />,
      title: 'Smart Calendar',
      description: 'Never miss a deadline with our intelligent event tracking system.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex flex-col md:flex-row">
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="flex items-center justify-center mb-8">
            <Sparkles className="text-primary-600 mr-2" size={32} />
            <h1 className="text-3xl font-bold text-gray-900">ScholarNex</h1>
          </div>
          <Card className="w-full">
            <CardContent>
              <h2 className="text-2xl font-semibold text-center mb-6">Welcome Back</h2>
              {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-md mb-4">
                  {error}
                </div>
              )}
              <Button
                onClick={handleGoogleSignIn}
                fullWidth
                isLoading={isLoading}
                className="flex items-center justify-center bg-white border border-gray-300 text-black hover:bg-gray-100"
              >
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="Google Logo"
                  className="w-5 h-5 mr-2"
                  
                />
                Sign in with Google
              </Button>
              <div className="mt-6 text-center text-sm text-gray-600">
                <p>By signing in, you agree to our Terms and Privacy Policy.</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      <div className="w-full md:w-1/2 bg-primary-600 text-white p-8 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-lg"
        >
          <h2 className="text-3xl font-bold mb-6">Revolutionize Your Scholarship Search</h2>
          <p className="text-lg mb-8 text-primary-100">
          ScholarNex uses cutting-edge artificial intelligence to help you find, apply for, and win scholarships that match your unique profile.
          </p>
          <div className="space-y-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                className="flex items-start"
              >
                <div className="flex-shrink-0 bg-white bg-opacity-20 p-2 rounded-lg mr-4">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{feature.title}</h3>
                  <p className="text-primary-100">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
