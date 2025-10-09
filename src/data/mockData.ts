import { ResumeData } from '@/types/resume';

export const mockResumeData: ResumeData = {
  personalInfo: {
    fullName: 'John Doe',
    professionalTitle: 'Senior Software Engineer',
    email: 'john.doe@email.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
  },
  professionalSummary:
    'Experienced software engineer with 5+ years of expertise in full-stack development, specializing in React, Node.js, and cloud technologies. Proven track record of delivering scalable solutions and leading cross-functional teams.',
  experiences: [
    {
      id: '1',
      title: 'Senior Software Engineer',
      company: 'Tech Corp',
      location: 'San Francisco, CA',
      startDate: '2021-03',
      endDate: '',
      current: true,
      description:
        'Led development of microservices architecture serving 2M+ users. Implemented CI/CD pipelines reducing deployment time by 60%. Mentored team of 5 junior developers.',
    },
    {
      id: '2',
      title: 'Software Engineer',
      company: 'StartupXYZ',
      location: 'Remote',
      startDate: '2019-06',
      endDate: '2021-02',
      current: false,
      description:
        'Built and maintained React-based dashboard application. Optimized database queries improving performance by 40%. Collaborated with design team on UI/UX improvements.',
    },
  ],
  education: [
    {
      id: '1',
      degree: 'Bachelor of Science in Computer Science',
      institution: 'University of California',
      location: 'Berkeley, CA',
      graduationDate: '2019-05',
      gpa: '3.8',
    },
  ],
  skills: [
    { id: '1', name: 'React', level: 'Expert' },
    { id: '2', name: 'TypeScript', level: 'Expert' },
    { id: '3', name: 'Node.js', level: 'Advanced' },
    { id: '4', name: 'Python', level: 'Intermediate' },
    { id: '5', name: 'AWS', level: 'Advanced' },
    { id: '6', name: 'Docker', level: 'Advanced' },
  ],
  projects: [
    {
      id: '1',
      name: 'E-commerce Platform',
      description:
        'Built a full-stack e-commerce platform with payment integration, inventory management, and analytics dashboard.',
      technologies: 'React, Node.js, MongoDB, Stripe',
      url: 'https://github.com/johndoe/ecommerce',
    },
    {
      id: '2',
      name: 'Task Management App',
      description:
        'Developed a collaborative task management application with real-time updates and team collaboration features.',
      technologies: 'React, Firebase, Tailwind CSS',
      url: 'https://github.com/johndoe/taskapp',
    },
  ],
  sections: [
    { id: 'personal', type: 'personal', title: 'Personal Information', icon: 'User' },
    { id: 'summary', type: 'summary', title: 'Professional Summary', icon: 'FileText' },
    { id: 'experience', type: 'experience', title: 'Experience', icon: 'Briefcase' },
    { id: 'education', type: 'education', title: 'Education', icon: 'GraduationCap' },
    { id: 'skills', type: 'skills', title: 'Skills', icon: 'Code' },
    { id: 'projects', type: 'projects', title: 'Projects', icon: 'FolderKanban' },
  ],
};
