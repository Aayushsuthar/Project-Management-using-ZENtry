
import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Briefcase, 
  MessageSquare, 
  Globe, 
  ShieldCheck, 
  Megaphone, 
  Zap,
  DollarSign,
  Mail,
  UserCircle
} from 'lucide-react';
import { Task, Deal, FeedPost, Contact, TeamMember, Project, MarketingCampaign, AutomationFlow } from './types';

export const NAVIGATION = [
  { id: 'dashboard', name: 'Dashboard', icon: <LayoutDashboard size={20} />, category: 'Main' },
  { id: 'email', name: 'Comms Vector', icon: <Mail size={20} />, category: 'Main' }, // Added
  { id: 'sales', name: 'Sales & CRM', icon: <DollarSign size={20} />, category: 'Business' },
  { id: 'projects', name: 'Tasks & Projects', icon: <Briefcase size={20} />, category: 'Business' },
  { id: 'company', name: 'Collaboration', icon: <MessageSquare size={20} />, category: 'Main' },
  { id: 'marketing', name: 'Marketing', icon: <Megaphone size={20} />, category: 'Business' },
  { id: 'sites', name: 'Sites & Stores', icon: <Globe size={20} />, category: 'Digital' },
  { id: 'hr', name: 'HR & People', icon: <Users size={20} />, category: 'Company' },
  { id: 'automation', name: 'Automation', icon: <Zap size={20} />, category: 'Company' },
];

export const MOCK_TEAM: TeamMember[] = [
  { 
    id: '1', 
    name: 'Abhinav Sharma', 
    role: 'CEO & Founder', 
    department: 'Leadership', 
    avatar: 'https://i.pravatar.cc/150?u=abhinav', 
    email: 'abhinav@zentry.io', 
    phone: '+91 98765 43210', 
    location: 'Mumbai', 
    skills: ['Strategy', 'Capital Markets', 'Enterprise AI'],
    experience: '12 Years',
    performance: { kpi: 98, technicalGrowth: 95, collaboration: 99, reliability: 100 },
    socialLinks: { linkedin: 'https://linkedin.com/in/abhinav', github: 'https://github.com/abhinav', whatsapp: '+919876543210' } 
  },
  { 
    id: '2', 
    name: 'Anushka Iyer', 
    role: 'Head of Product', 
    department: 'Product', 
    avatar: 'https://i.pravatar.cc/150?u=anushka', 
    email: 'anushka@zentry.io', 
    phone: '+91 98765 43211', 
    location: 'Bangalore', 
    skills: ['Product Design', 'Agile', 'UX Architecture'],
    experience: '8 Years',
    performance: { kpi: 92, technicalGrowth: 88, collaboration: 95, reliability: 94 },
    socialLinks: { linkedin: 'https://linkedin.com/in/anushka', instagram: 'https://instagram.com/anushka', whatsapp: '+919876543211' } 
  },
  { 
    id: '3', 
    name: 'Keshav Verma', 
    role: 'Senior Engineer', 
    department: 'Engineering', 
    avatar: 'https://i.pravatar.cc/150?u=keshav', 
    email: 'keshav@zentry.io', 
    phone: '+91 98765 43212', 
    location: 'Pune', 
    skills: ['React', 'PostgreSQL', 'Cloud Infrastructure'],
    experience: '6 Years',
    performance: { kpi: 96, technicalGrowth: 98, collaboration: 85, reliability: 98 },
    socialLinks: { github: 'https://github.com/keshav', linkedin: 'https://linkedin.com/in/keshav', telegram: '@keshav_v' } 
  }
];

export const MOCK_EMAILS = [
  { id: '1', sender: 'Reliance Infra', subject: 'Q4 Agreement Signed', preview: 'We have reviewed the latest ERP proposal and authorized the budget...', timestamp: '10:45 AM', read: false, starred: true, type: 'incoming' },
  { id: '2', sender: 'Keshav Verma', subject: 'Cluster Deploy Successful', preview: 'All regional nodes for Zentry 2.0 are now online and synchronized...', timestamp: '9:12 AM', read: true, starred: false, type: 'incoming' },
  { id: '3', sender: 'HR Dept', subject: 'Monthly Performance Review', preview: 'Your growth metrics for the last 30 days are now available in the hub...', timestamp: 'Yesterday', read: true, starred: false, type: 'incoming' },
];

export const MOCK_PROJECTS: Project[] = [
  { id: 'p1', name: 'Zentry 2.0 Launch', description: 'Internal platform upgrade for industrial scaling.', status: 'active', members: ['Abhinav', 'Anushka'], stakeholders: { sponsor: 'Abhinav Sharma', lead: 'Anushka Iyer', owner: 'Keshav Verma' }, client: 'Internal', budget: 0, growth: 75, deadline: '2024-06-30' },
  { id: 'p2', name: 'Reliance ERP', description: 'Enterprise resource planning for Reliance infrastructure.', status: 'active', members: ['Keshav', 'Mohit'], stakeholders: { sponsor: 'Mohit Gupta', lead: 'Keshav Verma', owner: 'Abhinav Sharma' }, client: 'Reliance Ind.', budget: 450000, growth: 30, deadline: '2024-09-15' }
];

export const MOCK_DEALS: Deal[] = [
  { id: '1', title: 'ERP Implementation', company: 'Reliance Ind.', amount: 450000, stage: 'proposal', contact: 'Abhinav Sharma' },
  { id: '2', title: 'Cloud Migration', company: 'Tata Consultancy', amount: 120000, stage: 'won', contact: 'Keshav Verma' },
];

export const MOCK_TASKS: Task[] = [
  { id: '1', projectId: 'p1', title: 'Review GST Compliance', description: 'Ensure all Q4 invoices are aligned.', status: 'in-progress', priority: 'high', assignee: 'Abhinav Sharma', dueDate: '2024-05-15', timeLogs: [] },
  { id: '2', projectId: 'p1', title: 'Investor Pitch Deck', description: 'Finalize the slides.', status: 'todo', priority: 'medium', assignee: 'Anushka Iyer', dueDate: '2024-05-20', timeLogs: [] },
];

export const MOCK_FEED = [
  { id: '1', author: 'Abhinav Sharma', avatar: 'https://i.pravatar.cc/150?u=abhinav', content: 'Excited to announce our new ERP upgrade is live!', timestamp: '2h ago', likes: 12, likedBy: [], comments: [] },
];

export const MOCK_CONTACTS: Contact[] = [
  { id: '1', name: 'Abhinav Sharma', email: 'abhinav@reliance.com', company: 'Reliance Ind.', status: 'deal', value: 450000 },
];

export const MOCK_CAMPAIGNS: MarketingCampaign[] = [
  { id: '1', name: 'Q1 Outreach', status: 'Active', budget: '₹50,000', reach: '12,500', conversions: '450', roi: '+12%' },
];

export const MOCK_FLOWS: AutomationFlow[] = [
  { id: '1', name: 'Lead Welcome', trigger: 'New CRM Lead', action: 'Send Welcome Email', status: 'Running' },
];

export const COLORS = { primary: '#0d9488', secondary: '#2563eb', danger: '#e11d48', slate: '#64748b' };
