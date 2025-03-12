import express from 'express';
import { pool } from '../db/movieRepository';

const router = express.Router();

router.get('/movies', async (req, res) => {
  console.log('📥 Backend: Received request for movies with filters:', {
    rawQuery: req.query,
    q: req.query.q,
    genre: req.query.genre,
    quality: req.query.quality,
    min_rating: req.query.min_rating,
    release_year: req.query.release_year,
    limit: req.query.limit
  });

  try {
    // Set client encoding to UTF8
    await pool.query('SET client_encoding TO UTF8');

    // Build the base query
    let query = `
      SELECT 
        id, 
        title, 
        genre, 
        quality, 
        rating, 
        released, 
        thumbnailurl
      FROM movies 
      WHERE 1=1
    `;
    const params: any[] = [];
    let paramCount = 0;

    // Store search parameter indices for ORDER BY
    let searchTermIndices: { full: number; word: number; genre: number } | null = null;

    // Add search filter
    if (req.query.q && typeof req.query.q === 'string' && req.query.q.trim()) {
      const searchTerm = req.query.q.trim().toLowerCase();

      // Full title match parameter
      paramCount++;
      const fullMatchIndex = paramCount;
      params.push(`%${searchTerm}%`);

      // Word boundary match parameter
      paramCount++;
      const wordMatchIndex = paramCount;
      params.push(`% ${searchTerm} %`);

      // Genre match parameter
      paramCount++;
      const genreMatchIndex = paramCount;
      params.push(`%${searchTerm}%`);

      // Store indices for ORDER BY
      searchTermIndices = {
        full: fullMatchIndex,
        word: wordMatchIndex,
        genre: genreMatchIndex
      };

      query += ` AND (
        title ILIKE $${fullMatchIndex} OR  -- Full title match
        title ILIKE $${wordMatchIndex} OR  -- Word boundary match
        genre ILIKE $${genreMatchIndex}    -- Genre match
      )`;
    }

    // Add genre filter
    if (req.query.genre) {
      paramCount++;
      query += ` AND genre ILIKE $${paramCount}`;
      params.push(`%${req.query.genre.toString().toLowerCase()}%`);
    }

    // Add quality filter
    if (req.query.quality) {
      paramCount++;
      query += ` AND LOWER(quality) = LOWER($${paramCount})`;
      params.push(req.query.quality.toString());
    }

    // Add rating filter
    if (req.query.min_rating) {
      paramCount++;
      query += ` AND CAST(NULLIF(rating, '') AS FLOAT) >= $${paramCount}`;
      params.push(parseFloat(req.query.min_rating.toString()));
    }

    // Add year filter
    if (req.query.release_year) {
      paramCount++;
      query += ` AND EXTRACT(YEAR FROM TO_DATE(released, 'YYYY-MM-DD')) = $${paramCount}`;
      params.push(parseInt(req.query.release_year.toString()));
    }

    // Add ordering
    if (searchTermIndices) {
      // If searching, order by match relevance
      query += `
        ORDER BY 
          CASE 
            WHEN title ILIKE $${searchTermIndices.full} THEN 1  -- Full title match first
            WHEN title ILIKE $${searchTermIndices.word} THEN 2  -- Word boundary match second
            WHEN genre ILIKE $${searchTermIndices.genre} THEN 3 -- Genre match last
            ELSE 4
          END,
          CAST(NULLIF(rating, '') AS FLOAT) DESC NULLS LAST,
          created_at DESC
      `;
    } else {
      // Default ordering by rating and date
      query += `
        ORDER BY 
          CAST(NULLIF(rating, '') AS FLOAT) DESC NULLS LAST,
          created_at DESC
      `;
    }

    // Add limit
    const limit = Math.min(parseInt(req.query.limit?.toString() || '20'), 50);
    paramCount++;
    query += ` LIMIT $${paramCount}`;
    params.push(limit);

    // Enhanced debug logging with clear separation
    console.log('\n🎬 BACKEND MOVIE SEARCH DEBUG 🎬');
    console.log('════════════════════════════════════════════');
    console.log('📨 Incoming Request:');
    console.log('────────────────────────────────────────────');
    console.log('Search Term:', req.query.q || 'none');
    console.log('Filters:', {
      genre: req.query.genre || 'none',
      quality: req.query.quality || 'none',
      rating: req.query.min_rating || 'none',
      year: req.query.release_year || 'none',
      limit
    });
    
    console.log('\n📝 Generated SQL:');
    console.log('────────────────────────────────────────────');
    console.log(query.replace(/\s+/g, ' ').trim());
    
    console.log('\n📊 Parameters:');
    console.log('────────────────────────────────────────────');
    params.forEach((param, index) => {
      console.log(`$${index + 1}:`, param);
    });
    console.log('════════════════════════════════════════════\n');
    
    // Execute the query
    const result = await pool.query(query, params);
    
    console.log(`✅ Backend: Found ${result.rows.length} movies with filters:`, {
      sampleMovie: result.rows[0] ? {
        title: result.rows[0].title,
        genre: result.rows[0].genre,
        quality: result.rows[0].quality,
        rating: result.rows[0].rating
      } : null,
      totalResults: result.rows.length,
      appliedFilters: {
        search: req.query.q,
        genre: req.query.genre,
        quality: req.query.quality,
        min_rating: req.query.min_rating,
        release_year: req.query.release_year
      }
    });

    res.json(result.rows);
  } catch (error: any) {
    console.error('❌ Backend Error:', {
      error: error.message,
      query: req.query,
      stack: error.stack
    });
    res.status(500).json({ 
      error: 'Database error', 
      details: error?.message || 'Unknown error'
    });
  }
});

export default router;
