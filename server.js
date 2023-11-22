require('dotenv').config();

const express = require('express');
const expressLayout = require('express-ejs-layouts');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const connectDB = require('./models/config/db');

const app = express();
const port = process.env.PORT || 8000;

// Connect to Database
connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

// Static Files
app.use(express.static('public'));

// Express Session
app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  })
);

// Flash Messages
app.use(flash({ sessionKeyName: 'flashMessage' }));

app.use(expressLayout);
app.set('layout', 'layouts/main');
app.set('view engine', 'ejs');

// Render the login page
app.get('/', (req, res) => {
  res.render('login');
});

// Handle login form submission
app.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  // Perform your login logic here
  // Replace this with your actual login implementation

  // Example: Check if the username and password are valid
  if (username === 'admin' && password === 'password') {
    // Set a session variable to indicate that the user is logged in
    req.session.isLoggedIn = true;
    res.redirect('/index');
  } else {
    res.send('Invalid username or password');
  }
});

// Middleware to check if the user is logged in
app.use((req, res, next) => {
  // Check if the session variable is set
  if (req.session.isLoggedIn) {
    // User is logged in, proceed to the next route handler
    next();
  } else {
    // User is not logged in, redirect to the login page
    res.redirect('/');
  }
});

// Serve the index (home) page
app.get('/index', (req, res) => {
  res.render('index');
});

app.get('/register', (req, res) => {
  res.render('register');
});

// Handle register form submission
app.post('/register', (req, res) => {
  // Process the register form data here
  const username = req.body.username;
  const password = req.body.password;

  // Perform your registration logic here
  // Replace this with your actual registration implementation

  // Example: Check if the username and password are valid
  if (username && password) {
    // Registration successful, redirect to register.ejs
    res.render('register');
  } else {
    // Invalid registration data
    res.send('Invalid registration data');
  }
});

app.use('/', require('./models/routes/Employee'));

app.get('*', (req, res) => {
  res.status(404).render('404');
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});