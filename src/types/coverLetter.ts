export interface CoverLetterData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
  };
  recipientInfo: {
    hiringManager: string;
    company: string;
    companyAddress: string;
  };
  date: string;
  opening: string;
  body: string;
  closing: string;
}
