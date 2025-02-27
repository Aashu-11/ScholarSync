import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, Filter, Award, Calendar, DollarSign, 
  BookOpen, MapPin, GraduationCap, ChevronDown, ChevronUp,
  Star, ExternalLink, Share2, BookmarkPlus
} from 'lucide-react';
import Sidebar from '../components/Sidebar';

const scholarshipsData = [
  {
    id: 1,
    title: "Gates Millennium Scholars Program",
    provider: "Bill & Melinda Gates Foundation",
    amount: "$10,000",
    deadline: "May 15, 2025",
    category: "Merit-Based",
    eligibility: ["3.5+ GPA", "Minority Students"],
    description: "The Gates Millennium Scholars Program provides outstanding African American, American Indian/Alaska Native, Asian Pacific Islander American, and Hispanic American students with an opportunity to complete an undergraduate college education.",
    logo: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    match: 98,
    location: "Nationwide",
    field: "Any Field of Study"
  },
  {
    id: 2,
    title: "Coca-Cola Scholars Foundation",
    provider: "The Coca-Cola Company",
    amount: "$20,000",
    deadline: "June 1, 2025",
    category: "Leadership",
    eligibility: ["3.0+ GPA", "Leadership Activities"],
    description: "The Coca-Cola Scholars Program scholarship is an achievement-based scholarship awarded to graduating high school seniors. Students are recognized for their capacity to lead and serve, as well as their commitment to making a significant impact on their schools and communities.",
    logo: "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    match: 95,
    location: "United States",
    field: "Business, Leadership"
  },
  {
    id: 3,
    title: "Dell Scholars Program",
    provider: "Michael & Susan Dell Foundation",
    amount: "$15,000",
    deadline: "June 10, 2025",
    category: "Need-Based",
    eligibility: ["2.8+ GPA", "Financial Need"],
    description: "The Dell Scholars Program recognizes students who have overcome significant obstacles to pursue their educations. The scholarship is designed to support students who demonstrate a desire and ability to succeed.",
    logo: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    match: 92,
    location: "United States",
    field: "Any Field of Study"
  },
  {
    id: 4,
    title: "Thiel Fellowship",
    provider: "Thiel Foundation",
    amount: "$100,000",
    deadline: "July 1, 2025",
    category: "Entrepreneurship",
    eligibility: ["Under 23", "Innovative Project"],
    description: "The Thiel Fellowship is a two-year program for young people who want to build new things. Fellows receive $100,000 and support from the Thiel Foundation's network of founders, investors, and scientists.",
    logo: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    match: 88,
    location: "Global",
    field: "Technology, Entrepreneurship"
  },
  {
    id: 5,
    title: "Jack Kent Cooke Foundation Scholarship",
    provider: "Jack Kent Cooke Foundation",
    amount: "$40,000",
    deadline: "July 15, 2025",
    category: "Merit-Based",
    eligibility: ["3.5+ GPA", "Financial Need"],
    description: "The Jack Kent Cooke Foundation College Scholarship Program is an undergraduate scholarship program available to high-achieving high school seniors with financial need who seek to attend and graduate from the nation's best four-year colleges and universities.",
    logo: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    match: 85,
    location: "United States",
    field: "Any Field of Study"
  },
  {
    id: 6,
    title: "Hispanic Scholarship Fund",
    provider: "Hispanic Scholarship Fund",
    amount: "$5,000",
    deadline: "August 5, 2025",
    category: "Minority",
    eligibility: ["3.0+ GPA", "Hispanic Heritage"],
    description: "The HSF Scholarship is designed to assist students of Hispanic heritage obtain a university degree. Awards are based on merit; amounts range from $500 to $5,000, based on relative need, among the scholars selected.",
    logo: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    match: 90,
    location: "United States",
    field: "Any Field of Study"
  },
  {
    id: 7,
    title: "STEM Excellence Scholarship",
    provider: "National Science Foundation",
    amount: "$25,000",
    deadline: "August 20, 2025",
    category: "STEM",
    eligibility: ["3.7+ GPA", "STEM Major"],
    description: "The STEM Excellence Scholarship supports outstanding students pursuing degrees in science, technology, engineering, and mathematics fields. Recipients demonstrate exceptional academic achievement and potential for innovation.",
    logo: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    match: 94,
    location: "United States",
    field: "Science, Technology, Engineering, Mathematics"
  },
  {
    id: 8,
    title: "Future Leaders Scholarship",
    provider: "Global Leadership Foundation",
    amount: "$12,000",
    deadline: "September 1, 2025",
    category: "Leadership",
    eligibility: ["3.2+ GPA", "Community Service"],
    description: "The Future Leaders Scholarship recognizes students who have demonstrated exceptional leadership potential through community service, extracurricular activities, and academic excellence.",
    logo: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    match: 87,
    location: "Global",
    field: "Leadership, Public Policy, International Relations"
  }
];
const ScholarshipFinder: React.FC = () => {
  // States remain unchanged
  const [searchTerm, setSearchTerm] = useState('');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedAmount, setSelectedAmount] = useState<string | null>(null);
  const [selectedEligibility, setSelectedEligibility] = useState<string | null>(null);
  const [expandedScholarship, setExpandedScholarship] = useState<number | null>(null);
  const [savedScholarships, setSavedScholarships] = useState<number[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  // Add state to track which card is flipped
  const [flippedCard, setFlippedCard] = useState<number | null>(null);
  
  // Function to handle flipping a card
  const handleCardFlip = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setFlippedCard(flippedCard === id ? null : id);
  };
  
  // Rest of the filter functions remain unchanged
  interface Scholarship {
    id: number;
    title: string;
    provider: string;
    amount: string;
    deadline: string;
    location: string;
    field: string;
    description: string;
    category: string;
    eligibility: string[];
    logo: string;
    match: number;
  }

  interface FilterCriteria {
    searchTerm: string;
    selectedCategory: string | null;
    selectedAmount: string | null;
    selectedEligibility: string | null;
  }

  const filteredScholarships: Scholarship[] = scholarshipsData.filter((scholarship: Scholarship) => {
    const matchesSearch: boolean = scholarship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                   scholarship.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                   scholarship.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory: boolean = !selectedCategory || scholarship.category === selectedCategory;
    
    const matchesAmount: boolean = !selectedAmount || 
      (selectedAmount === 'under5k' && parseInt(scholarship.amount.replace(/\D/g, '')) < 5000) ||
      (selectedAmount === '5k-10k' && parseInt(scholarship.amount.replace(/\D/g, '')) >= 5000 && parseInt(scholarship.amount.replace(/\D/g, '')) <= 10000) ||
      (selectedAmount === '10k-20k' && parseInt(scholarship.amount.replace(/\D/g, '')) > 10000 && parseInt(scholarship.amount.replace(/\D/g, '')) <= 20000) ||
      (selectedAmount === 'over20k' && parseInt(scholarship.amount.replace(/\D/g, '')) > 20000);
    
    const matchesEligibility: boolean = !selectedEligibility || scholarship.eligibility.includes(selectedEligibility);
    
    return matchesSearch && matchesCategory && matchesAmount && matchesEligibility;
  });
  
  const toggleFilters = () => {
    setFiltersOpen(!filtersOpen);
  };
  
  const resetFilters = () => {
    setSelectedCategory(null);
    setSelectedAmount(null);
    setSelectedEligibility(null);
  };
  
  const toggleScholarshipExpand = (id: number) => {
    setExpandedScholarship(expandedScholarship === id ? null : id);
  };
  
  const toggleSaveScholarship = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (savedScholarships.includes(id)) {
      setSavedScholarships(savedScholarships.filter(scholarshipId => scholarshipId !== id));
    } else {
      setSavedScholarships([...savedScholarships, id]);
    }
  };
  
  const categories = ["Merit-Based", "Need-Based", "Leadership", "Entrepreneurship", "Minority", "STEM"];
  const amountRanges = [
    { value: "under5k", label: "Under $5,000" },
    { value: "5k-10k", label: "$5,000 - $10,000" },
    { value: "10k-20k", label: "$10,000 - $20,000" },
    { value: "over20k", label: "Over $20,000" },
  ];
  const eligibilityCriteria = ["3.0+ GPA", "3.5+ GPA", "Financial Need", "Minority Students", "Leadership Activities"];

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-background">
    {/* CSS for the improved flip cards */}
    <style>{`
      .flip-card-container {
        perspective: 1000px;
        z-index: 1;
        transition: z-index 0s 0.15s;
        height: 400px; /* Fixed height */
        overflow: hidden; /* Hide overflowing content */
        border: 2px solid darkgreen; /* Dark green border */
        border-radius: 15px; /* Rounded corners */
      }
      
      .flip-card-container.flipped {
        z-index: 10;
        transition: z-index 0s;
      }
      
      .flip-card {
        position: relative;
        transform-style: preserve-3d;
        transition: transform 0.6s;
        height: 100%;
        width: 100%;
      }
      
      .flip-card-container.flipped .flip-card {
        transform: rotateY(180deg);
      }
      
      .flip-card-front,
      .flip-card-back {
        position: absolute;
        width: 100%;
        height: 100%;
        backface-visibility: hidden;
        -webkit-backface-visibility: hidden;
        padding: 16px; /* Add padding */
        box-sizing: border-box; /* Ensure padding is included in width/height */
      }
      
      .flip-card-back {
        transform: rotateY(180deg);
      }
    `}</style>
      <Sidebar />
      
      <div className="lg:ml-[240px] p-4 md:p-8">
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-display font-bold primary-gradient-text">
            Scholarship Finder
          </h1>
          <p className="text-gray-600 mt-2">
            Discover scholarships tailored to your profile and interests
          </p>
        </motion.div>
        
        {/* Search and Filter Bar */}
        <motion.div 
          className="glassmorphism p-4 rounded-xl mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-3 w-full rounded-lg glassmorphism focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
                placeholder="Search scholarships by name, provider, or keywords..."
              />
            </div>
            
            <button
              onClick={toggleFilters}
              className="flex items-center justify-center px-4 py-3 rounded-lg glassmorphism hover:bg-primary-50 transition-colors"
            >
              <Filter className="h-5 w-5 mr-2 text-primary-600" />
              <span>Filters</span>
              {filtersOpen ? 
                <ChevronUp className="h-4 w-4 ml-2" /> : 
                <ChevronDown className="h-4 w-4 ml-2" />
              }
            </button>
            
            <div className="flex space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-3 rounded-lg ${viewMode === 'grid' ? 'bg-primary-500 text-white' : 'glassmorphism'}`}
              >
                <div className="grid grid-cols-2 gap-1">
                  <div className="w-2 h-2 bg-current rounded-sm"></div>
                  <div className="w-2 h-2 bg-current rounded-sm"></div>
                  <div className="w-2 h-2 bg-current rounded-sm"></div>
                  <div className="w-2 h-2 bg-current rounded-sm"></div>
                </div>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-3 rounded-lg ${viewMode === 'list' ? 'bg-primary-500 text-white' : 'glassmorphism'}`}
              >
                <div className="flex flex-col space-y-1">
                  <div className="w-4 h-1 bg-current rounded-sm"></div>
                  <div className="w-4 h-1 bg-current rounded-sm"></div>
                  <div className="w-4 h-1 bg-current rounded-sm"></div>
                </div>
              </button>
            </div>
          </div>
          
          {/* Expanded Filters */}
          {filtersOpen && (
            <motion.div 
              className="mt-4 pt-4 border-t border-gray-200"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h3 className="text-sm font-medium mb-2 flex items-center">
                    <BookOpen className="w-4 h-4 mr-2 text-primary-600" />
                    Category
                  </h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
                        className={`px-3 py-1.5 rounded-full text-sm ${
                          selectedCategory === category 
                            ? 'bg-primary-500 text-white' 
                            : 'glassmorphism hover:bg-primary-50'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-2 flex items-center">
                    <DollarSign className="w-4 h-4 mr-2 text-primary-600" />
                    Amount
                  </h3>
                  <div className="space-y-2">
                    {amountRanges.map((range) => (
                      <button
                        key={range.value}
                        onClick={() => setSelectedAmount(selectedAmount === range.value ? null : range.value)}
                        className={`px-3 py-1.5 rounded-full text-sm ${
                          selectedAmount === range.value 
                            ? 'bg-primary-500 text-white' 
                            : 'glassmorphism hover:bg-primary-50'
                        }`}
                      >
                        {range.label}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-2 flex items-center">
                    <GraduationCap className="w-4 h-4 mr-2 text-primary-600" />
                    Eligibility
                  </h3>
                  <div className="space-y-2">
                    {eligibilityCriteria.map((criteria) => (
                      <button
                        key={criteria}
                        onClick={() => setSelectedEligibility(selectedEligibility === criteria ? null : criteria)}
                        className={`px-3 py-1.5 rounded-full text-sm ${
                          selectedEligibility === criteria 
                            ? 'bg-primary-500 text-white' 
                            : 'glassmorphism hover:bg-primary-50'
                        }`}
                      >
                        {criteria}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end mt-4">
                <button
                  onClick={resetFilters}
                  className="px-4 py-2 text-sm text-primary-600 hover:underline"
                >
                  Reset Filters
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>
        
        {/* Results Count */}
        <motion.div 
          className="mb-6 flex justify-between items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-gray-600">
            Showing <span className="font-medium">{filteredScholarships.length}</span> scholarships
          </p>
          <div className="flex items-center">
            <span className="text-sm text-gray-500 mr-2">Sort by:</span>
            <select className="glassmorphism px-3 py-1.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500">
              <option>Match Score</option>
              <option>Deadline (Soonest)</option>
              <option>Amount (Highest)</option>
              <option>Recently Added</option>
            </select>
          </div>
        </motion.div>
        
        {/* Scholarships Grid/List */}
        {viewMode === 'grid' ? (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {filteredScholarships.map((scholarship) => (
              <motion.div 
                key={scholarship.id}
                className={`flip-card-container h-[320px] ${flippedCard === scholarship.id ? 'flipped' : ''}`}
                variants={item}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flip-card h-full w-full">
                  {/* Front of Card */}
                  <div className="flip-card-front glassmorphism rounded-xl p-6 flex flex-col relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-2">
                      <button 
                        onClick={(e) => toggleSaveScholarship(scholarship.id, e)}
                        className={`p-1.5 rounded-full ${savedScholarships.includes(scholarship.id) ? 'bg-primary-100 text-primary-600' : 'bg-gray-100 text-gray-400'}`}
                      >
                        <BookmarkPlus className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 rounded-full overflow-hidden mr-4 flex-shrink-0">
                        <img 
                          src={scholarship.logo} 
                          alt={scholarship.provider} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium text-lg line-clamp-1">{scholarship.title}</h3>
                        <p className="text-sm text-gray-600">{scholarship.provider}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center mb-3">
                      <DollarSign className="w-4 h-4 text-green-600 mr-1" />
                      <span className="text-sm font-medium">{scholarship.amount}</span>
                    </div>
                    
                    <div className="flex items-center mb-3">
                      <Calendar className="w-4 h-4 text-red-600 mr-1" />
                      <span className="text-sm">Deadline: {scholarship.deadline}</span>
                    </div>
                    
                    <div className="flex items-center mb-3">
                      <MapPin className="w-4 h-4 text-blue-600 mr-1" />
                      <span className="text-sm">{scholarship.location}</span>
                    </div>
                    
                    <div className="flex items-center mb-4">
                      <GraduationCap className="w-4 h-4 text-purple-600 mr-1" />
                      <span className="text-sm line-clamp-1">{scholarship.field}</span>
                    </div>
                    
                    <p className="text-sm text-gray-600 line-clamp-2 mb-4">{scholarship.description}</p>
                    
                    <div className="mt-auto flex items-center justify-between">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <Star className="w-3 h-3 mr-1 text-yellow-500" fill="currentColor" />
                        {scholarship.match}% Match
                      </span>
                      <button 
                        className="text-xs text-primary-600 hover:underline flex items-center"
                        onClick={(e) => handleCardFlip(scholarship.id, e)}
                      >
                        View details
                        <ChevronDown className="w-3 h-3 ml-1" />
                      </button>
                    </div>
                  </div>
                  
                  {/* Back of Card */}
                  <div className="flip-card-back glassmorphism rounded-xl p-6 flex flex-col">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-medium text-lg">{scholarship.title}</h3>
                      <button 
                        className="text-gray-400 hover:text-primary-600"
                        onClick={(e) => handleCardFlip(scholarship.id, e)}
                      >
                        <ChevronUp className="w-5 h-5" />
                      </button>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-4">{scholarship.description}</p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center">
                        <span className="text-xs font-medium w-24">Category:</span>
                        <span className="text-xs bg-primary-100 text-primary-800 px-2 py-0.5 rounded-full">{scholarship.category}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-xs font-medium w-24">Eligibility:</span>
                        <span className="text-xs">{scholarship.eligibility}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-xs font-medium w-24">Field of Study:</span>
                        <span className="text-xs">{scholarship.field}</span>
                      </div>
                    </div>
                    
                    <div className="mt-auto space-y-2">
                      <button className="w-full py-2 primary-gradient text-white rounded-lg text-sm font-medium flex items-center justify-center button-glow">
                        Apply Now
                        <ExternalLink className="w-3 h-3 ml-1" />
                      </button>
                      <div className="flex space-x-2">
                        <button className="flex-1 py-2 glassmorphism hover:bg-primary-50 rounded-lg text-sm font-medium">
                          Generate Application
                        </button>
                        <button className="flex items-center justify-center p-2 glassmorphism hover:bg-primary-50 rounded-lg">
                          <Share2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          // List view remains unchanged
          <motion.div 
            className="space-y-4"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {filteredScholarships.map((scholarship) => (
              <motion.div 
                key={scholarship.id}
                className="glassmorphism rounded-xl overflow-hidden"
                variants={item}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <div 
                  className="p-6 cursor-pointer"
                  onClick={() => toggleScholarshipExpand(scholarship.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                        <img 
                          src={scholarship.logo} 
                          alt={scholarship.provider} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium text-lg">{scholarship.title}</h3>
                        <p className="text-sm text-gray-600">{scholarship.provider}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <Star className="w-3 h-3 mr-1 text-yellow-500" fill="currentColor" />
                        {scholarship.match}% Match
                      </span>
                      <button 
                        onClick={(e) => toggleSaveScholarship(scholarship.id, e)}
                        className={`p-1.5 rounded-full ${savedScholarships.includes(scholarship.id) ? 'bg-primary-100 text-primary-600' : 'bg-gray-100 text-gray-400'}`}
                      >
                        <BookmarkPlus className="w-4 h-4" />
                      </button>
                      {expandedScholarship === scholarship.id ? 
                        <ChevronUp className="w-5 h-5 text-gray-400" /> : 
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      }
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <div className="flex items-center">
                      <DollarSign className="w-4 h-4 text-green-600 mr-1" />
                      <span className="text-sm">{scholarship.amount}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 text-red-600 mr-1" />
                      <span className="text-sm">Deadline: {scholarship.deadline}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <GraduationCap className="w-4 h-4 text-purple-600 mr-1" />
                      <span className="text-sm">{scholarship.category}</span>
                    </div>
                  </div>
                </div>
                
                {expandedScholarship === scholarship.id && (
                  <motion.div 
                    className="px-6 pb-6 border-t border-gray-200 pt-4"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-sm text-gray-600 mb-4">{scholarship.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                      <div>
                        <h4 className="text-xs font-medium text-gray-500 mb-1">Eligibility</h4>
                        <p className="text-sm">{scholarship.eligibility}</p>
                      </div>
                      <div>
                        <h4 className="text-xs font-medium text-gray-500 mb-1">Location</h4>
                        <p className="text-sm">{scholarship.location}</p>
                      </div>
                      <div>
                        <h4 className="text-xs font-medium text-gray-500 mb-1">Field of Study</h4>
                        <p className="text-sm">{scholarship.field}</p>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      <button className="px-4 py-2 primary-gradient text-white rounded-lg text-sm font-medium flex items-center button-glow">
                        Apply Now
                        <ExternalLink className="w-3 h-3 ml-1" />
                      </button>
                      <button className="px-4 py-2 glassmorphism hover:bg-primary-50 rounded-lg text-sm font-medium">
                        Generate Application
                      </button>
                      <button className="px-4 py-2 glassmorphism hover:bg-primary-50 rounded-lg text-sm font-medium flex items-center">
                        <Share2 className="w-4 h-4 mr-1" />
                        Share
                      </button>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
        
        {/* No Results */}
        {filteredScholarships.length === 0 && (
          <motion.div 
            className="glassmorphism rounded-xl p-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium mb-2">No scholarships found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search or filters to find more scholarships.</p>
            <button 
              onClick={resetFilters}
              className="px-4 py-2 primary-gradient text-white rounded-lg text-sm font-medium"
            >
              Reset Filters
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ScholarshipFinder;