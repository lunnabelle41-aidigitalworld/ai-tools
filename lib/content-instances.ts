interface ContentInstance {
  id: string;
  type: 'founder' | 'developer' | 'designer' | 'analyst' | 'case-study';
  title: string;
  content: string;
  examples: string[];
  keyTakeaways: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedReadTime: number;
  relatedTools: string[];
  actionItems: string[];
}

interface BaseContent {
  id: string;
  title: string;
  coreContent: string;
  keyConcepts: string[];
  technicalDetails: string;
  businessImplications: string;
  examples: {
    technical: string[];
    business: string[];
    caseStudy: string[];
  };
  metadata: {
    category: string;
    tags: string[];
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    estimatedReadTime: { base: number; founder: number; developer: number };
  };
}

class ContentInstanceGenerator {
  private openaiClient: any; // In production, this would be initialized with actual API key
  
  constructor() {
    // Initialize AI client
    // this.openaiClient = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }

  /**
   * Generate multiple instances of content for different personas
   */
  async generateContentInstances(baseContent: BaseContent): Promise<ContentInstance[]> {
    const instances: ContentInstance[] = [];

    // Generate Founder Instance
    instances.push(await this.generateFounderInstance(baseContent));
    
    // Generate Developer Instance
    instances.push(await this.generateDeveloperInstance(baseContent));
    
    // Generate Designer Instance (if relevant)
    if (this.isDesignRelevant(baseContent)) {
      instances.push(await this.generateDesignerInstance(baseContent));
    }
    
    // Generate Analyst Instance (if relevant)
    if (this.isAnalyticsRelevant(baseContent)) {
      instances.push(await this.generateAnalystInstance(baseContent));
    }
    
    // Generate Case Study Instance
    instances.push(await this.generateCaseStudyInstance(baseContent));

    return instances;
  }

  /**
   * Generate Founder-focused instance
   */
  private async generateFounderInstance(baseContent: BaseContent): Promise<ContentInstance> {
    const prompt = `
      Transform the following content for a startup founder/CEO:
      
      Title: ${baseContent.title}
      Core Content: ${baseContent.coreContent}
      Business Implications: ${baseContent.businessImplications}
      
      Focus on:
      - Business value and ROI
      - Competitive advantages
      - Implementation costs and timeline
      - Risk assessment
      - Market opportunities
      - Actionable business strategies
      
      Format the response with clear sections and bullet points.
    `;

    // In production, this would call OpenAI API
    const aiResponse = await this.mockAIResponse(prompt, 'founder');

    return {
      id: `${baseContent.id}_founder`,
      type: 'founder',
      title: `${baseContent.title} (Founder's Perspective)`,
      content: aiResponse.content,
      examples: baseContent.examples.business,
      keyTakeaways: aiResponse.keyTakeaways,
      difficulty: this.adjustDifficulty(baseContent.metadata.difficulty, 'founder'),
      estimatedReadTime: baseContent.metadata.estimatedReadTime.founder,
      relatedTools: this.filterToolsForPersona(baseContent, 'founder'),
      actionItems: aiResponse.actionItems
    };
  }

  /**
   * Generate Developer-focused instance
   */
  private async generateDeveloperInstance(baseContent: BaseContent): Promise<ContentInstance> {
    const prompt = `
      Transform the following content for a software developer:
      
      Title: ${baseContent.title}
      Core Content: ${baseContent.coreContent}
      Technical Details: ${baseContent.technicalDetails}
      
      Focus on:
      - Technical implementation details
      - Code examples and best practices
      - Integration patterns
      - Performance considerations
      - Debugging and troubleshooting
      - API documentation
      - Development workflows
      
      Include code snippets where relevant.
    `;

    const aiResponse = await this.mockAIResponse(prompt, 'developer');

    return {
      id: `${baseContent.id}_developer`,
      type: 'developer',
      title: `${baseContent.title} (Developer's Guide)`,
      content: aiResponse.content,
      examples: baseContent.examples.technical,
      keyTakeaways: aiResponse.keyTakeaways,
      difficulty: baseContent.metadata.difficulty,
      estimatedReadTime: baseContent.metadata.estimatedReadTime.developer,
      relatedTools: this.filterToolsForPersona(baseContent, 'developer'),
      actionItems: aiResponse.actionItems
    };
  }

  /**
   * Generate Designer-focused instance
   */
  private async generateDesignerInstance(baseContent: BaseContent): Promise<ContentInstance> {
    const prompt = `
      Transform the following content for a UX/UI designer:
      
      Title: ${baseContent.title}
      Core Content: ${baseContent.coreContent}
      
      Focus on:
      - User experience implications
      - Design patterns and principles
      - Visual design considerations
      - Accessibility requirements
      - User interface guidelines
      - Design tools and workflows
      - User research insights
      
      Include visual examples and design principles.
    `;

    const aiResponse = await this.mockAIResponse(prompt, 'designer');

    return {
      id: `${baseContent.id}_designer`,
      type: 'designer',
      title: `${baseContent.title} (Designer's Perspective)`,
      content: aiResponse.content,
      examples: this.extractDesignExamples(baseContent),
      keyTakeaways: aiResponse.keyTakeaways,
      difficulty: this.adjustDifficulty(baseContent.metadata.difficulty, 'designer'),
      estimatedReadTime: baseContent.metadata.estimatedReadTime.base,
      relatedTools: this.filterToolsForPersona(baseContent, 'designer'),
      actionItems: aiResponse.actionItems
    };
  }

  /**
   * Generate Analyst-focused instance
   */
  private async generateAnalystInstance(baseContent: BaseContent): Promise<ContentInstance> {
    const prompt = `
      Transform the following content for a business/data analyst:
      
      Title: ${baseContent.title}
      Core Content: ${baseContent.coreContent}
      
      Focus on:
      - Data-driven insights
      - Analytics methodologies
      - KPIs and metrics
      - Data visualization
      - Statistical analysis
      - Reporting frameworks
      - Business intelligence
      
      Include data examples and analytical frameworks.
    `;

    const aiResponse = await this.mockAIResponse(prompt, 'analyst');

    return {
      id: `${baseContent.id}_analyst`,
      type: 'analyst',
      title: `${baseContent.title} (Analyst's View)`,
      content: aiResponse.content,
      examples: this.extractAnalyticsExamples(baseContent),
      keyTakeaways: aiResponse.keyTakeaways,
      difficulty: this.adjustDifficulty(baseContent.metadata.difficulty, 'analyst'),
      estimatedReadTime: baseContent.metadata.estimatedReadTime.base,
      relatedTools: this.filterToolsForPersona(baseContent, 'analyst'),
      actionItems: aiResponse.actionItems
    };
  }

  /**
   * Generate Case Study instance
   */
  private async generateCaseStudyInstance(baseContent: BaseContent): Promise<ContentInstance> {
    const prompt = `
      Transform the following content into a detailed case study:
      
      Title: ${baseContent.title}
      Core Content: ${baseContent.coreContent}
      Examples: ${JSON.stringify(baseContent.examples)}
      
      Structure as a case study with:
      - Company/Project background
      - Challenge or problem
      - Solution implementation
      - Results and metrics
      - Lessons learned
      - Best practices
      - Future implications
      
      Use real-world examples and measurable outcomes.
    `;

    const aiResponse = await this.mockAIResponse(prompt, 'case-study');

    return {
      id: `${baseContent.id}_case_study`,
      type: 'case-study',
      title: `Case Study: ${baseContent.title}`,
      content: aiResponse.content,
      examples: [...baseContent.examples.technical, ...baseContent.examples.business, ...baseContent.examples.caseStudy],
      keyTakeaways: aiResponse.keyTakeaways,
      difficulty: 'intermediate', // Case studies are typically intermediate
      estimatedReadTime: Math.max(...Object.values(baseContent.metadata.estimatedReadTime)),
      relatedTools: baseContent.metadata.tags,
      actionItems: aiResponse.actionItems
    };
  }

  /**
   * Mock AI response for demonstration
   * In production, this would call actual AI APIs
   */
  private async mockAIResponse(prompt: string, persona: string): Promise<any> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const responses = {
      founder: {
        content: `
          ## Business Value & ROI
          
          This technology offers significant competitive advantages through increased efficiency and reduced operational costs. Companies implementing similar solutions have reported 40-60% improvement in productivity within the first 6 months.
          
          ## Implementation Strategy
          
          **Phase 1: Assessment (Weeks 1-2)**
          - Evaluate current infrastructure
          - Identify key stakeholders
          - Define success metrics
          
          **Phase 2: Pilot Program (Weeks 3-6)**
          - Small-scale implementation
          - Gather feedback and iterate
          - Measure initial ROI
          
          **Phase 3: Full Rollout (Weeks 7-12)**
          - Scale across organization
          - Training and adoption programs
          - Performance monitoring
          
          ## Risk Assessment
          
          **Low Risk:**
          - Technical implementation complexity
          - Team adoption curve
          
          **Medium Risk:**
          - Integration with existing systems
          - Initial productivity dip during transition
          
          **High Risk:**
          - Budget overruns
          - Competitive response
        `,
        keyTakeaways: [
          'Implementation can be completed in 12 weeks with proper planning',
          'ROI typically realized within 6 months',
          'Start with pilot program to minimize risks',
          'Focus on change management for successful adoption'
        ],
        actionItems: [
          'Conduct infrastructure assessment within 2 weeks',
          'Allocate budget for pilot program',
          'Identify internal champions for the initiative',
          'Define clear success metrics and KPIs'
        ]
      },
      developer: {
        content: `
          ## Technical Architecture
          
          The implementation follows a microservices architecture with the following key components:
          
          \`\`\`typescript
          interface ServiceArchitecture {
            apiGateway: string;
            authService: AuthService;
            dataService: DataService;
            notificationService: NotificationService;
          }
          \`\`\`
          
          ## Implementation Details
          
          **Core Dependencies:**
          - Node.js 18+ with TypeScript
          - PostgreSQL for data persistence
          - Redis for caching
          - Docker for containerization
          
          **API Design:**
          \`\`\`typescript
          // RESTful API endpoints
          GET /api/v1/resources
          POST /api/v1/resources
          PUT /api/v1/resources/:id
          DELETE /api/v1/resources/:id
          \`\`\`
          
          ## Performance Optimization
          
          **Caching Strategy:**
          - Implement Redis caching for frequently accessed data
          - Use CDN for static assets
          - Apply database query optimization
          
          **Monitoring & Debugging:**
          - Implement structured logging with Winston
          - Set up Prometheus metrics
          - Use Sentry for error tracking
        `,
        keyTakeaways: [
          'Microservices architecture provides better scalability',
          'TypeScript ensures type safety and better developer experience',
          'Caching strategy is crucial for performance',
          'Comprehensive monitoring is essential for production'
        ],
        actionItems: [
          'Set up development environment with Docker',
          'Implement API gateway and authentication',
          'Create database schema and migrations',
          'Set up CI/CD pipeline for automated deployment'
        ]
      },
      designer: {
        content: `
          ## User Experience Considerations
          
          The user interface should prioritize clarity and efficiency while maintaining visual appeal. Key UX principles to consider:
          
          **Visual Hierarchy:**
          - Use consistent typography scale
          - Implement clear color contrast ratios (4.5:1 minimum)
          - Establish clear focal points for user actions
          
          **Interaction Design:**
          - Provide immediate feedback for user actions
          - Use progressive disclosure for complex features
          - Implement keyboard navigation accessibility
          
          ## Design System
          
          **Color Palette:**
          - Primary: #0066CC (Blue)
          - Secondary: #00CC66 (Green)
          - Accent: #FF6600 (Orange)
          - Neutral: #333333, #666666, #999999
          
          **Typography:**
          - Headings: Inter, 600 weight
          - Body: Inter, 400 weight
          - Code: JetBrains Mono
          
          **Component Library:**
          - Buttons, forms, cards, modals
          - Consistent spacing (8px grid system)
          - Responsive breakpoints: 320px, 768px, 1024px, 1440px
        `,
        keyTakeaways: [
          'Consistent design system improves user experience',
          'Accessibility should be considered from the start',
          'Mobile-first approach ensures broader reach',
          'User testing validates design decisions'
        ],
        actionItems: [
          'Create design system documentation',
          'Build component library in Figma',
          'Conduct user research and testing',
          'Implement responsive design patterns'
        ]
      },
      'case-study': {
        content: `
          ## Background: TechCorp's Digital Transformation
          
          TechCorp, a mid-sized enterprise with 500 employees, faced significant challenges with their legacy systems. Manual processes were causing delays, and customer satisfaction was declining.
          
          ## The Challenge
          
          **Key Problems:**
          - 60% of processes were manual
          - Average response time: 48 hours
          - Customer satisfaction: 65%
          - Employee productivity: 40% below industry average
          
          ## The Solution
          
          **Implementation Approach:**
          1. **Phase 1** - Process automation and workflow optimization
          2. **Phase 2** - Integration of AI-powered analytics
          3. **Phase 3** - Mobile app development for field teams
          
          **Technologies Used:**
          - Cloud infrastructure (AWS)
          - Machine learning for predictive analytics
          - Mobile-first responsive design
          - API-first architecture
          
          ## Results
          
          **After 6 months:**
          - Process automation: 85%
          - Response time: 2 hours (96% improvement)
          - Customer satisfaction: 92% (+41%)
          - Employee productivity: 25% above industry average
          
          **Financial Impact:**
          - ROI: 340% in first year
          - Cost savings: $2.3M annually
          - Revenue increase: 18%
          
          ## Lessons Learned
          
          **Success Factors:**
          - Executive sponsorship was critical
          - User adoption programs ensured smooth transition
          - Iterative approach allowed for course corrections
          
          **Challenges Overcome:**
          - Initial resistance to change addressed through training
          - Technical integration issues resolved with dedicated team
          - Budget constraints managed through phased implementation
        `,
        keyTakeaways: [
          'Digital transformation requires strong leadership commitment',
          'Phased implementation reduces risk and ensures success',
          - 'User adoption is as important as technical implementation',
          'Measurable ROI validates investment decisions'
        ],
        actionItems: [
          'Assess current processes for automation opportunities',
          'Develop comprehensive change management strategy',
          'Establish clear metrics for success measurement',
          'Plan for iterative improvements based on feedback'
        ]
      }
    };

    return responses[persona as keyof typeof responses] || responses.founder;
  }

