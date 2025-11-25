const fs = require('fs');
const path = require('path');

// AI update templates with different types of content
const updateTemplates = {
  product_launch: [
    {
      title: "{tool} {version} Released with Revolutionary {feature} Capabilities",
      summary: "{company}'s latest {tool} update introduces groundbreaking {feature} technology that {benefit}. This enhancement {impact} for users across {industry} sectors.",
      content: "{tool} {version} represents a significant leap forward in {domain} technology. The new {feature} capabilities allow users to {action} with unprecedented {metric}. Key improvements include:\n\n1. {feature1}: {description1}\n2. {feature2}: {description2}\n3. {feature3}: {description3}\n\nIndustry experts predict this update will {prediction}. The enhanced {tool} now {capability} which was previously {limitation}. Users report {user_feedback} after implementing the new version.\n\nFor {target_audience}, this update means {value_proposition}. The {feature} specifically addresses {pain_point} by {solution}. Performance benchmarks show {performance_improvement} compared to previous versions.\n\n{company} has also introduced {additional_feature} which {additional_benefit}. This positions {tool} as {positioning} in the competitive {market} landscape."
    },
    {
      title: "Introducing {tool} {version}: {adjective} {domain} Solution",
      summary: "The {adjective} {version} of {tool} delivers {feature} and {feature2} to transform how {users} approach {domain} tasks.",
      content: "Today marks the official launch of {tool} {version}, a {adjective} advancement in {domain} technology. This release introduces {feature_count} key innovations designed to {purpose}.\n\nKey Features:\n- {feature1}: {description1}\n- {feature2}: {description2}\n- {feature3}: {description3}\n- {feature4}: {description4}\n\n{tool} {version} addresses {problem} by {solution}. According to {expert}, \"{quote}\". \n\nThe new {feature} enables {capability} which was {previous_state}. Performance tests show {metric_improvement} in {benchmark} compared to {previous_version}.\n\n{target_audience} can expect {benefit1} and {benefit2}. The {integration} with {platform} allows for {workflow_improvement}.\n\n{company} has invested {investment} in developing {version} to ensure {quality_aspect}. Early adopters report {user_result} after {time_period} of usage.\n\nPricing and availability: {tool} {version} is {availability} with {pricing_model}. Enterprise customers receive {enterprise_benefit}."
    }
  ],
  update: [
    {
      title: "{tool} {version} Update Enhances {feature} and {feature2}",
      summary: "Major improvements to {tool} include {feature}, {feature2}, and {feature3} to boost {metric} for {users}.",
      content: "The latest {version} update for {tool} delivers substantial improvements across {improvement_count} key areas. These enhancements focus on {focus_area} to provide {value} for {target_audience}.\n\nWhat's New:\n1. {feature1}: {description1} - This update {enhancement} which {benefit}.\n2. {feature2}: {description2} - Users can now {capability} that was {previous_limitation}.\n3. {feature3}: {description3} - Performance in {domain} has improved by {performance_metric}.\n\n{expert} from {organization} notes, \"{quote}\". This update specifically addresses {problem} by {solution}.\n\nFor {users}, the {feature} enhancement means {user_benefit}. The {improvement} reduces {previous_issue} by {percentage}.\n\nTechnical improvements include {technical_improvement1} and {technical_improvement2}. These changes result in {technical_benefit}.\n\n{compatibility_info} ensures seamless integration with {platforms}. {security_info} maintains {security_standard} compliance.\n\nOrganizations using {tool} report {result} after implementing {version}. {case_study} shows {case_study_result}.\n\nThe update is {availability} and {requirement} for {users}. {support_info} is available through {support_channel}."
    }
  ],
  tutorial: [
    {
      title: "How to Master {feature} in {tool} for {use_case}",
      summary: "Step-by-step guide to leveraging {tool}'s {feature} capabilities to {achieve} in {domain} projects.",
      content: "This comprehensive tutorial walks through mastering {tool}'s {feature} functionality to {purpose}. Whether you're {audience}, this guide provides {value}.\n\nPrerequisites:\n- {prerequisite1}\n- {prerequisite2}\n- {prerequisite3}\n\nStep 1: {step1_title}\n{step1_description}\n\nStep 2: {step2_title}\n{step2_description}\n\nStep 3: {step3_title}\n{step3_description}\n\nStep 4: {step4_title}\n{step4_description}\n\nStep 5: {step5_title}\n{step5_description}\n\nBest Practices:\n1. {best_practice1}: {explanation1}\n2. {best_practice2}: {explanation2}\n3. {best_practice3}: {explanation3}\n\nCommon Pitfalls to Avoid:\n- {pitfall1}: {solution1}\n- {pitfall2}: {solution2}\n- {pitfall3}: {solution3}\n\nAdvanced Techniques:\n{advanced_technique1}: {advanced_explanation1}\n{advanced_technique2}: {advanced_explanation2}\n\nReal-world Application:\n{use_case} demonstrates how {organization} achieved {result} by implementing {feature}. The project {project_details} and resulted in {outcome}.\n\nPerformance Optimization:\nTo maximize {metric}, consider {optimization1} and {optimization2}. {expert} recommends {recommendation} for {scenario}.\n\nTroubleshooting:\nIf you encounter {issue}, try {solution}. For {complex_issue}, {advanced_solution}.\n\nFurther Resources:\n- {resource1}: {description1}\n- {resource2}: {description2}\n- {resource3}: {description3}\n\nConclusion:\nMastering {feature} in {tool} enables {capability} that {benefit}. With practice, {users} can {achievement}."
    }
  ],
  news: [
    {
      title: "{company} Announces {initiative} to Advance {domain} Research",
      summary: "{company}'s {initiative} will {impact} by {method} to support {beneficiary} in {domain} innovation.",
      content: "{company} has unveiled {initiative}, a {description} designed to {purpose}. This announcement {significance} in the {domain} landscape.\n\nKey Details:\n- {detail1}: {explanation1}\n- {detail2}: {explanation2}\n- {detail3}: {explanation3}\n\n{spokesperson} from {company} stated, \"{quote}\". The initiative {goal} through {method}.\n\nIndustry Impact:\n{analyst} from {firm} commented, \"{analysis}\". This development {effect} on {market_segment}.\n\nTechnical Aspects:\nThe {initiative} leverages {technology1} and {technology2} to {technical_purpose}. {metric_improvement} is expected in {timeframe}.\n\nPartnerships:\nCollaborations with {partner1}, {partner2}, and {partner3} will {partnership_benefit}. These partnerships {value_addition}.\n\nTimeline:\n{phase1}: {timeline1}\n{phase2}: {timeline2}\n{phase3}: {timeline3}\n\nFunding:\nThe initiative is backed by {funding_amount} investment to {funding_purpose}. {investor} noted, \"{investment_quote}\".\n\nExpected Outcomes:\n1. {outcome1}: {benefit1}\n2. {outcome2}: {benefit2}\n3. {outcome3}: {benefit3}\n\n{target_beneficiary} will {benefit} through {delivery_method}. {societal_impact} represents the broader {value}.\n\nFuture Implications:\nThis {initiative} positions {company} as {positioning} in {domain}. Experts predict {prediction} as a result.\n\n{regulatory_info} ensures {compliance_aspect}. {ethics_info} addresses {ethical_consideration}."
    }
  ]
};

// AI tools database
const aiTools = [
  "ChatGPT", "Claude", "Gemini", "LLaMA", "Perplexity AI", "Microsoft Copilot", "GitHub Copilot", 
  "Notion AI", "Replit Ghostwriter", "Amazon CodeWhisperer", "Tabnine", "Stable Diffusion", 
  "Midjourney", "DALL-E 3", "Adobe Firefly", "Runway ML", "Leonardo AI", "Craiyon", 
  "Synthesia", "Pictory", "InVideo", "Lumen5", "Descript", "ElevenLabs", "Murf.ai", 
  "AssemblyAI", "Otter.ai", "Rev.ai", "Jasper", "Copy.ai", "Rytr", "Writesonic", 
  "Anyword", "Frase", "Surfer SEO", "MarketMuse", "Wordtune", "Grammarly", "ProWritingAid", 
  "Otter.ai", "Fireflies.ai", "Notta", "Scribe", "Tome", "Gamma", "Beautiful.ai", 
  "Canva", "Visme", "Piktochart", "Crello", "Snappa", "Adobe Express", "Fotor", 
  "DeepBrain", "HeyGen", "Elai.io", "Peech", "Lovo", "Play.ht", "WellSaid Labs", 
  "Kive", "VidIQ", "TubeBuddy", "Hootsuite", "Buffer", "Sprout Social", "Agorapulse", 
  "Salesforce Einstein", "HubSpot AI", "Drift", "Intercom", "Zendesk Answer Bot", "Freshdesk", 
  "MonkeyLearn", "MonkeyLearn", "IBM Watson", "Azure AI", "Google AI", "Amazon AI", 
  "Hugging Face", "Pinecone", "Weaviate", "Milvus", "Qdrant", "Chroma", "LangChain", 
  "LlamaIndex", "Haystack", "Semantic Kernel", "Auto-GPT", "BabyAGI", "AgentGPT", 
  "MetaGPT", "CAMEL", "GPT-Engineer", "GPT-Pilot", "Replit Ghostwriter", "Mintlify", 
  "Tabnine", "Amazon CodeWhisperer", "GitHub Copilot", "Codeium", "Bito", "Mutable.ai", 
  "Pieces", "Continue", "OpenHands", "Devin", "Cursor", "Windsor", "Vocode", 
  "Symbl.ai", "Wordtune", "Jasper", "Copy.ai", "Rytr", "Writesonic", "Anyword", 
  "Frase", "Surfer SEO", "MarketMuse", "Grammarly", "ProWritingAid", "Quillbot"
];

