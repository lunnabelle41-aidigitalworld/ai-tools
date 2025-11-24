/**
 * Privacy and compliance service for search results
 */

// Privacy levels
export type PrivacyLevel = 
  | 'public'          // Publicly accessible
  | 'internal'        // Internal to organization
  | 'confidential'    // Confidential information
  | 'restricted'      // Access restricted
  | 'classified'      // Classified information
  | 'custom';         // Custom privacy level

// Compliance frameworks
export type ComplianceFramework = 
  | 'gdpr'            // General Data Protection Regulation
  | 'ccpa'            // California Consumer Privacy Act
  | 'hipaa'           // Health Insurance Portability and Accountability Act
  | 'sox'             // Sarbanes-Oxley Act
  | 'pci'             // Payment Card Industry Data Security Standard
  | 'ferpa'           // Family Educational Rights and Privacy Act
  | 'glba'            // Gramm-Leach-Bliley Act
  | 'custom';         // Custom compliance framework

// Data classification
export type DataClassification = 
  | 'pii'             // Personally Identifiable Information
  | 'phi'             // Protected Health Information
  | 'financial'       // Financial data
  | 'intellectual_property' // Intellectual property
  | 'trade_secrets'   // Trade secrets
  | 'government'      // Government data
  | 'legal'           // Legal information
  | 'custom';         // Custom classification

// Privacy policy
export interface PrivacyPolicy {
  id: string;
  name: string;
  description: string;
  effectiveDate: number;
  version: string;
  rules: PrivacyRule[];
  complianceFrameworks: ComplianceFramework[];
}

// Privacy rule
export interface PrivacyRule {
  id: string;
  name: string;
  description: string;
  condition: PrivacyCondition;
  action: PrivacyAction;
  priority: number; // Higher number = higher priority
  enabled: boolean;
}

// Privacy condition
export interface PrivacyCondition {
  type: 'contains' | 'matches' | 'classification' | 'source' | 'user_role' | 'custom';
  value: string | string[] | DataClassification | RegExp;
  field?: string; // Field to check (e.g., 'content', 'title', 'metadata')
}

// Privacy action
export interface PrivacyAction {
  type: 'redact' | 'mask' | 'block' | 'encrypt' | 'anonymize' | 'notify' | 'log' | 'custom';
  parameters?: Record<string, any>;
}

// Compliance requirement
export interface ComplianceRequirement {
  id: string;
  framework: ComplianceFramework;
  requirement: string;
  description: string;
  verificationMethod: string;
  status: 'compliant' | 'nonCompliant' | 'pending' | 'notApplicable';
  lastChecked: number;
  nextCheck: number;
}

// Data retention policy
export interface RetentionPolicy {
  id: string;
  name: string;
  description: string;
  retentionPeriod: number; // in days
  retentionType: 'permanent' | 'temporary' | 'until_event';
  triggerEvent?: string;
  autoDelete: boolean;
  notifyBeforeDelete: boolean;
  notificationPeriod?: number; // in days
}

// Audit log entry
export interface AuditLogEntry {
  id: string;
  timestamp: number;
  userId: string;
  action: string;
  resource: string;
  ipAddress?: string;
  userAgent?: string;
  success: boolean;
  details?: Record<string, any>;
}

// Privacy and compliance service class
export class PrivacyComplianceService {
  private privacyPolicies: Map<string, PrivacyPolicy>;
  private complianceRequirements: Map<string, ComplianceRequirement>;
  private retentionPolicies: Map<string, RetentionPolicy>;
  private auditLog: AuditLogEntry[];
  private maxAuditLogEntries: number;
  
  constructor(maxAuditLogEntries: number = 10000) {
    this.privacyPolicies = new Map();
    this.complianceRequirements = new Map();
    this.retentionPolicies = new Map();
    this.auditLog = [];
    this.maxAuditLogEntries = maxAuditLogEntries;
    
    // Initialize with default policies
    this.initializeDefaultPolicies();
  }

