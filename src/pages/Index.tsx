import { useState } from 'react';
import { ResumeData } from '@/types/resume';
import { CoverLetterData } from '@/types/coverLetter';
import { mockResumeData } from '@/data/mockData';
import { mockCoverLetterData } from '@/data/mockCoverLetterData';
import { ResumeSidebar } from '@/components/resume/ResumeSidebar';
import { ResumePreview } from '@/components/resume/ResumePreview';
import { ResumePDF } from '@/components/resume/ResumePDF';
import { CoverLetterSidebar } from '@/components/coverLetter/CoverLetterSidebar';
import { CoverLetterPreview } from '@/components/coverLetter/CoverLetterPreview';
import { CoverLetterPDF } from '@/components/coverLetter/CoverLetterPDF';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Share2, Download } from 'lucide-react';
import { pdf } from '@react-pdf/renderer';
import { toast } from 'sonner';

const Index = () => {
  const [activeTab, setActiveTab] = useState<'resume' | 'cover-letter'>('resume');
  const [resumeData, setResumeData] = useState<ResumeData>(mockResumeData);
  const [coverLetterData, setCoverLetterData] = useState<CoverLetterData>(mockCoverLetterData);
  const [activeSection, setActiveSection] = useState<string>('personal');

  const handleDownloadPDF = async () => {
    try {
      if (activeTab === 'resume') {
        const blob = await pdf(<ResumePDF data={resumeData} />).toBlob();
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${resumeData.personalInfo.fullName.replace(/\s+/g, '_')}_Resume.pdf`;
        link.click();
        URL.revokeObjectURL(url);
        toast.success('Resume downloaded successfully!');
      } else {
        const blob = await pdf(<CoverLetterPDF data={coverLetterData} />).toBlob();
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${coverLetterData.personalInfo.fullName.replace(/\s+/g, '_')}_CoverLetter.pdf`;
        link.click();
        URL.revokeObjectURL(url);
        toast.success('Cover letter downloaded successfully!');
      }
    } catch (error) {
      toast.error(`Failed to download ${activeTab === 'resume' ? 'resume' : 'cover letter'}`);
      console.error(error);
    }
  };

  const handleShare = async () => {
    try {
      if (activeTab === 'resume') {
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
          await handleDownloadPDF();
          toast.info('Sharing not supported. Resume downloaded instead.');
        }
      } else {
        const blob = await pdf(<CoverLetterPDF data={coverLetterData} />).toBlob();
        const file = new File([blob], `${coverLetterData.personalInfo.fullName}_CoverLetter.pdf`, {
          type: 'application/pdf',
        });

        if (navigator.share && navigator.canShare({ files: [file] })) {
          await navigator.share({
            files: [file],
            title: 'My Cover Letter',
            text: `${coverLetterData.personalInfo.fullName}'s Cover Letter`,
          });
          toast.success('Cover letter shared successfully!');
        } else {
          await handleDownloadPDF();
          toast.info('Sharing not supported. Cover letter downloaded instead.');
        }
      }
    } catch (error) {
      toast.error(`Failed to share ${activeTab === 'resume' ? 'resume' : 'cover letter'}`);
      console.error(error);
    }
  };

  return (
    <div className="flex h-screen w-full bg-background">
      {/* Sidebar */}
      <div className="w-[400px] flex-shrink-0">
        {activeTab === 'resume' ? (
          <ResumeSidebar 
            data={resumeData} 
            onUpdate={setResumeData}
            activeSection={activeSection}
            onActiveSectionChange={setActiveSection}
          />
        ) : (
          <CoverLetterSidebar 
            data={coverLetterData} 
            onUpdate={setCoverLetterData}
          />
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 border-b bg-card flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-primary" />
              <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'resume' | 'cover-letter')}>
                <TabsList>
                  <TabsTrigger value="resume">Resume</TabsTrigger>
                  <TabsTrigger value="cover-letter">Cover Letter</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
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
          {activeTab === 'resume' ? (
            <ResumePreview data={resumeData} onSectionHover={setActiveSection} />
          ) : (
            <CoverLetterPreview data={coverLetterData} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
