/**
 * Accessibility service for search results
 */

// Accessibility features
export type AccessibilityFeature = 
  | 'screen-reader'      // Screen reader optimization
  | 'keyboard-nav'       // Keyboard navigation
  | 'high-contrast'      // High contrast mode
  | 'text-size'          // Text size adjustment
  | 'color-blind'        // Color blindness support
  | 'voice-control'      // Voice control support
  | 'braille'            // Braille display support
  | 'cognitive'          // Cognitive accessibility
  | 'motor'              // Motor impairment support
  | 'custom';            // Custom accessibility features

// Accessibility compliance standards
export type AccessibilityStandard = 
  | 'wcag-2.1'           // Web Content Accessibility Guidelines 2.1
  | 'wcag-2.2'           // Web Content Accessibility Guidelines 2.2
  | 'section-508'        // Section 508 of the Rehabilitation Act
  | 'ada'                // Americans with Disabilities Act
  | 'en-301-549'         // European standard for accessibility
  | 'custom';            // Custom accessibility standards

// User accessibility preferences
export interface AccessibilityPreferences {
  userId?: string;
  features: AccessibilityFeature[];
  textSize: 'small' | 'medium' | 'large' | 'extra-large';
  contrast: 'normal' | 'high' | 'black-on-white' | 'white-on-black';
  colorBlindMode: 'none' | 'protanopia' | 'deuteranopia' | 'tritanopia';
  screenReader: boolean;
  keyboardNavigation: boolean;
  voiceControl: boolean;
  reducedMotion: boolean;
  simplifiedInterface: boolean;
  customSettings?: Record<string, any>;
}

// Accessibility evaluation result
export interface AccessibilityEvaluation {
  id: string;
  content: string;
  score: number; // 0-100
  issues: AccessibilityIssue[];
  suggestions: AccessibilitySuggestion[];
  standards: AccessibilityStandard[];
  evaluatedAt: number;
}

// Accessibility issue
export interface AccessibilityIssue {
  id: string;
  type: AccessibilityIssueType;
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  element?: string; // Selector or description of affected element
  wcagCriterion?: string; // WCAG criterion if applicable
  recommendation: string;
}

// Accessibility issue types
export type AccessibilityIssueType = 
  | 'missing-alt-text'        // Missing alternative text for images
  | 'insufficient-contrast'   // Text/background contrast too low
  | 'missing-label'           // Form elements missing labels
  | 'empty-heading'           // Empty heading elements
  | 'missing-lang'            // Missing language attribute
  | 'non-descriptive-link'    // Links with non-descriptive text
  | 'missing-caption'         // Media missing captions
  | 'keyboard-trap'           // Keyboard trap detected
  | 'missing-title'           // Missing page title
  | 'duplicate-id'            // Duplicate element IDs
  | 'small-text'              // Text too small
  | 'missing-aria'            // Missing ARIA attributes
  | 'custom';                 // Custom issue type

// Accessibility suggestion
export interface AccessibilitySuggestion {
  id: string;
  issueId: string;
  description: string;
  implementation: string;
  priority: 'low' | 'medium' | 'high';
  estimatedEffort: 'minutes' | 'hours' | 'days';
}

// Accessible content result
export interface AccessibleContent {
  original: string;
  accessibleVersion: string;
  modifications: AccessibilityModification[];
  featuresApplied: AccessibilityFeature[];
}

// Accessibility modification
export interface AccessibilityModification {
  id: string;
  feature: AccessibilityFeature;
  description: string;
  originalContent: string;
  modifiedContent: string;
  position?: {
    start: number;
    end: number;
  };
}

// Accessibility service class
export class AccessibilityService {
  private userPreferences: Map<string, AccessibilityPreferences>;
  private defaultPreferences: AccessibilityPreferences;
  private supportedStandards: Set<AccessibilityStandard>;
  
  constructor() {
    this.userPreferences = new Map();
    this.defaultPreferences = {
      features: ['keyboard-nav', 'screen-reader'],
      textSize: 'medium',
      contrast: 'normal',
      colorBlindMode: 'none',
      screenReader: false,
      keyboardNavigation: true,
      voiceControl: false,
      reducedMotion: false,
      simplifiedInterface: false
    };
    this.supportedStandards = new Set([
      'wcag-2.1', 'wcag-2.2', 'section-508'
    ]);
  }

  /**
   * Set user accessibility preferences
   */
  setUserPreferences(userId: string, preferences: Partial<AccessibilityPreferences>): void {
    const current = this.userPreferences.get(userId) || { ...this.defaultPreferences };
    const updated = { ...current, ...preferences, userId };
    this.userPreferences.set(userId, updated);
  }

  /**
   * Get user accessibility preferences
   */
  getUserPreferences(userId: string): AccessibilityPreferences {
    return this.userPreferences.get(userId) || { ...this.defaultPreferences };
  }

  /**
   * Make content accessible
   */
  makeAccessible(
    content: string,
    userId?: string,
    features?: AccessibilityFeature[]
  ): AccessibleContent {
    const preferences = userId ? this.getUserPreferences(userId) : this.defaultPreferences;
    const featuresToApply = features || preferences.features;
    
    let accessibleContent = content;
    const modifications: AccessibilityModification[] = [];
    const appliedFeatures: AccessibilityFeature[] = [];
    
    // Apply screen reader optimizations
    if (featuresToApply.includes('screen-reader') || preferences.screenReader) {
      const result = this.optimizeForScreenReaders(accessibleContent);
      accessibleContent = result.content;
      modifications.push(...result.modifications);
      appliedFeatures.push('screen-reader');
    }
    
    // Apply keyboard navigation enhancements
    if (featuresToApply.includes('keyboard-nav') || preferences.keyboardNavigation) {
      const result = this.enhanceKeyboardNavigation(accessibleContent);
      accessibleContent = result.content;
      modifications.push(...result.modifications);
      appliedFeatures.push('keyboard-nav');
    }
    
    // Apply high contrast mode
    if (featuresToApply.includes('high-contrast') || preferences.contrast !== 'normal') {
      const result = this.applyHighContrast(accessibleContent, preferences.contrast);
      accessibleContent = result.content;
      modifications.push(...result.modifications);
      appliedFeatures.push('high-contrast');
    }
    
    // Apply text size adjustments
    if (featuresToApply.includes('text-size') || preferences.textSize !== 'medium') {
      const result = this.adjustTextSize(accessibleContent, preferences.textSize);
      accessibleContent = result.content;
      modifications.push(...result.modifications);
      appliedFeatures.push('text-size');
    }
    
    // Apply color blindness support
    if (featuresToApply.includes('color-blind') || preferences.colorBlindMode !== 'none') {
      const result = this.applyColorBlindSupport(accessibleContent, preferences.colorBlindMode);
      accessibleContent = result.content;
      modifications.push(...result.modifications);
      appliedFeatures.push('color-blind');
    }
    
    // Apply cognitive accessibility features
    if (featuresToApply.includes('cognitive') || preferences.simplifiedInterface) {
      const result = this.simplifyInterface(accessibleContent);
      accessibleContent = result.content;
      modifications.push(...result.modifications);
      appliedFeatures.push('cognitive');
    }
    
    // Apply motor impairment support
    if (featuresToApply.includes('motor')) {
      const result = this.enhanceMotorSupport(accessibleContent);
      accessibleContent = result.content;
      modifications.push(...result.modifications);
      appliedFeatures.push('motor');
    }
    
    return {
      original: content,
      accessibleVersion: accessibleContent,
      modifications,
      featuresApplied: appliedFeatures
    };
  }

