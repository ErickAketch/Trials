import React, { useState } from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { Toaster } from "./components/ui/toaster";
import Navbar from "./components/Layout/Navbar";
import Sidebar from "./components/Layout/Sidebar";
import TeacherDashboard from "./components/Dashboard/TeacherDashboard";
import StudentDashboard from "./components/Dashboard/StudentDashboard";
import AdminDashboard from "./components/Dashboard/AdminDashboard";
import ExamManagement from "./components/Exams/ExamManagement";

// Login Component
const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await login(email, password);
    setLoading(false);
    
    if (!result.success) {
      alert(result.error);
    }
  };

  // Demo accounts for easy testing
  const demoAccounts = [
    { email: 'sarah.johnson@school.edu', role: 'Teacher', name: 'Dr. Sarah Johnson' },
    { email: 'john.smith@student.edu', role: 'Student', name: 'John Smith' },
    { email: 'emma.davis@student.edu', role: 'Student', name: 'Emma Davis' },
    { email: 'admin@school.edu', role: 'Admin', name: 'Admin User' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-2xl font-bold">EM</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">ExamMaster</h2>
          <p className="mt-2 text-gray-600">Examination Management System</p>
        </div>
        
        <form className="mt-8 space-y-6 bg-white p-8 rounded-2xl shadow-xl" onSubmit={handleLogin}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-200"
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        {/* Demo Accounts */}
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Demo Accounts</h3>
          <div className="space-y-2">
            {demoAccounts.map((account, index) => (
              <div 
                key={index}
                className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors duration-200"
                onClick={() => {
                  setEmail(account.email);
                  setPassword('demo123');
                }}
              >
                <div>
                  <div className="font-medium text-gray-900">{account.name}</div>
                  <div className="text-sm text-gray-500">{account.role}</div>
                </div>
                <div className="text-xs text-blue-600 font-medium">Click to use</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Main App Component
const AppContent = () => {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');

  if (!currentUser) {
    return <LoginScreen />;
  }

  const renderContent = () => {
    // Teacher routes
    if (currentUser.role === 'teacher') {
      switch(activeTab) {
        case 'dashboard':
          return <TeacherDashboard setActiveTab={setActiveTab} />;
        case 'exams':
          return <ExamManagement />;
        case 'questions':
          return <div className="p-8 text-center">Question Bank Management - Coming Soon</div>;
        case 'students':
          return <div className="p-8 text-center">Student Management - Coming Soon</div>;
        case 'results':
          return <div className="p-8 text-center">Results & Grading - Coming Soon</div>;
        case 'analytics':
          return <div className="p-8 text-center">Analytics Dashboard - Coming Soon</div>;
        default:
          return <TeacherDashboard setActiveTab={setActiveTab} />;
      }
    }

    // Student routes
    if (currentUser.role === 'student') {
      switch(activeTab) {
        case 'dashboard':
          return <StudentDashboard setActiveTab={setActiveTab} />;
        case 'available-exams':
          return <div className="p-8 text-center">Available Exams - Coming Soon</div>;
        case 'my-results':
          return <div className="p-8 text-center">My Results - Coming Soon</div>;
        case 'schedule':
          return <div className="p-8 text-center">Exam Schedule - Coming Soon</div>;
        case 'achievements':
          return <div className="p-8 text-center">Achievements - Coming Soon</div>;
        default:
          return <StudentDashboard setActiveTab={setActiveTab} />;
      }
    }

    // Admin routes
    if (currentUser.role === 'admin') {
      switch(activeTab) {
        case 'dashboard':
          return <AdminDashboard setActiveTab={setActiveTab} />;
        case 'users':
          return <div className="p-8 text-center">User Management - Coming Soon</div>;
        case 'system-exams':
          return <div className="p-8 text-center">System Exams - Coming Soon</div>;
        case 'system-analytics':
          return <div className="p-8 text-center">System Analytics - Coming Soon</div>;
        case 'database':
          return <div className="p-8 text-center">Data Management - Coming Soon</div>;
        case 'security':
          return <div className="p-8 text-center">Security Settings - Coming Soon</div>;
        case 'settings':
          return <div className="p-8 text-center">System Settings - Coming Soon</div>;
        default:
          return <AdminDashboard setActiveTab={setActiveTab} />;
      }
    }

    return <div className="p-8 text-center">Welcome to ExamMaster</div>;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="flex-1 p-8">
          {renderContent()}
        </main>
      </div>
      <Toaster />
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;