  /**
   * Initialize default privacy policies
   */
  private initializeDefaultPolicies(): void {
    // Default privacy policy
    const defaultPolicy: PrivacyPolicy = {
      id: 'default',
      name: 'Default Privacy Policy',
      description: 'Standard privacy policy for all search results',
      effectiveDate: Date.now(),
      version: '1.0',
      rules: [
        {
          id: 'pii_redact',
          name: 'PII Redaction',
          description: 'Redact personally identifiable information',
          condition: {
            type: 'classification',
            value: 'pii'
          },
          action: {
            type: 'redact',
            parameters: {
              replacement: '[REDACTED]'
            }
          },
          priority: 100,
          enabled: true
        },
        {
          id: 'phi_block',
          name: 'PHI Blocking',
          description: 'Block protected health information for unauthorized users',
          condition: {
            type: 'classification',
            value: 'phi'
          },
          action: {
            type: 'block'
          },
          priority: 90,
          enabled: true
        }
      ],
      complianceFrameworks: ['gdpr', 'ccpa']
    };
    
    this.privacyPolicies.set('default', defaultPolicy);
    
    // Default compliance requirements
    const defaultRequirements: ComplianceRequirement[] = [
      {
        id: 'gdpr_consent',
        framework: 'gdpr',
        requirement: 'User consent for data processing',
        description: 'Obtain explicit consent before processing personal data',
        verificationMethod: 'Consent management system',
        status: 'compliant',
        lastChecked: Date.now(),
        nextCheck: Date.now() + 30 * 24 * 60 * 60 * 1000 // 30 days
      },
      {
        id: 'ccpa_disclosure',
        framework: 'ccpa',
        requirement: 'Data disclosure rights',
        description: 'Provide users with the right to know what personal information is collected',
        verificationMethod: 'Privacy dashboard',
        status: 'compliant',
        lastChecked: Date.now(),
        nextCheck: Date.now() + 30 * 24 * 60 * 60 * 1000 // 30 days
      }
    ];
    
    defaultRequirements.forEach(req => {
      this.complianceRequirements.set(req.id, req);
    });
    
    // Default retention policy
    const defaultRetentionPolicy: RetentionPolicy = {
      id: 'default',
      name: 'Default Retention Policy',
      description: 'Standard retention policy for search queries and results',
      retentionPeriod: 365, // 1 year
      retentionType: 'temporary',
      autoDelete: true,
      notifyBeforeDelete: true,
      notificationPeriod: 30 // 30 days before deletion
    };
    
    this.retentionPolicies.set('default', defaultRetentionPolicy);
  }

  /**
   * Add or update privacy policy
   */
  addPrivacyPolicy(policy: PrivacyPolicy): void {
    this.privacyPolicies.set(policy.id, policy);
    this.logAudit('policy_added', 'system', `Privacy policy ${policy.id} added/updated`);
  }

  /**
   * Remove privacy policy
   */
  removePrivacyPolicy(policyId: string): boolean {
    const result = this.privacyPolicies.delete(policyId);
    if (result) {
      this.logAudit('policy_removed', 'system', `Privacy policy ${policyId} removed`);
    }
    return result;
  }

  /**
   * Get privacy policy
   */
  getPrivacyPolicy(policyId: string): PrivacyPolicy | undefined {
    return this.privacyPolicies.get(policyId);
  }

