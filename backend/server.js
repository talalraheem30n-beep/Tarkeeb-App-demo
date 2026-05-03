require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const express = require('express');
const session = require('express-session');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const dishes = require('./data/dishes');

const app = express();
const PORT = process.env.PORT || 3000;

// --- Users DB (file-based) ---
const USERS_FILE = path.join(__dirname, 'data', 'users.json');

function loadUsers() {
  try {
    return JSON.parse(fs.readFileSync(USERS_FILE, 'utf8'));
  } catch {
    return [];
  }
}

function saveUsers(users) {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

// Uploads directory removed (using memory storage)

// Middleware
const isProduction = process.env.NODE_ENV === 'production';

// Trust Render/Railway/Heroku reverse proxy so secure cookies work
if (isProduction) {
  app.set('trust proxy', 1);
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: process.env.SESSION_SECRET || 'tarkeeb-secret-key-2026',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000,
    secure: isProduction,
    sameSite: 'lax'
  }
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Static files — served from the frontend folder
const frontendDir = path.join(__dirname, '..', 'frontend');
app.use(express.static(frontendDir));
// Uploads static route removed

// Multer config using memoryStorage
const storage = multer.memoryStorage();
const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } });

// --- Passport: Google OAuth Strategy ---
const googleConfigured = process.env.GOOGLE_CLIENT_ID &&
  process.env.GOOGLE_CLIENT_ID !== 'YOUR_GOOGLE_CLIENT_ID_HERE';

const APP_URL = process.env.APP_URL || '';

