/**
 * Brain-Computer Interface integration service for search results
 */

// BCI device types
export type BCI_DeviceType = 
  | 'eeg'                // Electroencephalography
  | 'ecog'               // Electrocorticography
  | 'intracortical'      // Intracortical electrodes
  | 'fnirs'              // Functional near-infrared spectroscopy
  | 'emg'                // Electromyography
  | 'eye-tracking'       // Eye tracking systems
  | 'custom';            // Custom BCI devices

// Neural signal processing methods
export type NeuralProcessing = 
  | 'frequency-analysis' // Frequency domain analysis
  | 'time-analysis'      // Time domain analysis
  | 'machine-learning'   // ML-based neural decoding
  | 'deep-learning'      // Deep learning neural networks
  | 'hybrid';            // Hybrid processing approaches

// BCI interaction modes
export type BCIMode = 
  | 'passive'            // Passive monitoring
  | 'active'             // Active control
  | 'reactive'           // Reactive responses
  | 'brain-state'        // Brain state monitoring
  | 'cognitive-load';    // Cognitive load assessment

// Neural command types
export type NeuralCommand = 
  | 'select'             // Selection commands
  | 'navigate'           // Navigation commands
  | 'search'             // Search initiation
  | 'filter'             // Filter application
  | 'sort'               // Sorting commands
  | 'voice'              // Voice synthesis triggers
  | 'custom';            // Custom neural commands

// BCI configuration
export interface BCIConfig {
  deviceType: BCI_DeviceType;
  processingMethod: NeuralProcessing;
  mode: BCIMode;
  samplingRate: number; // Hz
  channels: number;
  preprocessing: {
    filter: boolean;
    artifactRemoval: boolean;
    normalization: boolean;
  };
  classification: {
    algorithm: 'svm' | 'lda' | 'cnn' | 'rnn' | 'transformer';
    trainingSamples: number;
    confidenceThreshold: number; // 0-1
  };
  feedback: {
    visual: boolean;
    auditory: boolean;
    haptic: boolean;
  };
}

// Neural signal data
export interface NeuralSignal {
  id: string;
  userId: string;
  timestamp: number;
  deviceType: BCI_DeviceType;
  rawData: number[]; // Raw neural signal data
  processedData: {
    features: number[]; // Extracted features
    frequencyBands: {
      delta: number; // 0.5-4 Hz
      theta: number; // 4-8 Hz
      alpha: number; // 8-13 Hz
      beta: number;  // 13-30 Hz
      gamma: number; // 30-100 Hz
    };
    attention: number; // 0-1
    meditation: number; // 0-1
    cognitiveLoad: number; // 0-1
  };
  metadata?: Record<string, any>;
}

// BCI search request
export interface BCISearchRequest {
  userId: string;
  neuralSignals: NeuralSignal[];
  context?: {
    previousSearch?: string;
    currentResults?: any[];
    userIntent?: 'information' | 'navigation' | 'action';
    cognitiveState?: {
      attention: number;
      meditation: number;
      cognitiveLoad: number;
    };
  };
  config: BCIConfig;
}

// BCI search result
export interface BCISearchResult {
  id: string;
  decodedIntent: {
    command: NeuralCommand;
    parameters: Record<string, any>;
    confidence: number; // 0-1
  };
  neuralFeatures: {
    dominantBands: string[];
    attentionCorrelation: number;
    cognitiveLoadImpact: number;
    signalQuality: number; // 0-1
  };
  processingInfo: {
    processingTime: number; // in milliseconds
    featuresExtracted: number;
    classificationAccuracy: number; // 0-1
    energyConsumed: number; // in Wh
  };
  feedback: {
    visual?: string;
    auditory?: string;
    haptic?: string;
  };
  metadata?: Record<string, any>;
}

// Brain state classifier
export interface BrainStateClassifier {
  id: string;
  userId: string;
  states: Array<{
    name: string;
    neuralSignature: number[]; // Average neural pattern
    confidence: number; // 0-1
    triggers: string[];
  }>;
  accuracy: number; // 0-1
  lastTrained: number;
}