  /**
   * Apply privacy rules to content
   */
  applyPrivacyRules(
    content: string,
    metadata: Record<string, any> = {},
    userId?: string,
    userRole?: string
  ): {
    processedContent: string;
    appliedRules: PrivacyRule[];
    modifications: Array<{
      ruleId: string;
      original: string;
      modified: string;
      position: { start: number; end: number };
    }>;
  } {
    let processedContent = content;
    const appliedRules: PrivacyRule[] = [];
    const modifications: Array<{
      ruleId: string;
      original: string;
      modified: string;
      position: { start: number; end: number };
    }> = [];
    
    // Get all enabled rules sorted by priority
    const rules = Array.from(this.privacyPolicies.values())
      .flatMap(policy => policy.rules)
      .filter(rule => rule.enabled)
      .sort((a, b) => b.priority - a.priority);
    
    // Apply each rule
    for (const rule of rules) {
      const matches = this.evaluateCondition(
        rule.condition,
        processedContent,
        metadata,
        userId,
        userRole
      );
      
      if (matches) {
        const result = this.applyAction(
          rule.action,
          processedContent,
          rule.condition.field || 'content'
        );
        
        if (result.modified) {
          processedContent = result.content;
          appliedRules.push(rule);
          
          modifications.push({
            ruleId: rule.id,
            original: result.original,
            modified: result.modified,
            position: result.position
          });
        }
      }
    }
    
    return {
      processedContent,
      appliedRules,
      modifications
    };
  }

  /**
   * Evaluate privacy condition
   */
  private evaluateCondition(
    condition: PrivacyCondition,
    content: string,
    metadata: Record<string, any>,
    userId?: string,
    userRole?: string
  ): boolean {
    switch (condition.type) {
      case 'contains':
        if (typeof condition.value === 'string') {
          return content.includes(condition.value);
        } else if (Array.isArray(condition.value)) {
          return condition.value.some(val => content.includes(val));
        }
        return false;
        
      case 'matches':
        if (condition.value instanceof RegExp) {
          return condition.value.test(content);
        } else if (typeof condition.value === 'string') {
          try {
            const regex = new RegExp(condition.value);
            return regex.test(content);
          } catch {
            return false;
          }
        }
        return false;
        
      case 'classification':
        // In a real implementation, this would use ML to classify content
        // For simulation, we'll check for keywords
        if (condition.value === 'pii') {
          const piiPatterns = [
            /\b\d{3}-\d{2}-\d{4}\b/, // SSN
            /\b\d{4}[-\s]?\d{4}[-\s]?\d{4}[-\s]?\d{4}\b/, // Credit card
            /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/ // Email
          ];
          return piiPatterns.some(pattern => pattern.test(content));
        } else if (condition.value === 'phi') {
          const phiPatterns = [
            /patient\s+\w+/i,
            /medical\s+record/i,
            /diagnosis/i,
            /prescription/i
          ];
          return phiPatterns.some(pattern => pattern.test(content));
        }
        return false;
        
      case 'source':
        if (condition.field && metadata[condition.field]) {
          const fieldContent = metadata[condition.field];
          if (typeof condition.value === 'string') {
            return fieldContent.includes(condition.value);
          } else if (Array.isArray(condition.value)) {
            return condition.value.some(val => fieldContent.includes(val));
          }
        }
        return false;
        
      case 'user_role':
        if (userRole) {
          if (typeof condition.value === 'string') {
            return userRole === condition.value;
          } else if (Array.isArray(condition.value)) {
            return condition.value.includes(userRole);
          }
        }
        return false;
        
      case 'custom':
        // Custom condition evaluation would be implemented here
        return false;
        
      default:
        return false;
    }
  }

