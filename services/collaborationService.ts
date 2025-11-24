/**
 * Real-time collaboration service for search
 */

// Collaboration session
export interface CollaborationSession {
  id: string;
  name: string;
  participants: Participant[];
  owner: string; // User ID of session owner
  createdAt: number;
  updatedAt: number;
  isActive: boolean;
  settings: CollaborationSettings;
}

// Participant in collaboration session
export interface Participant {
  id: string;
  name: string;
  role: 'owner' | 'editor' | 'viewer';
  joinedAt: number;
  lastActive: number;
  color: string; // For UI identification
  cursor?: {
    x: number;
    y: number;
  };
}

// Collaboration settings
export interface CollaborationSettings {
  allowEditing: boolean;
  allowCommenting: boolean;
  allowSharing: boolean;
  visibility: 'private' | 'invite-only' | 'public';
  enableRealTimeSync: boolean;
  enableNotifications: boolean;
  maxParticipants: number;
}

// Shared search context
export interface SharedSearchContext {
  query: string;
  filters: Record<string, any>;
  results: any[];
  selectedResult?: string; // ID of currently selected result
  highlightedText?: string;
  notes: SharedNote[];
  annotations: SharedAnnotation[];
  updatedAt?: number;
}

// Shared note
export interface SharedNote {
  id: string;
  author: string;
  content: string;
  createdAt: number;
  updatedAt: number;
  position?: {
    x: number;
    y: number;
  };
  target?: string; // ID of result or element this note is attached to
}

// Shared annotation
export interface SharedAnnotation {
  id: string;
  author: string;
  content: string;
  createdAt: number;
  updatedAt: number;
  target: {
    resultId: string;
    text: string;
    startIndex: number;
    endIndex: number;
  };
  type: 'highlight' | 'comment' | 'question' | 'suggestion';
  replies: SharedReply[];
}

// Reply to annotation
export interface SharedReply {
  id: string;
  author: string;
  content: string;
  createdAt: number;
}

// Collaboration event types
export type CollaborationEvent = 
  | 'session-created'
  | 'participant-joined'
  | 'participant-left'
  | 'query-changed'
  | 'filters-changed'
  | 'results-updated'
  | 'result-selected'
  | 'note-added'
  | 'note-updated'
  | 'note-deleted'
  | 'annotation-added'
  | 'annotation-updated'
  | 'annotation-deleted'
  | 'cursor-moved'
  | 'settings-changed'
  | 'session-ended';

// Collaboration event
export interface CollaborationEventPayload {
  type: CollaborationEvent;
  sessionId: string;
  userId: string;
  timestamp: number;
  data: any;
}

// Real-time collaboration service class
export class RealTimeCollaborationService {
  private sessions: Map<string, CollaborationSession>;
  private searchContexts: Map<string, SharedSearchContext>;
  private eventListeners: Map<string, Array<(event: CollaborationEventPayload) => void>>;
  private userSessions: Map<string, string[]>; // userId -> sessionIds
  private maxSessions: number;
  
  constructor(maxSessions: number = 1000) {
    this.sessions = new Map();
    this.searchContexts = new Map();
    this.eventListeners = new Map();
    this.userSessions = new Map();
    this.maxSessions = maxSessions;
  }

  /**
   * Create a new collaboration session
   */
  createSession(
    name: string,
    ownerId: string,
    ownerName: string,
    settings?: Partial<CollaborationSettings>
  ): CollaborationSession {
    // Check if user has reached max sessions
    const userSessionCount = this.userSessions.get(ownerId)?.length || 0;
    if (userSessionCount >= 10) { // Limit to 10 sessions per user
      throw new Error('Maximum number of sessions reached');
    }
    
    const sessionId = this.generateSessionId();
    
    const defaultSettings: CollaborationSettings = {
      allowEditing: true,
      allowCommenting: true,
      allowSharing: true,
      visibility: 'invite-only',
      enableRealTimeSync: true,
      enableNotifications: true,
      maxParticipants: 50
    };
    
    const session: CollaborationSession = {
      id: sessionId,
      name,
      participants: [{
        id: ownerId,
        name: ownerName,
        role: 'owner',
        joinedAt: Date.now(),
        lastActive: Date.now(),
        color: this.generateUserColor()
      }],
      owner: ownerId,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      isActive: true,
      settings: { ...defaultSettings, ...settings }
    };
    
    this.sessions.set(sessionId, session);
    
    // Initialize shared search context
    this.searchContexts.set(sessionId, {
      query: '',
      filters: {},
      results: [],
      notes: [],
      annotations: []
    });
    
    // Track user sessions
    const userSessions = this.userSessions.get(ownerId) || [];
    userSessions.push(sessionId);
    this.userSessions.set(ownerId, userSessions);
    
    // Emit event
    this.emitEvent({
      type: 'session-created',
      sessionId,
      userId: ownerId,
      timestamp: Date.now(),
      data: { session }
    });
    
    return session;
  }

  /**
   * Join an existing collaboration session
   */
  joinSession(
    sessionId: string,
    userId: string,
    userName: string,
    role: 'editor' | 'viewer' = 'viewer'
  ): CollaborationSession | null {
    const session = this.sessions.get(sessionId);
    if (!session || !session.isActive) {
      return null;
    }
    
    // Check participant limit
    if (session.participants.length >= session.settings.maxParticipants) {
      throw new Error('Session has reached maximum participants');
    }
    
    // Check if user is already in session
    const existingParticipant = session.participants.find(p => p.id === userId);
    if (existingParticipant) {
      // Update last active time
      existingParticipant.lastActive = Date.now();
      session.updatedAt = Date.now();
      return session;
    }
    
    // Add new participant
    const participant: Participant = {
      id: userId,
      name: userName,
      role,
      joinedAt: Date.now(),
      lastActive: Date.now(),
      color: this.generateUserColor()
    };
    
    session.participants.push(participant);
    session.updatedAt = Date.now();
    
    // Track user sessions
    const userSessions = this.userSessions.get(userId) || [];
    if (!userSessions.includes(sessionId)) {
      userSessions.push(sessionId);
      this.userSessions.set(userId, userSessions);
    }
    
    // Emit event
    this.emitEvent({
      type: 'participant-joined',
      sessionId,
      userId,
      timestamp: Date.now(),
      data: { participant }
    });
    
    return session;
  }

  /**
   * Leave a collaboration session
   */
  leaveSession(sessionId: string, userId: string): boolean {
    const session = this.sessions.get(sessionId);
    if (!session) {
      return false;
    }
    
    // Remove participant
    const participantIndex = session.participants.findIndex(p => p.id === userId);
    if (participantIndex === -1) {
      return false;
    }
    
    const participant = session.participants[participantIndex];
    session.participants.splice(participantIndex, 1);
    session.updatedAt = Date.now();
    
    // If owner left and no participants remain, end session
    if (participant.role === 'owner' && session.participants.length === 0) {
      this.endSession(sessionId);
    }
    
    // Remove from user sessions
    const userSessions = this.userSessions.get(userId) || [];
    const updatedSessions = userSessions.filter(id => id !== sessionId);
    this.userSessions.set(userId, updatedSessions);
    
    // Emit event
    this.emitEvent({
      type: 'participant-left',
      sessionId,
      userId,
      timestamp: Date.now(),
      data: { participant }
    });
    
    return true;
  }

  /**
   * End a collaboration session
   */
  endSession(sessionId: string): boolean {
    const session = this.sessions.get(sessionId);
    if (!session) {
      return false;
    }
    
    session.isActive = false;
    session.updatedAt = Date.now();
    
    // Remove search context
    this.searchContexts.delete(sessionId);
    
    // Remove from all user sessions
    session.participants.forEach(participant => {
      const userSessions = this.userSessions.get(participant.id) || [];
      const updatedSessions = userSessions.filter(id => id !== sessionId);
      this.userSessions.set(participant.id, updatedSessions);
    });
    
    // Emit event
    this.emitEvent({
      type: 'session-ended',
      sessionId,
      userId: session.owner,
      timestamp: Date.now(),
      data: { session }
    });
    
    return true;
  }

  /**
   * Update search query in session
   */
  updateQuery(sessionId: string, userId: string, query: string): boolean {
    const session = this.sessions.get(sessionId);
    const context = this.searchContexts.get(sessionId);
    
    if (!session || !context || !session.isActive) {
      return false;
    }
    
    context.query = query;
    context.updatedAt = Date.now();
    
    // Update session timestamp
    session.updatedAt = Date.now();
    
    // Emit event
    this.emitEvent({
      type: 'query-changed',
      sessionId,
      userId,
      timestamp: Date.now(),
      data: { query }
    });
    
    return true;
  }

  /**
   * Update search filters in session
   */
  updateFilters(sessionId: string, userId: string, filters: Record<string, any>): boolean {
    const session = this.sessions.get(sessionId);
    const context = this.searchContexts.get(sessionId);
    
    if (!session || !context || !session.isActive) {
      return false;
    }
    
    context.filters = { ...context.filters, ...filters };
    context.updatedAt = Date.now();
    
    // Update session timestamp
    session.updatedAt = Date.now();
    
    // Emit event
    this.emitEvent({
      type: 'filters-changed',
      sessionId,
      userId,
      timestamp: Date.now(),
      data: { filters }
    });
    
    return true;
  }

  /**
   * Update search results in session
   */
  updateResults(sessionId: string, userId: string, results: any[]): boolean {
    const session = this.sessions.get(sessionId);
    const context = this.searchContexts.get(sessionId);
    
    if (!session || !context || !session.isActive) {
      return false;
    }
    
    context.results = results;
    context.updatedAt = Date.now();
    
    // Update session timestamp
    session.updatedAt = Date.now();
    
    // Emit event
    this.emitEvent({
      type: 'results-updated',
      sessionId,
      userId,
      timestamp: Date.now(),
      data: { results }
    });
    
    return true;
  }

  /**
   * Select a result in session
   */
  selectResult(sessionId: string, userId: string, resultId: string): boolean {
    const session = this.sessions.get(sessionId);
    const context = this.searchContexts.get(sessionId);
    
    if (!session || !context || !session.isActive) {
      return false;
    }
    
    context.selectedResult = resultId;
    context.updatedAt = Date.now();
    
    // Update session timestamp
    session.updatedAt = Date.now();
    
    // Emit event
    this.emitEvent({
      type: 'result-selected',
      sessionId,
      userId,
      timestamp: Date.now(),
      data: { resultId }
    });
    
    return true;
  }

  /**
   * Add a note to session
   */
  addNote(sessionId: string, userId: string, note: Omit<SharedNote, 'id' | 'author' | 'createdAt' | 'updatedAt'>): SharedNote | null {
    const session = this.sessions.get(sessionId);
    const context = this.searchContexts.get(sessionId);
    
    if (!session || !context || !session.isActive) {
      return null;
    }
    
    // Check permissions
    const participant = session.participants.find(p => p.id === userId);
    if (!participant || (participant.role === 'viewer' && !session.settings.allowCommenting)) {
      return null;
    }
    
    const newNote: SharedNote = {
      id: this.generateNoteId(),
      author: userId,
      content: note.content,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      position: note.position,
      target: note.target
    };
    
    context.notes.push(newNote);
    context.updatedAt = Date.now();
    
    // Update session timestamp
    session.updatedAt = Date.now();
    
    // Emit event
    this.emitEvent({
      type: 'note-added',
      sessionId,
      userId,
      timestamp: Date.now(),
      data: { note: newNote }
    });
    
    return newNote;
  }

  /**
   * Add an annotation to session
   */
  addAnnotation(sessionId: string, userId: string, annotation: Omit<SharedAnnotation, 'id' | 'author' | 'createdAt' | 'updatedAt' | 'replies'>): SharedAnnotation | null {
    const session = this.sessions.get(sessionId);
    const context = this.searchContexts.get(sessionId);
    
    if (!session || !context || !session.isActive) {
      return null;
    }
    
    // Check permissions
    const participant = session.participants.find(p => p.id === userId);
    if (!participant || (participant.role === 'viewer' && !session.settings.allowCommenting)) {
      return null;
    }
    
    const newAnnotation: SharedAnnotation = {
      id: this.generateAnnotationId(),
      author: userId,
      content: annotation.content,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      target: annotation.target,
      type: annotation.type,
      replies: []
    };
    
    context.annotations.push(newAnnotation);
    context.updatedAt = Date.now();
    
    // Update session timestamp
    session.updatedAt = Date.now();
    
    // Emit event
    this.emitEvent({
      type: 'annotation-added',
      sessionId,
      userId,
      timestamp: Date.now(),
      data: { annotation: newAnnotation }
    });
    
    return newAnnotation;
  }

  /**
   * Add a reply to an annotation
   */
  addReply(sessionId: string, userId: string, annotationId: string, content: string): SharedReply | null {
    const session = this.sessions.get(sessionId);
    const context = this.searchContexts.get(sessionId);
    
    if (!session || !context || !session.isActive) {
      return null;
    }
    
    // Check permissions
    const participant = session.participants.find(p => p.id === userId);
    if (!participant || (participant.role === 'viewer' && !session.settings.allowCommenting)) {
      return null;
    }
    
    const annotation = context.annotations.find(a => a.id === annotationId);
    if (!annotation) {
      return null;
    }
    
    const reply: SharedReply = {
      id: this.generateReplyId(),
      author: userId,
      content,
      createdAt: Date.now()
    };
    
    annotation.replies.push(reply);
    annotation.updatedAt = Date.now();
    context.updatedAt = Date.now();
    
    // Update session timestamp
    session.updatedAt = Date.now();
    
    // Emit event
    this.emitEvent({
      type: 'annotation-updated',
      sessionId,
      userId,
      timestamp: Date.now(),
      data: { annotation }
    });
    
    return reply;
  }

