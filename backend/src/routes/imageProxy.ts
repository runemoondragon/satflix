import express from 'express';
import asyncHandler from 'express-async-handler';

const router = express.Router();

router.get(
  '/proxy-image',
  asyncHandler(async (req, res): Promise<void> => {
    const { url } = req.query;
    console.log('Proxy request received for:', url);

    if (!url || typeof url !== 'string') {
      console.log('Invalid URL parameter');
      res.status(400).json({ error: 'URL parameter is required' });
      return;
    }

    try {
      console.log('Fetching image from:', url);
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch image: ${response.status}`);
      }

      const contentType = response.headers.get('content-type');
      console.log('Content type:', contentType);
      
      const buffer = await response.arrayBuffer();
      console.log('Image size:', buffer.byteLength, 'bytes');

      res.set({
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=31536000',
        'Content-Type': contentType || 'image/jpeg'
      });
      
      res.send(Buffer.from(buffer));
      console.log('Image sent successfully');
    } catch (error) {
      console.error('Proxy error:', error);
      res.status(500).json({ error: 'Failed to proxy image' });
    }
  })
);

export default router;
