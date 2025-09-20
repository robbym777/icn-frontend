# Todo App with AI-Powered Task Suggestions

A modern, responsive todo application built with Next.js 15, TypeScript, and Tailwind CSS. Features AI-powered task suggestions, user authentication, and comprehensive task management capabilities.

## � Table of Contents

- [🚀 Features](#-features)
- [🛠️ Technology Stack](#️-technology-stack)
- [📦 Installation & Setup](#-installation--setup)
- [🔧 Available Scripts](#-available-scripts)
- [🎯 Usage Guide](#-usage-guide)
- [🏗️ Project Structure](#️-project-structure)
- [🔐 Authentication](#-authentication)
- [🤖 AI Integration](#-ai-integration)
- [🎨 Styling](#-styling)
- [🚀 Deployment](#-deployment)
- [📚 API Documentation](#-api-documentation)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

## �🚀 Features

### Core Functionality
- **User Authentication**: Secure login and registration system with protected routes
- **Task Management**: Full CRUD operations (Create, Read, Update, Delete) for todos
- **AI-Powered Suggestions**: Generate smart task suggestions based on user input
- **Progress Tracking**: Visual progress indicators and task statistics
- **Responsive Design**: Mobile-first responsive design with Tailwind CSS

### Advanced Features
- **State Management**: Zustand for efficient state management
- **Protected Routes**: Middleware-based route protection
- **Persistent Storage**: Local storage integration for data persistence
- **Real-time Updates**: Instant UI updates without page refreshes
- **Task Filtering**: Filter tasks by status (All, Active, Completed)

## 🛠️ Technology Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS 4
- **State Management**: Zustand
- **Testing**: Jest, React Testing Library
- **Authentication**: Custom auth system with JWT simulation
- **API**: Next.js API Routes
- **Deployment**: Vercel-ready

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd icn-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start development server with Turbopack
npm run build        # Build for production
npm run start        # Start production server

```bash
# Development
npm run dev          # Start development server with Turbopack
npm run build        # Build for production
npm run start        # Start production server
```

## 🎯 Usage Guide

### Getting Started

1. **Access the Application**
   - Visit the homepage at `http://localhost:3000`
   - You'll see options to Sign In or Create Account

2. **Demo Account** (for quick testing)
   - Email: `admin@example.com`
   - Password: `qwerty123`

3. **Create New Account**
   - Click "Create Account"
   - Fill in your details (name, email, password)
   - You'll be automatically logged in

### Managing Tasks

#### Adding Tasks
1. Navigate to the dashboard after login
2. Use the "Add New Task" form
3. Enter a title (required) and optional description
4. Click "Add Task"

#### AI-Powered Suggestions
1. Click "Generate Suggestions" button
2. Enter what you want to learn or accomplish (e.g., "learn programming")
3. Click "Generate" to get AI-powered task suggestions
4. Click on any suggestion to add it as a task

#### Task Operations
- **Complete/Uncomplete**: Click the checkbox next to any task
- **Edit**: Click the edit icon to modify task details
- **Delete**: Click the delete icon to remove a task
- **Filter**: Use filter buttons to view All, Active, or Completed tasks

### Task Suggestion Examples

The AI suggestion system provides contextual recommendations based on your input:

- **"learn programming"** → Get coding tutorials, practice exercises, project ideas
- **"fitness"** → Workout routines, step tracking, meal planning
- **"work productivity"** → Task prioritization, time blocking, review sessions

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   └── suggestions/   # Task suggestion endpoint
│   ├── dashboard/         # Dashboard page
│   ├── login/            # Login page
│   ├── register/         # Registration page
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Homepage
├── components/            # React components
│   ├── AddTodo.tsx       # Add task component
│   ├── Header.tsx        # Navigation header
│   ├── TodoItem.tsx      # Individual task component
│   ├── TodoList.tsx      # Task list component
│   └── __tests__/        # Component tests
├── stores/               # Zustand stores
│   ├── authStore.ts      # Authentication state
│   ├── todoStore.ts      # Task management state
│   └── __tests__/        # Store tests
└── middleware.ts         # Route protection middleware
```

## 🔐 Authentication System

### Features
- Custom authentication with simulated JWT
- Protected routes using Next.js middleware
- Persistent login state with localStorage
- Demo accounts for testing

### Security Notes
- This is a demo application with simulated authentication
- For production use, implement proper backend authentication
- Current system uses localStorage for demo purposes

### Demo Accounts
| Email | Password | Name |
|-------|----------|------|
| test@gmail.com | qwerty123 | Admin User |

## 🤖 AI Integration

### Current Implementation
- **Dummy Service**: Uses a mock API that generates contextual suggestions
- **Smart Categorization**: Provides different suggestion types based on input keywords
- **Backend Ready**: Architecture supports easy integration with real AI services

### Suggestion Categories
- **Programming**: Tutorials, practice problems, project ideas
- **Learning**: Study schedules, note-taking, exercises
- **Fitness**: Workouts, tracking, nutrition planning
- **Work**: Task prioritization, time management, reviews

### Backend Integration Notes
Since the actual OpenAI token is handled by the backend, the frontend includes:
- API endpoint structure (`/api/suggestions`)
- Error handling and loading states
- Response formatting for easy backend integration

## 📱 Responsive Design

### Mobile-First Approach
- Designed for mobile devices first
- Progressive enhancement for larger screens
- Touch-friendly interface elements

### Breakpoints
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px  
- **Desktop**: > 1024px

### Features
- Responsive navigation
- Flexible grid layouts
- Touch-optimized buttons and forms
- Optimized typography scaling

## 🚀 Deployment

### Vercel Deployment (Recommended)
1. Push code to GitHub repository
2. Connect repository to Vercel
3. Deploy automatically with each push

### Manual Deployment
```bash
npm run build
npm run start
```

### Environment Variables
For production deployment, you may need to set:
```env
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=your-production-url
```

## 🔄 State Management

### Zustand Stores

#### AuthStore
- User authentication state
- Login/logout functionality  
- User profile information
- Persistent authentication

#### TodoStore
- Task management (CRUD operations)
- Task filtering and organization
- AI suggestion handling
- Progress tracking

### State Persistence
- Authentication state persists across sessions
- Tasks are saved to localStorage
- State hydration on app initialization

## 🎨 Design System

### Color Palette
- **Primary**: Indigo (600, 700)
- **Success**: Green (500, 600)
- **Danger**: Red (600, 700)
- **Neutral**: Gray (50-900)

### Components
- Consistent button styles
- Form input standardization
- Loading states and animations
- Error and success messaging

## 🔧 Development Notes

### Key Design Decisions
1. **Zustand over Redux**: Simpler state management for this use case
2. **Next.js App Router**: Modern routing with built-in features
3. **Tailwind CSS**: Utility-first styling for rapid development
4. **TypeScript**: Type safety and better developer experience

### Performance Optimizations
- Component lazy loading where appropriate
- Optimized re-renders with Zustand
- Efficient state updates
- Responsive image handling

## 🐛 Troubleshooting

### Common Issues

1. **Tests failing with module resolution**
   ```bash
   npm install --save-dev @types/jest
   ```

2. **Tailwind styles not loading**
   - Check `globals.css` imports
   - Verify Tailwind configuration

3. **Authentication state not persisting**
   - Clear localStorage and try again
   - Check browser developer tools for errors

### Development Tips
- Use React Developer Tools for debugging
- Zustand DevTools for state inspection
- Network tab for API debugging

## 📝 Contributing

### Development Workflow
1. Create feature branch
2. Implement changes with tests
3. Run test suite
4. Submit pull request

### Code Standards
- TypeScript strict mode
- ESLint configuration
- Prettier formatting
- Component documentation

## 📄 License

This project is for demonstration purposes. Feel free to use as a starting point for your own projects.

## 🤝 Support

For questions or support:
1. Check the troubleshooting section
2. Review component documentation
3. Examine test files for usage examples

---

**Built with ❤️ using Next.js, TypeScript, and Tailwind CSS**
