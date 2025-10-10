export type ResumeTemplate = 'professional' | 'modern' | 'minimal';
export type CoverLetterTemplate = 'professional' | 'modern' | 'minimal';

export interface TemplateOption {
  id: string;
  name: string;
  description: string;
}

export const resumeTemplates: TemplateOption[] = [
  { id: 'professional', name: 'Professional', description: 'Classic and formal design' },
  { id: 'modern', name: 'Modern', description: 'Contemporary with color accents' },
  { id: 'minimal', name: 'Minimal', description: 'Clean and simple layout' },
];

export const coverLetterTemplates: TemplateOption[] = [
  { id: 'professional', name: 'Professional', description: 'Traditional business format' },
  { id: 'modern', name: 'Modern', description: 'Contemporary with visual elements' },
  { id: 'minimal', name: 'Minimal', description: 'Clean and concise style' },
];
