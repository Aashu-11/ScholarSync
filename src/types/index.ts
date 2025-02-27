export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface Scholarship {
  id: string;
  title: string;
  provider: string;
  amount: number;
  deadline: string;
  description: string;
  requirements: string[];
  matchScore: number;
  tags: string[];
  applicationLink?: string;
}

export interface Task {
  id: string;
  title: string;
  dueDate: string;
  completed: boolean;
  scholarshipId?: string;
  type: 'application' | 'document' | 'essay' | 'interview' | 'other';
}

export interface Document {
  id: string;
  name: string;
  type: 'transcript' | 'recommendation' | 'essay' | 'resume' | 'other';
  uploadDate: string;
  fileUrl: string;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  description: string;
  type: 'deadline' | 'webinar' | 'workshop' | 'other';
  link?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  message: string;
  timestamp: string;
}