  /**
   * Helper methods
   */
  private isDesignRelevant(baseContent: BaseContent): boolean {
    const designKeywords = ['ui', 'ux', 'design', 'interface', 'user experience', 'visual'];
    const content = `${baseContent.title} ${baseContent.coreContent}`.toLowerCase();
    return designKeywords.some(keyword => content.includes(keyword));
  }

  private isAnalyticsRelevant(baseContent: BaseContent): boolean {
    const analyticsKeywords = ['data', 'analytics', 'metrics', 'kpi', 'analysis', 'statistics'];
    const content = `${baseContent.title} ${baseContent.coreContent}`.toLowerCase();
    return analyticsKeywords.some(keyword => content.includes(keyword));
  }

  private adjustDifficulty(baseDifficulty: string, persona: string): 'beginner' | 'intermediate' | 'advanced' {
    if (persona === 'founder') {
      // Make content slightly less technical for founders
      if (baseDifficulty === 'advanced') return 'intermediate';
      if (baseDifficulty === 'intermediate') return 'beginner';
    }
    return baseDifficulty as 'beginner' | 'intermediate' | 'advanced';
  }

  private filterToolsForPersona(baseContent: BaseContent, persona: string): string[] {
    // In a real implementation, this would filter tools based on persona relevance
    return baseContent.metadata.tags.slice(0, 5);
  }

