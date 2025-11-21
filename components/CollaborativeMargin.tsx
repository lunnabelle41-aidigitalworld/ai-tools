import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Annotation {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  text: string;
  position: number; // Character position in the text
  timestamp: string;
  isPinned: boolean;
  replies: Array<{
    id: string;
    userId: string;
    userName: string;
    text: string;
    timestamp: string;
  }>;
}

interface CollaborativeMarginProps {
  content: string;
  annotations: Annotation[];
  onAddAnnotation: (position: number, text: string) => void;
  onReplyToAnnotation: (annotationId: string, text: string) => void;
}

const CollaborativeMargin: React.FC<CollaborativeMarginProps> = ({
  content,
  annotations,
  onAddAnnotation,
  onReplyToAnnotation
}) => {
  const [selectedText, setSelectedText] = useState<{ text: string; range: Range } | null>(null);
  const [activeAnnotation, setActiveAnnotation] = useState<string | null>(null);
  const [newAnnotationText, setNewAnnotationText] = useState('');
  const [replyTexts, setReplyTexts] = useState<{ [key: string]: string }>({});
  const contentRef = useRef<HTMLDivElement>(null);

  // Handle text selection
  useEffect(() => {
    const handleSelection = () => {
      const selection = window.getSelection();
      if (selection && selection.toString().trim() && contentRef.current) {
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        const contentRect = contentRef.current.getBoundingClientRect();
        
        // Only allow selection within our content
        if (rect.top >= contentRect.top && rect.bottom <= contentRect.bottom) {
          setSelectedText({
            text: selection.toString(),
            range: range.cloneRange()
          });
        } else {
          setSelectedText(null);
        }
      } else {
        setSelectedText(null);
      }
    };

    document.addEventListener('mouseup', handleSelection);
    return () => document.removeEventListener('mouseup', handleSelection);
  }, []);

  // Clear selection when clicking elsewhere
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (contentRef.current && !contentRef.current.contains(e.target as Node)) {
        setSelectedText(null);
        setActiveAnnotation(null);
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  const handleAddAnnotation = () => {
    if (selectedText && newAnnotationText.trim()) {
      const position = selectedText.range.startOffset;
      onAddAnnotation(position, newAnnotationText);
      setNewAnnotationText('');
      setSelectedText(null);
    }
  };

  const handleReply = (annotationId: string) => {
    const replyText = replyTexts[annotationId];
    if (replyText && replyText.trim()) {
      onReplyToAnnotation(annotationId, replyText);
      setReplyTexts(prev => ({ ...prev, [annotationId]: '' }));
    }
  };

  // Render highlighted text with annotation markers
  const renderContentWithHighlights = () => {
    if (!contentRef.current) return null;

    const elements = [];
    let lastIndex = 0;

    // Sort annotations by position
    const sortedAnnotations = [...annotations].sort((a, b) => a.position - b.position);

    sortedAnnotations.forEach((annotation, index) => {
      // Add text before annotation
      if (annotation.position > lastIndex) {
        elements.push(
          <span key={`text-${index}`}>
            {content.substring(lastIndex, annotation.position)}
          </span>
        );
      }

      // Add highlighted text with marker
      elements.push(
        <span
          key={`highlight-${annotation.id}`}
          className="relative bg-yellow-400/20 border-b-2 border-yellow-400 cursor-pointer"
          onClick={() => setActiveAnnotation(activeAnnotation === annotation.id ? null : annotation.id)}
        >
          {content.substring(annotation.position, annotation.position + 20)}
          <div className="absolute -right-2 -top-1 w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
        </span>
      );

      lastIndex = annotation.position + 20;
    });

    // Add remaining text
    if (lastIndex < content.length) {
      elements.push(
        <span key="text-final">
          {content.substring(lastIndex)}
        </span>
      );
    }

    return <>{elements}</>;
  };

  return (
    <div className="flex gap-8">
      {/* Main Content */}
      <div
        ref={contentRef}
        className="flex-1 prose prose-invert max-w-none text-gray-300 leading-relaxed select-text"
        style={{ cursor: 'text' }}
      >
        {renderContentWithHighlights()}
      </div>

      {/* Annotation Margin */}
      <div className="w-80 relative">
        {/* Annotation dots and cards */}
        <div className="absolute top-0 left-0 w-full">
          {annotations.map((annotation, index) => (
            <div
              key={annotation.id}
              className="relative mb-4"
              style={{ top: `${index * 120}px` }}
            >
              {/* Annotation Dot */}
              <motion.div
                className="absolute -left-4 top-2 w-2 h-2 bg-cyan-400 rounded-full cursor-pointer"
                whileHover={{ scale: 1.5 }}
                onClick={() => setActiveAnnotation(activeAnnotation === annotation.id ? null : annotation.id)}
              />

              {/* Annotation Card */}
              <AnimatePresence>
                {activeAnnotation === annotation.id && (
                  <motion.div
                    initial={{ opacity: 0, x: -20, scale: 0.9 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -20, scale: 0.9 }}
                    className="bg-black/80 backdrop-blur-lg rounded-lg p-4 border border-cyan-400/50 shadow-2xl shadow-cyan-400/20"
                  >
                    {/* User Info */}
                    <div className="flex items-center space-x-2 mb-3">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center">
                        <span className="text-white text-xs font-bold">
                          {annotation.userName.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="flex-1">
                        <p className="text-white text-sm font-medium">{annotation.userName}</p>
                        <p className="text-gray-500 text-xs">{annotation.timestamp}</p>
                      </div>
                      {annotation.isPinned && (
                        <div className="text-yellow-400">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                          </svg>
                        </div>
                      )}
                    </div>

                    {/* Annotation Text */}
                    <p className="text-gray-300 text-sm mb-3">{annotation.text}</p>

                    {/* Replies */}
                    {annotation.replies.length > 0 && (
                      <div className="space-y-2 mb-3">
                        {annotation.replies.map(reply => (
                          <div key={reply.id} className="bg-white/5 rounded p-2 border border-white/10">
                            <p className="text-white text-xs font-medium mb-1">{reply.userName}</p>
                            <p className="text-gray-400 text-xs">{reply.text}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Reply Input */}
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Add a reply..."
                        value={replyTexts[annotation.id] || ''}
                        onChange={(e) => setReplyTexts(prev => ({ ...prev, [annotation.id]: e.target.value }))}
                        className="flex-1 px-2 py-1 bg-white/10 border border-white/20 rounded text-white text-sm placeholder-gray-400 focus:outline-none focus:border-cyan-400"
                        onKeyPress={(e) => e.key === 'Enter' && handleReply(annotation.id)}
                      />
                      <button
                        onClick={() => handleReply(annotation.id)}
                        className="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded border border-cyan-400/30 text-sm hover:bg-cyan-500/30 transition-colors"
                      >
                        Reply
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* New Annotation Popup */}
        <AnimatePresence>
          {selectedText && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              className="fixed bg-black/90 backdrop-blur-xl rounded-lg p-4 border border-cyan-400/50 shadow-2xl shadow-cyan-400/20 z-50"
              style={{
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)'
              }}
            >
              <div className="mb-3">
                <p className="text-cyan-400 text-sm font-medium mb-2">Annotate Selection:</p>
                <p className="text-gray-300 text-sm italic">"{selectedText.text}"</p>
              </div>
              
              <textarea
                placeholder="Add your annotation..."
                value={newAnnotationText}
                onChange={(e) => setNewAnnotationText(e.target.value)}
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 resize-none"
                rows={3}
              />
              
              <div className="flex gap-2 mt-3">
                <button
                  onClick={handleAddAnnotation}
                  disabled={!newAnnotationText.trim()}
                  className="px-4 py-2 bg-cyan-500 text-white rounded hover:bg-cyan-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Add Annotation
                </button>
                <button
                  onClick={() => setSelectedText(null)}
                  className="px-4 py-2 bg-white/10 text-gray-300 rounded hover:bg-white/20 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CollaborativeMargin;
