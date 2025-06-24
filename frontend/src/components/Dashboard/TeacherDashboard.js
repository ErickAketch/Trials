import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { 
  FileText, 
  Users, 
  Clock, 
  TrendingUp,
  Plus,
  Calendar,
  Award,
  AlertCircle
} from 'lucide-react';
import { mockExams, mockSubmissions, mockAnalytics } from '../../mock/mockData';

const TeacherDashboard = ({ setActiveTab }) => {
  const recentExams = mockExams.slice(0, 3);
  const recentSubmissions = mockSubmissions.slice(0, 5);

  const stats = [
    {
      title: 'Total Exams',
      value: mockExams.length,
      change: '+2 this month',
      icon: FileText,
      color: 'bg-blue-500'
    },
    {
      title: 'Active Students',
      value: '24',
      change: '+3 new enrollments',
      icon: Users,
      color: 'bg-green-500'
    },
    {
      title: 'Avg. Score',
      value: '78.5%',
      change: '+5.2% from last month',
      icon: TrendingUp,
      color: 'bg-purple-500'
    },
    {
      title: 'Pending Reviews',
      value: '12',
      change: '8 essay questions',
      icon: Clock,
      color: 'bg-orange-500'
    }
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return 'bg-green-500 text-white';
      case 'scheduled': return 'bg-blue-500 text-white';
      case 'completed': return 'bg-gray-500 text-white';
      default: return 'bg-gray-200 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Teacher Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your exams.</p>
        </div>
        <Button 
          onClick={() => setActiveTab('exams')}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create New Exam
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
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
        {/* Recent Exams */}
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="w-5 h-5" />
              <span>Recent Exams</span>
            </CardTitle>
            <CardDescription>
              Your recently created and active examinations
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentExams.map((exam) => (
              <div key={exam.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors duration-200">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{exam.title}</h3>
                  <p className="text-sm text-gray-600">{exam.subject}</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <span className="text-xs text-gray-500 flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {exam.duration} min
                    </span>
                    <span className="text-xs text-gray-500 flex items-center">
                      <Award className="w-3 h-3 mr-1" />
                      {exam.totalMarks} marks
                    </span>
                  </div>
                </div>
                <Badge className={getStatusColor(exam.status)}>
                  {exam.status}
                </Badge>
              </div>
            ))}
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => setActiveTab('exams')}
            >
              View All Exams
            </Button>
          </CardContent>
        </Card>

        {/* Recent Submissions */}
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="w-5 h-5" />
              <span>Recent Submissions</span>
            </CardTitle>
            <CardDescription>
              Latest student exam submissions for review
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentSubmissions.map((submission) => (
              <div key={submission.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors duration-200">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{submission.studentName}</h3>
                  <p className="text-sm text-gray-600">
                    {mockExams.find(e => e.id === submission.examId)?.title}
                  </p>
                  <div className="mt-2">
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                      <span>Score</span>
                      <span>{submission.score}/{submission.totalMarks}</span>
                    </div>
                    <Progress 
                      value={submission.percentage} 
                      className="h-2"
                    />
                  </div>
                </div>
              </div>
            ))}
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => setActiveTab('results')}
            >
              View All Results
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="w-5 h-5" />
            <span>Quick Actions</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button 
              variant="outline" 
              className="h-20 flex flex-col space-y-2 hover:scale-105 transition-transform duration-200"
              onClick={() => setActiveTab('exams')}
            >
              <FileText className="w-6 h-6" />
              <span>Create Exam</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex flex-col space-y-2 hover:scale-105 transition-transform duration-200"
              onClick={() => setActiveTab('questions')}
            >
              <Award className="w-6 h-6" />
              <span>Add Questions</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex flex-col space-y-2 hover:scale-105 transition-transform duration-200"
              onClick={() => setActiveTab('students')}
            >
              <Users className="w-6 h-6" />
              <span>Manage Students</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeacherDashboard;