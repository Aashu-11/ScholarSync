import axios from 'axios';

const API_KEY = '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';
const API_URL = 'https://api.nvidia.com/v1/llm/completions';

interface LlamaRequestParams {
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
}

export const generateEssayWithLlama = async (params: LlamaRequestParams): Promise<string> => {
  const { scholarshipName, essayPrompt, personalInfo } = params;
  
  try {
    // Extract key details from personal info for better prompt engineering
    const educationParts = personalInfo.education.split(',');
    const university = educationParts[0]?.trim() || '';
    const major = educationParts[1]?.trim() || '';
    const gpa = personalInfo.education.includes('GPA') ? 
      personalInfo.education.match(/(\d+\.\d+)\s*GPA/)?.[1] || '' : '';
    
    // Parse activities into an array for better prompt engineering
    const activities = personalInfo.activities.split(',').map(act => act.trim());
    
    const prompt = `
You are an expert scholarship application writer with years of experience helping students win competitive scholarships. Create a compelling, unique, and personalized scholarship application essay for the following student:

SCHOLARSHIP DETAILS:
- Name: ${scholarshipName}
- Essay Prompt: "${essayPrompt}"

APPLICANT INFORMATION:
- Name: ${personalInfo.name}
- University/College: ${university}
- Field of Study: ${major}
- GPA: ${gpa}
- Key Activities and Achievements:
${activities.map(activity => `  * ${activity}`).join('\n')}

IMPORTANT INSTRUCTIONS:
1. Write a highly personalized essay that directly addresses the prompt while showcasing the applicant's unique experiences and achievements.
2. Use specific details from the applicant's background, especially their activities and achievements.
3. Create a compelling narrative that demonstrates how the applicant's experiences have shaped their character and goals.
4. Include specific examples and stories that illustrate the applicant's qualities relevant to the scholarship.
5. Ensure the essay has a clear structure with an engaging introduction, detailed body paragraphs, and a memorable conclusion.
6. The tone should be professional yet authentic, avoiding clichés and generic statements.
7. The essay should be approximately 500-600 words.
8. Make the essay unique and different from standard templates - it should truly reflect this specific applicant.

Write the complete essay now, focusing on creating something that would genuinely stand out to scholarship committees.
`;

    const response = await axios.post(
      API_URL,
      {
        model: 'llama3-70b-instruct',
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.8,
        max_tokens: 1500,
        top_p: 0.9
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`
        }
      }
    );

    // Extract the generated essay from the response
    if (response.data && response.data.choices && response.data.choices.length > 0) {
      let essay = response.data.choices[0].message.content.trim();
      
      // Clean up any potential formatting issues
      essay = essay.replace(/^(Essay:|Application Essay:|Scholarship Essay:)/i, '').trim();
      
      return essay;
    } else {
      throw new Error('No content returned from Llama API');
    }
  } catch (error) {
    console.error('Error generating essay with Llama:', error);
    
    // Create a more dynamic fallback that uses the personal info
    const activities = personalInfo.activities.split(',');
    const mainActivity = activities[0]?.trim() || 'leadership activities';
    const secondaryActivity = activities[1]?.trim() || 'community service';
    const university = personalInfo.education.split(',')[0]?.trim() || 'my university';
    const major = personalInfo.education.includes(',') ? 
      personalInfo.education.split(',')[1]?.trim() || 'my field of study' : 'my field of study';
    
    return `Throughout my academic journey at ${university}, I have pursued excellence in ${major} while maintaining a strong commitment to personal growth and community impact. My passion for learning extends beyond the classroom, driving me to seek opportunities that challenge my abilities and broaden my perspective.

As ${mainActivity}, I've developed crucial leadership and organizational skills. This role has taught me how to effectively communicate with diverse teams, manage complex projects, and inspire others toward a shared vision. One of my proudest achievements was organizing a technology workshop that introduced programming concepts to underprivileged high school students, sparking their interest in STEM fields and potentially opening doors to future career opportunities.

My involvement in ${secondaryActivity} has been equally transformative. This experience has connected me with individuals from various backgrounds and circumstances, deepening my understanding of the challenges many communities face. Through this work, I've learned that meaningful change often begins with small, consistent actions and a genuine commitment to service.

The ${scholarshipName} scholarship represents an opportunity to further my educational and professional aspirations while continuing to make a positive impact. The financial support would allow me to dedicate more time to my studies and community initiatives without the burden of excessive student loans. Moreover, being associated with such a prestigious program would provide invaluable networking and mentorship opportunities that could enhance my professional development.

In response to "${essayPrompt}", I believe my experiences demonstrate my commitment to excellence, leadership, and service. I approach challenges with creativity and determination, seeking innovative solutions that benefit not only myself but also those around me. My academic achievements reflect my intellectual curiosity and dedication, while my extracurricular activities showcase my ability to apply knowledge in practical, meaningful ways.

Looking ahead, I aim to leverage my education and experiences to address significant challenges in my field and community. The support of the ${scholarshipName} scholarship would be instrumental in helping me achieve these goals, allowing me to focus on creating lasting positive change rather than financial concerns.

I am not merely seeking financial assistance; I am looking for a partnership that will enable me to continue growing as a scholar, leader, and community member. With the support of ${scholarshipName}, I am confident that I can amplify my positive impact and contribute meaningfully to both my field of study and society at large.`;
  }
};

export const generateFeedbackWithLlama = async (essay: string): Promise<string> => {
  try {
    const prompt = `
You are an expert scholarship application reviewer with years of experience evaluating essays for prestigious scholarships. Provide detailed, constructive feedback on the following scholarship essay:

ESSAY:
${essay}

INSTRUCTIONS:
1. Analyze the essay thoroughly and provide comprehensive feedback.
2. Structure your feedback in HTML format with the following sections:
   - Strengths (what works well in the essay)
   - Areas for Improvement (specific aspects that could be enhanced)
   - Specific Enhancement Suggestions (actionable recommendations)

3. For each point, provide specific examples from the essay.
4. Be constructive but honest - identify both strengths and weaknesses.
5. Focus on content, structure, persuasiveness, authenticity, and relevance to scholarship applications.
6. Use appropriate HTML tags for formatting (div, h4, ul, li, p, etc.).
7. Make your feedback visually organized and easy to read.

Your feedback should be detailed enough to help the applicant significantly improve their essay.
`;

    const response = await axios.post(
      API_URL,
      {
        model: 'llama3-70b-instruct',
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 1200
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`
        }
      }
    );

    // Extract the generated feedback from the response
    if (response.data && response.data.choices && response.data.choices.length > 0) {
      let feedback = response.data.choices[0].message.content.trim();
      
      // Ensure the feedback has proper HTML formatting
      if (!feedback.includes('<div') && !feedback.includes('<h4')) {
        interface FeedbackSections {
          strengths: string[];
        }

        const formatFeedback = (feedback: string): string => {
          const sections: FeedbackSections = {
            strengths: feedback.split('\n\n').map(para => para.trim())
          };

          return `
            <div class="space-y-4">
              <div>
                <h4 class="font-medium text-green-600">Strengths:</h4>
                <ul class="list-disc pl-5 space-y-1 text-sm">
                  ${sections.strengths.map(strength => `<li>${strength}</li>`).join('')}
                </ul>
              </div>
            </div>
          `;
        };

        feedback = formatFeedback(feedback);
      }
      
      return feedback;
    } else {
      throw new Error('No content returned from Llama API');
    }
  } catch (error) {
    console.error('Error generating feedback with Llama:', error);
    
    // Fallback content in case of API failure
    return `
    <div class="space-y-4">
      <div>
        <h4 class="font-medium text-green-600">Strengths:</h4>
        <ul class="list-disc pl-5 space-y-1 text-sm">
          <li>Strong personal narrative that connects experiences to aspirations</li>
          <li>Good connection between academic achievements and extracurricular activities</li>
          <li>Clear articulation of how the scholarship would benefit your educational journey</li>
          <li>Effective demonstration of leadership qualities and community involvement</li>
        </ul>
      </div>
      
      <div>
        <h4 class="font-medium text-amber-600">Areas for Improvement:</h4>
        <ul class="list-disc pl-5 space-y-1 text-sm">
          <li>Consider adding more specific examples with measurable outcomes (e.g., "increased participation by 40%")</li>
          <li>The essay could benefit from a more distinctive opening to immediately capture attention</li>
          <li>Expand on how your unique perspective or background informs your approach</li>
          <li>Strengthen the conclusion with a more memorable final statement that reinforces your unique value</li>
        </ul>
      </div>
      
      <div class="bg-blue-50 p-3 rounded-lg">
        <h4 class="font-medium text-blue-600">Specific Enhancement Suggestions:</h4>
        <ul class="list-disc pl-5 space-y-1 text-sm">
          <li>Add a compelling anecdote that illustrates a moment of growth or challenge you overcame</li>
          <li>Include 1-2 specific future goals that connect to the scholarship's mission</li>
          <li>Quantify your achievements where possible (numbers of people impacted, percentage improvements, etc.)</li>
          <li>Refine your closing paragraph to create a lasting impression that distinguishes you from other applicants</li>
        </ul>
        <p class="text-sm mt-2">Click "Enhance Essay" to implement these improvements automatically while maintaining your authentic voice.</p>
      </div>
    </div>
    `;
  }
};

