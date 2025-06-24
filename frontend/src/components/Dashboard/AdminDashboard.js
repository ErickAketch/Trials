import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { 
  Users, 
  FileText, 
  BarChart3, 
  Shield,
  Settings,
  AlertTriangle,
  TrendingUp,
  Database,
  Activity,
  UserCheck
} from 'lucide-react';
import { mockUsers, mockExams, mockSubmissions, mockAnalytics } from '../../mock/mockData';

const AdminDashboard = ({ setActiveTab }) => {
  const totalUsers = mockUsers.length;
  const totalTeachers = mockUsers.filter(u => u.role === 'teacher').length;
  const totalStudents = mockUsers.filter(u => u.role === 'student').length;
  const totalExams = mockExams.length;
  const totalSubmissions = mockSubmissions.length;

  const systemStats = [
    {
      title: 'Total Users',
      value: totalUsers,
      change: '+12 this month',
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      title: 'Active Exams',
      value: mockExams.filter(e => e.status === 'active').length,
      change: '3 ongoing',
      icon: FileText,
      color: 'bg-green-500'
    },
    {
      title: 'System Load',
      value: '68%',
      change: 'Normal range',
      icon: Activity,
      color: 'bg-purple-500'
    },
    {
      title: 'Data Storage',
      value: '2.4GB',
      change: '12% of limit',
      icon: Database,
      color: 'bg-orange-500'
    }
  ];

  const userBreakdown = [
    { role: 'Students', count: totalStudents, percentage: (totalStudents / totalUsers) * 100, color: 'bg-green-500' },
    { role: 'Teachers', count: totalTeachers, percentage: (totalTeachers / totalUsers) * 100, color: 'bg-blue-500' },
    { role: 'Admins', count: 1, percentage: (1 / totalUsers) * 100, color: 'bg-purple-500' }
  ];

  const recentActivity = [
    { type: 'user_created', message: 'New student registered: Emma Davis', time: '2 hours ago', icon: UserCheck },
    { type: 'exam_submitted', message: 'John Smith submitted Mathematics Midterm', time: '4 hours ago', icon: FileText },
    { type: 'system_update', message: 'System backup completed successfully', time: '6 hours ago', icon: Shield },
    { type: 'exam_created', message: 'Physics Chapter 5 Quiz created by Dr. Johnson', time: '1 day ago', icon: FileText },
    { type: 'alert', message: 'Server load reached 85% - normalized', time: '2 days ago', icon: AlertTriangle }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-1">System overview and management tools.</p>
        </div>
        <Button 
          onClick={() => setActiveTab('settings')}
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-200"
        >
          <Settings className="w-4 h-4 mr-2" />
          System Settings
        </Button>
      </div>

      {/* System Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {systemStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <div className={`p-2.5 rounded-lg ${stat.color}`}>
                  <Icon className="h-4 w-4 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <p className="text-xs text-gray-500 mt-1">{stat.change}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Distribution */}
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="w-5 h-5" />
              <span>User Distribution</span>
            </CardTitle>
            <CardDescription>
              Breakdown of system users by role
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {userBreakdown.map((user, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">{user.role}</span>
                  <span className="text-sm text-gray-500">{user.count} users</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Progress value={user.percentage} className="flex-1 h-2" />
                  <span className="text-xs text-gray-500 min-w-[40px]">
                    {user.percentage.toFixed(0)}%
                  </span>
                </div>
              </div>
            ))}
            <Button 
              variant="outline" 
              className="w-full mt-4"
              onClick={() => setActiveTab('users')}
            >
              Manage Users
            </Button>
          </CardContent>
        </Card>

        {/* System Activity */}
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="w-5 h-5" />
              <span>Recent Activity</span>
            </CardTitle>
            <CardDescription>
              Latest system events and user actions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivity.map((activity, index) => {
              const Icon = activity.icon;
              return (
                <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                  <div className="p-2 rounded-full bg-gray-100">
                    <Icon className="w-4 h-4 text-gray-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900">{activity.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              );
            })}
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => setActiveTab('system-analytics')}
            >
              View Full Activity Log
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* System Health & Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="w-5 h-5" />
              <span>Exam Statistics</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Total Exams</span>
              <span className="font-semibold">{totalExams}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Active Exams</span>
              <span className="font-semibold text-green-600">
                {mockExams.filter(e => e.status === 'active').length}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Total Submissions</span>
              <span className="font-semibold">{totalSubmissions}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Avg. Completion Rate</span>
              <span className="font-semibold text-blue-600">87%</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="w-5 h-5" />
              <span>Security Status</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">System Security</span>
              <Badge className="bg-green-500 text-white">Secure</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Failed Logins (24h)</span>
              <span className="font-semibold text-green-600">0</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Active Sessions</span>
              <span className="font-semibold">12</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Last Backup</span>
              <span className="font-semibold text-blue-600">2 hours ago</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Database className="w-5 h-5" />
              <span>System Resources</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">CPU Usage</span>
                <span className="text-sm font-medium">45%</span>
              </div>
              <Progress value={45} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Memory Usage</span>
                <span className="text-sm font-medium">68%</span>
              </div>
              <Progress value={68} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Storage Used</span>
                <span className="text-sm font-medium">12%</span>
              </div>
              <Progress value={12} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Settings className="w-5 h-5" />
            <span>Admin Actions</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button 
              variant="outline" 
              className="h-20 flex flex-col space-y-2 hover:scale-105 transition-transform duration-200"
              onClick={() => setActiveTab('users')}
            >
              <Users className="w-6 h-6" />
              <span>Manage Users</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex flex-col space-y-2 hover:scale-105 transition-transform duration-200"
              onClick={() => setActiveTab('system-exams')}
            >
              <FileText className="w-6 h-6" />
              <span>System Exams</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex flex-col space-y-2 hover:scale-105 transition-transform duration-200"
              onClick={() => setActiveTab('system-analytics')}
            >
              <BarChart3 className="w-6 h-6" />
              <span>Analytics</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex flex-col space-y-2 hover:scale-105 transition-transform duration-200"
              onClick={() => setActiveTab('security')}
            >
              <Shield className="w-6 h-6" />
              <span>Security</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;