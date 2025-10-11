import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, Plus } from 'lucide-react';
import { toast } from 'sonner';
import { CoverLetterTemplate } from '@/types/template';

interface CoverLetter {
  id: string;
  title: string;
  template: CoverLetterTemplate;
  company: string;
  lastModified: string;
  status: 'draft' | 'complete';
}

const CoverLetters = () => {
  const navigate = useNavigate();
  const [coverLetters, setCoverLetters] = useState<CoverLetter[]>([
    {
      id: '1',
      title: 'Software Engineer Position',
      template: 'professional',
      company: 'Tech Corp',
      lastModified: '2024-03-15',
      status: 'complete',
    },
    {
      id: '2',
      title: 'Frontend Developer Role',
      template: 'modern',
      company: 'Digital Agency',
      lastModified: '2024-03-10',
      status: 'draft',
    },
    {
      id: '3',
      title: 'Full Stack Position',
      template: 'minimal',
      company: 'Startup Inc',
      lastModified: '2024-03-05',
      status: 'complete',
    },
  ]);

  const handleEdit = (id: string) => {
    navigate('/', { state: { tab: 'cover-letter' } });
    toast.success('Cover letter loaded for editing');
  };

  const handleDelete = (id: string) => {
    setCoverLetters(coverLetters.filter(c => c.id !== id));
    toast.success('Cover letter deleted successfully');
  };

  const handleCreateNew = () => {
    navigate('/', { state: { tab: 'cover-letter' } });
    toast.success('Creating new cover letter');
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">My Cover Letters</h1>
            <p className="text-muted-foreground">Manage and edit your cover letters</p>
          </div>
          <Button onClick={handleCreateNew} className="gap-2">
            <Plus className="h-4 w-4" />
            New Cover Letter
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coverLetters.map((letter) => (
            <Card key={letter.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-xl">{letter.title}</CardTitle>
                  <Badge variant={letter.status === 'complete' ? 'default' : 'secondary'}>
                    {letter.status}
                  </Badge>
                </div>
                <CardDescription>
                  {letter.company} • {letter.template}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Last modified: {new Date(letter.lastModified).toLocaleDateString()}
                </p>
              </CardContent>
              <CardFooter className="gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 gap-2"
                  onClick={() => handleEdit(letter.id)}
                >
                  <Edit className="h-4 w-4" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(letter.id)}
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

export default CoverLetters;