  /**
   * Apply privacy action
   */
  private applyAction(
    action: PrivacyAction,
    content: string,
    field: string
  ): {
    content: string;
    modified: string;
    original: string;
    position: { start: number; end: number };
  } {
    switch (action.type) {
      case 'redact':
        // Find and redact sensitive information
        const piiPattern = /\b\d{3}-\d{2}-\d{4}\b|\b\d{4}[-\s]?\d{4}[-\s]?\d{4}[-\s]?\d{4}\b|\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
        const matches = content.match(piiPattern);
        
        if (matches && matches.length > 0) {
          const match = matches[0];
          const startIndex = content.indexOf(match);
          const replacement = action.parameters?.replacement || '[REDACTED]';
          const modifiedContent = content.replace(match, replacement);
          
          return {
            content: modifiedContent,
            modified: replacement,
            original: match,
            position: {
              start: startIndex,
              end: startIndex + match.length
            }
          };
        }
        break;
        
      case 'mask':
        // Mask sensitive information
        const maskPattern = /\b\d{3}-\d{2}-\d{4}\b/g;
        const maskMatches = content.match(maskPattern);
        
        if (maskMatches && maskMatches.length > 0) {
          const match = maskMatches[0];
          const startIndex = content.indexOf(match);
          const masked = match.replace(/^(\d{3}-\d{2})-\d{4}$/, '$1-****');
          const modifiedContent = content.replace(match, masked);
          
          return {
            content: modifiedContent,
            modified: masked,
            original: match,
            position: {
              start: startIndex,
              end: startIndex + match.length
            }
          };
        }
        break;
        
      case 'block':
        // Return empty content to block access
        return {
          content: '',
          modified: '',
          original: content,
          position: {
            start: 0,
            end: content.length
          }
        };
        
      case 'anonymize':
        // Anonymize content by removing identifiers
        const anonymizedContent = content
          .replace(/\b\d{3}-\d{2}-\d{4}\b/g, '***-**-****')
          .replace(/\b\d{4}[-\s]?\d{4}[-\s]?\d{4}[-\s]?\d{4}\b/g, '****-****-****-****')
          .replace(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g, 'user@domain.com');
        
        return {
          content: anonymizedContent,
          modified: anonymizedContent,
          original: content,
          position: {
            start: 0,
            end: content.length
          }
        };
        
      default:
        // No modification for other actions
        break;
    }
    
    return {
      content,
      modified: '',
      original: '',
      position: {
        start: 0,
        end: 0
      }
    };
  }

  /**
   * Add compliance requirement
   */
  addComplianceRequirement(requirement: ComplianceRequirement): void {
    this.complianceRequirements.set(requirement.id, requirement);
    this.logAudit('compliance_added', 'system', `Compliance requirement ${requirement.id} added/updated`);
  }

  /**
   * Check compliance status
   */
  checkCompliance(framework?: ComplianceFramework): {
    compliant: number;
    nonCompliant: number;
    pending: number;
    notApplicable: number;
    details: ComplianceRequirement[];
  } {
    const requirements = framework 
      ? Array.from(this.complianceRequirements.values()).filter(req => req.framework === framework)
      : Array.from(this.complianceRequirements.values());
    
    const statusCounts = {
      compliant: 0,
      nonCompliant: 0,
      pending: 0,
      notApplicable: 0
    };
    
    requirements.forEach(req => {
      statusCounts[req.status as keyof typeof statusCounts]++;
    });
    
    return {
      ...statusCounts,
      details: requirements
    };
  }

  /**
   * Add retention policy
   */
  addRetentionPolicy(policy: RetentionPolicy): void {
    this.retentionPolicies.set(policy.id, policy);
    this.logAudit('retention_added', 'system', `Retention policy ${policy.id} added/updated`);
  }

  /**
   * Check data retention
   */
  checkDataRetention(data: Array<{ id: string; createdAt: number; type: string }>): Array<{
    id: string;
    action: 'retain' | 'notify' | 'delete';
    policy: RetentionPolicy;
    daysUntilAction: number;
  }> {
    const now = Date.now();
    const results: Array<{
      id: string;
      action: 'retain' | 'notify' | 'delete';
      policy: RetentionPolicy;
      daysUntilAction: number;
    }> = [];
    
    const defaultPolicy = this.retentionPolicies.get('default');
    if (!defaultPolicy) return results;
    
    data.forEach(item => {
      const ageInDays = (now - item.createdAt) / (24 * 60 * 60 * 1000);
      
      if (ageInDays >= defaultPolicy.retentionPeriod) {
        // Data has exceeded retention period
        results.push({
          id: item.id,
          action: 'delete',
          policy: defaultPolicy,
          daysUntilAction: 0
        });
      } else if (
        defaultPolicy.notifyBeforeDelete && 
        defaultPolicy.notificationPeriod &&
        ageInDays >= (defaultPolicy.retentionPeriod - defaultPolicy.notificationPeriod)
      ) {
        // Data will exceed retention period soon
        const daysUntilExpiry = defaultPolicy.retentionPeriod - ageInDays;
        results.push({
          id: item.id,
          action: 'notify',
          policy: defaultPolicy,
          daysUntilAction: Math.ceil(daysUntilExpiry)
        });
      } else {
        // Data is within retention period
        const daysUntilExpiry = defaultPolicy.retentionPeriod - ageInDays;
        results.push({
          id: item.id,
          action: 'retain',
          policy: defaultPolicy,
          daysUntilAction: Math.ceil(daysUntilExpiry)
        });
      }
    });
    
    return results;
  }

