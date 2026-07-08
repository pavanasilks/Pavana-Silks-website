const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static assets from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Route for New Arrivals page
app.get('/new-arrivals', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'new-arrivals.html'));
});

// Catch-all route to serve index.html for any other requests (SPA friendly)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
