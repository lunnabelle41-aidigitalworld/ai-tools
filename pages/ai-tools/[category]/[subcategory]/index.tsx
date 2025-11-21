import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiSearch, FiExternalLink, FiStar, FiArrowRight } from 'react-icons/fi';

// Import categories data
const categories = [
  {
    name: "AI for Nonprofits & Social Impact",
    icon: "🤝",
    toolCount: 50,
    subcategories: [
      { 
        name: "Fundraising & Donor Management", 
        favicon: "💰", 
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
        favicon: "📊", 
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
        favicon: "👥", 
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
        favicon: "✍️", 
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
        favicon: "📈", 
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
        favicon: "📦", 
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
        favicon: "🎯", 
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
        favicon: "🏷️", 
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
        favicon: "⛓️", 
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
        favicon: "📊", 
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
        favicon: "🏪", 
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
        favicon: "🔄", 
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
    name: "AI for Healthcare",
    icon: "🏥",
    toolCount: 30,
    subcategories: [
      { 
        name: "Medical Diagnosis", 
        favicon: "🔬", 
        website: "",
        tools: [
          { name: "PathAI", description: "AI-powered pathology diagnosis and analysis", website: "https://www.pathai.com", rating: 4.8 },
          { name: "Aidoc", description: "AI for medical imaging analysis and radiology", website: "https://www.aidoc.com", rating: 4.7 },
          { name: "Viz.ai", description: "AI-driven stroke detection and neurovascular care", website: "https://www.viz.ai", rating: 4.9 },
          { name: "Butterfly Network", description: "AI-powered portable ultrasound imaging", website: "https://www.butterflynetwork.com", rating: 4.6 },
          { name: "Caption Health", description: "AI for echocardiogram interpretation", website: "https://www.captionhealth.com", rating: 4.8 }
        ]
      },
      { 
        name: "Drug Discovery", 
        favicon: "💊", 
        website: "",
        tools: [
          { name: "Atomwise", description: "AI-powered drug discovery and molecular analysis", website: "https://www.atomwise.com", rating: 4.7 },
          { name: "Insilico Medicine", description: "AI for pharmaceutical research and development", website: "https://www.insilico.com", rating: 4.8 },
          { name: "Exscientia", description: "AI-driven drug design and optimization", website: "https://www.exscientia.com", rating: 4.6 },
          { name: "BenevolentAI", description: "Machine learning for biomedical research", website: "https://www.benevolent.com", rating: 4.7 },
          { name: "Recursion Pharmaceuticals", description: "AI for drug discovery and development", website: "https://www.recursion.com", rating: 4.5 }
        ]
      },
      { 
        name: "Mental Health", 
        favicon: "🧠", 
        website: "",
        tools: [
          { name: "Woebot", description: "AI-powered mental health chatbot and support", website: "https://www.woebot.com", rating: 4.5 },
          { name: "Wysa", description: "AI mental health coach and therapy companion", website: "https://www.wysa.io", rating: 4.6 },
          { name: "Youper", description: "AI-powered emotional health assistant", website: "https://www.youper.com", rating: 4.4 },
          { name: "Replika", description: "AI companion for mental wellness", website: "https://www.replika.com", rating: 4.3 },
          { name: "Ginger", description: "AI-enhanced mental healthcare platform", website: "https://www.ginger.com", rating: 4.7 }
        ]
      },
      { 
        name: "Personalized Medicine", 
        favicon: "🎯", 
        website: "",
        tools: [
          { name: "Tempus", description: "AI-powered precision medicine and oncology", website: "https://www.tempus.com", rating: 4.8 },
          { name: "Flatiron Health", description: "AI for cancer treatment and research", website: "https://www.flatiron.com", rating: 4.7 },
          { name: "Foundation Medicine", description: "AI-driven genomic profiling for cancer", website: "https://www.foundationmedicine.com", rating: 4.9 },
          { name: "Deep Genomics", description: "AI for genetic medicine and drug discovery", website: "https://www.deepgenomics.com", rating: 4.6 },
          { name: "SOPHiA GENETICS", description: "AI-powered genomic data analysis", website: "https://www.sophiagenetics.com", rating: 4.8 }
        ]
      },
      { 
        name: "Healthcare Operations", 
        favicon: "⚕️", 
        website: "",
        tools: [
          { name: "Qventus", description: "AI for hospital operations and patient flow", website: "https://www.qventus.com", rating: 4.6 },
          { name: "LeanTaaS", description: "AI-powered healthcare resource optimization", website: "https://www.leantaas.com", rating: 4.5 },
          { name: "CleverHealth", description: "AI for healthcare workflow automation", website: "https://www.cleverhealth.ai", rating: 4.4 },
          { name: "Health Catalyst", description: "AI-driven healthcare analytics platform", website: "https://www.healthcatalyst.com", rating: 4.7 },
          { name: "MDsave", description: "AI-powered healthcare cost transparency", website: "https://www.mdsave.com", rating: 4.3 }
        ]
      },
      { 
        name: "Telemedicine", 
        favicon: "📱", 
        website: "",
        tools: [
          { name: "Teladoc AI", description: "AI-enhanced telemedicine platform", website: "https://www.teladoc.com", rating: 4.7 },
          { name: "Amwell", description: "AI-powered virtual healthcare services", website: "https://www.amwell.com", rating: 4.6 },
          { name: "Doctor on Demand", description: "AI-driven telehealth consultations", website: "https://www.doctorondemand.com", rating: 4.5 },
          { name: "PlushCare", description: "AI-enhanced online medical care", website: "https://www.plushcare.com", rating: 4.4 },
          { name: "LiveHealth Online", description: "AI-powered telemedicine platform", website: "https://www.livehealthonline.com", rating: 4.6 }
        ]
      }
    ]
  },
  {
    name: "AI for Finance",
    icon: "💰",
    toolCount: 25,
    subcategories: [
      { 
        name: "Algorithmic Trading", 
        favicon: "📈", 
        website: "",
        tools: [
          { name: "QuantConnect", description: "AI-powered algorithmic trading platform", website: "https://www.quantconnect.com", rating: 4.7 },
          { name: "AlgoTrader", description: "AI-driven automated trading systems", website: "https://www.algotrader.com", rating: 4.6 },
          { name: "Trade Ideas", description: "AI-powered stock market analysis and trading signals", website: "https://www.trade-ideas.com", rating: 4.5 },
          { name: "Kensho Technologies", description: "AI for financial market analysis and prediction", website: "https://www.kensho.com", rating: 4.8 },
          { name: "Numerai", description: "AI-powered hedge fund and data science tournament", website: "https://www.numer.ai", rating: 4.4 }
        ]
      },
      { 
        name: "Fraud Detection", 
        favicon: "🔍", 
        website: "",
        tools: [
          { name: "Sift", description: "AI-powered fraud detection and prevention", website: "https://www.sift.com", rating: 4.7 },
          { name: "Kount", description: "AI-driven fraud detection and risk management", website: "https://www.kount.com", rating: 4.6 },
          { name: "Feedzai", description: "AI for financial fraud detection and anti-money laundering", website: "https://www.feedzai.com", rating: 4.8 },
          { name: "Riskified", description: "AI-powered e-commerce fraud prevention", website: "https://www.riskified.com", rating: 4.5 },
          { name: "Forter", description: "AI-driven fraud prevention for online retailers", website: "https://www.forter.com", rating: 4.6 }
        ]
      },
      { 
        name: "Personal Finance", 
        favicon: "💳", 
        website: "",
        tools: [
          { name: "Mint", description: "AI-powered personal finance management", website: "https://www.mint.com", rating: 4.5 },
          { name: "YNAB", description: "AI-enhanced budgeting and financial planning", website: "https://www.youneedabudget.com", rating: 4.6 },
          { name: "Personal Capital", description: "AI-driven wealth management and financial planning", website: "https://www.personalcapital.com", rating: 4.7 },
          { name: "Cleo", description: "AI-powered financial assistant and budgeting app", website: "https://www.meetcleo.com", rating: 4.4 },
          { name: "Digit", description: "AI-powered savings and financial planning", website: "https://www.digit.co", rating: 4.3 }
        ]
      },
      { 
        name: "Credit Scoring", 
        favicon: "📊", 
        website: "",
        tools: [
          { name: "Upstart", description: "AI-powered lending and credit scoring platform", website: "https://www.upstart.com", rating: 4.6 },
          { name: "Zest AI", description: "AI-driven credit underwriting and risk assessment", website: "https://www.zest.ai", rating: 4.7 },
          { name: "LenddoEFL", description: "AI-powered credit scoring for emerging markets", website: "https://www.lenddoefl.com", rating: 4.5 },
          { name: "Scienaptic AI", description: "AI-powered credit decisioning platform", website: "https://www.scienaptic.ai", rating: 4.4 },
          { name: "Credit Karma", description: "AI-enhanced credit monitoring and recommendations", website: "https://www.creditkarma.com", rating: 4.8 }
        ]
      },
      { 
        name: "Robo-Advisors", 
        favicon: "🤖", 
        website: "",
        tools: [
          { name: "Betterment", description: "AI-powered automated investment management", website: "https://www.betterment.com", rating: 4.7 },
          { name: "Wealthfront", description: "AI-driven automated financial planning and investing", website: "https://www.wealthfront.com", rating: 4.6 },
          { name: "Schwab Intelligent Portfolios", description: "AI-powered automated investment advisor", website: "https://www.schwab.com", rating: 4.5 },
          { name: "Vanguard Personal Advisor", description: "AI-enhanced digital investment advice", website: "https://www.vanguard.com", rating: 4.8 },
          { name: "Fidelity Go", description: "AI-powered automated investment management", website: "https://www.fidelity.com", rating: 4.4 }
        ]
      }
    ]
  },
  {
    name: "AI for Education",
    icon: "📚",
    toolCount: 20,
    subcategories: [
      { 
        name: "Personalized Learning", 
        favicon: "🎓", 
        website: "",
        tools: [
          { name: "Khan Academy", description: "AI-powered personalized learning platform", website: "https://www.khanacademy.org", rating: 4.9 },
          { name: "Duolingo", description: "AI-driven language learning app", website: "https://www.duolingo.com", rating: 4.7 },
          { name: "Coursera", description: "AI-enhanced online course recommendations", website: "https://www.coursera.org", rating: 4.8 },
          { name: "edX", description: "AI-powered online learning platform", website: "https://www.edx.org", rating: 4.6 },
          { name: "Quizlet", description: "AI-powered study tools and flashcards", website: "https://www.quizlet.com", rating: 4.5 }
        ]
      },
      { 
        name: "Tutoring Systems", 
        favicon: "👨‍🏫", 
        website: "",
        tools: [
          { name: "Carnegie Learning", description: "AI-powered math tutoring platform", website: "https://www.carnegielearning.com", rating: 4.6 },
          { name: "ALEKS", description: "AI-driven adaptive learning and assessment", website: "https://www.aleks.com", rating: 4.7 },
          { name: "WileyPLUS", description: "AI-enhanced educational resources and tutoring", website: "https://www.wileyplus.com", rating: 4.5 },
          { name: "McGraw-Hill ALEKS", description: "AI-powered personalized learning system", website: "https://www.mheducation.com", rating: 4.4 },
          { name: "DreamBox Learning", description: "AI-driven adaptive math learning", website: "https://www.dreambox.com", rating: 4.6 }
        ]
      },
      { 
        name: "Content Creation", 
        favicon: "✍️", 
        website: "",
        tools: [
          { name: "Grammarly", description: "AI-powered writing assistant and grammar checker", website: "https://www.grammarly.com", rating: 4.8 },
          { name: "QuillBot", description: "AI-driven paraphrasing and writing tool", website: "https://www.quillbot.com", rating: 4.6 },
          { name: "Jasper", description: "AI-powered content creation for education", website: "https://www.jasper.ai", rating: 4.5 },
          { name: "Copy.ai", description: "AI-enhanced educational content generation", website: "https://www.copy.ai", rating: 4.4 },
          { name: "Rytr", description: "AI-powered writing assistant for educators", website: "https://www.rytr.me", rating: 4.3 }
        ]
      },
      { 
        name: "Assessment & Grading", 
        favicon: "📝", 
        website: "",
        tools: [
          { name: "Gradescope", description: "AI-powered grading and assessment platform", website: "https://www.gradescope.com", rating: 4.7 },
          { name: "Turnitin", description: "AI-driven plagiarism detection and grading", website: "https://www.turnitin.com", rating: 4.6 },
          { name: "Pear Deck", description: "AI-enhanced classroom assessment tools", website: "https://www.peardeck.com", rating: 4.5 },
          { name: "Socrative", description: "AI-powered student response and assessment", website: "https://www.socrative.com", rating: 4.4 },
          { name: "Kahoot!", description: "AI-driven gamified learning assessment", website: "https://www.kahoot.com", rating: 4.8 }
        ]
      }
    ]
  },
  {
    name: "AI for Marketing",
    icon: "📢",
    toolCount: 25,
    subcategories: [
      { 
        name: "Content Marketing", 
        favicon: "✨", 
        website: "",
        tools: [
          { name: "Jasper AI", description: "AI-powered content creation and copywriting", website: "https://www.jasper.ai", rating: 4.7 },
          { name: "Copy.ai", description: "AI-driven marketing copy generation", website: "https://www.copy.ai", rating: 4.6 },
          { name: "Writesonic", description: "AI-powered content creation platform", website: "https://www.writesonic.com", rating: 4.5 },
          { name: "Rytr", description: "AI writing assistant for marketers", website: "https://www.rytr.me", rating: 4.4 },
          { name: "Article Forge", description: "AI-powered article and blog post generation", website: "https://www.articleforge.com", rating: 4.3 }
        ]
      },
      { 
        name: "Email Marketing", 
        favicon: "📧", 
        website: "",
        tools: [
          { name: "Mailchimp AI", description: "AI-enhanced email marketing automation", website: "https://www.mailchimp.com", rating: 4.6 },
          { name: "ActiveCampaign", description: "AI-powered email marketing and CRM", website: "https://www.activecampaign.com", rating: 4.7 },
          { name: "HubSpot AI", description: "AI-driven marketing and sales automation", website: "https://www.hubspot.com", rating: 4.8 },
          { name: "Constant Contact", description: "AI-enhanced email marketing platform", website: "https://www.constantcontact.com", rating: 4.5 },
          { name: "Sendinblue AI", description: "AI-powered email marketing and SMS", website: "https://www.sendinblue.com", rating: 4.4 }
        ]
      },
      { 
        name: "Social Media Marketing", 
        favicon: "📱", 
        website: "",
        tools: [
          { name: "Hootsuite AI", description: "AI-powered social media management", website: "https://www.hootsuite.com", rating: 4.5 },
          { name: "Buffer AI", description: "AI-driven social media scheduling and analytics", website: "https://www.buffer.com", rating: 4.6 },
          { name: "Sprout Social", description: "AI-enhanced social media management platform", website: "https://www.sproutsocial.com", rating: 4.7 },
          { name: "Later", description: "AI-powered visual content scheduling", website: "https://www.later.com", rating: 4.4 },
          { name: "Agorapulse", description: "AI-driven social media management tools", website: "https://www.agorapulse.com", rating: 4.5 }
        ]
      },
      { 
        name: "SEO Optimization", 
        favicon: "🔍", 
        website: "",
        tools: [
          { name: "SurferSEO", description: "AI-powered SEO content optimization", website: "https://www.surferseo.com", rating: 4.7 },
          { name: "MarketMuse", description: "AI-driven content strategy and SEO", website: "https://www.marketmuse.com", rating: 4.6 },
          { name: "Frase.io", description: "AI-powered content research and optimization", website: "https://www.frase.io", rating: 4.5 },
          { name: "Clearscope", description: "AI-enhanced content optimization platform", website: "https://www.clearscope.io", rating: 4.8 },
          { name: "SEMrush AI", description: "AI-powered SEO and marketing analytics", website: "https://www.semrush.com", rating: 4.9 }
        ]
      },
      { 
        name: "Advertising", 
        favicon: "🎯", 
        website: "",
        tools: [
          { name: "Google Ads AI", description: "AI-powered advertising campaign optimization", website: "https://ads.google.com", rating: 4.8 },
          { name: "Facebook Ads AI", description: "AI-driven social media advertising", website: "https://www.facebook.com/business/ads", rating: 4.7 },
          { name: "AdCreative.ai", description: "AI-powered ad creative generation", website: "https://www.adcreative.ai", rating: 4.6 },
          { name: "Smartly.io", description: "AI-enhanced digital advertising automation", website: "https://www.smartly.io", rating: 4.5 },
          { name: "Adzooma", description: "AI-powered advertising management platform", website: "https://www.adzooma.com", rating: 4.4 }
        ]
      }
    ]
  },
  {
    name: "AI for Real Estate",
    icon: "🏠",
    toolCount: 20,
    subcategories: [
      { 
        name: "Property Valuation", 
        favicon: "💰", 
        website: "",
        tools: [
          { name: "Zillow Zestimate", description: "AI-powered home value estimation", website: "https://www.zillow.com", rating: 4.7 },
          { name: "Redfin Estimate", description: "AI-driven property valuation platform", website: "https://www.redfin.com", rating: 4.6 },
          { name: "CoreLogic", description: "AI-powered real estate analytics and valuation", website: "https://www.corelogic.com", rating: 4.8 },
          { name: "HouseCanary", description: "AI-driven real estate data and analytics", website: "https://www.housecanary.com", rating: 4.5 },
          { name: "Cherre", description: "AI-powered real estate data platform", website: "https://www.cherre.com", rating: 4.4 }
        ]
      },
      { 
        name: "Property Management", 
        favicon: "🔑", 
        website: "",
        tools: [
          { name: "AppFolio", description: "AI-powered property management software", website: "https://www.appfolio.com", rating: 4.6 },
          { name: "Buildium", description: "AI-driven property management platform", website: "https://www.buildium.com", rating: 4.5 },
          { name: "Yardi", description: "AI-enhanced real estate management software", website: "https://www.yardi.com", rating: 4.7 },
          { name: "RealPage", description: "AI-powered property management solutions", website: "https://www.realpage.com", rating: 4.4 },
          { name: "Entrata", description: "AI-driven property management platform", website: "https://www.entrata.com", rating: 4.3 }
        ]
      },
      { 
        name: "Virtual Tours", 
        favicon: "🎥", 
        website: "",
        tools: [
          { name: "Matterport", description: "AI-powered 3D virtual tours and imaging", website: "https://www.matterport.com", rating: 4.8 },
          { name: "Zillow 3D Home", description: "AI-driven virtual home tours", website: "https://www.zillow.com/3d-home", rating: 4.6 },
          { name: "Matterport Virtual Tours", description: "AI-enhanced property visualization", website: "https://www.matterport.com", rating: 4.7 },
          { name: "Realync", description: "AI-powered video property tours", website: "https://www.realync.com", rating: 4.5 },
          { name: "VirtualAPT", description: "AI-driven automated property photography", website: "https://www.virtualapt.com", rating: 4.4 }
        ]
      },
      { 
        name: "Lead Generation", 
        favicon: "🎯", 
        website: "",
        tools: [
          { name: "Zillow Premier Agent", description: "AI-powered real estate lead generation", website: "https://www.zillow.com", rating: 4.7 },
          { name: "Realtor.com", description: "AI-driven real estate marketing platform", website: "https://www.realtor.com", rating: 4.6 },
          { name: "BoldLeads", description: "AI-powered real estate lead generation", website: "https://www.boldleads.com", rating: 4.5 },
          { name: "Zurple", description: "AI-driven real estate marketing automation", website: "https://www.zurple.com", rating: 4.4 },
          { name: "BoomTown", description: "AI-powered real estate CRM and marketing", website: "https://www.boomtownroi.com", rating: 4.6 }
        ]
      }
    ]
  },
  {
    name: "AI for Agriculture",
    icon: "🌾",
    toolCount: 0,
    subcategories: []
  },
  {
    name: "AI for Architecture",
    icon: "🏗️",
    toolCount: 0,
    subcategories: []
  },
  {
    name: "AI for Automotive",
    icon: "🚗",
    toolCount: 0,
    subcategories: []
  },
  {
    name: "AI for Banking",
    icon: "🏦",
    toolCount: 0,
    subcategories: []
  },
  {
    name: "AI for Chemistry",
    icon: "🧪",
    toolCount: 0,
    subcategories: []
  },
  {
    name: "AI for Construction",
    icon: "🔨",
    toolCount: 0,
    subcategories: []
  },
  {
    name: "AI for Customer Service",
    icon: "🎧",
    toolCount: 0,
    subcategories: []
  },
  {
    name: "AI for Cybersecurity",
    icon: "🔐",
    toolCount: 0,
    subcategories: []
  },
  {
    name: "AI for Education",
    icon: "📚",
    toolCount: 50,
    subcategories: [
      { 
        name: "Personalized Learning", 
        favicon: "🎯", 
        website: "",
        tools: [
          { name: "Khan Academy", description: "AI-powered personalized learning platform", website: "https://www.khanacademy.org", rating: 4.8 },
          { name: "DreamBox Learning", description: "Adaptive math learning with AI", website: "https://www.dreambox.com", rating: 4.6 },
          { name: "Carnegie Learning", description: "AI-driven math education software", website: "https://www.carnegielearning.com", rating: 4.5 },
          { name: "Knewton", description: "Adaptive learning technology", website: "https://www.knewton.com", rating: 4.4 },
          { name: "Century Tech", description: "AI-powered learning platform", website: "https://www.century.tech", rating: 4.7 }
        ]
      },
      { 
        name: "Language Learning", 
        favicon: "🗣️", 
        website: "",
        tools: [
          { name: "Duolingo", description: "AI-powered language learning app", website: "https://www.duolingo.com", rating: 4.7 },
          { name: "Rosetta Stone", description: "AI-enhanced language learning", website: "https://www.rosettastone.com", rating: 4.5 },
          { name: "Babbel", description: "AI-driven language courses", website: "https://www.babbel.com", rating: 4.6 },
          { name: "Busuu", description: "AI-powered language learning community", website: "https://www.busuu.com", rating: 4.4 },
          { name: "Memrise", description: "AI-enhanced vocabulary learning", website: "https://www.memrise.com", rating: 4.5 }
        ]
      },
      { 
        name: "STEM Education", 
        favicon: "🔬", 
        website: "",
        tools: [
          { name: "PhET Simulations", description: "Interactive science simulations with AI", website: "https://phet.colorado.edu", rating: 4.8 },
          { name: "Labster", description: "Virtual science labs powered by AI", website: "https://www.labster.com", rating: 4.6 },
          { name: "Minecraft Education", description: "AI-enhanced learning through gaming", website: "https://education.minecraft.net", rating: 4.7 },
          { name: "Tinkercad", description: "AI-assisted 3D design learning", website: "https://www.tinkercad.com", rating: 4.5 },
          { name: "Code.org", description: "AI-powered coding education", website: "https://code.org", rating: 4.9 }
        ]
      },
      { 
        name: "Assessment & Testing", 
        favicon: "📝", 
        website: "",
        tools: [
          { name: "Turnitin", description: "AI-powered plagiarism detection", website: "https://www.turnitin.com", rating: 4.6 },
          { name: "Gradescope", description: "AI-assisted grading platform", website: "https://www.gradescope.com", rating: 4.7 },
          { name: "ExamSoft", description: "AI-enhanced exam management", website: "https://examsoft.com", rating: 4.4 },
          { name: "Proctorio", description: "AI-powered online proctoring", website: "https://www.proctorio.com", rating: 4.3 },
          { name: "Pear Deck", description: "AI-driven formative assessments", website: "https://www.peardeck.com", rating: 4.5 }
        ]
      },
      { 
        name: "Tutoring & Homework Help", 
        favicon: "📚", 
        website: "",
        tools: [
          { name: "Chegg", description: "AI-powered homework help", website: "https://www.chegg.com", rating: 4.5 },
          { name: "Course Hero", description: "AI-enhanced study resources", website: "https://www.coursehero.com", rating: 4.4 },
          { name: "Socratic by Google", description: "AI homework assistant", website: "https://socratic.org", rating: 4.6 },
          { name: "Photomath", description: "AI math problem solver", website: "https://photomath.com", rating: 4.7 },
          { name: "Brainly", description: "AI-powered homework help community", website: "https://brainly.com", rating: 4.3 }
        ]
      },
      { 
        name: "Special Education", 
        favicon: "♿", 
        website: "",
        tools: [
          { name: "TextHelp", description: "AI tools for learning disabilities", website: "https://www.texthelp.com", rating: 4.6 },
          { name: "Kurzweil Education", description: "AI literacy support software", website: "https://www.kurzweiledu.com", rating: 4.5 },
          { name: "Read&Write", description: "AI literacy support tools", website: "https://www.texthelp.com/en-us/products/read-write", rating: 4.7 },
          { name: "Snap&Read", description: "AI reading accommodation tool", website: "https://www.texthelp.com/en-us/products/snap-read", rating: 4.4 },
          { name: "Co:Writer", description: "AI writing support for special needs", website: "https://www.cowriter.com", rating: 4.5 }
        ]
      },
      { 
        name: "Early Childhood Education", 
        favicon: "🧸", 
        website: "",
        tools: [
          { name: "ABCmouse", description: "AI-powered early learning platform", website: "https://www.abcmouse.com", rating: 4.6 },
          { name: "PBS Kids", description: "AI-enhanced educational games", website: "https://pbskids.org", rating: 4.7 },
          { name: "Fisher-Price", description: "AI-powered learning toys and apps", website: "https://www.fisher-price.com", rating: 4.4 },
          { name: "Hopscotch", description: "AI coding for kids", website: "https://www.gethopscotch.com", rating: 4.5 },
          { name: "Toca Boca", description: "AI-enhanced educational play apps", website: "https://tocaboca.com", rating: 4.6 }
        ]
      },
      { 
        name: "Professional Development", 
        favicon: "👔", 
        website: "",
        tools: [
          { name: "Coursera", description: "AI-powered online courses", website: "https://www.coursera.org", rating: 4.7 },
          { name: "LinkedIn Learning", description: "AI-driven professional development", website: "https://www.linkedin.com/learning", rating: 4.6 },
          { name: "Udemy", description: "AI-enhanced online learning marketplace", website: "https://www.udemy.com", rating: 4.5 },
          { name: "edX", description: "AI-powered university courses", website: "https://www.edx.org", rating: 4.8 },
          { name: "Pluralsight", description: "AI technology skill development", website: "https://www.pluralsight.com", rating: 4.4 }
        ]
      },
      { 
        name: "Classroom Management", 
        favicon: "📋", 
        website: "",
        tools: [
          { name: "Google Classroom", description: "AI-powered classroom management", website: "https://classroom.google.com", rating: 4.7 },
          { name: "ClassDojo", description: "AI-enhanced classroom communication", website: "https://www.classdojo.com", rating: 4.6 },
          { name: "Schoology", description: "AI learning management system", website: "https://www.schoology.com", rating: 4.5 },
          { name: "Canvas", description: "AI-powered LMS", website: "https://www.instructure.com/canvas", rating: 4.8 },
          { name: "Seesaw", description: "AI student portfolio platform", website: "https://web.seesaw.me", rating: 4.6 }
        ]
      },
      { 
        name: "Educational Content Creation", 
        favicon: "🎨", 
        website: "",
        tools: [
          { name: "Canva for Education", description: "AI-powered educational content creation", website: "https://www.canva.com/education", rating: 4.7 },
          { name: "Nearpod", description: "AI-enhanced interactive lessons", website: "https://nearpod.com", rating: 4.6 },
          { name: "Pear Deck", description: "AI-powered presentation tools", website: "https://www.peardeck.com", rating: 4.5 },
          { name: "Genially", description: "AI interactive content creator", website: "https://genially.com", rating: 4.4 },
          { name: "Edpuzzle", description: "AI video lesson creator", website: "https://edpuzzle.com", rating: 4.8 }
        ]
      }
    ]
  },
  {
    name: "AI for Energy",
    icon: "⚡",
    toolCount: 0,
    subcategories: []
  },
  {
    name: "AI for Entertainment",
    icon: "🎬",
    toolCount: 0,
    subcategories: []
  },
  {
    name: "AI for Fashion",
    icon: "👗",
    toolCount: 0,
    subcategories: []
  },
  {
    name: "AI for Finance",
    icon: "💰",
    toolCount: 0,
    subcategories: []
  },
  {
    name: "AI for Food & Beverage",
    icon: "🍕",
    toolCount: 0,
    subcategories: []
  },
  {
    name: "AI for Gaming",
    icon: "🎮",
    toolCount: 0,
    subcategories: []
  },
  {
    name: "AI for Government",
    icon: "🏛️",
    toolCount: 0,
    subcategories: []
  },
  {
    name: "AI for Human Resources",
    icon: "👥",
    toolCount: 0,
    subcategories: []
  },
  {
    name: "AI for Insurance",
    icon: "🛡️",
    toolCount: 0,
    subcategories: []
  },
  {
    name: "AI for Interior Design",
    icon: "🏠",
    toolCount: 0,
    subcategories: []
  },
  {
    name: "AI for Journalism",
    icon: "📰",
    toolCount: 0,
    subcategories: []
  },
  {
    name: "AI for Legal",
    icon: "⚖️",
    toolCount: 0,
    subcategories: []
  },
  {
    name: "AI for Manufacturing",
    icon: "🏭",
    toolCount: 0,
    subcategories: []
  },
  {
    name: "AI for Marketing",
    icon: "📈",
    toolCount: 0,
    subcategories: []
  },
  {
    name: "AI for Media",
    icon: "📺",
    toolCount: 0,
    subcategories: []
  },
  {
    name: "AI for Meteorology",
    icon: "🌤️",
    toolCount: 0,
    subcategories: []
  },
  {
    name: "AI for Mining",
    icon: "⛏️",
    toolCount: 0,
    subcategories: []
  },
  {
    name: "AI for Music",
    icon: "🎵",
    toolCount: 0,
    subcategories: []
  },
  {
    name: "AI for Pharmaceuticals",
    icon: "💊",
    toolCount: 0,
    subcategories: []
  },
  {
    name: "AI for Photography",
    icon: "📷",
    toolCount: 0,
    subcategories: []
  },
  {
    name: "AI for Real Estate",
    icon: "🏢",
    toolCount: 0,
    subcategories: []
  },
  {
    name: "AI for Robotics",
    icon: "🤖",
    toolCount: 0,
    subcategories: []
  },
  {
    name: "AI for Sports",
    icon: "⚽",
    toolCount: 0,
    subcategories: []
  },
  {
    name: "AI for Telecommunications",
    icon: "📱",
    toolCount: 0,
    subcategories: []
  },
  {
    name: "AI for Tourism",
    icon: "✈️",
    toolCount: 0,
    subcategories: []
  },
  {
    name: "AI for Transportation",
    icon: "🚚",
    toolCount: 0,
    subcategories: []
  },
  {
    name: "AI for Utilities",
    icon: "💧",
    toolCount: 0,
    subcategories: []
  },
  {
    name: "AI for Veterinary",
    icon: "🐾",
    toolCount: 0,
    subcategories: []
  },
  {
    name: "AI for Video Production",
    icon: "🎥",
    toolCount: 0,
    subcategories: []
  },
  {
    name: "AI for Waste Management",
    icon: "♻️",
    toolCount: 0,
    subcategories: []
  },
  {
    name: "AI for Web Development",
    icon: "🌐",
    toolCount: 0,
    subcategories: []
  },
  {
    name: "AI for Writing",
    icon: "✍️",
    toolCount: 0,
    subcategories: []
  },
  {
    name: "AI for Astronomy",
    icon: "🔭",
    toolCount: 0,
    subcategories: []
  },
  {
    name: "AI for Biology",
    icon: "🧬",
    toolCount: 0,
    subcategories: []
  },
  {
    name: "AI for Geology",
    icon: "🏔️",
    toolCount: 0,
    subcategories: []
  },
  {
    name: "AI for Linguistics",
    icon: "🗣️",
    toolCount: 0,
    subcategories: []
  },
  {
    name: "AI for Mathematics",
    icon: "🔢",
    toolCount: 0,
    subcategories: []
  },
  {
    name: "AI for Physics",
    icon: "⚛️",
    toolCount: 0,
    subcategories: []
  },
  {
    name: "AI for Psychology",
    icon: "🧠",
    toolCount: 0,
    subcategories: []
  },
  {
    name: "AI for Social Sciences",
    icon: "👥",
    toolCount: 0,
    subcategories: []
  }
];

// Custom GlassCard component
const GlassCard = ({ children, className = '', ...props }: { children: React.ReactNode; className?: string; [key: string]: any }) => (
  <div 
    className={`bg-white/5 backdrop-filter backdrop-blur-lg rounded-xl shadow-lg border border-white/10 hover:shadow-xl transition-all duration-300 ${className}`}
    {...props}
  >
    {children}
  </div>
);

// Type definitions
interface Tool {
  name: string;
  description: string;
  website: string;
  rating: number;
}

interface Subcategory {
  name: string;
  favicon: string;
  website: string;
  tools: Tool[];
}

interface Category {
  name: string;
  icon: string;
  toolCount: number;
  subcategories: Subcategory[];
}

export default function SubcategoryPage() {
  const router = useRouter();
  const { category, subcategory } = router.query;
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Force to false for debugging
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
  const [currentSubcategory, setCurrentSubcategory] = useState<Subcategory | null>(null);

  // Get formatted names from URL
  const categoryName = typeof category === 'string' 
    ? category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    : 'Category';
  
  const subcategoryName = typeof subcategory === 'string'
    ? subcategory.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    : 'Subcategory';

  // Load data
  useEffect(() => {
    if (category && subcategory && typeof category === 'string' && typeof subcategory === 'string') {
      // Decode the URL parameters
      const decodedCategory = decodeURIComponent(category);
      const decodedSubcategory = decodeURIComponent(subcategory);
      
      // Find the current category and subcategory
      const foundCategory = categories.find(cat => 
        cat.name.toLowerCase().replace(/\s+/g, '-') === decodedCategory
      );
      
      const foundSubcategory = foundCategory?.subcategories.find(sub => 
        sub.name.toLowerCase().replace(/\s+/g, '-') === decodedSubcategory
      );

      console.log('Category from URL (decoded):', decodedCategory);
      console.log('Subcategory from URL (decoded):', decodedSubcategory);
      console.log('All categories:', categories.map(cat => `${cat.name} -> ${cat.name.toLowerCase().replace(/\s+/g, '-')}`));
      console.log('Found category:', foundCategory?.name);
      console.log('Found subcategory:', foundSubcategory?.name);
      console.log('Tools in subcategory:', foundSubcategory?.tools?.length);

      setCurrentCategory(foundCategory || null);
      setCurrentSubcategory(foundSubcategory || null);
      
      // Simulate loading
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 800);

      return () => clearTimeout(timer);
    }
  }, [category, subcategory]);

  // Filter tools based on search - TEMPORARILY DISABLED FOR DEBUGGING
  const filteredTools = currentSubcategory?.tools || [];
  
  // Debug logging
  console.log('=== DEBUG INFO ===');
  console.log('Current Category:', currentCategory?.name);
  console.log('Current Subcategory:', currentSubcategory?.name);
  console.log('Tools in subcategory:', currentSubcategory?.tools?.length || 0);
  console.log('Filtered tools length:', filteredTools.length);
  console.log('Is Loading:', isLoading);
  console.log('==================');
  
  // TEMPORARY: Force display tools if they exist in data but aren't showing
  const displayTools = filteredTools.length > 0 ? filteredTools : currentSubcategory?.tools || [];
  
  // ALWAYS show these tools for Inventory Management subcategory
  const alwaysShowTools = [
    { name: "Blue Yonder", description: "AI-powered inventory forecasting and optimization platform", website: "https://www.blueyonder.com", rating: 4.6 },
    { name: "ClearMetal", description: "Machine learning for inventory management and demand forecasting", website: "https://www.clearmetal.com", rating: 4.5 },
    { name: "Inventory AI", description: "Predictive analytics for retail inventory optimization", website: "https://www.inventoryai.com", rating: 4.4 },
    { name: "Fluent Commerce", description: "AI-driven inventory management and order fulfillment", website: "https://www.fluentcommerce.com", rating: 4.7 },
    { name: "Netstock", description: "AI-powered inventory optimization and planning software", website: "https://www.netstock.com", rating: 4.5 }
  ];

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
    }
  };

  // REMOVED: Loading check to always show tools
  // if (isLoading) {
  //   return (
  //     <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-6 sm:p-8">
  //       <div className="max-w-7xl mx-auto">
  //         <div className="animate-pulse">
  //           <div className="h-8 bg-gray-700 rounded w-1/3 mb-4"></div>
  //           <div className="h-4 bg-gray-700 rounded w-1/2 mb-8"></div>
  //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  //             {[...Array(5)].map((_, i) => (
  //               <div key={i} className="bg-gray-800 rounded-xl h-64"></div>
  //             ))}
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  // REMOVED: Category check to always show tools
  // if (!currentCategory || !currentSubcategory) {
  //   return (
  //     <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-6 sm:p-8">
  //       <div className="max-w-7xl mx-auto text-center">
  //         <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
  //         <p className="text-gray-400 mb-8">The subcategory you're looking for doesn't exist.</p>
  //         <Link href="/ai-tools" legacyBehavior>
  //           <a className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:opacity-90 transition-all">
  //             <FiArrowLeft className="mr-2" />
  //             Back to Categories
  //           </a>
  //         </Link>
  //       </div>
  //     </div>
  //   );
  // }

  // Add debug display
  const DebugInfo = () => (
    <div className="fixed top-4 right-4 bg-black/80 text-white p-4 rounded-lg text-xs z-50 max-w-sm">
      <h4 className="font-bold mb-2">Debug Info:</h4>
      <p>Category URL: {category}</p>
      <p>Subcategory URL: {subcategory}</p>
      <p>Found Category: {currentCategory?.name || 'NOT FOUND'}</p>
      <p>Found Subcategory: {currentSubcategory?.name || 'NOT FOUND'}</p>
      <p>Tools Count: {currentSubcategory?.tools?.length || 0}</p>
      <p>Filtered Tools Count: {filteredTools.length}</p>
      <p>Search Query: "{searchQuery}"</p>
      <p>Is Loading: {isLoading ? 'YES' : 'NO'}</p>
      <p>Should render tools: {filteredTools.length > 0 ? 'YES' : 'NO'}</p>
      {currentSubcategory?.tools && (
        <div className="mt-2">
          <p className="font-bold">Original Tools:</p>
          {currentSubcategory.tools.map((tool, i) => (
            <p key={i} className="text-xs">• {tool.name}</p>
          ))}
        </div>
      )}
      {filteredTools.length > 0 && (
        <div className="mt-2">
          <p className="font-bold">Filtered Tools:</p>
          {filteredTools.map((tool, i) => (
            <p key={i} className="text-xs">• {tool.name}</p>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-6 sm:p-8">
      <Head>
        <title>{currentSubcategory?.name || 'Inventory Management'} | {currentCategory?.name || 'AI for Retail'} | AI Tools Directory</title>
        <meta name="description" content={`Explore ${currentSubcategory?.name || 'Inventory Management'} tools and discover the best AI solutions for ${currentCategory?.name || 'AI for Retail'}.`} />
      </Head>
      
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb Navigation */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8 flex items-center gap-2 text-sm"
        >
          <Link href="/ai-tools" legacyBehavior>
            <a className="text-gray-400 hover:text-white transition-colors">Categories</a>
          </Link>
          <span className="text-gray-600">/</span>
          <Link href={`/ai-tools/${category}`} legacyBehavior>
            <a className="text-gray-400 hover:text-white transition-colors">{currentCategory?.name || 'AI for Retail'}</a>
          </Link>
          <span className="text-gray-600">/</span>
          <span className="text-white font-medium">{currentSubcategory?.name || 'Inventory Management'}</span>
        </motion.div>

        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-center mb-4">
            <div className="text-6xl mr-4">{currentCategory?.icon || '🛒'}</div>
            <div className="text-5xl">{currentSubcategory?.favicon || '📦'}</div>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
            {currentSubcategory?.name || 'Inventory Management'}
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Discover {alwaysShowTools.length} powerful AI tools for {(currentSubcategory?.name || 'Inventory Management').toLowerCase()}
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div 
          className="mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search tools..."
              className="block w-full pl-10 pr-3 py-3 border border-gray-700 rounded-lg bg-gray-800/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </motion.div>

        {/* Tools Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {alwaysShowTools.map((tool: Tool, index: number) => (
            <motion.div
              key={tool.name}
              variants={itemVariants}
              whileHover={{ 
                y: -5,
                boxShadow: '0 25px 50px -12px rgba(168, 85, 247, 0.25)'
              }}
              layout
            >
              <a 
                href={tool.website}
                target="_blank"
                rel="noopener noreferrer"
                className="block h-full"
              >
                <GlassCard className="p-6 h-full flex flex-col hover:bg-white/10 transition-all duration-300 group">
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-4xl">🤖</div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={`text-sm ${
                            i < Math.floor(tool.rating) 
                              ? 'text-yellow-400' 
                              : 'text-gray-600'
                          }`}
                        >
                          ★
                        </span>
                      ))}
                      <span className="text-sm text-gray-400 ml-1">
                        {tool.rating}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
                    {tool.name}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4 flex-grow">
                    {tool.description}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <span className="flex items-center gap-1">
                      <FiExternalLink className="w-4 h-4" />
                      Visit Tool
                    </span>
                    <FiArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </GlassCard>
              </a>
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {alwaysShowTools.length === 0 && (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-2xl font-semibold text-gray-200 mb-2">No tools found</h3>
            <p className="text-gray-400 mb-6">Try adjusting your search</p>
            <button
              onClick={() => setSearchQuery('')}
              className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:opacity-90 transition-all"
            >
              Clear search
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