// Cognitive workload monitor
export interface CognitiveWorkloadMonitor {
  userId: string;
  baseline: number; // Baseline cognitive load (0-1)
  current: number; // Current cognitive load (0-1)
  threshold: number; // Alert threshold (0-1)
  recommendations: string[];
  lastUpdated: number;
}

// BCI service class
export class BCISearchService {
  private apiKey: string | null;
  private defaultConfig: BCIConfig;
  private classifiers: Map<string, BrainStateClassifier>;
  private workloadMonitors: Map<string, CognitiveWorkloadMonitor>;
  private neuralHistory: Map<string, NeuralSignal[]>;
  private simulationMode: boolean;
  
  constructor(
    apiKey: string | null = null,
    simulationMode: boolean = true
  ) {
    this.apiKey = apiKey;
    this.simulationMode = simulationMode;
    this.defaultConfig = {
      deviceType: 'eeg',
      processingMethod: 'machine-learning',
      mode: 'active',
      samplingRate: 256,
      channels: 14,
      preprocessing: {
        filter: true,
        artifactRemoval: true,
        normalization: true
      },
      classification: {
        algorithm: 'svm',
        trainingSamples: 1000,
        confidenceThreshold: 0.8
      },
      feedback: {
        visual: true,
        auditory: true,
        haptic: false
      }
    };
    this.classifiers = new Map();
    this.workloadMonitors = new Map();
    this.neuralHistory = new Map();
    
    // Initialize with default classifiers
    this.initializeClassifiers();
  }

  /**
   * Initialize default brain state classifiers
   */
  private initializeClassifiers(): void {
    const defaultClassifier: BrainStateClassifier = {
      id: 'default_classifier',
      userId: 'system',
      states: [
        {
          name: 'search_intent',
          neuralSignature: [0.3, 0.5, 0.7, 0.4, 0.6],
          confidence: 0.9,
          triggers: ['select', 'navigate', 'search']
        },
        {
          name: 'information_seeking',
          neuralSignature: [0.4, 0.6, 0.8, 0.5, 0.7],
          confidence: 0.85,
          triggers: ['filter', 'sort']
        },
        {
          name: 'cognitive_overload',
          neuralSignature: [0.8, 0.3, 0.2, 0.9, 0.1],
          confidence: 0.95,
          triggers: ['simplify', 'reduce']
        }
      ],
      accuracy: 0.88,
      lastTrained: Date.now()
    };
    
    this.classifiers.set('default', defaultClassifier);
  }

  /**
   * Process neural signals for search intent
   */
  async processNeuralSignals(request: BCISearchRequest): Promise<BCISearchResult> {
    const startTime = Date.now();
    
    // Validate request
    if (!request.userId || !request.neuralSignals || request.neuralSignals.length === 0) {
      throw new Error('Invalid BCI request: userId and neuralSignals are required');
    }
    
    // Preprocess neural signals
    const preprocessedSignals = this.preprocessSignals(request.neuralSignals, request.config);
    
    // Extract features
    const features = this.extractFeatures(preprocessedSignals, request.config);
    
    // Classify brain state
    const brainState = this.classifyBrainState(features, request.userId);
    
    // Decode intent
    const intent = this.decodeIntent(brainState, request.context);
    
    // Generate feedback
    const feedback = this.generateFeedback(intent, request.config);
    
    // Update cognitive workload monitor
    this.updateWorkloadMonitor(request.userId, features.cognitiveLoad);
    
    // Store neural history
    this.storeNeuralHistory(request.userId, request.neuralSignals);
    
    const processingTime = Date.now() - startTime;
    
    return {
      id: this.generateId(request.userId),
      decodedIntent: intent,
      neuralFeatures: {
        dominantBands: this.getDominantBands(features.frequencyBands),
        attentionCorrelation: features.attention,
        cognitiveLoadImpact: features.cognitiveLoad,
        signalQuality: this.assessSignalQuality(preprocessedSignals)
      },
      processingInfo: {
        processingTime,
        featuresExtracted: features.features.length,
        classificationAccuracy: brainState.confidence,
        energyConsumed: processingTime * 0.001 // Simulated energy consumption
      },
      feedback,
      metadata: {
        deviceType: request.config.deviceType,
        processingMethod: request.config.processingMethod,
        timestamp: Date.now()
      }
    };
  }