  /**
   * Log audit entry
   */
  private logAudit(
    action: string,
    userId: string,
    resource: string,
    details?: Record<string, any>
  ): void {
    const entry: AuditLogEntry = {
      id: `audit_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: Date.now(),
      userId,
      action,
      resource,
      success: true,
      details
    };
    
    this.auditLog.push(entry);
    
    // Maintain maximum log size
    if (this.auditLog.length > this.maxAuditLogEntries) {
      this.auditLog = this.auditLog.slice(-this.maxAuditLogEntries);
    }
  }

  /**
   * Get audit log
   */
  getAuditLog(
    limit: number = 100,
    filter?: {
      userId?: string;
      action?: string;
      startDate?: number;
      endDate?: number;
    }
  ): AuditLogEntry[] {
    let filteredLogs = [...this.auditLog];
    
    if (filter) {
      if (filter.userId) {
        filteredLogs = filteredLogs.filter(entry => entry.userId === filter.userId);
      }
      
      if (filter.action) {
        filteredLogs = filteredLogs.filter(entry => entry.action === filter.action);
      }
      
      if (filter.startDate) {
        filteredLogs = filteredLogs.filter(entry => entry.timestamp >= filter.startDate!);
      }
      
      if (filter.endDate) {
        filteredLogs = filteredLogs.filter(entry => entry.timestamp <= filter.endDate!);
      }
    }
    
    // Sort by timestamp descending and limit
    return filteredLogs
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, limit);
  }

  /**
   * Generate compliance report
   */
  generateComplianceReport(framework?: ComplianceFramework): {
    generatedAt: number;
    framework: ComplianceFramework | 'all';
    summary: {
      totalRequirements: number;
      compliant: number;
      nonCompliant: number;
      pending: number;
      notApplicable: number;
      complianceRate: number;
    };
    details: ComplianceRequirement[];
  } {
    const complianceStatus = this.checkCompliance(framework);
    const totalRequirements = complianceStatus.details.length;
    const compliantCount = complianceStatus.compliant;
    const complianceRate = totalRequirements > 0 ? (compliantCount / totalRequirements) * 100 : 0;
    
    return {
      generatedAt: Date.now(),
      framework: framework || 'all',
      summary: {
        totalRequirements,
        compliant: complianceStatus.compliant,
        nonCompliant: complianceStatus.nonCompliant,
        pending: complianceStatus.pending,
        notApplicable: complianceStatus.notApplicable,
        complianceRate
      },
      details: complianceStatus.details
    };
  }

  /**
   * Get service statistics
   */
  getStats(): {
    policies: number;
    complianceRequirements: number;
    retentionPolicies: number;
    auditLogEntries: number;
    lastAuditEntry: number | null;
  } {
    return {
      policies: this.privacyPolicies.size,
      complianceRequirements: this.complianceRequirements.size,
      retentionPolicies: this.retentionPolicies.size,
      auditLogEntries: this.auditLog.length,
      lastAuditEntry: this.auditLog.length > 0 ? 
        this.auditLog[this.auditLog.length - 1].timestamp : null
    };
  }
}

// Export singleton instance
export const privacyComplianceService = new PrivacyComplianceService();

// Export types for external use
// Types are already exported individually above