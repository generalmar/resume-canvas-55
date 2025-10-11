import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, Plus } from 'lucide-react';
import { toast } from 'sonner';
import { ResumeTemplate } from '@/types/template';

interface Resume {
  id: string;
  title: string;
  template: ResumeTemplate;
  lastModified: string;
  status: 'draft' | 'complete';
}

const Resumes = () => {
  const navigate = useNavigate();
  const [resumes, setResumes] = useState<Resume[]>([
    {
      id: '1',
      title: 'Software Engineer Resume',
      template: 'professional',
      lastModified: '2024-03-15',
      status: 'complete',
    },
    {
      id: '2',
      title: 'Frontend Developer Resume',
      template: 'modern',
      lastModified: '2024-03-10',
      status: 'draft',
    },
    {
      id: '3',
      title: 'Full Stack Developer Resume',
      template: 'minimal',
      lastModified: '2024-03-05',
      status: 'complete',
    },
  ]);

  const handleEdit = (id: string) => {
    navigate('/');
    toast.success('Resume loaded for editing');
  };

  const handleDelete = (id: string) => {
    setResumes(resumes.filter(r => r.id !== id));
    toast.success('Resume deleted successfully');
  };

  const handleCreateNew = () => {
    navigate('/');
    toast.success('Creating new resume');
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">My Resumes</h1>
            <p className="text-muted-foreground">Manage and edit your resumes</p>
          </div>
          <Button onClick={handleCreateNew} className="gap-2">
            <Plus className="h-4 w-4" />
            New Resume
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resumes.map((resume) => (
            <Card key={resume.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-xl">{resume.title}</CardTitle>
                  <Badge variant={resume.status === 'complete' ? 'default' : 'secondary'}>
                    {resume.status}
                  </Badge>
                </div>
                <CardDescription>
                  Template: {resume.template}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Last modified: {new Date(resume.lastModified).toLocaleDateString()}
                </p>
              </CardContent>
              <CardFooter className="gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 gap-2"
                  onClick={() => handleEdit(resume.id)}
                >
                  <Edit className="h-4 w-4" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(resume.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Resumes;
