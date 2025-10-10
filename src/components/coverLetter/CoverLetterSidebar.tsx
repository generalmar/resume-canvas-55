import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { CoverLetterData } from '@/types/coverLetter';
import { ScrollArea } from '@/components/ui/scroll-area';

interface CoverLetterSidebarProps {
  data: CoverLetterData;
  onUpdate: (data: CoverLetterData) => void;
}

export const CoverLetterSidebar = ({ data, onUpdate }: CoverLetterSidebarProps) => {
  const handlePersonalInfoChange = (field: keyof CoverLetterData['personalInfo'], value: string) => {
    onUpdate({
      ...data,
      personalInfo: {
        ...data.personalInfo,
        [field]: value,
      },
    });
  };

  const handleRecipientInfoChange = (field: keyof CoverLetterData['recipientInfo'], value: string) => {
    onUpdate({
      ...data,
      recipientInfo: {
        ...data.recipientInfo,
        [field]: value,
      },
    });
  };

  const handleFieldChange = (field: keyof CoverLetterData, value: string) => {
    onUpdate({
      ...data,
      [field]: value,
    });
  };

  return (
    <div className="h-full border-r bg-card">
      <div className="p-4 border-b">
        <h2 className="font-semibold text-lg">Cover Letter Editor</h2>
      </div>
      <ScrollArea className="h-[calc(100vh-8rem)]">
        <div className="p-4 space-y-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="font-medium text-sm text-muted-foreground">Your Information</h3>
            <div className="space-y-3">
              <div>
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  value={data.personalInfo.fullName}
                  onChange={(e) => handlePersonalInfoChange('fullName', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={data.personalInfo.email}
                  onChange={(e) => handlePersonalInfoChange('email', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={data.personalInfo.phone}
                  onChange={(e) => handlePersonalInfoChange('phone', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={data.personalInfo.location}
                  onChange={(e) => handlePersonalInfoChange('location', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Recipient Information */}
          <div className="space-y-4">
            <h3 className="font-medium text-sm text-muted-foreground">Recipient Information</h3>
            <div className="space-y-3">
              <div>
                <Label htmlFor="hiringManager">Hiring Manager</Label>
                <Input
                  id="hiringManager"
                  value={data.recipientInfo.hiringManager}
                  onChange={(e) => handleRecipientInfoChange('hiringManager', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="company">Company Name</Label>
                <Input
                  id="company"
                  value={data.recipientInfo.company}
                  onChange={(e) => handleRecipientInfoChange('company', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="companyAddress">Company Address</Label>
                <Input
                  id="companyAddress"
                  value={data.recipientInfo.companyAddress}
                  onChange={(e) => handleRecipientInfoChange('companyAddress', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Date */}
          <div className="space-y-4">
            <h3 className="font-medium text-sm text-muted-foreground">Date</h3>
            <div>
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                value={data.date}
                onChange={(e) => handleFieldChange('date', e.target.value)}
              />
            </div>
          </div>

          {/* Opening */}
          <div className="space-y-4">
            <h3 className="font-medium text-sm text-muted-foreground">Opening</h3>
            <div>
              <Label htmlFor="opening">Salutation</Label>
              <Input
                id="opening"
                value={data.opening}
                onChange={(e) => handleFieldChange('opening', e.target.value)}
                placeholder="Dear Hiring Manager,"
              />
            </div>
          </div>

          {/* Body */}
          <div className="space-y-4">
            <h3 className="font-medium text-sm text-muted-foreground">Letter Body</h3>
            <div>
              <Label htmlFor="body">Main Content</Label>
              <Textarea
                id="body"
                value={data.body}
                onChange={(e) => handleFieldChange('body', e.target.value)}
                className="min-h-[300px]"
                placeholder="Write your cover letter content here..."
              />
            </div>
          </div>

          {/* Closing */}
          <div className="space-y-4">
            <h3 className="font-medium text-sm text-muted-foreground">Closing</h3>
            <div>
              <Label htmlFor="closing">Sign Off</Label>
              <Textarea
                id="closing"
                value={data.closing}
                onChange={(e) => handleFieldChange('closing', e.target.value)}
                className="min-h-[100px]"
                placeholder="Sincerely,&#10;Your Name"
              />
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};
