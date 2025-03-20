import express, { Request, Response, RequestHandler } from "express";
import dotenv from "dotenv";
import cors from "cors";
import pool from "./db/index"; // Import database connection
import imageProxyRoutes from './routes/imageProxy';

dotenv.config();

const app = express();

// Cache for movie data (lasts 5 minutes)
const movieCache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

// ✅ Middleware
app.use(express.json()); // Parse JSON requests
app.use(cors()); // Allow frontend requests
app.use('/api', imageProxyRoutes);
// Add response caching middleware
const cacheResponse = (duration: number): RequestHandler => {
  return (req, res, next) => {
    const key = req.originalUrl;
    const cachedResponse = movieCache.get(key);

    if (cachedResponse && cachedResponse.timestamp > Date.now() - duration) {
      res.json(cachedResponse.data);
      return;
    }

    const originalJson = res.json;
    res.json = function(data: any) {
      movieCache.set(key, {
        data,
        timestamp: Date.now()
      });
      return originalJson.call(this, data);
    };

    next();
  };
};

// ✅ Health Check Route
app.get("/", ((req: Request, res: Response) => {
  res.send("⚡ BTIFLIX Backend is Running!");
}) as RequestHandler);

// ✅ Payment Route with optimizations
app.post("/api/payments/create", ((req: Request, res: Response) => {
  try {
    const { movieId, amount } = req.body;
    if (!movieId || !amount) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // TODO: Integrate with real BTCPay server
    res.json({
      invoiceUrl: `https://your-btcpay-server.com/invoice/${movieId}`,
      invoiceId: `inv_${Date.now()}`,
    });
  } catch (error) {
    console.error("Payment Error:", error);
    res.status(500).json({ error: "Failed to create invoice" });
  }
}) as RequestHandler);

// ✅ BTCPay Server Webhook Endpoint
app.post("/api/btcpay-webhook", async (req: Request, res: Response) => {
  try {
    const { 
      manuallyMarked,
      overPaid,
      deliveryId,
      webhookId,
      originalDeliveryId,
      isRedelivery,
      type,
      timestamp,
      storeId,
      invoiceId,
      metadata
    } = req.body;

    if (!metadata?.movieId || !metadata?.movieTitle || !invoiceId) {
      throw new Error('Missing required webhook data');
    }

    // Save/update transaction in database
    const result = await pool.query(
      `INSERT INTO transactions (
        movie_id,
        movie_title,
        invoice_id,
        amount,
        currency,
        status,
        manually_marked,
        over_paid,
        delivery_id,
        webhook_id,
        original_delivery_id,
        is_redelivery,
        webhook_type,
        timestamp,
        store_id
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
      ON CONFLICT (invoice_id) 
      DO UPDATE SET 
        status = $6,
        manually_marked = $7,
        over_paid = $8,
        updated_at = CURRENT_TIMESTAMP
      RETURNING *`,
      [
        metadata.movieId,
        metadata.movieTitle,
        invoiceId,
        0.5,
        'USD',
        'completed',
        manuallyMarked,
        overPaid,
        deliveryId,
        webhookId,
        originalDeliveryId,
        isRedelivery,
        type,
        timestamp,
        storeId
      ]
    );

    res.json({ success: true });
  } catch (error) {
    console.error('BTCPay Webhook Error:', error);
    res.status(500).json({ error: 'Failed to process payment notification' });
  }
});

// ✅ Movies Route with Search and Caching
app.get("/api/movies", cacheResponse(CACHE_DURATION), async (req: Request, res: Response) => {
  try {
    const { q } = req.query;
    
    let query = "SELECT * FROM movies";
    const params: any[] = [];

    if (q && typeof q === 'string' && q.trim()) {
      query += " WHERE LOWER(title) LIKE LOWER($1)";
      params.push(`%${q.trim()}%`);
    }

    // Add index hints and limit
    query += " LIMIT 40625";

    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (error) {
    console.error("DB Query Error:", error);
    res.status(500).json({ error: "Database query failed" });
  }
});

// ✅ Start Server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
