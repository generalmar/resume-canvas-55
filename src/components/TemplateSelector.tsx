import { Card } from '@/components/ui/card';
import { Check } from 'lucide-react';
import { ResumeTemplate, CoverLetterTemplate, resumeTemplates, coverLetterTemplates } from '@/types/template';

interface TemplateSelectorProps {
  type: 'resume' | 'cover-letter';
  selectedTemplate: ResumeTemplate | CoverLetterTemplate;
  onTemplateChange: (template: ResumeTemplate | CoverLetterTemplate) => void;
}

export const TemplateSelector = ({ type, selectedTemplate, onTemplateChange }: TemplateSelectorProps) => {
  const templates = type === 'resume' ? resumeTemplates : coverLetterTemplates;

  return (
    <div className="p-6 border-b bg-card">
      <h3 className="text-lg font-semibold mb-4">Select Template</h3>
      <div className="space-y-3">
        {templates.map((template) => (
          <Card
            key={template.id}
            className={`p-4 cursor-pointer transition-all hover:border-primary ${
              selectedTemplate === template.id ? 'border-primary bg-primary/5' : ''
            }`}
            onClick={() => onTemplateChange(template.id as ResumeTemplate | CoverLetterTemplate)}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className="font-medium mb-1">{template.name}</h4>
                <p className="text-sm text-muted-foreground">{template.description}</p>
              </div>
              {selectedTemplate === template.id && (
                <Check className="h-5 w-5 text-primary flex-shrink-0 ml-2" />
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
