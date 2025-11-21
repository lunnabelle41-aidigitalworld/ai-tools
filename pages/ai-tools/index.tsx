import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiArrowRight, FiSearch, FiFilter } from 'react-icons/fi';
// Custom GlassCard replacement
const GlassCard = ({ children, className = '', ...props }: { children: React.ReactNode; className?: string; [key: string]: any }) => (
  <div 
    className={`bg-white/5 backdrop-filter backdrop-blur-lg rounded-xl shadow-lg border border-white/10 hover:shadow-xl transition-all duration-300 ${className}`}
    {...props}
  >
    {children}
  </div>
);


// Categories data
const categories = [
  {
    name: "AI for Nonprofits & Social Impact",
    icon: "🔭",
    toolCount: 50,
    subcategories: [
      { 
        name: "Fundraising & Donor Management", 
        favicon: "🔭", 
        website: "",
        tools: [
          { name: "DonorPerfect AI", description: "AI-powered donor management and fundraising platform", website: "https://www.donorperfect.com", rating: 4.7 },
          { name: "Grantable", description: "AI-assisted grant writing and management tool", website: "https://www.grantable.co", rating: 4.5 },
          { name: "Fundraising AI", description: "Predictive analytics for donor behavior and campaign optimization", website: "https://www.fundraisingai.com", rating: 4.6 },
          { name: "DonorSearch AI", description: "AI-driven prospect research and wealth screening", website: "https://www.donorsearch.com", rating: 4.8 },
          { name: "CharityEngine AI", description: "Automated fundraising campaign management", website: "https://www.charityengine.com", rating: 4.4 }
        ]
      },
      { 
        name: "Program Impact Analysis", 
        favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", 
        website: "",
        tools: [
          { name: "ImpactMapper", description: "AI-powered social impact measurement and visualization", website: "https://www.impactmapper.com", rating: 4.7 },
          { name: "Sopact Impact", description: "Machine learning for impact assessment and reporting", website: "https://www.sopact.com", rating: 4.5 },
          { name: "Social Impact Analytics", description: "Data-driven impact measurement platform", website: "https://www.socialimpactanalytics.com", rating: 4.6 },
          { name: "ImpactGuru", description: "AI-based program evaluation and outcome tracking", website: "https://www.impactguru.in", rating: 4.4 },
          { name: "Clear Impact", description: "Performance management and impact measurement software", website: "https://www.clearimpact.com", rating: 4.8 }
        ]
      },
      { 
        name: "Volunteer Coordination", 
        favicon: "🎓", 
        website: "",
        tools: [
          { name: "VolunteerMatch AI", description: "AI-powered volunteer recruitment and matching", website: "https://www.volunteermatch.org", rating: 4.6 },
          { name: "Galaxy Digital", description: "Smart volunteer management and scheduling platform", website: "https://www.galaxydigital.com", rating: 4.5 },
          { name: "SignUpGenius AI", description: "Automated volunteer scheduling and management", website: "https://www.signupgenius.com", rating: 4.7 },
          { name: "VolunteerHub", description: "AI-enhanced volunteer engagement platform", website: "https://www.volunteerhub.com", rating: 4.8 },
          { name: "Better Impact", description: "Comprehensive volunteer management software", website: "https://www.betterimpact.com", rating: 4.6 }
        ]
      },
      { 
        name: "Grant Writing & Management", 
        favicon: "✏️", 
        website: "",
        tools: [
          { name: "GrantWriter AI", description: "AI-assisted grant proposal writing and review", website: "https://www.grantwriter.ai", rating: 4.8 },
          { name: "Instrumentl", description: "AI-powered grant research and tracking", website: "https://www.instrumentl.com", rating: 4.7 },
          { name: "GrantStation", description: "Smart grant database and application tools", website: "https://www.grantstation.com", rating: 4.9 },
          { name: "Grantseeker AI", description: "Automated grant opportunity matching", website: "https://www.grantseeker.ai", rating: 4.5 },
          { name: "Foundant Grantseeker", description: "Grant management and tracking platform", website: "https://www.foundant.com", rating: 4.6 }
        ]
      },
      { 
        name: "Social Impact Measurement", 
        favicon: "📊", 
        website: "",
        tools: [
          { name: "Impact Cloud", description: "AI-driven impact data collection and analysis", website: "https://www.impactcloud.org", rating: 4.7 },
          { name: "Sopact", description: "Social impact measurement with machine learning", website: "https://www.sopact.com", rating: 4.5 },
          { name: "True Impact", description: "AI-powered social ROI measurement", website: "https://www.trueimpact.com", rating: 4.6 },
          { name: "UpMetrics", description: "Impact analytics and reporting platform", website: "https://www.upmetrics.com", rating: 4.8 },
          { name: "ImpactStory", description: "Automated impact storytelling and reporting", website: "https://www.impactstory.org", rating: 4.4 }
        ]
      },
      { 
        name: "Community Engagement", 
        favicon: "🌍", 
        website: "",
        tools: [
          { name: "Polis", description: "AI-powered public opinion gathering and community feedback platform", website: "https://pol.is", rating: 4.6 },
          { name: "CitizenLab AI", description: "Smart community participation and civic engagement platform", website: "https://www.citizenlab.co", rating: 4.5 },
          { name: "Bang the Table", description: "AI-enhanced community consultation and engagement tools", website: "https://www.bangthetable.com", rating: 4.7 },
          { name: "MindMixer", description: "AI-powered community engagement and participation platform", website: "https://www.mindmixer.com", rating: 4.4 },
          { name: "Community AI", description: "Machine learning for community engagement and social impact", website: "https://www.communityai.org", rating: 4.5 }
        ]
      },
      { 
        name: "Disaster Relief & Response", 
        favicon: "🆘", 
        website: "",
        tools: [
          { name: "Crisis AI", description: "AI-powered disaster response coordination", website: "https://www.crisisai.org", rating: 4.8 },
          { name: "OneConcern", description: "AI-driven disaster risk assessment", website: "https://www.oneconcern.com", rating: 4.7 },
          { name: "Humanitarian AI", description: "Machine learning for humanitarian aid", website: "https://www.humanitarian.ai", rating: 4.6 },
          { name: "Relief AI", description: "Automated disaster relief resource allocation", website: "https://www.reliefai.org", rating: 4.5 },
          { name: "Disaster Tech", description: "AI-powered emergency response platform", website: "https://www.disastertech.com", rating: 4.9 }
        ]
      },
      { 
        name: "Environmental Conservation", 
        favicon: "🌱", 
        website: "",
        tools: [
          { name: "Conservation AI", description: "AI for wildlife monitoring and protection", website: "https://www.conservation.ai", rating: 4.8 },
          { name: "Global Forest Watch", description: "AI-powered deforestation monitoring", website: "https://www.globalforestwatch.org", rating: 4.7 },
          { name: "Wildlife Insights", description: "Machine learning for biodiversity monitoring", website: "https://www.wildlifeinsights.org", rating: 4.6 },
          { name: "EcoMatcher AI", description: "Tree planting and forest management platform", website: "https://www.ecomatcher.com", rating: 4.5 },
          { name: "Ocean AI", description: "AI for marine conservation and monitoring", website: "https://www.oceanai.org", rating: 4.9 }
        ]
      },
      { 
        name: "Education & Training", 
        favicon: "📚", 
        website: "",
        tools: [
          { name: "Khan Academy AI", description: "AI-powered personalized learning for underserved communities", website: "https://www.khanacademy.org", rating: 4.9 },
          { name: "Duolingo for Schools", description: "AI-enhanced language learning for nonprofits", website: "https://schools.duolingo.com", rating: 4.7 },
          { name: "Coursera for Nonprofits", description: "AI-curated courses for social impact organizations", website: "https://www.coursera.org", rating: 4.8 },
          { name: "EdX for Impact", description: "AI-driven educational platform for social good", website: "https://www.edx.org", rating: 4.6 },
          { name: "Google AI Education", description: "Free AI training for nonprofit professionals", website: "https://www.ai.google/education", rating: 4.8 }
        ]
      },
      { 
        name: "Healthcare & Public Health", 
        favicon: "🏥", 
        website: "",
        tools: [
          { name: "Health AI for Nonprofits", description: "AI-powered healthcare access for underserved communities", website: "https://www.healthai.org", rating: 4.7 },
          { name: "Public Health AI", description: "Machine learning for disease prediction and prevention", website: "https://www.publichealthai.org", rating: 4.8 },
          { name: "Medic AI", description: "AI for medical supply chain management in developing regions", website: "https://www.medic.ai", rating: 4.6 },
          { name: "Zipline AI", description: "AI-powered drone delivery for medical supplies", website: "https://www.flyzipline.com", rating: 4.9 },
          { name: "Operation Smile AI", description: "AI-assisted surgical planning for cleft palate treatments", website: "https://www.operationsmile.org", rating: 4.8 }
        ]
      }
    ]
  },
  {
    name: "AI for Retail",
    icon: "🛍️",
    toolCount: 50,
    subcategories: [
      { 
        name: "Inventory Management", 
        favicon: "🔗", 
        website: "",
        tools: [
          { name: "Blue Yonder", description: "AI-powered inventory forecasting and optimization platform", website: "https://www.blueyonder.com", rating: 4.6 },
          { name: "ClearMetal", description: "Machine learning for inventory management and demand forecasting", website: "https://www.clearmetal.com", rating: 4.5 },
          { name: "Inventory AI", description: "Predictive analytics for retail inventory optimization", website: "https://www.inventoryai.com", rating: 4.4 },
          { name: "Fluent Commerce", description: "AI-driven inventory management and order fulfillment", website: "https://www.fluentcommerce.com", rating: 4.7 },
          { name: "Netstock", description: "AI-powered inventory optimization and planning software", website: "https://www.netstock.com", rating: 4.5 }
        ]
      },
      { 
        name: "Customer Personalization", 
        favicon: "🤖", 
        website: "",
        tools: [
          { name: "Dynamic Yield", description: "AI-powered personalization and customer experience platform", website: "https://www.dynamicyield.com", rating: 4.7 },
          { name: "Monetate", description: "Machine learning for e-commerce personalization", website: "https://www.monetate.com", rating: 4.5 },
          { name: "Qubit", description: "AI-driven personalization and conversion optimization", website: "https://www.qubit.com", rating: 4.6 },
          { name: "RichRelevance", description: "AI-powered personalization engine for retail", website: "https://www.richrelevance.com", rating: 4.4 },
          { name: "Optimizely", description: "AI-enhanced A/B testing and personalization", website: "https://www.optimizely.com", rating: 4.8 }
        ]
      },
      { 
        name: "Pricing Optimization", 
        favicon: "🏛️", 
        website: "",
        tools: [
          { name: "Pricefx", description: "AI-powered pricing optimization and management platform", website: "https://www.pricefx.com", rating: 4.6 },
          { name: "Vendavo", description: "Machine learning for pricing strategy and optimization", website: "https://www.vendavo.com", rating: 4.5 },
          { name: "PROS", description: "AI-driven pricing and revenue management", website: "https://www.pros.com", rating: 4.7 },
          { name: "Zilliant", description: "AI-powered price optimization and management", website: "https://www.zilliant.com", rating: 4.4 },
          { name: "BlackCurve", description: "AI-enhanced pricing optimization software", website: "https://www.blackcurve.com", rating: 4.5 }
        ]
      },
      { 
        name: "Visual Search", 
        favicon: "🔍", 
        website: "",
        tools: [
          { name: "ViSenze", description: "AI-powered visual search and image recognition", website: "https://www.visenze.com", rating: 4.7 },
          { name: "Clarifai", description: "Machine learning for visual search and product discovery", website: "https://www.clarifai.com", rating: 4.6 },
          { name: "Syte.ai", description: "AI-driven visual search and product recommendations", website: "https://www.syte.ai", rating: 4.5 },
          { name: "Cortexica", description: "Visual AI for fashion and retail search", website: "https://www.cortexica.com", rating: 4.4 },
          { name: "Vue.ai", description: "AI-powered visual search and product tagging", website: "https://www.vue.ai", rating: 4.6 }
        ]
      },
      { 
        name: "Supply Chain Optimization", 
        favicon: "⚖️", 
        website: "",
        tools: [
          { name: "Locus", description: "AI-powered supply chain optimization and logistics", website: "https://www.locus.sh", rating: 4.7 },
          { name: "FourKites", description: "Machine learning for supply chain visibility", website: "https://www.fourkites.com", rating: 4.6 },
          { name: "Project44", description: "AI-driven supply chain and logistics platform", website: "https://www.project44.com", rating: 4.8 },
          { name: "Matternet", description: "AI-powered drone delivery and supply chain", website: "https://www.matternet.com", rating: 4.5 },
          { name: "Flexport", description: "AI-enhanced freight forwarding and logistics", website: "https://www.flexport.com", rating: 4.6 }
        ]
      },
      { 
        name: "Customer Analytics", 
        favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", 
        website: "",
        tools: [
          { name: "RetailNext", description: "AI-powered in-store analytics and customer behavior tracking", website: "https://www.retailnext.com", rating: 4.7 },
          { name: "Shopify Analytics", description: "Machine learning for e-commerce customer insights", website: "https://www.shopify.com", rating: 4.6 },
          { name: "Adobe Analytics", description: "AI-driven customer journey analysis and optimization", website: "https://www.adobe.com", rating: 4.8 },
          { name: "Gartner Retail", description: "AI-powered retail customer analytics platform", website: "https://www.gartner.com", rating: 4.5 },
          { name: "Custora", description: "Predictive analytics for customer lifetime value", website: "https://www.custora.com", rating: 4.4 }
        ]
      },
      { 
        name: "Loss Prevention", 
        favicon: "🛡️", 
        website: "",
        tools: [
          { name: "StopLift AI", description: "AI-powered theft detection and prevention system", website: "https://www.stoplift.net", rating: 4.8 },
          { name: "Everseen", description: "Machine learning for retail shrinkage prevention", website: "https://www.everseen.ai", rating: 4.6 },
          { name: "Zebra AI", description: "Computer vision for retail loss prevention", website: "https://www.zebra.com", rating: 4.7 },
          { name: "Ava Retail", description: "AI-powered checkout and theft prevention", website: "https://www.avaretail.com", rating: 4.5 },
          { name: "Retail Crime AI", description: "Predictive analytics for retail crime prevention", website: "https://www.retailcrime.ai", rating: 4.4 }
        ]
      },
      { 
        name: "Store Operations", 
        favicon: "🎪", 
        website: "",
        tools: [
          { name: "StoreForce AI", description: "AI-powered workforce management and scheduling", website: "https://www.storeforce.com", rating: 4.6 },
          { name: "Relex Solutions", description: "Machine learning for retail space optimization", website: "https://www.relexsolutions.com", rating: 4.7 },
          { name: "Blue Yonder Retail", description: "AI-driven store operations and planning", website: "https://www.blueyonder.com", rating: 4.5 },
          { name: "Retail Zipline", description: "AI-powered retail task management and communication", website: "https://www.retailzipline.com", rating: 4.8 },
          { name: "Focal Systems", description: "Computer vision for retail store operations", website: "https://www.focal.systems", rating: 4.6 }
        ]
      },
      { 
        name: "Omnichannel Integration", 
        favicon: "🔮", 
        website: "",
        tools: [
          { name: "NewStore AI", description: "AI-powered omnichannel retail platform", website: "https://www.newstore.com", rating: 4.7 },
          { name: "Vtex AI", description: "Machine learning for unified commerce experiences", website: "https://www.vtex.com", rating: 4.6 },
          { name: "Salesforce Commerce AI", description: "AI-driven omnichannel customer engagement", website: "https://www.salesforce.com", rating: 4.8 },
          { name: "BigCommerce AI", description: "AI-powered multi-channel retail management", website: "https://www.bigcommerce.com", rating: 4.5 },
          { name: "Shopify Plus AI", description: "AI-enhanced enterprise omnichannel solutions", website: "https://www.shopify.com", rating: 4.7 }
        ]
      }
    ]
  },
  {
    name: "AI for Education",
    icon: "🎓",
    toolCount: 32,
    subcategories: [
      { name: "Personalized Learning", favicon: "", website: "" },
      { name: "Assessment & Grading", favicon: "", website: "" },
      { name: "Student Engagement", favicon: "", website: "" },
      { name: "Intelligent Tutoring", favicon: "", website: "" },
      { name: "Learning Analytics", favicon: "", website: "" },
      { name: "Virtual Classrooms", favicon: "", website: "" },
      { name: "Educational Content", favicon: "", website: "" },
      { name: "Language Learning", favicon: "", website: "" },
      { name: "Educational Games", favicon: "", website: "" },
      { name: "Career Guidance", favicon: "", website: "" },
      { name: "Special Education", favicon: "", website: "" }
    ]
  },
  {
    name: "AI for Healthcare",
    icon: "🏥",
    toolCount: 24,
    subcategories: [
      { name: "Patient Care", favicon: "", website: "" },
      { name: "Medical Research", favicon: "", website: "" },
      { name: "Healthcare Administration", favicon: "", website: "" },
      { name: "Telemedicine", favicon: "", website: "" }
    ]
  },
  {
    name: "AI for Finance",
    icon: "💰",
    toolCount: 21,
    subcategories: [
      { name: "Algorithmic Trading", favicon: "📈", website: "" },
      { name: "Fraud Detection", favicon: "🛡️", website: "" },
      { name: "Risk Assessment", favicon: "⚠️", website: "" },
      { name: "Personal Finance", favicon: "💳", website: "" },
      { name: "Credit Scoring", favicon: "📊", website: "" },
    ]
  },
  {
    name: "AI for Marketing",
    icon: "📢",
    toolCount: 19,
    subcategories: [
      { name: "Content Generation", favicon: "✍️", website: "" },
      { name: "Customer Segmentation", favicon: "👥", website: "" },
      { name: "Sentiment Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã‹Å“Ã…Â ", website: "" },
      { name: "Campaign Optimization", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¯", website: "" },
      { name: "SEO & Analytics", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
    ]
  },
  {
    name: "AI for Healthcare",
    icon: "🏥",
    toolCount: 45,
    subcategories: [
      { name: "Medical Diagnosis", favicon: "🩺", website: "" },
      { name: "Drug Discovery", favicon: "💊", website: "" },
      { name: "Patient Care", favicon: "👩‍⚕️", website: "" },
      { name: "Medical Imaging", favicon: "🏷️", website: "" },
      { name: "Healthcare Analytics", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
    ]
  },
  {
    name: "AI for Finance",
    icon: "💰",
    toolCount: 38,
    subcategories: [
      { name: "Trading & Investment", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‹â€ ", website: "" },
      { name: "Risk Management", favicon: "ÃƒÂ¢Ã…Â¡Ã‚Â ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Fraud Detection", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â", website: "" },
      { name: "Personal Finance", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â³", website: "" },
      { name: "Accounting", favicon: "ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Â®", website: "" },
    ]
  },
  {
    name: "AI for Education",
    icon: "🎓",
    toolCount: 50,
    subcategories: [
      { name: "Personalized Learning", favicon: "👤", website: "" },
      { name: "Content Creation", favicon: "📚", website: "" },
      { name: "Assessment Tools", favicon: "📊", website: "" },
      { name: "Student Analytics", favicon: "📈", website: "" },
      { name: "Administrative Tasks", favicon: "⚙️", website: "" },
      { name: "Virtual Classrooms", favicon: "🏫", website: "" },
      { name: "Educational Games", favicon: "🎲", website: "" },
      { name: "Study Assistants", favicon: "🤖", website: "" },
      { name: "Language Learning", favicon: "🌐", website: "" },
      { name: "Tutoring Systems", favicon: "👨‍🏫", website: "" }
    ]
  },
  {
    name: "AI for Marketing",
    icon: "📢",
    toolCount: 35,
    subcategories: [
      { name: "Content Creation", favicon: "✍️", website: "" },
      { name: "Email Marketing", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â§", website: "" },
      { name: "Social Media", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â±", website: "" },
      { name: "SEO Optimization", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â", website: "" },
      { name: "Customer Analytics", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
    ]
  },
  {
    name: "AI for Real Estate",
    icon: "🏢",
    toolCount: 28,
    subcategories: [
      { name: "Property Valuation", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â°", website: "" },
      { name: "Virtual Tours", favicon: "ÃƒÂ°Ã…Â¸Ã‚Â¥Ã‚Â½", website: "" },
      { name: "Lead Generation", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¯", website: "" },
      { name: "Market Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
      { name: "Property Management", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ¢â‚¬Ëœ", website: "" },
    ]
  },
  {
    name: "AI for Legal",
    icon: "⚖️",
    toolCount: 31,
    subcategories: [
      { name: "Legal Research", favicon: "📚", website: "" },
      { name: "Contract Analysis", favicon: "📄", website: "" },
      { name: "Case Management", favicon: "📁", website: "" },
      { name: "Compliance", favicon: "✅", website: "" },
      { name: "Document Review", favicon: "🔍", website: "" },
      { name: "E-Discovery", favicon: "🔎", website: "" },
      { name: "Legal Analytics", favicon: "📊", website: "" },
      { name: "Patent Analysis", favicon: "💡", website: "" },
      { name: "Litigation Prediction", favicon: "⚖️", website: "" },
      { name: "Regulatory Compliance", favicon: "🛡️", website: "" },
    ]
  },
  {
    name: "AI for Manufacturing",
    icon: "🏭",
    toolCount: 26,
    subcategories: [
      { name: "Quality Control", favicon: "ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦", website: "" },
      { name: "Predictive Maintenance", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â§", website: "" },
      { name: "Supply Chain", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â¦", website: "" },
      { name: "Production Optimization", favicon: "ÃƒÂ¢Ã…Â¡Ã¢â€žÂ¢ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Safety Monitoring", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂºÃ‚Â¡ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
    ]
  },
  {
    name: "AI for Agriculture",
    icon: "🌾",
    toolCount: 22,
    subcategories: [
      { name: "Crop Monitoring", favicon: "ÃƒÂ°Ã…Â¸Ã…â€™Ã‚Â±", website: "" },
      { name: "Precision Farming", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¯", website: "" },
      { name: "Weather Prediction", favicon: "ÃƒÂ°Ã…Â¸Ã…â€™Ã‚Â¤ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Soil Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Âª", website: "" },
      { name: "Pest Detection", favicon: "ÃƒÂ°Ã…Â¸Ã‚ÂÃ¢â‚¬Âº", website: "" },
    ]
  },
  {
    name: "AI for Transportation",
    icon: "🚗",
    toolCount: 29,
    subcategories: [
      { name: "Route Optimization", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â€Ã‚ÂºÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Fleet Management", favicon: "ÃƒÂ°Ã…Â¸Ã…Â¡Ã…Â¡", website: "" },
      { name: "Traffic Prediction", favicon: "ÃƒÂ°Ã…Â¸Ã…Â¡Ã‚Â¦", website: "" },
      { name: "Autonomous Vehicles", favicon: "ÃƒÂ°Ã…Â¸Ã‚Â¤Ã¢â‚¬â€œ", website: "" },
      { name: "Logistics", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â¦", website: "" },
    ]
  },
  {
    name: "AI for Entertainment",
    icon: "🎮",
    toolCount: 33,
    subcategories: [
      { name: "Game Development", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¯", website: "" },
      { name: "Content Creation", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¬", website: "" },
      { name: "Music Generation", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Âµ", website: "" },
      { name: "Video Editing", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â¹", website: "" },
      { name: "Virtual Reality", favicon: "ÃƒÂ°Ã…Â¸Ã‚Â¥Ã‚Â½", website: "" },
    ]
  },
  {
    name: "AI for Sports",
    icon: "⚽",
    toolCount: 24,
    subcategories: [
      { name: "Performance Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
      { name: "Training Optimization", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Âª", website: "" },
      { name: "Injury Prevention", favicon: "ÃƒÂ°Ã…Â¸Ã‚ÂÃ‚Â¥", website: "" },
      { name: "Game Strategy", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¯", website: "" },
      { name: "Fan Engagement", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ËœÃ‚Â", website: "" },
    ]
  },
  {
    name: "AI for Fashion",
    icon: "👗",
    toolCount: 27,
    subcategories: [
      { name: "Design Assistance", favicon: "ÃƒÂ¢Ã…â€œÃ‚Â¨", website: "" },
      { name: "Trend Forecasting", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â®", website: "" },
      { name: "Virtual Try-On", favicon: "ÃƒÂ°Ã…Â¸Ã‚Â¥Ã‚Â½", website: "" },
      { name: "Supply Chain", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â¦", website: "" },
      { name: "Personal Styling", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ËœÃ¢â‚¬Â", website: "" },
    ]
  },
  {
    name: "AI for Food & Beverage",
    icon: "🍔",
    toolCount: 21,
    subcategories: [
      { name: "Recipe Generation", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â", website: "" },
      { name: "Nutrition Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã‚Â¥Ã¢â‚¬â€", website: "" },
      { name: "Quality Control", favicon: "ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦", website: "" },
      { name: "Inventory Management", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã¢â‚¬Â¹", website: "" },
      { name: "Customer Personalization", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ËœÃ‚Â¤", website: "" },
    ]
  },
  {
    name: "AI for Travel",
    icon: "✈️",
    toolCount: 30,
    subcategories: [
      { name: "Trip Planning", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â€Ã‚ÂºÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Price Prediction", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â°", website: "" },
      { name: "Recommendation Engines", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¯", website: "" },
      { name: "Language Translation", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â€Ã‚Â£ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Travel Safety", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂºÃ‚Â¡ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
    ]
  },
  {
    name: "AI for Construction",
    icon: "🏗️",
    toolCount: 25,
    subcategories: [
      { name: "Project Management", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã¢â‚¬Â¹", website: "" },
      { name: "Safety Monitoring", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂºÃ‚Â¡ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Design Optimization", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¨", website: "" },
      { name: "Cost Estimation", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â°", website: "" },
      { name: "Quality Inspection", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â", website: "" },
    ]
  },
  {
    name: "AI for Energy",
    icon: "⚡",
    toolCount: 23,
    subcategories: [
      { name: "Smart Grids", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ…â€™", website: "" },
      { name: "Energy Optimization", favicon: "ÃƒÂ¢Ã…Â¡Ã¢â€žÂ¢ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Predictive Maintenance", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â§", website: "" },
      { name: "Renewable Energy", favicon: "ÃƒÂ°Ã…Â¸Ã…â€™Ã‚Â±", website: "" },
      { name: "Consumption Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
    ]
  },
  {
    name: "AI for Insurance",
    icon: "🛡️",
    toolCount: 28,
    subcategories: [
      { name: "Risk Assessment", favicon: "ÃƒÂ¢Ã…Â¡Ã‚Â ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Claims Processing", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã¢â‚¬Å¾", website: "" },
      { name: "Fraud Detection", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â", website: "" },
      { name: "Underwriting", favicon: "✍️", website: "" },
      { name: "Customer Service", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â¬", website: "" },
    ]
  },
  {
    name: "AI for Human Resources",
    icon: "👥",
    toolCount: 32,
    subcategories: [
      { name: "Recruitment", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¯", website: "" },
      { name: "Employee Engagement", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â¼", website: "" },
      { name: "Performance Management", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‹â€ ", website: "" },
      { name: "Training & Development", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â¡", website: "" },
      { name: "Workforce Analytics", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
    ]
  },
  {
    name: "AI for Finance",
    icon: "💰",
    toolCount: 31,
    subcategories: [
      { name: "Content Generation", favicon: "✍️", website: "" },
      { name: "Fact Checking", favicon: "ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦", website: "" },
      { name: "News Curation", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã¢â‚¬Â¹", website: "" },
      { name: "Sentiment Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã‹Å“Ã…Â ", website: "" },
      { name: "Automated Reporting", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
    ]
  },
  {
    name: "AI for Journalism",
    icon: "📰",
    toolCount: 19,
    subcategories: [
      { name: "Content Generation", favicon: "✍️", website: "" },
      { name: "Fact Checking", favicon: "ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦", website: "" },
      { name: "News Curation", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã¢â‚¬Â¹", website: "" },
      { name: "Sentiment Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã‹Å“Ã…Â ", website: "" },
      { name: "Automated Reporting", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
    ]
  },
  {
    name: "AI for Architecture",
    icon: "🏛️",
    toolCount: 26,
    subcategories: [
      { name: "Design Generation", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¨", website: "" },
      { name: "Space Planning", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â", website: "" },
      { name: "Energy Analysis", favicon: "ÃƒÂ¢Ã…Â¡Ã‚Â¡", website: "" },
      { name: "Structural Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã‚ÂÃ¢â‚¬â€ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Visualization", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ËœÃ‚ÂÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
    ]
  },
  {
    name: "AI for Photography",
    icon: "📸",
    toolCount: 22,
    subcategories: [
      { name: "Image Enhancement", favicon: "ÃƒÂ¢Ã…â€œÃ‚Â¨", website: "" },
      { name: "Object Recognition", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â", website: "" },
      { name: "Auto Editing", favicon: "ÃƒÂ¢Ã…â€œÃ¢â‚¬Å¡ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Style Transfer", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¨", website: "" },
      { name: "Photo Organization", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â", website: "" },
    ]
  },
  {
    name: "AI for Music",
    icon: "🎵",
    toolCount: 29,
    subcategories: [
      { name: "Composition", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¼", website: "" },
      { name: "Audio Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
      { name: "Music Recommendation", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¯", website: "" },
      { name: "Audio Enhancement", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ…Â ", website: "" },
      { name: "Genre Classification", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â­", website: "" },
    ]
  },
  {
    name: "AI for Gaming",
    icon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â®",
    toolCount: 35,
    subcategories: [
      { name: "NPC Behavior", favicon: "ÃƒÂ°Ã…Â¸Ã‚Â¤Ã¢â‚¬â€œ", website: "" },
      { name: "Level Design", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â€Ã‚ÂºÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Player Analytics", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
      { name: "Anti-Cheating", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂºÃ‚Â¡ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Dynamic Difficulty", favicon: "⚖️", website: "" },
    ]
  },
  {
    name: "AI for Cybersecurity",
    icon: "🔒",
    toolCount: 31,
    subcategories: [
      { name: "Threat Detection", favicon: "ÃƒÂ¢Ã…Â¡Ã‚Â ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Vulnerability Assessment", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â", website: "" },
      { name: "Fraud Prevention", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂºÃ‚Â¡ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Security Analytics", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
      { name: "Automated Response", favicon: "ÃƒÂ°Ã…Â¸Ã…Â¡Ã‚Â¨", website: "" },
    ]
  },
  {
    name: "AI for E-commerce",
    icon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂºÃ¢â‚¬â„¢",
    toolCount: 33,
    subcategories: [
      { name: "Product Recommendations", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¯", website: "" },
      { name: "Price Optimization", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â°", website: "" },
      { name: "Inventory Management", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â¦", website: "" },
      { name: "Customer Support", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â¬", website: "" },
      { name: "Fraud Detection", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â", website: "" },
    ]
  },
  {
    name: "AI for Banking",
    icon: "🏦",
    toolCount: 27,
    subcategories: [
      { name: "Credit Scoring", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â³", website: "" },
      { name: "Fraud Detection", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â", website: "" },
      { name: "Customer Service", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â¬", website: "" },
      { name: "Risk Management", favicon: "ÃƒÂ¢Ã…Â¡Ã‚Â ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Investment Advice", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‹â€ ", website: "" },
    ]
  },
  {
    name: "AI for Telecommunications",
    icon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â¾",
    toolCount: 24,
    subcategories: [
      { name: "Network Optimization", favicon: "ÃƒÂ°Ã…Â¸Ã…â€™Ã‚Â", website: "" },
      { name: "Call Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â¾", website: "" },
      { name: "Customer Support", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â¬", website: "" },
      { name: "Predictive Maintenance", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â§", website: "" },
      { name: "Quality Assurance", favicon: "ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦", website: "" },
    ]
  },
  {
    name: "AI for Automotive",
    icon: "🚗",
    toolCount: 28,
    subcategories: [
      { name: "Autonomous Driving", favicon: "ÃƒÂ°Ã…Â¸Ã‚Â¤Ã¢â‚¬â€œ", website: "" },
      { name: "Driver Assistance", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ËœÃ‚Â¨ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂÃƒÂ¢Ã…â€œÃ‹â€ ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Predictive Maintenance", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â§", website: "" },
      { name: "Traffic Management", favicon: "ÃƒÂ°Ã…Â¸Ã…Â¡Ã‚Â¦", website: "" },
      { name: "In-Car Experience", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Âµ", website: "" },
    ]
  },
  {
    name: "AI for Aerospace",
    icon: "✈️",
    toolCount: 21,
    subcategories: [
      { name: "Flight Optimization", favicon: "ÃƒÂ¢Ã…Â¡Ã¢â€žÂ¢ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Maintenance Prediction", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â§", website: "" },
      { name: "Safety Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂºÃ‚Â¡ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Traffic Control", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â€Ã‚ÂºÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Weather Prediction", favicon: "ÃƒÂ°Ã…Â¸Ã…â€™Ã‚Â¤ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
    ]
  },
  {
    name: "AI for Pharmaceuticals",
    icon: "💊",
    toolCount: 26,
    subcategories: [
      { name: "Drug Discovery", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â¬", website: "" },
      { name: "Clinical Trials", favicon: "ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Âª", website: "" },
      { name: "Personalized Medicine", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ËœÃ‚Â¤", website: "" },
      { name: "Quality Control", favicon: "ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦", website: "" },
      { name: "Regulatory Compliance", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã¢â‚¬Â¹", website: "" },
    ]
  },
  {
    name: "AI for Biotechnology",
    icon: "🧬",
    toolCount: 23,
    subcategories: [
      { name: "Genomic Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Â¬", website: "" },
      { name: "Protein Folding", favicon: "ÃƒÂ°Ã…Â¸Ã‚Â¦Ã‚Â ", website: "" },
      { name: "Drug Design", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã…Â ", website: "" },
      { name: "Synthetic Biology", favicon: "ÃƒÂ¢Ã…Â¡Ã¢â‚¬â€ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Bioinformatics", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â»", website: "" },
    ]
  },
  {
    name: "AI for Environmental Science",
    icon: "🌿",
    toolCount: 25,
    subcategories: [
      { name: "Climate Modeling", favicon: "ÃƒÂ°Ã…Â¸Ã…â€™Ã‚Â¡ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Pollution Monitoring", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â", website: "" },
      { name: "Wildlife Conservation", favicon: "ÃƒÂ°Ã…Â¸Ã‚Â¦Ã‚Â", website: "" },
      { name: "Resource Management", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
      { name: "Disaster Prediction", favicon: "ÃƒÂ¢Ã…Â¡Ã‚Â ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
    ]
  },
  {
    name: "AI for Meteorology",
    icon: "☁️",
    toolCount: 18,
    subcategories: [
      { name: "Weather Prediction", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â®", website: "" },
      { name: "Climate Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
      { name: "Storm Tracking", favicon: "ÃƒÂ°Ã…Â¸Ã…â€™Ã‚ÂªÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Agricultural Forecasting", favicon: "🌾", website: "" },
      { name: "Aviation Weather", favicon: "ÃƒÂ¢Ã…â€œÃ‹â€ ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
    ]
  },
  {
    name: "AI for Oceanography",
    icon: "🌊",
    toolCount: 20,
    subcategories: [
      { name: "Marine Life Monitoring", favicon: "ÃƒÂ°Ã…Â¸Ã‚ÂÃ‚Â ", website: "" },
      { name: "Ocean Current Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â§", website: "" },
      { name: "Pollution Detection", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â", website: "" },
      { name: "Coral Reef Health", favicon: "ÃƒÂ°Ã…Â¸Ã‚ÂªÃ‚Â¸", website: "" },
      { name: "Fisheries Management", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â£", website: "" },
    ]
  },
  {
    name: "AI for Geology",
    icon: "ÃƒÂ¢Ã¢â‚¬ÂºÃ‚ÂÃƒÂ¯Ã‚Â¸Ã‚Â",
    toolCount: 19,
    subcategories: [
      { name: "Mineral Exploration", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã…Â½", website: "" },
      { name: "Earthquake Prediction", favicon: "ÃƒÂ°Ã…Â¸Ã…â€™Ã¢â‚¬Â¹", website: "" },
      { name: "Soil Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Âª", website: "" },
      { name: "Rock Classification", favicon: "ÃƒÂ°Ã…Â¸Ã‚ÂªÃ‚Â¨", website: "" },
      { name: "Geological Mapping", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â€Ã‚ÂºÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
    ]
  },
  {
    name: "AI for Astronomy",
    icon: "🔭­",
    toolCount: 22,
    subcategories: [
      { name: "Celestial Object Detection", favicon: "ÃƒÂ¢Ã‚Â­Ã‚Â", website: "" },
      { name: "Space Debris Tracking", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂºÃ‚Â°ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Galaxy Classification", favicon: "ÃƒÂ°Ã…Â¸Ã…â€™Ã…â€™", website: "" },
      { name: "Exoplanet Discovery", favicon: "ÃƒÂ°Ã…Â¸Ã‚ÂªÃ‚Â", website: "" },
      { name: "Astronomical Data Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
    ]
  },
  {
    name: "AI for Chemistry",
    icon: "🧪",
    toolCount: 24,
    subcategories: [
      { name: "Molecular Design", favicon: "ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Â¬", website: "" },
      { name: "Reaction Prediction", favicon: "ÃƒÂ¢Ã…Â¡Ã‚Â¡", website: "" },
      { name: "Compound Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â¬", website: "" },
      { name: "Lab Automation", favicon: "ÃƒÂ°Ã…Â¸Ã‚Â¤Ã¢â‚¬â€œ", website: "" },
      { name: "Chemical Safety", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂºÃ‚Â¡ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
    ]
  },
  {
    name: "AI for Physics",
    icon: "⚛️",
    toolCount: 21,
    subcategories: [
      { name: "Particle Detection", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â¬", website: "" },
      { name: "Quantum Computing", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â»", website: "" },
      { name: "Simulation Modeling", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â®", website: "" },
      { name: "Data Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
      { name: "Experiment Design", favicon: "ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Âª", website: "" },
    ]
  },
  {
    name: "AI for Mathematics",
    icon: "🔢",
    toolCount: 20,
    subcategories: [
      { name: "Problem Solving", favicon: "ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Â®", website: "" },
      { name: "Proof Generation", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â", website: "" },
      { name: "Pattern Recognition", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â", website: "" },
      { name: "Statistical Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
      { name: "Mathematical Modeling", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‹â€ ", website: "" },
    ]
  },
  {
    name: "AI for Linguistics",
    icon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â€Ã‚Â£ÃƒÂ¯Ã‚Â¸Ã‚Â",
    toolCount: 18,
    subcategories: [
      { name: "Language Translation", favicon: "ÃƒÂ°Ã…Â¸Ã…â€™Ã‚Â", website: "" },
      { name: "Speech Recognition", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¤", website: "" },
      { name: "Text Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â", website: "" },
      { name: "Language Learning", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â¡", website: "" },
      { name: "Semantic Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Â ", website: "" },
    ]
  },
  {
    name: "AI for Psychology",
    icon: "ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Â ",
    toolCount: 17,
    subcategories: [
      { name: "Behavioral Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
      { name: "Mental Health Assessment", favicon: "ÃƒÂ°Ã…Â¸Ã‚ÂÃ‚Â¥", website: "" },
      { name: "Cognitive Testing", favicon: "ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Âª", website: "" },
      { name: "Therapy Assistance", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â¬", website: "" },
      { name: "Emotion Recognition", favicon: "ÃƒÂ°Ã…Â¸Ã‹Å“Ã…Â ", website: "" },
    ]
  },
  {
    name: "AI for Sociology",
    icon: "👥",
    toolCount: 16,
    subcategories: [
      { name: "Social Network Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Â¢Ã‚Â¸ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Behavioral Prediction", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â®", website: "" },
      { name: "Demographic Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ËœÃ‚Â¤", website: "" },
      { name: "Cultural Studies", favicon: "ÃƒÂ°Ã…Â¸Ã…â€™Ã‚Â", website: "" },
      { name: "Survey Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã¢â‚¬Â¹", website: "" },
    ]
  },
  {
    name: "AI for Anthropology",
    icon: "ÃƒÂ°Ã…Â¸Ã‚Â¦Ã‚Â´",
    toolCount: 15,
    subcategories: [
      { name: "Cultural Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã…â€™Ã‚Â", website: "" },
      { name: "Archaeological Dating", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã¢â‚¬Â¦", website: "" },
      { name: "Artifact Classification", favicon: "ÃƒÂ°Ã…Â¸Ã‚ÂÃ‚Âº", website: "" },
      { name: "Language Evolution", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â€Ã‚Â£ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Human Migration Tracking", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â€Ã‚ÂºÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
    ]
  },
  {
    name: "AI for History",
    icon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â¡",
    toolCount: 14,
    subcategories: [
      { name: "Document Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã¢â‚¬Å¾", website: "" },
      { name: "Historical Pattern Recognition", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â", website: "" },
      { name: "Artifact Dating", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã¢â‚¬Â¦", website: "" },
      { name: "Genealogical Research", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ËœÃ‚Â¨ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂÃƒÂ°Ã…Â¸Ã¢â‚¬ËœÃ‚Â©ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂÃƒÂ°Ã…Â¸Ã¢â‚¬ËœÃ‚Â§ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂÃƒÂ°Ã…Â¸Ã¢â‚¬ËœÃ‚Â¦", website: "" },
      { name: "Timeline Generation", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‹â€ ", website: "" },
    ]
  },
  {
    name: "AI for Philosophy",
    icon: "ÃƒÂ°Ã…Â¸Ã‚Â¤Ã¢â‚¬Â",
    toolCount: 13,
    subcategories: [
      { name: "Ethical Analysis", favicon: "⚖️", website: "" },
      { name: "Logic Reasoning", favicon: "ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Â ", website: "" },
      { name: "Concept Mapping", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â€Ã‚ÂºÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Argument Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â¬", website: "" },
      { name: "Philosophical Text Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã¢â‚¬â€œ", website: "" },
    ]
  },
  {
    name: "AI for Libraries",
    icon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â¡",
    toolCount: 18,
    subcategories: [
      { name: "Catalog Management", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã¢â‚¬Â¹", website: "" },
      { name: "Content Recommendation", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¯", website: "" },
      { name: "Text Digitization", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â", website: "" },
      { name: "Search Optimization", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â", website: "" },
      { name: "Usage Analytics", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
    ]
  },
  {
    name: "AI for Museums",
    icon: "ÃƒÂ°Ã…Â¸Ã‚ÂÃ¢â‚¬ÂºÃƒÂ¯Ã‚Â¸Ã‚Â",
    toolCount: 16,
    subcategories: [
      { name: "Exhibit Design", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¨", website: "" },
      { name: "Artifact Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â¬", website: "" },
      { name: "Visitor Experience", favicon: "👥", website: "" },
      { name: "Collection Management", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â¦", website: "" },
      { name: "Interactive Displays", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â±", website: "" },
    ]
  },
  {
    name: "AI for Tourism",
    icon: "ÃƒÂ°Ã…Â¸Ã…â€™Ã‚Â",
    toolCount: 22,
    subcategories: [
      { name: "Destination Recommendation", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¯", website: "" },
      { name: "Virtual Tours", favicon: "ÃƒÂ°Ã…Â¸Ã‚Â¥Ã‚Â½", website: "" },
      { name: "Crowd Management", favicon: "👥", website: "" },
      { name: "Price Optimization", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â°", website: "" },
      { name: "Experience Personalization", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ËœÃ‚Â¤", website: "" },
    ]
  },
  {
    name: "AI for Hospitality",
    icon: "ÃƒÂ°Ã…Â¸Ã‚ÂÃ‚Â¨",
    toolCount: 20,
    subcategories: [
      { name: "Guest Personalization", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ËœÃ‚Â¤", website: "" },
      { name: "Revenue Management", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â°", website: "" },
      { name: "Staff Scheduling", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã¢â‚¬Â¦", website: "" },
      { name: "Quality Control", favicon: "ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦", website: "" },
      { name: "Customer Feedback Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â¬", website: "" },
    ]
  },
  {
    name: "AI for Fitness",
    icon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Âª",
    toolCount: 25,
    subcategories: [
      { name: "Workout Generation", favicon: "ÃƒÂ°Ã…Â¸Ã‚ÂÃ¢â‚¬Â¹ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Performance Tracking", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
      { name: "Injury Prevention", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂºÃ‚Â¡ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Nutrition Planning", favicon: "ÃƒÂ°Ã…Â¸Ã‚Â¥Ã¢â‚¬â€", website: "" },
      { name: "Personal Training", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ËœÃ‚Â¨ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂÃƒÂ°Ã…Â¸Ã‚ÂÃ‚Â«", website: "" },
    ]
  },
  {
    name: "AI for Wellness",
    icon: "ÃƒÂ°Ã…Â¸Ã‚Â§Ã‹Å“",
    toolCount: 19,
    subcategories: [
      { name: "Mental Health", favicon: "ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Â ", website: "" },
      { name: "Meditation Guidance", favicon: "ÃƒÂ°Ã…Â¸Ã‚Â§Ã‹Å“", website: "" },
      { name: "Sleep Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã‹Å“Ã‚Â´", website: "" },
      { name: "Stress Management", favicon: "ÃƒÂ°Ã…Â¸Ã‹Å“Ã…â€™", website: "" },
      { name: "Wellness Tracking", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‹â€ ", website: "" },
    ]
  },
  {
    name: "AI for Pets",
    icon: "ÃƒÂ°Ã…Â¸Ã‚ÂÃ¢â‚¬Â¢",
    toolCount: 17,
    subcategories: [
      { name: "Health Monitoring", favicon: "ÃƒÂ°Ã…Â¸Ã‚ÂÃ‚Â¥", website: "" },
      { name: "Behavior Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Â ", website: "" },
      { name: "Training Assistance", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã¢â‚¬Å“", website: "" },
      { name: "Nutrition Planning", favicon: "ÃƒÂ°Ã…Â¸Ã‚Â¥Ã¢â‚¬Â¢", website: "" },
      { name: "Activity Tracking", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
    ]
  },
  {
    name: "AI for Gardening",
    icon: "ÃƒÂ°Ã…Â¸Ã…â€™Ã‚Â±",
    toolCount: 15,
    subcategories: [
      { name: "Plant Identification", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â", website: "" },
      { name: "Care Scheduling", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã¢â‚¬Â¦", website: "" },
      { name: "Disease Detection", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â¬", website: "" },
      { name: "Garden Planning", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â€Ã‚ÂºÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Harvest Optimization", favicon: "🌾", website: "" },
    ]
  },
  {
    name: "AI for Home Automation",
    icon: "🏢",
    toolCount: 28,
    subcategories: [
      { name: "Smart Lighting", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â¡", website: "" },
      { name: "Climate Control", favicon: "ÃƒÂ°Ã…Â¸Ã…â€™Ã‚Â¡ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Security Systems", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ¢â‚¬â„¢", website: "" },
      { name: "Energy Management", favicon: "ÃƒÂ¢Ã…Â¡Ã‚Â¡", website: "" },
      { name: "Voice Control", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¤", website: "" },
    ]
  },
  {
    name: "AI for Smart Cities",
    icon: "ÃƒÂ°Ã…Â¸Ã‚ÂÃ¢â€žÂ¢ÃƒÂ¯Ã‚Â¸Ã‚Â",
    toolCount: 32,
    subcategories: [
      { name: "Traffic Management", favicon: "ÃƒÂ°Ã…Â¸Ã…Â¡Ã‚Â¦", website: "" },
      { name: "Waste Management", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â€Ã¢â‚¬ËœÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Public Safety", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂºÃ‚Â¡ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Energy Optimization", favicon: "ÃƒÂ¢Ã…Â¡Ã‚Â¡", website: "" },
      { name: "Urban Planning", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â€Ã‚ÂºÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
    ]
  },
  {
    name: "AI for Space Exploration",
    icon: "ÃƒÂ°Ã…Â¸Ã…Â¡Ã¢â€šÂ¬",
    toolCount: 24,
    subcategories: [
      { name: "Mission Planning", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã¢â‚¬Â¹", website: "" },
      { name: "Autonomous Navigation", favicon: "ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Â­", website: "" },
      { name: "Data Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
      { name: "Communication Systems", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â¡", website: "" },
      { name: "Life Support", favicon: "ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Â¬", website: "" },
    ]
  },
  {
    name: "AI for Robotics",
    icon: "ðŸ¤–",
    toolCount: 35,
    subcategories: [
      { name: "Industrial Automation", favicon: "🏭", website: "" },
      { name: "Service Robots", favicon: "Ã°Å¸Â¤Â", website: "" },
      { name: "Human-Robot Interaction", favicon: "👥", website: "" },
      { name: "Path Planning", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â€Ã‚ÂºÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Computer Vision", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ËœÃ‚ÂÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
    ]
  },
  {
    name: "AI for Drones",
    icon: "ÃƒÂ°Ã…Â¸Ã…Â¡Ã‚Â",
    toolCount: 21,
    subcategories: [
      { name: "Flight Control", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â®", website: "" },
      { name: "Object Detection", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â", website: "" },
      { name: "Navigation Systems", favicon: "ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Â­", website: "" },
      { name: "Data Collection", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
      { name: "Safety Systems", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂºÃ‚Â¡ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
    ]
  },
  {
    name: "AI for 3D Printing",
    icon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â€œÃ‚Â¨ÃƒÂ¯Ã‚Â¸Ã‚Â",
    toolCount: 19,
    subcategories: [
      { name: "Design Optimization", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¨", website: "" },
      { name: "Quality Control", favicon: "ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦", website: "" },
      { name: "Material Selection", favicon: "ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Âª", website: "" },
      { name: "Print Scheduling", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã¢â‚¬Â¦", website: "" },
      { name: "Cost Estimation", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â°", website: "" },
    ]
  },
  {
    name: "AI for Virtual Reality",
    icon: "ÃƒÂ°Ã…Â¸Ã‚Â¥Ã‚Â½",
    toolCount: 27,
    subcategories: [
      { name: "Environment Creation", favicon: "ÃƒÂ°Ã…Â¸Ã…â€™Ã‚Â", website: "" },
      { name: "Avatar Generation", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ËœÃ‚Â¤", website: "" },
      { name: "Motion Tracking", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
      { name: "Interaction Design", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â®", website: "" },
      { name: "Content Adaptation", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â±", website: "" },
    ]
  },
  {
    name: "AI for Augmented Reality",
    icon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â±",
    toolCount: 23,
    subcategories: [
      { name: "Object Recognition", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â", website: "" },
      { name: "Spatial Mapping", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â€Ã‚ÂºÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Overlay Design", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¨", website: "" },
      { name: "User Interaction", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ËœÃ¢â‚¬Â ", website: "" },
      { name: "Content Delivery", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â¡", website: "" },
    ]
  },
  {
    name: "AI for Blockchain",
    icon: "ÃƒÂ¢Ã¢â‚¬ÂºÃ¢â‚¬Å“ÃƒÂ¯Ã‚Â¸Ã‚Â",
    toolCount: 26,
    subcategories: [
      { name: "Smart Contracts", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã¢â‚¬Å¾", website: "" },
      { name: "Fraud Detection", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â", website: "" },
      { name: "Trading Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‹â€ ", website: "" },
      { name: "Security Auditing", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂºÃ‚Â¡ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Token Economics", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â°", website: "" },
    ]
  },
  {
    name: "AI for IoT",
    icon: "ÃƒÂ°Ã…Â¸Ã…â€™Ã‚Â",
    toolCount: 30,
    subcategories: [
      { name: "Device Management", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â±", website: "" },
      { name: "Data Processing", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â»", website: "" },
      { name: "Predictive Maintenance", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â§", website: "" },
      { name: "Security Systems", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ¢â‚¬â„¢", website: "" },
      { name: "Automation", favicon: "ÃƒÂ¢Ã…Â¡Ã¢â€žÂ¢ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
    ]
  },
  {
    name: "AI for Quantum Computing",
    icon: "ÃƒÂ¢Ã…Â¡Ã¢â‚¬ÂºÃƒÂ¯Ã‚Â¸Ã‚Â",
    toolCount: 18,
    subcategories: [
      { name: "Algorithm Design", favicon: "ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Â®", website: "" },
      { name: "Error Correction", favicon: "ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦", website: "" },
      { name: "Quantum Simulation", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â®", website: "" },
      { name: "Hardware Optimization", favicon: "ÃƒÂ¢Ã…Â¡Ã¢â€žÂ¢ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Quantum Cryptography", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â", website: "" },
    ]
  },
  {
    name: "AI for 5G Networks",
    icon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â¡",
    toolCount: 20,
    subcategories: [
      { name: "Network Optimization", favicon: "ÃƒÂ°Ã…Â¸Ã…â€™Ã‚Â", website: "" },
      { name: "Traffic Management", favicon: "ÃƒÂ°Ã…Â¸Ã…Â¡Ã‚Â¦", website: "" },
      { name: "Quality Assurance", favicon: "ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦", website: "" },
      { name: "Security Enhancement", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ¢â‚¬â„¢", website: "" },
      { name: "Service Personalization", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ËœÃ‚Â¤", website: "" },
    ]
  },
  {
    name: "AI for Renewable Energy",
    icon: "ÃƒÂ°Ã…Â¸Ã…â€™Ã‚Â±",
    toolCount: 22,
    subcategories: [
      { name: "Solar Optimization", favicon: "ÃƒÂ¢Ã‹Å“Ã¢â€šÂ¬ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Wind Power", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â¨", website: "" },
      { name: "Energy Storage", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ¢â‚¬Â¹", website: "" },
      { name: "Grid Management", favicon: "ÃƒÂ¢Ã…Â¡Ã‚Â¡", website: "" },
      { name: "Efficiency Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
    ]
  },
  {
    name: "AI for Waste Management",
    icon: "ÃƒÂ¢Ã¢â€žÂ¢Ã‚Â»ÃƒÂ¯Ã‚Â¸Ã‚Â",
    toolCount: 16,
    subcategories: [
      { name: "Sorting Optimization", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â", website: "" },
      { name: "Route Planning", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â€Ã‚ÂºÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Recycling Analysis", favicon: "ÃƒÂ¢Ã¢â€žÂ¢Ã‚Â»ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Waste Prediction", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
      { name: "Environmental Impact", favicon: "ÃƒÂ°Ã…Â¸Ã…â€™Ã‚Â", website: "" },
    ]
  },
  {
    name: "AI for Consulting",
    icon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â¼",
    toolCount: 24,
    subcategories: [
      { name: "Business Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‹â€ ", website: "" },
      { name: "Market Research", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â", website: "" },
      { name: "Strategy Planning", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¯", website: "" },
      { name: "Risk Assessment", favicon: "ÃƒÂ¢Ã…Â¡Ã‚Â ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Client Management", favicon: "👥", website: "" },
    ]
  },
  {
    name: "AI for Government",
    icon: "ÃƒÂ°Ã…Â¸Ã‚ÂÃ¢â‚¬ÂºÃƒÂ¯Ã‚Â¸Ã‚Â",
    toolCount: 31,
    subcategories: [
      { name: "Public Services", favicon: "ÃƒÂ°Ã…Â¸Ã‚ÂÃ‚Â¢", website: "" },
      { name: "Policy Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã¢â‚¬Â¹", website: "" },
      { name: "Citizen Engagement", favicon: "👥", website: "" },
      { name: "Regulatory Compliance", favicon: "ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦", website: "" },
      { name: "Urban Planning", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â€Ã‚ÂºÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
    ]
  },
  {
    name: "AI for Nonprofit",
    icon: "Ã°Å¸Â¤Â",
    toolCount: 22,
    subcategories: [
      { name: "Donor Management", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â°", website: "" },
      { name: "Volunteer Coordination", favicon: "👥", website: "" },
      { name: "Grant Writing", favicon: "✍️", website: "" },
      { name: "Impact Measurement", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
      { name: "Campaign Management", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â¢", website: "" },
    ]
  },
  {
    name: "AI for Startups",
    icon: "ÃƒÂ°Ã…Â¸Ã…Â¡Ã¢â€šÂ¬",
    toolCount: 26,
    subcategories: [
      { name: "Market Validation", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¯", website: "" },
      { name: "Investor Pitching", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â¼", website: "" },
      { name: "Product Development", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂºÃ‚Â ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Growth Hacking", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‹â€ ", website: "" },
      { name: "Team Building", favicon: "👥", website: "" },
    ]
  },
  {
    name: "AI for Small Business",
    icon: "ÃƒÂ°Ã…Â¸Ã‚ÂÃ‚Â¢",
    toolCount: 28,
    subcategories: [
      { name: "Customer Management", favicon: "👥", website: "" },
      { name: "Financial Planning", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â°", website: "" },
      { name: "Marketing Automation", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â¢", website: "" },
      { name: "Operations", favicon: "ÃƒÂ¢Ã…Â¡Ã¢â€žÂ¢ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Competitive Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â", website: "" },
    ]
  },
  {
    name: "AI for Freelancers",
    icon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â»",
    toolCount: 20,
    subcategories: [
      { name: "Project Management", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã¢â‚¬Â¹", website: "" },
      { name: "Client Acquisition", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¯", website: "" },
      { name: "Time Tracking", favicon: "ÃƒÂ¢Ã‚ÂÃ‚Â°", website: "" },
      { name: "Portfolio Building", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¨", website: "" },
      { name: "Skill Development", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â¡", website: "" },
    ]
  },
  {
    name: "AI for Creative Industries",
    icon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¨",
    toolCount: 32,
    subcategories: [
      { name: "Content Creation", favicon: "✍️", website: "" },
      { name: "Design Tools", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¨", website: "" },
      { name: "Brand Management", favicon: "ÃƒÂ°Ã…Â¸Ã‚ÂÃ‚Â·ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Creative Analytics", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
      { name: "Collaboration", favicon: "Ã°Å¸Â¤Â", website: "" },
    ]
  },
  {
    name: "AI for Publishing",
    icon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã¢â‚¬â€œ",
    toolCount: 18,
    subcategories: [
      { name: "Content Curation", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã¢â‚¬Â¹", website: "" },
      { name: "Editorial Tools", favicon: "ÃƒÂ¢Ã…â€œÃ‚ÂÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Distribution", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â¤", website: "" },
      { name: "Audience Analytics", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
      { name: "Rights Management", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã¢â‚¬Å¾", website: "" },
    ]
  },
  {
    name: "AI for Events",
    icon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã¢â‚¬Â°",
    toolCount: 21,
    subcategories: [
      { name: "Event Planning", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã¢â‚¬Â¦", website: "" },
      { name: "Attendee Management", favicon: "👥", website: "" },
      { name: "Venue Selection", favicon: "ÃƒÂ°Ã…Â¸Ã‚ÂÃ‚Â¢", website: "" },
      { name: "Marketing", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â¢", website: "" },
      { name: "Experience Design", favicon: "ÃƒÂ¢Ã…â€œÃ‚Â¨", website: "" },
    ]
  },
  {
    name: "AI for Real Estate Development",
    icon: "ÃƒÂ°Ã…Â¸Ã‚ÂÃ¢â‚¬â€ÃƒÂ¯Ã‚Â¸Ã‚Â",
    toolCount: 25,
    subcategories: [
      { name: "Site Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â", website: "" },
      { name: "Feasibility Studies", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
      { name: "Design Optimization", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¨", website: "" },
      { name: "Construction Management", favicon: "ÃƒÂ°Ã…Â¸Ã‚ÂÃ¢â‚¬â€ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Market Timing", favicon: "ÃƒÂ¢Ã‚ÂÃ‚Â°", website: "" },
    ]
  },
  {
    name: "AI for Insurance Brokers",
    icon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂºÃ‚Â¡ÃƒÂ¯Ã‚Â¸Ã‚Â",
    toolCount: 19,
    subcategories: [
      { name: "Policy Comparison", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã¢â‚¬Â¹", website: "" },
      { name: "Risk Assessment", favicon: "ÃƒÂ¢Ã…Â¡Ã‚Â ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Client Matching", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¯", website: "" },
      { name: "Claims Support", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â¾", website: "" },
      { name: "Compliance", favicon: "ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦", website: "" },
    ]
  },
  {
    name: "AI for Investment Banking",
    icon: "ÃƒÂ°Ã…Â¸Ã‚ÂÃ‚Â¦",
    toolCount: 23,
    subcategories: [
      { name: "Deal Sourcing", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â", website: "" },
      { name: "Due Diligence", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â¬", website: "" },
      { name: "Valuation Models", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â°", website: "" },
      { name: "Market Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
      { name: "Risk Management", favicon: "ÃƒÂ¢Ã…Â¡Ã‚Â ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
    ]
  },
  {
    name: "AI for Venture Capital",
    icon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â°",
    toolCount: 20,
    subcategories: [
      { name: "Deal Flow", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‹â€ ", website: "" },
      { name: "Startup Screening", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â", website: "" },
      { name: "Portfolio Management", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
      { name: "Market Trends", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‹â€ ", website: "" },
      { name: "Exit Strategy", favicon: "ÃƒÂ°Ã…Â¸Ã…Â¡Ã‚Âª", website: "" },
    ]
  },
  {
    name: "AI for Private Equity",
    icon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â¼",
    toolCount: 17,
    subcategories: [
      { name: "Target Identification", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¯", website: "" },
      { name: "Due Diligence", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â¬", website: "" },
      { name: "Value Creation", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â°", website: "" },
      { name: "Portfolio Optimization", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
      { name: "Exit Planning", favicon: "ÃƒÂ°Ã…Â¸Ã…Â¡Ã‚Âª", website: "" },
    ]
  },
  {
    name: "AI for Hedge Funds",
    icon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‹â€ ",
    toolCount: 22,
    subcategories: [
      { name: "Algorithmic Trading", favicon: "ÃƒÂ°Ã…Â¸Ã‚Â¤Ã¢â‚¬â€œ", website: "" },
      { name: "Risk Analytics", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
      { name: "Market Prediction", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â®", website: "" },
      { name: "Portfolio Optimization", favicon: "⚖️", website: "" },
      { name: "Compliance", favicon: "ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦", website: "" },
    ]
  },
  {
    name: "AI for Wealth Management",
    icon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã…Â½",
    toolCount: 24,
    subcategories: [
      { name: "Portfolio Management", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
      { name: "Risk Assessment", favicon: "ÃƒÂ¢Ã…Â¡Ã‚Â ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Tax Planning", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã¢â‚¬Â¹", website: "" },
      { name: "Estate Planning", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…â€œ", website: "" },
      { name: "Client Advisory", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â¬", website: "" },
    ]
  },
  {
    name: "AI for Accounting Firms",
    icon: "ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Â®",
    toolCount: 21,
    subcategories: [
      { name: "Audit Automation", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â", website: "" },
      { name: "Tax Preparation", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã¢â‚¬Â¹", website: "" },
      { name: "Bookkeeping", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã¢â‚¬â€œ", website: "" },
      { name: "Compliance", favicon: "ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦", website: "" },
      { name: "Client Advisory", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â¼", website: "" },
    ]
  },
  {
    name: "AI for Law Firms",
    icon: "⚖️",
    toolCount: 26,
    subcategories: [
      { name: "Case Management", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â", website: "" },
      { name: "Legal Research", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â¡", website: "" },
      { name: "Document Review", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã¢â‚¬Å¾", website: "" },
      { name: "Client Management", favicon: "👥", website: "" },
      { name: "Billing Automation", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â°", website: "" },
    ]
  },
  {
    name: "AI for Consulting Firms",
    icon: "💼",
    toolCount: 23,
    subcategories: [
      { name: "Client Analytics", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
      { name: "Solution Design", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¨", website: "" },
      { name: "Market Intelligence", favicon: "ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Â ", website: "" },
      { name: "Delivery Optimization", favicon: "ÃƒÂ¢Ã…Â¡Ã¢â€žÂ¢ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Knowledge Management", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â¡", website: "" },
    ]
  },
  {
    name: "AI for Manufacturing",
    icon: "🏭",
    toolCount: 35,
    subcategories: [
      { name: "Quality Control", favicon: "ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦", website: "" },
      { name: "Predictive Maintenance", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â§", website: "" },
      { name: "Supply Chain", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â¦", website: "" },
      { name: "Production Planning", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã¢â‚¬Â¹", website: "" },
      { name: "Safety Monitoring", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂºÃ‚Â¡ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
    ]
  },
  {
    name: "AI for Logistics",
    icon: "🚚",
    toolCount: 28,
    subcategories: [
      { name: "Route Optimization", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â€Ã‚ÂºÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Fleet Management", favicon: "ÃƒÂ°Ã…Â¸Ã…Â¡Ã¢â‚¬Âº", website: "" },
      { name: "Warehouse Automation", favicon: "ÃƒÂ°Ã…Â¸Ã‚ÂÃ‚Â¢", website: "" },
      { name: "Demand Forecasting", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
      { name: "Last Mile Delivery", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â", website: "" },
    ]
  },
  {
    name: "AI for Agriculture",
    icon: "🌾",
    toolCount: 24,
    subcategories: [
      { name: "Crop Monitoring", favicon: "ÃƒÂ°Ã…Â¸Ã…â€™Ã‚Â±", website: "" },
      { name: "Soil Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Âª", website: "" },
      { name: "Weather Prediction", favicon: "ÃƒÂ°Ã…Â¸Ã…â€™Ã‚Â¤ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Pest Detection", favicon: "ÃƒÂ°Ã…Â¸Ã‚ÂÃ¢â‚¬Âº", website: "" },
      { name: "Yield Optimization", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‹â€ ", website: "" },
    ]
  },
  {
    name: "AI for Mining",
    icon: "ÃƒÂ¢Ã¢â‚¬ÂºÃ‚ÂÃƒÂ¯Ã‚Â¸Ã‚Â",
    toolCount: 19,
    subcategories: [
      { name: "Mineral Exploration", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â", website: "" },
      { name: "Safety Monitoring", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂºÃ‚Â¡ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Equipment Maintenance", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â§", website: "" },
      { name: "Resource Estimation", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
      { name: "Environmental Impact", favicon: "ÃƒÂ°Ã…Â¸Ã…â€™Ã‚Â", website: "" },
    ]
  },
  {
    name: "AI for Forestry",
    icon: "ÃƒÂ°Ã…Â¸Ã…â€™Ã‚Â²",
    toolCount: 17,
    subcategories: [
      { name: "Tree Health Monitoring", favicon: "ÃƒÂ°Ã…Â¸Ã…â€™Ã‚Â³", website: "" },
      { name: "Fire Detection", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â¥", website: "" },
      { name: "Timber Management", favicon: "ÃƒÂ°Ã…Â¸Ã‚ÂªÃ‚Âµ", website: "" },
      { name: "Carbon Tracking", favicon: "ÃƒÂ°Ã…Â¸Ã…â€™Ã‚Â±", website: "" },
      { name: "Wildlife Protection", favicon: "ÃƒÂ°Ã…Â¸Ã‚Â¦Ã…â€™", website: "" },
    ]
  },
  {
    name: "AI for Fishing",
    icon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â£",
    toolCount: 15,
    subcategories: [
      { name: "Fish Detection", favicon: "ÃƒÂ°Ã…Â¸Ã‚ÂÃ…Â¸", website: "" },
      { name: "Ocean Monitoring", favicon: "ÃƒÂ°Ã…Â¸Ã…â€™Ã…Â ", website: "" },
      { name: "Sustainable Harvesting", favicon: "ÃƒÂ¢Ã¢â€žÂ¢Ã‚Â»ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Weather Forecasting", favicon: "ÃƒÂ°Ã…Â¸Ã…â€™Ã‚Â¤ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Fleet Management", favicon: "ÃƒÂ¢Ã…Â¡Ã¢â‚¬Å“", website: "" },
    ]
  },
  {
    name: "AI for Water Management",
    icon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â§",
    toolCount: 22,
    subcategories: [
      { name: "Quality Monitoring", favicon: "ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Âª", website: "" },
      { name: "Leak Detection", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â§", website: "" },
      { name: "Usage Optimization", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â°", website: "" },
      { name: "Flood Prediction", favicon: "ÃƒÂ°Ã…Â¸Ã…â€™Ã…Â ", website: "" },
      { name: "Infrastructure Planning", favicon: "ÃƒÂ°Ã…Â¸Ã‚ÂÃ¢â‚¬â€ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
    ]
  },
  {
    name: "AI for Air Quality",
    icon: "ÃƒÂ°Ã…Â¸Ã…â€™Ã‚Â¬ÃƒÂ¯Ã‚Â¸Ã‚Â",
    toolCount: 18,
    subcategories: [
      { name: "Pollution Monitoring", favicon: "🏭", website: "" },
      { name: "Air Quality Prediction", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
      { name: "Emission Tracking", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‹â€ ", website: "" },
      { name: "Health Impact Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã‚ÂÃ‚Â¥", website: "" },
      { name: "Regulatory Compliance", favicon: "ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦", website: "" },
    ]
  },
  {
    name: "AI for Noise Pollution",
    icon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ…Â ",
    toolCount: 14,
    subcategories: [
      { name: "Noise Mapping", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â€Ã‚ÂºÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Source Identification", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¯", website: "" },
      { name: "Impact Assessment", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
      { name: "Mitigation Planning", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂºÃ‚Â ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Compliance Monitoring", favicon: "ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦", website: "" },
    ]
  },
  {
    name: "AI for Wildlife Conservation",
    icon: "ÃƒÂ°Ã…Â¸Ã‚Â¦Ã‚Â",
    toolCount: 26,
    subcategories: [
      { name: "Animal Tracking", favicon: "ÃƒÂ°Ã…Â¸Ã‚ÂÃ‚Â¾", website: "" },
      { name: "Habitat Monitoring", favicon: "ÃƒÂ°Ã…Â¸Ã…â€™Ã‚Â", website: "" },
      { name: "Poaching Detection", favicon: "ÃƒÂ°Ã…Â¸Ã…Â¡Ã‚Â¨", website: "" },
      { name: "Population Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
      { name: "Conservation Planning", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â€Ã‚ÂºÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
    ]
  },
  {
    name: "AI for Marine Biology",
    icon: "ÃƒÂ°Ã…Â¸Ã‚ÂÃ¢â‚¬Â¹",
    toolCount: 21,
    subcategories: [
      { name: "Species Identification", favicon: "ÃƒÂ°Ã…Â¸Ã‚ÂÃ‚Â ", website: "" },
      { name: "Coral Reef Monitoring", favicon: "ÃƒÂ°Ã…Â¸Ã‚ÂªÃ‚Â¸", website: "" },
      { name: "Ocean Health", favicon: "ÃƒÂ°Ã…Â¸Ã…â€™Ã…Â ", website: "" },
      { name: "Migration Tracking", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â€Ã‚ÂºÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Climate Impact", favicon: "ÃƒÂ°Ã…Â¸Ã…â€™Ã‚Â¡ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
    ]
  },
  {
    name: "AI for Entomology",
    icon: "ÃƒÂ°Ã…Â¸Ã‚ÂÃ¢â‚¬Âº",
    toolCount: 16,
    subcategories: [
      { name: "Species Classification", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â", website: "" },
      { name: "Pest Management", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂºÃ‚Â¡ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Population Studies", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
      { name: "Behavior Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Â ", website: "" },
      { name: "Conservation Efforts", favicon: "ÃƒÂ°Ã…Â¸Ã…â€™Ã‚Â±", website: "" },
    ]
  },
  {
    name: "AI for Botany",
    icon: "ÃƒÂ°Ã…Â¸Ã…â€™Ã‚Â¿",
    toolCount: 19,
    subcategories: [
      { name: "Plant Identification", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â", website: "" },
      { name: "Disease Detection", favicon: "ÃƒÂ°Ã…Â¸Ã‚Â¦Ã‚Â ", website: "" },
      { name: "Growth Monitoring", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‹â€ ", website: "" },
      { name: "Genetic Research", favicon: "ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Â¬", website: "" },
      { name: "Conservation", favicon: "ÃƒÂ°Ã…Â¸Ã…â€™Ã‚Â±", website: "" },
    ]
  },
  {
    name: "AI for Mycology",
    icon: "ÃƒÂ°Ã…Â¸Ã‚ÂÃ¢â‚¬Å¾",
    toolCount: 13,
    subcategories: [
      { name: "Mushroom Identification", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â", website: "" },
      { name: "Spore Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Âª", website: "" },
      { name: "Growth Conditions", favicon: "ÃƒÂ°Ã…Â¸Ã…â€™Ã‚Â±", website: "" },
      { name: "Medicinal Research", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã…Â ", website: "" },
      { name: "Ecological Impact", favicon: "ÃƒÂ°Ã…Â¸Ã…â€™Ã‚Â", website: "" },
    ]
  },
  {
    name: "AI for Paleontology",
    icon: "ÃƒÂ°Ã…Â¸Ã‚Â¦Ã¢â‚¬Â¢",
    toolCount: 15,
    subcategories: [
      { name: "Fossil Recognition", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â", website: "" },
      { name: "Reconstruction", favicon: "ÃƒÂ°Ã…Â¸Ã‚Â¦Ã‚Â´", website: "" },
      { name: "Dating Analysis", favicon: "ÃƒÂ¢Ã‚ÂÃ‚Â°", website: "" },
      { name: "Habitat Modeling", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â€Ã‚ÂºÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Evolution Studies", favicon: "ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Â¬", website: "" },
    ]
  },
  {
    name: "AI for Archaeology",
    icon: "ÃƒÂ°Ã…Â¸Ã‚ÂÃ‚Âº",
    toolCount: 20,
    subcategories: [
      { name: "Site Detection", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â€Ã‚ÂºÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Artifact Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã‚ÂÃ‚Âº", website: "" },
      { name: "Dating Methods", favicon: "ÃƒÂ¢Ã‚ÂÃ‚Â°", website: "" },
      { name: "Reconstruction", favicon: "ÃƒÂ°Ã…Â¸Ã‚ÂÃ¢â‚¬ÂºÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Cultural Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â¡", website: "" },
    ]
  },
  {
    name: "AI for Anthropology",
    icon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ËœÃ‚Â¤",
    toolCount: 18,
    subcategories: [
      { name: "Cultural Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã…â€™Ã‚Â", website: "" },
      { name: "Linguistic Studies", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â€Ã‚Â£ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Social Patterns", favicon: "👥", website: "" },
      { name: "Evolutionary Research", favicon: "ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Â¬", website: "" },
      { name: "Ethnographic Studies", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã¢â‚¬â€œ", website: "" },
    ]
  },
  {
    name: "AI for Sociology",
    icon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ËœÃ‚Â¥",
    toolCount: 23,
    subcategories: [
      { name: "Social Network Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Â¢Ã‚Â¸ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Demographic Studies", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
      { name: "Behavioral Patterns", favicon: "ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Â ", website: "" },
      { name: "Cultural Trends", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‹â€ ", website: "" },
      { name: "Policy Impact", favicon: "ÃƒÂ°Ã…Â¸Ã‚ÂÃ¢â‚¬ÂºÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
    ]
  },
  {
    name: "AI for Political Science",
    icon: "ÃƒÂ°Ã…Â¸Ã‚ÂÃ¢â‚¬ÂºÃƒÂ¯Ã‚Â¸Ã‚Â",
    toolCount: 25,
    subcategories: [
      { name: "Election Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â€Ã‚Â³ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Policy Modeling", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã¢â‚¬Â¹", website: "" },
      { name: "Public Opinion", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â€Ã‚Â£ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "International Relations", favicon: "ÃƒÂ°Ã…Â¸Ã…â€™Ã‚Â", website: "" },
      { name: "Governance Studies", favicon: "⚖️", website: "" },
    ]
  },
  {
    name: "AI for Economics",
    icon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â°",
    toolCount: 30,
    subcategories: [
      { name: "Market Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
      { name: "Economic Forecasting", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â®", website: "" },
      { name: "Policy Impact", favicon: "ÃƒÂ°Ã…Â¸Ã‚ÂÃ¢â‚¬ÂºÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Risk Assessment", favicon: "ÃƒÂ¢Ã…Â¡Ã‚Â ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Trade Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã…â€™Ã‚Â", website: "" },
    ]
  },
  {
    name: "AI for Statistics",
    icon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ",
    toolCount: 22,
    subcategories: [
      { name: "Data Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‹â€ ", website: "" },
      { name: "Hypothesis Testing", favicon: "ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Âª", website: "" },
      { name: "Regression Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã¢â‚¬Â°", website: "" },
      { name: "Bayesian Methods", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¯", website: "" },
      { name: "Time Series", favicon: "ÃƒÂ¢Ã‚ÂÃ‚Â°", website: "" },
    ]
  },
  {
    name: "AI for Actuarial Science",
    icon: "ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Â®",
    toolCount: 17,
    subcategories: [
      { name: "Risk Assessment", favicon: "ÃƒÂ¢Ã…Â¡Ã‚Â ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Life Expectancy", favicon: "ÃƒÂ¢Ã‚ÂÃ‚Â°", website: "" },
      { name: "Premium Calculation", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â°", website: "" },
      { name: "Claims Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
      { name: "Financial Modeling", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‹â€ ", website: "" },
    ]
  },
  {
    name: "AI for Operations Research",
    icon: "ÃƒÂ¢Ã…Â¡Ã¢â€žÂ¢ÃƒÂ¯Ã‚Â¸Ã‚Â",
    toolCount: 19,
    subcategories: [
      { name: "Optimization", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¯", website: "" },
      { name: "Simulation", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ¢â‚¬Å¾", website: "" },
      { name: "Network Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Â¢Ã‚Â¸ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Queue Theory", favicon: "ÃƒÂ¢Ã‚ÂÃ‚Â³", website: "" },
      { name: "Decision Analysis", favicon: "⚖️", website: "" },
    ]
  },
  {
    name: "AI for Quality Management",
    icon: "ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦",
    toolCount: 21,
    subcategories: [
      { name: "Process Control", favicon: "ÃƒÂ¢Ã…Â¡Ã¢â€žÂ¢ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Defect Detection", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â", website: "" },
      { name: "Quality Metrics", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
      { name: "Improvement Planning", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‹â€ ", website: "" },
      { name: "Compliance", favicon: "ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦", website: "" },
    ]
  },
  {
    name: "AI for Project Management",
    icon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã¢â‚¬Â¹",
    toolCount: 27,
    subcategories: [
      { name: "Task Scheduling", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã¢â‚¬Â¦", website: "" },
      { name: "Resource Allocation", favicon: "👥", website: "" },
      { name: "Risk Management", favicon: "ÃƒÂ¢Ã…Â¡Ã‚Â ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Progress Tracking", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
      { name: "Team Collaboration", favicon: "Ã°Å¸Â¤Â", website: "" },
    ]
  },
  {
    name: "AI for Change Management",
    icon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ¢â‚¬Å¾",
    toolCount: 16,
    subcategories: [
      { name: "Impact Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
      { name: "Resistance Prediction", favicon: "ÃƒÂ°Ã…Â¸Ã…Â¡Ã‚Â«", website: "" },
      { name: "Communication Planning", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â¢", website: "" },
      { name: "Training Management", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â¡", website: "" },
      { name: "Success Metrics", favicon: "ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦", website: "" },
    ]
  },
  {
    name: "AI for Knowledge Management",
    icon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â¡",
    toolCount: 24,
    subcategories: [
      { name: "Content Organization", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â€Ã¢â‚¬Å¡ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Information Retrieval", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â", website: "" },
      { name: "Expert Systems", favicon: "ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Â ", website: "" },
      { name: "Document Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã¢â‚¬Å¾", website: "" },
      { name: "Collaboration Tools", favicon: "Ã°Å¸Â¤Â", website: "" },
    ]
  },
  {
    name: "AI for Innovation Management",
    icon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â¡",
    toolCount: 20,
    subcategories: [
      { name: "Idea Generation", favicon: "ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Â ", website: "" },
      { name: "Trend Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‹â€ ", website: "" },
      { name: "Patent Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…â€œ", website: "" },
      { name: "Market Validation", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¯", website: "" },
      { name: "Innovation Metrics", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
    ]
  },
  {
    name: "AI for Customer Service",
    icon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â§",
    toolCount: 29,
    subcategories: [
      { name: "Chatbots", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â¬", website: "" },
      { name: "Ticket Management", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â«", website: "" },
      { name: "Sentiment Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã‹Å“Ã…Â ", website: "" },
      { name: "Quality Assurance", favicon: "ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦", website: "" },
      { name: "Customer Analytics", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
    ]
  },
  {
    name: "AI for Technical Support",
    icon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â§",
    toolCount: 23,
    subcategories: [
      { name: "Issue Diagnosis", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â", website: "" },
      { name: "Solution Recommendation", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â¡", website: "" },
      { name: "Knowledge Base", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â¡", website: "" },
      { name: "Remote Assistance", favicon: "ÃƒÂ°Ã…Â¸Ã…â€™Ã‚Â", website: "" },
      { name: "Performance Monitoring", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
    ]
  },
  {
    name: "AI for Field Service",
    icon: "ÃƒÂ°Ã…Â¸Ã…Â¡Ã‚Â",
    toolCount: 19,
    subcategories: [
      { name: "Route Optimization", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â€Ã‚ÂºÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Inventory Management", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â¦", website: "" },
      { name: "Remote Diagnostics", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â§", website: "" },
      { name: "Scheduling", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã¢â‚¬Â¦", website: "" },
      { name: "Customer Communication", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â±", website: "" },
    ]
  },
  {
    name: "AI for Help Desk",
    icon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â",
    toolCount: 17,
    subcategories: [
      { name: "Ticket Routing", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â«", website: "" },
      { name: "Response Generation", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â¬", website: "" },
      { name: "Knowledge Management", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â¡", website: "" },
      { name: "Performance Analytics", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
      { name: "User Satisfaction", favicon: "ÃƒÂ°Ã…Â¸Ã‹Å“Ã…Â ", website: "" },
    ]
  },
  {
    name: "AI for Call Centers",
    icon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â¾",
    toolCount: 25,
    subcategories: [
      { name: "Call Routing", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ¢â‚¬Å¾", website: "" },
      { name: "Speech Analytics", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¤", website: "" },
      { name: "Agent Assistance", favicon: "👥", website: "" },
      { name: "Quality Monitoring", favicon: "ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦", website: "" },
      { name: "Workforce Management", favicon: "👥", website: "" },
    ]
  },
  {
    name: "AI for Sales",
    icon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â¼",
    toolCount: 31,
    subcategories: [
      { name: "Lead Generation", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¯", website: "" },
      { name: "Sales Forecasting", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
      { name: "Customer Scoring", favicon: "ÃƒÂ¢Ã‚Â­Ã‚Â", website: "" },
      { name: "Deal Management", favicon: "Ã°Å¸Â¤Â", website: "" },
      { name: "Performance Analytics", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‹â€ ", website: "" },
    ]
  },
  {
    name: "AI for Marketing Automation",
    icon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â¢",
    toolCount: 28,
    subcategories: [
      { name: "Email Campaigns", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â§", website: "" },
      { name: "Social Media", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â±", website: "" },
      { name: "Lead Nurturing", favicon: "ÃƒÂ°Ã…Â¸Ã…â€™Ã‚Â±", website: "" },
      { name: "Content Personalization", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¯", website: "" },
      { name: "ROI Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â°", website: "" },
    ]
  },
  {
    name: "AI for Brand Management",
    icon: "ÃƒÂ°Ã…Â¸Ã‚ÂÃ‚Â·ÃƒÂ¯Ã‚Â¸Ã‚Â",
    toolCount: 22,
    subcategories: [
      { name: "Brand Monitoring", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ËœÃ‚ÂÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Reputation Analysis", favicon: "ÃƒÂ¢Ã‚Â­Ã‚Â", website: "" },
      { name: "Competitive Intelligence", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â", website: "" },
      { name: "Brand Guidelines", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã¢â‚¬Â¹", website: "" },
      { name: "Market Positioning", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¯", website: "" },
    ]
  },
  {
    name: "AI for Public Relations",
    icon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â°",
    toolCount: 20,
    subcategories: [
      { name: "Media Monitoring", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Âº", website: "" },
      { name: "Press Release Writing", favicon: "✍️", website: "" },
      { name: "Crisis Management", favicon: "ÃƒÂ°Ã…Â¸Ã…Â¡Ã‚Â¨", website: "" },
      { name: "Influencer Relations", favicon: "ÃƒÂ°Ã…Â¸Ã…â€™Ã…Â¸", website: "" },
      { name: "Campaign Analytics", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
    ]
  },
  {
    name: "AI for Product Management",
    icon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â¦",
    toolCount: 26,
    subcategories: [
      { name: "Market Research", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â", website: "" },
      { name: "Feature Prioritization", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¯", website: "" },
      { name: "User Feedback Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â¬", website: "" },
      { name: "Roadmap Planning", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â€Ã‚ÂºÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Performance Tracking", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
    ]
  },
  {
    name: "AI for Product Development",
    icon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂºÃ‚Â ÃƒÂ¯Ã‚Â¸Ã‚Â",
    toolCount: 24,
    subcategories: [
      { name: "Design Optimization", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¨", website: "" },
      { name: "Prototyping", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â§", website: "" },
      { name: "Testing Automation", favicon: "ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Âª", website: "" },
      { name: "Quality Assurance", favicon: "ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦", website: "" },
      { name: "Launch Planning", favicon: "ÃƒÂ°Ã…Â¸Ã…Â¡Ã¢â€šÂ¬", website: "" },
    ]
  },
  {
    name: "AI for Research & Development",
    icon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â¬",
    toolCount: 29,
    subcategories: [
      { name: "Literature Review", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â¡", website: "" },
      { name: "Hypothesis Generation", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â¡", website: "" },
      { name: "Experimental Design", favicon: "ÃƒÂ¢Ã…Â¡Ã¢â‚¬â€ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Data Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
      { name: "Patent Research", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…â€œ", website: "" },
    ]
  },
  {
    name: "AI for Business Intelligence",
    icon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ",
    toolCount: 32,
    subcategories: [
      { name: "Data Visualization", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‹â€ ", website: "" },
      { name: "Dashboard Creation", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã¢â‚¬Â¹", website: "" },
      { name: "Reporting Automation", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã¢â‚¬Å¾", website: "" },
      { name: "Trend Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
      { name: "Decision Support", favicon: "⚖️", website: "" },
    ]
  },
  {
    name: "AI for Corporate Strategy",
    icon: "💼",
    toolCount: 21,
    subcategories: [
      { name: "Market Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
      { name: "Competitive Intelligence", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â", website: "" },
      { name: "Strategic Planning", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â€Ã‚ÂºÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Risk Assessment", favicon: "ÃƒÂ¢Ã…Â¡Ã‚Â ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Performance Metrics", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‹â€ ", website: "" },
    ]
  },
  {
    name: "AI for Mergers & Acquisitions",
    icon: "Ã°Å¸Â¤Â",
    toolCount: 18,
    subcategories: [
      { name: "Target Screening", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¯", website: "" },
      { name: "Due Diligence", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â¬", website: "" },
      { name: "Valuation Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â°", website: "" },
      { name: "Integration Planning", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â§", website: "" },
      { name: "Synergy Analysis", favicon: "ÃƒÂ¢Ã…Â¡Ã‚Â¡", website: "" },
    ]
  },
  {
    name: "AI for Compliance Management",
    icon: "ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦",
    toolCount: 23,
    subcategories: [
      { name: "Regulatory Monitoring", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã¢â‚¬Â¹", website: "" },
      { name: "Risk Assessment", favicon: "ÃƒÂ¢Ã…Â¡Ã‚Â ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Audit Automation", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â", website: "" },
      { name: "Policy Management", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…â€œ", website: "" },
      { name: "Reporting", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
    ]
  },
  {
    name: "AI for Internal Audit",
    icon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â",
    toolCount: 19,
    subcategories: [
      { name: "Risk Assessment", favicon: "ÃƒÂ¢Ã…Â¡Ã‚Â ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Control Testing", favicon: "ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Âª", website: "" },
      { name: "Fraud Detection", favicon: "ÃƒÂ°Ã…Â¸Ã…Â¡Ã‚Â¨", website: "" },
      { name: "Process Review", favicon: "ÃƒÂ¢Ã…Â¡Ã¢â€žÂ¢ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Audit Reporting", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã¢â‚¬Â¹", website: "" },
    ]
  },
  {
    name: "AI for Corporate Governance",
    icon: "ÃƒÂ°Ã…Â¸Ã‚ÂÃ¢â‚¬ÂºÃƒÂ¯Ã‚Â¸Ã‚Â",
    toolCount: 16,
    subcategories: [
      { name: "Board Management", favicon: "👥", website: "" },
      { name: "Compliance Monitoring", favicon: "ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦", website: "" },
      { name: "Risk Oversight", favicon: "ÃƒÂ¢Ã…Â¡Ã‚Â ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Stakeholder Relations", favicon: "Ã°Å¸Â¤Â", website: "" },
      { name: "Ethics Management", favicon: "⚖️", website: "" },
    ]
  },
  {
    name: "AI for Enterprise Architecture",
    icon: "ÃƒÂ°Ã…Â¸Ã‚ÂÃ‚Â¢",
    toolCount: 20,
    subcategories: [
      { name: "System Design", favicon: "ÃƒÂ°Ã…Â¸Ã‚ÂÃ¢â‚¬â€ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Technology Planning", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â»", website: "" },
      { name: "Integration Management", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ¢â‚¬â€", website: "" },
      { name: "Legacy Modernization", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ¢â‚¬Å¾", website: "" },
      { name: "Architecture Governance", favicon: "⚖️", website: "" },
    ]
  },
  {
    name: "AI for IT Service Management",
    icon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â»",
    toolCount: 25,
    subcategories: [
      { name: "Incident Management", favicon: "ÃƒÂ°Ã…Â¸Ã…Â¡Ã‚Â¨", website: "" },
      { name: "Change Management", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ¢â‚¬Å¾", website: "" },
      { name: "Service Catalog", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã¢â‚¬Â¹", website: "" },
      { name: "Performance Monitoring", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
      { name: "Asset Management", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â¦", website: "" },
    ]
  },
  {
    name: "AI for Cloud Computing",
    icon: "ÃƒÂ¢Ã‹Å“Ã‚ÂÃƒÂ¯Ã‚Â¸Ã‚Â",
    toolCount: 33,
    subcategories: [
      { name: "Resource Optimization", favicon: "ÃƒÂ¢Ã…Â¡Ã‚Â¡", website: "" },
      { name: "Cost Management", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â°", website: "" },
      { name: "Security", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ¢â‚¬â„¢", website: "" },
      { name: "Migration Planning", favicon: "ÃƒÂ°Ã…Â¸Ã…Â¡Ã¢â€šÂ¬", website: "" },
      { name: "Performance Monitoring", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
    ]
  },
  {
    name: "AI for DevOps",
    icon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ¢â‚¬Å¾",
    toolCount: 28,
    subcategories: [
      { name: "CI/CD Pipeline", favicon: "ÃƒÂ°Ã…Â¸Ã…Â¡Ã¢â€šÂ¬", website: "" },
      { name: "Infrastructure as Code", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â", website: "" },
      { name: "Monitoring", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ËœÃ‚ÂÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Automated Testing", favicon: "ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Âª", website: "" },
      { name: "Release Management", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â¦", website: "" },
    ]
  },
  {
    name: "AI for Site Reliability",
    icon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂºÃ‚Â¡ÃƒÂ¯Ã‚Â¸Ã‚Â",
    toolCount: 22,
    subcategories: [
      { name: "Uptime Monitoring", favicon: "ÃƒÂ¢Ã‚ÂÃ‚Â°", website: "" },
      { name: "Incident Response", favicon: "ÃƒÂ°Ã…Â¸Ã…Â¡Ã‚Â¨", website: "" },
      { name: "Capacity Planning", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
      { name: "Error Tracking", favicon: "ÃƒÂ°Ã…Â¸Ã‚ÂÃ¢â‚¬Âº", website: "" },
      { name: "Performance Optimization", favicon: "ÃƒÂ¢Ã…Â¡Ã‚Â¡", website: "" },
    ]
  },
  {
    name: "AI for Network Management",
    icon: "ÃƒÂ°Ã…Â¸Ã…â€™Ã‚Â",
    toolCount: 24,
    subcategories: [
      { name: "Network Monitoring", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ËœÃ‚ÂÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Traffic Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
      { name: "Security", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ¢â‚¬â„¢", website: "" },
      { name: "Optimization", favicon: "ÃƒÂ¢Ã…Â¡Ã‚Â¡", website: "" },
      { name: "Troubleshooting", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â§", website: "" },
    ]
  },
  {
    name: "AI for Database Management",
    icon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â€Ã¢â‚¬Å¾ÃƒÂ¯Ã‚Â¸Ã‚Â",
    toolCount: 21,
    subcategories: [
      { name: "Query Optimization", favicon: "ÃƒÂ¢Ã…Â¡Ã‚Â¡", website: "" },
      { name: "Performance Tuning", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã¢â‚¬ÂºÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Backup & Recovery", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â¾", website: "" },
      { name: "Security Management", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ¢â‚¬â„¢", website: "" },
      { name: "Capacity Planning", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
    ]
  },
  {
    name: "AI for API Management",
    icon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ…â€™",
    toolCount: 18,
    subcategories: [
      { name: "API Design", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¨", website: "" },
      { name: "Documentation", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â¡", website: "" },
      { name: "Security", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ¢â‚¬â„¢", website: "" },
      { name: "Rate Limiting", favicon: "ÃƒÂ¢Ã‚ÂÃ‚Â±ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Analytics", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
    ]
  },
  {
    name: "AI for Mobile Development",
    icon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â±",
    toolCount: 27,
    subcategories: [
      { name: "UI/UX Design", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¨", website: "" },
      { name: "Performance Optimization", favicon: "ÃƒÂ¢Ã…Â¡Ã‚Â¡", website: "" },
      { name: "Testing", favicon: "ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Âª", website: "" },
      { name: "App Store Optimization", favicon: "ÃƒÂ°Ã…Â¸Ã‚ÂÃ‚Âª", website: "" },
      { name: "User Analytics", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
    ]
  },
  {
    name: "AI for Web Development",
    icon: "ÃƒÂ°Ã…Â¸Ã…â€™Ã‚Â",
    toolCount: 30,
    subcategories: [
      { name: "Frontend Optimization", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¨", website: "" },
      { name: "Backend Performance", favicon: "ÃƒÂ¢Ã…Â¡Ã¢â€žÂ¢ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "SEO Enhancement", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â", website: "" },
      { name: "User Experience", favicon: "ÃƒÂ°Ã…Â¸Ã‹Å“Ã…Â ", website: "" },
      { name: "Accessibility", favicon: "ÃƒÂ¢Ã¢â€žÂ¢Ã‚Â¿", website: "" },
    ]
  },
  {
    name: "AI for Game Development",
    icon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â®",
    toolCount: 25,
    subcategories: [
      { name: "Character AI", favicon: "ÃƒÂ°Ã…Â¸Ã‚Â¤Ã¢â‚¬â€œ", website: "" },
      { name: "World Building", favicon: "ÃƒÂ°Ã…Â¸Ã…â€™Ã‚Â", website: "" },
      { name: "Physics Simulation", favicon: "ÃƒÂ¢Ã…Â¡Ã¢â‚¬ÂºÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Player Analytics", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
      { name: "Content Generation", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¨", website: "" },
    ]
  },
  {
    name: "AI for Virtual Production",
    icon: "🎬",
    toolCount: 19,
    subcategories: [
      { name: "Scene Generation", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¨", website: "" },
      { name: "Motion Capture", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â­", website: "" },
      { name: "Visual Effects", favicon: "ÃƒÂ¢Ã…â€œÃ‚Â¨", website: "" },
      { name: "Camera Tracking", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â¹", website: "" },
      { name: "Real-time Rendering", favicon: "ÃƒÂ¢Ã…Â¡Ã‚Â¡", website: "" },
    ]
  },
  {
    name: "AI for Audio Production",
    icon: "🎵",
    toolCount: 22,
    subcategories: [
      { name: "Music Generation", favicon: "🎵", website: "" },
      { name: "Voice Synthesis", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â€Ã‚Â£ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Sound Effects", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ…Â ", website: "" },
      { name: "Audio Enhancement", favicon: "ÃƒÂ¢Ã…â€œÃ‚Â¨", website: "" },
      { name: "Mastering", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã¢â‚¬ÂºÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
    ]
  },
  {
    name: "AI for Video Production",
    icon: "🎥",
    toolCount: 26,
    subcategories: [
      { name: "Video Editing", favicon: "ÃƒÂ¢Ã…â€œÃ¢â‚¬Å¡ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Color Grading", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¨", website: "" },
      { name: "Motion Graphics", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¬", website: "" },
      { name: "Content Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
      { name: "Streaming Optimization", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â¡", website: "" },
    ]
  },
  {
    name: "AI for Animation",
    icon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¨",
    toolCount: 20,
    subcategories: [
      { name: "Character Animation", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ËœÃ‚Â¤", website: "" },
      { name: "Motion Graphics", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¬", website: "" },
      { name: "3D Modeling", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â®", website: "" },
      { name: "Rigging", favicon: "ÃƒÂ°Ã…Â¸Ã‚Â¦Ã‚Â´", website: "" },
      { name: "Rendering", favicon: "ÃƒÂ¢Ã…Â¡Ã‚Â¡", website: "" },
    ]
  },
  {
    name: "AI for Fashion Design",
    icon: "👗",
    toolCount: 23,
    subcategories: [
      { name: "Pattern Design", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¨", website: "" },
      { name: "Trend Forecasting", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‹â€ ", website: "" },
      { name: "Virtual Try-On", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ËœÃ¢â‚¬Â¢", website: "" },
      { name: "Material Selection", favicon: "ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Âµ", website: "" },
      { name: "Sustainability Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã…â€™Ã‚Â±", website: "" },
    ]
  },
  {
    name: "AI for Interior Design",
    icon: "🏢",
    toolCount: 21,
    subcategories: [
      { name: "Space Planning", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â", website: "" },
      { name: "Color Schemes", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¨", website: "" },
      { name: "Furniture Selection", favicon: "ÃƒÂ°Ã…Â¸Ã‚ÂªÃ¢â‚¬Ëœ", website: "" },
      { name: "Lighting Design", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â¡", website: "" },
      { name: "3D Visualization", favicon: "ÃƒÂ°Ã…Â¸Ã‚ÂÃ¢â‚¬â€ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
    ]
  },
  {
    name: "AI for Industrial Design",
    icon: "🏭",
    toolCount: 18,
    subcategories: [
      { name: "Product Design", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â¦", website: "" },
      { name: "Ergonomics", favicon: "👥", website: "" },
      { name: "Material Science", favicon: "ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Âª", website: "" },
      { name: "Prototyping", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â§", website: "" },
      { name: "Manufacturing", favicon: "ÃƒÂ¢Ã…Â¡Ã¢â€žÂ¢ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
    ]
  },
  {
    name: "AI for Urban Design",
    icon: "ÃƒÂ°Ã…Â¸Ã‚ÂÃ¢â€žÂ¢ÃƒÂ¯Ã‚Â¸Ã‚Â",
    toolCount: 24,
    subcategories: [
      { name: "City Planning", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â€Ã‚ÂºÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Transportation", favicon: "ÃƒÂ°Ã…Â¸Ã…Â¡Ã¢â‚¬Â¡", website: "" },
      { name: "Public Spaces", favicon: "ÃƒÂ°Ã…Â¸Ã…â€™Ã‚Â³", website: "" },
      { name: "Infrastructure", favicon: "ÃƒÂ°Ã…Â¸Ã‚ÂÃ¢â‚¬â€ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Sustainability", favicon: "ÃƒÂ°Ã…Â¸Ã…â€™Ã‚Â±", website: "" },
    ]
  },
  {
    name: "AI for Landscape Architecture",
    icon: "ÃƒÂ°Ã…Â¸Ã…â€™Ã‚Â³",
    toolCount: 17,
    subcategories: [
      { name: "Site Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â", website: "" },
      { name: "Plant Selection", favicon: "ÃƒÂ°Ã…Â¸Ã…â€™Ã‚Â±", website: "" },
      { name: "Water Management", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â§", website: "" },
      { name: "Hardscape Design", favicon: "ÃƒÂ°Ã…Â¸Ã‚ÂªÃ‚Â¨", website: "" },
      { name: "Ecological Planning", favicon: "ÃƒÂ°Ã…Â¸Ã…â€™Ã‚Â", website: "" },
    ]
  },
  {
    name: "AI for Naval Architecture",
    icon: "ÃƒÂ¢Ã…Â¡Ã¢â‚¬Å“",
    toolCount: 15,
    subcategories: [
      { name: "Ship Design", favicon: "ÃƒÂ°Ã…Â¸Ã…Â¡Ã‚Â¢", website: "" },
      { name: "Hydrodynamics", favicon: "ÃƒÂ°Ã…Â¸Ã…â€™Ã…Â ", website: "" },
      { name: "Structural Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã‚ÂÃ¢â‚¬â€ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Stability Testing", favicon: "⚖️", website: "" },
      { name: "Performance Optimization", favicon: "ÃƒÂ¢Ã…Â¡Ã‚Â¡", website: "" },
    ]
  },
  {
    name: "AI for Aerospace Engineering",
    icon: "ÃƒÂ¢Ã…â€œÃ‹â€ ÃƒÂ¯Ã‚Â¸Ã‚Â",
    toolCount: 28,
    subcategories: [
      { name: "Aircraft Design", favicon: "ÃƒÂ¢Ã…â€œÃ‹â€ ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Aerodynamics", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â¨", website: "" },
      { name: "Propulsion Systems", favicon: "ÃƒÂ°Ã…Â¸Ã…Â¡Ã¢â€šÂ¬", website: "" },
      { name: "Flight Simulation", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â®", website: "" },
      { name: "Safety Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂºÃ‚Â¡ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
    ]
  },
  {
    name: "AI for Automotive Engineering",
    icon: "🚗",
    toolCount: 31,
    subcategories: [
      { name: "Vehicle Design", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¨", website: "" },
      { name: "Powertrain", favicon: "ÃƒÂ¢Ã…Â¡Ã¢â€žÂ¢ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Safety Systems", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂºÃ‚Â¡ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Autonomous Driving", favicon: "ÃƒÂ°Ã…Â¸Ã‚Â¤Ã¢â‚¬â€œ", website: "" },
      { name: "Performance Testing", favicon: "ÃƒÂ°Ã…Â¸Ã‚ÂÃ‚Â", website: "" },
    ]
  },
  {
    name: "AI for Mechanical Engineering",
    icon: "⚙️",
    toolCount: 26,
    subcategories: [
      { name: "CAD Design", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â", website: "" },
      { name: "Simulation", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ¢â‚¬Å¾", website: "" },
      { name: "Materials Science", favicon: "ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Âª", website: "" },
      { name: "Manufacturing", favicon: "🏭", website: "" },
      { name: "Quality Control", favicon: "ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦", website: "" },
    ]
  },
  {
    name: "AI for Electrical Engineering",
    icon: "⚡",
    toolCount: 24,
    subcategories: [
      { name: "Circuit Design", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ…â€™", website: "" },
      { name: "Power Systems", favicon: "ÃƒÂ¢Ã…Â¡Ã‚Â¡", website: "" },
      { name: "Control Systems", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã¢â‚¬ÂºÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Signal Processing", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â¡", website: "" },
      { name: "Electronics Testing", favicon: "ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Âª", website: "" },
    ]
  },
  {
    name: "AI for Chemical Engineering",
    icon: "🧪",
    toolCount: 20,
    subcategories: [
      { name: "Process Design", favicon: "ÃƒÂ¢Ã…Â¡Ã¢â€žÂ¢ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Reaction Optimization", favicon: "ÃƒÂ¢Ã…Â¡Ã¢â‚¬â€ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Quality Control", favicon: "ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦", website: "" },
      { name: "Safety Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂºÃ‚Â¡ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Environmental Impact", favicon: "ÃƒÂ°Ã…Â¸Ã…â€™Ã‚Â", website: "" },
    ]
  },
  {
    name: "AI for Biomedical Engineering",
    icon: "🧬",
    toolCount: 29,
    subcategories: [
      { name: "Medical Devices", favicon: "ÃƒÂ°Ã…Â¸Ã‚ÂÃ‚Â¥", website: "" },
      { name: "Tissue Engineering", favicon: "ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Â¬", website: "" },
      { name: "Biomechanics", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Âª", website: "" },
      { name: "Diagnostic Tools", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â¬", website: "" },
      { name: "Rehabilitation", favicon: "ÃƒÂ¢Ã¢â€žÂ¢Ã‚Â¿", website: "" },
    ]
  },
  {
    name: "AI for Civil Engineering",
    icon: "🏗️",
    toolCount: 27,
    subcategories: [
      { name: "Structural Design", favicon: "ÃƒÂ°Ã…Â¸Ã‚ÂÃ‚Â¢", website: "" },
      { name: "Transportation", favicon: "ÃƒÂ°Ã…Â¸Ã…Â¡Ã¢â‚¬Â¡", website: "" },
      { name: "Water Resources", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â§", website: "" },
      { name: "Geotechnical", favicon: "ÃƒÂ°Ã…Â¸Ã‚ÂÃ¢â‚¬ÂÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Construction Management", favicon: "ÃƒÂ°Ã…Â¸Ã‚ÂÃ¢â‚¬â€ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
    ]
  },
  {
    name: "AI for Environmental Engineering",
    icon: "🍃",
    toolCount: 23,
    subcategories: [
      { name: "Water Treatment", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â§", website: "" },
      { name: "Air Pollution Control", favicon: "ÃƒÂ°Ã…Â¸Ã…â€™Ã‚Â¬ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Waste Management", favicon: "ÃƒÂ¢Ã¢â€žÂ¢Ã‚Â»ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Remediation", favicon: "ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Â¹", website: "" },
      { name: "Sustainability", favicon: "ÃƒÂ°Ã…Â¸Ã…â€™Ã‚Â±", website: "" },
    ]
  },
  {
    name: "AI for Nuclear Engineering",
    icon: "☢️",
    toolCount: 16,
    subcategories: [
      { name: "Reactor Design", favicon: "ÃƒÂ¢Ã…Â¡Ã‚Â¡", website: "" },
      { name: "Safety Systems", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂºÃ‚Â¡ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Fuel Management", favicon: "ÃƒÂ¢Ã…Â¡Ã¢â‚¬â€ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Waste Disposal", favicon: "ÃƒÂ¢Ã‹Å“Ã‚Â¢ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Radiation Protection", favicon: "ÃƒÂ¢Ã…Â¡Ã‚Â ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
    ]
  },
  {
    name: "AI for Robotics Engineering",
    icon: "🤖",
    toolCount: 32,
    subcategories: [
      { name: "Robot Design", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¨", website: "" },
      { name: "Control Systems", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã¢â‚¬ÂºÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Computer Vision", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ËœÃ‚ÂÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Path Planning", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â€Ã‚ÂºÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Human-Robot Interaction", favicon: "Ã°Å¸Â¤Â", website: "" },
    ]
  },
  {
    name: "AI for Quantum Engineering",
    icon: "⚛️",
    toolCount: 14,
    subcategories: [
      { name: "Quantum Computing", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â»", website: "" },
      { name: "Quantum Communication", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â¡", website: "" },
      { name: "Quantum Sensing", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â", website: "" },
      { name: "Quantum Materials", favicon: "ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Âª", website: "" },
      { name: "Quantum Algorithms", favicon: "ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Â®", website: "" },
    ]
  },
  {
    name: "AI for Nanotechnology",
    icon: "🔬",
    toolCount: 19,
    subcategories: [
      { name: "Nanomaterials", favicon: "ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Âª", website: "" },
      { name: "Nano-fabrication", favicon: "ÃƒÂ¢Ã…Â¡Ã¢â€žÂ¢ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Nano-electronics", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â»", website: "" },
      { name: "Nano-medicine", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã…Â ", website: "" },
      { name: "Characterization", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â", website: "" },
    ]
  },
  {
    name: "AI for Materials Science",
    icon: "💎",
    toolCount: 25,
    subcategories: [
      { name: "Material Discovery", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â", website: "" },
      { name: "Property Prediction", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
      { name: "Testing & Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Âª", website: "" },
      { name: "Computational Modeling", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â»", website: "" },
      { name: "Application Development", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂºÃ‚Â ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
    ]
  },
  {
    name: "AI for Photonics",
    icon: "💡",
    toolCount: 17,
    subcategories: [
      { name: "Optical Design", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â", website: "" },
      { name: "Laser Systems", favicon: "ÃƒÂ¢Ã…Â¡Ã‚Â¡", website: "" },
      { name: "Fiber Optics", favicon: "ÃƒÂ°Ã…Â¸Ã…â€™Ã‚Â", website: "" },
      { name: "Imaging Systems", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â·", website: "" },
      { name: "Quantum Optics", favicon: "ÃƒÂ¢Ã…Â¡Ã¢â‚¬ÂºÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
    ]
  },
  {
    name: "AI for Acoustics",
    icon: "🔊",
    toolCount: 15,
    subcategories: [
      { name: "Sound Design", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Âµ", website: "" },
      { name: "Noise Control", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ¢â‚¬Â¡", website: "" },
      { name: "Room Acoustics", favicon: "🏢", website: "" },
      { name: "Vibration Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
      { name: "Audio Engineering", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã¢â‚¬ÂºÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
    ]
  },
  {
    name: "AI for Sports Analytics",
    icon: "⚽",
    toolCount: 28,
    subcategories: [
      { name: "Performance Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
      { name: "Injury Prediction", favicon: "ÃƒÂ°Ã…Â¸Ã‚ÂÃ‚Â¥", website: "" },
      { name: "Tactical Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¯", website: "" },
      { name: "Fan Engagement", favicon: "👥", website: "" },
      { name: "Broadcast Enhancement", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Âº", website: "" },
    ]
  },
  {
    name: "AI for Fitness Training",
    icon: "🏋️",
    toolCount: 24,
    subcategories: [
      { name: "Workout Planning", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã¢â‚¬Â¹", website: "" },
      { name: "Form Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¯", website: "" },
      { name: "Progress Tracking", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‹â€ ", website: "" },
      { name: "Nutrition Planning", favicon: "ÃƒÂ°Ã…Â¸Ã‚Â¥Ã¢â‚¬â€", website: "" },
      { name: "Virtual Coaching", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ËœÃ‚Â¨ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂÃƒÂ°Ã…Â¸Ã‚ÂÃ‚Â«", website: "" },
    ]
  },
  {
    name: "AI for Esports",
    icon: "🎮",
    toolCount: 22,
    subcategories: [
      { name: "Player Analytics", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
      { name: "Match Prediction", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â®", website: "" },
      { name: "Team Strategy", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¯", website: "" },
      { name: "Content Creation", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¬", website: "" },
      { name: "Tournament Management", favicon: "ÃƒÂ°Ã…Â¸Ã‚ÂÃ¢â‚¬Â ", website: "" },
    ]
  },
  {
    name: "AI for Outdoor Recreation",
    icon: "⛰️",
    toolCount: 18,
    subcategories: [
      { name: "Trail Planning", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â€Ã‚ÂºÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Weather Forecasting", favicon: "ÃƒÂ°Ã…Â¸Ã…â€™Ã‚Â¤ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Safety Monitoring", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂºÃ‚Â¡ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Gear Recommendations", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã¢â‚¬â„¢", website: "" },
      { name: "Community Building", favicon: "👥", website: "" },
    ]
  },
  {
    name: "AI for Pet Care",
    icon: "🐕",
    toolCount: 20,
    subcategories: [
      { name: "Health Monitoring", favicon: "ÃƒÂ°Ã…Â¸Ã‚ÂÃ‚Â¥", website: "" },
      { name: "Behavior Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Â ", website: "" },
      { name: "Training Assistance", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã¢â‚¬Å“", website: "" },
      { name: "Nutrition Planning", favicon: "ÃƒÂ°Ã…Â¸Ã‚ÂÃ¢â‚¬â€œ", website: "" },
      { name: "Pet Matching", favicon: "ÃƒÂ¢Ã‚ÂÃ‚Â¤ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
    ]
  },
  {
    name: "AI for Veterinary Medicine",
    icon: "🐾",
    toolCount: 26,
    subcategories: [
      { name: "Diagnostic Imaging", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â¬", website: "" },
      { name: "Treatment Planning", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã…Â ", website: "" },
      { name: "Disease Prediction", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
      { name: "Surgery Assistance", favicon: "🔪", website: "" },
      { name: "Research Analytics", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â", website: "" },
    ]
  },
  {
    name: "AI for Animal Welfare",
    icon: "🐻",
    toolCount: 17,
    subcategories: [
      { name: "Habitat Monitoring", favicon: "ÃƒÂ°Ã…Â¸Ã…â€™Ã‚Â", website: "" },
      { name: "Health Assessment", favicon: "ÃƒÂ°Ã…Â¸Ã‚ÂÃ‚Â¥", website: "" },
      { name: "Behavior Studies", favicon: "ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Â ", website: "" },
      { name: "Conservation Planning", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â€Ã‚ÂºÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Rescue Operations", favicon: "ÃƒÂ°Ã…Â¸Ã…Â¡Ã‚Â", website: "" },
    ]
  },
  {
    name: "AI for Livestock Management",
    icon: "🐄",
    toolCount: 21,
    subcategories: [
      { name: "Health Monitoring", favicon: "ÃƒÂ°Ã…Â¸Ã‚ÂÃ‚Â¥", website: "" },
      { name: "Feed Optimization", favicon: "🌾", website: "" },
      { name: "Breeding Programs", favicon: "ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Â¬", website: "" },
      { name: "Environmental Control", favicon: "🏢", website: "" },
      { name: "Yield Prediction", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‹â€ ", website: "" },
    ]
  },
  {
    name: "AI for Aquaculture",
    icon: "🐟",
    toolCount: 16,
    subcategories: [
      { name: "Water Quality", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â§", website: "" },
      { name: "Fish Health", favicon: "ÃƒÂ°Ã…Â¸Ã‚ÂÃ‚Â¥", website: "" },
      { name: "Feeding Systems", favicon: "ÃƒÂ°Ã…Â¸Ã‚ÂÃ‚Â½ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Growth Monitoring", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
      { name: "Disease Prevention", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂºÃ‚Â¡ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
    ]
  },
  {
    name: "AI for Beekeeping",
    icon: "🐝",
    toolCount: 14,
    subcategories: [
      { name: "Hive Monitoring", favicon: "🏢", website: "" },
      { name: "Colony Health", favicon: "ÃƒÂ°Ã…Â¸Ã‚ÂÃ‚Â¥", website: "" },
      { name: "Foraging Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã…â€™Ã‚Â»", website: "" },
      { name: "Honey Production", favicon: "ÃƒÂ°Ã…Â¸Ã‚ÂÃ‚Â¯", website: "" },
      { name: "Pollination Services", favicon: "ÃƒÂ°Ã…Â¸Ã…â€™Ã‚Âº", website: "" },
    ]
  },
  {
    name: "AI for Urban Farming",
    icon: "🌱",
    toolCount: 19,
    subcategories: [
      { name: "Vertical Farming", favicon: "ÃƒÂ°Ã…Â¸Ã…â€™Ã‚Â±", website: "" },
      { name: "Hydroponics", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â§", website: "" },
      { name: "Space Optimization", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â", website: "" },
      { name: "Resource Management", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
      { name: "Community Engagement", favicon: "👥", website: "" },
    ]
  },
  {
    name: "AI for Sustainable Agriculture",
    icon: "🌱",
    toolCount: 23,
    subcategories: [
      { name: "Soil Health", favicon: "ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Âª", website: "" },
      { name: "Water Conservation", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â§", website: "" },
      { name: "Biodiversity", favicon: "ÃƒÂ°Ã…Â¸Ã‚Â¦Ã¢â‚¬Â¹", website: "" },
      { name: "Carbon Farming", favicon: "ÃƒÂ°Ã…Â¸Ã…â€™Ã‚Â", website: "" },
      { name: "Organic Certification", favicon: "ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦", website: "" },
    ]
  },
  {
    name: "AI for Food Processing",
    icon: "🍽️",
    toolCount: 25,
    subcategories: [
      { name: "Quality Control", favicon: "ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦", website: "" },
      { name: "Process Optimization", favicon: "ÃƒÂ¢Ã…Â¡Ã¢â€žÂ¢ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Safety Monitoring", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂºÃ‚Â¡ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Packaging Design", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â¦", website: "" },
      { name: "Supply Chain", favicon: "ÃƒÂ°Ã…Â¸Ã…Â¡Ã…Â¡", website: "" },
    ]
  },
  {
    name: "AI for Food Safety",
    icon: "🛡️",
    toolCount: 20,
    subcategories: [
      { name: "Contamination Detection", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â", website: "" },
      { name: "Traceability", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã¢â‚¬Â¹", website: "" },
      { name: "Compliance Monitoring", favicon: "ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦", website: "" },
      { name: "Risk Assessment", favicon: "ÃƒÂ¢Ã…Â¡Ã‚Â ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Recall Management", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ¢â‚¬Å¾", website: "" },
    ]
  },
  {
    name: "AI for Nutrition Science",
    icon: "ÃƒÂ°Ã…Â¸Ã‚Â¥Ã¢â‚¬â€",
    toolCount: 22,
    subcategories: [
      { name: "Diet Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
      { name: "Meal Planning", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã¢â‚¬Â¹", website: "" },
      { name: "Supplement Research", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã…Â ", website: "" },
      { name: "Health Impact", favicon: "ÃƒÂ°Ã…Â¸Ã‚ÂÃ‚Â¥", website: "" },
      { name: "Personalized Nutrition", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ËœÃ‚Â¤", website: "" },
    ]
  },
  {
    name: "AI for Culinary Arts",
    icon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ËœÃ‚Â¨ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂÃƒÂ°Ã…Â¸Ã‚ÂÃ‚Â³",
    toolCount: 18,
    subcategories: [
      { name: "Recipe Generation", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã¢â‚¬â€œ", website: "" },
      { name: "Flavor Pairing", favicon: "ÃƒÂ°Ã…Â¸Ã‚ÂÃ‚Â½ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Technique Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â¬", website: "" },
      { name: "Menu Optimization", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã¢â‚¬Â¹", website: "" },
      { name: "Food Photography", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â·", website: "" },
    ]
  },
  {
    name: "AI for Wine Making",
    icon: "ÃƒÂ°Ã…Â¸Ã‚ÂÃ‚Â·",
    toolCount: 16,
    subcategories: [
      { name: "Vineyard Management", favicon: "🌾", website: "" },
      { name: "Fermentation Control", favicon: "ÃƒÂ¢Ã…Â¡Ã¢â‚¬â€ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Quality Assessment", favicon: "ÃƒÂ°Ã…Â¸Ã‚ÂÃ‚Â·", website: "" },
      { name: "Blending Optimization", favicon: "ÃƒÂ°Ã…Â¸Ã‚Â¥Ã†â€™", website: "" },
      { name: "Market Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
    ]
  },
  {
    name: "AI for Brewing",
    icon: "ÃƒÂ°Ã…Â¸Ã‚ÂÃ‚Âº",
    toolCount: 17,
    subcategories: [
      { name: "Recipe Development", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã¢â‚¬Â¹", website: "" },
      { name: "Fermentation Monitoring", favicon: "ÃƒÂ¢Ã…Â¡Ã¢â‚¬â€ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Quality Control", favicon: "ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦", website: "" },
      { name: "Inventory Management", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â¦", website: "" },
      { name: "Customer Preferences", favicon: "👥", website: "" },
    ]
  },
  {
    name: "AI for Coffee Production",
    icon: "ÃƒÂ¢Ã‹Å“Ã¢â‚¬Â¢",
    toolCount: 15,
    subcategories: [
      { name: "Bean Quality", favicon: "ÃƒÂ°Ã…Â¸Ã‚Â«Ã‹Å“", website: "" },
      { name: "Roasting Optimization", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â¥", website: "" },
      { name: "Brewing Analysis", favicon: "ÃƒÂ¢Ã‹Å“Ã¢â‚¬Â¢", website: "" },
      { name: "Flavor Profiling", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ËœÃ¢â‚¬Â¦", website: "" },
      { name: "Market Trends", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‹â€ ", website: "" },
    ]
  },
  {
    name: "AI for Tea Production",
    icon: "ÃƒÂ°Ã…Â¸Ã‚ÂÃ‚Âµ",
    toolCount: 14,
    subcategories: [
      { name: "Leaf Quality", favicon: "ÃƒÂ°Ã…Â¸Ã‚ÂÃ†â€™", website: "" },
      { name: "Processing Optimization", favicon: "ÃƒÂ¢Ã…Â¡Ã¢â€žÂ¢ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Blending", favicon: "ÃƒÂ°Ã…Â¸Ã‚Â«Ã¢â‚¬â€œ", website: "" },
      { name: "Quality Grading", favicon: "ÃƒÂ¢Ã‚Â­Ã‚Â", website: "" },
      { name: "Consumer Analytics", favicon: "👥", website: "" },
    ]
  },
  {
    name: "AI for Chocolate Making",
    icon: "ÃƒÂ°Ã…Â¸Ã‚ÂÃ‚Â«",
    toolCount: 13,
    subcategories: [
      { name: "Bean Sourcing", favicon: "ÃƒÂ°Ã…Â¸Ã…â€™Ã‚Â°", website: "" },
      { name: "Roasting Control", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â¥", website: "" },
      { name: "Tempering", favicon: "ÃƒÂ°Ã…Â¸Ã‚ÂÃ‚Â«", website: "" },
      { name: "Flavor Development", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ËœÃ¢â‚¬Â¦", website: "" },
      { name: "Packaging Design", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â¦", website: "" },
    ]
  },
  {
    name: "AI for Bakery Operations",
    icon: "ÃƒÂ°Ã…Â¸Ã‚Â¥Ã¢â‚¬â€œ",
    toolCount: 19,
    subcategories: [
      { name: "Recipe Optimization", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã¢â‚¬Â¹", website: "" },
      { name: "Production Planning", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã¢â‚¬Â¦", website: "" },
      { name: "Quality Control", favicon: "ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦", website: "" },
      { name: "Inventory Management", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â¦", website: "" },
      { name: "Customer Preferences", favicon: "👥", website: "" },
    ]
  },
  {
    name: "AI for Dairy Industry",
    icon: "ÃƒÂ°Ã…Â¸Ã‚Â¥Ã¢â‚¬Âº",
    toolCount: 21,
    subcategories: [
      { name: "Herd Management", favicon: "ÃƒÂ°Ã…Â¸Ã‚ÂÃ¢â‚¬Å¾", website: "" },
      { name: "Milk Quality", favicon: "ÃƒÂ°Ã…Â¸Ã‚Â¥Ã¢â‚¬Âº", website: "" },
      { name: "Processing Control", favicon: "ÃƒÂ¢Ã…Â¡Ã¢â€žÂ¢ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Product Development", favicon: "ÃƒÂ°Ã…Â¸Ã‚Â§Ã¢â€šÂ¬", website: "" },
      { name: "Distribution", favicon: "ÃƒÂ°Ã…Â¸Ã…Â¡Ã…Â¡", website: "" },
    ]
  },
  {
    name: "AI for Meat Processing",
    icon: "ÃƒÂ°Ã…Â¸Ã‚Â¥Ã‚Â©",
    toolCount: 18,
    subcategories: [
      { name: "Quality Grading", favicon: "ÃƒÂ¢Ã‚Â­Ã‚Â", website: "" },
      { name: "Cut Optimization", favicon: "ÃƒÂ¢Ã…â€œÃ¢â‚¬Å¡ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Safety Monitoring", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂºÃ‚Â¡ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Process Automation", favicon: "ÃƒÂ°Ã…Â¸Ã‚Â¤Ã¢â‚¬â€œ", website: "" },
      { name: "Traceability", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã¢â‚¬Â¹", website: "" },
    ]
  },
  {
    name: "AI for Seafood Industry",
    icon: "ÃƒÂ°Ã…Â¸Ã‚Â¦Ã‚Â",
    toolCount: 17,
    subcategories: [
      { name: "Catch Quality", favicon: "ÃƒÂ°Ã…Â¸Ã‚ÂÃ…Â¸", website: "" },
      { name: "Processing", favicon: "ÃƒÂ¢Ã…Â¡Ã¢â€žÂ¢ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Safety Testing", favicon: "ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Âª", website: "" },
      { name: "Supply Chain", favicon: "ÃƒÂ°Ã…Â¸Ã…Â¡Ã…Â¡", website: "" },
      { name: "Market Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
    ]
  },
  {
    name: "AI for Spice Trading",
    icon: "ÃƒÂ°Ã…Â¸Ã…â€™Ã‚Â¶ÃƒÂ¯Ã‚Â¸Ã‚Â",
    toolCount: 12,
    subcategories: [
      { name: "Quality Assessment", favicon: "ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦", website: "" },
      { name: "Authenticity Testing", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â", website: "" },
      { name: "Price Forecasting", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‹â€ ", website: "" },
      { name: "Supply Chain", favicon: "ÃƒÂ°Ã…Â¸Ã…Â¡Ã…Â¡", website: "" },
      { name: "Market Intelligence", favicon: "ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Â ", website: "" },
    ]
  },
  {
    name: "AI for Food Delivery",
    icon: "🚚",
    toolCount: 23,
    subcategories: [
      { name: "Route Optimization", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â€Ã‚ÂºÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Demand Prediction", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
      { name: "Quality Assurance", favicon: "ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦", website: "" },
      { name: "Customer Experience", favicon: "ÃƒÂ°Ã…Â¸Ã‹Å“Ã…Â ", website: "" },
      { name: "Fleet Management", favicon: "ÃƒÂ°Ã…Â¸Ã…Â¡Ã¢â‚¬Âº", website: "" },
    ]
  },
  {
    name: "AI for Restaurant Management",
    icon: "ÃƒÂ°Ã…Â¸Ã‚ÂÃ‚Â½ÃƒÂ¯Ã‚Â¸Ã‚Â",
    toolCount: 27,
    subcategories: [
      { name: "Menu Optimization", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã¢â‚¬Â¹", website: "" },
      { name: "Inventory Control", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â¦", website: "" },
      { name: "Staff Scheduling", favicon: "👥", website: "" },
      { name: "Customer Analytics", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
      { name: "Quality Control", favicon: "ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦", website: "" },
    ]
  },
  {
    name: "AI for Catering Services",
    icon: "ÃƒÂ°Ã…Â¸Ã‚ÂÃ‚Â´",
    toolCount: 19,
    subcategories: [
      { name: "Event Planning", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã¢â‚¬Â¦", website: "" },
      { name: "Menu Design", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã¢â‚¬Â¹", website: "" },
      { name: "Cost Management", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â°", website: "" },
      { name: "Logistics", favicon: "ÃƒÂ°Ã…Â¸Ã…Â¡Ã…Â¡", website: "" },
      { name: "Client Management", favicon: "👥", website: "" },
    ]
  },
  {
    name: "AI for Food Technology",
    icon: "🧪",
    toolCount: 24,
    subcategories: [
      { name: "Ingredient Innovation", favicon: "ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Âª", website: "" },
      { name: "Process Development", favicon: "ÃƒÂ¢Ã…Â¡Ã¢â€žÂ¢ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Safety Testing", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂºÃ‚Â¡ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Regulatory Compliance", favicon: "ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦", website: "" },
      { name: "Market Research", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
    ]
  },
  {
    name: "AI for Food Waste Reduction",
    icon: "♻️",
    toolCount: 16,
    subcategories: [
      { name: "Waste Monitoring", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
      { name: "Inventory Optimization", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â¦", website: "" },
      { name: "Demand Forecasting", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‹â€ ", website: "" },
      { name: "Donation Matching", favicon: "ÃƒÂ¢Ã‚ÂÃ‚Â¤ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Composting Systems", favicon: "ÃƒÂ°Ã…Â¸Ã…â€™Ã‚Â±", website: "" },
    ]
  },
  {
    name: "AI for Sustainable Packaging",
    icon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â¦",
    toolCount: 20,
    subcategories: [
      { name: "Material Selection", favicon: "ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Âª", website: "" },
      { name: "Design Optimization", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¨", website: "" },
      { name: "Lifecycle Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ¢â‚¬Å¾", website: "" },
      { name: "Recycling Systems", favicon: "ÃƒÂ¢Ã¢â€žÂ¢Ã‚Â»ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Consumer Education", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â¡", website: "" },
    ]
  },
  {
    name: "AI for Food Marketing",
    icon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â¢",
    toolCount: 22,
    subcategories: [
      { name: "Brand Development", favicon: "ÃƒÂ°Ã…Â¸Ã‚ÂÃ‚Â·ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Consumer Insights", favicon: "ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Â ", website: "" },
      { name: "Campaign Management", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â¢", website: "" },
      { name: "Social Media", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â±", website: "" },
      { name: "Performance Analytics", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
    ]
  },
  {
    name: "AI for Food Retail",
    icon: "ÃƒÂ°Ã…Â¸Ã‚ÂÃ‚Âª",
    toolCount: 25,
    subcategories: [
      { name: "Shelf Optimization", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â¦", website: "" },
      { name: "Pricing Strategy", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â°", website: "" },
      { name: "Inventory Management", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
      { name: "Customer Experience", favicon: "ÃƒÂ°Ã…Â¸Ã‹Å“Ã…Â ", website: "" },
      { name: "Supply Chain", favicon: "ÃƒÂ°Ã…Â¸Ã…Â¡Ã…Â¡", website: "" },
    ]
  },
  {
    name: "AI for Food Service",
    icon: "ÃƒÂ°Ã…Â¸Ã‚ÂÃ‚Â½ÃƒÂ¯Ã‚Â¸Ã‚Â",
    toolCount: 21,
    subcategories: [
      { name: "Service Optimization", favicon: "ÃƒÂ¢Ã…Â¡Ã‚Â¡", website: "" },
      { name: "Quality Control", favicon: "ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦", website: "" },
      { name: "Staff Training", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ËœÃ‚Â¨ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂÃƒÂ°Ã…Â¸Ã‚ÂÃ‚Â«", website: "" },
      { name: "Customer Feedback", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â¬", website: "" },
      { name: "Operations Management", favicon: "ÃƒÂ¢Ã…Â¡Ã¢â€žÂ¢ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
    ]
  },
  {
    name: "AI for Food Safety Training",
    icon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã¢â‚¬Å“",
    toolCount: 15,
    subcategories: [
      { name: "Compliance Education", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â¡", website: "" },
      { name: "Risk Assessment", favicon: "ÃƒÂ¢Ã…Â¡Ã‚Â ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Best Practices", favicon: "ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦", website: "" },
      { name: "Certification", favicon: "ÃƒÂ°Ã…Â¸Ã‚ÂÃ¢â‚¬Â ", website: "" },
      { name: "Audit Preparation", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â", website: "" },
    ]
  },
  {
    name: "AI for Food Innovation",
    icon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â¡",
    toolCount: 18,
    subcategories: [
      { name: "Product Development", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂºÃ‚Â ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Market Research", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â", website: "" },
      { name: "Trend Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‹â€ ", website: "" },
      { name: "Consumer Testing", favicon: "👥", website: "" },
      { name: "Launch Strategy", favicon: "ÃƒÂ°Ã…Â¸Ã…Â¡Ã¢â€šÂ¬", website: "" },
    ]
  },
  {
    name: "AI for Food Quality Assurance",
    icon: "ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦",
    toolCount: 20,
    subcategories: [
      { name: "Testing Protocols", favicon: "ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Âª", website: "" },
      { name: "Quality Metrics", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
      { name: "Compliance Monitoring", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â", website: "" },
      { name: "Defect Detection", favicon: "ÃƒÂ°Ã…Â¸Ã‚ÂÃ¢â‚¬Âº", website: "" },
      { name: "Continuous Improvement", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‹â€ ", website: "" },
    ]
  },
  {
    name: "AI for Food Logistics",
    icon: "🚚",
    toolCount: 19,
    subcategories: [
      { name: "Cold Chain Management", favicon: "ÃƒÂ¢Ã‚ÂÃ¢â‚¬Å¾ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Route Optimization", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â€Ã‚ÂºÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Inventory Tracking", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â¦", website: "" },
      { name: "Delivery Scheduling", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã¢â‚¬Â¦", website: "" },
      { name: "Quality Monitoring", favicon: "ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦", website: "" },
    ]
  },
  {
    name: "AI for Food Economics",
    icon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â°",
    toolCount: 17,
    subcategories: [
      { name: "Price Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
      { name: "Market Forecasting", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â®", website: "" },
      { name: "Supply & Demand", favicon: "⚖️", website: "" },
      { name: "Trade Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã…â€™Ã‚Â", website: "" },
      { name: "Risk Management", favicon: "ÃƒÂ¢Ã…Â¡Ã‚Â ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
    ]
  },
  {
    name: "AI for Food Policy",
    icon: "ÃƒÂ°Ã…Â¸Ã‚ÂÃ¢â‚¬ÂºÃƒÂ¯Ã‚Â¸Ã‚Â",
    toolCount: 14,
    subcategories: [
      { name: "Regulatory Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã¢â‚¬Â¹", website: "" },
      { name: "Policy Development", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â", website: "" },
      { name: "Compliance Monitoring", favicon: "ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦", website: "" },
      { name: "Impact Assessment", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
      { name: "Stakeholder Engagement", favicon: "👥", website: "" },
    ]
  },
  {
    name: "AI for Food Education",
    icon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â¡",
    toolCount: 16,
    subcategories: [
      { name: "Nutrition Education", favicon: "ÃƒÂ°Ã…Â¸Ã‚Â¥Ã¢â‚¬â€", website: "" },
      { name: "Cooking Training", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ËœÃ‚Â¨ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂÃƒÂ°Ã…Â¸Ã‚ÂÃ‚Â³", website: "" },
      { name: "Food Science", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â¬", website: "" },
      { name: "Cultural Education", favicon: "ÃƒÂ°Ã…Â¸Ã…â€™Ã‚Â", website: "" },
      { name: "Skill Development", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂºÃ‚Â ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
    ]
  },
  {
    name: "AI for Food Tourism",
    icon: "ÃƒÂ¢Ã…â€œÃ‹â€ ÃƒÂ¯Ã‚Â¸Ã‚Â",
    toolCount: 13,
    subcategories: [
      { name: "Destination Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â€Ã‚ÂºÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Experience Design", favicon: "ÃƒÂ¢Ã…â€œÃ‚Â¨", website: "" },
      { name: "Local Cuisine", favicon: "ÃƒÂ°Ã…Â¸Ã‚ÂÃ‚Â½ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Tour Planning", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã¢â‚¬Â¹", website: "" },
      { name: "Cultural Integration", favicon: "ÃƒÂ°Ã…Â¸Ã…â€™Ã‚Â", website: "" },
    ]
  },
  {
    name: "AI for Food Photography",
    icon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â·",
    toolCount: 15,
    subcategories: [
      { name: "Style Enhancement", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¨", website: "" },
      { name: "Lighting Optimization", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â¡", website: "" },
      { name: "Composition Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â", website: "" },
      { name: "Color Correction", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¨", website: "" },
      { name: "Marketing Assets", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â¢", website: "" },
    ]
  },
  {
    name: "AI for Food Blogging",
    icon: "ÃƒÂ¢Ã…â€œÃ‚ÂÃƒÂ¯Ã‚Â¸Ã‚Â",
    toolCount: 12,
    subcategories: [
      { name: "Content Generation", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â", website: "" },
      { name: "Recipe Creation", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã¢â‚¬â€œ", website: "" },
      { name: "SEO Optimization", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â", website: "" },
      { name: "Audience Engagement", favicon: "👥", website: "" },
      { name: "Monetization", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â°", website: "" },
    ]
  },
  {
    name: "AI for Food Podcasting",
    icon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã¢â€žÂ¢ÃƒÂ¯Ã‚Â¸Ã‚Â",
    toolCount: 11,
    subcategories: [
      { name: "Content Planning", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã¢â‚¬Â¹", website: "" },
      { name: "Audio Enhancement", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Âµ", website: "" },
      { name: "Guest Matching", favicon: "👥", website: "" },
      { name: "Audience Growth", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‹â€ ", website: "" },
      { name: "Monetization", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â°", website: "" },
    ]
  },
  {
    name: "AI for Food Video Production",
    icon: "🎥",
    toolCount: 18,
    subcategories: [
      { name: "Recipe Videos", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â¹", website: "" },
      { name: "Editing Assistance", favicon: "ÃƒÂ¢Ã…â€œÃ¢â‚¬Å¡ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Thumbnail Generation", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â€œÃ‚Â¼ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Content Optimization", favicon: "ÃƒÂ¢Ã…Â¡Ã‚Â¡", website: "" },
      { name: "Audience Analytics", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
    ]
  },
  {
    name: "AI for Food Influencers",
    icon: "ÃƒÂ°Ã…Â¸Ã…â€™Ã…Â¸",
    toolCount: 14,
    subcategories: [
      { name: "Content Strategy", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã¢â‚¬Â¹", website: "" },
      { name: "Engagement Analytics", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
      { name: "Brand Partnerships", favicon: "Ã°Å¸Â¤Â", website: "" },
      { name: "Audience Growth", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‹â€ ", website: "" },
      { name: "Performance Tracking", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
    ]
  },
  {
    name: "AI for Food Communities",
    icon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ËœÃ‚Â¥",
    toolCount: 16,
    subcategories: [
      { name: "Community Building", favicon: "ÃƒÂ°Ã…Â¸Ã‚ÂÃ¢â‚¬â€ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Content Moderation", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂºÃ‚Â¡ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Member Engagement", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â¬", website: "" },
      { name: "Event Planning", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã¢â‚¬Â¦", website: "" },
      { name: "Knowledge Sharing", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â¡", website: "" },
    ]
  },
  {
    name: "AI for Food Competitions",
    icon: "ÃƒÂ°Ã…Â¸Ã‚ÂÃ¢â‚¬Â ",
    toolCount: 13,
    subcategories: [
      { name: "Judging Systems", favicon: "⚖️", website: "" },
      { name: "Scoring Analytics", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
      { name: "Participant Management", favicon: "👥", website: "" },
      { name: "Event Organization", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã¢â‚¬Â¹", website: "" },
      { name: "Broadcast Enhancement", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Âº", website: "" },
    ]
  },
  {
    name: "AI for Food History",
    icon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â¡",
    toolCount: 11,
    subcategories: [
      { name: "Historical Research", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â", website: "" },
      { name: "Recipe Reconstruction", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã¢â‚¬â€œ", website: "" },
      { name: "Cultural Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã…â€™Ã‚Â", website: "" },
      { name: "Documentation", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â", website: "" },
      { name: "Educational Content", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã¢â‚¬Å“", website: "" },
    ]
  },
  {
    name: "AI for Food Anthropology",
    icon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ËœÃ‚Â¤",
    toolCount: 10,
    subcategories: [
      { name: "Cultural Studies", favicon: "ÃƒÂ°Ã…Â¸Ã…â€™Ã‚Â", website: "" },
      { name: "Social Patterns", favicon: "👥", website: "" },
      { name: "Behavioral Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Â ", website: "" },
      { name: "Ethnographic Research", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â¬", website: "" },
      { name: "Comparative Studies", favicon: "⚖️", website: "" },
    ]
  },
  {
    name: "AI for Food Chemistry",
    icon: "ÃƒÂ¢Ã…Â¡Ã¢â‚¬â€ÃƒÂ¯Ã‚Â¸Ã‚Â",
    toolCount: 19,
    subcategories: [
      { name: "Molecular Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â¬", website: "" },
      { name: "Flavor Chemistry", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ËœÃ¢â‚¬Â¦", website: "" },
      { name: "Nutrient Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Âª", website: "" },
      { name: "Additive Research", favicon: "ÃƒÂ¢Ã…Â¡Ã¢â‚¬â€ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Quality Testing", favicon: "ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦", website: "" },
    ]
  },
  {
    name: "AI for Food Physics",
    icon: "ÃƒÂ¢Ã…Â¡Ã¢â‚¬ÂºÃƒÂ¯Ã‚Â¸Ã‚Â",
    toolCount: 15,
    subcategories: [
      { name: "Texture Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â", website: "" },
      { name: "Rheology", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â§", website: "" },
      { name: "Thermal Properties", favicon: "ÃƒÂ°Ã…Â¸Ã…â€™Ã‚Â¡ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Structural Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã‚ÂÃ¢â‚¬â€ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Process Modeling", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â»", website: "" },
    ]
  },
  {
    name: "AI for Food Microbiology",
    icon: "ÃƒÂ°Ã…Â¸Ã‚Â¦Ã‚Â ",
    toolCount: 17,
    subcategories: [
      { name: "Microbial Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â¬", website: "" },
      { name: "Safety Testing", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂºÃ‚Â¡ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Fermentation Studies", favicon: "ÃƒÂ¢Ã…Â¡Ã¢â‚¬â€ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Preservation Research", favicon: "ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Âª", website: "" },
      { name: "Quality Control", favicon: "ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦", website: "" },
    ]
  },
  {
    name: "AI for Food Sensory Science",
    icon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ËœÃ¢â‚¬Â¦",
    toolCount: 14,
    subcategories: [
      { name: "Taste Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ËœÃ¢â‚¬Â¦", website: "" },
      { name: "Sensory Testing", favicon: "ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Âª", website: "" },
      { name: "Consumer Preferences", favicon: "👥", website: "" },
      { name: "Flavor Profiling", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
      { name: "Product Development", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂºÃ‚Â ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
    ]
  },
  {
    name: "AI for Food Toxicology",
    icon: "ÃƒÂ¢Ã‹Å“Ã‚Â ÃƒÂ¯Ã‚Â¸Ã‚Â",
    toolCount: 12,
    subcategories: [
      { name: "Toxin Detection", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â", website: "" },
      { name: "Risk Assessment", favicon: "ÃƒÂ¢Ã…Â¡Ã‚Â ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Safety Testing", favicon: "ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Âª", website: "" },
      { name: "Regulatory Compliance", favicon: "ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦", website: "" },
      { name: "Public Health", favicon: "ÃƒÂ°Ã…Â¸Ã‚ÂÃ‚Â¥", website: "" },
    ]
  },
  {
    name: "AI for Real Estate",
    icon: "🏢",
    toolCount: 32,
    subcategories: [
      { name: "Property Valuation", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â°", website: "" },
      { name: "Market Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
      { name: "Lead Generation", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¯", website: "" },
      { name: "Virtual Tours", favicon: "ÃƒÂ°Ã…Â¸Ã‚Â¥Ã‚Â½", website: "" },
      { name: "Investment Analytics", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‹â€ ", website: "" },
    ]
  },
  {
    name: "AI for Construction",
    icon: "🏗️",
    toolCount: 28,
    subcategories: [
      { name: "Project Management", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã¢â‚¬Â¹", website: "" },
      { name: "Safety Monitoring", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂºÃ‚Â¡ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Quality Control", favicon: "ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦", website: "" },
      { name: "Cost Estimation", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â°", website: "" },
      { name: "Design Optimization", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¨", website: "" },
    ]
  },
  {
    name: "AI for Architecture",
    icon: "ÃƒÂ°Ã…Â¸Ã‚ÂÃ¢â‚¬ÂºÃƒÂ¯Ã‚Â¸Ã‚Â",
    toolCount: 26,
    subcategories: [
      { name: "Design Generation", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¨", website: "" },
      { name: "Space Planning", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â", website: "" },
      { name: "Energy Analysis", favicon: "ÃƒÂ¢Ã…Â¡Ã‚Â¡", website: "" },
      { name: "Material Selection", favicon: "ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Â±", website: "" },
      { name: "Visualization", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ËœÃ‚ÂÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
    ]
  },
  {
    name: "AI for Interior Design",
    icon: "🏢",
    toolCount: 24,
    subcategories: [
      { name: "Space Planning", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â", website: "" },
      { name: "Color Matching", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¨", website: "" },
      { name: "Furniture Selection", favicon: "ÃƒÂ°Ã…Â¸Ã‚ÂªÃ¢â‚¬Ëœ", website: "" },
      { name: "Lighting Design", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â¡", website: "" },
      { name: "3D Visualization", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¯", website: "" },
    ]
  },
  {
    name: "AI for Urban Planning",
    icon: "ÃƒÂ°Ã…Â¸Ã‚ÂÃ¢â€žÂ¢ÃƒÂ¯Ã‚Â¸Ã‚Â",
    toolCount: 22,
    subcategories: [
      { name: "Zoning Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â€Ã‚ÂºÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Traffic Flow", favicon: "🚗", website: "" },
      { name: "Public Transport", favicon: "ÃƒÂ°Ã…Â¸Ã…Â¡Ã…â€™", website: "" },
      { name: "Green Spaces", favicon: "ÃƒÂ°Ã…Â¸Ã…â€™Ã‚Â³", website: "" },
      { name: "Population Modeling", favicon: "👥", website: "" },
    ]
  },
  {
    name: "AI for Smart Cities",
    icon: "ÃƒÂ°Ã…Â¸Ã…â€™Ã¢â‚¬Â ",
    toolCount: 30,
    subcategories: [
      { name: "Traffic Management", favicon: "ÃƒÂ°Ã…Â¸Ã…Â¡Ã‚Â¦", website: "" },
      { name: "Energy Grid", favicon: "ÃƒÂ¢Ã…Â¡Ã‚Â¡", website: "" },
      { name: "Waste Management", favicon: "ÃƒÂ¢Ã¢â€žÂ¢Ã‚Â»ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Public Safety", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂºÃ‚Â¡ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Citizen Services", favicon: "👥", website: "" },
    ]
  },
  {
    name: "AI for Transportation",
    icon: "🚗",
    toolCount: 29,
    subcategories: [
      { name: "Route Optimization", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â€Ã‚ÂºÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Fleet Management", favicon: "ÃƒÂ°Ã…Â¸Ã…Â¡Ã¢â‚¬Âº", website: "" },
      { name: "Demand Forecasting", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
      { name: "Maintenance Scheduling", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â§", website: "" },
      { name: "Safety Monitoring", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂºÃ‚Â¡ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
    ]
  },
  {
    name: "AI for Aviation",
    icon: "ÃƒÂ¢Ã…â€œÃ‹â€ ÃƒÂ¯Ã‚Â¸Ã‚Â",
    toolCount: 27,
    subcategories: [
      { name: "Flight Optimization", favicon: "ÃƒÂ¢Ã…â€œÃ‹â€ ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Maintenance Prediction", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â§", website: "" },
      { name: "Crew Scheduling", favicon: "👥", website: "" },
      { name: "Passenger Experience", favicon: "ÃƒÂ°Ã…Â¸Ã‹Å“Ã…Â ", website: "" },
      { name: "Safety Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂºÃ‚Â¡ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
    ]
  },
  {
    name: "AI for Maritime",
    icon: "ÃƒÂ°Ã…Â¸Ã…Â¡Ã‚Â¢",
    toolCount: 21,
    subcategories: [
      { name: "Navigation Systems", favicon: "ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Â­", website: "" },
      { name: "Cargo Management", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â¦", website: "" },
      { name: "Weather Routing", favicon: "ÃƒÂ°Ã…Â¸Ã…â€™Ã…Â ", website: "" },
      { name: "Fleet Optimization", favicon: "ÃƒÂ¢Ã…Â¡Ã¢â‚¬Å“", website: "" },
      { name: "Port Operations", favicon: "🏭", website: "" },
    ]
  },
  {
    name: "AI for Railways",
    icon: "ÃƒÂ°Ã…Â¸Ã…Â¡Ã¢â‚¬Å¡",
    toolCount: 19,
    subcategories: [
      { name: "Schedule Optimization", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã¢â‚¬Â¦", website: "" },
      { name: "Maintenance Planning", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â§", website: "" },
      { name: "Passenger Flow", favicon: "👥", website: "" },
      { name: "Safety Systems", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂºÃ‚Â¡ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Freight Management", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â¦", website: "" },
    ]
  },
  {
    name: "AI for Logistics",
    icon: "🚚",
    toolCount: 31,
    subcategories: [
      { name: "Warehouse Management", favicon: "🏭", website: "" },
      { name: "Supply Chain", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ¢â‚¬â€", website: "" },
      { name: "Inventory Control", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â¦", website: "" },
      { name: "Delivery Routing", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â€Ã‚ÂºÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Cost Optimization", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â°", website: "" },
    ]
  },
  {
    name: "AI for Supply Chain",
    icon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ¢â‚¬â€",
    toolCount: 28,
    subcategories: [
      { name: "Demand Planning", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
      { name: "Supplier Management", favicon: "Ã°Å¸Â¤Â", website: "" },
      { name: "Risk Assessment", favicon: "ÃƒÂ¢Ã…Â¡Ã‚Â ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Inventory Optimization", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â¦", website: "" },
      { name: "Sustainability Tracking", favicon: "ÃƒÂ°Ã…Â¸Ã…â€™Ã‚Â", website: "" },
    ]
  },
  {
    name: "AI for Warehousing",
    icon: "🏭",
    toolCount: 25,
    subcategories: [
      { name: "Automation Systems", favicon: "ÃƒÂ°Ã…Â¸Ã‚Â¤Ã¢â‚¬â€œ", website: "" },
      { name: "Inventory Tracking", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â¦", website: "" },
      { name: "Space Optimization", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â", website: "" },
      { name: "Order Fulfillment", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã¢â‚¬Â¹", website: "" },
      { name: "Safety Monitoring", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂºÃ‚Â¡ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
    ]
  },
  {
    name: "AI for Insurance",
    icon: "🛡️",
    toolCount: 26,
    subcategories: [
      { name: "Risk Assessment", favicon: "ÃƒÂ¢Ã…Â¡Ã‚Â ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Claims Processing", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã¢â‚¬Â¹", website: "" },
      { name: "Fraud Detection", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â", website: "" },
      { name: "Underwriting", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â", website: "" },
      { name: "Customer Service", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â¬", website: "" },
    ]
  },
  {
    name: "AI for Banking",
    icon: "ÃƒÂ°Ã…Â¸Ã‚ÂÃ‚Â¦",
    toolCount: 33,
    subcategories: [
      { name: "Fraud Detection", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â", website: "" },
      { name: "Credit Scoring", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â³", website: "" },
      { name: "Risk Management", favicon: "ÃƒÂ¢Ã…Â¡Ã‚Â ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Customer Analytics", favicon: "👥", website: "" },
      { name: "Process Automation", favicon: "ÃƒÂ¢Ã…Â¡Ã¢â€žÂ¢ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
    ]
  },
  {
    name: "AI for Investment",
    icon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‹â€ ",
    toolCount: 29,
    subcategories: [
      { name: "Portfolio Management", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
      { name: "Market Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‹â€ ", website: "" },
      { name: "Risk Assessment", favicon: "ÃƒÂ¢Ã…Â¡Ã‚Â ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Algorithmic Trading", favicon: "ÃƒÂ°Ã…Â¸Ã‚Â¤Ã¢â‚¬â€œ", website: "" },
      { name: "Wealth Management", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â°", website: "" },
    ]
  },
  {
    name: "AI for Accounting",
    icon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ",
    toolCount: 24,
    subcategories: [
      { name: "Bookkeeping", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â¡", website: "" },
      { name: "Tax Preparation", favicon: "ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Â¾", website: "" },
      { name: "Audit Support", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â", website: "" },
      { name: "Expense Management", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â³", website: "" },
      { name: "Financial Reporting", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‹â€ ", website: "" },
    ]
  },
  {
    name: "AI for Legal Services",
    icon: "⚖️",
    toolCount: 27,
    subcategories: [
      { name: "Document Review", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã¢â‚¬Å¾", website: "" },
      { name: "Legal Research", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â", website: "" },
      { name: "Contract Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã¢â‚¬Â¹", website: "" },
      { name: "Case Prediction", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â®", website: "" },
      { name: "Compliance Monitoring", favicon: "ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦", website: "" },
    ]
  },
  {
    name: "AI for Consulting",
    icon: "💼",
    toolCount: 23,
    subcategories: [
      { name: "Business Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
      { name: "Solution Design", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¨", website: "" },
      { name: "Process Optimization", favicon: "ÃƒÂ¢Ã…Â¡Ã¢â€žÂ¢ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Market Intelligence", favicon: "ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Â ", website: "" },
      { name: "Client Management", favicon: "👥", website: "" },
    ]
  },
  {
    name: "AI for Human Resources",
    icon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ËœÃ‚Â¥",
    toolCount: 30,
    subcategories: [
      { name: "Recruitment", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¯", website: "" },
      { name: "Employee Engagement", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â¬", website: "" },
      { name: "Performance Management", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
      { name: "Training & Development", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã¢â‚¬Å“", website: "" },
      { name: "Compensation Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â°", website: "" },
    ]
  },
  {
    name: "AI for Customer Service",
    icon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â§",
    toolCount: 32,
    subcategories: [
      { name: "Chatbots", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â¬", website: "" },
      { name: "Voice Assistants", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¤", website: "" },
      { name: "Ticket Management", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â«", website: "" },
      { name: "Sentiment Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã‹Å“Ã…Â ", website: "" },
      { name: "Quality Assurance", favicon: "ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦", website: "" },
    ]
  },
  {
    name: "AI for Sales",
    icon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â¼",
    toolCount: 28,
    subcategories: [
      { name: "Lead Generation", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¯", website: "" },
      { name: "Sales Forecasting", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‹â€ ", website: "" },
      { name: "Customer Analytics", favicon: "👥", website: "" },
      { name: "Deal Management", favicon: "Ã°Å¸Â¤Â", website: "" },
      { name: "Performance Tracking", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
    ]
  },
  {
    name: "AI for Marketing",
    icon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â¢",
    toolCount: 34,
    subcategories: [
      { name: "Campaign Optimization", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¯", website: "" },
      { name: "Customer Segmentation", favicon: "👥", website: "" },
      { name: "Content Generation", favicon: "✍️", website: "" },
      { name: "Social Media", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â±", website: "" },
      { name: "ROI Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â°", website: "" },
    ]
  },
  {
    name: "AI for E-commerce",
    icon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂºÃ¢â‚¬â„¢",
    toolCount: 31,
    subcategories: [
      { name: "Product Recommendations", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¯", website: "" },
      { name: "Price Optimization", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â°", website: "" },
      { name: "Inventory Management", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â¦", website: "" },
      { name: "Customer Experience", favicon: "ÃƒÂ°Ã…Â¸Ã‹Å“Ã…Â ", website: "" },
      { name: "Fraud Detection", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â", website: "" },
    ]
  },
  {
    name: "AI for Hospitality",
    icon: "ÃƒÂ°Ã…Â¸Ã‚ÂÃ‚Â¨",
    toolCount: 25,
    subcategories: [
      { name: "Revenue Management", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â°", website: "" },
      { name: "Guest Experience", favicon: "ÃƒÂ°Ã…Â¸Ã‹Å“Ã…Â ", website: "" },
      { name: "Operations Optimization", favicon: "ÃƒÂ¢Ã…Â¡Ã¢â€žÂ¢ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Staff Scheduling", favicon: "👥", website: "" },
      { name: "Marketing Automation", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â¢", website: "" },
    ]
  },
  {
    name: "AI for Tourism",
    icon: "ÃƒÂ¢Ã…â€œÃ‹â€ ÃƒÂ¯Ã‚Â¸Ã‚Â",
    toolCount: 22,
    subcategories: [
      { name: "Travel Planning", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â€Ã‚ÂºÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Experience Curation", favicon: "ÃƒÂ¢Ã…â€œÃ‚Â¨", website: "" },
      { name: "Price Optimization", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â°", website: "" },
      { name: "Customer Personalization", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ËœÃ‚Â¤", website: "" },
      { name: "Market Analytics", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
    ]
  },
  {
    name: "AI for Entertainment",
    icon: "🎮",
    toolCount: 26,
    subcategories: [
      { name: "Content Recommendation", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¯", website: "" },
      { name: "Audience Analytics", favicon: "👥", website: "" },
      { name: "Content Creation", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¨", website: "" },
      { name: "Rights Management", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã¢â‚¬Â¹", website: "" },
      { name: "Distribution Optimization", favicon: "ÃƒÂ°Ã…Â¸Ã…Â¡Ã…Â¡", website: "" },
    ]
  },
  {
    name: "AI for Media Production",
    icon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¬",
    toolCount: 24,
    subcategories: [
      { name: "Video Editing", favicon: "ÃƒÂ¢Ã…â€œÃ¢â‚¬Å¡ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Audio Processing", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Âµ", website: "" },
      { name: "Visual Effects", favicon: "ÃƒÂ¢Ã…â€œÃ‚Â¨", website: "" },
      { name: "Content Enhancement", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¨", website: "" },
      { name: "Workflow Automation", favicon: "ÃƒÂ¢Ã…Â¡Ã¢â€žÂ¢ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
    ]
  },
  {
    name: "AI for Gaming",
    icon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â®",
    toolCount: 30,
    subcategories: [
      { name: "Game Development", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂºÃ‚Â ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "NPC Behavior", favicon: "ÃƒÂ°Ã…Â¸Ã‚Â¤Ã¢â‚¬â€œ", website: "" },
      { name: "Player Analytics", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
      { name: "Content Generation", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¨", website: "" },
      { name: "Anti-Cheat Systems", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂºÃ‚Â¡ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
    ]
  },
  {
    name: "AI for Music",
    icon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Âµ",
    toolCount: 21,
    subcategories: [
      { name: "Music Generation", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¼", website: "" },
      { name: "Audio Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â", website: "" },
      { name: "Recommendation Systems", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¯", website: "" },
      { name: "Music Production", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã¢â‚¬ÂºÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Copyright Detection", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã¢â‚¬Â¹", website: "" },
    ]
  },
  {
    name: "AI for Art & Design",
    icon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¨",
    toolCount: 23,
    subcategories: [
      { name: "Image Generation", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â€œÃ‚Â¼ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Style Transfer", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â­", website: "" },
      { name: "Design Assistance", favicon: "ÃƒÂ¢Ã…â€œÃ‚ÂÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Color Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¨", website: "" },
      { name: "Layout Optimization", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â", website: "" },
    ]
  },
  {
    name: "AI for Fashion",
    icon: "👗",
    toolCount: 19,
    subcategories: [
      { name: "Design Generation", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¨", website: "" },
      { name: "Trend Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‹â€ ", website: "" },
      { name: "Virtual Try-On", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ËœÃ¢â‚¬â€", website: "" },
      { name: "Inventory Planning", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â¦", website: "" },
      { name: "Sustainability", favicon: "ÃƒÂ°Ã…Â¸Ã…â€™Ã‚Â", website: "" },
    ]
  },
  {
    name: "AI for Photography",
    icon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â·",
    toolCount: 20,
    subcategories: [
      { name: "Image Enhancement", favicon: "ÃƒÂ¢Ã…â€œÃ‚Â¨", website: "" },
      { name: "Auto Editing", favicon: "ÃƒÂ¢Ã…â€œÃ¢â‚¬Å¡ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Subject Detection", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¯", website: "" },
      { name: "Style Transfer", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¨", website: "" },
      { name: "Composition Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â", website: "" },
    ]
  },
  {
    name: "AI for Writing",
    icon: "ÃƒÂ¢Ã…â€œÃ‚ÂÃƒÂ¯Ã‚Â¸Ã‚Â",
    toolCount: 25,
    subcategories: [
      { name: "Content Generation", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â", website: "" },
      { name: "Grammar Correction", favicon: "ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦", website: "" },
      { name: "Style Enhancement", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¨", website: "" },
      { name: "Translation", favicon: "ÃƒÂ°Ã…Â¸Ã…â€™Ã‚Â", website: "" },
      { name: "SEO Optimization", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â", website: "" },
    ]
  },
  {
    name: "AI for Education",
    icon: "Ã°Å¸Å½â€œ",
    toolCount: 50,
    subcategories: [
      { name: "Personalized Learning", favicon: "Ã°Å¸â€˜Â¤", website: "" },
      { name: "Content Creation", favicon: "Ã°Å¸â€œÅ¡", website: "" },
      { name: "Assessment Tools", favicon: "Ã°Å¸â€œÅ ", website: "" },
      { name: "Student Analytics", favicon: "Ã°Å¸â€œË†", website: "" },
      { name: "Administrative Tasks", favicon: "Ã¢Å¡â„¢Ã¯Â¸Â", website: "" },
      { name: "Virtual Classrooms", favicon: "Ã°Å¸ÂÂ«", website: "" },
      { name: "Educational Games", favicon: "Ã°Å¸Å½Â²", website: "" },
      { name: "Study Assistants", favicon: "Ã°Å¸Â¤â€“", website: "" },
      { name: "Language Learning", favicon: "Ã°Å¸Å’Â", website: "" },
      { name: "Tutoring Systems", favicon: "Ã°Å¸â€˜Â¨Ã¢â‚¬ÂÃ°Å¸ÂÂ«", website: "" }
    ]
  },
  {
    name: "AI for Research",
    icon: "ðŸ”¬",
    toolCount: 28,
    subcategories: [
      { name: "Data Analysis", favicon: "Ã°Å¸â€œÅ ", website: "" },
      { name: "Literature Review", favicon: "Ã°Å¸â€œÅ¡", website: "" },
      { name: "Hypothesis Testing", favicon: "Ã°Å¸Â§Âª", website: "" },
      { name: "Experiment Design", favicon: "Ã°Å¸â€Â¬", website: "" },
      { name: "Publication Support", favicon: "Ã°Å¸â€œÂ", website: "" },
    ]
  },
  {
    name: "AI for Healthcare",
    icon: "ðŸ¥",
    toolCount: 35,
    subcategories: [
      { name: "Diagnosis Support", favicon: "🔍", website: "" },
      { name: "Treatment Planning", favicon: "💊", website: "" },
      { name: "Medical Imaging", favicon: "📷", website: "" },
      { name: "Drug Discovery", favicon: "🧪", website: "" },
      { name: "Patient Monitoring", favicon: "📊", website: "" },
      { name: "Robotic Surgery", favicon: "🤖", website: "" },
      { name: "Electronic Health Records", favicon: "📋", website: "" },
      { name: "Clinical Trials", favicon: "🔬", website: "" },
      { name: "Mental Health", favicon: "🧠", website: "" },
      { name: "Genomics", favicon: "🧬", website: "" },
    ]
  },
  {
    name: "AI for Mental Health",
    icon: "ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Â ",
    toolCount: 22,
    subcategories: [
      { name: "Therapy Support", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â¬", website: "" },
      { name: "Mood Tracking", favicon: "ÃƒÂ°Ã…Â¸Ã‹Å“Ã…Â ", website: "" },
      { name: "Crisis Intervention", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Â Ã‹Å“", website: "" },
      { name: "Wellness Coaching", favicon: "ÃƒÂ°Ã…Â¸Ã…â€™Ã…Â¸", website: "" },
      { name: "Research Analytics", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
    ]
  },
  {
    name: "AI for Public Health",
    icon: "ÃƒÂ°Ã…Â¸Ã‚ÂÃ¢â‚¬ÂºÃƒÂ¯Ã‚Â¸Ã‚Â",
    toolCount: 24,
    subcategories: [
      { name: "Disease Surveillance", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â", website: "" },
      { name: "Epidemic Modeling", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
      { name: "Health Policy", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã¢â‚¬Â¹", website: "" },
      { name: "Resource Allocation", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â¦", website: "" },
      { name: "Public Awareness", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â¢", website: "" },
    ]
  },
  {
    name: "AI for Emergency Services",
    icon: "ÃƒÂ°Ã…Â¸Ã…Â¡Ã¢â‚¬Ëœ",
    toolCount: 19,
    subcategories: [
      { name: "Emergency Response", favicon: "ÃƒÂ°Ã…Â¸Ã…Â¡Ã‚Â¨", website: "" },
      { name: "Resource Dispatch", favicon: "ÃƒÂ°Ã…Â¸Ã…Â¡Ã…Â¡", website: "" },
      { name: "Triage Systems", favicon: "ÃƒÂ°Ã…Â¸Ã‚ÂÃ‚Â¥", website: "" },
      { name: "Disaster Prediction", favicon: "ÃƒÂ¢Ã…Â¡Ã‚Â ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Coordination Tools", favicon: "Ã°Å¸Â¤Â", website: "" },
    ]
  },
  {
    name: "AI for Environmental Science",
    icon: "ÃƒÂ°Ã…Â¸Ã…â€™Ã‚Â",
    toolCount: 26,
    subcategories: [
      { name: "Climate Modeling", favicon: "ÃƒÂ°Ã…Â¸Ã…â€™Ã‚Â¤ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Pollution Monitoring", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â", website: "" },
      { name: "Ecosystem Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã…â€™Ã‚Â¿", website: "" },
      { name: "Conservation Planning", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â€Ã‚ÂºÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Sustainability Metrics", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
    ]
  },
  {
    name: "AI for Energy Management",
    icon: "ÃƒÂ¢Ã…Â¡Ã‚Â¡",
    toolCount: 23,
    subcategories: [
      { name: "Smart Grids", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ…â€™", website: "" },
      { name: "Energy Forecasting", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‹â€ ", website: "" },
      { name: "Efficiency Optimization", favicon: "ÃƒÂ¢Ã…Â¡Ã‚Â¡", website: "" },
      { name: "Renewable Integration", favicon: "ÃƒÂ°Ã…Â¸Ã…â€™Ã…Â¾", website: "" },
      { name: "Demand Management", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
    ]
  },
  {
    name: "AI for Water Management",
    icon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â§",
    toolCount: 18,
    subcategories: [
      { name: "Quality Monitoring", favicon: "ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Âª", website: "" },
      { name: "Usage Optimization", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â§", website: "" },
      { name: "Leak Detection", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â", website: "" },
      { name: "Flood Prediction", favicon: "ÃƒÂ¢Ã…Â¡Ã‚Â ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Resource Planning", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã¢â‚¬Â¹", website: "" },
    ]
  },
  {
    name: "AI for Waste Management",
    icon: "ÃƒÂ¢Ã¢â€žÂ¢Ã‚Â»ÃƒÂ¯Ã‚Â¸Ã‚Â",
    toolCount: 17,
    subcategories: [
      { name: "Waste Sorting", favicon: "ÃƒÂ¢Ã¢â€žÂ¢Ã‚Â»ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Collection Optimization", favicon: "ÃƒÂ°Ã…Â¸Ã…Â¡Ã…Â¡", website: "" },
      { name: "Recycling Systems", favicon: "ÃƒÂ¢Ã¢â€žÂ¢Ã‚Â»ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Landfill Management", favicon: "🏭", website: "" },
      { name: "Public Awareness", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â¢", website: "" },
    ]
  },
  {
    name: "AI for Agriculture 2.0",
    icon: "🌾",
    toolCount: 21,
    subcategories: [
      { name: "Precision Farming", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¯", website: "" },
      { name: "Crop Monitoring", favicon: "ÃƒÂ°Ã…Â¸Ã…â€™Ã‚Â±", website: "" },
      { name: "Soil Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Âª", website: "" },
      { name: "Irrigation Control", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â§", website: "" },
      { name: "Yield Prediction", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‹â€ ", website: "" },
    ]
  },
  {
    name: "AI for Forestry",
    icon: "ÃƒÂ°Ã…Â¸Ã…â€™Ã‚Â²",
    toolCount: 16,
    subcategories: [
      { name: "Forest Health", favicon: "ÃƒÂ°Ã…Â¸Ã…â€™Ã‚Â³", website: "" },
      { name: "Fire Detection", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â¥", website: "" },
      { name: "Timber Management", favicon: "ÃƒÂ°Ã…Â¸Ã‚ÂªÃ‚Âµ", website: "" },
      { name: "Biodiversity Tracking", favicon: "ÃƒÂ°Ã…Â¸Ã‚Â¦Ã¢â‚¬Â¹", website: "" },
      { name: "Reforestation", favicon: "ÃƒÂ°Ã…Â¸Ã…â€™Ã‚Â±", website: "" },
    ]
  },
  {
    name: "AI for Mining",
    icon: "ÃƒÂ¢Ã¢â‚¬ÂºÃ‚ÂÃƒÂ¯Ã‚Â¸Ã‚Â",
    toolCount: 20,
    subcategories: [
      { name: "Exploration", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â€Ã‚ÂºÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Extraction Planning", favicon: "ÃƒÂ¢Ã…Â¡Ã¢â€žÂ¢ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Safety Monitoring", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂºÃ‚Â¡ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Resource Estimation", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
      { name: "Environmental Impact", favicon: "ÃƒÂ°Ã…Â¸Ã…â€™Ã‚Â", website: "" },
    ]
  },
  {
    name: "AI for Oil & Gas",
    icon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂºÃ‚Â¢ÃƒÂ¯Ã‚Â¸Ã‚Â",
    toolCount: 19,
    subcategories: [
      { name: "Exploration", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â", website: "" },
      { name: "Drilling Optimization", favicon: "ÃƒÂ¢Ã…Â¡Ã¢â€žÂ¢ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Production Monitoring", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
      { name: "Safety Systems", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂºÃ‚Â¡ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Environmental Compliance", favicon: "ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦", website: "" },
    ]
  },
  {
    name: "AI for Renewable Energy",
    icon: "ÃƒÂ°Ã…Â¸Ã…â€™Ã…Â¾",
    toolCount: 22,
    subcategories: [
      { name: "Solar Optimization", favicon: "ÃƒÂ¢Ã‹Å“Ã¢â€šÂ¬ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Wind Power", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â¨", website: "" },
      { name: "Energy Storage", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ¢â‚¬Â¹", website: "" },
      { name: "Grid Integration", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ…â€™", website: "" },
      { name: "Maintenance Planning", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â§", website: "" },
    ]
  },
  {
    name: "AI for Telecommunications",
    icon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â¡",
    toolCount: 24,
    subcategories: [
      { name: "Network Optimization", favicon: "ÃƒÂ°Ã…Â¸Ã…â€™Ã‚Â", website: "" },
      { name: "Quality Assurance", favicon: "ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦", website: "" },
      { name: "Customer Support", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â¬", website: "" },
      { name: "Fraud Detection", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â", website: "" },
      { name: "Service Planning", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã¢â‚¬Â¹", website: "" },
    ]
  },
  {
    name: "AI for Cybersecurity",
    icon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ¢â‚¬â„¢",
    toolCount: 29,
    subcategories: [
      { name: "Threat Detection", favicon: "ÃƒÂ°Ã…Â¸Ã…Â¡Ã‚Â¨", website: "" },
      { name: "Vulnerability Assessment", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â", website: "" },
      { name: "Incident Response", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Â Ã‹Å“", website: "" },
      { name: "Security Analytics", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
      { name: "Risk Management", favicon: "ÃƒÂ¢Ã…Â¡Ã‚Â ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
    ]
  },
  {
    name: "AI for Government",
    icon: "ÃƒÂ°Ã…Â¸Ã‚ÂÃ¢â‚¬ÂºÃƒÂ¯Ã‚Â¸Ã‚Â",
    toolCount: 25,
    subcategories: [
      { name: "Public Services", favicon: "👥", website: "" },
      { name: "Policy Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
      { name: "Citizen Engagement", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â¬", website: "" },
      { name: "Administrative Automation", favicon: "ÃƒÂ¢Ã…Â¡Ã¢â€žÂ¢ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Transparency Tools", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â", website: "" },
    ]
  },
  {
    name: "AI for Nonprofits",
    icon: "Ã°Å¸Â¤Â",
    toolCount: 20,
    subcategories: [
      { name: "Fundraising", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â°", website: "" },
      { name: "Volunteer Management", favicon: "👥", website: "" },
      { name: "Program Evaluation", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
      { name: "Impact Measurement", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‹â€ ", website: "" },
      { name: "Community Outreach", favicon: "ÃƒÂ°Ã…Â¸Ã…â€™Ã‚Â", website: "" },
    ]
  },
  {
    name: "AI for Social Impact",
    icon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã¢â‚¬â€œ",
    toolCount: 18,
    subcategories: [
      { name: "Social Justice", favicon: "⚖️", website: "" },
      { name: "Community Development", favicon: "ÃƒÂ°Ã…Â¸Ã‚ÂÃ¢â‚¬â€ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Education Access", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã¢â‚¬Å“", website: "" },
      { name: "Healthcare Access", favicon: "ÃƒÂ°Ã…Â¸Ã‚ÂÃ‚Â¥", website: "" },
      { name: "Environmental Action", favicon: "ÃƒÂ°Ã…Â¸Ã…â€™Ã‚Â", website: "" },
    ]
  },
  {
    name: "AI for Space Exploration",
    icon: "ÃƒÂ°Ã…Â¸Ã…Â¡Ã¢â€šÂ¬",
    toolCount: 27,
    subcategories: [
      { name: "Mission Planning", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã¢â‚¬Â¹", website: "" },
      { name: "Satellite Operations", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂºÃ‚Â°ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Astronaut Support", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ËœÃ‚Â¨ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂÃƒÂ°Ã…Â¸Ã…Â¡Ã¢â€šÂ¬", website: "" },
      { name: "Data Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
      { name: "Navigation Systems", favicon: "ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Â­", website: "" },
    ]
  },
  {
    name: "AI for Astronomy",
    icon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â­",
    toolCount: 23,
    subcategories: [
      { name: "Telescope Control", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â­", website: "" },
      { name: "Image Processing", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â€œÃ‚Â¼ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Object Detection", favicon: "ÃƒÂ°Ã…Â¸Ã…â€™Ã…Â¸", website: "" },
      { name: "Data Mining", favicon: "ÃƒÂ¢Ã¢â‚¬ÂºÃ‚ÂÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Cosmology Modeling", favicon: "ÃƒÂ°Ã…Â¸Ã…â€™Ã…â€™", website: "" },
    ]
  },
  {
    name: "AI for Marine Biology",
    icon: "ÃƒÂ°Ã…Â¸Ã‚ÂÃ‚Â ",
    toolCount: 19,
    subcategories: [
      { name: "Species Identification", favicon: "ÃƒÂ°Ã…Â¸Ã‚ÂÃ…Â¸", website: "" },
      { name: "Ecosystem Monitoring", favicon: "ÃƒÂ°Ã…Â¸Ã…â€™Ã…Â ", website: "" },
      { name: "Coral Reef Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã‚ÂªÃ‚Â¸", website: "" },
      { name: "Migration Tracking", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â€Ã‚ÂºÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Conservation Planning", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂºÃ‚Â¡ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
    ]
  },
  {
    name: "AI for Wildlife Conservation",
    icon: "ÃƒÂ°Ã…Â¸Ã‚Â¦Ã‚Â",
    toolCount: 21,
    subcategories: [
      { name: "Population Monitoring", favicon: "👥", website: "" },
      { name: "Poaching Detection", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â", website: "" },
      { name: "Habitat Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã…â€™Ã‚Â³", website: "" },
      { name: "Migration Patterns", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â€Ã‚ÂºÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Conservation Planning", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã¢â‚¬Â¹", website: "" },
    ]
  },
  {
    name: "AI for Veterinary Medicine",
    icon: "ÃƒÂ°Ã…Â¸Ã‚ÂÃ‚Â¾",
    toolCount: 18,
    subcategories: [
      { name: "Diagnosis Support", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â", website: "" },
      { name: "Treatment Planning", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã…Â ", website: "" },
      { name: "Animal Monitoring", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
      { name: "Behavior Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Â ", website: "" },
      { name: "Preventive Care", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂºÃ‚Â¡ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
    ]
  },
  {
    name: "AI for Pet Care",
    icon: "ÃƒÂ°Ã…Â¸Ã‚ÂÃ¢â‚¬Â¢",
    toolCount: 16,
    subcategories: [
      { name: "Health Monitoring", favicon: "ÃƒÂ¢Ã‚ÂÃ‚Â¤ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Nutrition Planning", favicon: "ÃƒÂ°Ã…Â¸Ã‚ÂÃ¢â‚¬â€œ", website: "" },
      { name: "Behavior Training", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¯", website: "" },
      { name: "Activity Tracking", favicon: "ÃƒÂ°Ã…Â¸Ã‚ÂÃ†â€™", website: "" },
      { name: "Emergency Alerts", favicon: "ÃƒÂ°Ã…Â¸Ã…Â¡Ã‚Â¨", website: "" },
    ]
  },
  {
    name: "AI for Zoology",
    icon: "ÃƒÂ°Ã…Â¸Ã‚Â¦Ã‚Â",
    toolCount: 17,
    subcategories: [
      { name: "Species Classification", favicon: "ÃƒÂ°Ã…Â¸Ã‚ÂÃ‚Â·ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Behavior Studies", favicon: "ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Â ", website: "" },
      { name: "Population Dynamics", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
      { name: "Habitat Research", favicon: "ÃƒÂ°Ã…Â¸Ã…â€™Ã‚Â", website: "" },
      { name: "Conservation Metrics", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‹â€ ", website: "" },
    ]
  },
  {
    name: "AI for Botany",
    icon: "ÃƒÂ°Ã…Â¸Ã…â€™Ã‚Â¿",
    toolCount: 20,
    subcategories: [
      { name: "Plant Identification", favicon: "ÃƒÂ°Ã…Â¸Ã…â€™Ã‚Â±", website: "" },
      { name: "Disease Detection", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â", website: "" },
      { name: "Growth Monitoring", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
      { name: "Species Classification", favicon: "ÃƒÂ°Ã…Â¸Ã‚ÂÃ‚Â·ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Ecosystem Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã…â€™Ã‚Â", website: "" },
    ]
  },
  {
    name: "AI for Mycology",
    icon: "ÃƒÂ°Ã…Â¸Ã‚ÂÃ¢â‚¬Å¾",
    toolCount: 14,
    subcategories: [
      { name: "Species Identification", favicon: "ÃƒÂ°Ã…Â¸Ã‚ÂÃ¢â‚¬Å¾", website: "" },
      { name: "Toxicity Analysis", favicon: "ÃƒÂ¢Ã‹Å“Ã‚Â ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Growth Conditions", favicon: "ÃƒÂ°Ã…Â¸Ã…â€™Ã‚Â¡ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Medical Research", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â¬", website: "" },
      { name: "Environmental Impact", favicon: "ÃƒÂ°Ã…Â¸Ã…â€™Ã‚Â", website: "" },
    ]
  },
  {
    name: "AI for Geology",
    icon: "⛰️",
    toolCount: 22,
    subcategories: [
      { name: "Rock Classification", favicon: "ÃƒÂ°Ã…Â¸Ã‚ÂÃ¢â‚¬â€ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Mineral Detection", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã…Â½", website: "" },
      { name: "Earthquake Prediction", favicon: "ÃƒÂ°Ã…Â¸Ã…â€™Ã¢â‚¬Â¹", website: "" },
      { name: "Soil Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Âª", website: "" },
      { name: "Geological Mapping", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â€Ã‚ÂºÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
    ]
  },
  {
    name: "AI for Meteorology",
    icon: "ÃƒÂ¢Ã¢â‚¬ÂºÃ‹â€ ÃƒÂ¯Ã‚Â¸Ã‚Â",
    toolCount: 24,
    subcategories: [
      { name: "Weather Forecasting", favicon: "ÃƒÂ°Ã…Â¸Ã…â€™Ã‚Â¤ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Climate Modeling", favicon: "ÃƒÂ°Ã…Â¸Ã…â€™Ã‚Â", website: "" },
      { name: "Storm Tracking", favicon: "ÃƒÂ°Ã…Â¸Ã…â€™Ã‚ÂªÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Agricultural Weather", favicon: "🌾", website: "" },
      { name: "Aviation Weather", favicon: "ÃƒÂ¢Ã…â€œÃ‹â€ ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
    ]
  },
  {
    name: "AI for Oceanography",
    icon: "ÃƒÂ°Ã…Â¸Ã…â€™Ã…Â ",
    toolCount: 19,
    subcategories: [
      { name: "Current Mapping", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â€Ã‚ÂºÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Temperature Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã…â€™Ã‚Â¡ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Marine Life Tracking", favicon: "ÃƒÂ°Ã…Â¸Ã‚ÂÃ¢â‚¬Â¹", website: "" },
      { name: "Pollution Monitoring", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â", website: "" },
      { name: "Deep Sea Exploration", favicon: "ÃƒÂ°Ã…Â¸Ã‚Â¤Ã‚Â¿", website: "" },
    ]
  },
  {
    name: "AI for Seismology",
    icon: "ÃƒÂ°Ã…Â¸Ã…â€™Ã‚Â",
    toolCount: 15,
    subcategories: [
      { name: "Earthquake Detection", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
      { name: "Wave Analysis", favicon: "ÃƒÂ£Ã¢â€šÂ¬Ã‚Â°ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Risk Assessment", favicon: "ÃƒÂ¢Ã…Â¡Ã‚Â ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Early Warning", favicon: "ÃƒÂ°Ã…Â¸Ã…Â¡Ã‚Â¨", website: "" },
      { name: "Structural Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã‚ÂÃ¢â‚¬â€ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
    ]
  },
  {
    name: "AI for Volcanology",
    icon: "ÃƒÂ°Ã…Â¸Ã…â€™Ã¢â‚¬Â¹",
    toolCount: 13,
    subcategories: [
      { name: "Eruption Prediction", favicon: "ÃƒÂ¢Ã…Â¡Ã‚Â ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Gas Monitoring", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â¨", website: "" },
      { name: "Lava Flow Modeling", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â¥", website: "" },
      { name: "Risk Mapping", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â€Ã‚ÂºÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Public Safety", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂºÃ‚Â¡ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
    ]
  },
  {
    name: "AI for Archaeology",
    icon: "ÃƒÂ°Ã…Â¸Ã‚ÂÃ‚Âº",
    toolCount: 18,
    subcategories: [
      { name: "Site Detection", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â€Ã‚ÂºÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Artifact Classification", favicon: "ÃƒÂ°Ã…Â¸Ã‚ÂÃ‚Âº", website: "" },
      { name: "Dating Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã¢â‚¬Â¦", website: "" },
      { name: "Reconstruction", favicon: "ÃƒÂ°Ã…Â¸Ã‚ÂÃ¢â‚¬ÂºÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Preservation Planning", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂºÃ‚Â¡ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
    ]
  },
  {
    name: "AI for Paleontology",
    icon: "ÃƒÂ°Ã…Â¸Ã‚Â¦Ã¢â‚¬Â¢",
    toolCount: 16,
    subcategories: [
      { name: "Fossil Identification", favicon: "ÃƒÂ°Ã…Â¸Ã‚Â¦Ã‚Â´", website: "" },
      { name: "Species Reconstruction", favicon: "ÃƒÂ°Ã…Â¸Ã‚Â¦Ã¢â‚¬â€œ", website: "" },
      { name: "Ecosystem Modeling", favicon: "ÃƒÂ°Ã…Â¸Ã…â€™Ã‚Â", website: "" },
      { name: "Evolution Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‹â€ ", website: "" },
      { name: "Site Discovery", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â", website: "" },
    ]
  },
  {
    name: "AI for Anthropology",
    icon: "ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Â¬",
    toolCount: 20,
    subcategories: [
      { name: "Cultural Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã…â€™Ã‚Â", website: "" },
      { name: "Language Processing", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â¬", website: "" },
      { name: "Social Pattern Recognition", favicon: "👥", website: "" },
      { name: "Historical Research", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â¡", website: "" },
      { name: "Ethnographic Studies", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â", website: "" },
    ]
  },
  {
    name: "AI for Linguistics",
    icon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â€Ã‚Â£ÃƒÂ¯Ã‚Â¸Ã‚Â",
    toolCount: 21,
    subcategories: [
      { name: "Language Translation", favicon: "ÃƒÂ°Ã…Â¸Ã…â€™Ã‚Â", website: "" },
      { name: "Dialect Recognition", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¯", website: "" },
      { name: "Syntax Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â", website: "" },
      { name: "Semantic Understanding", favicon: "ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Â ", website: "" },
      { name: "Language Evolution", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‹â€ ", website: "" },
    ]
  },
  {
    name: "AI for Philosophy",
    icon: "ÃƒÂ°Ã…Â¸Ã‚Â¤Ã¢â‚¬Â",
    toolCount: 14,
    subcategories: [
      { name: "Ethical Analysis", favicon: "⚖️", website: "" },
      { name: "Logic Reasoning", favicon: "ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Â©", website: "" },
      { name: "Concept Mapping", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â€Ã‚ÂºÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Argument Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â¬", website: "" },
      { name: "Philosophical Research", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â¡", website: "" },
    ]
  },
  {
    name: "AI for History",
    icon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…â€œ",
    toolCount: 19,
    subcategories: [
      { name: "Document Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã¢â‚¬Å¾", website: "" },
      { name: "Historical Pattern Recognition", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
      { name: "Timeline Generation", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã¢â‚¬Â¦", website: "" },
      { name: "Artifact Dating", favicon: "ÃƒÂ¢Ã‚ÂÃ‚Â°", website: "" },
      { name: "Historical Simulation", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â­", website: "" },
    ]
  },
  {
    name: "AI for Literature",
    icon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â¡",
    toolCount: 23,
    subcategories: [
      { name: "Text Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â", website: "" },
      { name: "Author Attribution", favicon: "✍️", website: "" },
      { name: "Genre Classification", favicon: "ÃƒÂ°Ã…Â¸Ã‚ÂÃ‚Â·ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Literary Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â", website: "" },
      { name: "Creative Writing", favicon: "ÃƒÂ¢Ã…â€œÃ‚Â¨", website: "" },
    ]
  },
  {
    name: "AI for Poetry",
    icon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â­",
    toolCount: 15,
    subcategories: [
      { name: "Poetry Generation", favicon: "✍️", website: "" },
      { name: "Meter Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Âµ", website: "" },
      { name: "Rhyme Detection", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¯", website: "" },
      { name: "Theme Extraction", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â­", website: "" },
      { name: "Style Emulation", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¨", website: "" },
    ]
  },
  {
    name: "AI for Theater",
    icon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â­",
    toolCount: 17,
    subcategories: [
      { name: "Script Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â", website: "" },
      { name: "Character Development", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â­", website: "" },
      { name: "Stage Optimization", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Âª", website: "" },
      { name: "Audience Analytics", favicon: "👥", website: "" },
      { name: "Performance Enhancement", favicon: "ÃƒÂ¢Ã‚Â­Ã‚Â", website: "" },
    ]
  },
  {
    name: "AI for Dance",
    icon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã†â€™",
    toolCount: 12,
    subcategories: [
      { name: "Choreography Generation", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â­", website: "" },
      { name: "Movement Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Â¢Ã‚Âº", website: "" },
      { name: "Performance Training", favicon: "ÃƒÂ°Ã…Â¸Ã‚ÂÃ¢â‚¬Â¹ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Style Recognition", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¨", website: "" },
      { name: "Music Synchronization", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Âµ", website: "" },
    ]
  },
  {
    name: "AI for Culinary Arts",
    icon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ËœÃ‚Â¨ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂÃƒÂ°Ã…Â¸Ã‚ÂÃ‚Â³",
    toolCount: 20,
    subcategories: [
      { name: "Recipe Generation", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â", website: "" },
      { name: "Flavor Pairing", favicon: "ÃƒÂ°Ã…Â¸Ã‚ÂÃ‚Â½ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Nutrition Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã‚Â¥Ã¢â‚¬â€", website: "" },
      { name: "Menu Optimization", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã¢â‚¬Â¹", website: "" },
      { name: "Cooking Assistance", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ËœÃ‚Â¨ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂÃƒÂ°Ã…Â¸Ã‚ÂÃ‚Â³", website: "" },
    ]
  },
  {
    name: "AI for Mixology",
    icon: "ÃƒÂ°Ã…Â¸Ã‚ÂÃ‚Â¸",
    toolCount: 14,
    subcategories: [
      { name: "Drink Creation", favicon: "ÃƒÂ°Ã…Â¸Ã‚ÂÃ‚Â¹", website: "" },
      { name: "Flavor Profiling", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ËœÃ¢â‚¬Â¦", website: "" },
      { name: "Ingredient Pairing", favicon: "ÃƒÂ°Ã…Â¸Ã‚Â¥Ã†â€™", website: "" },
      { name: "Menu Design", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã¢â‚¬Â¹", website: "" },
      { name: "Customer Preferences", favicon: "👥", website: "" },
    ]
  },
  {
    name: "AI for Coffee & Tea",
    icon: "ÃƒÂ¢Ã‹Å“Ã¢â‚¬Â¢",
    toolCount: 13,
    subcategories: [
      { name: "Brew Optimization", favicon: "ÃƒÂ¢Ã…Â¡Ã¢â€žÂ¢ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Flavor Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ËœÃ¢â‚¬Â¦", website: "" },
      { name: "Bean Selection", favicon: "ÃƒÂ°Ã…Â¸Ã‚Â«Ã‹Å“", website: "" },
      { name: "Roast Profiling", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â¥", website: "" },
      { name: "Customer Recommendations", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¯", website: "" },
    ]
  },
  {
    name: "AI for Wine",
    icon: "ÃƒÂ°Ã…Â¸Ã‚ÂÃ‚Â·",
    toolCount: 16,
    subcategories: [
      { name: "Wine Classification", favicon: "ÃƒÂ°Ã…Â¸Ã‚ÂÃ‚Â·ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Vintage Prediction", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‹â€ ", website: "" },
      { name: "Food Pairing", favicon: "ÃƒÂ°Ã…Â¸Ã‚ÂÃ‚Â½ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Quality Assessment", favicon: "ÃƒÂ¢Ã‚Â­Ã‚Â", website: "" },
      { name: "Market Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
    ]
  },
  {
    name: "AI for Craft Beer",
    icon: "ÃƒÂ°Ã…Â¸Ã‚ÂÃ‚Âº",
    toolCount: 15,
    subcategories: [
      { name: "Recipe Development", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â", website: "" },
      { name: "Brew Optimization", favicon: "ÃƒÂ¢Ã…Â¡Ã¢â€žÂ¢ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Flavor Profiling", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ËœÃ¢â‚¬Â¦", website: "" },
      { name: "Quality Control", favicon: "ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦", website: "" },
      { name: "Market Trends", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‹â€ ", website: "" },
    ]
  },
  {
    name: "AI for Spirits",
    icon: "ÃƒÂ°Ã…Â¸Ã‚Â¥Ã†â€™",
    toolCount: 12,
    subcategories: [
      { name: "Distillation Optimization", favicon: "ÃƒÂ¢Ã…Â¡Ã¢â‚¬â€ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Aging Prediction", favicon: "ÃƒÂ¢Ã‚ÂÃ‚Â°", website: "" },
      { name: "Flavor Development", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ËœÃ¢â‚¬Â¦", website: "" },
      { name: "Quality Assessment", favicon: "ÃƒÂ¢Ã‚Â­Ã‚Â", website: "" },
      { name: "Brand Development", favicon: "ÃƒÂ°Ã…Â¸Ã‚ÂÃ‚Â·ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
    ]
  },
  {
    name: "AI for Bartending",
    icon: "ÃƒÂ°Ã…Â¸Ã‚ÂÃ‚Â¹",
    toolCount: 11,
    subcategories: [
      { name: "Drink Creation", favicon: "ÃƒÂ°Ã…Â¸Ã‚ÂÃ‚Â¸", website: "" },
      { name: "Inventory Management", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â¦", website: "" },
      { name: "Customer Preferences", favicon: "👥", website: "" },
      { name: "Menu Optimization", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã¢â‚¬Â¹", website: "" },
      { name: "Training Assistance", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã¢â‚¬Å“", website: "" },
    ]
  },
  {
    name: "AI for Home Brewing",
    icon: "🏢",
    toolCount: 10,
    subcategories: [
      { name: "Recipe Guidance", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â", website: "" },
      { name: "Process Monitoring", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
      { name: "Quality Control", favicon: "ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦", website: "" },
      { name: "Equipment Setup", favicon: "ÃƒÂ¢Ã…Â¡Ã¢â€žÂ¢ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Community Sharing", favicon: "👥", website: "" },
    ]
  },
  {
    name: "AI for Gardening",
    icon: "ÃƒÂ°Ã…Â¸Ã…â€™Ã‚Â»",
    toolCount: 18,
    subcategories: [
      { name: "Plant Care Guidance", favicon: "ÃƒÂ°Ã…Â¸Ã…â€™Ã‚Â±", website: "" },
      { name: "Pest Detection", favicon: "ÃƒÂ°Ã…Â¸Ã‚ÂÃ¢â‚¬Âº", website: "" },
      { name: "Watering Optimization", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â§", website: "" },
      { name: "Soil Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Âª", website: "" },
      { name: "Harvest Planning", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã¢â‚¬Â¦", website: "" },
    ]
  },
  {
    name: "AI for Landscaping",
    icon: "ÃƒÂ°Ã…Â¸Ã‚ÂÃ‚Â¡",
    toolCount: 16,
    subcategories: [
      { name: "Design Generation", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¨", website: "" },
      { name: "Plant Selection", favicon: "ÃƒÂ°Ã…Â¸Ã…â€™Ã‚Â¿", website: "" },
      { name: "Maintenance Planning", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã¢â‚¬Â¦", website: "" },
      { name: "Irrigation Design", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â§", website: "" },
      { name: "Cost Estimation", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â°", website: "" },
    ]
  },
  {
    name: "AI for Home Improvement",
    icon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â¨",
    toolCount: 22,
    subcategories: [
      { name: "Project Planning", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã¢â‚¬Â¹", website: "" },
      { name: "Material Selection", favicon: "ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Â±", website: "" },
      { name: "Cost Estimation", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â°", website: "" },
      { name: "DIY Guidance", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂºÃ‚Â ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Safety Monitoring", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂºÃ‚Â¡ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
    ]
  },
  {
    name: "AI for Smart Home",
    icon: "🏢",
    toolCount: 25,
    subcategories: [
      { name: "Home Automation", favicon: "ÃƒÂ¢Ã…Â¡Ã¢â€žÂ¢ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Energy Management", favicon: "ÃƒÂ¢Ã…Â¡Ã‚Â¡", website: "" },
      { name: "Security Systems", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ¢â‚¬â„¢", website: "" },
      { name: "Voice Control", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¤", website: "" },
      { name: "Device Integration", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ…â€™", website: "" },
    ]
  },
  {
    name: "AI for Home Security",
    icon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂºÃ‚Â¡ÃƒÂ¯Ã‚Â¸Ã‚Â",
    toolCount: 19,
    subcategories: [
      { name: "Intrusion Detection", favicon: "ÃƒÂ°Ã…Â¸Ã…Â¡Ã‚Â¨", website: "" },
      { name: "Surveillance Analytics", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â¹", website: "" },
      { name: "Access Control", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ¢â‚¬Ëœ", website: "" },
      { name: "Emergency Response", favicon: "ÃƒÂ°Ã…Â¸Ã…Â¡Ã¢â‚¬Ëœ", website: "" },
      { name: "Smart Locks", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ¢â‚¬â„¢", website: "" },
    ]
  },
  {
    name: "AI for Home Entertainment",
    icon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Âº",
    toolCount: 21,
    subcategories: [
      { name: "Content Recommendation", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¬", website: "" },
      { name: "Voice Control", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¤", website: "" },
      { name: "Gaming Enhancement", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â®", website: "" },
      { name: "Audio Optimization", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ…Â ", website: "" },
      { name: "Multi-room Sync", favicon: "🏢", website: "" },
    ]
  },
  {
    name: "AI for Personal Finance",
    icon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â°",
    toolCount: 28,
    subcategories: [
      { name: "Budget Planning", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
      { name: "Investment Advice", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‹â€ ", website: "" },
      { name: "Expense Tracking", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â³", website: "" },
      { name: "Tax Optimization", favicon: "ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Â¾", website: "" },
      { name: "Retirement Planning", favicon: "ÃƒÂ°Ã…Â¸Ã‚ÂÃ¢â‚¬â€œÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
    ]
  },
  {
    name: "AI for Personal Development",
    icon: "ÃƒÂ°Ã…Â¸Ã…â€™Ã…Â¸",
    toolCount: 24,
    subcategories: [
      { name: "Goal Setting", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¯", website: "" },
      { name: "Habit Tracking", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â", website: "" },
      { name: "Skill Development", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã¢â‚¬Å“", website: "" },
      { name: "Time Management", favicon: "ÃƒÂ¢Ã‚ÂÃ‚Â°", website: "" },
      { name: "Progress Analytics", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‹â€ ", website: "" },
    ]
  },
  {
    name: "AI for Meditation & Mindfulness",
    icon: "ÃƒÂ°Ã…Â¸Ã‚Â§Ã‹Å“",
    toolCount: 17,
    subcategories: [
      { name: "Guided Meditation", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â§", website: "" },
      { name: "Stress Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã‹Å“Ã…â€™", website: "" },
      { name: "Sleep Optimization", favicon: "ÃƒÂ°Ã…Â¸Ã‹Å“Ã‚Â´", website: "" },
      { name: "Breathing Exercises", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â¨", website: "" },
      { name: "Progress Tracking", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
    ]
  },
  {
    name: "AI for Fitness & Wellness",
    icon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Âª",
    toolCount: 26,
    subcategories: [
      { name: "Workout Planning", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã¢â‚¬Â¹", website: "" },
      { name: "Form Correction", favicon: "ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦", website: "" },
      { name: "Nutrition Tracking", favicon: "ÃƒÂ°Ã…Â¸Ã‚Â¥Ã¢â‚¬â€", website: "" },
      { name: "Progress Analytics", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‹â€ ", website: "" },
      { name: "Injury Prevention", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂºÃ‚Â¡ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
    ]
  },
  {
    name: "AI for Sports Training",
    icon: "⚽",
    toolCount: 22,
    subcategories: [
      { name: "Performance Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
      { name: "Technique Training", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¯", website: "" },
      { name: "Strategy Development", favicon: "ÃƒÂ¢Ã¢â€žÂ¢Ã…Â¸ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Recovery Planning", favicon: "ÃƒÂ°Ã…Â¸Ã‚ÂÃ‚Â¥", website: "" },
      { name: "Competition Prep", favicon: "ÃƒÂ°Ã…Â¸Ã‚ÂÃ¢â‚¬Â ", website: "" },
    ]
  },
  {
    name: "AI for Outdoor Activities",
    icon: "ÃƒÂ°Ã…Â¸Ã‚ÂÃ¢â‚¬Â¢ÃƒÂ¯Ã‚Â¸Ã‚Â",
    toolCount: 19,
    subcategories: [
      { name: "Route Planning", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â€Ã‚ÂºÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Weather Forecasting", favicon: "ÃƒÂ°Ã…Â¸Ã…â€™Ã‚Â¤ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Safety Monitoring", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂºÃ‚Â¡ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Gear Recommendations", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã¢â‚¬â„¢", website: "" },
      { name: "Wildlife Detection", favicon: "ÃƒÂ°Ã…Â¸Ã‚Â¦Ã…â€™", website: "" },
    ]
  },
  {
    name: "AI for Travel Planning",
    icon: "ÃƒÂ¢Ã…â€œÃ‹â€ ÃƒÂ¯Ã‚Â¸Ã‚Â",
    toolCount: 23,
    subcategories: [
      { name: "Itinerary Generation", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã¢â‚¬Â¦", website: "" },
      { name: "Budget Optimization", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â°", website: "" },
      { name: "Destination Recommendations", favicon: "ÃƒÂ°Ã…Â¸Ã…â€™Ã‚Â", website: "" },
      { name: "Accommodation Matching", favicon: "ÃƒÂ°Ã…Â¸Ã‚ÂÃ‚Â¨", website: "" },
      { name: "Local Experiences", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â­", website: "" },
    ]
  },
  {
    name: "AI for Language Learning",
    icon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â€Ã‚Â£ÃƒÂ¯Ã‚Â¸Ã‚Â",
    toolCount: 25,
    subcategories: [
      { name: "Pronunciation Training", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¤", website: "" },
      { name: "Vocabulary Building", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â¡", website: "" },
      { name: "Grammar Correction", favicon: "ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦", website: "" },
      { name: "Conversation Practice", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â¬", website: "" },
      { name: "Cultural Context", favicon: "ÃƒÂ°Ã…Â¸Ã…â€™Ã‚Â", website: "" },
    ]
  },
  {
    name: "AI for Music Learning",
    icon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Âµ",
    toolCount: 20,
    subcategories: [
      { name: "Instrument Training", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¸", website: "" },
      { name: "Music Theory", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¼", website: "" },
      { name: "Practice Planning", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã¢â‚¬Â¦", website: "" },
      { name: "Performance Feedback", favicon: "ÃƒÂ¢Ã‚Â­Ã‚Â", website: "" },
      { name: "Composition Help", favicon: "✍️", website: "" },
    ]
  },
  {
    name: "AI for Art Learning",
    icon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¨",
    toolCount: 18,
    subcategories: [
      { name: "Technique Training", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â€œÃ…â€™ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Style Development", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â­", website: "" },
      { name: "Portfolio Building", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â", website: "" },
      { name: "Critique System", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â¬", website: "" },
      { name: "Art History", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â¡", website: "" },
    ]
  },
  {
    name: "AI for DIY Projects",
    icon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂºÃ‚Â ÃƒÂ¯Ã‚Â¸Ã‚Â",
    toolCount: 21,
    subcategories: [
      { name: "Project Ideas", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â¡", website: "" },
      { name: "Material Planning", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã¢â‚¬Â¹", website: "" },
      { name: "Step-by-Step Guidance", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â", website: "" },
      { name: "Tool Recommendations", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â§", website: "" },
      { name: "Safety Guidelines", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂºÃ‚Â¡ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
    ]
  },
  {
    name: "AI for Hobby Management",
    icon: "💼",
    toolCount: 16,
    subcategories: [
      { name: "Hobby Discovery", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â", website: "" },
      { name: "Skill Tracking", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
      { name: "Community Matching", favicon: "👥", website: "" },
      { name: "Resource Organization", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â", website: "" },
      { name: "Progress Sharing", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â¤", website: "" },
    ]
  },
  {
    name: "AI for Collectibles",
    icon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â¦",
    toolCount: 14,
    subcategories: [
      { name: "Collection Management", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã¢â‚¬Â¹", website: "" },
      { name: "Value Estimation", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â°", website: "" },
      { name: "Authentication", favicon: "ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦", website: "" },
      { name: "Market Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‹â€ ", website: "" },
      { name: "Trading Platform", favicon: "Ã°Å¸Â¤Â", website: "" },
    ]
  },
  {
    name: "AI for Vintage & Antiques",
    icon: "ÃƒÂ°Ã…Â¸Ã‚ÂÃ‚Âº",
    toolCount: 13,
    subcategories: [
      { name: "Item Identification", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â", website: "" },
      { name: "Age Determination", favicon: "ÃƒÂ¢Ã‚ÂÃ‚Â°", website: "" },
      { name: "Authenticity Check", favicon: "ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦", website: "" },
      { name: "Restoration Guidance", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â§", website: "" },
      { name: "Market Valuation", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â°", website: "" },
    ]
  },
  {
    name: "AI for Genealogy",
    icon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ËœÃ‚Â¨ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂÃƒÂ°Ã…Â¸Ã¢â‚¬ËœÃ‚Â©ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂÃƒÂ°Ã…Â¸Ã¢â‚¬ËœÃ‚Â§ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂÃƒÂ°Ã…Â¸Ã¢â‚¬ËœÃ‚Â¦",
    toolCount: 17,
    subcategories: [
      { name: "Family Tree Building", favicon: "ÃƒÂ°Ã…Â¸Ã…â€™Ã‚Â³", website: "" },
      { name: "Ancestor Search", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â", website: "" },
      { name: "DNA Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Â¬", website: "" },
      { name: "Historical Records", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…â€œ", website: "" },
      { name: "Relative Matching", favicon: "👥", website: "" },
    ]
  },
  {
    name: "AI for Personal Archives",
    icon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â¡",
    toolCount: 12,
    subcategories: [
      { name: "Photo Organization", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â·", website: "" },
      { name: "Document Digitization", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã¢â‚¬Å¾", website: "" },
      { name: "Memory Curation", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â­", website: "" },
      { name: "Timeline Creation", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã¢â‚¬Â¦", website: "" },
      { name: "Story Preservation", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã¢â‚¬â€œ", website: "" },
    ]
  },
  {
    name: "AI for Personal Branding",
    icon: "ÃƒÂ¢Ã‚Â­Ã‚Â",
    toolCount: 19,
    subcategories: [
      { name: "Brand Strategy", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã¢â‚¬Â¹", website: "" },
      { name: "Content Creation", favicon: "✍️", website: "" },
      { name: "Social Media Management", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â±", website: "" },
      { name: "Networking Analysis", favicon: "Ã°Å¸Â¤Â", website: "" },
      { name: "Reputation Monitoring", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
    ]
  },
  {
    name: "AI for Social Media Management",
    icon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â±",
    toolCount: 24,
    subcategories: [
      { name: "Content Scheduling", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã¢â‚¬Â¦", website: "" },
      { name: "Engagement Analytics", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
      { name: "Audience Growth", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‹â€ ", website: "" },
      { name: "Trend Detection", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â", website: "" },
      { name: "Multi-platform Sync", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ¢â‚¬Å¾", website: "" },
    ]
  },
  {
    name: "AI for Influencer Marketing",
    icon: "ÃƒÂ°Ã…Â¸Ã…â€™Ã…Â¸",
    toolCount: 20,
    subcategories: [
      { name: "Influencer Discovery", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â", website: "" },
      { name: "Audience Matching", favicon: "👥", website: "" },
      { name: "Campaign Optimization", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¯", website: "" },
      { name: "Performance Tracking", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
      { name: "ROI Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â°", website: "" },
    ]
  },
  {
    name: "AI for Content Creation",
    icon: "ÃƒÂ¢Ã…â€œÃ‚ÂÃƒÂ¯Ã‚Â¸Ã‚Â",
    toolCount: 27,
    subcategories: [
      { name: "Blog Writing", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â", website: "" },
      { name: "Video Production", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¬", website: "" },
      { name: "Podcast Creation", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã¢â€žÂ¢ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Social Media Posts", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â±", website: "" },
      { name: "Newsletter Generation", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â§", website: "" },
    ]
  },
  {
    name: "AI for Podcasting",
    icon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã¢â€žÂ¢ÃƒÂ¯Ã‚Â¸Ã‚Â",
    toolCount: 16,
    subcategories: [
      { name: "Episode Planning", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã¢â‚¬Â¹", website: "" },
      { name: "Audio Enhancement", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ…Â ", website: "" },
      { name: "Transcription", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â", website: "" },
      { name: "Guest Matching", favicon: "👥", website: "" },
      { name: "Distribution Optimization", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â¡", website: "" },
    ]
  },
  {
    name: "AI for Live Streaming",
    icon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â¹",
    toolCount: 15,
    subcategories: [
      { name: "Stream Setup", favicon: "ÃƒÂ¢Ã…Â¡Ã¢â€žÂ¢ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Content Moderation", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂºÃ‚Â¡ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Audience Engagement", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â¬", website: "" },
      { name: "Quality Optimization", favicon: "ÃƒÂ¢Ã‚Â­Ã‚Â", website: "" },
      { name: "Monetization", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â°", website: "" },
    ]
  },
  {
    name: "AI for Virtual Events",
    icon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Âª",
    toolCount: 18,
    subcategories: [
      { name: "Event Planning", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã¢â‚¬Â¹", website: "" },
      { name: "Attendee Management", favicon: "👥", website: "" },
      { name: "Content Curation", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â¡", website: "" },
      { name: "Networking Facilitation", favicon: "Ã°Å¸Â¤Â", website: "" },
      { name: "Engagement Analytics", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
    ]
  },
  {
    name: "AI for Community Building",
    icon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ËœÃ‚Â¥",
    toolCount: 21,
    subcategories: [
      { name: "Member Onboarding", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ËœÃ¢â‚¬Â¹", website: "" },
      { name: "Content Moderation", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂºÃ‚Â¡ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Engagement Strategies", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¯", website: "" },
      { name: "Community Analytics", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
      { name: "Growth Tactics", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‹â€ ", website: "" },
    ]
  },
  {
    name: "AI for Online Communities",
    icon: "ÃƒÂ°Ã…Â¸Ã…â€™Ã‚Â",
    toolCount: 19,
    subcategories: [
      { name: "Forum Management", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â¬", website: "" },
      { name: "User Engagement", favicon: "👥", website: "" },
      { name: "Content Quality", favicon: "ÃƒÂ¢Ã‚Â­Ã‚Â", website: "" },
      { name: "Spam Prevention", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂºÃ‚Â¡ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Community Health", favicon: "ÃƒÂ¢Ã‚ÂÃ‚Â¤ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
    ]
  },
  {
    name: "AI for Networking",
    icon: "Ã°Å¸Â¤Â",
    toolCount: 17,
    subcategories: [
      { name: "Connection Suggestions", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¯", website: "" },
      { name: "Event Recommendations", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã¢â‚¬Â¦", website: "" },
      { name: "Profile Optimization", favicon: "ÃƒÂ¢Ã‚Â­Ã‚Â", website: "" },
      { name: "Follow-up Management", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â§", website: "" },
      { name: "Relationship Tracking", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
    ]
  },
  {
    name: "AI for Professional Development",
    icon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã¢â‚¬Å“",
    toolCount: 23,
    subcategories: [
      { name: "Skill Assessment", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
      { name: "Career Planning", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â€Ã‚ÂºÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Mentorship Matching", favicon: "Ã°Å¸Â¤Â", website: "" },
      { name: "Certification Tracking", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…â€œ", website: "" },
      { name: "Industry Trends", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‹â€ ", website: "" },
    ]
  },
  {
    name: "AI for Job Search",
    icon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â¼",
    toolCount: 22,
    subcategories: [
      { name: "Resume Optimization", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã¢â‚¬Å¾", website: "" },
      { name: "Job Matching", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¯", website: "" },
      { name: "Interview Preparation", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â­", website: "" },
      { name: "Salary Negotiation", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â°", website: "" },
      { name: "Career Analytics", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
    ]
  },
  {
    name: "AI for Freelancing",
    icon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â»",
    toolCount: 20,
    subcategories: [
      { name: "Project Matching", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¯", website: "" },
      { name: "Rate Optimization", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â°", website: "" },
      { name: "Portfolio Building", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â", website: "" },
      { name: "Client Management", favicon: "👥", website: "" },
      { name: "Time Tracking", favicon: "ÃƒÂ¢Ã‚ÂÃ‚Â°", website: "" },
    ]
  },
  {
    name: "AI for Remote Work",
    icon: "🏢",
    toolCount: 21,
    subcategories: [
      { name: "Productivity Tracking", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
      { name: "Team Collaboration", favicon: "Ã°Å¸Â¤Â", website: "" },
      { name: "Communication Tools", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â¬", website: "" },
      { name: "Work-Life Balance", favicon: "⚖️", website: "" },
      { name: "Virtual Meetings", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â¹", website: "" },
    ]
  },
  {
    name: "AI for Team Management",
    icon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ËœÃ‚Â¥",
    toolCount: 24,
    subcategories: [
      { name: "Performance Tracking", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
      { name: "Resource Allocation", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â¦", website: "" },
      { name: "Conflict Resolution", favicon: "Ã°Å¸Â¤Â", website: "" },
      { name: "Team Building", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¯", website: "" },
      { name: "Goal Alignment", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¯", website: "" },
    ]
  },
  {
    name: "AI for Project Collaboration",
    icon: "Ã°Å¸Â¤Â",
    toolCount: 19,
    subcategories: [
      { name: "Task Management", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã¢â‚¬Â¹", website: "" },
      { name: "Document Sharing", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã¢â‚¬Å¾", website: "" },
      { name: "Version Control", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ¢â‚¬Å¾", website: "" },
      { name: "Progress Visualization", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‹â€ ", website: "" },
      { name: "Communication Hub", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â¬", website: "" },
    ]
  },
  {
    name: "AI for Knowledge Management",
    icon: "ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Â ",
    toolCount: 22,
    subcategories: [
      { name: "Information Organization", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â", website: "" },
      { name: "Knowledge Discovery", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â", website: "" },
      { name: "Expert Matching", favicon: "👥", website: "" },
      { name: "Content Curation", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â¡", website: "" },
      { name: "Learning Paths", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂºÃ‚Â¤ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
    ]
  },
  {
    name: "AI for Documentation",
    icon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â¡",
    toolCount: 20,
    subcategories: [
      { name: "Auto-Generation", favicon: "✍️", website: "" },
      { name: "Content Organization", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â", website: "" },
      { name: "Search Optimization", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â", website: "" },
      { name: "Version Management", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ¢â‚¬Å¾", website: "" },
      { name: "User Guides", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã¢â‚¬â€œ", website: "" },
    ]
  },
  {
    name: "AI for Technical Writing",
    icon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â",
    toolCount: 18,
    subcategories: [
      { name: "API Documentation", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â§", website: "" },
      { name: "User Manuals", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã¢â‚¬â€œ", website: "" },
      { name: "Knowledge Base", favicon: "ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Â ", website: "" },
      { name: "Tutorial Creation", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã¢â‚¬Å“", website: "" },
      { name: "Content Localization", favicon: "ÃƒÂ°Ã…Â¸Ã…â€™Ã‚Â", website: "" },
    ]
  },
  {
    name: "AI for Business Intelligence",
    icon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ",
    toolCount: 26,
    subcategories: [
      { name: "Data Visualization", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‹â€ ", website: "" },
      { name: "Predictive Analytics", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â®", website: "" },
      { name: "KPI Tracking", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¯", website: "" },
      { name: "Market Intelligence", favicon: "ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Â ", website: "" },
      { name: "Executive Dashboards", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
    ]
  },
  {
    name: "AI for Competitive Intelligence",
    icon: "💼",
    toolCount: 21,
    subcategories: [
      { name: "Market Monitoring", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
      { name: "Competitor Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â", website: "" },
      { name: "Trend Detection", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‹â€ ", website: "" },
      { name: "Price Tracking", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â°", website: "" },
      { name: "Strategic Insights", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â¡", website: "" },
    ]
  },
  {
    name: "AI for Market Research",
    icon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â",
    toolCount: 24,
    subcategories: [
      { name: "Survey Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
      { name: "Consumer Insights", favicon: "👥", website: "" },
      { name: "Focus Groups", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â¬", website: "" },
      { name: "Brand Perception", favicon: "ÃƒÂ°Ã…Â¸Ã‚ÂÃ‚Â·ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Market Segmentation", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¯", website: "" },
    ]
  },
  {
    name: "AI for Product Development",
    icon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂºÃ‚Â ÃƒÂ¯Ã‚Â¸Ã‚Â",
    toolCount: 25,
    subcategories: [
      { name: "Idea Generation", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â¡", website: "" },
      { name: "Prototype Testing", favicon: "ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Âª", website: "" },
      { name: "User Feedback", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â¬", website: "" },
      { name: "Feature Prioritization", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã¢â‚¬Â¹", website: "" },
      { name: "Launch Strategy", favicon: "ÃƒÂ°Ã…Â¸Ã…Â¡Ã¢â€šÂ¬", website: "" },
    ]
  },
  {
    name: "AI for Innovation Management",
    icon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â¡",
    toolCount: 19,
    subcategories: [
      { name: "Idea Capture", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â­", website: "" },
      { name: "Innovation Pipeline", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ¢â‚¬Å¾", website: "" },
      { name: "Trend Scouting", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â", website: "" },
      { name: "Patent Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…â€œ", website: "" },
      { name: "R&D Optimization", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â¬", website: "" },
    ]
  },
  {
    name: "AI for Quality Assurance",
    icon: "ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦",
    toolCount: 23,
    subcategories: [
      { name: "Automated Testing", favicon: "ÃƒÂ°Ã…Â¸Ã‚Â¤Ã¢â‚¬â€œ", website: "" },
      { name: "Bug Detection", favicon: "ÃƒÂ°Ã…Â¸Ã‚ÂÃ¢â‚¬Âº", website: "" },
      { name: "Performance Monitoring", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
      { name: "Compliance Checking", favicon: "ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦", website: "" },
      { name: "Quality Metrics", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‹â€ ", website: "" },
    ]
  },
  {
    name: "AI for DevOps",
    icon: "ÃƒÂ¢Ã…Â¡Ã¢â€žÂ¢ÃƒÂ¯Ã‚Â¸Ã‚Â",
    toolCount: 27,
    subcategories: [
      { name: "CI/CD Optimization", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ¢â‚¬Å¾", website: "" },
      { name: "Infrastructure Management", favicon: "ÃƒÂ°Ã…Â¸Ã‚ÂÃ¢â‚¬â€ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Monitoring & Alerting", favicon: "ÃƒÂ°Ã…Â¸Ã…Â¡Ã‚Â¨", website: "" },
      { name: "Deployment Automation", favicon: "ÃƒÂ°Ã…Â¸Ã…Â¡Ã¢â€šÂ¬", website: "" },
      { name: "Security Integration", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ¢â‚¬â„¢", website: "" },
    ]
  },
  {
    name: "AI for Cloud Computing",
    icon: "ÃƒÂ¢Ã‹Å“Ã‚ÂÃƒÂ¯Ã‚Â¸Ã‚Â",
    toolCount: 28,
    subcategories: [
      { name: "Resource Optimization", favicon: "ÃƒÂ¢Ã…Â¡Ã‚Â¡", website: "" },
      { name: "Cost Management", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â°", website: "" },
      { name: "Security Monitoring", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂºÃ‚Â¡ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Performance Tuning", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¯", website: "" },
      { name: "Multi-Cloud Management", favicon: "ÃƒÂ¢Ã‹Å“Ã‚ÂÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
    ]
  },
  {
    name: "AI for Edge Computing",
    icon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â±",
    toolCount: 20,
    subcategories: [
      { name: "Edge Deployment", favicon: "ÃƒÂ°Ã…Â¸Ã…Â¡Ã¢â€šÂ¬", website: "" },
      { name: "Latency Optimization", favicon: "ÃƒÂ¢Ã…Â¡Ã‚Â¡", website: "" },
      { name: "Device Management", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â±", website: "" },
      { name: "Data Processing", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ¢â‚¬Å¾", website: "" },
      { name: "Security at Edge", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ¢â‚¬â„¢", website: "" },
    ]
  },
  {
    name: "AI for IoT",
    icon: "ÃƒÂ°Ã…Â¸Ã…â€™Ã‚Â",
    toolCount: 29,
    subcategories: [
      { name: "Device Management", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â±", website: "" },
      { name: "Data Analytics", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
      { name: "Predictive Maintenance", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â§", website: "" },
      { name: "Security Systems", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂºÃ‚Â¡ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Automation Workflows", favicon: "ÃƒÂ¢Ã…Â¡Ã¢â€žÂ¢ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
    ]
  },
  {
    name: "AI for Blockchain",
    icon: "ÃƒÂ¢Ã¢â‚¬ÂºÃ¢â‚¬Å“ÃƒÂ¯Ã‚Â¸Ã‚Â",
    toolCount: 22,
    subcategories: [
      { name: "Smart Contracts", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â", website: "" },
      { name: "Transaction Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
      { name: "Fraud Detection", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â", website: "" },
      { name: "Compliance Monitoring", favicon: "ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦", website: "" },
      { name: "DeFi Analytics", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â°", website: "" },
    ]
  },
  {
    name: "AI for Cryptocurrency",
    icon: "ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¿",
    toolCount: 21,
    subcategories: [
      { name: "Trading Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‹â€ ", website: "" },
      { name: "Risk Assessment", favicon: "ÃƒÂ¢Ã…Â¡Ã‚Â ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Portfolio Management", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â¼", website: "" },
      { name: "Market Prediction", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â®", website: "" },
      { name: "Security Auditing", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ¢â‚¬â„¢", website: "" },
    ]
  },
  {
    name: "AI for NFTs",
    icon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¨",
    toolCount: 16,
    subcategories: [
      { name: "Creation Tools", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂºÃ‚Â ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Market Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
      { name: "Authenticity Verification", favicon: "ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦", website: "" },
      { name: "Valuation Models", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â°", website: "" },
      { name: "Trend Detection", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â", website: "" },
    ]
  },
  {
    name: "AI for Digital Assets",
    icon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã…Â½",
    toolCount: 18,
    subcategories: [
      { name: "Asset Management", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â", website: "" },
      { name: "Valuation Models", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â°", website: "" },
      { name: "Market Intelligence", favicon: "ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Â ", website: "" },
      { name: "Risk Analysis", favicon: "ÃƒÂ¢Ã…Â¡Ã‚Â ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Portfolio Optimization", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‹â€ ", website: "" },
    ]
  },
  {
    name: "AI for Quantum Computing",
    icon: "ÃƒÂ¢Ã…Â¡Ã¢â‚¬ÂºÃƒÂ¯Ã‚Â¸Ã‚Â",
    toolCount: 14,
    subcategories: [
      { name: "Algorithm Development", favicon: "ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Â®", website: "" },
      { name: "Circuit Design", favicon: "ÃƒÂ¢Ã…Â¡Ã‚Â¡", website: "" },
      { name: "Error Correction", favicon: "ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦", website: "" },
      { name: "Simulation Tools", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â¬", website: "" },
      { name: "Optimization Problems", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¯", website: "" },
    ]
  },
  {
    name: "AI for Robotics",
    icon: "🤖",
    toolCount: 31,
    subcategories: [
      { name: "Autonomous Navigation", favicon: "ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Â­", website: "" },
      { name: "Computer Vision", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ËœÃ‚ÂÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Motion Planning", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¯", website: "" },
      { name: "Human-Robot Interaction", favicon: "Ã°Å¸Â¤Â", website: "" },
      { name: "Sensor Fusion", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â¡", website: "" },
    ]
  },
  {
    name: "AI for Drones",
    icon: "ÃƒÂ°Ã…Â¸Ã…Â¡Ã‚Â",
    toolCount: 19,
    subcategories: [
      { name: "Flight Control", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â®", website: "" },
      { name: "Object Detection", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¯", website: "" },
      { name: "Navigation Systems", favicon: "ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Â­", website: "" },
      { name: "Data Collection", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
      { name: "Safety Systems", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂºÃ‚Â¡ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
    ]
  },
  {
    name: "AI for Autonomous Vehicles",
    icon: "🚗",
    toolCount: 25,
    subcategories: [
      { name: "Perception Systems", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ËœÃ‚ÂÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Path Planning", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â€Ã‚ÂºÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Decision Making", favicon: "ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Â ", website: "" },
      { name: "Safety Systems", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂºÃ‚Â¡ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Simulation Testing", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â®", website: "" },
    ]
  },
  {
    name: "AI for Smart Transportation",
    icon: "ÃƒÂ°Ã…Â¸Ã…Â¡Ã…â€™",
    toolCount: 22,
    subcategories: [
      { name: "Traffic Management", favicon: "ÃƒÂ°Ã…Â¸Ã…Â¡Ã‚Â¦", website: "" },
      { name: "Public Transit", favicon: "ÃƒÂ°Ã…Â¸Ã…Â¡Ã¢â‚¬Â¡", website: "" },
      { name: "Ride Sharing", favicon: "🚗", website: "" },
      { name: "Fleet Management", favicon: "ÃƒÂ°Ã…Â¸Ã…Â¡Ã¢â‚¬Âº", website: "" },
      { name: "Infrastructure Monitoring", favicon: "ÃƒÂ°Ã…Â¸Ã‚ÂÃ¢â‚¬â€ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
    ]
  },
  {
    name: "AI for Smart Grids",
    icon: "ÃƒÂ¢Ã…Â¡Ã‚Â¡",
    toolCount: 20,
    subcategories: [
      { name: "Load Balancing", favicon: "⚖️", website: "" },
      { name: "Demand Response", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
      { name: "Grid Optimization", favicon: "ÃƒÂ¢Ã…Â¡Ã‚Â¡", website: "" },
      { name: "Renewable Integration", favicon: "ÃƒÂ°Ã…Â¸Ã…â€™Ã…Â¾", website: "" },
      { name: "Outage Prediction", favicon: "ÃƒÂ¢Ã…Â¡Ã‚Â ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
    ]
  },
  {
    name: "AI for Water Systems",
    icon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â§",
    toolCount: 17,
    subcategories: [
      { name: "Distribution Management", favicon: "ÃƒÂ°Ã…Â¸Ã…Â¡Ã‚Â°", website: "" },
      { name: "Quality Monitoring", favicon: "ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Âª", website: "" },
      { name: "Leak Detection", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â", website: "" },
      { name: "Consumption Analytics", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
      { name: "Infrastructure Health", favicon: "ÃƒÂ°Ã…Â¸Ã‚ÂÃ¢â‚¬â€ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
    ]
  },
  {
    name: "AI for Waste Systems",
    icon: "ÃƒÂ¢Ã¢â€žÂ¢Ã‚Â»ÃƒÂ¯Ã‚Â¸Ã‚Â",
    toolCount: 15,
    subcategories: [
      { name: "Collection Optimization", favicon: "ÃƒÂ°Ã…Â¸Ã…Â¡Ã…Â¡", website: "" },
      { name: "Sorting Automation", favicon: "ÃƒÂ°Ã…Â¸Ã‚Â¤Ã¢â‚¬â€œ", website: "" },
      { name: "Recycling Efficiency", favicon: "ÃƒÂ¢Ã¢â€žÂ¢Ã‚Â»ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Landfill Management", favicon: "🏭", website: "" },
      { name: "Public Education", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â¡", website: "" },
    ]
  },
  {
    name: "AI for Public Utilities",
    icon: "ÃƒÂ°Ã…Â¸Ã‚ÂÃ¢â‚¬ÂºÃƒÂ¯Ã‚Â¸Ã‚Â",
    toolCount: 18,
    subcategories: [
      { name: "Service Optimization", favicon: "ÃƒÂ¢Ã…Â¡Ã‚Â¡", website: "" },
      { name: "Infrastructure Monitoring", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
      { name: "Customer Service", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â¬", website: "" },
      { name: "Resource Planning", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã¢â‚¬Â¹", website: "" },
      { name: "Emergency Response", favicon: "ÃƒÂ°Ã…Â¸Ã…Â¡Ã‚Â¨", website: "" },
    ]
  },
  {
    name: "AI for Civic Engagement",
    icon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â€Ã‚Â³ÃƒÂ¯Ã‚Â¸Ã‚Â",
    toolCount: 16,
    subcategories: [
      { name: "Participation Platforms", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â±", website: "" },
      { name: "Policy Feedback", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â¬", website: "" },
      { name: "Community Organizing", favicon: "👥", website: "" },
      { name: "Public Consultation", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
      { name: "Transparency Tools", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â", website: "" },
    ]
  },
  {
    name: "AI for Democracy",
    icon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â€Ã‚Â³ÃƒÂ¯Ã‚Â¸Ã‚Â",
    toolCount: 14,
    subcategories: [
      { name: "Voting Systems", favicon: "ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦", website: "" },
      { name: "Campaign Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
      { name: "Public Opinion", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â€Ã‚Â£ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Policy Impact", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‹â€ ", website: "" },
      { name: "Civic Education", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã¢â‚¬Å“", website: "" },
    ]
  },
  {
    name: "AI for Social Justice",
    icon: "⚖️",
    toolCount: 20,
    subcategories: [
      { name: "Bias Detection", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â", website: "" },
      { name: "Equality Analysis", favicon: "⚖️", website: "" },
      { name: "Discrimination Prevention", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂºÃ‚Â¡ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Access Assessment", favicon: "ÃƒÂ°Ã…Â¸Ã…Â¡Ã‚Âª", website: "" },
      { name: "Advocacy Tools", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â¢", website: "" },
    ]
  },
  {
    name: "AI for Human Rights",
    icon: "Ã°Å¸Â¤Â",
    toolCount: 17,
    subcategories: [
      { name: "Rights Monitoring", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ËœÃ‚ÂÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Documentation", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã¢â‚¬Å¾", website: "" },
      { name: "Violence Prediction", favicon: "ÃƒÂ¢Ã…Â¡Ã‚Â ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Legal Support", favicon: "⚖️", website: "" },
      { name: "Awareness Campaigns", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â¢", website: "" },
    ]
  },
  {
    name: "AI for Accessibility",
    icon: "ÃƒÂ¢Ã¢â€žÂ¢Ã‚Â¿",
    toolCount: 22,
    subcategories: [
      { name: "Assistive Technologies", favicon: "ÃƒÂ°Ã…Â¸Ã‚Â¦Ã‚Â¾", website: "" },
      { name: "Accessibility Testing", favicon: "ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦", website: "" },
      { name: "Universal Design", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¨", website: "" },
      { name: "Inclusive Interfaces", favicon: "👥", website: "" },
      { name: "Compliance Monitoring", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã¢â‚¬Â¹", website: "" },
    ]
  },
  {
    name: "AI for Inclusion",
    icon: "ÃƒÂ°Ã…Â¸Ã‚Â¤Ã¢â‚¬â€",
    toolCount: 18,
    subcategories: [
      { name: "Diversity Analysis", favicon: "👥", website: "" },
      { name: "Inclusion Metrics", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
      { name: "Bias Mitigation", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂºÃ‚Â¡ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Cultural Sensitivity", favicon: "ÃƒÂ°Ã…Â¸Ã…â€™Ã‚Â", website: "" },
      { name: "Community Building", favicon: "ÃƒÂ°Ã…Â¸Ã‚ÂÃ¢â‚¬â€ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
    ]
  },
  {
    name: "AI for Elderly Care",
    icon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ËœÃ‚Â´",
    toolCount: 21,
    subcategories: [
      { name: "Health Monitoring", favicon: "ÃƒÂ¢Ã‚ÂÃ‚Â¤ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Medication Management", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã…Â ", website: "" },
      { name: "Companionship", favicon: "Ã°Å¸Â¤Â", website: "" },
      { name: "Safety Systems", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂºÃ‚Â¡ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Independence Support", favicon: "ÃƒÂ¢Ã¢â€žÂ¢Ã‚Â¿", website: "" },
    ]
  },
  {
    name: "AI for Childcare",
    icon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ËœÃ‚Â¶",
    toolCount: 19,
    subcategories: [
      { name: "Development Tracking", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‹â€ ", website: "" },
      { name: "Safety Monitoring", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂºÃ‚Â¡ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Educational Support", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã¢â‚¬Å“", website: "" },
      { name: "Health Management", favicon: "ÃƒÂ°Ã…Â¸Ã‚ÂÃ‚Â¥", website: "" },
      { name: "Parental Guidance", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ËœÃ‚Â¨ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂÃƒÂ°Ã…Â¸Ã¢â‚¬ËœÃ‚Â©ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂÃƒÂ°Ã…Â¸Ã¢â‚¬ËœÃ‚Â§ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂÃƒÂ°Ã…Â¸Ã¢â‚¬ËœÃ‚Â¦", website: "" },
    ]
  },
  {
    name: "AI for Disability Support",
    icon: "ÃƒÂ¢Ã¢â€žÂ¢Ã‚Â¿",
    toolCount: 20,
    subcategories: [
      { name: "Communication Aids", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â¬", website: "" },
      { name: "Mobility Assistance", favicon: "ÃƒÂ°Ã…Â¸Ã‚Â¦Ã‚Â¾", website: "" },
      { name: "Daily Living Support", favicon: "🏢", website: "" },
      { name: "Learning Tools", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã¢â‚¬Å“", website: "" },
      { name: "Social Integration", favicon: "👥", website: "" },
    ]
  },
  {
    name: "AI for Mental Wellness",
    icon: "ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Â ",
    toolCount: 23,
    subcategories: [
      { name: "Emotion Recognition", favicon: "ÃƒÂ°Ã…Â¸Ã‹Å“Ã…Â ", website: "" },
      { name: "Stress Management", favicon: "ÃƒÂ°Ã…Â¸Ã‹Å“Ã…â€™", website: "" },
      { name: "Mindfulness Support", favicon: "ÃƒÂ°Ã…Â¸Ã‚Â§Ã‹Å“", website: "" },
      { name: "Sleep Improvement", favicon: "ÃƒÂ°Ã…Â¸Ã‹Å“Ã‚Â´", website: "" },
      { name: "Therapy Assistance", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â¬", website: "" },
    ]
  },
  {
    name: "AI for Addiction Recovery",
    icon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂºÃ‚Â¡ÃƒÂ¯Ã‚Â¸Ã‚Â",
    toolCount: 16,
    subcategories: [
      { name: "Relapse Prevention", favicon: "ÃƒÂ¢Ã…Â¡Ã‚Â ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Support Matching", favicon: "Ã°Å¸Â¤Â", website: "" },
      { name: "Progress Tracking", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
      { name: "Crisis Intervention", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Â Ã‹Å“", website: "" },
      { name: "Community Building", favicon: "👥", website: "" },
    ]
  },
  {
    name: "AI for Crisis Response",
    icon: "ÃƒÂ°Ã…Â¸Ã…Â¡Ã‚Â¨",
    toolCount: 19,
    subcategories: [
      { name: "Emergency Coordination", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â¾", website: "" },
      { name: "Resource Allocation", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â¦", website: "" },
      { name: "Damage Assessment", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â", website: "" },
      { name: "Evacuation Planning", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â€Ã‚ÂºÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Communication Systems", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â¡", website: "" },
    ]
  },
  {
    name: "AI for Disaster Management",
    icon: "ÃƒÂ°Ã…Â¸Ã…â€™Ã¢â‚¬Â¹",
    toolCount: 21,
    subcategories: [
      { name: "Early Warning", favicon: "ÃƒÂ¢Ã…Â¡Ã‚Â ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Response Planning", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã¢â‚¬Â¹", website: "" },
      { name: "Resource Deployment", favicon: "ÃƒÂ°Ã…Â¸Ã…Â¡Ã‚Â", website: "" },
      { name: "Recovery Coordination", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ¢â‚¬Å¾", website: "" },
      { name: "Risk Assessment", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
    ]
  },
  {
    name: "AI for Humanitarian Aid",
    icon: "Ã°Å¸Â¤Â",
    toolCount: 18,
    subcategories: [
      { name: "Needs Assessment", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
      { name: "Aid Distribution", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â¦", website: "" },
      { name: "Impact Measurement", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‹â€ ", website: "" },
      { name: "Donor Coordination", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â°", website: "" },
      { name: "Volunteer Management", favicon: "👥", website: "" },
    ]
  },
  {
    name: "AI for Refugee Support",
    icon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂºÃ‚Â¡ÃƒÂ¯Ã‚Â¸Ã‚Â",
    toolCount: 15,
    subcategories: [
      { name: "Placement Matching", favicon: "🏢", website: "" },
      { name: "Language Support", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â€Ã‚Â£ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Cultural Integration", favicon: "ÃƒÂ°Ã…Â¸Ã…â€™Ã‚Â", website: "" },
      { name: "Legal Assistance", favicon: "⚖️", website: "" },
      { name: "Family Reunification", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ËœÃ‚Â¨ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂÃƒÂ°Ã…Â¸Ã¢â‚¬ËœÃ‚Â©ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂÃƒÂ°Ã…Â¸Ã¢â‚¬ËœÃ‚Â§ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂÃƒÂ°Ã…Â¸Ã¢â‚¬ËœÃ‚Â¦", website: "" },
    ]
  },
  {
    name: "AI for Food Security",
    icon: "🌾",
    toolCount: 20,
    subcategories: [
      { name: "Supply Chain Monitoring", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ¢â‚¬â€", website: "" },
      { name: "Hunger Prediction", favicon: "ÃƒÂ¢Ã…Â¡Ã‚Â ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Resource Distribution", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â¦", website: "" },
      { name: "Waste Reduction", favicon: "ÃƒÂ¢Ã¢â€žÂ¢Ã‚Â»ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Emergency Relief", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Â Ã‹Å“", website: "" },
    ]
  },
  {
    name: "AI for Water Security",
    icon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â§",
    toolCount: 17,
    subcategories: [
      { name: "Availability Monitoring", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
      { name: "Quality Assurance", favicon: "ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦", website: "" },
      { name: "Conservation Planning", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã¢â‚¬Â¹", website: "" },
      { name: "Infrastructure Health", favicon: "ÃƒÂ°Ã…Â¸Ã‚ÂÃ¢â‚¬â€ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Crisis Response", favicon: "ÃƒÂ°Ã…Â¸Ã…Â¡Ã‚Â¨", website: "" },
    ]
  },
  {
    name: "AI for Energy Security",
    icon: "ÃƒÂ¢Ã…Â¡Ã‚Â¡",
    toolCount: 19,
    subcategories: [
      { name: "Supply Monitoring", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
      { name: "Demand Forecasting", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‹â€ ", website: "" },
      { name: "Grid Resilience", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂºÃ‚Â¡ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Storage Optimization", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ¢â‚¬Â¹", website: "" },
      { name: "Emergency Planning", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã¢â‚¬Â¹", website: "" },
    ]
  },
  {
    name: "AI for Economic Development",
    icon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‹â€ ",
    toolCount: 22,
    subcategories: [
      { name: "Growth Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
      { name: "Investment Attraction", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â°", website: "" },
      { name: "Job Creation", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â¼", website: "" },
      { name: "Infrastructure Planning", favicon: "ÃƒÂ°Ã…Â¸Ã‚ÂÃ¢â‚¬â€ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Policy Evaluation", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã¢â‚¬Â¹", website: "" },
    ]
  },
  {
    name: "AI for Rural Development",
    icon: "🌾",
    toolCount: 18,
    subcategories: [
      { name: "Agricultural Support", favicon: "ÃƒÂ°Ã…Â¸Ã…Â¡Ã…â€œ", website: "" },
      { name: "Infrastructure Planning", favicon: "ÃƒÂ°Ã…Â¸Ã‚ÂÃ¢â‚¬â€ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Education Access", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã¢â‚¬Å“", website: "" },
      { name: "Healthcare Services", favicon: "ÃƒÂ°Ã…Â¸Ã‚ÂÃ‚Â¥", website: "" },
      { name: "Economic Opportunities", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â¼", website: "" },
    ]
  },
  {
    name: "AI for Urban Development",
    icon: "ÃƒÂ°Ã…Â¸Ã‚ÂÃ¢â€žÂ¢ÃƒÂ¯Ã‚Â¸Ã‚Â",
    toolCount: 21,
    subcategories: [
      { name: "City Planning", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â€Ã‚ÂºÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Housing Development", favicon: "🏢", website: "" },
      { name: "Transportation Systems", favicon: "ÃƒÂ°Ã…Â¸Ã…Â¡Ã…â€™", website: "" },
      { name: "Public Services", favicon: "ÃƒÂ°Ã…Â¸Ã‚ÂÃ¢â‚¬ÂºÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Sustainability Goals", favicon: "ÃƒÂ°Ã…Â¸Ã…â€™Ã‚Â", website: "" },
    ]
  },
  {
    name: "AI for Community Development",
    icon: "ÃƒÂ°Ã…Â¸Ã‚ÂÃ‹Å“ÃƒÂ¯Ã‚Â¸Ã‚Â",
    toolCount: 19,
    subcategories: [
      { name: "Needs Assessment", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
      { name: "Resource Allocation", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â¦", website: "" },
      { name: "Project Management", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã¢â‚¬Â¹", website: "" },
      { name: "Impact Measurement", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‹â€ ", website: "" },
      { name: "Stakeholder Engagement", favicon: "👥", website: "" },
    ]
  },
  {
    name: "AI for Indigenous Communities",
    icon: "ÃƒÂ°Ã…Â¸Ã…â€™Ã‚Â",
    toolCount: 16,
    subcategories: [
      { name: "Cultural Preservation", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â¡", website: "" },
      { name: "Language Revitalization", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â€Ã‚Â£ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Traditional Knowledge", favicon: "ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Â ", website: "" },
      { name: "Land Management", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â€Ã‚ÂºÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Community Health", favicon: "ÃƒÂ°Ã…Â¸Ã‚ÂÃ‚Â¥", website: "" },
    ]
  },
  {
    name: "AI for Cultural Heritage",
    icon: "ÃƒÂ°Ã…Â¸Ã‚ÂÃ¢â‚¬ÂºÃƒÂ¯Ã‚Â¸Ã‚Â",
    toolCount: 20,
    subcategories: [
      { name: "Artifact Preservation", favicon: "ÃƒÂ°Ã…Â¸Ã‚ÂÃ‚Âº", website: "" },
      { name: "Historical Documentation", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…â€œ", website: "" },
      { name: "Cultural Education", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã¢â‚¬Å“", website: "" },
      { name: "Heritage Tourism", favicon: "ÃƒÂ¢Ã…â€œÃ‹â€ ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Digital Archives", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â¾", website: "" },
    ]
  },
  {
    name: "AI for Museums",
    icon: "ÃƒÂ°Ã…Â¸Ã‚ÂÃ¢â‚¬ÂºÃƒÂ¯Ã‚Â¸Ã‚Â",
    toolCount: 17,
    subcategories: [
      { name: "Collection Management", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â¦", website: "" },
      { name: "Visitor Experience", favicon: "ÃƒÂ°Ã…Â¸Ã‹Å“Ã…Â ", website: "" },
      { name: "Exhibit Design", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¨", website: "" },
      { name: "Educational Programs", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã¢â‚¬Å“", website: "" },
      { name: "Digital Preservation", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â¾", website: "" },
    ]
  },
  {
    name: "AI for Libraries",
    icon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â¡",
    toolCount: 18,
    subcategories: [
      { name: "Catalog Management", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã¢â‚¬Â¹", website: "" },
      { name: "Search Optimization", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â", website: "" },
      { name: "Reader Analytics", favicon: "👥", website: "" },
      { name: "Digital Archives", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â¾", website: "" },
      { name: "Community Programs", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã¢â‚¬Å“", website: "" },
    ]
  },
  {
    name: "AI for Archives",
    icon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…â€œ",
    toolCount: 15,
    subcategories: [
      { name: "Document Digitization", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã¢â‚¬Å¾", website: "" },
      { name: "Content Indexing", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã¢â‚¬Â¡", website: "" },
      { name: "Preservation Planning", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂºÃ‚Â¡ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Access Management", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ¢â‚¬Ëœ", website: "" },
      { name: "Historical Research", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â", website: "" },
    ]
  },
  {
    name: "AI for Publishing",
    icon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã¢â‚¬â€œ",
    toolCount: 21,
    subcategories: [
      { name: "Manuscript Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â", website: "" },
      { name: "Market Prediction", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‹â€ ", website: "" },
      { name: "Editing Assistance", favicon: "ÃƒÂ¢Ã…â€œÃ‚ÂÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Distribution Optimization", favicon: "ÃƒÂ°Ã…Â¸Ã…Â¡Ã…Â¡", website: "" },
      { name: "Rights Management", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã¢â‚¬Â¹", website: "" },
    ]
  },
  {
    name: "AI for Journalism",
    icon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â°",
    toolCount: 23,
    subcategories: [
      { name: "News Generation", favicon: "✍️", website: "" },
      { name: "Fact Checking", favicon: "ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦", website: "" },
      { name: "Source Verification", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â", website: "" },
      { name: "Trend Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‹â€ ", website: "" },
      { name: "Audience Engagement", favicon: "👥", website: "" },
    ]
  },
  {
    name: "AI for Broadcasting",
    icon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Âº",
    toolCount: 19,
    subcategories: [
      { name: "Content Scheduling", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã¢â‚¬Â¦", website: "" },
      { name: "Audience Analytics", favicon: "👥", website: "" },
      { name: "Quality Control", favicon: "ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦", website: "" },
      { name: "News Generation", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â°", website: "" },
      { name: "Live Production", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¬", website: "" },
    ]
  },
  {
    name: "AI for Film Production",
    icon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¬",
    toolCount: 24,
    subcategories: [
      { name: "Script Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â", website: "" },
      { name: "Casting Assistance", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â­", website: "" },
      { name: "Production Planning", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã¢â‚¬Â¹", website: "" },
      { name: "Visual Effects", favicon: "ÃƒÂ¢Ã…â€œÃ‚Â¨", website: "" },
      { name: "Marketing Optimization", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â¢", website: "" },
    ]
  },
  {
    name: "AI for Television",
    icon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Âº",
    toolCount: 20,
    subcategories: [
      { name: "Content Creation", favicon: "✍️", website: "" },
      { name: "Audience Analytics", favicon: "👥", website: "" },
      { name: "Programming Optimization", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
      { name: "Advertising Placement", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â¢", website: "" },
      { name: "Live Production", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¬", website: "" },
    ]
  },
  {
    name: "AI for Radio",
    icon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â»",
    toolCount: 16,
    subcategories: [
      { name: "Content Generation", favicon: "✍️", website: "" },
      { name: "Music Curation", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Âµ", website: "" },
      { name: "Audience Analysis", favicon: "👥", website: "" },
      { name: "Advertising Optimization", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â¢", website: "" },
      { name: "Live Broadcasting", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã¢â€žÂ¢ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
    ]
  },
  {
    name: "AI for Podcasting",
    icon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã¢â€žÂ¢ÃƒÂ¯Ã‚Â¸Ã‚Â",
    toolCount: 18,
    subcategories: [
      { name: "Content Planning", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã¢â‚¬Â¹", website: "" },
      { name: "Audio Enhancement", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ…Â ", website: "" },
      { name: "Guest Matching", favicon: "👥", website: "" },
      { name: "Audience Growth", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‹â€ ", website: "" },
      { name: "Monetization", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â°", website: "" },
    ]
  },
  {
    name: "AI for Live Events",
    icon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Âª",
    toolCount: 21,
    subcategories: [
      { name: "Event Planning", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã¢â‚¬Â¹", website: "" },
      { name: "Audience Management", favicon: "👥", website: "" },
      { name: "Content Curation", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â¡", website: "" },
      { name: "Technical Production", favicon: "ÃƒÂ¢Ã…Â¡Ã¢â€žÂ¢ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Experience Enhancement", favicon: "ÃƒÂ¢Ã…â€œÃ‚Â¨", website: "" },
    ]
  },
  {
    name: "AI for Concerts",
    icon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Âµ",
    toolCount: 17,
    subcategories: [
      { name: "Setlist Optimization", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã¢â‚¬Â¹", website: "" },
      { name: "Sound Engineering", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ…Â ", website: "" },
      { name: "Lighting Design", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â¡", website: "" },
      { name: "Audience Engagement", favicon: "👥", website: "" },
      { name: "Ticket Management", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â«", website: "" },
    ]
  },
  {
    name: "AI for Festivals",
    icon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã¢â‚¬Â°",
    toolCount: 19,
    subcategories: [
      { name: "Festival Planning", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã¢â‚¬Â¹", website: "" },
      { name: "Artist Booking", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â­", website: "" },
      { name: "Crowd Management", favicon: "👥", website: "" },
      { name: "Experience Design", favicon: "ÃƒÂ¢Ã…â€œÃ‚Â¨", website: "" },
      { name: "Safety Monitoring", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂºÃ‚Â¡ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
    ]
  },
  {
    name: "AI for Sports Events",
    icon: "⚽",
    toolCount: 20,
    subcategories: [
      { name: "Event Management", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã¢â‚¬Â¹", website: "" },
      { name: "Performance Analytics", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
      { name: "Fan Engagement", favicon: "👥", website: "" },
      { name: "Broadcast Enhancement", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Âº", website: "" },
      { name: "Safety Systems", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂºÃ‚Â¡ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
    ]
  },
  {
    name: "AI for Conferences",
    icon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¤",
    toolCount: 18,
    subcategories: [
      { name: "Speaker Matching", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â­", website: "" },
      { name: "Session Planning", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã¢â‚¬Â¦", website: "" },
      { name: "Networking Facilitation", favicon: "Ã°Å¸Â¤Â", website: "" },
      { name: "Content Curation", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â¡", website: "" },
      { name: "Attendee Experience", favicon: "ÃƒÂ°Ã…Â¸Ã‹Å“Ã…Â ", website: "" },
    ]
  },
  {
    name: "AI for Trade Shows",
    icon: "ÃƒÂ°Ã…Â¸Ã‚ÂÃ‚Âª",
    toolCount: 16,
    subcategories: [
      { name: "Exhibit Planning", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã¢â‚¬Â¹", website: "" },
      { name: "Lead Generation", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¯", website: "" },
      { name: "Booth Design", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¨", website: "" },
      { name: "Visitor Analytics", favicon: "👥", website: "" },
      { name: "Follow-up Management", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â§", website: "" },
    ]
  },
  {
    name: "AI for Exhibitions",
    icon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â€œÃ‚Â¼ÃƒÂ¯Ã‚Â¸Ã‚Â",
    toolCount: 15,
    subcategories: [
      { name: "Curation Assistance", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¨", website: "" },
      { name: "Visitor Experience", favicon: "ÃƒÂ°Ã…Â¸Ã‹Å“Ã…Â ", website: "" },
      { name: "Art Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â", website: "" },
      { name: "Educational Content", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã¢â‚¬Å“", website: "" },
      { name: "Digital Integration", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â»", website: "" },
    ]
  },
  {
    name: "AI for Performance Arts",
    icon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â­",
    toolCount: 19,
    subcategories: [
      { name: "Performance Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
      { name: "Choreography Assistance", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã†â€™", website: "" },
      { name: "Training Optimization", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¯", website: "" },
      { name: "Audience Engagement", favicon: "👥", website: "" },
      { name: "Technical Production", favicon: "ÃƒÂ¢Ã…Â¡Ã¢â€žÂ¢ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
    ]
  },
  {
    name: "AI for Comedy",
    icon: "ÃƒÂ°Ã…Â¸Ã‹Å“Ã¢â‚¬Å¡",
    toolCount: 13,
    subcategories: [
      { name: "Joke Generation", favicon: "ÃƒÂ°Ã…Â¸Ã‹Å“Ã¢â‚¬Å¾", website: "" },
      { name: "Timing Analysis", favicon: "ÃƒÂ¢Ã‚ÂÃ‚Â°", website: "" },
      { name: "Audience Response", favicon: "👥", website: "" },
      { name: "Content Curation", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â¡", website: "" },
      { name: "Performance Coaching", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â­", website: "" },
    ]
  },
  {
    name: "AI for Magic",
    icon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â©",
    toolCount: 11,
    subcategories: [
      { name: "Illusion Design", favicon: "ÃƒÂ¢Ã…â€œÃ‚Â¨", website: "" },
      { name: "Performance Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
      { name: "Audience Engagement", favicon: "👥", website: "" },
      { name: "Effect Creation", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â­", website: "" },
      { name: "Practice Optimization", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¯", website: "" },
    ]
  },
  {
    name: "AI for Circus Arts",
    icon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Âª",
    toolCount: 12,
    subcategories: [
      { name: "Performance Planning", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã¢â‚¬Â¹", website: "" },
      { name: "Safety Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂºÃ‚Â¡ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Skill Development", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¯", website: "" },
      { name: "Choreography", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã†â€™", website: "" },
      { name: "Technical Effects", favicon: "ÃƒÂ¢Ã…â€œÃ‚Â¨", website: "" },
    ]
  },
  {
    name: "AI for Street Performance",
    icon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â­",
    toolCount: 10,
    subcategories: [
      { name: "Location Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â€Ã‚ÂºÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Audience Building", favicon: "👥", website: "" },
      { name: "Performance Optimization", favicon: "ÃƒÂ¢Ã‚Â­Ã‚Â", website: "" },
      { name: "Crowd Management", favicon: "👥", website: "" },
      { name: "Revenue Tracking", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â°", website: "" },
    ]
  },
  {
    name: "AI for Immersive Experiences",
    icon: "ÃƒÂ°Ã…Â¸Ã‚Â¥Ã‚Â½",
    toolCount: 22,
    subcategories: [
      { name: "VR Development", favicon: "ÃƒÂ°Ã…Â¸Ã‚Â¥Ã‚Â½", website: "" },
      { name: "AR Applications", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â±", website: "" },
      { name: "Mixed Reality", favicon: "ÃƒÂ°Ã…Â¸Ã…â€™Ã‚Â", website: "" },
      { name: "Haptic Feedback", favicon: "ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¹", website: "" },
      { name: "Spatial Computing", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â€Ã‚ÂºÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
    ]
  },
  {
    name: "AI for Virtual Reality",
    icon: "ÃƒÂ°Ã…Â¸Ã‚Â¥Ã‚Â½",
    toolCount: 24,
    subcategories: [
      { name: "World Building", favicon: "ÃƒÂ°Ã…Â¸Ã…â€™Ã‚Â", website: "" },
      { name: "Character Animation", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â­", website: "" },
      { name: "Interaction Design", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â®", website: "" },
      { name: "Motion Tracking", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¯", website: "" },
      { name: "User Experience", favicon: "ÃƒÂ°Ã…Â¸Ã‹Å“Ã…Â ", website: "" },
    ]
  },
  {
    name: "AI for Augmented Reality",
    icon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â±",
    toolCount: 21,
    subcategories: [
      { name: "Object Recognition", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¯", website: "" },
      { name: "Overlay Design", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¨", website: "" },
      { name: "Spatial Mapping", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â€Ã‚ÂºÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "User Interaction", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ËœÃ¢â‚¬Â ", website: "" },
      { name: "Content Creation", favicon: "✍️", website: "" },
    ]
  },
  {
    name: "AI for Mixed Reality",
    icon: "ÃƒÂ°Ã…Â¸Ã…â€™Ã‚Â",
    toolCount: 18,
    subcategories: [
      { name: "Environment Integration", favicon: "🏢", website: "" },
      { name: "Object Manipulation", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â®", website: "" },
      { name: "Spatial Computing", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â€Ã‚ÂºÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Multi-user Interaction", favicon: "👥", website: "" },
      { name: "Real-time Rendering", favicon: "ÃƒÂ¢Ã…Â¡Ã‚Â¡", website: "" },
    ]
  },
  {
    name: "AI for Haptics",
    icon: "ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¹",
    toolCount: 15,
    subcategories: [
      { name: "Texture Simulation", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¨", website: "" },
      { name: "Force Feedback", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Âª", website: "" },
      { name: "Touch Recognition", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ËœÃ¢â‚¬Â ", website: "" },
      { name: "Vibration Patterns", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â³", website: "" },
      { name: "User Interface", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â®", website: "" },
    ]
  },
  {
    name: "AI for Spatial Computing",
    icon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â€Ã‚ÂºÃƒÂ¯Ã‚Â¸Ã‚Â",
    toolCount: 19,
    subcategories: [
      { name: "3D Mapping", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â€Ã‚ÂºÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Spatial Audio", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ…Â ", website: "" },
      { name: "Gesture Recognition", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ËœÃ¢â‚¬Â¹", website: "" },
      { name: "Environment Understanding", favicon: "ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Â ", website: "" },
      { name: "User Interfaces", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â®", website: "" },
    ]
  },
  {
    name: "AI for Digital Twins",
    icon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ¢â‚¬Å¾",
    toolCount: 20,
    subcategories: [
      { name: "Model Creation", favicon: "ÃƒÂ°Ã…Â¸Ã‚ÂÃ¢â‚¬â€ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Real-time Synchronization", favicon: "ÃƒÂ¢Ã…Â¡Ã‚Â¡", website: "" },
      { name: "Predictive Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â®", website: "" },
      { name: "Simulation Testing", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â®", website: "" },
      { name: "Optimization", favicon: "ÃƒÂ¢Ã…Â¡Ã¢â€žÂ¢ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
    ]
  },
  {
    name: "AI for Simulation",
    icon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â®",
    toolCount: 26,
    subcategories: [
      { name: "Physics Simulation", favicon: "ÃƒÂ¢Ã…Â¡Ã¢â‚¬ÂºÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Weather Modeling", favicon: "ÃƒÂ°Ã…Â¸Ã…â€™Ã‚Â¤ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Traffic Simulation", favicon: "🚗", website: "" },
      { name: "Economic Modeling", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â°", website: "" },
      { name: "Training Scenarios", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã¢â‚¬Å“", website: "" },
    ]
  },
  {
    name: "AI for Modeling",
    icon: "ÃƒÂ°Ã…Â¸Ã‚ÂÃ¢â‚¬â€ÃƒÂ¯Ã‚Â¸Ã‚Â",
    toolCount: 23,
    subcategories: [
      { name: "3D Modeling", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¨", website: "" },
      { name: "Predictive Modeling", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‹â€ ", website: "" },
      { name: "Statistical Modeling", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
      { name: "System Modeling", favicon: "ÃƒÂ¢Ã…Â¡Ã¢â€žÂ¢ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Data Modeling", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â¾", website: "" },
    ]
  },
  {
    name: "AI for Animation",
    icon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¬",
    toolCount: 22,
    subcategories: [
      { name: "Character Animation", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â­", website: "" },
      { name: "Motion Capture", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â¹", website: "" },
      { name: "Facial Animation", favicon: "ÃƒÂ°Ã…Â¸Ã‹Å“Ã…Â ", website: "" },
      { name: "Physics Simulation", favicon: "ÃƒÂ¢Ã…Â¡Ã¢â‚¬ÂºÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Rendering Optimization", favicon: "ÃƒÂ¢Ã…Â¡Ã‚Â¡", website: "" },
    ]
  },
  {
    name: "AI for Visual Effects",
    icon: "ÃƒÂ¢Ã…â€œÃ‚Â¨",
    toolCount: 24,
    subcategories: [
      { name: "Particle Systems", favicon: "ÃƒÂ¢Ã…â€œÃ‚Â¨", website: "" },
      { name: "Lighting Simulation", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â¡", website: "" },
      { name: "Compositing", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¨", website: "" },
      { name: "Color Grading", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¨", website: "" },
      { name: "Motion Graphics", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¬", website: "" },
    ]
  },
  {
    name: "AI for Sound Design",
    icon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ…Â ",
    toolCount: 19,
    subcategories: [
      { name: "Audio Generation", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Âµ", website: "" },
      { name: "Spatial Audio", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ…Â ", website: "" },
      { name: "Noise Reduction", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ¢â‚¬Â¡", website: "" },
      { name: "Voice Synthesis", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¤", website: "" },
      { name: "Music Composition", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¼", website: "" },
    ]
  },
  {
    name: "AI for Game Development",
    icon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â®",
    toolCount: 28,
    subcategories: [
      { name: "Game Design", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¨", website: "" },
      { name: "Level Creation", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â€Ã‚ÂºÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Character AI", favicon: "ÃƒÂ°Ã…Â¸Ã‚Â¤Ã¢â‚¬â€œ", website: "" },
      { name: "Physics Engines", favicon: "ÃƒÂ¢Ã…Â¡Ã¢â‚¬ÂºÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Player Analytics", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
    ]
  },
  {
    name: "AI for Esports",
    icon: "ÃƒÂ°Ã…Â¸Ã‚ÂÃ¢â‚¬Â ",
    toolCount: 21,
    subcategories: [
      { name: "Match Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
      { name: "Player Performance", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‹â€ ", website: "" },
      { name: "Strategy Development", favicon: "ÃƒÂ¢Ã¢â€žÂ¢Ã…Â¸ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Tournament Management", favicon: "ÃƒÂ°Ã…Â¸Ã‚ÂÃ¢â‚¬Â ", website: "" },
      { name: "Broadcast Enhancement", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Âº", website: "" },
    ]
  },
  {
    name: "AI for Game Streaming",
    icon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â¹",
    toolCount: 16,
    subcategories: [
      { name: "Stream Optimization", favicon: "ÃƒÂ¢Ã…Â¡Ã‚Â¡", website: "" },
      { name: "Content Moderation", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂºÃ‚Â¡ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Audience Engagement", favicon: "👥", website: "" },
      { name: "Quality Enhancement", favicon: "ÃƒÂ¢Ã‚Â­Ã‚Â", website: "" },
      { name: "Monetization", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â°", website: "" },
    ]
  },
  {
    name: "AI for Virtual Worlds",
    icon: "ÃƒÂ°Ã…Â¸Ã…â€™Ã‚Â",
    toolCount: 20,
    subcategories: [
      { name: "World Building", favicon: "ÃƒÂ°Ã…Â¸Ã‚ÂÃ¢â‚¬â€ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Economy Systems", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â°", website: "" },
      { name: "Social Interaction", favicon: "👥", website: "" },
      { name: "Content Moderation", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂºÃ‚Â¡ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "User Analytics", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
    ]
  },
  {
    name: "AI for Metaverse",
    icon: "ÃƒÂ°Ã…Â¸Ã…â€™Ã‚Â",
    toolCount: 23,
    subcategories: [
      { name: "Avatar Creation", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ËœÃ‚Â¤", website: "" },
      { name: "Virtual Real Estate", favicon: "🏢", website: "" },
      { name: "Digital Fashion", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ËœÃ¢â‚¬â€", website: "" },
      { name: "Social Platforms", favicon: "👥", website: "" },
      { name: "Economic Systems", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â°", website: "" },
    ]
  },
  {
    name: "AI for Digital Fashion",
    icon: "👗",
    toolCount: 17,
    subcategories: [
      { name: "Virtual Try-on", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ËœÃ¢â‚¬â€", website: "" },
      { name: "Design Generation", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¨", website: "" },
      { name: "Market Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
      { name: "Trend Prediction", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‹â€ ", website: "" },
      { name: "Sustainability Metrics", favicon: "ÃƒÂ°Ã…Â¸Ã…â€™Ã‚Â", website: "" },
    ]
  },
  {
    name: "AI for Virtual Influencers",
    icon: "ÃƒÂ¢Ã‚Â­Ã‚Â",
    toolCount: 14,
    subcategories: [
      { name: "Character Creation", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â­", website: "" },
      { name: "Content Generation", favicon: "✍️", website: "" },
      { name: "Audience Engagement", favicon: "👥", website: "" },
      { name: "Brand Partnerships", favicon: "Ã°Å¸Â¤Â", website: "" },
      { name: "Performance Analytics", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
    ]
  },
  {
    name: "AI for Digital Art",
    icon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¨",
    toolCount: 25,
    subcategories: [
      { name: "Generative Art", favicon: "ÃƒÂ¢Ã…â€œÃ‚Â¨", website: "" },
      { name: "Style Transfer", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â­", website: "" },
      { name: "Art Authentication", favicon: "ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦", website: "" },
      { name: "Market Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
      { name: "Creative Tools", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂºÃ‚Â ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
    ]
  },
  {
    name: "AI for Collectibles",
    icon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â¦",
    toolCount: 18,
    subcategories: [
      { name: "Digital Collectibles", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã…Â½", website: "" },
      { name: "Authentication", favicon: "ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦", website: "" },
      { name: "Valuation Models", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â°", website: "" },
      { name: "Market Platforms", favicon: "ÃƒÂ°Ã…Â¸Ã‚ÂÃ‚Âª", website: "" },
      { name: "Collection Management", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã¢â‚¬Â¹", website: "" },
    ]
  },
  {
    name: "AI for Digital Identity",
    icon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ËœÃ‚Â¤",
    toolCount: 20,
    subcategories: [
      { name: "Identity Verification", favicon: "ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦", website: "" },
      { name: "Privacy Protection", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ¢â‚¬â„¢", website: "" },
      { name: "Reputation Systems", favicon: "ÃƒÂ¢Ã‚Â­Ã‚Â", website: "" },
      { name: "Digital Passports", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂºÃ¢â‚¬Å¡", website: "" },
      { name: "Biometric Security", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ËœÃ‚ÂÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
    ]
  },
  {
    name: "AI for Digital Rights",
    icon: "⚖️",
    toolCount: 16,
    subcategories: [
      { name: "Copyright Management", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…â€œ", website: "" },
      { name: "Licensing Systems", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã¢â‚¬Â¹", website: "" },
      { name: "Royalty Tracking", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â°", website: "" },
      { name: "Content Protection", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂºÃ‚Â¡ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Fair Use Analysis", favicon: "⚖️", website: "" },
    ]
  },
  {
    name: "AI for Digital Governance",
    icon: "ÃƒÂ°Ã…Â¸Ã‚ÂÃ¢â‚¬ÂºÃƒÂ¯Ã‚Â¸Ã‚Â",
    toolCount: 19,
    subcategories: [
      { name: "Policy Automation", favicon: "ÃƒÂ¢Ã…Â¡Ã¢â€žÂ¢ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Compliance Monitoring", favicon: "ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦", website: "" },
      { name: "Regulatory Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
      { name: "Risk Assessment", favicon: "ÃƒÂ¢Ã…Â¡Ã‚Â ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Audit Systems", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â", website: "" },
    ]
  },
  {
    name: "AI for Digital Ethics",
    icon: "ÃƒÂ°Ã…Â¸Ã‚Â¤Ã¢â‚¬Â",
    toolCount: 17,
    subcategories: [
      { name: "Ethical Frameworks", favicon: "⚖️", website: "" },
      { name: "Bias Detection", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â", website: "" },
      { name: "Fairness Analysis", favicon: "⚖️", website: "" },
      { name: "Transparency Tools", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â", website: "" },
      { name: "Accountability Systems", favicon: "ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦", website: "" },
    ]
  },
  {
    name: "AI for Digital Sustainability",
    icon: "ÃƒÂ°Ã…Â¸Ã…â€™Ã‚Â",
    toolCount: 21,
    subcategories: [
      { name: "Energy Optimization", favicon: "ÃƒÂ¢Ã…Â¡Ã‚Â¡", website: "" },
      { name: "Carbon Footprint", favicon: "ÃƒÂ°Ã…Â¸Ã…â€™Ã‚Â±", website: "" },
      { name: "Resource Efficiency", favicon: "ÃƒÂ¢Ã¢â€žÂ¢Ã‚Â»ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Sustainable Design", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¨", website: "" },
      { name: "Impact Measurement", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
    ]
  },
  {
    name: "AI for Digital Inclusion",
    icon: "ÃƒÂ°Ã…Â¸Ã‚Â¤Ã¢â‚¬â€",
    toolCount: 18,
    subcategories: [
      { name: "Accessibility Tools", favicon: "ÃƒÂ¢Ã¢â€žÂ¢Ã‚Â¿", website: "" },
      { name: "Language Support", favicon: "ÃƒÂ°Ã…Â¸Ã…â€™Ã‚Â", website: "" },
      { name: "Cultural Adaptation", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â­", website: "" },
      { name: "Digital Literacy", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã¢â‚¬Å“", website: "" },
      { name: "Community Building", favicon: "👥", website: "" },
    ]
  },
  {
    name: "AI for Digital Wellness",
    icon: "ÃƒÂ°Ã…Â¸Ã‹Å“Ã…Â ",
    toolCount: 19,
    subcategories: [
      { name: "Screen Time Management", favicon: "ÃƒÂ¢Ã‚ÂÃ‚Â°", website: "" },
      { name: "Digital Detox", favicon: "ÃƒÂ°Ã…Â¸Ã‚Â§Ã‹Å“", website: "" },
      { name: "Mental Health Support", favicon: "ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Â ", website: "" },
      { name: "Healthy Habits", favicon: "ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦", website: "" },
      { name: "Balance Tracking", favicon: "⚖️", website: "" },
    ]
  },
  {
    name: "AI for Digital Safety",
    icon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂºÃ‚Â¡ÃƒÂ¯Ã‚Â¸Ã‚Â",
    toolCount: 22,
    subcategories: [
      { name: "Content Filtering", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â", website: "" },
      { name: "Cyberbullying Prevention", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂºÃ‚Â¡ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Privacy Protection", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ¢â‚¬â„¢", website: "" },
      { name: "Online Safety", favicon: "ÃƒÂ°Ã…Â¸Ã…â€™Ã‚Â", website: "" },
      { name: "Emergency Response", favicon: "ÃƒÂ°Ã…Â¸Ã…Â¡Ã‚Â¨", website: "" },
    ]
  },
  {
    name: "AI for Digital Literacy",
    icon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã¢â‚¬Å“",
    toolCount: 20,
    subcategories: [
      { name: "Skill Assessment", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
      { name: "Learning Paths", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂºÃ‚Â¤ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Digital Citizenship", favicon: "👥", website: "" },
      { name: "Media Literacy", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â°", website: "" },
      { name: "Critical Thinking", favicon: "ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Â ", website: "" },
    ]
  },
  {
    name: "AI for Digital Transformation",
    icon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ¢â‚¬Å¾",
    toolCount: 24,
    subcategories: [
      { name: "Process Automation", favicon: "ÃƒÂ¢Ã…Â¡Ã¢â€žÂ¢ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Digital Strategy", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã¢â‚¬Â¹", website: "" },
      { name: "Change Management", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ¢â‚¬Å¾", website: "" },
      { name: "Innovation Integration", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â¡", website: "" },
      { name: "Performance Metrics", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
    ]
  },
  {
    name: "AI for Digital Innovation",
    icon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â¡",
    toolCount: 23,
    subcategories: [
      { name: "Idea Generation", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â­", website: "" },
      { name: "Innovation Labs", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â¬", website: "" },
      { name: "Prototype Development", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂºÃ‚Â ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Market Validation", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
      { name: "Scaling Strategies", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‹â€ ", website: "" },
    ]
  },
  {
    name: "AI for Digital Entrepreneurship",
    icon: "ÃƒÂ°Ã…Â¸Ã…Â¡Ã¢â€šÂ¬",
    toolCount: 21,
    subcategories: [
      { name: "Startup Support", favicon: "ÃƒÂ°Ã…Â¸Ã…Â¡Ã¢â€šÂ¬", website: "" },
      { name: "Business Modeling", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
      { name: "Market Research", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â", website: "" },
      { name: "Funding Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â°", website: "" },
      { name: "Growth Strategies", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‹â€ ", website: "" },
    ]
  },
  {
    name: "AI for Digital Leadership",
    icon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ËœÃ¢â‚¬Ëœ",
    toolCount: 18,
    subcategories: [
      { name: "Strategic Planning", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã¢â‚¬Â¹", website: "" },
      { name: "Team Development", favicon: "👥", website: "" },
      { name: "Decision Support", favicon: "ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Â ", website: "" },
      { name: "Change Management", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ¢â‚¬Å¾", website: "" },
      { name: "Innovation Leadership", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â¡", website: "" },
    ]
  },
  {
    name: "AI for Digital Culture",
    icon: "ÃƒÂ°Ã…Â¸Ã…â€™Ã‚Â",
    toolCount: 19,
    subcategories: [
      { name: "Cultural Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â", website: "" },
      { name: "Trend Detection", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‹â€ ", website: "" },
      { name: "Community Building", favicon: "👥", website: "" },
      { name: "Content Curation", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â¡", website: "" },
      { name: "Cultural Preservation", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂºÃ‚Â¡ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
    ]
  },
  {
    name: "AI for Digital Experience",
    icon: "ÃƒÂ¢Ã…â€œÃ‚Â¨",
    toolCount: 22,
    subcategories: [
      { name: "User Experience", favicon: "ÃƒÂ°Ã…Â¸Ã‹Å“Ã…Â ", website: "" },
      { name: "Customer Journey", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â€Ã‚ÂºÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Experience Design", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¨", website: "" },
      { name: "Personalization", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ËœÃ‚Â¤", website: "" },
      { name: "Engagement Analytics", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
    ]
  },
  {
    name: "AI for Digital Ecosystems",
    icon: "ÃƒÂ°Ã…Â¸Ã…â€™Ã‚Â",
    toolCount: 20,
    subcategories: [
      { name: "Platform Development", favicon: "ÃƒÂ°Ã…Â¸Ã‚ÂÃ¢â‚¬â€ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Ecosystem Strategy", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã¢â‚¬Â¹", website: "" },
      { name: "Partner Integration", favicon: "Ã°Å¸Â¤Â", website: "" },
      { name: "Network Effects", favicon: "ÃƒÂ°Ã…Â¸Ã…â€™Ã‚Â", website: "" },
      { name: "Value Creation", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â°", website: "" },
    ]
  },
  {
    name: "AI for Digital Infrastructure",
    icon: "ÃƒÂ°Ã…Â¸Ã‚ÂÃ¢â‚¬â€ÃƒÂ¯Ã‚Â¸Ã‚Â",
    toolCount: 21,
    subcategories: [
      { name: "Network Architecture", favicon: "ÃƒÂ°Ã…Â¸Ã…â€™Ã‚Â", website: "" },
      { name: "Cloud Management", favicon: "ÃƒÂ¢Ã‹Å“Ã‚ÂÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "Security Systems", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ¢â‚¬â„¢", website: "" },
      { name: "Scalability Planning", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‹â€ ", website: "" },
      { name: "Performance Optimization", favicon: "ÃƒÂ¢Ã…Â¡Ã‚Â¡", website: "" },
    ]
  },
  {
    name: "AI for Digital Operations",
    icon: "ÃƒÂ¢Ã…Â¡Ã¢â€žÂ¢ÃƒÂ¯Ã‚Â¸Ã‚Â",
    toolCount: 23,
    subcategories: [
      { name: "Process Automation", favicon: "ÃƒÂ°Ã…Â¸Ã‚Â¤Ã¢â‚¬â€œ", website: "" },
      { name: "Workflow Optimization", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ¢â‚¬Å¾", website: "" },
      { name: "Resource Management", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â¦", website: "" },
      { name: "Quality Control", favicon: "ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦", website: "" },
      { name: "Operational Analytics", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
    ]
  },
  {
    name: "AI for Digital Services",
    icon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂºÃ‚Â ÃƒÂ¯Ã‚Â¸Ã‚Â",
    toolCount: 24,
    subcategories: [
      { name: "Service Design", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¨", website: "" },
      { name: "Customer Support", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â¬", website: "" },
      { name: "Service Automation", favicon: "ÃƒÂ°Ã…Â¸Ã‚Â¤Ã¢â‚¬â€œ", website: "" },
      { name: "Quality Assurance", favicon: "ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦", website: "" },
      { name: "Service Analytics", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
    ]
  },
  {
    name: "AI for Digital Platforms",
    icon: "ÃƒÂ°Ã…Â¸Ã…â€™Ã‚Â",
    toolCount: 25,
    subcategories: [
      { name: "Platform Strategy", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã¢â‚¬Â¹", website: "" },
      { name: "User Management", favicon: "👥", website: "" },
      { name: "Content Management", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â¡", website: "" },
      { name: "Monetization Models", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â°", website: "" },
      { name: "Platform Analytics", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
    ]
  },
  {
    name: "AI for Digital Products",
    icon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â¦",
    toolCount: 22,
    subcategories: [
      { name: "Product Development", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂºÃ‚Â ÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
      { name: "User Research", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â", website: "" },
      { name: "Product Analytics", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
      { name: "Feature Prioritization", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã¢â‚¬Â¹", website: "" },
      { name: "Product Strategy", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‹â€ ", website: "" },
    ]
  },
  {
    name: "AI for Digital Solutions",
    icon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â¡",
    toolCount: 21,
    subcategories: [
      { name: "Solution Design", favicon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¨", website: "" },
      { name: "Problem Analysis", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â", website: "" },
      { name: "Implementation Planning", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã¢â‚¬Â¹", website: "" },
      { name: "Solution Testing", favicon: "ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Âª", website: "" },
      { name: "Impact Measurement", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â ", website: "" },
    ]
  },
  {
    name: "AI for Digital Transformation",
    icon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ¢â‚¬Å¾",
    toolCount: 24,
    subcategories: [
      { name: "Transformation Strategy", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã¢â‚¬Â¹", website: "" },
      { name: "Digital Readiness", favicon: "ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦", website: "" },
      { name: "Change Management", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ¢â‚¬Å¾", website: "" },
      { name: "Innovation Integration", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â¡", website: "" },
      { name: "Success Metrics", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‹â€ ", website: "" },
    ]
  },
  {
    name: "AI for Digital Future",
    icon: "ÃƒÂ°Ã…Â¸Ã…Â¡Ã¢â€šÂ¬",
    toolCount: 20,
    subcategories: [
      { name: "Future Scenarios", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â®", website: "" },
      { name: "Technology Trends", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‹â€ ", website: "" },
      { name: "Innovation Forecasting", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â", website: "" },
      { name: "Strategic Planning", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã¢â‚¬Â¹", website: "" },
      { name: "Vision Development", favicon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ËœÃ‚ÂÃƒÂ¯Ã‚Â¸Ã‚Â", website: "" },
    ]
  }
];

interface Category {
  name: string;
  icon: string;
  toolCount: number;
  subcategories: Array<{
    name: string;
    favicon: string;
    website: string;
  }>;
}

export default function AIToolsHome() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  
  // Available filters
  const availableFilters = ['Trending', 'New', 'Most Used', 'Free'];
  
  // Filter categories based on search query and selected filters
  const filteredCategories = categories.filter(category => {
    const matchesSearch = 
      category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.subcategories.some(sub => 
        sub.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    
    // In a real app, you would implement filter logic here
    // For now, we'll just return all categories that match the search
    return matchesSearch;
  });
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15
      }
    },
    hover: {
      y: -5,
      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-6 sm:p-8">
      <Head>
        <title>AI Tools Directory | Find the Best AI Solutions</title>
        <meta name="description" content="Browse our comprehensive collection of AI tools organized by categories. Discover the best AI solutions for your needs." />
      </Head>
      
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            AI Tools Directory
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Discover the most powerful AI tools, organized by category. Find the perfect solution for your needs.
          </motion.p>
        </div>

        {/* Search and Filter Bar */}
        <motion.div 
          className="mb-12 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search categories..."
              className="block w-full pl-10 pr-3 py-3 border border-gray-700 rounded-lg bg-gray-800/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex flex-wrap gap-3 mt-4 justify-center">
            {availableFilters.map((filter) => (
              <button
                key={filter}
                onClick={() => {
                  setSelectedFilters(prev => 
                    prev.includes(filter) 
                      ? prev.filter(f => f !== filter)
                      : [...prev, filter]
                  );
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedFilters.includes(filter)
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/20'
                    : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/70'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Categories Grid */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="show"
          layout
        >
          {filteredCategories.map((category, index) => (
            <motion.div
              key={category.name}
              variants={itemVariants}
              whileHover={{ 
                y: -5,
                boxShadow: '0 25px 50px -12px rgba(168, 85, 247, 0.25)'
              }}
              className="h-full"
              layout
            >
              <Link 
                href={`/ai-tools/${encodeURIComponent(category.name.toLowerCase().replace(/\s+/g, '-'))}`}
                className="block h-full"
                legacyBehavior
              >
                <GlassCard className="p-6 h-full flex flex-col hover:bg-white/10 transition-all duration-300 group border border-transparent hover:border-purple-500/30">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-4xl transform group-hover:scale-110 transition-transform">
                      {category.icon}
                    </div>
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                      <FiArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-400 mb-4">
                    {category.toolCount}+ AI Tools
                  </p>
                  <div className="mt-auto">
                    <div className="flex flex-wrap gap-2">
                      {category.subcategories.slice(0, 3).map((subcategory, i) => (
                        <span 
                          key={i}
                          className="inline-block px-2.5 py-1 text-xs font-medium rounded-full bg-gray-800/70 text-gray-300 group-hover:bg-purple-900/30 group-hover:text-purple-300 transition-all duration-200"
                        >
                          {subcategory.name}
                        </span>
                      ))}
                      {category.subcategories.length > 3 && (
                        <span className="inline-flex items-center justify-center w-6 h-6 text-xs rounded-full bg-gray-800/50 text-gray-400 group-hover:bg-purple-900/30 group-hover:text-purple-300 transition-colors">
                          +{category.subcategories.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                </GlassCard>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      {/* Empty State */}
      {filteredCategories.length === 0 && (
        <div className="text-center py-16">
          <div className="text-5xl mb-4">ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â</div>
          <h3 className="text-2xl font-semibold text-gray-200 mb-2">No categories found</h3>
          <p className="text-gray-400 mb-6">Try adjusting your search or filters</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedFilters([]);
            }}
            className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:opacity-90 transition-all"
          >
            Clear all filters
          </button>
        </div>
      )}
      </div>
  );
}







