# ZENtry - Enterprise Industrial OS

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) ![React Version](https://img.shields.io/badge/React-19.2.4-blue) ![TypeScript Version](https://img.shields.io/badge/TypeScript-5.8.2-blue) ![Vite Version](https://img.shields.io/badge/Vite-6.2.0-brightgreen)

## 🚀 Overview

**ZENtry** is an all-in-one business management platform that unifies CRM, project management, team collaboration, HR automation, and marketing tools into a single, intuitive interface. Powered by advanced AI capabilities, ZENtry enhances productivity with intelligent automation and real-time assistance.

---

## ✨ Key Features

### 🎯 Core Modules

- **📊 Command Center (Dashboard)** - Global operational pulse with real-time analytics showing fiscal magnitude, operational load, resource time, and global reach metrics
- **👥 Relations (CRM & Sales)** - Complete entity oversight with AI-powered confidence scoring, deal pipeline tracking, and conversion analytics
- **📋 ZENtry Ops (Project Management)** - Task tracking with temporal filtering, AI retrospectives, and team collaboration
- **💬 Enterprise Comms (Messenger)** - Encrypted team communication with real-time chat and AI context analysis
- **📧 Contact Center** - Unified email management and customer support hub
- **🏢 Expertise Matrix (HR Management)** - Operational specialists management with merit-based performance tracking and talent oversight
- **📱 Marketing** - Campaign management and analytics dashboard
- **⚙️ Business Automation** - AI-driven workflow optimization with active logic gates and execution tracking
- **🌐 Sites** - Website and content management system
- **🗄️ ZENtry.Drive** - Distributed asset repository with 4.2TB+ active storage
- **📰 Global Pulse (Intranet Feed)** - Company-wide communication feed with AI summarization and kudos ledger

### 🤖 AI-Powered Features

- **ZENtry CoPilot** - Contextual AI assistant with full business context awareness
- **Smart Lead Scoring** - Automated confidence-based lead qualification (up to 99% accuracy)
- **Email Drafting** - AI-generated professional email templates
- **Task Description Generation** - Intelligent task breakdown and planning
- **Meeting Transcription** - Audio-to-text conversion and meeting summaries
- **Sprint Retrospectives** - Automated project analysis and improvement insights
- **AI Summarization** - Automatic content summarization for Global Pulse updates
- **Workflow Optimization** - AI-identified bottlenecks and automation suggestions

---

## 🛠️ Tech Stack

- **Frontend Framework:** React 19.2.4
- **Language:** TypeScript 5.8.2
- **Build Tool:** Vite 6.2.0
- **AI Integration:** Google Gemini AI (via @google/genai)
- **UI Components:** Lucide React Icons
- **Charts:** Recharts 3.7.0
- **Styling:** Tailwind CSS (utility-first approach)

---

## 📦 Installation

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Gemini API Key

### Setup Steps

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/zentry.git
   cd zentry
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**

   Create a `.env.local` file in the root directory:

   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

   To obtain a Gemini API key, visit the Gemini API documentation and follow the setup instructions.

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. **Access the application**

   Open your browser and navigate to `http://localhost:5173`

---

## 🎮 Usage

### Default Login Credentials

For demo purposes, use these credentials:

- **Email:** `abhinav@zentry.io`
- **Password:** `********` (any password will work in demo mode)

### Navigation

The platform features a sidebar with quick access to all modules:

#### CORE

- **Command Center** - Home view with key metrics and operational pulse
- **Contact Center** - Email management hub
- **Enterprise Comms** - Team messaging and collaboration

#### BUSINESS

- **CRM & Sales** - Customer relationship and deal management
- **Tasks & Projects** - ZENtry Ops project tracking
- **Warehouse Hub** - Storage matrix and asset management

#### COLLAB

- **ZENtry.Drive** - Distributed asset repository (4.2TB active)
- **Intranet Feed** - Global Pulse company-wide updates

#### ADMIN

- **Personnel & SOP** - Expertise Matrix and HR management

### AI CoPilot

Access the AI assistant by clicking the "COPILOT ASSISTANT" button in the sidebar. The CoPilot can help with:

- Analyzing project status and providing next steps
- Generating task descriptions and breakdowns
- Scoring leads and providing conversion insights
- Drafting professional emails
- Creating meeting summaries
- Analyzing project performance and retrospectives
- Optimizing business workflows

---

## 📁 Project Structure

```
zentry/
├── components/           # React components
│   ├── Layout.tsx       # Main layout wrapper
│   ├── Dashboard.tsx    # Command Center view
│   ├── CRM.tsx          # Relations/CRM module
│   ├── Projects.tsx     # ZENtry Ops project management
│   ├── Messenger.tsx    # Enterprise Comms chat
│   ├── CoPilot.tsx      # AI assistant interface
│   ├── ContactCenter.tsx # Contact center module
│   ├── Email.tsx        # Email management
│   ├── HR.tsx           # Expertise Matrix HR module
│   ├── Marketing.tsx    # Marketing campaigns
│   ├── Automation.tsx   # Business automation
│   ├── Sites.tsx        # Website management
│   ├── Collaboration.tsx # Global Pulse feed
│   ├── Profile.tsx      # User profile
│   └── Settings.tsx     # Kernel Control settings
├── services/            # API and service layers
│   └── geminiService.ts # Gemini AI integration
├── types.ts             # TypeScript type definitions
├── constants.tsx        # Application constants and mock data
├── App.tsx              # Main application component
├── index.tsx            # Application entry point
├── index.html           # HTML template
├── vite.config.ts       # Vite configuration
├── tsconfig.json        # TypeScript configuration
└── package.json         # Project dependencies
```

---

## 🔧 Configuration

### Vite Configuration

The project uses Vite for fast development and optimized production builds. Key configurations in `vite.config.ts`:

- React plugin for JSX support
- Environment variable handling
- Development server settings

### TypeScript Configuration

TypeScript is configured with strict type checking. See `tsconfig.json` for compiler options.

---

## 🚀 Build & Deployment

### Development Build

```bash
npm run dev
```

### Production Build

```bash
npm run build
```

The build output will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

---

## 🎨 Customization

### Design System

ZENtry uses a sophisticated design language featuring:

- **Dark Mode Foundation** - Deep navy backgrounds (#020617) with subtle gradients
- **Glassmorphism Effects** - Backdrop blur and translucent surfaces
- **Gradient Accents** - Indigo (indigo-600), violet (violet-600), and fuchsia (fuchsia-500)
- **Rounded Corners** - Heavily rounded UI elements (40px-80px border radius)
- **Smooth Animations** - Hover effects, transitions, and micro-interactions
- **Typography** - Bold, italic styling with custom tracking for technical aesthetics

### Color Palette

```css
Primary: Indigo (#4F46E5)
Secondary: Violet (#7C3AED)
Accent: Fuchsia (#D946EF)
Success: Green (#10B981)
Warning: Amber (#F59E0B)
Error: Red (#EF4444)
Background: Navy (#020617)
Surface: White with opacity (rgba(255,255,255,0.05))
```

### Mock Data

Mock data for development is defined in `constants.tsx`:

- `MOCK_DEALS` - Sample CRM deals with confidence scores
- `MOCK_TASKS` - Sample project tasks
- `MOCK_TEAM` - Sample team members with roles
- `MOCK_PROJECTS` - Sample projects with completion status
- `MOCK_CONTACTS` - Sample customer contacts

---

## 📊 Features in Detail

### Command Center (Dashboard)

- **Fiscal Magnitude** - ₹9.7Cr aggregated revenue optimization (+24.1% velocity)
- **Operational Load** - 1 pending mission objective
- **Resource Time** - 142h temporal delta (-2.1% velocity)
- **Global Reach** - 1.5M unique activations (+42.8% velocity)
- **Yield Velocity Matrix** - 7-day performance telemetry
- **Execution Depth** - Logic-based completion tracking

### Relations (CRM) Module

- Enterprise entity oversight with 842 active nodes
- AI confidence scoring up to 99%
- Deal pipeline with phases (Proposal, Won, Negotiation, Closing)
- Contact management with company affiliations
- Magnitude tracking (deal values in ₹)
- Conversion depth analytics (85% qualified flow, 42% negotiation mode, 28% closing velocity, +42% projected yield)

### ZENtry Ops (Project Management)

- Operational throughput monitoring (94.2% optimal)
- Kanban-style task boards (TODO, IN-PROGRESS, REVIEW)
- Priority levels (High, Medium, Low)
- Standby level tracking (0%-100%)
- Operational momentum tracking (45% completion)
- Temporal filtering by deadline
- AI-powered retrospectives
- Team assignment and collaboration
- Deploy Task functionality

### Enterprise Comms (Messenger)

- Real-time encrypted messaging
- Channel-based communication
- Identity tracing across clusters
- AI context analysis integration
- Task list commit functionality
- Broadcast communication support
- Online presence indicators

### Storage Matrix (Warehouse Hub)

- Material oversight with 94.2% optimization
- 1.2M total units tracked
- 72% warehouse load capacity
- 12 critical alerts monitoring
- Asset manifest tracking
- SKU identifier search
- Node location mapping (Mumbai HQ Rack, etc.)
- Execution status indicators (Operational)

### ZENtry.Drive

- Distributed asset repository
- 4.2 TB active storage
- Storage node filtering (All, Document, Image, Video, Other)
- Asset identifier tracing
- Version control (V1)
- Magnitude tracking (MB)
- Ingest Asset functionality

### Global Pulse (Intranet Feed)

- Active communication nodes (14 online)
- Broadcast operational updates
- AI summarization capabilities
- Merit pool (8.4k ZNT tokens)
- Kudos Ledger for recognition
- Magnitude tracking (24 magnitude per post)
- Discussion velocity (+42% High)
- Broadcasting nodes tracking
- Pinned node functionality
- Discussion thread replies

### Expertise Matrix (HR Management)

- Operational specialists online (2 nodes authorized)
- Talent, Performance, and Knowledge Base tabs
- Merit-based scoring (+84, +62)
- Role tracking (Chief Architect, Head of Operations)
- Leadership and Operations tags
- Contact vector integration
- Activity pulse monitoring
- Authorize Specialist functionality
- Provision Specialist expansion

### Business Automation

- Repetitive workload handling (80% automation potential)
- AI-driven optimization with bottleneck identification
- Active Logic Gates monitoring
- Execution tracking (1.2M executions)
- Hours saved metrics (450h)
- Omnichannel Lead Sync (Trigger: New CRM Lead → Action: Notify WhatsApp)
- Fiscal Audit Robot (Trigger: Invoice Paid → Action: Post to Slack)
- Running/Stopped status indicators
- Deploy Robot functionality

### Kernel Control (Settings)

- Global operational vector calibration
- Interface mode selection (Classic, Cyber, Gray)
- Comms Logic configuration
- Security Logic settings
- Alert Vectors management
- Identity Hub integration
- High Precision Focus toggle (contrast and gradient control)
- Synchronize Node functionality

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Coding Standards

- Follow TypeScript best practices
- Use functional components with hooks
- Maintain consistent naming conventions
- Write clean, commented code
- Test features thoroughly before submitting

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🐛 Known Issues

- AI features require a valid Gemini API key to function
- Some features are in demo mode and may not persist data between sessions
- Mobile responsiveness is optimized but some views work best on desktop
- Real-time synchronization is simulated in demo mode

---

## 🗺️ Roadmap

### Phase 1 - Foundation (Current)

- [x] Core module implementation
- [x] AI CoPilot integration
- [x] Basic authentication
- [x] Dashboard analytics

### Phase 2 - Enhancement

- [ ] Real-time database integration (PostgreSQL/MongoDB)
- [ ] User authentication and authorization (OAuth, SSO)
- [ ] WebSocket for real-time updates
- [ ] Advanced analytics dashboard with custom reports
- [ ] File upload and storage integration

### Phase 3 - Expansion

- [ ] Mobile app (React Native)
- [ ] Third-party integrations (Slack, Google Workspace, Microsoft Teams)
- [ ] Multi-language support (i18n)
- [ ] Custom theming options
- [ ] Advanced AI features with multiple model support

### Phase 4 - Enterprise

- [ ] Multi-tenant architecture
- [ ] Advanced security features (2FA, SSO, audit logs)
- [ ] API for third-party integrations
- [ ] On-premise deployment options
- [ ] Advanced reporting and business intelligence

---

## 💬 Support

For support, questions, or feedback:

- **Issues:** Open an issue on GitHub
- **Email:** support@zentry.io
- **Documentation:** [docs.zentry.io](https://docs.zentry.io)
- **Community:** Join our Discord server

---

## 🙏 Acknowledgments

- Built with [React](https://reactjs.org/)
- Powered by advanced AI capabilities
- Icons by [Lucide](https://lucide.dev/)
- Charts by [Recharts](https://recharts.org/)
- Inspired by modern enterprise software design

---

## 📈 Performance

ZENtry is optimized for performance:

- **Lightning Fast** - Vite-powered development and build
- **Code Splitting** - Optimized bundle sizes
- **Lazy Loading** - Components loaded on demand
- **Optimized Rendering** - React 19 concurrent features
- **Responsive Design** - Works on all screen sizes

---

## 🔒 Security

Security is a top priority:

- **Encrypted Communications** - End-to-end encryption for messaging
- **Secure Authentication** - Industry-standard auth practices
- **Data Protection** - Secure data handling and storage
- **Regular Updates** - Security patches and updates
- **Audit Trail** - Activity logging for compliance

---

<div align="center">
  
  **Made with ❤️ by the ZENtry Team**
  
  ⭐ Star us on GitHub if you find this project useful!
  
  **Enterprise Industrial OS v4.2**
  
  *Calibrating the global operational vectors of modern business*

</div>
