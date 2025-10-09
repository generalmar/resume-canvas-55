import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skill } from '@/types/resume';
import { Plus, Trash2 } from 'lucide-react';

interface SkillsSectionProps {
  skills: Skill[];
  onChange: (skills: Skill[]) => void;
}

export const SkillsSection = ({ skills, onChange }: SkillsSectionProps) => {
  const addSkill = () => {
    const newSkill: Skill = {
      id: Date.now().toString(),
      name: '',
      level: 'Intermediate',
    };
    onChange([...skills, newSkill]);
  };

  const updateSkill = (id: string, field: keyof Skill, value: string) => {
    onChange(
      skills.map((skill) =>
        skill.id === id ? { ...skill, [field]: value } : skill
      )
    );
  };

  const deleteSkill = (id: string) => {
    onChange(skills.filter((skill) => skill.id !== id));
  };

  return (
    <div className="space-y-4 p-4">
      {skills.map((skill) => (
        <div key={skill.id} className="flex items-end gap-2">
          <div className="flex-1 space-y-2">
            <Label>Skill Name</Label>
            <Input
              value={skill.name}
              onChange={(e) => updateSkill(skill.id, 'name', e.target.value)}
              placeholder="React"
            />
          </div>
          <div className="w-32 space-y-2">
            <Label>Level</Label>
            <Select
              value={skill.level}
              onValueChange={(value) => updateSkill(skill.id, 'level', value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Beginner">Beginner</SelectItem>
                <SelectItem value="Intermediate">Intermediate</SelectItem>
                <SelectItem value="Advanced">Advanced</SelectItem>
                <SelectItem value="Expert">Expert</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => deleteSkill(skill.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}
      <Button onClick={addSkill} variant="outline" className="w-full">
        <Plus className="h-4 w-4 mr-2" />
        Add Skill
      </Button>
    </div>
  );
};
