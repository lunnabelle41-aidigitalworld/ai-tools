
-- AI Tools Table
CREATE TABLE IF NOT EXISTS ai_tools (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE,
  description TEXT,
  website_url VARCHAR(500),
  pricing JSONB,
  features TEXT[],
  categories TEXT[],
  launch_date DATE,
  last_updated TIMESTAMP,
  is_active BOOLEAN DEFAULT true
);


-- AI Updates Table  
CREATE TABLE IF NOT EXISTS ai_updates (
  id SERIAL PRIMARY KEY,
  title VARCHAR(500) NOT NULL,
  content TEXT,
  type VARCHAR(100),
  published_date DATE,
  source VARCHAR(255),
  tools_mentioned INTEGER[],
  FOREIGN KEY (tools_mentioned) REFERENCES ai_tools(id)
);