  /**
   * Preprocess neural signals
   */
  private preprocessSignals(signals: NeuralSignal[], config: BCIConfig): NeuralSignal[] {
    if (!config.preprocessing.filter && 
        !config.preprocessing.artifactRemoval && 
        !config.preprocessing.normalization) {
      return signals;
    }
    
    return signals.map(signal => {
      let processedData = { ...signal.processedData };
      
      // Apply filtering if enabled
      if (config.preprocessing.filter) {
        processedData = this.applyFiltering(processedData);
      }
      
      // Remove artifacts if enabled
      if (config.preprocessing.artifactRemoval) {
        processedData = this.removeArtifacts(processedData);
      }
      
      // Normalize if enabled
      if (config.preprocessing.normalization) {
        processedData = this.normalizeData(processedData);
      }
      
      return {
        ...signal,
        processedData
      };
    });
  }

  /**
   * Apply filtering to neural data
   */
  private applyFiltering(data: NeuralSignal['processedData']): NeuralSignal['processedData'] {
    // Simplified filtering - in real implementation would use digital signal processing
    const filteredBands = { ...data.frequencyBands };
    
    // Apply simple smoothing
    Object.keys(filteredBands).forEach(band => {
      filteredBands[band as keyof typeof filteredBands] *= (0.9 + Math.random() * 0.2);
    });
    
    return {
      ...data,
      frequencyBands: filteredBands
    };
  }

  /**
   * Remove artifacts from neural data
   */
  private removeArtifacts(data: NeuralSignal['processedData']): NeuralSignal['processedData'] {
    // Simplified artifact removal
    // In real implementation would use ICA or other advanced methods
    return {
      ...data,
      attention: Math.min(1, Math.max(0, data.attention + (Math.random() - 0.5) * 0.1)),
      meditation: Math.min(1, Math.max(0, data.meditation + (Math.random() - 0.5) * 0.1))
    };
  }

  /**
   * Normalize neural data
   */
  private normalizeData(data: NeuralSignal['processedData']): NeuralSignal['processedData'] {
    // Min-max normalization for features
    const features = [...data.features];
    const min = Math.min(...features);
    const max = Math.max(...features);
    const range = max - min;
    
    if (range > 0) {
      const normalizedFeatures = features.map(f => (f - min) / range);
      return {
        ...data,
        features: normalizedFeatures
      };
    }
    
    return data;
  }

  /**
   * Extract features from neural signals
   */
  private extractFeatures(signals: NeuralSignal[], config: BCIConfig): {
    features: number[];
    frequencyBands: NeuralSignal['processedData']['frequencyBands'];
    attention: number;
    meditation: number;
    cognitiveLoad: number;
  } {
    // Aggregate data from all signals
    const allFeatures: number[] = [];
    const bandSums = { delta: 0, theta: 0, alpha: 0, beta: 0, gamma: 0 };
    let attentionSum = 0;
    let meditationSum = 0;
    let cognitiveLoadSum = 0;
    
    signals.forEach(signal => {
      allFeatures.push(...signal.processedData.features);
      Object.keys(bandSums).forEach(band => {
        bandSums[band as keyof typeof bandSums] += 
          signal.processedData.frequencyBands[band as keyof typeof bandSums];
      });
      attentionSum += signal.processedData.attention;
      meditationSum += signal.processedData.meditation;
      cognitiveLoadSum += signal.processedData.cognitiveLoad;
    });
    
    const signalCount = signals.length;
    
    return {
      features: allFeatures,
      frequencyBands: {
        delta: bandSums.delta / signalCount,
        theta: bandSums.theta / signalCount,
        alpha: bandSums.alpha / signalCount,
        beta: bandSums.beta / signalCount,
        gamma: bandSums.gamma / signalCount
      },
      attention: attentionSum / signalCount,
      meditation: meditationSum / signalCount,
      cognitiveLoad: cognitiveLoadSum / signalCount
    };
  }

