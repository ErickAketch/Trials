import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { 
  FileText, 
  Clock, 
  Award, 
  TrendingUp,
  Calendar,
  Play,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { mockExams, mockSubmissions } from '../../mock/mockData';

const StudentDashboard = ({ setActiveTab }) => {
  const availableExams = mockExams.filter(exam => exam.status === 'active' || exam.status === 'scheduled');
  const completedExams = mockSubmissions.filter(sub => sub.studentId === '2'); // Current student
  const averageScore = completedExams.reduce((acc, sub) => acc + sub.percentage, 0) / completedExams.length || 0;

  const stats = [
    {
      title: 'Available Exams',
      value: availableExams.length,
      change: '2 scheduled today',
      icon: FileText,
      color: 'bg-blue-500'
    },
    {
      title: 'Completed Exams',
      value: completedExams.length,
      change: '1 this week',
      icon: CheckCircle,
      color: 'bg-green-500'
    },
    {
      title: 'Average Score',
      value: `${averageScore.toFixed(1)}%`,
      change: '+15.3% improvement',
      icon: TrendingUp,
      color: 'bg-purple-500'
    },
    {
      title: 'Rank',
      value: '#2',
      change: 'Top 10% of class',
      icon: Award,
      color: 'bg-orange-500'
    }
  ];

  const getExamStatusColor = (exam) => {
    const now = new Date();
    const startTime = new Date(exam.startTime);
    const endTime = new Date(exam.endTime);

    if (now < startTime) return 'bg-blue-500 text-white'; // Scheduled
    if (now >= startTime && now <= endTime) return 'bg-green-500 text-white'; // Active
    return 'bg-gray-500 text-white'; // Ended
  };

  const getExamStatusText = (exam) => {
    const now = new Date();
    const startTime = new Date(exam.startTime);
    const endTime = new Date(exam.endTime);

    if (now < startTime) return 'Scheduled';
    if (now >= startTime && now <= endTime) return 'Active';
    return 'Ended';
  };

  const canTakeExam = (exam) => {
    const now = new Date();
    const startTime = new Date(exam.startTime);
    const endTime = new Date(exam.endTime);
    return now >= startTime && now <= endTime;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Student Dashboard</h1>
          <p className="text-gray-600 mt-1">Track your progress and manage your examinations.</p>
        </div>
        <Button 
          onClick={() => setActiveTab('available-exams')}
          className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-200"
        >
          <Play className="w-4 h-4 mr-2" />
          Take Exam
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
        {/* Available Exams */}
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="w-5 h-5" />
              <span>Available Exams</span>
            </CardTitle>
            <CardDescription>
              Exams you can take now or scheduled for later
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {availableExams.map((exam) => (
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
                  <p className="text-xs text-gray-500 mt-1">
                    {canTakeExam(exam) ? 'Available now' : `Starts ${new Date(exam.startTime).toLocaleDateString()}`}
                  </p>
                </div>
                <div className="flex flex-col items-end space-y-2">
                  <Badge className={getExamStatusColor(exam)}>
                    {getExamStatusText(exam)}
                  </Badge>
                  {canTakeExam(exam) && (
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      Take Now
                    </Button>
                  )}
                </div>
              </div>
            ))}
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => setActiveTab('available-exams')}
            >
              View All Available Exams
            </Button>
          </CardContent>
        </Card>

        {/* Recent Results */}
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Award className="w-5 h-5" />
              <span>Recent Results</span>
            </CardTitle>
            <CardDescription>
              Your latest exam performances and scores
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {completedExams.map((submission) => {
              const exam = mockExams.find(e => e.id === submission.examId);
              return (
                <div key={submission.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors duration-200">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{exam?.title}</h3>
                    <p className="text-sm text-gray-600">{exam?.subject}</p>
                    <div className="mt-2">
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                        <span>Score</span>
                        <span>{submission.score}/{submission.totalMarks} ({submission.percentage.toFixed(1)}%)</span>
                      </div>
                      <Progress 
                        value={submission.percentage} 
                        className="h-2"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Completed on {new Date(submission.submittedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="ml-4">
                    {submission.percentage >= 80 ? (
                      <Badge className="bg-green-500 text-white">Excellent</Badge>
                    ) : submission.percentage >= 60 ? (
                      <Badge className="bg-blue-500 text-white">Good</Badge>
                    ) : (
                      <Badge className="bg-red-500 text-white">Needs Improvement</Badge>
                    )}
                  </div>
                </div>
              );
            })}
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => setActiveTab('my-results')}
            >
              View All Results
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Performance Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5" />
            <span>Performance Overview</span>
          </CardTitle>
          <CardDescription>
            Your academic progress and achievements
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 border rounded-lg hover:bg-gray-50 transition-colors duration-200">
              <div className="text-3xl font-bold text-green-600 mb-2">{completedExams.length}</div>
              <div className="text-sm text-gray-600">Exams Completed</div>
            </div>
            <div className="text-center p-6 border rounded-lg hover:bg-gray-50 transition-colors duration-200">
              <div className="text-3xl font-bold text-blue-600 mb-2">{averageScore.toFixed(1)}%</div>
              <div className="text-sm text-gray-600">Average Score</div>
            </div>
            <div className="text-center p-6 border rounded-lg hover:bg-gray-50 transition-colors duration-200">
              <div className="text-3xl font-bold text-purple-600 mb-2">2</div>
              <div className="text-sm text-gray-600">Class Rank</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Schedule */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="w-5 h-5" />
            <span>Upcoming Schedule</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {availableExams.slice(0, 3).map((exam) => (
              <div key={exam.id} className="flex items-center justify-between p-3 border-l-4 border-blue-500 bg-blue-50 rounded-r-lg">
                <div>
                  <h4 className="font-semibold text-gray-900">{exam.title}</h4>
                  <p className="text-sm text-gray-600">{exam.subject}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">
                    {new Date(exam.startTime).toLocaleDateString()}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(exam.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentDashboard;