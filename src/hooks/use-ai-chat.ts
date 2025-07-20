import { useState, useCallback } from 'react';
import { CustomEventSource } from '@/lib/custom-event-source';
import { env } from '@/config/env';

interface Message {
  content: string;
  isUser: boolean;
  loading?: boolean;
}

const response = `### Starting a Restaurant Business in California: A Comprehensive Guide

Starting a restaurant in California is an exciting venture, but it comes with its unique set of challenges and regulatory hurdles. Here's a step-by-step guide to help you navigate the process smoothly.

#### Step 1: Develop a Business Plan

1. **Executive Summary**: A snapshot of your restaurant concept, including the type of restaurant, target market, and location.
2. **Market Analysis**: Research on your target demographic, competitors, and market trends in California.
3. **Menu and Services**: A tentative menu and list of services offered (e.g., dine-in, takeout).
4. **Management and Personnel**: Your team's structure, roles, and number of employees.
5. **Marketing Strategy**: How you plan to attract and retain customers.
6. **Financial Projections**: Cost breakdown, expected revenue, and profitability analysis.
7. **Funding Request**: If seeking investors or loans, specify the amount needed and its use.

#### Step 2: Legal Requirements
To legally operate a restaurant in California, you'll need to navigate through several legal requirements:

| Requirement             | Description                                                       | Authority                        |
|-------------------------|-------------------------------------------------------------------|----------------------------------|
| Business License        | Official permission to operate within a local jurisdiction.       | City or County Business License Office |
| Employer Identification Number (EIN) | A federal tax ID for your business.                            | Internal Revenue Service (IRS)   |
| Seller’s Permit         | Allows you to sell food and beverages and collect sales tax.      | California Department of Tax and Fee Administration |
| Health Department Permit | Ensures your restaurant meets health and safety standards.        | Local Health Department          |
| Alcohol Beverage License | If you plan to serve alcohol, this license is necessary.          | California Department of Alcoholic Beverage Control |
| Building and Zoning Permits | Required for new construction or significant renovations.       | Local Building Department         |
| Fire Department Permits | Ensures compliance with fire safety laws and regulations.         | Local Fire Department            |

#### Step 3: Secure a Location
- Choose a location based on your target market and budget.
- Ensure the site complies with zoning laws for restaurants.
- Consider foot traffic, parking, and accessibility.

#### Step 4: Design Your Space and Plan for Equipment
- Design a layout that maximizes kitchen efficiency and customer comfort.
- Purchase or lease necessary kitchen equipment, furniture, and technology.

#### Step 5: Hire Your Team
- Determine staffing needs, including kitchen staff, servers, and management.
- Post job listings, conduct interviews, and carry out background checks.
- Implement a training program on customer service, safety, and operational procedures.

#### Step 6: Marketing and Advertising
- Create a marketing plan that includes social media, local advertising, and promotional events.
- Develop a brand identity, including logo, signage, and menu design.
- Launch a website and establish a presence on review sites and social media platforms.

#### Step 7: Set Up Your Supply Chain
- Identify suppliers for food, beverages, and other necessary materials.
- Negotiate contracts to secure the best prices and delivery schedules.

#### Step 8: Open Your Restaurant
- Plan a soft opening to gather feedback and adjust operations as needed.
- Plan a grand opening event to generate buzz and attract customers.

#### Compliance and Ongoing Operations:
- Stay informed about local health and safety regulations.
- Regularly review your business plan and financial projections.
- Engage with customers for feedback to continually improve your offerings.

#### Resources:
- California Department of Alcoholic Beverage Control: [https://www.abc.ca.gov/](https://www.abc.ca.gov/)
- California Department of Tax and Fee Administration for Seller’s Permit: [http://www.cdtfa.ca.gov/](http://www.cdtfa.ca.gov/)
- Internal Revenue Service for EIN: [https://www.irs.gov/businesses/small-businesses-self-employed/apply-for-an-employer-identification-number-ein-online](https://www.irs.gov/businesses/small-businesses-self-employed/apply-for-an-employer-identification-number-ein-online)

Starting a restaurant in California is a challenging yet rewarding endeavor. By following these steps and ensuring compliance with state regulations, you will establish a solid foundation for a successful restaurant business.`;

export const useAiChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = useCallback(async (userMessage: string) => {
    setIsLoading(true);
    setError(null);

    // Add user message immediately
    setMessages(prev => [{ content: userMessage, isUser: true }]);
    setMessages(prev => [...prev, { content: 'Thinking...', isUser: false, loading: true }]);

    // setTimeout(() => {
    //   setMessages(prev => [...prev, { content: response, isUser: false }]);
    //   setIsLoading(false);
    // }, 1000);
    // return;



    let accumulatedContent = '';
    let isFirstMessage = true;

    const eventSource = new CustomEventSource(`${env.apiUrl}/assistant/ask`, {
      payload: {
        prompt: userMessage
      },
      onMessage: (data) => {
        try {
          // Accumulate the content
          accumulatedContent += data.content;
          console.log(accumulatedContent)

          // Update the AI response message
          setMessages(prev => {
            const newMessages = [...prev];
            if (isFirstMessage) {
                newMessages.pop(); // Remove the loading message
                isFirstMessage = false;
            }
            const lastMessage = newMessages[newMessages.length - 1];

            if (lastMessage && !lastMessage.isUser) {
              newMessages[newMessages.length - 1] = {
                content: accumulatedContent,
                isUser: false
              };
            } else {
              newMessages.push({
                content: accumulatedContent,
                isUser: false
              });
            }

            return newMessages;
          });
        } catch (err) {
          setError('Error processing message');
          eventSource.close();
          setIsLoading(false);
        }
      },
      onError: (error) => {
        setError('Connection error');
        eventSource.close();
        setIsLoading(false);
      },
      onClose: () => {
        setIsLoading(false);
      }
    });

    return () => {
      eventSource.close();
      setIsLoading(false);
    };
  }, []);

  return {
    messages,
    isLoading,
    error,
    sendMessage
  };
};