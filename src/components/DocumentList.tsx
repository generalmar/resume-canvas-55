import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, Search } from 'lucide-react';
import { ResumeData } from '@/types/resume';
import { CoverLetterData } from '@/types/coverLetter';
import { ResumeTemplate, CoverLetterTemplate } from '@/types/template';

interface DocumentItem {
  id: string;
  title: string;
  dateCreated: string;
  template: ResumeTemplate | CoverLetterTemplate;
  data: ResumeData | CoverLetterData;
}

interface DocumentListProps {
  type: 'resume' | 'cover-letter';
  documents: DocumentItem[];
  onEdit: (document: DocumentItem) => void;
  onDelete: (id: string) => void;
}

export const DocumentList = ({ type, documents, onEdit, onDelete }: DocumentListProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDocuments = documents.filter(doc =>
    doc.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const truncateTitle = (title: string) => {
    return title.length > 15 ? title.substring(0, 15) + '...' : title;
  };

  return (
    <div className="h-full flex flex-col bg-card border-l">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold mb-3">
          My {type === 'resume' ? 'Resumes' : 'Cover Letters'}
        </h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      <div className="flex-1 overflow-auto p-4 space-y-3">
        {filteredDocuments.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-8">
            No {type === 'resume' ? 'resumes' : 'cover letters'} found
          </p>
        ) : (
          filteredDocuments.map((doc) => (
            <Card key={doc.id} className="p-3 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-sm mb-1" title={doc.title}>
                    {truncateTitle(doc.title)}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {new Date(doc.dateCreated).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => onEdit(doc)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => onDelete(doc.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};
