import { useState } from 'react';
import { ResumeData } from '@/types/resume';
import { mockResumeData } from '@/data/mockData';
import { ResumeSidebar } from '@/components/resume/ResumeSidebar';
import { ResumePreview } from '@/components/resume/ResumePreview';
import { Button } from '@/components/ui/button';
import { Eye, Share2, Download } from 'lucide-react';

const Index = () => {
  const [resumeData, setResumeData] = useState<ResumeData>(mockResumeData);

  return (
    <div className="flex h-screen w-full bg-background">
      {/* Sidebar */}
      <div className="w-[400px] flex-shrink-0">
        <ResumeSidebar data={resumeData} onUpdate={setResumeData} />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 border-b bg-card flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" className="gap-2">
              <div className="w-4 h-4 rounded bg-primary" />
              <span className="font-medium">Resume</span>
            </Button>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">Theme:</span>
              <span className="font-medium">Professional</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="gap-2">
              <Eye className="h-4 w-4" />
              Preview
            </Button>
            <Button variant="outline" className="gap-2">
              <Share2 className="h-4 w-4" />
              Share
            </Button>
            <Button className="gap-2">
              <Download className="h-4 w-4" />
              Download
            </Button>
          </div>
        </header>

        {/* Preview Area */}
        <div className="flex-1 overflow-auto bg-muted p-8">
          <ResumePreview data={resumeData} />
        </div>
      </div>
    </div>
  );
};

export default Index;
