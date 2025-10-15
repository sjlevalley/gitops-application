const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

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

// API routes
app.get('/api/status', (req, res) => {
  res.json({
    message: 'GitOps Backend API is running',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString()
  });
});

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
