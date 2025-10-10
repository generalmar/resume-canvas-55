import { CoverLetterData } from '@/types/coverLetter';

export const mockCoverLetterData: CoverLetterData = {
  personalInfo: {
    fullName: 'John Smith',
    email: 'john.smith@email.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
  },
  recipientInfo: {
    hiringManager: 'Jane Doe',
    company: 'Tech Innovations Inc.',
    companyAddress: '123 Tech Street, San Francisco, CA 94102',
  },
  date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
  opening: 'Dear Jane Doe,',
  body: `I am writing to express my strong interest in the Senior Software Engineer position at Tech Innovations Inc. With over 8 years of experience in full-stack development and a proven track record of delivering scalable solutions, I am excited about the opportunity to contribute to your team.

Throughout my career, I have specialized in building robust web applications using modern technologies including React, Node.js, and cloud infrastructure. At my current position, I led the development of a microservices architecture that improved system performance by 40% and reduced deployment time by 60%.

What particularly excites me about Tech Innovations Inc. is your commitment to pushing the boundaries of technology while maintaining a focus on user experience. Your recent work in AI-powered solutions aligns perfectly with my passion for leveraging cutting-edge technology to solve real-world problems.

I am confident that my technical expertise, leadership experience, and dedication to continuous learning make me an ideal candidate for this role. I would welcome the opportunity to discuss how my background and skills can contribute to Tech Innovations Inc.'s continued success.`,
  closing: 'Thank you for considering my application. I look forward to the opportunity to discuss my qualifications further.\n\nSincerely,\nJohn Smith',
};
