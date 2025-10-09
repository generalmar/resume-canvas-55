export interface PersonalInfo {
  fullName: string;
  professionalTitle: string;
  email: string;
  phone: string;
  location: string;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  graduationDate: string;
  gpa?: string;
}

export interface Skill {
  id: string;
  name: string;
  level: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string;
  url?: string;
}

export type SectionType = 'personal' | 'summary' | 'experience' | 'education' | 'skills' | 'projects';

export interface Section {
  id: string;
  type: SectionType;
  title: string;
  icon: string;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  professionalSummary: string;
  experiences: Experience[];
  education: Education[];
  skills: Skill[];
  projects: Project[];
  sections: Section[];
}
