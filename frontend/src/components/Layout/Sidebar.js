import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { 
  LayoutDashboard,
  FileText,
  Users,
  BarChart3,
  Settings,
  BookOpen,
  GraduationCap,
  Clock,
  Trophy,
  UserCheck,
  Database,
  Shield
} from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const { currentUser } = useAuth();

  const getMenuItems = () => {
    const baseItems = [
      { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard }
    ];

    switch(currentUser?.role) {
      case 'teacher':
        return [
          ...baseItems,
          { id: 'exams', label: 'Exams', icon: FileText },
          { id: 'questions', label: 'Question Bank', icon: BookOpen },
          { id: 'students', label: 'Students', icon: Users },
          { id: 'results', label: 'Results', icon: BarChart3 },
          { id: 'analytics', label: 'Analytics', icon: Trophy }
        ];
      
      case 'student':
        return [
          ...baseItems,
          { id: 'available-exams', label: 'Available Exams', icon: FileText },
          { id: 'my-results', label: 'My Results', icon: BarChart3 },
          { id: 'schedule', label: 'Schedule', icon: Clock },
          { id: 'achievements', label: 'Achievements', icon: Trophy }
        ];
      
      case 'admin':
        return [
          ...baseItems,
          { id: 'users', label: 'User Management', icon: UserCheck },
          { id: 'system-exams', label: 'All Exams', icon: FileText },
          { id: 'system-analytics', label: 'System Analytics', icon: BarChart3 },
          { id: 'database', label: 'Data Management', icon: Database },
          { id: 'security', label: 'Security', icon: Shield },
          { id: 'settings', label: 'Settings', icon: Settings }
        ];
      
      default:
        return baseItems;
    }
  };

  const menuItems = getMenuItems();

  return (
    <div className="w-64 bg-white border-r h-full">
      <div className="p-6">
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              {currentUser?.role === 'teacher' && <BookOpen className="w-4 h-4 text-white" />}
              {currentUser?.role === 'student' && <GraduationCap className="w-4 h-4 text-white" />}
              {currentUser?.role === 'admin' && <Shield className="w-4 h-4 text-white" />}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{currentUser?.name}</h3>
              <Badge variant="outline" className="text-xs capitalize">
                {currentUser?.role}
              </Badge>
            </div>
          </div>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <Button
                key={item.id}
                variant={isActive ? "default" : "ghost"}
                className={`w-full justify-start transition-all duration-200 ${
                  isActive 
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transform scale-105' 
                    : 'hover:bg-gray-50 hover:scale-105'
                }`}
                onClick={() => setActiveTab(item.id)}
              >
                <Icon className="mr-3 h-4 w-4" />
                {item.label}
              </Button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;