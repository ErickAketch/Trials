// Mock data for the examinations management system

export const mockUsers = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    email: 'sarah.johnson@school.edu',
    role: 'teacher',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b844-f234?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: '2',
    name: 'John Smith',
    email: 'john.smith@student.edu',
    role: 'student',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: '3',
    name: 'Emma Davis',
    email: 'emma.davis@student.edu',
    role: 'student',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: '4',
    name: 'Admin User',
    email: 'admin@school.edu',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
  }
];

export const mockExams = [
  {
    id: '1',
    title: 'Mathematics Midterm Exam',
    description: 'Comprehensive test covering algebra, geometry, and calculus fundamentals',
    subject: 'Mathematics',
    teacherId: '1',
    teacherName: 'Dr. Sarah Johnson',
    duration: 120, // minutes
    totalQuestions: 25,
    totalMarks: 100,
    status: 'active',
    startTime: new Date('2024-12-20T09:00:00'),
    endTime: new Date('2024-12-20T11:00:00'),
    createdAt: new Date('2024-12-15T10:00:00'),
    instructions: 'Read all questions carefully. Show your work for partial credit. No calculators allowed.',
    attempts: 2,
    randomizeQuestions: true
  },
  {
    id: '2',
    title: 'Physics Chapter 5 Quiz',
    description: 'Quick assessment on thermodynamics and heat transfer',
    subject: 'Physics',
    teacherId: '1',
    teacherName: 'Dr. Sarah Johnson',
    duration: 45,
    totalQuestions: 15,
    totalMarks: 50,
    status: 'scheduled',
    startTime: new Date('2024-12-25T14:00:00'),
    endTime: new Date('2024-12-25T14:45:00'),
    createdAt: new Date('2024-12-18T15:30:00'),
    instructions: 'Multiple choice and short answer questions. Time limit strictly enforced.',
    attempts: 1,
    randomizeQuestions: false
  },
  {
    id: '3',
    title: 'Chemistry Final Exam',
    description: 'Comprehensive final examination covering all semester topics',
    subject: 'Chemistry',
    teacherId: '1',
    teacherName: 'Dr. Sarah Johnson',
    duration: 180,
    totalQuestions: 40,
    totalMarks: 150,
    status: 'completed',
    startTime: new Date('2024-12-10T10:00:00'),
    endTime: new Date('2024-12-10T13:00:00'),
    createdAt: new Date('2024-12-05T12:00:00'),
    instructions: 'Periodic table provided. Show all calculations clearly.',
    attempts: 1,
    randomizeQuestions: true
  }
];

export const mockQuestions = [
  {
    id: '1',
    examId: '1',
    type: 'multiple-choice',
    question: 'What is the derivative of x² + 3x + 2?',
    options: ['2x + 3', 'x² + 3', '2x + 2', 'x + 3'],
    correctAnswer: 0,
    marks: 4,
    explanation: 'The derivative of x² is 2x, derivative of 3x is 3, and derivative of constant 2 is 0.'
  },
  {
    id: '2',
    examId: '1',
    type: 'true-false',
    question: 'The sum of angles in any triangle is always 180 degrees.',
    correctAnswer: true,
    marks: 2,
    explanation: 'This is a fundamental property of triangles in Euclidean geometry.'
  },
  {
    id: '3',
    examId: '1',
    type: 'short-answer',
    question: 'Solve the equation: 2x + 5 = 13. Show your work.',
    correctAnswer: 'x = 4',
    marks: 6,
    explanation: 'Subtract 5 from both sides: 2x = 8, then divide by 2: x = 4'
  },
  {
    id: '4',
    examId: '2',
    type: 'multiple-choice',
    question: 'What is the unit of heat in the SI system?',
    options: ['Calorie', 'Joule', 'BTU', 'Watt'],
    correctAnswer: 1,
    marks: 3,
    explanation: 'Joule is the SI unit for energy, including heat energy.'
  }
];

export const mockSubmissions = [
  {
    id: '1',
    examId: '1',
    studentId: '2',
    studentName: 'John Smith',
    answers: {
      '1': 0, // correct
      '2': true, // correct
      '3': 'x = 4' // correct
    },
    score: 12,
    totalMarks: 12,
    percentage: 100,
    timeSpent: 85, // minutes
    submittedAt: new Date('2024-12-20T10:25:00'),
    status: 'graded'
  },
  {
    id: '2',
    examId: '1',
    studentId: '3',
    studentName: 'Emma Davis',
    answers: {
      '1': 2, // incorrect
      '2': true, // correct
      '3': 'x = 3' // incorrect
    },
    score: 2,
    totalMarks: 12,
    percentage: 16.67,
    timeSpent: 95,
    submittedAt: new Date('2024-12-20T10:35:00'),
    status: 'graded'
  },
  {
    id: '3',
    examId: '3',
    studentId: '2',
    studentName: 'John Smith',
    answers: {},
    score: 142,
    totalMarks: 150,
    percentage: 94.67,
    timeSpent: 165,
    submittedAt: new Date('2024-12-10T12:45:00'),
    status: 'graded'
  }
];

export const mockAnalytics = {
  totalExams: 3,
  totalStudents: 2,
  averageScore: 65.5,
  completionRate: 85,
  recentActivity: [
    { type: 'exam_created', message: 'Physics Chapter 5 Quiz created', time: '2 hours ago' },
    { type: 'submission', message: 'Emma Davis submitted Mathematics Midterm', time: '1 day ago' },
    { type: 'exam_completed', message: 'Chemistry Final Exam completed', time: '5 days ago' }
  ]
};

// Authentication context mock
export const mockAuthContext = {
  currentUser: mockUsers[0], // Default to teacher for demo
  login: (email, password) => {
    const user = mockUsers.find(u => u.email === email);
    return user ? { success: true, user } : { success: false, error: 'Invalid credentials' };
  },
  logout: () => ({ success: true }),
  switchRole: (userId) => {
    const user = mockUsers.find(u => u.id === userId);
    return user;
  }
};

export default {
  mockUsers,
  mockExams,
  mockQuestions,
  mockSubmissions,
  mockAnalytics,
  mockAuthContext
};