  /**
   * Update participant cursor position
   */
  updateCursorPosition(sessionId: string, userId: string, x: number, y: number): boolean {
    const session = this.sessions.get(sessionId);
    
    if (!session || !session.isActive) {
      return false;
    }
    
    const participant = session.participants.find(p => p.id === userId);
    if (!participant) {
      return false;
    }
    
    participant.cursor = { x, y };
    participant.lastActive = Date.now();
    session.updatedAt = Date.now();
    
    // Emit event
    this.emitEvent({
      type: 'cursor-moved',
      sessionId,
      userId,
      timestamp: Date.now(),
      data: { x, y }
    });
    
    return true;
  }

  /**
   * Get session information
   */
  getSession(sessionId: string): CollaborationSession | undefined {
    return this.sessions.get(sessionId);
  }

  /**
   * Get shared search context
   */
  getSearchContext(sessionId: string): SharedSearchContext | undefined {
    return this.searchContexts.get(sessionId);
  }

  /**
   * Get active sessions for a user
   */
  getUserSessions(userId: string): CollaborationSession[] {
    const sessionIds = this.userSessions.get(userId) || [];
    return sessionIds
      .map(id => this.sessions.get(id))
      .filter((session): session is CollaborationSession => 
        session !== undefined && session.isActive);
  }

  /**
   * Add event listener
   */
  addEventListener(sessionId: string, callback: (event: CollaborationEventPayload) => void): void {
    if (!this.eventListeners.has(sessionId)) {
      this.eventListeners.set(sessionId, []);
    }
    
    this.eventListeners.get(sessionId)!.push(callback);
  }

  /**
   * Remove event listener
   */
  removeEventListener(sessionId: string, callback: (event: CollaborationEventPayload) => void): boolean {
    const listeners = this.eventListeners.get(sessionId);
    if (!listeners) {
      return false;
    }
    
    const index = listeners.indexOf(callback);
    if (index === -1) {
      return false;
    }
    
    listeners.splice(index, 1);
    return true;
  }

  /**
   * Emit event to listeners
   */
  private emitEvent(event: CollaborationEventPayload): void {
    const listeners = this.eventListeners.get(event.sessionId);
    if (listeners) {
      listeners.forEach(callback => {
        try {
          callback(event);
        } catch (error) {
          console.error('Error in collaboration event listener:', error);
        }
      });
    }
  }

  /**
   * Generate session ID
   */
  private generateSessionId(): string {
    return `sess_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Generate note ID
   */
  private generateNoteId(): string {
    return `note_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Generate annotation ID
   */
  private generateAnnotationId(): string {
    return `ann_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Generate reply ID
   */
  private generateReplyId(): string {
    return `reply_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Generate user color
   */
  private generateUserColor(): string {
    const colors = [
      '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
      '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  /**
   * Get session statistics
   */
  getStats(): {
    totalSessions: number;
    activeSessions: number;
    totalParticipants: number;
    averageParticipantsPerSession: number;
  } {
    const sessions = Array.from(this.sessions.values());
    const activeSessions = sessions.filter(s => s.isActive).length;
    const totalParticipants = sessions.reduce((sum, s) => sum + s.participants.length, 0);
    const averageParticipants = sessions.length > 0 ? totalParticipants / sessions.length : 0;
    
    return {
      totalSessions: sessions.length,
      activeSessions,
      totalParticipants,
      averageParticipantsPerSession: averageParticipants
    };
  }

  /**
   * Clean up inactive sessions
   */
  cleanupInactiveSessions(maxInactivityHours: number = 24): number {
    const now = Date.now();
    const maxInactivityMs = maxInactivityHours * 60 * 60 * 1000;
    let cleanedCount = 0;
    
    this.sessions.forEach((session, sessionId) => {
      if (now - session.updatedAt > maxInactivityMs) {
        this.endSession(sessionId);
        cleanedCount++;
      }
    });
    
    return cleanedCount;
  }
}

// Export singleton instance
export const realTimeCollaborationService = new RealTimeCollaborationService();

// Export types for external use
// Types are already exported individually above