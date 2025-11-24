/**
 * Sentiment analysis service for search results
 */

// Sentiment categories
export type Sentiment = 'very-positive' | 'positive' | 'neutral' | 'negative' | 'very-negative';

// Sentiment analysis result
export interface SentimentAnalysisResult {
  sentiment: Sentiment;
  confidence: number;
  positiveWords: string[];
  negativeWords: string[];
  neutralWords: string[];
  keyPhrases: string[];
}

// Sentiment scores
export interface SentimentScores {
  positive: number;
  negative: number;
  neutral: number;
}

/**
 * Lexicon-based sentiment analysis
 */
const sentimentLexicon = {
  // Positive words with weights
  positive: new Map<string, number>([
    ['excellent', 4], ['outstanding', 4], ['amazing', 4], ['wonderful', 4], ['fantastic', 4],
    ['great', 3], ['good', 3], ['awesome', 3], ['brilliant', 3], ['superb', 3],
    ['nice', 2], ['fine', 2], ['decent', 2], ['satisfactory', 2], ['acceptable', 2],
    ['ok', 1], ['okay', 1], ['alright', 1], ['beneficial', 3], ['helpful', 2],
    ['useful', 2], ['effective', 3], ['efficient', 3], ['reliable', 3], ['valuable', 3],
    ['innovative', 3], ['creative', 2], ['intelligent', 3], ['smart', 2], ['powerful', 3],
    ['fast', 2], ['quick', 2], ['easy', 2], ['simple', 2], ['convenient', 2],
    ['affordable', 2], ['cheap', 1], ['inexpensive', 1], ['reasonable', 2], ['fair', 1]
  ]),
  
  // Negative words with weights
  negative: new Map<string, number>([
    ['terrible', 4], ['awful', 4], ['horrible', 4], ['dreadful', 4], ['atrocious', 4],
    ['bad', 3], ['poor', 3], ['mediocre', 3], ['inferior', 3], ['unsatisfactory', 3],
    ['disappointing', 3], ['frustrating', 3], ['annoying', 3], ['irritating', 3], ['problematic', 3],
    ['difficult', 2], ['complicated', 2], ['hard', 2], ['slow', 2], ['ineffective', 3],
    ['useless', 3], ['worthless', 4], ['pointless', 3], ['waste', 3], ['expensive', 2],
    ['costly', 2], ['overpriced', 3], ['unreliable', 3], ['inefficient', 3], ['broken', 3],
    ['buggy', 2], ['flawed', 2], ['defective', 3], ['dangerous', 3], ['risky', 2],
    ['confusing', 2], ['complex', 2], ['cumbersome', 2], ['tedious', 2], ['boring', 2]
  ])
};

/**
 * Intensity modifiers that affect sentiment weight
 */
const intensityModifiers = new Map<string, number>([
  ['very', 1.5], ['extremely', 2.0], ['incredibly', 2.0], ['absolutely', 1.8], ['totally', 1.5],
  ['completely', 1.8], ['quite', 1.3], ['rather', 1.2], ['fairly', 1.1], ['somewhat', 0.8],
  ['slightly', 0.6], ['barely', 0.4], ['hardly', 0.3], ['not', -1.0], ['no', -1.0]
]);

/**
 * Negation words that invert sentiment
 */
const negationWords = new Set(['not', 'no', 'never', 'neither', 'nowhere', 'nobody', 'nothing', 'none']);

/**
 * Analyze sentiment of text
 */