  private extractDesignExamples(baseContent: BaseContent): string[] {
    return baseContent.examples.technical.filter(ex => 
      ex.toLowerCase().includes('ui') || 
      ex.toLowerCase().includes('design') ||
      ex.toLowerCase().includes('interface')
    );
  }

  private extractAnalyticsExamples(baseContent: BaseContent): string[] {
    return baseContent.examples.technical.filter(ex => 
      ex.toLowerCase().includes('data') || 
      ex.toLowerCase().includes('analytics') ||
      ex.toLowerCase().includes('metrics')
    );
  }

  /**
   * Generate content instances on-demand (edge function approach)
   */
  async generateInstanceOnDemand(
    baseContent: BaseContent, 
    persona: string
  ): Promise<ContentInstance> {
    switch (persona) {
      case 'founder':
        return this.generateFounderInstance(baseContent);
      case 'developer':
        return this.generateDeveloperInstance(baseContent);
      case 'designer':
        return this.generateDesignerInstance(baseContent);
      case 'analyst':
        return this.generateAnalystInstance(baseContent);
      case 'case-study':
        return this.generateCaseStudyInstance(baseContent);
      default:
        return this.generateDeveloperInstance(baseContent);
    }
  }
}

export default ContentInstanceGenerator;
export type { ContentInstance, BaseContent };
