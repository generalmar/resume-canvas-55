import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SectionType } from '@/types/resume';
import { Briefcase, GraduationCap, Code, FolderKanban } from 'lucide-react';

interface AddSectionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (type: SectionType, title: string) => void;
}

const sectionTypeOptions = [
  { value: 'experience' as SectionType, label: 'Experience', icon: Briefcase },
  { value: 'education' as SectionType, label: 'Education', icon: GraduationCap },
  { value: 'skills' as SectionType, label: 'Skills', icon: Code },
  { value: 'projects' as SectionType, label: 'Projects', icon: FolderKanban },
];

export const AddSectionDialog = ({ open, onOpenChange, onAdd }: AddSectionDialogProps) => {
  const [sectionType, setSectionType] = useState<SectionType>('experience');
  const [title, setTitle] = useState('');

  const handleAdd = () => {
    if (!title.trim()) {
      return;
    }
    onAdd(sectionType, title);
    setTitle('');
    setSectionType('experience');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Section</DialogTitle>
          <DialogDescription>
            Choose a section type and customize its title
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="section-type">Section Type</Label>
            <Select value={sectionType} onValueChange={(value) => setSectionType(value as SectionType)}>
              <SelectTrigger id="section-type">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {sectionTypeOptions.map((option) => {
                  const Icon = option.icon;
                  return (
                    <SelectItem key={option.value} value={option.value}>
                      <div className="flex items-center gap-2">
                        <Icon className="h-4 w-4" />
                        {option.label}
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="section-title">Section Title</Label>
            <Input
              id="section-title"
              placeholder="Enter section title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleAdd} disabled={!title.trim()}>
            Add Section
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
