CREATE TABLE movies (
    id VARCHAR(255) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    genre VARCHAR(255) NOT NULL,
    quality VARCHAR(50) NOT NULL,
    rating VARCHAR(10),
    overview TEXT,
    released VARCHAR(100),
    casts TEXT,
    duration INT,
    country TEXT,
    production TEXT,
    thumbnailUrl TEXT,
    backgroundUrl TEXT,
    watchLink TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS transactions;
CREATE TABLE transactions (
    id SERIAL PRIMARY KEY,
    invoice_id VARCHAR(255) UNIQUE NOT NULL,
    movie_id VARCHAR(255) REFERENCES movies(id),
    movie_title VARCHAR(255) NOT NULL,
    amount DECIMAL(20, 8) NOT NULL,
    currency VARCHAR(10) NOT NULL,
    status VARCHAR(50) NOT NULL,
    manually_marked BOOLEAN DEFAULT false,
    over_paid BOOLEAN DEFAULT false,
    delivery_id VARCHAR(255),
    webhook_id VARCHAR(255),
    original_delivery_id VARCHAR(255),
    is_redelivery BOOLEAN DEFAULT false,
    webhook_type VARCHAR(50),
    timestamp BIGINT,
    store_id VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for transactions table
CREATE INDEX idx_transactions_invoice_id ON transactions(invoice_id);
CREATE INDEX idx_transactions_movie_id ON transactions(movie_id);
CREATE INDEX idx_transactions_status ON transactions(status);

-- Scraper Progress Tracking
CREATE TABLE scraper_progress (
    key VARCHAR(50) PRIMARY KEY,
    value TEXT NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Initialize scraper progress
INSERT INTO scraper_progress (key, value) VALUES 
    ('last_processed_index', '0'),
    ('is_running', 'false')
ON CONFLICT (key) DO NOTHING;

-- Indexing
CREATE INDEX idx_movies_title ON movies(title);
CREATE INDEX idx_movies_genre ON movies(genre);
CREATE INDEX idx_movies_rating ON movies(rating);
CREATE INDEX idx_movies_released ON movies(released);
