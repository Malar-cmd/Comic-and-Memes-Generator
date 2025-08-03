
import fetch from 'node-fetch';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST method allowed' });
  }

  const { prompt, style_preset} = req.body;

  if (!process.env.STABILITY_API_KEY) {
    return res.status(500).json({ error: 'STABILITY_API_KEY not set' });
  }

  try {
    const stabilityRes = await fetch('https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.STABILITY_API_KEY}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        steps: 30,
        cfg_scale: 7.5,
        width: 1024,
        height: 1024,
        samples: 1,
        text_prompts: [{ text: prompt, weight: 1 }],
        ...(style_preset && { style_preset: style_preset })

      })
    });

    const data = await stabilityRes.json();

    if (stabilityRes.ok && data.artifacts?.length > 0) {
      const base64Image = data.artifacts[0].base64;
      res.status(200).json({ image: base64Image });
    } else {
      res.status(stabilityRes.status).json({ error: 'Image generation failed', details: data });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