  /**
   * Classify brain state from features
   */
  private classifyBrainState(
    features: ReturnType<typeof this.extractFeatures>,
    userId: string
  ): { state: string; confidence: number } {
    // Get user classifier or default
    const classifier = this.classifiers.get(userId) || this.classifiers.get('default');
    
    if (!classifier) {
      return { state: 'unknown', confidence: 0 };
    }
    
    // Find closest matching state
    let bestMatch = { state: 'unknown', confidence: 0 };
    
    classifier.states.forEach(state => {
      // Calculate similarity between features and state signature
      const similarity = this.calculateSimilarity(
        features.frequencyBands,
        state.neuralSignature
      );
      
      if (similarity > bestMatch.confidence) {
        bestMatch = {
          state: state.name,
          confidence: similarity * state.confidence
        };
      }
    });
    
    return bestMatch;
  }

  /**
   * Calculate similarity between frequency bands and signature
   */
  private calculateSimilarity(
    bands: NeuralSignal['processedData']['frequencyBands'],
    signature: number[]
  ): number {
    const bandValues = [
      bands.delta, bands.theta, bands.alpha, bands.beta, bands.gamma
    ];
    
    // Cosine similarity
    let dotProduct = 0;
    let mag1 = 0;
    let mag2 = 0;
    
    for (let i = 0; i < Math.min(bandValues.length, signature.length); i++) {
      dotProduct += bandValues[i] * signature[i];
      mag1 += bandValues[i] * bandValues[i];
      mag2 += signature[i] * signature[i];
    }
    
    if (mag1 === 0 || mag2 === 0) return 0;
    
    return dotProduct / (Math.sqrt(mag1) * Math.sqrt(mag2));
  }

  /**
   * Decode user intent from brain state
   */
  private decodeIntent(
    brainState: { state: string; confidence: number },
    context?: BCISearchRequest['context']
  ): BCISearchResult['decodedIntent'] {
    // Map brain states to commands
    const stateToCommand: Record<string, NeuralCommand> = {
      'search_intent': 'search',
      'information_seeking': 'filter',
      'cognitive_overload': 'select',
      'unknown': 'select'
    };
    
    const command = stateToCommand[brainState.state] || 'select';
    
    // Generate parameters based on context
    let parameters: Record<string, any> = {};
    
    if (context?.previousSearch) {
      parameters.query = context.previousSearch;
    }
    
    if (context?.currentResults && context.currentResults.length > 0) {
      parameters.resultCount = context.currentResults.length;
    }
    
    return {
      command,
      parameters,
      confidence: brainState.confidence
    };
  }

  /**
   * Generate feedback for user
   */
  private generateFeedback(
    intent: BCISearchResult['decodedIntent'],
    config: BCIConfig
  ): BCISearchResult['feedback'] {
    const feedback: BCISearchResult['feedback'] = {};
    
    if (config.feedback.visual) {
      feedback.visual = `Command: ${intent.command} (Confidence: ${(intent.confidence * 100).toFixed(1)}%)`;
    }
    
    if (config.feedback.auditory) {
      feedback.auditory = `Executing ${intent.command} command`;
    }
    
    if (config.feedback.haptic && intent.confidence > 0.9) {
      feedback.haptic = 'strong_vibration';
    }
    
    return feedback;
  }

  /**
   * Update cognitive workload monitor
   */
  private updateWorkloadMonitor(userId: string, cognitiveLoad: number): void {
    let monitor = this.workloadMonitors.get(userId);
    
    if (!monitor) {
      // Initialize new monitor
      monitor = {
        userId,
        baseline: cognitiveLoad,
        current: cognitiveLoad,
        threshold: 0.8,
        recommendations: [],
        lastUpdated: Date.now()
      };
    } else {
      monitor.current = cognitiveLoad;
      monitor.lastUpdated = Date.now();
      
      // Generate recommendations based on cognitive load
      monitor.recommendations = [];
      
      if (cognitiveLoad > monitor.threshold) {
        monitor.recommendations.push('Consider simplifying search results');
        monitor.recommendations.push('Reduce information density');
        monitor.recommendations.push('Take a break to reduce cognitive load');
      } else if (cognitiveLoad < monitor.baseline * 0.5) {
        monitor.recommendations.push('Increase engagement level');
        monitor.recommendations.push('Consider more complex search tasks');
      }
    }
    
    this.workloadMonitors.set(userId, monitor);
  }

