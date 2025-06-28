import express from 'express';
import path from 'path';
import cons from 'consolidate';
import { fileURLToPath } from 'url';
// Recreate __filename and __dirname in ES module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = 4000;
// Set up Dust as the view engine
app.engine('dust', cons.dust);
app.set('view engine', 'dust');
app.set('views', path.join(__dirname, 'views'));
// Serve static assets (React bundle)
app.use('/static', express.static(path.join(__dirname, '../../dist/client')));
// Route: Home page
app.get('/', (req, res) => {
    res.render('layout', {
        title: 'Weather App',
        bundlePath: '/static/bundle.js'
    });
});
app.listen(PORT, () => {
    console.log(`Node BFF with Dust is running at http://localhost:${PORT}`);
});
