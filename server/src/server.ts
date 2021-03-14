import express from 'express';
import passport from 'passport';
import path from 'path';

import './services/passport';
import authRouter from './routes/authRoutes';

const app = express();

// Configure view engine to render EJS templates.
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(require('cookie-parser')());
// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());

app.use('/', authRouter);

if (process.env.NODE_ENV === 'production') {
  // Express will serve up production assets
  // like our main.js file, or main.css file!
  app.use(express.static('client/build'));

  // Express will serve up the index.html file
  // if it doesn't recognize the route
  app.get('*', (_req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
