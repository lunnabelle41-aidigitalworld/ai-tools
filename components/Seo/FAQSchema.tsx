import React from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSchemaProps {
  faqs: FAQItem[];
}

export const FAQSchema: React.FC<FAQSchemaProps> = ({ faqs }) => {
  const faqStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
    />
  );
};

export const homePageFAQs: FAQItem[] = [
  {
    question: 'What is AI Vault?',
    answer: 'AI Vault is a comprehensive directory of AI tools that helps users discover, compare, and choose the best AI solutions for their needs. We provide detailed information, user reviews, and expert analysis of various AI tools across different categories.'
  },
  {
    question: 'How do I find the right AI tool for my needs?',
    answer: 'You can browse tools by category, use our smart search feature, or check out our curated lists of best tools for specific use cases. Each tool page includes detailed information, features, pricing, and user reviews to help you make an informed decision.'
  },
  {
    question: 'Are the tool listings on AI Vault free?',
    answer: 'Yes, our directory is completely free to use. We aim to provide unbiased information to help users find the best AI tools. Some tools may have their own pricing plans, but accessing our directory and information is always free.'
  },
  {
    question: 'How often is the information updated?',
    answer: 'We regularly update our database to ensure all information is current. Our team monitors changes in the AI tool landscape and updates listings as new versions or features are released by the tool providers.'
  },
  {
    question: 'Can I submit my AI tool to be listed?',
    answer: 'Absolutely! We welcome submissions of AI tools. Please visit our submission page to submit your tool for review. Our team will evaluate it to ensure it meets our quality standards before adding it to our directory.'
  }
];
