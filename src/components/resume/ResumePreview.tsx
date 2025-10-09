import { ResumeData } from '@/types/resume';
import { Mail, Phone, MapPin } from 'lucide-react';

interface ResumePreviewProps {
  data: ResumeData;
}

export const ResumePreview = ({ data }: ResumePreviewProps) => {
  const { personalInfo, professionalSummary, experiences, education, skills, projects, sections } = data;

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const [year, month] = dateString.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  const renderSection = (sectionType: string) => {
    switch (sectionType) {
      case 'summary':
        return professionalSummary && (
          <div className="mb-6">
            <h2 className="text-lg font-bold text-primary mb-2 pb-1 border-b-2 border-primary">
              PROFESSIONAL SUMMARY
            </h2>
            <p className="text-sm leading-relaxed">{professionalSummary}</p>
          </div>
        );

      case 'experience':
        return experiences.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-bold text-primary mb-2 pb-1 border-b-2 border-primary">
              EXPERIENCE
            </h2>
            {experiences.map((exp) => (
              <div key={exp.id} className="mb-4">
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="font-bold text-sm">{exp.title}</h3>
                    <p className="text-sm text-muted-foreground">{exp.company}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">{exp.location}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                    </p>
                  </div>
                </div>
                <p className="text-sm leading-relaxed mt-2">{exp.description}</p>
              </div>
            ))}
          </div>
        );

      case 'education':
        return education.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-bold text-primary mb-2 pb-1 border-b-2 border-primary">
              EDUCATION
            </h2>
            {education.map((edu) => (
              <div key={edu.id} className="mb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-sm">{edu.degree}</h3>
                    <p className="text-sm text-muted-foreground">{edu.institution}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">{edu.location}</p>
                    <p className="text-xs text-muted-foreground">{formatDate(edu.graduationDate)}</p>
                    {edu.gpa && <p className="text-xs text-muted-foreground">GPA: {edu.gpa}</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      case 'skills':
        return skills.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-bold text-primary mb-2 pb-1 border-b-2 border-primary">
              SKILLS
            </h2>
            <div className="grid grid-cols-2 gap-2">
              {skills.map((skill) => (
                <div key={skill.id} className="text-sm">
                  <span className="font-medium">{skill.name}</span>
                  <span className="text-muted-foreground ml-2">({skill.level})</span>
                </div>
              ))}
            </div>
          </div>
        );

      case 'projects':
        return projects.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-bold text-primary mb-2 pb-1 border-b-2 border-primary">
              PROJECTS
            </h2>
            {projects.map((project) => (
              <div key={project.id} className="mb-3">
                <h3 className="font-bold text-sm">{project.name}</h3>
                <p className="text-sm leading-relaxed mt-1">{project.description}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  <span className="font-medium">Technologies:</span> {project.technologies}
                </p>
                {project.url && (
                  <p className="text-xs text-primary mt-1">{project.url}</p>
                )}
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-white text-foreground p-8 shadow-lg min-h-[1056px] max-w-[816px] mx-auto">
      {/* Header */}
      <div className="text-center mb-6 pb-4 border-b-4 border-primary">
        <h1 className="text-3xl font-bold mb-2">{personalInfo.fullName}</h1>
        <p className="text-lg text-muted-foreground mb-3">{personalInfo.professionalTitle}</p>
        <div className="flex justify-center items-center gap-4 text-sm flex-wrap">
          <div className="flex items-center gap-1">
            <Mail className="h-3 w-3" />
            <span>{personalInfo.email}</span>
          </div>
          <div className="flex items-center gap-1">
            <Phone className="h-3 w-3" />
            <span>{personalInfo.phone}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            <span>{personalInfo.location}</span>
          </div>
        </div>
      </div>

      {/* Dynamic Sections */}
      {sections
        .filter((section) => section.type !== 'personal')
        .map((section) => (
          <div key={section.id}>
            {renderSection(section.type)}
          </div>
        ))}
    </div>
  );
};
