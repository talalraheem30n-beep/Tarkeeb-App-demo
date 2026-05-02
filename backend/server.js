require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const express = require('express');
const session = require('express-session');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
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

// Ensure uploads directory
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: process.env.SESSION_SECRET || 'tarkeeb-secret-key-2026',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 24 * 60 * 60 * 1000 }
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Static files — served from the frontend folder
const frontendDir = path.join(__dirname, '..', 'frontend');
app.use(express.static(frontendDir));
app.use('/uploads', express.static(uploadsDir));

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } });

// --- Passport: Google OAuth Strategy ---
const googleConfigured = process.env.GOOGLE_CLIENT_ID &&
  process.env.GOOGLE_CLIENT_ID !== 'YOUR_GOOGLE_CLIENT_ID_HERE';

if (googleConfigured) {
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback'
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
  res.json({ googleEnabled: googleConfigured });
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

// --- IMAGE ANALYSIS ---
app.post('/api/analyze', requireAuth, upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No image uploaded' });

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

    if (baseName.includes(nameLower) || nameLower.includes(baseName)) score += 10;

    for (const kw of dish.keywords) {
      if (baseName.includes(kw.toLowerCase())) score += 5;
      const words = baseName.split(/\s+/);
      for (const word of words) {
        if (word.length >= 3 && kw.toLowerCase().includes(word)) score += 2;
      }
    }

    if (score > bestScore) { bestScore = score; bestMatch = dish; }
  }

  if (bestMatch && bestScore >= 2) {
    res.json({
      matched: true,
      confidence: Math.min(bestScore * 10, 98),
      dish: bestMatch,
      analyzedFilename: req.file.originalname,
      uploadedPath: '/uploads/' + req.file.filename
    });
  } else {
    res.json({
      matched: false, confidence: 0,
      analyzedFilename: req.file.originalname,
      message: 'Could not identify the dish. Try naming your image like "biryani.jpg" or "burger.png".'
    });
  }
});

// --- Serve HTML pages ---
app.get('/', (req, res) => res.sendFile(path.join(frontendDir, 'index.html')));
app.get('/app', (req, res) => res.sendFile(path.join(frontendDir, 'app.html')));

app.listen(PORT, () => {
  console.log(`\n🍛  Tarkeeb is running!`);
  console.log(`   → http://localhost:${PORT}\n`);
  console.log(googleConfigured ? `   ✅ Google Sign-In: ENABLED` : `   ⚠️  Google Sign-In: DISABLED`);
  console.log(`   Default login: admin / admin123\n`);
});