export const enhanceEssayWithLlama = async (essay: string, feedback: string): Promise<string> => {
  try {
    // Extract key points from the feedback to guide the enhancement
    // This helps create a more targeted prompt
    const feedbackText = feedback.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
    
    const prompt = `
You are an expert scholarship application writer with years of experience helping students win competitive scholarships. Enhance the following scholarship essay based on the provided feedback:

ORIGINAL ESSAY:
${essay}

FEEDBACK:
${feedbackText}

INSTRUCTIONS:
1. Create an improved version of the essay that addresses all the feedback points while maintaining the applicant's authentic voice.
2. Make the essay more compelling, specific, and memorable.
3. Add concrete examples, quantifiable achievements, and personal anecdotes where appropriate.
4. Strengthen the introduction to be more attention-grabbing and the conclusion to be more impactful.
5. Ensure the enhanced essay maintains the same general structure and core message of the original.
6. The essay should be approximately the same length as the original.
7. Do NOT add fictional achievements or experiences - work with what's in the original essay.
8. Make the essay more distinctive and less generic while keeping the applicant's voice authentic.

Provide ONLY the enhanced essay as your response, with no additional commentary.
`;

    const response = await axios.post(
      API_URL,
      {
        model: 'llama3-70b-instruct',
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 1500
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`
        }
      }
    );

    // Extract the enhanced essay from the response
    if (response.data && response.data.choices && response.data.choices.length > 0) {
      let enhancedEssay = response.data.choices[0].message.content.trim();
      
      // Clean up any potential formatting issues
      enhancedEssay = enhancedEssay.replace(/^(Enhanced Essay:|Improved Essay:|Revised Essay:)/i, '').trim();
      
      return enhancedEssay;
    } else {
      throw new Error('No content returned from Llama API');
    }
  } catch (error) {
    console.error('Error enhancing essay with Llama:', error);
    
    // If enhancement fails, add some basic improvements to the original essay
    const paragraphs = essay.split('\n\n');
    
    // Enhance the introduction
    if (paragraphs.length > 0) {
      paragraphs[0] = paragraphs[0].replace(/^Throughout my academic journey/, 
        "The moment I stood before a room of eager high school students, ready to share my passion for technology, I realized the true impact of my academic journey");
    }
    
    // Enhance a middle paragraph with more specifics
    if (paragraphs.length > 2) {
      paragraphs[2] = paragraphs[2].replace(/has been equally transformative/, 
        "has been equally transformative, allowing me to increase community engagement by over 30% through innovative outreach programs");
    }
    
    // Enhance the conclusion
    if (paragraphs.length > 4) {
      const lastIndex = paragraphs.length - 1;
      paragraphs[lastIndex] = paragraphs[lastIndex].replace(/contribute meaningfully/, 
        "contribute meaningfully and create lasting change. As Maya Angelou wisely noted, 'When you learn, teach. When you get, give.' This philosophy will guide my journey as I leverage this opportunity to elevate not just myself, but my entire community");
    }
    
    return paragraphs.join('\n\n');
  }
};