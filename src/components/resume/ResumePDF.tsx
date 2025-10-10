import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '@/types/resume';
import { ResumeTemplate } from '@/types/template';

const professionalStyles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: '#ffffff',
    fontFamily: 'Helvetica',
  },
  header: {
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  title: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 8,
  },
  contactInfo: {
    fontSize: 10,
    color: '#666666',
    marginBottom: 2,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#000000',
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    paddingBottom: 4,
  },
  summaryText: {
    fontSize: 10,
    lineHeight: 1.5,
    color: '#333333',
  },
  experienceItem: {
    marginBottom: 12,
  },
  experienceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  jobTitle: {
    fontSize: 11,
    fontWeight: 'bold',
  },
  company: {
    fontSize: 10,
    color: '#666666',
    marginBottom: 2,
  },
  dateLocation: {
    fontSize: 9,
    color: '#666666',
  },
  description: {
    fontSize: 10,
    lineHeight: 1.4,
    color: '#333333',
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  skill: {
    fontSize: 10,
    backgroundColor: '#f5f5f5',
    padding: '4 8',
    borderRadius: 4,
    marginBottom: 4,
  },
  projectItem: {
    marginBottom: 10,
  },
  projectName: {
    fontSize: 11,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  projectDescription: {
    fontSize: 10,
    lineHeight: 1.4,
    color: '#333333',
    marginBottom: 2,
  },
  projectTech: {
    fontSize: 9,
    color: '#666666',
    fontStyle: 'italic',
  },
});

const modernStyles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: '#ffffff',
    fontFamily: 'Helvetica',
  },
  header: {
    marginBottom: 20,
    backgroundColor: '#3b82f6',
    padding: 20,
    margin: -40,
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#ffffff',
  },
  title: {
    fontSize: 14,
    color: '#e0e7ff',
    marginBottom: 8,
  },
  contactInfo: {
    fontSize: 10,
    color: '#e0e7ff',
    marginBottom: 2,
  },
  section: {
    marginBottom: 18,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#3b82f6',
    borderBottomWidth: 2,
    borderBottomColor: '#3b82f6',
    paddingBottom: 4,
  },
  summaryText: {
    fontSize: 10,
    lineHeight: 1.6,
    color: '#333333',
  },
  experienceItem: {
    marginBottom: 14,
    paddingLeft: 12,
    borderLeftWidth: 3,
    borderLeftColor: '#93c5fd',
  },
  experienceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  jobTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1e40af',
  },
  company: {
    fontSize: 10,
    color: '#666666',
    marginBottom: 2,
  },
  dateLocation: {
    fontSize: 9,
    color: '#666666',
  },
  description: {
    fontSize: 10,
    lineHeight: 1.5,
    color: '#333333',
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  skill: {
    fontSize: 10,
    backgroundColor: '#dbeafe',
    color: '#1e40af',
    padding: '5 10',
    borderRadius: 6,
    marginBottom: 4,
  },
  projectItem: {
    marginBottom: 12,
    backgroundColor: '#f8fafc',
    padding: 10,
    borderRadius: 4,
  },
  projectName: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#1e40af',
    marginBottom: 3,
  },
  projectDescription: {
    fontSize: 10,
    lineHeight: 1.4,
    color: '#333333',
    marginBottom: 3,
  },
  projectTech: {
    fontSize: 9,
    color: '#3b82f6',
    fontStyle: 'italic',
  },
});

const minimalStyles = StyleSheet.create({
  page: {
    padding: 50,
    backgroundColor: '#ffffff',
    fontFamily: 'Helvetica',
  },
  header: {
    marginBottom: 30,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 6,
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 12,
    color: '#999999',
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  contactInfo: {
    fontSize: 9,
    color: '#666666',
    marginBottom: 2,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000000',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  summaryText: {
    fontSize: 10,
    lineHeight: 1.7,
    color: '#333333',
  },
  experienceItem: {
    marginBottom: 14,
  },
  experienceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  jobTitle: {
    fontSize: 11,
    fontWeight: 'bold',
  },
  company: {
    fontSize: 10,
    color: '#666666',
    marginBottom: 3,
  },
  dateLocation: {
    fontSize: 9,
    color: '#999999',
  },
  description: {
    fontSize: 10,
    lineHeight: 1.5,
    color: '#444444',
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  skill: {
    fontSize: 10,
    color: '#333333',
    padding: '3 0',
    marginBottom: 4,
    marginRight: 8,
  },
  projectItem: {
    marginBottom: 12,
  },
  projectName: {
    fontSize: 11,
    fontWeight: 'bold',
    marginBottom: 3,
  },
  projectDescription: {
    fontSize: 10,
    lineHeight: 1.5,
    color: '#444444',
    marginBottom: 3,
  },
  projectTech: {
    fontSize: 9,
    color: '#999999',
  },
});

interface ResumePDFProps {
  data: ResumeData;
  template?: ResumeTemplate;
}

export const ResumePDF = ({ data, template = 'professional' }: ResumePDFProps) => {
  const styles = template === 'modern' ? modernStyles : template === 'minimal' ? minimalStyles : professionalStyles;
  
  const renderSection = (sectionType: string) => {
    switch (sectionType) {
      case 'summary':
        return (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Professional Summary</Text>
            <Text style={styles.summaryText}>{data.professionalSummary}</Text>
          </View>
        );

      case 'experience':
        return (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Experience</Text>
            {data.experiences.map((exp) => (
              <View key={exp.id} style={styles.experienceItem}>
                <View style={styles.experienceHeader}>
                  <View>
                    <Text style={styles.jobTitle}>{exp.title}</Text>
                    <Text style={styles.company}>{exp.company}</Text>
                  </View>
                </View>
                <Text style={styles.dateLocation}>
                  {exp.startDate} - {exp.current ? 'Present' : exp.endDate} | {exp.location}
                </Text>
                <Text style={styles.description}>{exp.description}</Text>
              </View>
            ))}
          </View>
        );

      case 'education':
        return (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {data.education.map((edu) => (
              <View key={edu.id} style={styles.experienceItem}>
                <Text style={styles.jobTitle}>{edu.degree}</Text>
                <Text style={styles.company}>{edu.institution}</Text>
                <Text style={styles.dateLocation}>
                  {edu.graduationDate} | {edu.location}
                  {edu.gpa && ` | GPA: ${edu.gpa}`}
                </Text>
              </View>
            ))}
          </View>
        );

      case 'skills':
        return (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills</Text>
            <View style={styles.skillsContainer}>
              {data.skills.map((skill) => (
                <Text key={skill.id} style={styles.skill}>
                  {skill.name} ({skill.level})
                </Text>
              ))}
            </View>
          </View>
        );

      case 'projects':
        return (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Projects</Text>
            {data.projects.map((project) => (
              <View key={project.id} style={styles.projectItem}>
                <Text style={styles.projectName}>{project.name}</Text>
                <Text style={styles.projectDescription}>{project.description}</Text>
                <Text style={styles.projectTech}>{project.technologies}</Text>
              </View>
            ))}
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.name}>{data.personalInfo.fullName}</Text>
          <Text style={styles.title}>{data.personalInfo.professionalTitle}</Text>
          <Text style={styles.contactInfo}>{data.personalInfo.email}</Text>
          <Text style={styles.contactInfo}>{data.personalInfo.phone}</Text>
          <Text style={styles.contactInfo}>{data.personalInfo.location}</Text>
        </View>

        {data.sections
          .filter((section) => section.type !== 'personal')
          .map((section) => (
            <View key={section.id}>{renderSection(section.type)}</View>
          ))}
      </Page>
    </Document>
  );
};