// Categories
const categories = [
  "Language Models", "Image Generation", "Video AI", "Audio AI", "Code AI", 
  "Content Creation", "Marketing", "Customer Support", "Research", "Business Intelligence",
  "Education", "Healthcare", "Legal", "Finance", "E-commerce", "Gaming", 
  "Cybersecurity", "Data Analysis", "Productivity", "Development"
];

// Companies
const companies = [
  "OpenAI", "Anthropic", "Google", "Microsoft", "Amazon", "Meta", "Adobe", 
  "IBM", "Salesforce", "HubSpot", "GitHub", "Notion", "Canva", "Midjourney", 
  "Stability AI", "Runway", "Descript", "ElevenLabs", "Jasper", "Copy.ai"
];

// Features
const features = [
  "natural language processing", "image generation", "voice synthesis", "code completion", 
  "content optimization", "data analysis", "pattern recognition", "predictive modeling",
  "automated reasoning", "creative generation", "multimodal processing", "real-time collaboration",
  "contextual understanding", "adaptive learning", "semantic search", "intelligent automation"
];

// Authors
const authors = [
  "Dr. Sarah Chen", "Michael Rodriguez", "Jennifer Park", "Alex Thompson", 
  "Dr. Raj Patel", "Emily Johnson", "David Kim", "Lisa Zhang", "Robert Wilson", 
  "Amanda Foster", "James Mitchell", "Olivia Kumar", "Daniel Santos", "Maria Ivanova"
];

// Generate realistic AI update content
function generateAIUpdate(id) {
  const type = Object.keys(updateTemplates)[Math.floor(Math.random() * Object.keys(updateTemplates).length)];
  const template = updateTemplates[type][Math.floor(Math.random() * updateTemplates[type].length)];
  
  const tool = aiTools[Math.floor(Math.random() * aiTools.length)];
  const company = companies[Math.floor(Math.random() * companies.length)];
  const category = categories[Math.floor(Math.random() * categories.length)];
  const author = authors[Math.floor(Math.random() * authors.length)];
  const feature = features[Math.floor(Math.random() * features.length)];
  
  // Generate date within the last year
  const date = new Date();
  date.setDate(date.getDate() - Math.floor(Math.random() * 365));
  const dateString = date.toISOString().split('T')[0];
  
  // Replace placeholders in title and summary
  let title = template.title
    .replace(/{tool}/g, tool)
    .replace(/{version}/g, `${Math.floor(Math.random() * 3) + 1}.${Math.floor(Math.random() * 10)}`)
    .replace(/{feature}/g, feature)
    .replace(/{company}/g, company)
    .replace(/{adjective}/g, ["Revolutionary", "Groundbreaking", "Innovative", "Advanced", "Cutting-edge"][Math.floor(Math.random() * 5)]);
    
  let summary = template.summary
    .replace(/{tool}/g, tool)
    .replace(/{feature}/g, feature)
    .replace(/{company}/g, company)
    .replace(/{users}/g, ["developers", "content creators", "businesses", "researchers"][Math.floor(Math.random() * 4)]);
  
  // Generate full content if it exists in template
  let content = "";
  if (template.content) {
    content = template.content
      .replace(/{tool}/g, tool)
      .replace(/{company}/g, company)
      .replace(/{feature}/g, feature)
      .replace(/{category}/g, category)
      .replace(/{author}/g, author);
  }
  
  return {
    id: id.toString(),
    type: type,
    title: title,
    summary: summary,
    content: content,
    date: dateString,
    source: `${company} ${["Blog", "Press Release", "Announcement", "Newsletter"][Math.floor(Math.random() * 4)]}`,
    tools_mentioned: [tool, aiTools[Math.floor(Math.random() * aiTools.length)], aiTools[Math.floor(Math.random() * aiTools.length)]],
    author: author,
    readTime: `${Math.floor(Math.random() * 10) + 3} min read`,
    category: category
  };
}

// Generate 140 AI updates
const aiUpdates = [];
for (let i = 1; i <= 140; i++) {
  aiUpdates.push(generateAIUpdate(i));
}

// Write to file
const outputPath = path.join(__dirname, '..', 'data', 'ai-updates-full.ts');
const fileContent = `export interface AIUpdate {
  id: string;
  type: 'product_launch' | 'update' | 'tutorial' | 'news';
  title: string;
  summary: string;
  content?: string;
  date: string;
  source: string;
  tools_mentioned: string[];
  author?: string;
  readTime?: string;
  category?: string;
}

export const aiUpdates: AIUpdate[] = ${JSON.stringify(aiUpdates, null, 2)};
`;

fs.writeFileSync(outputPath, fileContent);
console.log(`Generated 140 AI updates and saved to ${outputPath}`);