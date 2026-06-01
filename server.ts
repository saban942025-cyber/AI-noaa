import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', service: 'Saban Building Materials' });
  });

  // Mock endpoint for "Open Ticket"
  app.post('/api/tickets', (req, res) => {
    const { name, email, message, type } = req.body;
    console.log(`[Ticket received] Type: ${type}, Name: ${name}, Message: ${message}`);
    // In a real app, save to DB or send email
    res.json({ success: true, ticketId: Math.random().toString(36).substr(2, 9) });
  });

  // Mock endpoint for "Order for Pickup"
  app.post('/api/orders', (req, res) => {
    const { items, customerName, branch } = req.body;
    console.log(`[Order received] Branch: ${branch}, Customer: ${customerName}, Items: ${items.length}`);
    res.json({ success: true, orderId: Math.random().toString(36).substr(2, 9) });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);

    // Development SPA router fallback
    app.get('*', async (req, res, next) => {
      if (req.originalUrl.startsWith('/api')) {
        return next();
      }
      try {
        const fs = await import('fs');
        const indexPath = path.resolve(__dirname, 'index.html');
        let html = fs.readFileSync(indexPath, 'utf-8');
        html = await vite.transformIndexHtml(req.originalUrl, html);
        res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
      } catch (e) {
        next(e);
      }
    });
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

startServer().catch(console.error);
