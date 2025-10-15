const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Database connection
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'gitops_db',
  user: process.env.DB_USER || 'gitops_user',
  password: process.env.DB_PASSWORD || 'gitops_password',
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Test database connection
pool.on('connect', () => {
  console.log('Connected to PostgreSQL database');
});

pool.on('error', (err) => {
  console.error('Database connection error:', err);
});

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'gitops-backend',
    version: process.env.npm_package_version || '1.0.0'
  });
});

// Database helper functions
const dbQuery = async (text, params) => {
  const client = await pool.connect();
  try {
    const result = await client.query(text, params);
    return result;
  } finally {
    client.release();
  }
};

// API routes
app.get('/api/status', (req, res) => {
  res.json({
    message: 'GitOps Backend API is running',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString()
  });
});

// TODO API routes
app.get('/api/todos', async (req, res) => {
  try {
    const result = await dbQuery('SELECT * FROM todos ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching todos:', error);
    res.status(500).json({ error: 'Failed to fetch todos' });
  }
});

app.post('/api/todos', async (req, res) => {
  const { title, description } = req.body;
  
  if (!title || title.trim() === '') {
    return res.status(400).json({ error: 'Title is required' });
  }

  try {
    const result = await dbQuery(
      'INSERT INTO todos (title, description) VALUES ($1, $2) RETURNING *',
      [title.trim(), description ? description.trim() : '']
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating todo:', error);
    res.status(500).json({ error: 'Failed to create todo' });
  }
});

app.put('/api/todos/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const { title, description, completed } = req.body;
  
  if (title !== undefined && (!title || title.trim() === '')) {
    return res.status(400).json({ error: 'Title cannot be empty' });
  }

  try {
    // Build dynamic query based on provided fields
    const updates = [];
    const values = [];
    let paramCount = 1;

    if (title !== undefined) {
      updates.push(`title = $${paramCount++}`);
      values.push(title.trim());
    }
    if (description !== undefined) {
      updates.push(`description = $${paramCount++}`);
      values.push(description ? description.trim() : '');
    }
    if (completed !== undefined) {
      updates.push(`completed = $${paramCount++}`);
      values.push(Boolean(completed));
    }

    if (updates.length === 0) {
      return res.status(400).json({ error: 'No fields to update' });
    }

    values.push(id);
    const query = `UPDATE todos SET ${updates.join(', ')}, updated_at = CURRENT_TIMESTAMP WHERE id = $${paramCount} RETURNING *`;
    
    const result = await dbQuery(query, values);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating todo:', error);
    res.status(500).json({ error: 'Failed to update todo' });
  }
});

app.delete('/api/todos/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  
  try {
    const result = await dbQuery('DELETE FROM todos WHERE id = $1 RETURNING *', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting todo:', error);
    res.status(500).json({ error: 'Failed to delete todo' });
  }
});

// Legacy API routes (keeping for compatibility)
app.get('/api/applications', (req, res) => {
  // Mock data for now
  const applications = [
    {
      id: 1,
      name: 'gitops-frontend',
      status: 'running',
      version: '1.0.0',
      namespace: 'default',
      replicas: 2
    },
    {
      id: 2,
      name: 'gitops-backend',
      status: 'running',
      version: '1.0.0',
      namespace: 'default',
      replicas: 1
    },
    {
      id: 3,
      name: 'gitops-database',
      status: 'running',
      version: '1.0.0',
      namespace: 'default',
      replicas: 1
    }
  ];
  
  res.json(applications);
});

app.get('/api/deployments', (req, res) => {
  // Mock deployment data
  const deployments = [
    {
      id: 1,
      application: 'gitops-frontend',
      status: 'success',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      commit: 'abc123',
      environment: 'production'
    },
    {
      id: 2,
      application: 'gitops-backend',
      status: 'success',
      timestamp: new Date(Date.now() - 7200000).toISOString(),
      commit: 'def456',
      environment: 'production'
    }
  ];
  
  res.json(deployments);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Route ${req.originalUrl} not found`
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`GitOps Backend API server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
});

module.exports = app;
