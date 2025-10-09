import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Project } from '@/types/resume';
import { Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface ProjectsSectionProps {
  projects: Project[];
  onChange: (projects: Project[]) => void;
}

export const ProjectsSection = ({ projects, onChange }: ProjectsSectionProps) => {
  const [editingId, setEditingId] = useState<string | null>(projects[0]?.id || null);

  const addProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      name: '',
      description: '',
      technologies: '',
      url: '',
    };
    onChange([...projects, newProject]);
    setEditingId(newProject.id);
  };

  const updateProject = (id: string, field: keyof Project, value: string) => {
    onChange(
      projects.map((project) =>
        project.id === id ? { ...project, [field]: value } : project
      )
    );
  };

  const deleteProject = (id: string) => {
    onChange(projects.filter((project) => project.id !== id));
    if (editingId === id) {
      setEditingId(projects[0]?.id || null);
    }
  };

  return (
    <div className="space-y-4 p-4">
      {projects.map((project) => (
        <div key={project.id} className="border rounded-lg">
          <div
            className="flex items-center justify-between p-3 cursor-pointer hover:bg-accent"
            onClick={() => setEditingId(editingId === project.id ? null : project.id)}
          >
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{project.name || 'New Project'}</p>
              <p className="text-sm text-muted-foreground truncate">{project.technologies}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                deleteProject(project.id);
              }}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
          {editingId === project.id && (
            <div className="p-4 space-y-4 border-t">
              <div className="space-y-2">
                <Label>Project Name</Label>
                <Input
                  value={project.name}
                  onChange={(e) => updateProject(project.id, 'name', e.target.value)}
                  placeholder="E-commerce Platform"
                />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={project.description}
                  onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                  placeholder="Describe the project and your role..."
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label>Technologies</Label>
                <Input
                  value={project.technologies}
                  onChange={(e) => updateProject(project.id, 'technologies', e.target.value)}
                  placeholder="React, Node.js, MongoDB"
                />
              </div>
              <div className="space-y-2">
                <Label>URL (Optional)</Label>
                <Input
                  value={project.url || ''}
                  onChange={(e) => updateProject(project.id, 'url', e.target.value)}
                  placeholder="https://github.com/username/project"
                />
              </div>
            </div>
          )}
        </div>
      ))}
      <Button onClick={addProject} variant="outline" className="w-full">
        <Plus className="h-4 w-4 mr-2" />
        Add Project
      </Button>
    </div>
  );
};
