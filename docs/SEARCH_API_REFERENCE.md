# AI Vault Search API Reference

## Overview

The AI Vault Search API provides powerful semantic search capabilities for discovering AI tools, resources, and content. It combines natural language processing with advanced filtering and sorting options to deliver highly relevant results.

## Base URL

```
https://your-domain.com/api/search
```

## Authentication

No authentication required for public search endpoints.

## Search Endpoint

### GET `/api/search`

Perform a semantic search across AI tools and resources.

#### Query Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `q` | string | **Required.** Search query string |
| `limit` | integer | Maximum number of results to return (default: 30) |
| `type` | string | Filter by content type: `tool`, `blog`, `news`, `update` |
| `category` | string | Filter by category |
| `subcategory` | string | Filter by subcategory |
| `minRating` | number | Minimum rating filter (0-5) |
| `minReviews` | integer | Minimum number of reviews |
| `maxPrice` | number | Maximum price filter |
| `pricingType` | string | Filter by pricing type: `Free`, `Freemium`, `Paid`, `Contact`, `Open Source` |
| `sortBy` | string | Sort results by: `relevance`, `date`, `rating`, `title`, `reviews`, `popularity`, `trending`, `lastUpdated`, `launchDate` |
| `sortOrder` | string | Sort order: `asc`, `desc` |
| `hasAPI` | boolean | Filter tools with API availability |
| `hasMobileApp` | boolean | Filter tools with mobile app availability |
| `hasChromeExtension` | boolean | Filter tools with Chrome extension |
| `integrationCount` | integer | Minimum number of integrations |
| `toolAge` | string | Filter by tool age: `new`, `established`, `legacy` |

#### Example Request

```bash
curl "https://your-domain.com/api/search?q=video+editing+ai&category=video_ai&minRating=4&sortBy=rating&sortOrder=desc"
```

#### Response Format

```json
{
  "success": true,
  "query": "video editing ai",
  "count": 15,
  "results": [
    {
      "id": "tool-123",
      "type": "tool",
      "title": "Runway ML",
      "content": "AI-powered video editing platform with green screen removal, object removal, and text-to-video capabilities.",
      "url": "https://runwayml.com",
      "category": "video_ai",
      "subcategory": "Video Editing",
      "rating": 4.8,
      "pricing": "$12-76/month",
      "tags": ["video editing", "ai", "green screen", "object removal"],
      "features": ["API Access", "Mobile App", "Chrome Extension"],
      "launchDate": "2023-01-15",
      "lastUpdated": "2024-01-20",
      "favicon": "https://runwayml.com/favicon.ico",
      "publishedAt": "2024-01-20T00:00:00.000Z",
      "summary": "AI-powered video editing platform with green screen removal, object removal, and text-to-video capabilities.",
      "score": 0.95,
      "snippet": "AI-powered **video editing** platform with green screen removal, object removal, and text-to-**video** capabilities.",
      "matchType": "tool",
      "matchCategory": "video_ai",
      "matchSubcategory": "Video Editing",
      "matchTags": ["video editing", "ai", "green screen", "object removal"],
      "matchRating": 4.8,
      "matchPricing": "$12-76/month",
      "matchReviews": 0
    }
  ],
  "facets": {
    "categories": ["video_ai", "image_generation", "text_generation"],
    "types": ["tool", "blog", "news"]
  }
}
```

## Autocomplete Endpoint

### GET `/api/autocomplete`

Get search suggestions and autocomplete results.

#### Query Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `q` | string | **Required.** Search query string for suggestions |

#### Example Request

```bash
curl "https://your-domain.com/api/autocomplete?q=video"
```

#### Response Format

```json
{
  "success": true,
  "type": "suggestions",
  "query": "video",
  "suggestions": [
    {
      "term": "video editing",
      "frequency": 100
    },
    {
      "term": "video generation",
      "frequency": 85
    }
  ]
}
```

## Advanced Search Features

### Natural Language Processing

The search engine understands natural language queries and can interpret intent:

- "Best AI tools for video editing" → Sorts by rating
- "New AI tools" → Sorts by date (newest first)
- "Free AI tools" → Filters by pricing type
- "AI tools with API" → Filters by API availability

### Semantic Search

The search engine uses TensorFlow's Universal Sentence Encoder to understand the semantic meaning of queries and content, providing more relevant results than traditional keyword matching.

### Filtering Capabilities

Advanced filtering options allow users to narrow down results:

1. **Basic Filters**: Type, category, rating, price
2. **Feature Filters**: API availability, mobile app, Chrome extension
3. **Date Filters**: Launch date range, last updated range
4. **Specialized Filters**: Integration count, tool age

### Sorting Options

Multiple sorting options help users find the most relevant results:

- **Relevance**: Semantic similarity score
- **Date**: Publication/launch date
- **Rating**: User ratings
- **Popularity**: Combination of rating and reviews
- **Trending**: Recently updated items with good ratings
- **Last Updated**: Recently updated items
- **Launch Date**: Recently launched tools

## Voice Search

The search interface supports voice input through the Web Speech API, allowing users to speak their queries instead of typing.

## Performance Optimization

The search service implements several performance optimizations:

1. **Caching**: Results and embeddings are cached for faster retrieval
2. **Batch Processing**: Documents are processed in batches to avoid memory issues
3. **Efficient Filtering**: Filters are applied before semantic processing to reduce computation
4. **Model Optimization**: Uses the lightweight Universal Sentence Encoder Lite model

## Error Handling

The API returns appropriate HTTP status codes and error messages:

- `200`: Successful request
- `400`: Bad request (missing query parameter)
- `405`: Method not allowed (only GET supported)
- `500`: Internal server error

## Rate Limiting

The API implements rate limiting to prevent abuse. Excessive requests may result in temporary blocking.

## Integration Examples

### JavaScript/TypeScript

```typescript
async function searchAItools(query: string) {
  const response = await fetch(`/api/search?q=${encodeURIComponent(query)}&limit=20`);
  const data = await response.json();
  return data.results;
}
```

### Python

```python
import requests

def search_ai_tools(query):
    response = requests.get(f"https://your-domain.com/api/search", params={
        "q": query,
        "limit": 20
    })
    return response.json()["results"]
```

## Best Practices

1. **Use Specific Queries**: More specific queries yield better results
2. **Leverage Filters**: Use filters to narrow down large result sets
3. **Combine Filters**: Multiple filters can be combined for precise results
4. **Use Sorting**: Choose appropriate sorting for your use case
5. **Handle Errors**: Always check for successful responses before processing

## Troubleshooting

### Common Issues

1. **No Results**: Try broadening your query or removing filters
2. **Slow Performance**: Complex queries with many filters may take longer
3. **API Errors**: Check query parameters and ensure required fields are present

### Support

For issues with the search API, contact the development team or check the system status page.