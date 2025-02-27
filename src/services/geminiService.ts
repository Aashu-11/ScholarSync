import axios from 'axios';

export const companyInfo = `
Introduction:
I'm your friendly Aroma Beans Coffee chatbot, here to assist you with anything you need related to our coffee shop! Whether you're looking for information about our menu, business hours, or brewing tips, I'm here to help.
Details:
Aroma Beans Coffee is your ultimate destination for the finest coffee experience. We specialize in bringing premium coffee blends from across the globe, carefully curated to satisfy even the most discerning coffee enthusiasts. Whether you're a fan of single-origin beans or enjoy exploring bold, unique blends, Aroma Beans Coffee promises to elevate your coffee moments.
Located in the heart of Brew City, California, our café and roastery provide a cozy, welcoming atmosphere for coffee lovers to relax, work, or connect. Visit us at 123 Coffee Lane, Brew City, CA 90210. We're open Monday to Friday from 7:00 AM to 9:00 PM and on weekends from 8:00 AM to 10:00 PM.
Stay connected with us through our vibrant social media community. Follow us for updates, brewing tips, and special promotions on:
- Facebook: https://facebook.com/aromabeanscoffee
- Instagram: https://instagram.com/aromabeanscoffee
- Twitter: https://twitter.com/aromabeansco
- LinkedIn: https://linkedin.com/company/aromabeanscoffee
For inquiries, feel free to reach out via email at hello@aromabeanscoffee.com or call us at +1 (555) 123-4567.
Our website, https://www.aromabeanscoffee.com, offers a seamless shopping experience for coffee beans, accessories, and subscriptions. Learn about our unique blends, explore brewing guides, and subscribe to receive fresh coffee delivered to your doorstep.
Menu:
- Signature Coffee:
  - Espresso Shot - $3.50
  - Cappuccino - $4.00
  - Latte (Classic/Vanilla/Caramel) - $4.50
  - Mocha - $5.00
- Specialty Brews:
  - Cold Brew - $4.50
  - Nitro Cold Brew - $5.50
  - Single-Origin Pour Over - $5.00
- Seasonal Favorites:
  - Pumpkin Spice Latte - $5.50
  - Peppermint Mocha - $5.50
- Tea & Alternatives:
  - Matcha Latte - $5.00
  - Chai Latte - $4.50
  - Hot Chocolate - $4.00
- Snacks & Pastries:
  - Croissant (Butter/Almond) - $3.50
  - Muffins (Blueberry/Chocolate Chip) - $3.00
  - Avocado Toast - $6.00
  - Bagel with Cream Cheese - $4.00
At Aroma Beans Coffee, we believe in creating moments worth savoring. Whether you're stopping by for your morning pick-me-up or indulging in an afternoon treat, we've got something special for everyone.
`;

const scholarshipSystemPrompt = `
You are ScholarAI, an advanced AI assistant specialized in helping students find, apply for, and win scholarships. 
Your goal is to provide personalized guidance throughout the scholarship application process.

Key responsibilities:
1. Help students find scholarships that match their profile, interests, and qualifications
2. Provide guidance on writing compelling scholarship essays and personal statements
3. Offer tips for scholarship interviews and application processes
4. Help with document preparation and organization
5. Answer questions about specific scholarships, deadlines, and requirements
6. Provide motivation and support throughout the application journey

Always be encouraging, supportive, and provide actionable advice. When you don't know specific details about a scholarship, 
be honest and suggest ways the student can find that information.

Remember that you're helping students achieve their educational dreams through financial support. Be empathetic to their 
challenges and celebrate their successes.
`;

export const generateGeminiResponse = async (prompt: string): Promise<string> => {
  try {
    const apiUrl = import.meta.env.VITE_API_URL;
    
    const response = await axios.post(apiUrl, {
      contents: [
        {
          parts: [
            { text: scholarshipSystemPrompt },
            { text: prompt }
          ]
        }
      ],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
      }
    });

    return response.data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error('Error generating response from Gemini:', error);
    return "I'm sorry, I encountered an error while processing your request. Please try again later.";
  }
};