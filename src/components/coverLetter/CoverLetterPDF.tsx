import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { CoverLetterData } from '@/types/coverLetter';

const styles = StyleSheet.create({
  page: {
    padding: 48,
    fontFamily: 'Helvetica',
    fontSize: 11,
    lineHeight: 1.6,
  },
  header: {
    marginBottom: 24,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  contactInfo: {
    fontSize: 10,
    color: '#666',
    marginBottom: 2,
  },
  date: {
    marginBottom: 20,
    fontSize: 10,
  },
  recipient: {
    marginBottom: 20,
    fontSize: 10,
  },
  recipientLine: {
    marginBottom: 2,
  },
  opening: {
    marginBottom: 16,
  },
  body: {
    marginBottom: 16,
  },
  paragraph: {
    marginBottom: 12,
    textAlign: 'justify',
  },
  closing: {
    marginTop: 24,
  },
  closingLine: {
    marginBottom: 4,
  },
});

interface CoverLetterPDFProps {
  data: CoverLetterData;
}

export const CoverLetterPDF = ({ data }: CoverLetterPDFProps) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header with Personal Info */}
        <View style={styles.header}>
          <Text style={styles.name}>{data.personalInfo.fullName}</Text>
          <Text style={styles.contactInfo}>
            {data.personalInfo.email} • {data.personalInfo.phone}
          </Text>
          <Text style={styles.contactInfo}>{data.personalInfo.location}</Text>
        </View>

        {/* Date */}
        <View style={styles.date}>
          <Text>{data.date}</Text>
        </View>

        {/* Recipient Info */}
        <View style={styles.recipient}>
          <Text style={styles.recipientLine}>{data.recipientInfo.hiringManager}</Text>
          <Text style={styles.recipientLine}>{data.recipientInfo.company}</Text>
          <Text style={styles.recipientLine}>{data.recipientInfo.companyAddress}</Text>
        </View>

        {/* Opening */}
        <View style={styles.opening}>
          <Text>{data.opening}</Text>
        </View>

        {/* Body */}
        <View style={styles.body}>
          {data.body.split('\n\n').map((paragraph, index) => (
            <Text key={index} style={styles.paragraph}>
              {paragraph}
            </Text>
          ))}
        </View>

        {/* Closing */}
        <View style={styles.closing}>
          {data.closing.split('\n').map((line, index) => (
            <Text key={index} style={styles.closingLine}>
              {line}
            </Text>
          ))}
        </View>
      </Page>
    </Document>
  );
};
