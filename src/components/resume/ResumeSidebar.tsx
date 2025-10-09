import { useState } from 'react';
import { ResumeData, Section, SectionType } from '@/types/resume';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { PersonalInfoSection } from './PersonalInfoSection';
import { SummarySection } from './SummarySection';
import { ExperienceSection } from './ExperienceSection';
import { EducationSection } from './EducationSection';
import { SkillsSection } from './SkillsSection';
import { ProjectsSection } from './ProjectsSection';
import { AddSectionDialog } from './AddSectionDialog';
import { Button } from '@/components/ui/button';
import { GripVertical, User, FileText, Briefcase, GraduationCap, Code, FolderKanban, Plus } from 'lucide-react';
import { DndContext, closestCenter, DragEndEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface ResumeSidebarProps {
  data: ResumeData;
  onUpdate: (data: ResumeData) => void;
}

const iconMap = {
  User,
  FileText,
  Briefcase,
  GraduationCap,
  Code,
  FolderKanban,
};

const SortableSection = ({ section, children }: { section: Section; children: React.ReactNode }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: section.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const Icon = iconMap[section.icon as keyof typeof iconMap] || User;

  return (
    <AccordionItem value={section.id} ref={setNodeRef} style={style} className="border-b">
      <AccordionTrigger className="hover:no-underline hover:bg-accent px-4">
        <div className="flex items-center gap-2 w-full">
          <div {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing">
            <GripVertical className="h-4 w-4 text-muted-foreground" />
          </div>
          <Icon className="h-4 w-4 text-primary" />
          <span className="font-medium">{section.title}</span>
        </div>
      </AccordionTrigger>
      <AccordionContent>{children}</AccordionContent>
    </AccordionItem>
  );
};

export const ResumeSidebar = ({ data, onUpdate }: ResumeSidebarProps) => {
  const [activeSection, setActiveSection] = useState<string>('personal');
  const [showAddDialog, setShowAddDialog] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = data.sections.findIndex((s) => s.id === active.id);
      const newIndex = data.sections.findIndex((s) => s.id === over.id);

      const newSections = [...data.sections];
      const [removed] = newSections.splice(oldIndex, 1);
      newSections.splice(newIndex, 0, removed);

      onUpdate({ ...data, sections: newSections });
    }
  };

  const handleAddSection = (type: SectionType, title: string) => {
    const iconMap: Record<SectionType, string> = {
      personal: 'User',
      summary: 'FileText',
      experience: 'Briefcase',
      education: 'GraduationCap',
      skills: 'Code',
      projects: 'FolderKanban',
    };

    const newSection: Section = {
      id: `${type}-${Date.now()}`,
      type,
      title,
      icon: iconMap[type],
    };

    onUpdate({ ...data, sections: [...data.sections, newSection] });
  };

  const renderSectionContent = (sectionType: SectionType) => {
    switch (sectionType) {
      case 'personal':
        return (
          <PersonalInfoSection
            data={data.personalInfo}
            onChange={(personalInfo) => onUpdate({ ...data, personalInfo })}
          />
        );
      case 'summary':
        return (
          <SummarySection
            summary={data.professionalSummary}
            onChange={(professionalSummary) => onUpdate({ ...data, professionalSummary })}
          />
        );
      case 'experience':
        return (
          <ExperienceSection
            experiences={data.experiences}
            onChange={(experiences) => onUpdate({ ...data, experiences })}
          />
        );
      case 'education':
        return (
          <EducationSection
            education={data.education}
            onChange={(education) => onUpdate({ ...data, education })}
          />
        );
      case 'skills':
        return (
          <SkillsSection
            skills={data.skills}
            onChange={(skills) => onUpdate({ ...data, skills })}
          />
        );
      case 'projects':
        return (
          <ProjectsSection
            projects={data.projects}
            onChange={(projects) => onUpdate({ ...data, projects })}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="h-full flex flex-col bg-card border-r">
      <div className="p-4 border-b">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">M</span>
          </div>
          <h1 className="text-lg font-bold">Resume Builder</h1>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={data.sections.map((s) => s.id)} strategy={verticalListSortingStrategy}>
            <Accordion type="single" value={activeSection} onValueChange={setActiveSection} collapsible>
              {data.sections.map((section) => (
                <SortableSection key={section.id} section={section}>
                  {renderSectionContent(section.type)}
                </SortableSection>
              ))}
            </Accordion>
          </SortableContext>
        </DndContext>
      </div>

      <div className="p-4 border-t">
        <Button onClick={() => setShowAddDialog(true)} className="w-full gap-2">
          <Plus className="h-4 w-4" />
          Add Section
        </Button>
      </div>

      <AddSectionDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        onAdd={handleAddSection}
      />
    </div>
  );
};
