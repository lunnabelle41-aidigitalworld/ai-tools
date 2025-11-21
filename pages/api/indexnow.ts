import { NextApiRequest, NextApiResponse } from 'next';

// IndexNow API endpoint for instant search engine notifications
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { url, apiKey } = req.body;

    if (!url || !apiKey) {
      return res.status(400).json({ error: 'URL and API key are required' });
    }

    // Validate URL format
    const urlPattern = /^https?:\/\/.+/;
    if (!urlPattern.test(url)) {
      return res.status(400).json({ error: 'Invalid URL format' });
    }

    // Search engines that support IndexNow
    const searchEngines = [
      'https://api.indexnow.org/indexnow',
      'https://www.bing.com/indexnow',
      'https://search.brave.com/api/indexnow',
      'https://api.seznam.cz/indexnow',
      'https://yandex.com/indexnow'
    ];

    // Prepare the payload for IndexNow
    const payload = {
      host: new URL(url).hostname,
      url: url,
      key: apiKey
    };

    // Send notifications to all search engines
    const results = await Promise.allSettled(
      searchEngines.map(async (endpoint) => {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error(`Failed to notify ${endpoint}: ${response.statusText}`);
        }

        return { endpoint, status: 'success' };
      })
    );

    // Process results
    const successful = results.filter(r => r.status === 'fulfilled').length;
    const failed = results.filter(r => r.status === 'rejected').length;

    // Log results for monitoring
    console.log(`IndexNow notification sent for ${url}. Success: ${successful}, Failed: ${failed}`);

    if (successful === 0) {
      return res.status(500).json({ 
        error: 'Failed to notify any search engines',
        details: results.map(r => r.status === 'rejected' ? r.reason : null).filter(Boolean)
      });
    }

    res.status(200).json({
      success: true,
      message: `Successfully notified ${successful} search engine(s)`,
      successful,
      failed,
      url
    });

  } catch (error) {
    console.error('IndexNow error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Helper function to notify search engines when content is published/updated
export async function notifyIndexNow(url: string, apiKey?: string) {
  const defaultApiKey = process.env.INDEXNOW_API_KEY || 'your-indexnow-api-key';
  const key = apiKey || defaultApiKey;

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'https://ai-vault.com'}/api/indexnow`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url,
        apiKey: key
      }),
    });

    if (!response.ok) {
      throw new Error(`IndexNow notification failed: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('IndexNow notification error:', error);
    throw error;
  }
}
