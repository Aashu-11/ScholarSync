import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from '../components/Sidebar'; // Import Sidebar component
import { 
  Users, 
  Calendar, 
  MessageSquare, 
  Video, 
  Clock, 
  ThumbsUp, 
  MessageCircle, 
  Share2, 
  Award, 
  User, 
  Search,
  Bell,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Filter,
  Plus,
  ExternalLink
} from 'lucide-react';

// Mock data for events
const mockEvents = [
  {
    id: 1,
    title: 'Scholarship Application Workshop',
    date: '2025-04-15T14:00:00',
    type: 'webinar',
    host: 'Dr. Sarah Johnson',
    attendees: 156,
    description: 'Learn how to craft compelling scholarship applications that stand out from the crowd. Dr. Johnson will share insider tips from her experience on scholarship committees.',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 2,
    title: 'STEM Scholarships Panel Discussion',
    date: '2025-04-20T15:30:00',
    type: 'panel',
    host: 'Prof. Michael Chen',
    attendees: 89,
    description: 'Join leading STEM professionals as they discuss scholarship opportunities in science, technology, engineering, and mathematics fields.',
    image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 3,
    title: 'Essay Writing Masterclass',
    date: '2025-04-25T13:00:00',
    type: 'workshop',
    host: 'Emma Williams, MFA',
    attendees: 204,
    description: 'Master the art of writing compelling scholarship essays that tell your unique story and capture the attention of selection committees.',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 4,
    title: 'Financial Aid Q&A Session',
    date: '2025-05-02T16:00:00',
    type: 'qa',
    host: 'Robert Martinez, Financial Aid Advisor',
    attendees: 132,
    description: 'Get answers to your most pressing financial aid questions from an experienced advisor who has helped hundreds of students secure funding.',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 5,
    title: 'International Student Scholarships',
    date: '2025-05-10T11:00:00',
    type: 'webinar',
    host: 'Dr. Aisha Patel',
    attendees: 178,
    description: 'A comprehensive overview of scholarship opportunities specifically available for international students studying in the United States.',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  }
];

// Mock data for forum discussions
const mockDiscussions = [
  {
    id: 1,
    title: 'Tips for Fulbright Scholarship Application?',
    author: 'Alex Johnson',
    authorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    date: '2025-03-28T09:15:00',
    replies: 24,
    likes: 18,
    tags: ['fulbright', 'international', 'tips'],
    preview: 'I\'m preparing my Fulbright application for next year and would love some advice from previous recipients or applicants...'
  },
  {
    id: 2,
    title: 'Anyone applied for the Gates Scholarship this year?',
    author: 'Maya Rodriguez',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    date: '2025-03-27T14:22:00',
    replies: 15,
    likes: 9,
    tags: ['gates', 'undergraduate', 'deadline'],
    preview: 'Just submitted my Gates Scholarship application yesterday! The essay prompts were challenging but interesting...'
  },
  {
    id: 3,
    title: 'How to balance scholarship applications with schoolwork?',
    author: 'Jordan Lee',
    authorAvatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    date: '2025-03-25T16:45:00',
    replies: 32,
    likes: 41,
    tags: ['time-management', 'stress', 'advice'],
    preview: 'I\'m applying to 10+ scholarships while taking 5 AP classes and it\'s getting overwhelming. How do you all manage your time?'
  },
  {
    id: 4,
    title: 'Scholarship opportunity for first-generation students!',
    author: 'Professor Williams',
    authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    date: '2025-03-24T10:30:00',
    replies: 8,
    likes: 27,
    tags: ['first-gen', 'opportunity', 'deadline-soon'],
    preview: 'Just wanted to share a new scholarship opportunity specifically for first-generation college students. The award is $10,000 and...'
  },
  {
    id: 5,
    title: 'Rejected from dream scholarship - what now?',
    author: 'Taylor Kim',
    authorAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    date: '2025-03-22T19:12:00',
    replies: 45,
    likes: 38,
    tags: ['rejection', 'advice', 'emotional-support'],
    preview: 'Just got the email that I wasn\'t selected for the scholarship I\'ve been working toward for months. Feeling pretty devastated and...'
  }
];

