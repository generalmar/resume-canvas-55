import { CoverLetterData } from '@/types/coverLetter';

interface CoverLetterPreviewProps {
  data: CoverLetterData;
}

export const CoverLetterPreview = ({ data }: CoverLetterPreviewProps) => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-card rounded-lg shadow-lg p-12 min-h-[1056px]">
        {/* Personal Info Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">{data.personalInfo.fullName}</h1>
          <div className="text-sm text-muted-foreground space-y-1">
            <p>{data.personalInfo.email} • {data.personalInfo.phone}</p>
            <p>{data.personalInfo.location}</p>
          </div>
        </div>

        {/* Date */}
        <div className="mb-6">
          <p className="text-sm">{data.date}</p>
        </div>

        {/* Recipient Info */}
        <div className="mb-6">
          <p className="text-sm font-medium">{data.recipientInfo.hiringManager}</p>
          <p className="text-sm">{data.recipientInfo.company}</p>
          <p className="text-sm text-muted-foreground">{data.recipientInfo.companyAddress}</p>
        </div>

        {/* Opening */}
        <div className="mb-6">
          <p className="text-sm">{data.opening}</p>
        </div>

        {/* Body */}
        <div className="mb-6 space-y-4">
          {data.body.split('\n\n').map((paragraph, index) => (
            <p key={index} className="text-sm leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Closing */}
        <div className="mt-8">
          {data.closing.split('\n').map((line, index) => (
            <p key={index} className="text-sm">
              {line}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};
