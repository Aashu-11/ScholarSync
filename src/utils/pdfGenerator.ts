import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface ApplicationData {
  scholarshipName: string;
  essayPrompt: string;
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    address: string;
    education: string;
    activities: string;
  };
  essayContent: string;
}

export const generatePDF = async (data: ApplicationData): Promise<Blob> => {
  const { scholarshipName, essayPrompt, personalInfo, essayContent } = data;
  
  // Create a new PDF document
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });
  
  // Set font styles
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(16);
  
  // Add title
  pdf.text(`${scholarshipName} Application`, 20, 20);
  
  // Add applicant information
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(12);
  pdf.text('Applicant Information', 20, 35);
  
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(10);
  pdf.text(`Name: ${personalInfo.name}`, 20, 45);
  pdf.text(`Email: ${personalInfo.email}`, 20, 50);
  pdf.text(`Phone: ${personalInfo.phone}`, 20, 55);
  pdf.text(`Address: ${personalInfo.address}`, 20, 60);
  
  // Add education information
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(12);
  pdf.text('Education', 20, 70);
  
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(10);
  
  // Split education text to fit within page width
  const educationLines = pdf.splitTextToSize(personalInfo.education, 170);
  pdf.text(educationLines, 20, 80);
  
  // Add activities information
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(12);
  pdf.text('Activities & Achievements', 20, 95);
  
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(10);
  
  // Split activities text to fit within page width
  const activitiesLines = pdf.splitTextToSize(personalInfo.activities, 170);
  pdf.text(activitiesLines, 20, 105);
  
  // Add essay prompt
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(12);
  pdf.text('Essay Prompt', 20, 125);
  
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(10);
  
  // Split essay prompt to fit within page width
  const promptLines = pdf.splitTextToSize(essayPrompt, 170);
  pdf.text(promptLines, 20, 135);
  
  // Add essay content
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(12);
  pdf.text('Essay', 20, 155);
  
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(10);
  
  // Split essay content to fit within page width and handle pagination
  const essayLines = pdf.splitTextToSize(essayContent, 170);
  
  let yPosition = 165;
  const lineHeight = 5;
  
  for (let i = 0; i < essayLines.length; i++) {
    // Check if we need to add a new page
    if (yPosition > 270) {
      pdf.addPage();
      yPosition = 20;
    }
    
    pdf.text(essayLines[i], 20, yPosition);
    yPosition += lineHeight;
  }
  
  // Add footer with date
  pdf.setFont('helvetica', 'italic');
  pdf.setFontSize(8);
  pdf.text(`Generated on ${new Date().toLocaleDateString()}`, 20, 285);
  
  // Return the PDF as a blob
  return pdf.output('blob');
};

export const downloadPDF = async (data: ApplicationData, filename: string = 'scholarship-application.pdf'): Promise<void> => {
  try {
    const pdfBlob = await generatePDF(data);
    
    // Create a download link
    const url = URL.createObjectURL(pdfBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    
    // Trigger download
    document.body.appendChild(link);
    link.click();
    
    // Clean up
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
};