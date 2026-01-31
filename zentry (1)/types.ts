
export type Screen = 
  | 'login' 
  | 'dashboard' 
  | 'sales' 
  | 'projects' 
  | 'company' 
  | 'sites' 
  | 'hr' 
  | 'marketing' 
  | 'automation'
  | 'profile'
  | 'settings'
  | 'email'; // New screen

export interface PerformanceMetric {
  kpi: number; // 0-100
  technicalGrowth: number; // 0-100
  collaboration: number; // 0-100
  reliability: number; // 0-100
}

export interface Email {
  id: string;
  sender: string;
  subject: string;
  preview: string;
  timestamp: string;
  read: boolean;
  starred: boolean;
  type: 'incoming' | 'outgoing' | 'archived';
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: string;
  avatar: string;
  email: string;
  phone: string;
  location: string;
  skills?: string[];
  experience?: string;
  cloudStorage?: string;
  performance?: PerformanceMetric; // New
  socialLinks?: {
    linkedin?: string;
    github?: string;
    instagram?: string;
    youtube?: string;
    whatsapp?: string;
    telegram?: string;
  };
}

export interface FileEntry {
  id: string;
  name: string;
  size: string;
  type: string;
  uploadedBy: string;
  timestamp: string;
  url: string;
  category: 'image' | 'video' | 'document' | 'other';
}

export interface Deal {
  id: string;
  title: string;
  company: string;
  amount: number;
  stage: 'lead' | 'qualified' | 'proposal' | 'won' | 'lost';
  contact: string;
}

export interface MarketingCampaign {
  id: string;
  name: string;
  status: 'Active' | 'Draft' | 'Paused' | 'Ended' | 'Deactivated';
  budget: string;
  reach: string;
  conversions: string;
  roi: string;
  reviews?: string[];
  lastLaunched?: string;
}

export interface AutomationFlow {
  id: string;
  name: string;
  trigger: string;
  action: string;
  status: 'Running' | 'Paused';
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: string;
  read: boolean;
}

export interface Site {
  id: string;
  name: string;
  url: string;
  type: 'Site' | 'Store';
  visitors: string;
  status: 'Published' | 'Draft' | 'Deploying';
}

export interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  isAi?: boolean;
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  company: string;
  status: 'deal' | 'lead' | 'contact';
  value: number;
}

export interface Comment {
  id: string;
  author: string;
  avatar: string;
  content: string;
  timestamp: string;
}

export interface FeedPost {
  id: string;
  author: string;
  avatar: string;
  content: string;
  image?: string;
  video?: string;
  timestamp: string;
  likes: number;
  likedBy: string[];
  comments: Comment[];
}

export interface Invoice {
  id: string;
  customer: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
  dueDate: string;
}

// Added missing interface definitions for Task, Project and TimeLog
export interface TimeLog {
  id: string;
  duration: number;
  timestamp: string;
}

export interface Task {
  id: string;
  projectId: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'review' | 'done';
  priority: 'low' | 'medium' | 'high';
  assignee: string;
  dueDate: string;
  timeLogs: TimeLog[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: string;
  members: string[];
  stakeholders?: {
    sponsor?: string;
    lead?: string;
    owner?: string;
  };
  client: string;
  budget: number;
  growth: number;
  deadline: string;
}
