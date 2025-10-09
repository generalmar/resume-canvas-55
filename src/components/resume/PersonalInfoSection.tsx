import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PersonalInfo } from '@/types/resume';

interface PersonalInfoSectionProps {
  data: PersonalInfo;
  onChange: (data: PersonalInfo) => void;
}

export const PersonalInfoSection = ({ data, onChange }: PersonalInfoSectionProps) => {
  const handleChange = (field: keyof PersonalInfo, value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-4 p-4">
      <div className="space-y-2">
        <Label htmlFor="fullName">Full Name</Label>
        <Input
          id="fullName"
          value={data.fullName}
          onChange={(e) => handleChange('fullName', e.target.value)}
          placeholder="John Doe"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="professionalTitle">Professional Title</Label>
        <Input
          id="professionalTitle"
          value={data.professionalTitle}
          onChange={(e) => handleChange('professionalTitle', e.target.value)}
          placeholder="Senior Software Engineer"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={data.email}
          onChange={(e) => handleChange('email', e.target.value)}
          placeholder="john.doe@email.com"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="phone">Phone</Label>
        <Input
          id="phone"
          value={data.phone}
          onChange={(e) => handleChange('phone', e.target.value)}
          placeholder="+1 (555) 123-4567"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="location">Location</Label>
        <Input
          id="location"
          value={data.location}
          onChange={(e) => handleChange('location', e.target.value)}
          placeholder="San Francisco, CA"
        />
      </div>
    </div>
  );
};
