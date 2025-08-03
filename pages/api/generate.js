import fetch from 'node-fetch';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST allowed' });
  }

  const { prompt } = req.body;

  if (!process.env.MISTRAL_API_KEY) {
    return res.status(500).json({ error: 'MISTRAL_API_KEY not set' });
  }

  try {
    const response = await fetch('https://api.mistral.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.MISTRAL_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'mistral-medium-latest',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.9,
        max_tokens: 1024,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      res.status(200).json({ result: data.choices[0].message.content });
    } else {
      res.status(response.status).json({ error: data.error?.message || 'Unknown error' });
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
