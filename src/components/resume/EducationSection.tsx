import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Education } from '@/types/resume';
import { Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface EducationSectionProps {
  education: Education[];
  onChange: (education: Education[]) => void;
}

export const EducationSection = ({ education, onChange }: EducationSectionProps) => {
  const [editingId, setEditingId] = useState<string | null>(education[0]?.id || null);

  const addEducation = () => {
    const newEdu: Education = {
      id: Date.now().toString(),
      degree: '',
      institution: '',
      location: '',
      graduationDate: '',
      gpa: '',
    };
    onChange([...education, newEdu]);
    setEditingId(newEdu.id);
  };

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    onChange(
      education.map((edu) =>
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    );
  };

  const deleteEducation = (id: string) => {
    onChange(education.filter((edu) => edu.id !== id));
    if (editingId === id) {
      setEditingId(education[0]?.id || null);
    }
  };

  return (
    <div className="space-y-4 p-4">
      {education.map((edu) => (
        <div key={edu.id} className="border rounded-lg">
          <div
            className="flex items-center justify-between p-3 cursor-pointer hover:bg-accent"
            onClick={() => setEditingId(editingId === edu.id ? null : edu.id)}
          >
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{edu.degree || 'New Degree'}</p>
              <p className="text-sm text-muted-foreground truncate">{edu.institution}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                deleteEducation(edu.id);
              }}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
          {editingId === edu.id && (
            <div className="p-4 space-y-4 border-t">
              <div className="space-y-2">
                <Label>Degree</Label>
                <Input
                  value={edu.degree}
                  onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                  placeholder="Bachelor of Science in Computer Science"
                />
              </div>
              <div className="space-y-2">
                <Label>Institution</Label>
                <Input
                  value={edu.institution}
                  onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                  placeholder="University of California"
                />
              </div>
              <div className="space-y-2">
                <Label>Location</Label>
                <Input
                  value={edu.location}
                  onChange={(e) => updateEducation(edu.id, 'location', e.target.value)}
                  placeholder="Berkeley, CA"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Graduation Date</Label>
                  <Input
                    type="month"
                    value={edu.graduationDate}
                    onChange={(e) => updateEducation(edu.id, 'graduationDate', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>GPA (Optional)</Label>
                  <Input
                    value={edu.gpa || ''}
                    onChange={(e) => updateEducation(edu.id, 'gpa', e.target.value)}
                    placeholder="3.8"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
      <Button onClick={addEducation} variant="outline" className="w-full">
        <Plus className="h-4 w-4 mr-2" />
        Add Education
      </Button>
    </div>
  );
};
