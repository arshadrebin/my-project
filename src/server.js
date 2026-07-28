const express = require('express');
const { add, greet } = require('./utils');
// Values students edit live in ONE place: src/version.js
const { RELEASE_NAME, BUILD_MESSAGE } = require('./version');

const app = express();
app.use(express.json());

// Health check — used by the deploy script to verify the app is up
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', env: process.env.NODE_ENV || 'unknown' });
});

// Simple home route showing which environment/version is running
app.get('/', (req, res) => {
  res.status(200).json({
    message: greet('DevOps student'),
    // These two come from src/version.js — the file students edit
    releaseName: RELEASE_NAME,
    buildMessage: BUILD_MESSAGE,
    version: process.env.APP_VERSION || 'local',
    environment: process.env.NODE_ENV || 'development',
  });
});

// Example business endpoint with logic that unit tests can cover
app.get('/api/add', (req, res) => {
  const a = Number(req.query.a);
  const b = Number(req.query.b);
  if (Number.isNaN(a) || Number.isNaN(b)) {
    return res.status(400).json({ error: 'a and b must be numbers' });
  }
  return res.status(200).json({ result: add(a, b) });
});

const PORT = process.env.PORT || 3000;

// Only listen when run directly, so tests can import the app without opening a port
if (require.main === module) {
  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`App listening on port ${PORT} (env: ${process.env.NODE_ENV || 'development'})`);
  });
}

module.exports = app;