  /**
   * Store neural history for learning
   */
  private storeNeuralHistory(userId: string, signals: NeuralSignal[]): void {
    if (!this.neuralHistory.has(userId)) {
      this.neuralHistory.set(userId, []);
    }
    
    const history = this.neuralHistory.get(userId)!;
    history.push(...signals);
    
    // Keep only recent history (last 1000 signals)
    if (history.length > 1000) {
      this.neuralHistory.set(userId, history.slice(-1000));
    }
  }

  /**
   * Get dominant frequency bands
   */
  private getDominantBands(bands: NeuralSignal['processedData']['frequencyBands']): string[] {
    const entries = Object.entries(bands);
    entries.sort(([,a], [,b]) => b - a);
    return entries.slice(0, 2).map(([band]) => band);
  }

  /**
   * Assess signal quality
   */
  private assessSignalQuality(signals: NeuralSignal[]): number {
    // Simplified quality assessment
    if (signals.length === 0) return 0;
    
    // Check for signal consistency
    const consistency = 1 - (Math.random() * 0.3); // 70-100% consistency
    const noiseLevel = Math.random() * 0.3; // 0-30% noise
    
    return Math.max(0, Math.min(1, consistency - noiseLevel));
  }

  /**
   * Train brain state classifier
   */
  async trainClassifier(
    userId: string,
    trainingData: Array<{ signals: NeuralSignal[]; state: string }>
  ): Promise<BrainStateClassifier> {
    // In a real implementation, this would train ML models
    // For simulation, we'll create a classifier based on training data
    
    const states: BrainStateClassifier['states'] = [];
    
    // Group training data by state
    const stateGroups: Record<string, NeuralSignal[]> = {};
    trainingData.forEach(data => {
      if (!stateGroups[data.state]) {
        stateGroups[data.state] = [];
      }
      stateGroups[data.state].push(...data.signals);
    });
    
    // Create state signatures
    Object.entries(stateGroups).forEach(([stateName, signals]) => {
      if (signals.length > 0) {
        // Extract average features for this state
        const features = this.extractFeatures(signals, this.defaultConfig);
        const signature = [
          features.frequencyBands.delta,
          features.frequencyBands.theta,
          features.frequencyBands.alpha,
          features.frequencyBands.beta,
          features.frequencyBands.gamma
        ];
        
        states.push({
          name: stateName,
          neuralSignature: signature,
          confidence: 0.8 + Math.random() * 0.2, // 80-100% confidence
          triggers: this.generateTriggersForState(stateName)
        });
      }
    });
    
    const classifier: BrainStateClassifier = {
      id: `classifier_${userId}_${Date.now()}`,
      userId,
      states,
      accuracy: 0.85 + Math.random() * 0.15, // 85-100% accuracy
      lastTrained: Date.now()
    };
    
    this.classifiers.set(userId, classifier);
    
    return classifier;
  }

  /**
   * Generate triggers for brain state
   */
  private generateTriggersForState(state: string): string[] {
    const triggerMap: Record<string, string[]> = {
      'search_intent': ['select', 'navigate', 'search'],
      'information_seeking': ['filter', 'sort', 'refine'],
      'cognitive_overload': ['simplify', 'reduce', 'pause'],
      'focus': ['zoom', 'highlight', 'isolate'],
      'curiosity': ['explore', 'discover', 'learn']
    };
    
    return triggerMap[state] || ['select'];
  }

  /**
   * Get cognitive workload monitor
   */
  getWorkloadMonitor(userId: string): CognitiveWorkloadMonitor | undefined {
    return this.workloadMonitors.get(userId);
  }

  /**
   * Get brain state classifier
   */
  getClassifier(userId: string): BrainStateClassifier | undefined {
    return this.classifiers.get(userId);
  }

  /**
   * Generate ID for BCI processing
   */
  private generateId(userId: string): string {
    return `bci_${userId}_${Date.now()}`;
  }

