import { useState } from 'react';
import { ResumeData } from '@/types/resume';
import { mockResumeData } from '@/data/mockData';
import { ResumeSidebar } from '@/components/resume/ResumeSidebar';
import { ResumePreview } from '@/components/resume/ResumePreview';
import { ResumePDF } from '@/components/resume/ResumePDF';
import { Button } from '@/components/ui/button';
import { Eye, Share2, Download } from 'lucide-react';
import { pdf } from '@react-pdf/renderer';
import { toast } from 'sonner';

const Index = () => {
  const [resumeData, setResumeData] = useState<ResumeData>(mockResumeData);
  const [activeSection, setActiveSection] = useState<string>('personal');

  const handleDownloadPDF = async () => {
    try {
      const blob = await pdf(<ResumePDF data={resumeData} />).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${resumeData.personalInfo.fullName.replace(/\s+/g, '_')}_Resume.pdf`;
      link.click();
      URL.revokeObjectURL(url);
      toast.success('Resume downloaded successfully!');
    } catch (error) {
      toast.error('Failed to download resume');
      console.error(error);
    }
  };

  const handleShare = async () => {
    try {
      const blob = await pdf(<ResumePDF data={resumeData} />).toBlob();
      const file = new File([blob], `${resumeData.personalInfo.fullName}_Resume.pdf`, {
        type: 'application/pdf',
      });

      if (navigator.share && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: 'My Resume',
          text: `${resumeData.personalInfo.fullName}'s Resume`,
        });
        toast.success('Resume shared successfully!');
      } else {
        // Fallback: copy link or download
        await handleDownloadPDF();
        toast.info('Sharing not supported. Resume downloaded instead.');
      }
    } catch (error) {
      toast.error('Failed to share resume');
      console.error(error);
    }
  };

  return (
    <div className="flex h-screen w-full bg-background">
      {/* Sidebar */}
      <div className="w-[400px] flex-shrink-0">
        <ResumeSidebar 
          data={resumeData} 
          onUpdate={setResumeData}
          activeSection={activeSection}
          onActiveSectionChange={setActiveSection}
        />
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
            <Button variant="outline" className="gap-2" onClick={handleShare}>
              <Share2 className="h-4 w-4" />
              Share
            </Button>
            <Button className="gap-2" onClick={handleDownloadPDF}>
              <Download className="h-4 w-4" />
              Download PDF
            </Button>
          </div>
        </header>

        {/* Preview Area */}
        <div className="flex-1 overflow-auto bg-muted p-8">
          <ResumePreview data={resumeData} onSectionHover={setActiveSection} />
        </div>
      </div>
    </div>
  );
};

export default Index;
