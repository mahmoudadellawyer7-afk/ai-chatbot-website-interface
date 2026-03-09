import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import session from "express-session";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database("app.db");
console.log("Database connected at app.db");

// Initialize database
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    startup_name TEXT,
    bot_personality TEXT,
    primary_color TEXT,
    website_url TEXT,
    google_drive_url TEXT,
    google_sheet_url TEXT,
    backoff_seconds INTEGER,
    ignored_messages TEXT,
    facebook_connected INTEGER DEFAULT 0
  )
`);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ limit: '50mb', extended: true }));
  app.use(session({
    secret: process.env.SESSION_SECRET || "iecc-secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: true,
      sameSite: 'none',
      httpOnly: true,
    }
  }));

  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user: any, done) => done(null, user.id));
  passport.deserializeUser((id: string, done) => {
    const user = db.prepare("SELECT * FROM users WHERE id = ?").get(id);
    done(null, user);
  });

  // Auth Routes
  app.post("/api/signup", (req, res) => {
    const { name, email, password } = req.body;
    try {
      const existingUser = db.prepare("SELECT id FROM users WHERE email = ?").get(email);
      if (existingUser) {
        return res.status(400).json({ success: false, message: "This email is already registered. Please use a different email or login." });
      }

      const stmt = db.prepare("INSERT INTO users (name, email, password) VALUES (?, ?, ?)");
      const info = stmt.run(name, email, password);
      const user = { id: info.lastInsertRowid, name, email };
      res.json({ success: true, user });
    } catch (error: any) {
      console.error("Signup error:", error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  });

  app.post("/api/login", (req, res) => {
    const { email, password } = req.body;
    const user = db.prepare("SELECT * FROM users WHERE email = ? AND password = ?").get(email, password) as any;
    if (user) {
      res.json({ success: true, user });
    } else {
      res.status(401).json({ success: false, message: "Invalid email or password" });
    }
  });

  app.post("/api/onboarding", (req, res) => {
    const { 
      userId, 
      startupName, 
      botPersonality, 
      primaryColor, 
      websiteUrl, 
      googleDriveUrl, 
      googleSheetUrl, 
      backoffSeconds, 
      ignoredMessages, 
      facebookConnected 
    } = req.body;

    try {
      const stmt = db.prepare(`
        UPDATE users SET 
          startup_name = ?, 
          bot_personality = ?, 
          primary_color = ?, 
          website_url = ?, 
          google_drive_url = ?, 
          google_sheet_url = ?, 
          backoff_seconds = ?, 
          ignored_messages = ?, 
          facebook_connected = ?
        WHERE id = ?
      `);
      stmt.run(
        startupName, 
        botPersonality, 
        primaryColor, 
        websiteUrl, 
        googleDriveUrl, 
        googleSheetUrl, 
        backoffSeconds, 
        ignoredMessages, 
        facebookConnected ? 1 : 0, 
        userId
      );
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  // Google Drive OAuth
  app.get('/api/auth/google-drive/url', (req, res) => {
    const redirectUri = `${process.env.APP_URL || 'http://localhost:3000'}/auth/google-drive/callback`;
    const params = new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID || 'dummy-client-id',
      redirect_uri: redirectUri,
      response_type: 'code',
      scope: 'https://www.googleapis.com/auth/drive.readonly',
      access_type: 'offline',
      prompt: 'consent'
    });
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
    res.json({ url: authUrl });
  });

  app.get('/auth/google-drive/callback', async (req, res) => {
    const { code } = req.query;
    // In a real app, you would exchange the code for tokens here
    // For this demo, we'll just simulate success and send the message back
    
    res.send(`
      <html>
        <body>
          <script>
            if (window.opener) {
              window.opener.postMessage({ 
                type: 'GOOGLE_DRIVE_AUTH_SUCCESS', 
                driveUrl: 'https://drive.google.com/drive/u/0/my-drive' // Simulated connected URL
              }, '*');
              window.close();
            } else {
              window.location.href = '/';
            }
          </script>
          <p>Google Drive connected successfully. This window should close automatically.</p>
        </body>
      </html>
    `);
  });

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