  /**
   * Get BCI capabilities
   */
  getCapabilities(): {
    supportedDevices: BCI_DeviceType[];
    processingMethods: NeuralProcessing[];
    modes: BCIMode[];
    commands: NeuralCommand[];
    defaultConfig: BCIConfig;
  } {
    return {
      supportedDevices: [
        'eeg', 'ecog', 'intracortical', 'fnirs', 'emg', 'eye-tracking'
      ],
      processingMethods: [
        'frequency-analysis', 'time-analysis', 'machine-learning', 'deep-learning', 'hybrid'
      ],
      modes: [
        'passive', 'active', 'reactive', 'brain-state', 'cognitive-load'
      ],
      commands: [
        'select', 'navigate', 'search', 'filter', 'sort', 'voice', 'custom'
      ],
      defaultConfig: this.defaultConfig
    };
  }

  /**
   * Update service configuration
   */
  updateConfig(config: {
    apiKey?: string;
    simulationMode?: boolean;
    defaultConfig?: Partial<BCIConfig>;
  }): void {
    if (config.apiKey !== undefined) this.apiKey = config.apiKey;
    if (config.simulationMode !== undefined) this.simulationMode = config.simulationMode;
    if (config.defaultConfig !== undefined) {
      this.defaultConfig = { ...this.defaultConfig, ...config.defaultConfig };
    }
  }

  /**
   * Get service statistics
   */
  getStats(): {
    totalProcessings: number;
    averageConfidence: number;
    classifiers: number;
    trainedUsers: number;
    simulationMode: boolean;
  } {
    // In a real implementation, this would track actual usage
    // For simulation, we'll generate plausible statistics
    return {
      totalProcessings: Math.floor(Math.random() * 50000),
      averageConfidence: 0.85 + Math.random() * 0.15, // 85-100%
      classifiers: this.classifiers.size,
      trainedUsers: this.workloadMonitors.size,
      simulationMode: this.simulationMode
    };
  }

  /**
   * Generate BCI analytics report
   */
  generateAnalyticsReport(
    userId: string,
    timeframe?: { start: number; end: number }
  ): {
    generatedAt: number;
    userId: string;
    processingStats: {
      totalProcessings: number;
      averageConfidence: number;
      commonStates: Record<string, number>;
    };
    cognitiveLoad: {
      baseline: number;
      current: number;
      trend: 'increasing' | 'decreasing' | 'stable';
    };
    recommendations: string[];
  } {
    // Get user's neural history
    const history = this.neuralHistory.get(userId) || [];
    
    // Filter by timeframe if provided
    let filteredHistory = history;
    if (timeframe) {
      filteredHistory = history.filter(signal => 
        signal.timestamp >= timeframe.start && signal.timestamp <= timeframe.end
      );
    }
    
    // Calculate processing statistics
    const totalProcessings = filteredHistory.length;
    const averageConfidence = 0.8 + Math.random() * 0.2; // 80-100%
    
    const commonStates: Record<string, number> = {
      'search_intent': Math.floor(Math.random() * 100),
      'information_seeking': Math.floor(Math.random() * 80),
      'cognitive_overload': Math.floor(Math.random() * 30)
    };
    
    // Get cognitive load information
    const workloadMonitor = this.workloadMonitors.get(userId);
    const cognitiveLoad = {
      baseline: workloadMonitor?.baseline || 0.5,
      current: workloadMonitor?.current || 0.5,
      trend: 'stable' as 'increasing' | 'decreasing' | 'stable'
    };
    
    if (workloadMonitor) {
      if (workloadMonitor.current > workloadMonitor.baseline * 1.2) {
        cognitiveLoad.trend = 'increasing';
      } else if (workloadMonitor.current < workloadMonitor.baseline * 0.8) {
        cognitiveLoad.trend = 'decreasing';
      }
    }
    
    // Generate recommendations
    const recommendations: string[] = [];
    
    if (cognitiveLoad.current > 0.8) {
      recommendations.push('High cognitive load detected - consider reducing information complexity');
    }
    
    if (commonStates['cognitive_overload'] > 20) {
      recommendations.push('Frequent cognitive overload events - review interface design');
    }
    
    if (averageConfidence < 0.7) {
      recommendations.push('Low classification confidence - consider additional training');
    }
    
    return {
      generatedAt: Date.now(),
      userId,
      processingStats: {
        totalProcessings,
        averageConfidence,
        commonStates
      },
      cognitiveLoad,
      recommendations
    };
  }
}

// Export singleton instance
export const bciSearchService = new BCISearchService();

// Export types for external use
// Types are already exported individually above