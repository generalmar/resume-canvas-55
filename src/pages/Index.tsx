import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ResumeData } from '@/types/resume';
import { CoverLetterData } from '@/types/coverLetter';
import { ResumeTemplate, CoverLetterTemplate, resumeTemplates, coverLetterTemplates } from '@/types/template';
import { mockResumeData } from '@/data/mockData';
import { mockCoverLetterData } from '@/data/mockCoverLetterData';
import { ResumeSidebar } from '@/components/resume/ResumeSidebar';
import { ResumePreview } from '@/components/resume/ResumePreview';
import { ResumePDF } from '@/components/resume/ResumePDF';
import { CoverLetterSidebar } from '@/components/coverLetter/CoverLetterSidebar';
import { CoverLetterPreview } from '@/components/coverLetter/CoverLetterPreview';
import { CoverLetterPDF } from '@/components/coverLetter/CoverLetterPDF';
import { DocumentList } from '@/components/DocumentList';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Share2, Download, User, FileText, CreditCard, LogOut, Menu, Coins } from 'lucide-react';
import { pdf } from '@react-pdf/renderer';
import { toast } from 'sonner';

const Index = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'resume' | 'cover-letter'>('resume');
  const [resumeData, setResumeData] = useState<ResumeData>(mockResumeData);
  const [coverLetterData, setCoverLetterData] = useState<CoverLetterData>(mockCoverLetterData);
  const [activeSection, setActiveSection] = useState<string>('personal');
  const [resumeTemplate, setResumeTemplate] = useState<ResumeTemplate>('professional');
  const [coverLetterTemplate, setCoverLetterTemplate] = useState<CoverLetterTemplate>('professional');

  const [resumes, setResumes] = useState([
    {
      id: '1',
      title: 'Software Engineer Resume',
      dateCreated: '2024-03-15',
      template: 'professional' as ResumeTemplate,
      data: mockResumeData,
    },
    {
      id: '2',
      title: 'Frontend Developer Resume',
      dateCreated: '2024-03-10',
      template: 'modern' as ResumeTemplate,
      data: mockResumeData,
    },
  ]);

  const [coverLetters, setCoverLetters] = useState([
    {
      id: '1',
      title: 'Software Engineer Position',
      dateCreated: '2024-03-15',
      template: 'professional' as CoverLetterTemplate,
      data: mockCoverLetterData,
    },
    {
      id: '2',
      title: 'Frontend Developer Role',
      dateCreated: '2024-03-10',
      template: 'modern' as CoverLetterTemplate,
      data: mockCoverLetterData,
    },
  ]);

  const handleDownloadPDF = async () => {
    try {
      if (activeTab === 'resume') {
        const blob = await pdf(<ResumePDF data={resumeData} template={resumeTemplate} />).toBlob();
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${resumeData.personalInfo.fullName.replace(/\s+/g, '_')}_Resume.pdf`;
        link.click();
        URL.revokeObjectURL(url);
        toast.success('Resume downloaded successfully!');
      } else {
        const blob = await pdf(<CoverLetterPDF data={coverLetterData} template={coverLetterTemplate} />).toBlob();
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

  const handleEditResume = (doc: any) => {
    setResumeData(doc.data);
    setResumeTemplate(doc.template);
    toast.success('Resume loaded for editing');
  };

  const handleDeleteResume = (id: string) => {
    setResumes(resumes.filter(r => r.id !== id));
    toast.success('Resume deleted successfully');
  };

  const handleEditCoverLetter = (doc: any) => {
    setCoverLetterData(doc.data);
    setCoverLetterTemplate(doc.template);
    toast.success('Cover letter loaded for editing');
  };

  const handleDeleteCoverLetter = (id: string) => {
    setCoverLetters(coverLetters.filter(c => c.id !== id));
    toast.success('Cover letter deleted successfully');
  };

  const handleShare = async () => {
    try {
      if (activeTab === 'resume') {
        const blob = await pdf(<ResumePDF data={resumeData} template={resumeTemplate} />).toBlob();
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
        const blob = await pdf(<CoverLetterPDF data={coverLetterData} template={coverLetterTemplate} />).toBlob();
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
      {/* Left Sidebar */}
      <div className="hidden lg:flex lg:w-[350px] flex-shrink-0 flex-col border-r">
        <div className="flex-1 overflow-auto">
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
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-16 border-b bg-card flex items-center justify-between px-3 md:px-6 gap-2">
          <div className="flex items-center gap-2 md:gap-4 min-w-0">
            {/* Mobile Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                <DropdownMenuLabel>Navigation</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setActiveTab('resume')}>
                  <FileText className="h-4 w-4 mr-2" />
                  Resume
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setActiveTab('cover-letter')}>
                  <FileText className="h-4 w-4 mr-2" />
                  Cover Letter
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="flex items-center gap-2 min-w-0">
              <div className="w-4 h-4 rounded bg-primary hidden md:block" />
              <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'resume' | 'cover-letter')} className="hidden md:block">
                <TabsList>
                  <TabsTrigger value="resume">Resume</TabsTrigger>
                  <TabsTrigger value="cover-letter">Cover Letter</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            
            <div className="flex items-center gap-2 text-sm min-w-0">
              <span className="text-muted-foreground hidden md:inline">Template:</span>
              <Select
                value={activeTab === 'resume' ? resumeTemplate : coverLetterTemplate}
                onValueChange={(value) => {
                  if (activeTab === 'resume') {
                    setResumeTemplate(value as ResumeTemplate);
                  } else {
                    setCoverLetterTemplate(value as CoverLetterTemplate);
                  }
                }}
              >
                <SelectTrigger className="w-[130px] md:w-[160px] h-9">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {(activeTab === 'resume' ? resumeTemplates : coverLetterTemplates).map((template) => (
                    <SelectItem key={template.id} value={template.id}>
                      {template.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2 hidden md:flex" onClick={handleShare}>
              <Share2 className="h-4 w-4" />
              <span className="hidden lg:inline">Share</span>
            </Button>
            <Button size="sm" className="gap-2" onClick={handleDownloadPDF}>
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Download</span>
            </Button>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/profile')}>
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/resumes')}>
                  <FileText className="h-4 w-4 mr-2" />
                  My Resumes
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/cover-letters')}>
                  <FileText className="h-4 w-4 mr-2" />
                  My Cover Letters
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/profile')}>
                  <CreditCard className="h-4 w-4 mr-2" />
                  Subscription
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/profile')}>
                  <Coins className="h-4 w-4 mr-2" />
                  Tokens
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive">
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Preview Area */}
        <div className="flex-1 overflow-auto bg-muted p-4 md:p-8">
          {activeTab === 'resume' ? (
            <ResumePreview data={resumeData} onSectionHover={setActiveSection} />
          ) : (
            <CoverLetterPreview data={coverLetterData} />
          )}
        </div>
      </div>

      {/* Right Sidebar - Document List */}
      <div className="hidden xl:flex xl:w-[320px] flex-shrink-0">
        {activeTab === 'resume' ? (
          <DocumentList
            type="resume"
            documents={resumes}
            onEdit={handleEditResume}
            onDelete={handleDeleteResume}
          />
        ) : (
          <DocumentList
            type="cover-letter"
            documents={coverLetters}
            onEdit={handleEditCoverLetter}
            onDelete={handleDeleteCoverLetter}
          />
        )}
      </div>
    </div>
  );
};

export default Index;
