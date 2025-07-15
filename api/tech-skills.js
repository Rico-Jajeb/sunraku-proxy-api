export default async function handler(req, res) {
  try {
    const response = await fetch('https://codex-of-sunraku.42web.io/api/tech-skills', {
      headers: {
        'Accept': 'application/json'
      }
    });

    // Check if the content-type is JSON
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      return res.status(500).json({ error: 'Invalid response from upstream server' });
    }

    const data = await response.json();
    // You can even manipulate data here if needed (e.g., add extra fields)
    res.setHeader('Access-Control-Allow-Origin', '*'); // For CORS
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to fetch data' });
  }
}
