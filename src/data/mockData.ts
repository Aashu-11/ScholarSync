import { Scholarship, Task, Document, Event, ChatMessage } from '../types';

export const scholarships: Scholarship[] = [
  {
    id: '1',
    title: 'Future Tech Leaders Scholarship',
    provider: 'TechFoundation',
    amount: 10000,
    deadline: '2025-06-15',
    description: 'For students pursuing degrees in computer science, AI, or related fields.',
    requirements: ['3.5+ GPA', 'Computer Science Major', 'Demonstrated leadership'],
    matchScore: 95,
    tags: ['tech', 'leadership', 'undergraduate']
  },
  {
    id: '2',
    title: 'Global Innovation Grant',
    provider: 'World Education Alliance',
    amount: 15000,
    deadline: '2025-05-30',
    description: 'Supporting students with innovative ideas to solve global challenges.',
    requirements: ['Research proposal', 'Letter of recommendation', 'Academic excellence'],
    matchScore: 87,
    tags: ['innovation', 'research', 'global']
  },
  {
    id: '3',
    title: 'Diversity in STEM Scholarship',
    provider: 'STEM Forward Initiative',
    amount: 12500,
    deadline: '2025-07-10',
    description: 'Promoting diversity in Science, Technology, Engineering, and Mathematics fields.',
    requirements: ['STEM major', 'Essay submission', 'Underrepresented group'],
    matchScore: 92,
    tags: ['stem', 'diversity', 'undergraduate']
  },
  {
    id: '4',
    title: 'Community Leadership Award',
    provider: 'Community Foundation',
    amount: 8000,
    deadline: '2025-06-01',
    description: 'For students who have demonstrated exceptional community service and leadership.',
    requirements: ['Community service record', 'Leadership essay', 'Two recommendations'],
    matchScore: 78,
    tags: ['community', 'leadership', 'service']
  },
  {
    id: '5',
    title: 'Future Entrepreneurs Grant',
    provider: 'Business Innovation Network',
    amount: 20000,
    deadline: '2025-05-15',
    description: 'Supporting students with entrepreneurial ambitions and business plans.',
    requirements: ['Business plan', 'Entrepreneurial experience', 'Business major preferred'],
    matchScore: 83,
    tags: ['business', 'entrepreneurship', 'innovation']
  }
];

export const tasks: Task[] = [
  {
    id: '1',
    title: 'Complete Future Tech Leaders application',
    dueDate: '2025-06-10',
    completed: false,
    scholarshipId: '1',
    type: 'application'
  },
  {
    id: '2',
    title: 'Request recommendation letter from Prof. Johnson',
    dueDate: '2025-05-15',
    completed: true,
    type: 'document'
  },
  {
    id: '3',
    title: 'Draft essay for Diversity in STEM Scholarship',
    dueDate: '2025-06-25',
    completed: false,
    scholarshipId: '3',
    type: 'essay'
  },
  {
    id: '4',
    title: 'Prepare for Global Innovation Grant interview',
    dueDate: '2025-05-20',
    completed: false,
    scholarshipId: '2',
    type: 'interview'
  },
  {
    id: '5',
    title: 'Update resume with recent achievements',
    dueDate: '2025-05-10',
    completed: false,
    type: 'document'
  }
];

export const documents: Document[] = [
  {
    id: '1',
    name: 'Academic Transcript',
    type: 'transcript',
    uploadDate: '2025-04-15',
    fileUrl: '/documents/transcript.pdf'
  },
  {
    id: '2',
    name: 'Prof. Smith Recommendation',
    type: 'recommendation',
    uploadDate: '2025-04-20',
    fileUrl: '/documents/recommendation1.pdf'
  },
  {
    id: '3',
    name: 'Leadership Essay',
    type: 'essay',
    uploadDate: '2025-04-22',
    fileUrl: '/documents/leadership_essay.pdf'
  },
  {
    id: '4',
    name: 'Current Resume',
    type: 'resume',
    uploadDate: '2025-04-10',
    fileUrl: '/documents/resume.pdf'
  }
];

export const events: Event[] = [
  {
    id: '1',
    title: 'Scholarship Application Workshop',
    date: '2025-05-12',
    time: '14:00',
    description: 'Learn tips and strategies for successful scholarship applications.',
    type: 'workshop',
    link: 'https://zoom.us/j/example'
  },
  {
    id: '2',
    title: 'Future Tech Leaders Deadline',
    date: '2025-06-15',
    time: '23:59',
    description: 'Final deadline for the Future Tech Leaders Scholarship application.',
    type: 'deadline'
  },
  {
    id: '3',
    title: 'Essay Writing Masterclass',
    date: '2025-05-18',
    time: '16:00',
    description: 'Expert guidance on writing compelling scholarship essays.',
    type: 'webinar',
    link: 'https://zoom.us/j/example2'
  },
  {
    id: '4',
    title: 'Interview Preparation Session',
    date: '2025-05-25',
    time: '15:30',
    description: 'Practice and prepare for scholarship interviews with industry professionals.',
    type: 'workshop',
    link: 'https://zoom.us/j/example3'
  }
];

export const chatMessages: ChatMessage[] = [
  {
    id: '1',
    sender: 'user',
    message: 'How do I improve my chances of getting the Tech Leaders Scholarship?',
    timestamp: '2025-04-25T14:30:00'
  },
  {
    id: '2',
    sender: 'ai',
    message: 'Based on your profile, I recommend highlighting your coding projects and leadership experience. The Tech Leaders Scholarship values technical skills and community impact. Would you like me to help you draft a compelling essay?',
    timestamp: '2025-04-25T14:31:00'
  },
  {
    id: '3',
    sender: 'user',
    message: 'Yes, that would be helpful. What should I include in my essay?',
    timestamp: '2025-04-25T14:32:00'
  },
  {
    id: '4',
    sender: 'ai',
    message: 'Great! For the Tech Leaders Scholarship essay, focus on these key elements: 1) Your passion for technology and how it developed, 2) A specific project that demonstrates your technical skills, 3) How you\'ve shown leadership in tech contexts, and 4) Your future goals and how this scholarship will help you achieve them. Would you like me to generate a draft outline based on your profile information?',
    timestamp: '2025-04-25T14:33:00'
  }
];