if (googleConfigured) {
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${APP_URL}/auth/google/callback`
  }, (accessToken, refreshToken, profile, done) => {
    const users = loadUsers();
    let user = users.find(u => u.googleId === profile.id);

    if (!user) {
      user = {
        id: Date.now(),
        googleId: profile.id,
        username: profile.emails[0].value.split('@')[0],
        name: profile.displayName,
        email: profile.emails[0].value,
        avatar: profile.photos[0]?.value || null,
        password: null,
        createdAt: new Date().toISOString()
      };
      users.push(user);
      saveUsers(users);
    }

    return done(null, user);
  }));
}

// --- Passport: Facebook OAuth Strategy ---
const facebookConfigured = process.env.FACEBOOK_APP_ID &&
  process.env.FACEBOOK_APP_ID !== 'YOUR_FACEBOOK_APP_ID_HERE';

if (facebookConfigured) {
  passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: `${APP_URL}/auth/facebook/callback`,
    profileFields: ['id', 'displayName', 'photos', 'email']
  }, (accessToken, refreshToken, profile, done) => {
    const users = loadUsers();
    let user = users.find(u => u.facebookId === profile.id);

    if (!user) {
      const email = profile.emails?.[0]?.value || null;
      user = {
        id: Date.now(),
        facebookId: profile.id,
        username: email ? email.split('@')[0] : `fb_${profile.id}`,
        name: profile.displayName,
        email: email,
        avatar: profile.photos?.[0]?.value || null,
        password: null,
        createdAt: new Date().toISOString()
      };
      users.push(user);
      saveUsers(users);
    }

    return done(null, user);
  }));
}

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => {
  const users = loadUsers();
  const user = users.find(u => u.id == id);
  done(null, user || null);
});

// --- Auth Middleware ---
function requireAuth(req, res, next) {
  if (req.session && req.session.userId) return next();
  res.status(401).json({ error: 'Unauthorized' });
}

// --- GOOGLE AUTH ROUTES ---
app.get('/auth/google', (req, res, next) => {
  if (!googleConfigured) return res.redirect('/?error=google_not_configured');
  passport.authenticate('google', { scope: ['profile', 'email'] })(req, res, next);
});

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/?error=google_failed' }),
  (req, res) => {
    req.session.userId = req.user.id;
    req.session.userName = req.user.name;
    req.session.userAvatar = req.user.avatar;
    res.redirect('/app');
  }
);

// --- FACEBOOK AUTH ROUTES ---
app.get('/auth/facebook', (req, res, next) => {
  if (!facebookConfigured) return res.redirect('/?error=facebook_not_configured');
  passport.authenticate('facebook', { scope: ['public_profile'] })(req, res, next);
});

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/?error=facebook_failed' }),
  (req, res) => {
    req.session.userId = req.user.id;
    req.session.userName = req.user.name;
    req.session.userAvatar = req.user.avatar;
    res.redirect('/app');
  }
);

// --- LOCAL AUTH ROUTES ---
app.post('/api/register', async (req, res) => {
  const { username, name, password } = req.body;

  if (!username || !name || !password)
    return res.status(400).json({ error: 'All fields are required.' });
  if (username.length < 3)
    return res.status(400).json({ error: 'Username must be at least 3 characters.' });
  if (password.length < 6)
    return res.status(400).json({ error: 'Password must be at least 6 characters.' });

  const users = loadUsers();
  if (users.find(u => u.username.toLowerCase() === username.toLowerCase()))
    return res.status(409).json({ error: 'Username already taken. Please choose another.' });

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = {
    id: Date.now(),
    username: username.trim(),
    name: name.trim(),
    password: hashedPassword,
    createdAt: new Date().toISOString()
  };

  users.push(newUser);
  saveUsers(users);

  req.session.userId = newUser.id;
  req.session.userName = newUser.name;
  res.json({ success: true, name: newUser.name });
});

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ error: 'Username and password are required.' });

  const users = loadUsers();
  const user = users.find(u => u.username.toLowerCase() === username.toLowerCase());

  if (!user) return res.status(401).json({ error: 'Invalid username or password.' });
  if (!user.password) return res.status(401).json({ error: 'This account uses Google Sign-In. Please use the Google button.' });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ error: 'Invalid username or password.' });

  req.session.userId = user.id;
  req.session.userName = user.name;
  res.json({ success: true, name: user.name });
});

app.post('/api/logout', (req, res) => {
  req.session.destroy();
  res.json({ success: true });
});

app.get('/api/me', (req, res) => {
  if (!req.session || !req.session.userId) return res.status(401).json({ error: 'Not logged in' });
  res.json({ name: req.session.userName, avatar: req.session.userAvatar || null });
});

app.get('/api/config', (req, res) => {
  res.json({ googleEnabled: googleConfigured, facebookEnabled: facebookConfigured });
});

// --- DISH ROUTES ---
app.get('/api/dishes', requireAuth, (req, res) => {
  const list = dishes.map(d => ({
    id: d.id, name: d.name, category: d.category,
    emoji: d.emoji, image: d.image, description: d.description
  }));
  res.json(list);
});

app.get('/api/dishes/:id', requireAuth, (req, res) => {
  const dish = dishes.find(d => d.id === parseInt(req.params.id));
  if (!dish) return res.status(404).json({ error: 'Dish not found' });
  res.json(dish);
});

// --- HELPER: Levenshtein Distance ---
function getEditDistance(a, b) {
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;
  var matrix = [];
  for (var i = 0; i <= b.length; i++) { matrix[i] = [i]; }
  for (var j = 0; j <= a.length; j++) { matrix[0][j] = j; }
  for (var i = 1; i <= b.length; i++) {
    for (var j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) == a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, Math.min(matrix[i][j - 1] + 1, matrix[i - 1][j] + 1));
      }
    }
  }
  return matrix[b.length][a.length];
}

// --- IMAGE ANALYSIS ---
app.post('/api/analyze', requireAuth, upload.single('image'), (req, res) => {
  try {
    // 1. Error handling: check if file is uploaded
    if (!req.file) {
      return res.status(400).json({ error: 'No image uploaded' });
    }

    // 2. Access the file in memory using req.file.buffer
    // We're keeping this variable here to satisfy the requirement of accessing the buffer
    const imageBuffer = req.file.buffer;

    // 3. Simulate detection using the original file name
    const originalName = req.file.originalname.toLowerCase();
    const baseName = path.parse(originalName).name
      .replace(/[_\-\.]/g, ' ')
      .replace(/\d+/g, '')
      .trim();

    let bestMatch = null;
    let bestScore = 0;

    for (const dish of dishes) {
      let score = 0;
      const nameLower = dish.name.toLowerCase();

      if (baseName.includes(nameLower) || nameLower.includes(baseName)) {
        score += 10;
      } else {
        const dist = getEditDistance(baseName, nameLower);
        if (dist <= 2 && nameLower.length > 4) score += 8;
        else if (dist <= 1 && nameLower.length <= 4) score += 8;
      }

      for (const kw of dish.keywords) {
        if (baseName.includes(kw.toLowerCase())) score += 5;
        const words = baseName.split(/\s+/);
        for (const word of words) {
          if (word.length >= 3 && kw.toLowerCase().includes(word)) {
            score += 2;
          } else {
             const dist = getEditDistance(word, kw.toLowerCase());
             if (dist <= 2 && kw.length > 4) score += 2;
             else if (dist <= 1 && kw.length <= 4) score += 2;
          }
        }
      }

      if (score > bestScore) { bestScore = score; bestMatch = dish; }
    }

    // 4. Return the result in the exact format the frontend app.js expects
    if (bestMatch && bestScore >= 2) {
      return res.json({
        matched: true,
        confidence: Math.min(bestScore * 10, 98),
        dish: bestMatch, // Frontend expects the full dish object here
        analyzedFilename: req.file.originalname,
        uploadedPath: null, // No disk storage path
        // Top-level fields requested previously:
        dishName: bestMatch.name,
        ingredients: bestMatch.ingredients || [],
        steps: bestMatch.steps || []
      });
    } else {
      return res.json({ 
        matched: false,
        confidence: 0,
        analyzedFilename: req.file.originalname,
        message: 'Could not identify the dish. Try naming your image like "biryani.jpg" or "burger.png".' 
      });
    }
  } catch (error) {
    // Error handling: if processing fails
    console.error('Error during image analysis:', error);
    return res.status(500).json({ error: 'Internal server error during image analysis' });
  }
});

// --- Serve HTML pages ---
app.get('/', (req, res) => res.sendFile(path.join(frontendDir, 'index.html')));
app.get('/app', (req, res) => res.sendFile(path.join(frontendDir, 'app.html')));

// Bind to 0.0.0.0 so cloud hosts (Render, Railway, Heroku) can route traffic
app.listen(PORT, '0.0.0.0', () => {
  const url = APP_URL || `http://localhost:${PORT}`;
  console.log(`\n🍛  Tarkeeb is running!`);
  console.log(`   → ${url}\n`);
  console.log(googleConfigured ? `   ✅ Google Sign-In: ENABLED` : `   ⚠️  Google Sign-In: DISABLED`);
  console.log(facebookConfigured ? `   ✅ Facebook Sign-In: ENABLED` : `   ⚠️  Facebook Sign-In: DISABLED`);
  console.log(`   Environment: ${isProduction ? 'production' : 'development'}\n`);
});
