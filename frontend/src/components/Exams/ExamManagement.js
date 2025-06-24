import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { useToast } from '../../hooks/use-toast';
import { 
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Clock,
  Users,
  Award,
  Calendar,
  Copy,
  Eye
} from 'lucide-react';
import { mockExams } from '../../mock/mockData';

const ExamManagement = () => {
  const [exams, setExams] = useState(mockExams);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingExam, setEditingExam] = useState(null);
  const { toast } = useToast();

  const [newExam, setNewExam] = useState({
    title: '',
    description: '',
    subject: '',
    duration: 60,
    totalQuestions: 10,
    totalMarks: 100,
    instructions: '',
    startTime: '',
    endTime: '',
    attempts: 1,
    randomizeQuestions: false
  });

  const filteredExams = exams.filter(exam => {
    const matchesSearch = exam.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exam.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || exam.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return 'bg-green-500 text-white';
      case 'scheduled': return 'bg-blue-500 text-white';
      case 'completed': return 'bg-gray-500 text-white';
      case 'draft': return 'bg-yellow-500 text-white';
      default: return 'bg-gray-200 text-gray-800';
    }
  };

  const handleCreateExam = () => {
    if (!newExam.title || !newExam.subject) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const exam = {
      ...newExam,
      id: Date.now().toString(),
      teacherId: '1',
      teacherName: 'Dr. Sarah Johnson',
      status: 'draft',
      createdAt: new Date(),
      startTime: new Date(newExam.startTime),
      endTime: new Date(newExam.endTime)
    };

    setExams([exam, ...exams]);
    setIsCreateDialogOpen(false);
    setNewExam({
      title: '',
      description: '',
      subject: '',
      duration: 60,
      totalQuestions: 10,
      totalMarks: 100,
      instructions: '',
      startTime: '',
      endTime: '',
      attempts: 1,
      randomizeQuestions: false
    });

    toast({
      title: "Success",
      description: "Exam created successfully!",
    });
  };

  const handleEditExam = (exam) => {
    setEditingExam(exam);
    setNewExam({
      ...exam,
      startTime: exam.startTime.toISOString().slice(0, 16),
      endTime: exam.endTime.toISOString().slice(0, 16)
    });
    setIsCreateDialogOpen(true);
  };

  const handleUpdateExam = () => {
    const updatedExams = exams.map(exam => 
      exam.id === editingExam.id 
        ? {
            ...newExam,
            id: editingExam.id,
            teacherId: editingExam.teacherId,
            teacherName: editingExam.teacherName,
            createdAt: editingExam.createdAt,
            startTime: new Date(newExam.startTime),
            endTime: new Date(newExam.endTime)
          }
        : exam
    );

    setExams(updatedExams);
    setIsCreateDialogOpen(false);
    setEditingExam(null);
    setNewExam({
      title: '',
      description: '',
      subject: '',
      duration: 60,
      totalQuestions: 10,
      totalMarks: 100,
      instructions: '',
      startTime: '',
      endTime: '',
      attempts: 1,
      randomizeQuestions: false
    });

    toast({
      title: "Success",
      description: "Exam updated successfully!",
    });
  };

  const handleDeleteExam = (examId) => {
    setExams(exams.filter(exam => exam.id !== examId));
    toast({
      title: "Success",
      description: "Exam deleted successfully!",
    });
  };

  const handleDuplicateExam = (exam) => {
    const duplicatedExam = {
      ...exam,
      id: Date.now().toString(),
      title: `${exam.title} (Copy)`,
      status: 'draft',
      createdAt: new Date()
    };

    setExams([duplicatedExam, ...exams]);
    toast({
      title: "Success",
      description: "Exam duplicated successfully!",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Exam Management</h1>
          <p className="text-gray-600 mt-1">Create, edit, and manage your examinations.</p>
        </div>
        <Button 
          onClick={() => setIsCreateDialogOpen(true)}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create New Exam
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search exams by title or subject..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full md:w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Exams Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredExams.map((exam) => (
          <Card key={exam.id} className="hover:shadow-lg transition-all duration-300 hover:scale-105">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <CardTitle className="text-lg">{exam.title}</CardTitle>
                  <CardDescription className="mt-1">{exam.subject}</CardDescription>
                </div>
                <Badge className={getStatusColor(exam.status)}>
                  {exam.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600 line-clamp-2">{exam.description}</p>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span>{exam.duration} min</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Award className="w-4 h-4 text-gray-400" />
                  <span>{exam.totalMarks} marks</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-gray-400" />
                  <span>{exam.totalQuestions} questions</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span>{exam.attempts} attempt(s)</span>
                </div>
              </div>

              <div className="text-xs text-gray-500">
                <p>Start: {exam.startTime.toLocaleDateString()} {exam.startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                <p>End: {exam.endTime.toLocaleDateString()} {exam.endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
              </div>

              <div className="flex space-x-2">
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => handleEditExam(exam)}
                  className="flex-1"
                >
                  <Edit className="w-3 h-3 mr-1" />
                  Edit
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => handleDuplicateExam(exam)}
                >
                  <Copy className="w-3 h-3" />
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                >
                  <Eye className="w-3 h-3" />
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => handleDeleteExam(exam.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredExams.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No exams found</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm || filterStatus !== 'all' 
                ? 'Try adjusting your search or filter criteria.' 
                : 'Get started by creating your first exam.'}
            </p>
            {!searchTerm && filterStatus === 'all' && (
              <Button onClick={() => setIsCreateDialogOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Create Your First Exam
              </Button>
            )}
          </CardContent>
        </Card>
      )}

      {/* Create/Edit Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingExam ? 'Edit Exam' : 'Create New Exam'}</DialogTitle>
            <DialogDescription>
              {editingExam ? 'Update exam details and settings.' : 'Set up a new examination with all the details.'}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Exam Title *</Label>
                <Input
                  id="title"
                  value={newExam.title}
                  onChange={(e) => setNewExam({...newExam, title: e.target.value})}
                  placeholder="Enter exam title"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Subject *</Label>
                <Input
                  id="subject"
                  value={newExam.subject}
                  onChange={(e) => setNewExam({...newExam, subject: e.target.value})}
                  placeholder="Enter subject"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={newExam.description}
                onChange={(e) => setNewExam({...newExam, description: e.target.value})}
                placeholder="Enter exam description"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="duration">Duration (minutes)</Label>
                <Input
                  id="duration"
                  type="number"
                  value={newExam.duration}
                  onChange={(e) => setNewExam({...newExam, duration: parseInt(e.target.value)})}
                  min="1"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="questions">Total Questions</Label>
                <Input
                  id="questions"
                  type="number"
                  value={newExam.totalQuestions}
                  onChange={(e) => setNewExam({...newExam, totalQuestions: parseInt(e.target.value)})}
                  min="1"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="marks">Total Marks</Label>
                <Input
                  id="marks"
                  type="number"
                  value={newExam.totalMarks}
                  onChange={(e) => setNewExam({...newExam, totalMarks: parseInt(e.target.value)})}
                  min="1"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startTime">Start Time</Label>
                <Input
                  id="startTime"
                  type="datetime-local"
                  value={newExam.startTime}
                  onChange={(e) => setNewExam({...newExam, startTime: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endTime">End Time</Label>
                <Input
                  id="endTime"
                  type="datetime-local"
                  value={newExam.endTime}
                  onChange={(e) => setNewExam({...newExam, endTime: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="instructions">Instructions</Label>
              <Textarea
                id="instructions"
                value={newExam.instructions}
                onChange={(e) => setNewExam({...newExam, instructions: e.target.value})}
                placeholder="Enter exam instructions for students"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="attempts">Number of Attempts</Label>
                <Select
                  value={newExam.attempts.toString()}
                  onValueChange={(value) => setNewExam({...newExam, attempts: parseInt(value)})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 Attempt</SelectItem>
                    <SelectItem value="2">2 Attempts</SelectItem>
                    <SelectItem value="3">3 Attempts</SelectItem>
                    <SelectItem value="unlimited">Unlimited</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="randomize">Question Order</Label>
                <Select
                  value={newExam.randomizeQuestions.toString()}
                  onValueChange={(value) => setNewExam({...newExam, randomizeQuestions: value === 'true'})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="false">Fixed Order</SelectItem>
                    <SelectItem value="true">Randomized</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={editingExam ? handleUpdateExam : handleCreateExam}>
              {editingExam ? 'Update Exam' : 'Create Exam'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ExamManagement;