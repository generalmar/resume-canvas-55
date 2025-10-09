import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Experience } from '@/types/resume';
import { Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface ExperienceSectionProps {
  experiences: Experience[];
  onChange: (experiences: Experience[]) => void;
}

export const ExperienceSection = ({ experiences, onChange }: ExperienceSectionProps) => {
  const [editingId, setEditingId] = useState<string | null>(experiences[0]?.id || null);

  const addExperience = () => {
    const newExp: Experience = {
      id: Date.now().toString(),
      title: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
    };
    onChange([...experiences, newExp]);
    setEditingId(newExp.id);
  };

  const updateExperience = (id: string, field: keyof Experience, value: any) => {
    onChange(
      experiences.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    );
  };

  const deleteExperience = (id: string) => {
    onChange(experiences.filter((exp) => exp.id !== id));
    if (editingId === id) {
      setEditingId(experiences[0]?.id || null);
    }
  };

  return (
    <div className="space-y-4 p-4">
      {experiences.map((exp) => (
        <div key={exp.id} className="border rounded-lg">
          <div
            className="flex items-center justify-between p-3 cursor-pointer hover:bg-accent"
            onClick={() => setEditingId(editingId === exp.id ? null : exp.id)}
          >
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{exp.title || 'New Position'}</p>
              <p className="text-sm text-muted-foreground truncate">{exp.company}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                deleteExperience(exp.id);
              }}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
          {editingId === exp.id && (
            <div className="p-4 space-y-4 border-t">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2 col-span-2">
                  <Label>Job Title</Label>
                  <Input
                    value={exp.title}
                    onChange={(e) => updateExperience(exp.id, 'title', e.target.value)}
                    placeholder="Senior Software Engineer"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Company</Label>
                  <Input
                    value={exp.company}
                    onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                    placeholder="Tech Corp"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Location</Label>
                  <Input
                    value={exp.location}
                    onChange={(e) => updateExperience(exp.id, 'location', e.target.value)}
                    placeholder="San Francisco, CA"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Start Date</Label>
                  <Input
                    type="month"
                    value={exp.startDate}
                    onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>End Date</Label>
                  <Input
                    type="month"
                    value={exp.endDate}
                    onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                    disabled={exp.current}
                  />
                </div>
                <div className="col-span-2 flex items-center space-x-2">
                  <Checkbox
                    id={`current-${exp.id}`}
                    checked={exp.current}
                    onCheckedChange={(checked) =>
                      updateExperience(exp.id, 'current', checked)
                    }
                  />
                  <Label htmlFor={`current-${exp.id}`} className="cursor-pointer">
                    Currently working here
                  </Label>
                </div>
                <div className="space-y-2 col-span-2">
                  <Label>Description</Label>
                  <Textarea
                    value={exp.description}
                    onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                    placeholder="Describe your responsibilities and achievements..."
                    rows={4}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
      <Button onClick={addExperience} variant="outline" className="w-full">
        <Plus className="h-4 w-4 mr-2" />
        Add Experience
      </Button>
    </div>
  );
};