// Mock data for announcements
const mockAnnouncements = [
  {
    id: 1,
    title: 'New STEM Scholarship Added',
    date: '2025-03-29T08:00:00',
    content: 'A new $25,000 scholarship for women in STEM fields has been added to our database.'
  },
  {
    id: 2,
    title: 'Application Deadline Extended',
    date: '2025-03-28T14:30:00',
    content: 'The National Merit Scholarship deadline has been extended by two weeks.'
  },
  {
    id: 3,
    title: 'New Essay Writing Tool Available',
    date: '2025-03-27T11:15:00',
    content: 'Our AI-powered essay analysis tool is now available to all premium users.'
  }
];

const Community: React.FC = () => {
  const [activeTab, setActiveTab] = useState('events');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedEvent, setExpandedEvent] = useState<number | null>(null);
  const [expandedDiscussion, setExpandedDiscussion] = useState<number | null>(null);

  // Format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Get event type badge
  const getEventTypeBadge = (type: string) => {
    switch (type) {
      case 'webinar':
        return (
          <span className="flex items-center text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800">
            <Video size={12} className="mr-1" />
            Webinar
          </span>
        );
      case 'workshop':
        return (
          <span className="flex items-center text-xs px-2 py-1 rounded-full bg-purple-100 text-purple-800">
            <Users size={12} className="mr-1" />
            Workshop
          </span>
        );
      case 'panel':
        return (
          <span className="flex items-center text-xs px-2 py-1 rounded-full bg-amber-100 text-amber-800">
            <MessageSquare size={12} className="mr-1" />
            Panel
          </span>
        );
      case 'qa':
        return (
          <span className="flex items-center text-xs px-2 py-1 rounded-full bg-emerald-100 text-emerald-800">
            <MessageCircle size={12} className="mr-1" />
            Q&A
          </span>
        );
      default:
        return null;
    }
  };

  // Filter events based on search query
  const filteredEvents = mockEvents.filter(event => 
    event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter discussions based on search query
  const filteredDiscussions = mockDiscussions.filter(discussion => 
    discussion.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    discussion.preview.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex">
      <Sidebar /> {/* Include Sidebar component */}
      <div className="pt-16 md:pt-0 md:pl-64">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                    <motion.div 
                      className="mb-8"
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <h1 className="text-3xl font-display font-bold primary-gradient-text">
                      Community & Events                      </h1>
                      <p className="text-gray-600 mt-2">
                      Connect with other students and attend scholarship events
                      </p>
                    </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-4 md:mt-0 flex space-x-2"
            >
              <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500">
                <Plus size={16} className="mr-2" />
                Create Post
              </button>
              <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500">
                <Bell size={16} className="mr-2" />
                Notifications
              </button>
            </motion.div>
          </div>

          {/* Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="glass rounded-xl shadow-sm mb-6 overflow-hidden"
          >
            <div className="flex border-b border-gray-200">
              <button
                onClick={() => setActiveTab('events')}
                className={`flex items-center px-6 py-4 text-sm font-medium border-b-2 ${
                  activeTab === 'events'
                    ? 'border-emerald-500 text-emerald-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Calendar size={18} className="mr-2" />
                Upcoming Events
              </button>
              <button
                onClick={() => setActiveTab('discussions')}
                className={`flex items-center px-6 py-4 text-sm font-medium border-b-2 ${
                  activeTab === 'discussions'
                    ? 'border-emerald-500 text-emerald-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <MessageSquare size={18} className="mr-2" />
                Discussions
              </button>
            </div>

            {/* Search */}
            <div className="p-4 border-b border-gray-200 bg-gray-50">
              <div className="flex items-center">
                <div className="relative flex-1">
                  <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder={`Search ${activeTab === 'events' ? 'events' : 'discussions'}...`}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                  />
                </div>
                
                <button className="ml-2 inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500">
                  <Filter size={16} className="mr-2 text-gray-500" />
                  Filter
                </button>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Main content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="md:col-span-2"
            >
              {/* Events tab */}
              {activeTab === 'events' && (
                <div className="glass rounded-xl shadow-sm overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                    <h2 className="text-lg font-medium text-gray-900">Upcoming Events</h2>
                  </div>

                  <div className="divide-y divide-gray-200">
                    <AnimatePresence>
                      {filteredEvents.length > 0 ? (
                        filteredEvents.map((event) => (
                          <motion.div
                            key={event.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="p-6 hover:bg-gray-50 transition-colors duration-200"
                          >
                            <div className="flex flex-col md:flex-row">
                              <div className="md:w-1/3 mb-4 md:mb-0 md:mr-6">
                                <div className="relative h-48 rounded-lg overflow-hidden">
                                  <img
                                    src={event.image}
                                    alt={event.title}
                                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                                  />
                                  <div className="absolute top-2 left-2">
                                    {getEventTypeBadge(event.type)}
                                  </div>
                                </div>
                              </div>
                              
                              <div className="md:w-2/3">
                                <h3 className="text-lg font-medium text-gray-900 mb-1">{event.title}</h3>
                                
                                <div className="flex items-center text-sm text-gray-500 mb-3">
                                  <Clock size={16} className="mr-1" />
                                  <span>{formatDate(event.date)}</span>
                                  <span className="mx-2">•</span>
                                  <User size={16} className="mr-1" />
                                  <span>{event.host}</span>
                                </div>
                                
                                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                                  {event.description}
                                </p>
                                
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center text-sm text-gray-500">
                                    <Users size={16} className="mr-1" />
                                    <span>{event.attendees} attending</span>
                                  </div>
                                  
                                  <button
                                    onClick={() => setExpandedEvent(expandedEvent === event.id ? null : event.id)}
                                    className="inline-flex items-center text-sm font-medium text-emerald-600 hover:text-emerald-500"
                                  >
                                    {expandedEvent === event.id ? (
                                      <>
                                        Less info
                                        <ChevronUp size={16} className="ml-1" />
                                      </>
                                    ) : (
                                      <>
                                        More info
                                        <ChevronDown size={16} className="ml-1" />
                                      </>
                                    )}
                                  </button>
                                </div>
                                
                                {/* Expanded view */}
                                <AnimatePresence>
                                  {expandedEvent === event.id && (
                                    <motion.div
                                      initial={{ opacity: 0, height: 0 }}
                                      animate={{ opacity: 1, height: 'auto' }}
                                      exit={{ opacity: 0, height: 0 }}
                                      transition={{ duration: 0.2 }}
                                      className="mt-4 pt-4 border-t border-gray-200"
                                    >
                                      <p className="text-sm text-gray-600 mb-4">
                                        {event.description}
                                      </p>
                                      
                                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                                        <button className="mb-2 sm:mb-0 inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500">
                                          Register Now
                                        </button>
                                        
                                        <div className="flex space-x-2">
                                          <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500">
                                            <Calendar size={16} className="mr-2 text-gray-500" />
                                            Add to Calendar
                                          </button>
                                          
                                          <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500">
                                            <Share2 size={16} className="mr-2 text-gray-500" />
                                            Share
                                          </button>
                                        </div>
                                      </div>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>
                            </div>
                          </motion.div>
                        ))
                      ) : (
                        <div className="px-6 py-12 text-center">
                          <Calendar size={48} className="mx-auto text-gray-300 mb-4" />
                          <h3 className="text-lg font-medium text-gray-900 mb-1">No events found</h3>
                          <p className="text-sm text-gray-500">
                            {searchQuery
                              ? `No results for "${searchQuery}"`
                              : 'Check back later for upcoming events'}
                          </p>
                        </div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              )}

              {/* Discussions tab */}
              {activeTab === 'discussions' && (
                <div className="glass rounded-xl shadow-sm overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                    <h2 className="text-lg font-medium text-gray-900">Forum Discussions</h2>
                  </div>

                  <div className="divide-y divide-gray-200">
                    <AnimatePresence>
                      {filteredDiscussions.length > 0 ? (
                        filteredDiscussions.map((discussion) => (
                          <motion.div
                            key={discussion.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="p-6 hover:bg-gray-50 transition-colors duration-200"
                          >
                            <div className="flex">
                              <div className="flex-shrink-0 mr-4">
                                <img
                                  src={discussion.authorAvatar}
                                  alt={discussion.author}
                                  className="h-12 w-12 rounded-full object-cover"
                                />
                              </div>
                              
                              <div className="flex-1">
                                <h3 className="text-lg font-medium text-gray-900 mb-1">{discussion.title}</h3>
                                
                                <div className="flex items-center text-sm text-gray-500 mb-2">
                                  <span>{discussion.author}</span>
                                  <span className="mx-2">•</span>
                                  <span>{formatDate(discussion.date)}</span>
                                </div>
                                
                                <div className="flex flex-wrap gap-1 mb-3">
                                  {discussion.tags.map((tag, index) => (
                                    <span
                                      key={index}
                                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800"
                                    >
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                                
                                <p className="text-sm text-gray-600 mb-4">
                                  {discussion.preview}
                                </p>
                                
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center space-x-4">
                                    <button className="inline-flex items-center text-sm text-gray-500 hover:text-emerald-600">
                                      <ThumbsUp size={16} className="mr-1" />
                                      <span>{discussion.likes}</span>
                                    </button>
                                    
                                    <button className="inline-flex items-center text-sm text-gray-500 hover:text-emerald-600">
                                      <MessageCircle size={16} className="mr-1" />
                                      <span>{discussion.replies}</span>
                                    </button>
                                    
                                    <button className="inline-flex items-center text-sm text-gray-500 hover:text-emerald-600">
                                      <Share2 size={16} className="mr-1" />
                                      <span>Share</span>
                                    </button>
                                  </div>
                                  
                                  <button
                                    onClick={() => setExpandedDiscussion(expandedDiscussion === discussion.id ? null : discussion.id)}
                                    className="inline-flex items-center text-sm font-medium text-emerald-600 hover:text-emerald-500"
                                  >
                                    {expandedDiscussion === discussion.id ? (
                                      <>
                                        Hide replies
                                        <ChevronUp size={16} className="ml-1" />
                                      </>
                                    ) : (
                                      <>
                                        View replies
                                        <ChevronDown size={16} className="ml-1" />
                                      </>
                                    )}
                                  </button>
                                </div>
                                
                                {/* Expanded view with replies */}
                                <AnimatePresence>
                                  {expandedDiscussion === discussion.id && (
                                    <motion.div
                                      initial={{ opacity: 0, height: 0 }}
                                      animate={{ opacity: 1, height: 'auto' }}
                                      exit={{ opacity: 0, height: 0 }}
                                      transition={{ duration: 0.2 }}
                                      className="mt-4 pt-4 border-t border-gray-100"
                                    >
                                      <div className="space-y-4">
                                        {/* Sample replies */}
                                        <div className="flex">
                                          <div className="flex-shrink-0 mr-3">
                                            <img
                                              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                                              alt="User"
                                              className="h-8 w-8 rounded-full object-cover"
                                            />
                                          </div>
                                          <div>
                                            <div className="bg-gray-50 rounded-lg p-3">
                                              <div className="flex items-center text-xs text-gray-500 mb-1">
                                                <span className="font-medium text-gray-900">David Wilson</span>
                                                <span className="mx-1">•</span>
                                                <span>2 days ago</span>
                                              </div>
                                              <p className="text-sm text-gray-600">
                                                I applied for this scholarship last year and got it! Happy to share my experience if you have specific questions.
                                              </p>
                                            </div>
                                            <div className="flex items-center mt-1 ml-1 space-x-2">
                                              <button className="text-xs text-gray-500 hover:text-emerald-600">Like</button>
                                              <button className="text-xs text-gray-500 hover:text-emerald-600">Reply</button>
                                            </div>
                                          </div>
                                        </div>
                                        
                                        <div className="flex">
                                          <div className="flex-shrink-0 mr-3">
                                            <img
                                              src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                                              alt="User"
                                              className="h-8 w-8 rounded-full object-cover"
                                            />
                                          </div>
                                          <div>
                                            <div className="bg-gray-50 rounded-lg p-3">
                                              <div className="flex items-center text-xs text-gray-500 mb-1">
                                                <span className="font-medium text-gray-900">Emily Parker</span>
                                                <span className="mx-1">•</span>
                                                <span>1 day ago</span>
                                              </div>
                                              <p className="text-sm text-gray-600">
                                                The key is to start early and really personalize your essays for each scholarship. Generic applications rarely make it past the first round.
                                              </p>
                                            </div>
                                            <div className="flex items-center mt-1 ml-1 space-x-2">
                                              <button className="text-xs text-gray-500 hover:text-emerald-600">Like</button>
                                              <button className="text-xs text-gray-500 hover:text-emerald-600">Reply</button>
                                            </div>
                                          </div>
                                        </div>
                                        
                                        {/* Reply input */}
                                        <div className="flex mt-3">
                                          <div className="flex-shrink-0 mr-3">
                                            <div className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center">
                                              <User size={16} className="text-emerald-600" />
                                            </div>
                                          </div>
                                          <div className="flex-1">
                                            <input
                                              type="text"
                                              placeholder="Write a reply..."
                                              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>
                            </div>
                          </motion.div>
                        ))
                      ) : (
                        <div className="px-6 py-12 text-center">
                          <MessageSquare size={48} className="mx-auto text-gray-300 mb-4" />
                          <h3 className="text-lg font-medium text-gray-900 mb-1">No discussions found</h3>
                          <p className="text-sm text-gray-500">
                            {searchQuery
                              ? `No results for "${searchQuery}"`
                              : 'Start a new discussion to get the conversation going'}
                          </p>
                        </div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              )}
            </motion.div>

            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="md:col-span-1 space-y-6"
            >
              {/* Announcements */}
              <div className="glass rounded-xl shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                  <h2 className="text-lg font-medium text-gray-900">Announcements</h2>
                </div>
                
                <div className="divide-y divide-gray-200">
                  {mockAnnouncements.map((announcement) => (
                    <div key={announcement.id} className="p-4 hover:bg-gray-50">
                      <h3 className="text-sm font-medium text-gray-900 mb-1">{announcement.title}</h3>
                      <p className="text-xs text-gray-500 mb-2">{formatDate(announcement.date)}</p>
                      <p className="text-sm text-gray-600">{announcement.content}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Trending topics */}
              <div className="glass rounded-xl shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                  <h2 className="text-lg font-medium text-gray-900">Trending Topics</h2>
                </div>
                
                <div className="p-4">
                  <ul className="space-y-3">
                    <li>
                      <a href="#" className="flex items-center text-sm hover:text-emerald-600">
                        <span className="flex-shrink-0 w-5 text-gray-400">#1</span>
                        <span className="font-medium">FAFSA Changes 2025</span>
                        <ChevronRight size={16} className="ml-auto text-gray-400" />
                      </a>
                    </li>
                    <li>
                      <a href="#" className="flex items-center text-sm hover:text-emerald-600">
                        <span className="flex-shrink-0 w-5 text-gray-400">#2</span>
                        <span className="font-medium">Essay Writing Tips</span>
                        <ChevronRight size={16} className="ml-auto text-gray-400" />
                      </a>
                    </li>
                    <li>
                      <a href="#" className="flex items-center text-sm hover:text-emerald-600">
                        <span className="flex-shrink-0 w-5 text-gray-400">#3</span>
                         <span className="font-medium">International Scholarships</span>
                        <ChevronRight size={16} className="ml-auto text-gray-400" />
                      </a>
                    </li>
                    <li>
                      <a href="#" className="flex items-center text-sm hover:text-emerald-600">
                        <span className="flex-shrink-0 w-5 text-gray-400">#4</span>
                        <span className="font-medium">Scholarship Deadlines</span>
                        <ChevronRight size={16} className="ml-auto text-gray-400" />
                      </a>
                    </li>
                    <li>
                      <a href="#" className="flex items-center text-sm hover:text-emerald-600">
                        <span className="flex-shrink-0 w-5 text-gray-400">#5</span>
                        <span className="font-medium">Merit vs. Need-Based</span>
                        <ChevronRight size={16} className="ml-auto text-gray-400" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              
              {/* Calendar */}
              <div className="glass rounded-xl shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                  <h2 className="text-lg font-medium text-gray-900">Upcoming Deadlines</h2>
                </div>
                
                <div className="p-4">
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center mr-3">
                        <span className="text-xs font-medium text-red-800">APR 15</span>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">National Merit Scholarship</h3>
                        <p className="text-xs text-gray-500">Final application deadline</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center mr-3">
                        <span className="text-xs font-medium text-amber-800">APR 22</span>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">Gates Millennium Scholars</h3>
                        <p className="text-xs text-gray-500">Recommendation letters due</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center mr-3">
                        <span className="text-xs font-medium text-emerald-800">MAY 01</span>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">Fulbright Program</h3>
                        <p className="text-xs text-gray-500">Early application opens</p>
                      </div>
                    </li>
                  </ul>
                  
                  <button className="w-full mt-4 text-center text-sm font-medium text-emerald-600 hover:text-emerald-500">
                    View Full Calendar
                  </button>
                </div>
              </div>
              
              {/* Featured scholarship */}
              <div className="relative rounded-xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                  alt="Featured Scholarship" 
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="flex items-center mb-2">
                    <Award size={16} className="text-yellow-400 mr-1" />
                    <span className="text-xs font-medium text-yellow-400">FEATURED SCHOLARSHIP</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1">Global Leaders Scholarship</h3>
                  <p className="text-sm text-gray-200 mb-3">$50,000 award for international students</p>
                  <button className="inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700">
                    Learn More
                    <ExternalLink size={12} className="ml-1" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;