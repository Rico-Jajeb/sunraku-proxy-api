export default async function handler(req, res) {
  try {
    const response = await fetch('https://codex-of-sunraku.42web.io/api/tech-skills', {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36'
      }
    });

    const text = await response.text();
    const contentType = response.headers.get('content-type');

    console.log('Upstream content-type:', contentType);
    console.log('Snippet:', text.slice(0, 300));

    if (!contentType || !contentType.includes('application/json')) {
      return res.status(500).json({ error: 'Invalid response from upstream', snippet: text.slice(0, 300) });
    }

    const data = JSON.parse(text);
    res.setHeader('Access-Control-Allow-Origin', '*');
    return res.status(200).json(data);

  } catch (error) {
    console.error('Fetch error:', error);
    return res.status(500).json({ error: 'Failed to fetch data', details: error.message });
  }
}