export function analyzeSentiment(text: string): SentimentAnalysisResult {
  if (!text) {
    return {
      sentiment: 'neutral',
      confidence: 0,
      positiveWords: [],
      negativeWords: [],
      neutralWords: [],
      keyPhrases: []
    };
  }
  
  const words = text.toLowerCase().match(/\b(\w+)\b/g) || [];
  const positiveWords: string[] = [];
  const negativeWords: string[] = [];
  const neutralWords: string[] = [];
  const keyPhrases: string[] = [];
  
  let positiveScore = 0;
  let negativeScore = 0;
  let neutralScore = 0;
  
  // Process words with context
  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    const nextWord = words[i + 1];
    const prevWord = words[i - 1];
    
    // Check for intensity modifiers
    let intensity = 1;
    if (prevWord && intensityModifiers.has(prevWord)) {
      intensity = intensityModifiers.get(prevWord) || 1;
    }
    
    // Check for negation
    const isNegated = prevWord && negationWords.has(prevWord);
    
    // Check sentiment
    if (sentimentLexicon.positive.has(word)) {
      let score = sentimentLexicon.positive.get(word) || 1;
      score *= intensity;
      if (isNegated) {
        negativeScore += score;
        negativeWords.push(`${prevWord ? prevWord + ' ' : ''}${word}`);
      } else {
        positiveScore += score;
        positiveWords.push(word);
      }
    } else if (sentimentLexicon.negative.has(word)) {
      let score = sentimentLexicon.negative.get(word) || 1;
      score *= intensity;
      if (isNegated) {
        positiveScore += score;
        positiveWords.push(`${prevWord ? prevWord + ' ' : ''}${word}`);
      } else {
        negativeScore += score;
        negativeWords.push(word);
      }
    } else {
      neutralWords.push(word);
    }
  }
  
  // Extract key phrases (3-5 word sequences with sentiment words)
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
  sentences.forEach(sentence => {
    const sentWords = sentence.toLowerCase().match(/\b(\w+)\b/g) || [];
    for (let i = 0; i < sentWords.length - 2; i++) {
      const phrase = sentWords.slice(i, Math.min(i + 5, sentWords.length)).join(' ');
      const hasSentimentWord = sentWords.slice(i, i + 5).some(word => 
        sentimentLexicon.positive.has(word) || sentimentLexicon.negative.has(word)
      );
      
      if (hasSentimentWord && phrase.length > 10) {
        keyPhrases.push(sentence.trim());
        break; // One key phrase per sentence
      }
    }
  });
  
  // Calculate overall sentiment
  const totalScore = positiveScore + negativeScore + neutralScore;
  const normalizedPositive = totalScore > 0 ? positiveScore / totalScore : 0;
  const normalizedNegative = totalScore > 0 ? negativeScore / totalScore : 0;
  
  let sentiment: Sentiment = 'neutral';
  let confidence = 0;
  
  if (normalizedPositive > 0.6) {
    sentiment = 'very-positive';
    confidence = normalizedPositive;
  } else if (normalizedPositive > 0.4) {
    sentiment = 'positive';
    confidence = normalizedPositive;
  } else if (normalizedNegative > 0.6) {
    sentiment = 'very-negative';
    confidence = normalizedNegative;
  } else if (normalizedNegative > 0.4) {
    sentiment = 'negative';
    confidence = normalizedNegative;
  } else {
    sentiment = 'neutral';
    confidence = 1 - Math.abs(normalizedPositive - normalizedNegative);
  }
  
  // Ensure confidence is between 0 and 1
  confidence = Math.max(0, Math.min(1, confidence));
  
  return {
    sentiment,
    confidence,
    positiveWords: Array.from(new Set(positiveWords)).slice(0, 10),
    negativeWords: Array.from(new Set(negativeWords)).slice(0, 10),
    neutralWords: Array.from(new Set(neutralWords)).slice(0, 10),
    keyPhrases: Array.from(new Set(keyPhrases)).slice(0, 5)
  };
}

/**
 * Analyze sentiment of multiple texts
 */
export function analyzeSentiments(texts: string[]): SentimentAnalysisResult[] {
  return texts.map(text => analyzeSentiment(text));
}

/**
 * Get sentiment distribution across multiple texts
 */
export function getSentimentDistribution(results: SentimentAnalysisResult[]): Record<Sentiment, number> {
  const distribution = {
    'very-positive': 0,
    'positive': 0,
    'neutral': 0,
    'negative': 0,
    'very-negative': 0
  };
  
  results.forEach(result => {
    distribution[result.sentiment]++;
  });
  
  return distribution;
}

/**
 * Filter results by sentiment
 */
export function filterBySentiment(
  results: Array<{ id: string; content: string; [key: string]: any }>,
  sentiment: Sentiment | Sentiment[]
): Array<{ id: string; content: string; sentiment: SentimentAnalysisResult; [key: string]: any }> {
  const sentimentArray = Array.isArray(sentiment) ? sentiment : [sentiment];
  
  return results
    .map(result => ({
      ...result,
      sentiment: analyzeSentiment(result.content)
    }))
    .filter(result => sentimentArray.includes(result.sentiment.sentiment));
}