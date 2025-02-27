import React from 'react';
import { motion } from 'framer-motion';
import { 
  Award, 
  Calendar, 
  Clock, 
  TrendingUp, 
  FileText, 
  Users, 
  Search, 
  Bot, 
  ChevronRight, 
  Bell,
  CheckCircle,
  AlertCircle,
  ExternalLink,
  ArrowUpRight
} from 'lucide-react';
import Sidebar from '../components/Sidebar';

const Dashboard: React.FC = () => {
  // Mock data for progress
  const progressData = {
    applications: {
      completed: 5,
      total: 12,
      percentage: 42
    },
    documents: {
      completed: 8,
      total: 10,
      percentage: 80
    },
    profile: {
      completed: 90,
      total: 100,
      percentage: 90
    }
  };

  // Mock data for recommended scholarships
  const recommendedScholarships = [
    {
      id: 1,
      name: 'Global Excellence Scholarship',
      amount: '$25,000',
      deadline: '2025-04-30',
      match: 98,
      tags: ['international', 'merit-based', 'undergraduate']
    },
    {
      id: 2,
      name: 'STEM Leaders Award',
      amount: '$15,000',
      deadline: '2025-05-15',
      match: 95,
      tags: ['stem', 'research', 'graduate']
    },
    {
      id: 3,
      name: 'Future Innovators Grant',
      amount: '$10,000',
      deadline: '2025-05-01',
      match: 92,
      tags: ['innovation', 'technology', 'undergraduate']
    }
  ];

  // Mock data for upcoming deadlines
  const upcomingDeadlines = [
    {
      id: 1,
      name: 'National Merit Scholarship',
      deadline: '2025-04-15',
      status: 'in-progress',
      progress: 75
    },
    {
      id: 2,
      name: 'Global Leaders Program',
      deadline: '2025-04-22',
      status: 'not-started',
      progress: 0
    },
    {
      id: 3,
      name: 'Women in Engineering',
      deadline: '2025-05-01',
      status: 'completed',
      progress: 100
    }
  ];

  // Mock data for recent activities
  const recentActivities = [
    {
      id: 1,
      type: 'document',
      title: 'Transcript uploaded',
      time: '2 hours ago'
    },
    {
      id: 2,
      type: 'application',
      title: 'STEM Leaders Award application started',
      time: '1 day ago'
    },
    {
      id: 3,
      type: 'ai',
      title: 'AI generated essay draft for National Merit',
      time: '2 days ago'
    },
    {
      id: 4,
      type: 'event',
      title: 'Registered for Scholarship Workshop',
      time: '3 days ago'
    }
  ];

  // Format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      month: 'short', 
      day: 'numeric'
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Get status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle size={16} className="text-emerald-500" />;
      case 'in-progress':
        return <Clock size={16} className="text-amber-500" />;
      case 'not-started':
        return <AlertCircle size={16} className="text-gray-400" />;
      default:
        return null;
    }
  };

  // Get activity icon
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'document':
        return <FileText size={16} className="text-blue-500" />;
      case 'application':
        return <Award size={16} className="text-purple-500" />;
      case 'ai':
        return <Bot size={16} className="text-emerald-500" />;
      case 'event':
        return <Calendar size={16} className="text-amber-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 pt-16 md:pt-0 md:pl-64">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl font-bold text-gray-900">Welcome back, Alex!</h1>
              <p className="mt-1 text-sm text-gray-500">
                Here's what's happening with your scholarship applications
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-4 md:mt-0 flex space-x-2"
            >
              <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500">
                <Search size={16} className="mr-2" />
                Find Scholarships
              </button>
              <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500">
                <Bell size={16} className="mr-2" />
                Notifications
              </button>
            </motion.div>
          </div>

          {/* Stats cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
          >
            {/* Applications progress */}
            <div className="glass rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium text-gray-900">Applications</h2>
                <Award size={20} className="text-emerald-500" />
              </div>
              <div className="flex items-end justify-between mb-2">
                <div>
                  <p className="text-3xl font-bold text-gray-900">{progressData.applications.completed}</p>
                  <p className="text-sm text-gray-500">of {progressData.applications.total} completed</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-emerald-500">{progressData.applications.percentage}%</p>
                  <p className="text-sm text-gray-500">completion rate</p>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                <div 
                  className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2.5 rounded-full" 
                  style={{ width: `${progressData.applications.percentage}%` }}
                ></div>
              </div>
              <a href="#" className="text-sm font-medium text-emerald-600 hover:text-emerald-500 flex items-center">
                View all applications
                <ChevronRight size={16} className="ml-1" />
              </a>
            </div>
            
            {/* Documents progress */}
            <div className="glass rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium text-gray-900">Documents</h2>
                <FileText size={20} className="text-emerald-500" />
              </div>
              <div className="flex items-end justify-between mb-2">
                <div>
                  <p className="text-3xl font-bold text-gray-900">{progressData.documents.completed}</p>
                  <p className="text-sm text-gray-500">of {progressData.documents.total} uploaded</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-emerald-500">{progressData.documents.percentage}%</p>
                  <p className="text-sm text-gray-500">completion rate</p>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                <div 
                  className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2.5 rounded-full" 
                  style={{ width: `${progressData.documents.percentage}%` }}
                ></div>
              </div>
              <a href="#" className="text-sm font-medium text-emerald-600 hover:text-emerald-500 flex items-center">
                Manage documents
                <ChevronRight size={16} className="ml-1" />
              </a>
            </div>
            
            {/* Profile completion */}
            <div className="glass rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium text-gray-900">Profile</h2>
                <Users size={20} className="text-emerald-500" />
              </div>
              <div className="flex items-end justify-between mb-2">
                <div>
                  <p className="text-3xl font-bold text-gray-900">{progressData.profile.percentage}%</p>
                  <p className="text-sm text-gray-500">profile completion</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-emerald-500">A+</p>
                  <p className="text-sm text-gray-500">profile rating</p>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                <div 
                  className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2.5 rounded-full" 
                  style={{ width: `${progressData.profile.percentage}%` }}
                ></div>
              </div>
              <a href="#" className="text-sm font-medium text-emerald-600 hover:text-emerald-500 flex items-center">
                Complete profile
                <ChevronRight size={16} className="ml-1" />
              </a>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* AI Recommendations */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-2"
            >
              <div className="glass rounded-xl shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                  <h2 className="text-lg font-medium text-gray-900">AI-Recommended Scholarships</h2>
                  <div className="flex items-center text-xs text-gray-500">
                    <TrendingUp size={14} className="text-emerald-500 mr-1" />
                    <span>Updated just now</span>
                  </div>
                </div>
                
                <div className="divide-y divide-gray-200">
                  {recommendedScholarships.map((scholarship) => (
                    <div 
                      key={scholarship.id}
                      className="p-6 hover:bg-gray-50 transition-colors duration-200"
                    >
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div className="mb-4 md:mb-0">
                          <div className="flex items-center mb-1">
                            <h3 className="text-lg font-medium text-gray-900 mr-2">{scholarship.name}</h3>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                              {scholarship.match}% Match
                            </span>
                          </div>
                          
                          <div className="flex items-center text-sm text-gray-500 mb-2">
                            <span className="font-medium text-gray-900">{scholarship.amount}</span>
                            <span className="mx-2">•</span>
                            <Clock size={14} className="mr-1" />
                            <span>Deadline: {formatDate(scholarship.deadline)}</span>
                          </div>
                          
                          <div className="flex flex-wrap gap-1">
                            {scholarship.tags.map((tag, index) => (
                              <span
                                key={index}
                                className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex space-x-2">
                          <button className="inline-flex items-center px-3 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500">
                            Apply Now
                          </button>
                          <button className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500">
                            Save
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  <div className="px-6 py-4 bg-gray-50">
                    <a href="#" className="text-sm font-medium text-emerald-600 hover:text-emerald-500 flex items-center justify-center">
                      View all recommendations
                      <ChevronRight size={16} className="ml-1" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Upcoming deadlines */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="glass rounded-xl shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                  <h2 className="text-lg font-medium text-gray-900">Upcoming Deadlines</h2>
                </div>
                
                <div className="divide-y divide-gray-200">
                  {upcomingDeadlines.map((deadline) => (
                    <div 
                      key={deadline.id}
                      className="p-4 hover:bg-gray-50 transition-colors duration-200"
                    >
                      <div className="flex items-start">
                        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center mr-3">
                          <span className="text-xs font-medium text-emerald-800">
                            {formatDate(deadline.deadline)}
                          </span>
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="text-sm font-medium text-gray-900">{deadline.name}</h3>
                            {getStatusIcon(deadline.status)}
                          </div>
                          
                          <div className="w-full bg-gray-200 rounded-full h-1.5 mb-1">
                            <div 
                              className={`h-1.5 rounded-full ${
                                deadline.status === 'completed' 
                                  ? 'bg-emerald-500' 
                                  : deadline.status === 'in-progress' 
                                    ? 'bg-amber-500' 
                                    : 'bg-gray-300'
                              }`}
                              style={{ width: `${deadline.progress}%` }}
                            ></div>
                          </div>
                          
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-gray-500">
                              {deadline.status === 'completed' 
                                ? 'Completed' 
                                : deadline.status === 'in-progress' 
                                  ? `${deadline.progress}% complete` 
                                  : 'Not started'}
                            </span>
                            
                            <a href="#" className="text-xs font-medium text-emerald-600 hover:text-emerald-500">
                              {deadline.status === 'completed' 
                                ? 'View' 
                                : deadline.status === 'in-progress' 
                                  ? 'Continue' 
                                  : 'Start'}
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  <div className="px-6 py-4 bg-gray-50">
                    <a href="#" className="text-sm font-medium text-emerald-600 hover:text-emerald-500 flex items-center justify-center">
                      View all deadlines
                      <ChevronRight size={16} className="ml-1" />
                    </a>
                  </div>
                </div>
              </div>
              
              {/* Recent activity */}
              <div className="glass rounded-xl shadow-sm overflow-hidden mt-6">
                <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                  <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
                </div>
                
                <div className="divide-y divide-gray-200">
                  {recentActivities.map((activity) => (
                    <div 
                      key={activity.id}
                      className="p-4 hover:bg-gray-50 transition-colors duration-200"
                    >
                      <div className="flex items-start">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                          {getActivityIcon(activity.type)}
                        </div>
                        
                        <div className="flex-1">
                          <p className="text-sm text-gray-900">{activity.title}</p>
                          <p className="text-xs text-gray-500">{activity.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  <div className="px-6 py-4 bg-gray-50">
                    <a href="#" className="text-sm font-medium text-emerald-600 hover:text-emerald-500 flex items-center justify-center">
                      View all activity
                      <ChevronRight size={16} className="ml-1" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Feature cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8"
          >
            <div className="glass rounded-xl p-6 shadow-sm border border-emerald-100 hover:border-emerald-300 transition-colors duration-200">
              <div className="w-12 h-12 rounded-lg bg-emerald-100 flex items-center justify-center mb-4">
                <Search size={24} className="text-emerald-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Find Scholarships</h3>
              <p className="text-sm text-gray-500 mb-4">
                Discover scholarships tailored to your profile and interests.
              </p>
              <a href="#" className="text-sm font-medium text-emerald-600 hover:text-emerald-500 flex items-center">
                Explore now
                <ArrowUpRight size={14} className="ml-1" />
              </a>
            </div>
            
            <div className="glass rounded-xl p-6 shadow-sm border border-emerald-100 hover:border-emerald-300 transition-colors duration-200">
              <div className="w-12 h-12 rounded-lg bg-emerald-100 flex items-center justify-center mb-4">
                <Bot size={24} className="text-emerald-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">AI Application Helper</h3>
              <p className="text-sm text-gray-500 mb-4">
                Let our AI help you craft compelling scholarship applications.
              </p>
              <a href="#" className="text-sm font-medium text-emerald-600 hover:text-emerald-500 flex items-center">
                Get started
                <ArrowUpRight size={14} className="ml-1" />
              </a>
            </div>
            
            <div className="glass rounded-xl p-6 shadow-sm border border-emerald-100 hover:border-emerald-300 transition-colors duration-200">
              <div className="w-12 h-12 rounded-lg bg-emerald-100 flex items-center justify-center mb-4">
                <FileText size={24} className="text-emerald-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Document Manager</h3>
              <p className="text-sm text-gray-500 mb-4">
                Organize and manage all your scholarship documents in one place.
              </p>
              <a href="#" className="text-sm font-medium text-emerald-600 hover:text-emerald-500 flex items-center">
                Manage documents
                <ArrowUpRight size={14} className="ml-1" />
              </a>
            </div>
            
            <div className="glass rounded-xl p-6 shadow-sm border border-emerald-100 hover:border-emerald-300 transition-colors duration-200">
              <div className="w-12 h-12 rounded-lg bg-emerald-100 flex items-center justify-center mb-4">
                <Users size={24} className="text-emerald-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Community</h3>
              <p className="text-sm text-gray-500 mb-4">
                Connect with other students and attend scholarship events.
              </p>
              <a href="#" className="text-sm font-medium text-emerald-600 hover:text-emerald-500 flex items-center">
                Join now
                <ArrowUpRight size={14} className="ml-1" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;