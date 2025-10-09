import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface SummarySectionProps {
  summary: string;
  onChange: (summary: string) => void;
}

export const SummarySection = ({ summary, onChange }: SummarySectionProps) => {
  return (
    <div className="space-y-4 p-4">
      <div className="space-y-2">
        <Label htmlFor="summary">Professional Summary</Label>
        <Textarea
          id="summary"
          value={summary}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Write a brief summary of your professional background..."
          rows={6}
          className="resize-none"
        />
      </div>
    </div>
  );
};
