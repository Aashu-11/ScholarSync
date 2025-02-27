import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Award, Notebook as Robot, FileText, Calendar, MessageSquare } from 'lucide-react';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Card, { CardContent } from '../components/ui/Card';
import { useAuth } from '../contexts/AuthContext';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const success = await login(username, password);
      if (success) {
        onLogin();
        navigate('/dashboard');
      } else {
        setError('Invalid username or password');
      }
    } catch (err) {
      setError('An error occurred during login');
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
      {/* Left side - Login form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="flex items-center justify-center mb-8">
            <Sparkles className="text-primary-600 mr-2" size={32} />
            <h1 className="text-3xl font-bold text-gray-900">ScholarSync</h1>
          </div>
          
          <Card className="w-full">
            <CardContent>
              <h2 className="text-2xl font-semibold text-center mb-6">Welcome Back</h2>
              
              {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-md mb-4">
                  {error}
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                <Input
                  label="Username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  fullWidth
                  required
                  placeholder="Enter your username"
                />
                
                <Input
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  fullWidth
                  required
                  placeholder="Enter your password"
                />
                
                <div className="mt-2 mb-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      />
                      <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                        Remember me
                      </label>
                    </div>
                    
                    <div className="text-sm">
                      <a href="#" className="font-medium text-primary-600 hover:text-primary-500">
                        Forgot password?
                      </a>
                    </div>
                  </div>
                </div>
                
                <Button
                  type="submit"
                  fullWidth
                  isLoading={isLoading}
                >
                  Sign In
                </Button>
                
                <div className="mt-4 text-center">
                  <span className="text-sm text-gray-600">
                    Don't have an account?{' '}
                    <a href="#" className="font-medium text-primary-600 hover:text-primary-500">
                      Sign up
                    </a>
                  </span>
                </div>
              </form>
            </CardContent>
          </Card>
          
          <div className="mt-4 text-center text-sm text-gray-600">
            <p>Demo credentials: username / password</p>
          </div>
        </motion.div>
      </div>
      
      {/* Right side - Features overview */}
      <div className="w-full md:w-1/2 bg-primary-600 text-white p-8 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-lg"
        >
          <h2 className="text-3xl font-bold mb-6">Revolutionize Your Scholarship Search</h2>
          <p className="text-lg mb-8 text-primary-100">
            ScholarAI uses cutting-edge artificial intelligence to help you find, apply for, and win scholarships that match your unique profile.
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