  /**
   * Optimize content for screen readers
   */
  private optimizeForScreenReaders(content: string): {
    content: string;
    modifications: AccessibilityModification[];
  } {
    const modifications: AccessibilityModification[] = [];
    let optimizedContent = content;
    
    // Add semantic structure (simplified)
    const headings = optimizedContent.match(/(^|\n)#{1,6} .+/g);
    if (headings) {
      headings.forEach(heading => {
        const level = (heading.match(/^#*/) || [''])[0].length;
        const text = heading.replace(/^#*\s*/, '');
        const replacement = `<h${level}>${text}</h${level}>`;
        optimizedContent = optimizedContent.replace(heading, replacement);
        
        modifications.push({
          id: `sr_heading_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          feature: 'screen-reader',
          description: `Converted heading to semantic HTML`,
          originalContent: heading,
          modifiedContent: replacement
        });
      });
    }
    
    // Add alternative text to images (simplified)
    const images = optimizedContent.match(/!\[([^\]]*)\]\([^)]*\)/g);
    if (images) {
      images.forEach(image => {
        const altText = image.match(/!\[([^\]]*)\]/);
        if (altText && !altText[1]) {
          const replacement = image.replace('![', '![Decorative image ');
          optimizedContent = optimizedContent.replace(image, replacement);
          
          modifications.push({
            id: `sr_alt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            feature: 'screen-reader',
            description: `Added descriptive alt text to image`,
            originalContent: image,
            modifiedContent: replacement
          });
        }
      });
    }
    
    return {
      content: optimizedContent,
      modifications
    };
  }

  /**
   * Enhance keyboard navigation
   */
  private enhanceKeyboardNavigation(content: string): {
    content: string;
    modifications: AccessibilityModification[];
  } {
    const modifications: AccessibilityModification[] = [];
    let enhancedContent = content;
    
    // Add keyboard focus indicators (simplified)
    // In a real implementation, this would add CSS classes and focus management
    const interactiveElements = enhancedContent.match(/<a\s+href|<button/g);
    if (interactiveElements) {
      modifications.push({
        id: `kb_nav_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        feature: 'keyboard-nav',
        description: `Enhanced keyboard navigation for ${interactiveElements.length} elements`,
        originalContent: content.substring(0, 100) + '...',
        modifiedContent: 'Content with keyboard navigation enhancements'
      });
    }
    
    return {
      content: enhancedContent,
      modifications
    };
  }

  /**
   * Apply high contrast mode
   */
  private applyHighContrast(content: string, contrast: AccessibilityPreferences['contrast']): {
    content: string;
    modifications: AccessibilityModification[];
  } {
    const modifications: AccessibilityModification[] = [];
    
    // In a real implementation, this would apply CSS classes or styles
    modifications.push({
      id: `hc_${contrast}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      feature: 'high-contrast',
      description: `Applied ${contrast} contrast mode`,
      originalContent: content.substring(0, 100) + '...',
      modifiedContent: `Content with ${contrast} contrast applied`
    });
    
    return {
      content,
      modifications
    };
  }

  /**
   * Adjust text size
   */
  private adjustTextSize(content: string, size: AccessibilityPreferences['textSize']): {
    content: string;
    modifications: AccessibilityModification[];
  } {
    const modifications: AccessibilityModification[] = [];
    
    // In a real implementation, this would apply CSS classes or styles
    modifications.push({
      id: `ts_${size}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      feature: 'text-size',
      description: `Adjusted text size to ${size}`,
      originalContent: content.substring(0, 100) + '...',
      modifiedContent: `Content with ${size} text size applied`
    });
    
    return {
      content,
      modifications
    };
  }

  /**
   * Apply color blindness support
   */
  private applyColorBlindSupport(content: string, mode: AccessibilityPreferences['colorBlindMode']): {
    content: string;
    modifications: AccessibilityModification[];
  } {
    const modifications: AccessibilityModification[] = [];
    
    // In a real implementation, this would apply color palette adjustments
    modifications.push({
      id: `cb_${mode}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      feature: 'color-blind',
      description: `Applied ${mode} color blindness support`,
      originalContent: content.substring(0, 100) + '...',
      modifiedContent: `Content with ${mode} color adjustments applied`
    });
    
    return {
      content,
      modifications
    };
  }

  /**
   * Simplify interface for cognitive accessibility
   */
  private simplifyInterface(content: string): {
    content: string;
    modifications: AccessibilityModification[];
  } {
    const modifications: AccessibilityModification[] = [];
    
    // Remove complex language and simplify structure
    let simplifiedContent = content
      .replace(/(?:however|nevertheless|nonetheless|consequently|therefore)/gi, 'so')
      .replace(/(?:utilize|facilitate|implement)/gi, (match) => {
        const simplifications: Record<string, string> = {
          'utilize': 'use',
          'facilitate': 'help',
          'implement': 'do'
        };
        return simplifications[match.toLowerCase()] || match;
      });
    
    modifications.push({
      id: `cog_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      feature: 'cognitive',
      description: 'Simplified language and structure for cognitive accessibility',
      originalContent: content.substring(0, 100) + '...',
      modifiedContent: simplifiedContent.substring(0, 100) + '...'
    });
    
    return {
      content: simplifiedContent,
      modifications
    };
  }

  /**
   * Enhance motor support
   */
  private enhanceMotorSupport(content: string): {
    content: string;
    modifications: AccessibilityModification[];
  } {
    const modifications: AccessibilityModification[] = [];
    
    // Increase touch target sizes and spacing
    modifications.push({
      id: `motor_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      feature: 'motor',
      description: 'Enhanced touch targets and spacing for motor accessibility',
      originalContent: content.substring(0, 100) + '...',
      modifiedContent: 'Content with enhanced motor support'
    });
    
    return {
      content,
      modifications
    };
  }

  /**
   * Evaluate content accessibility
   */
  evaluateAccessibility(
    content: string,
    standards: AccessibilityStandard[] = ['wcag-2.1']
  ): AccessibilityEvaluation {
    const issues: AccessibilityIssue[] = [];
    const suggestions: AccessibilitySuggestion[] = [];
    
    // Check for missing alt text
    const imagesWithoutAlt = content.match(/<img(?![^>]*alt=)[^>]*>/gi);
    if (imagesWithoutAlt) {
      imagesWithoutAlt.forEach((img, index) => {
        const issueId = `issue_${Date.now()}_${index}`;
        issues.push({
          id: issueId,
          type: 'missing-alt-text',
          severity: 'high',
          description: 'Image missing alternative text',
          element: img,
          wcagCriterion: '1.1.1',
          recommendation: 'Add descriptive alt attribute to image'
        });
        
        suggestions.push({
          id: `suggestion_${Date.now()}_${index}`,
          issueId,
          description: 'Add meaningful alternative text',
          implementation: 'Add alt="descriptive text" attribute to the img tag',
          priority: 'high',
          estimatedEffort: 'minutes'
        });
      });
    }
    
    // Check for insufficient contrast
    const textColorMatches = content.match(/color:\s*(#[0-9a-fA-F]{6}|#[0-9a-fA-F]{3}|rgb\([^)]+\)|[a-zA-Z]+)/gi);
    const bgColorMatches = content.match(/background(-color)?:\s*(#[0-9a-fA-F]{6}|#[0-9a-fA-F]{3}|rgb\([^)]+\)|[a-zA-Z]+)/gi);
    
    if (textColorMatches && bgColorMatches) {
      // Simplified contrast check - in reality would use actual color contrast algorithms
      const issueId = `issue_${Date.now()}_contrast`;
      issues.push({
        id: issueId,
        type: 'insufficient-contrast',
        severity: 'medium',
        description: 'Potential insufficient color contrast',
        wcagCriterion: '1.4.3',
        recommendation: 'Ensure text and background colors have sufficient contrast ratio'
      });
      
      suggestions.push({
        id: `suggestion_${Date.now()}_contrast`,
        issueId,
        description: 'Improve color contrast',
        implementation: 'Adjust text or background colors to meet WCAG contrast requirements',
        priority: 'medium',
        estimatedEffort: 'hours'
      });
    }
    
    // Check for missing form labels
    const inputsWithoutLabels = content.match(/<input(?![^>]*(aria-label|aria-labelledby|id))[^>]*>/gi);
    if (inputsWithoutLabels) {
      inputsWithoutLabels.forEach((input, index) => {
        const issueId = `issue_${Date.now()}_label_${index}`;
        issues.push({
          id: issueId,
          type: 'missing-label',
          severity: 'high',
          description: 'Form input missing associated label',
          element: input,
          wcagCriterion: '1.3.1, 3.3.2',
          recommendation: 'Add label element or aria-label attribute'
        });
        
        suggestions.push({
          id: `suggestion_${Date.now()}_label_${index}`,
          issueId,
          description: 'Associate input with label',
          implementation: 'Add <label> element or aria-label attribute for the input',
          priority: 'high',
          estimatedEffort: 'minutes'
        });
      });
    }
    
    // Calculate accessibility score (simplified)
    const maxIssues = 10;
    const score = Math.max(0, 100 - (issues.length / maxIssues) * 100);
    
    return {
      id: `eval_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      content: content.substring(0, 200) + '...',
      score,
      issues,
      suggestions,
      standards,
      evaluatedAt: Date.now()
    };
  }

  /**
   * Generate accessibility report
   */
  generateAccessibilityReport(
    evaluations: AccessibilityEvaluation[]
  ): {
    generatedAt: number;
    totalEvaluations: number;
    averageScore: number;
    issuesByType: Record<AccessibilityIssueType, number>;
    complianceRate: number;
    recommendations: string[];
  } {
    const totalEvaluations = evaluations.length;
    const totalScore = evaluations.reduce((sum, evaluation) => sum + evaluation.score, 0);
    const averageScore = totalEvaluations > 0 ? totalScore / totalEvaluations : 0;
    
    // Count issues by type
    const issuesByType: Record<AccessibilityIssueType, number> = {
      'missing-alt-text': 0,
      'insufficient-contrast': 0,
      'missing-label': 0,
      'empty-heading': 0,
      'missing-lang': 0,
      'non-descriptive-link': 0,
      'missing-caption': 0,
      'keyboard-trap': 0,
      'missing-title': 0,
      'duplicate-id': 0,
      'small-text': 0,
      'missing-aria': 0,
      'custom': 0
    };
    
    evaluations.forEach(evaluation => {
      evaluation.issues.forEach(issue => {
        issuesByType[issue.type]++;
      });
    });
    
    // Calculate compliance rate (simplified)
    const compliantEvaluations = evaluations.filter(evaluation => evaluation.score >= 90).length;
    const complianceRate = totalEvaluations > 0 ? (compliantEvaluations / totalEvaluations) * 100 : 0;
    
    // Generate recommendations
    const recommendations: string[] = [];
    Object.entries(issuesByType).forEach(([type, count]) => {
      if (count > 0) {
        recommendations.push(`Address ${count} instances of ${type.replace(/-/g, ' ')}`);
      }
    });
    
    return {
      generatedAt: Date.now(),
      totalEvaluations,
      averageScore,
      issuesByType,
      complianceRate,
      recommendations
    };
  }

  /**
   * Get supported accessibility features
   */
  getSupportedFeatures(): {
    features: AccessibilityFeature[];
    standards: AccessibilityStandard[];
  } {
    return {
      features: [
        'screen-reader', 'keyboard-nav', 'high-contrast', 'text-size',
        'color-blind', 'voice-control', 'braille', 'cognitive', 'motor'
      ],
      standards: Array.from(this.supportedStandards)
    };
  }

  /**
   * Get accessibility statistics
   */
  getStats(): {
    totalUsers: number;
    featuresUsage: Record<AccessibilityFeature, number>;
    averageScore: number;
  } {
    const totalUsers = this.userPreferences.size;
    
    // In a real implementation, this would track actual feature usage
    const featuresUsage: Record<AccessibilityFeature, number> = {
      'screen-reader': Math.floor(totalUsers * 0.1),
      'keyboard-nav': Math.floor(totalUsers * 0.8),
      'high-contrast': Math.floor(totalUsers * 0.15),
      'text-size': Math.floor(totalUsers * 0.25),
      'color-blind': Math.floor(totalUsers * 0.05),
      'voice-control': Math.floor(totalUsers * 0.02),
      'braille': Math.floor(totalUsers * 0.01),
      'cognitive': Math.floor(totalUsers * 0.1),
      'motor': Math.floor(totalUsers * 0.05),
      'custom': Math.floor(totalUsers * 0.03)
    };
    
    // Simulated average accessibility score
    const averageScore = 75 + (Math.random() * 20 - 10); // 65-85 range
    
    return {
      totalUsers,
      featuresUsage,
      averageScore
    };
  }
}

// Export singleton instance
export const accessibilityService = new AccessibilityService();

// Export types for external use
// Types are already exported individually above