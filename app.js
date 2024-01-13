const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const routerblog = require('./routes/Blog');
const routeradmin = require('./routes/Admin');
const { DisplayAllBlogs } = require('./controller/Blog');
const hbs = require('hbs');
const session = require('express-session');
const MongoStore = require('connect-mongo');

// Register the handlebars helper
hbs.registerHelper('ifEquals', function (arg1, arg2, options) {
    return arg1 == arg2 ? options.fn(this) : options.inverse(this);
});

// Use session with MongoStore
app.use(
    session({
        secret: 'secret',
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
            mongoUrl:
                'mongodb+srv://ansh:vez0X9TN6aA4DnI9@cluster0.g01aulu.mongodb.net/blogsapp?retryWrites=true&w=majority',
        }),
    })
);

// Register partials with handlebars
hbs.registerPartials(path.join(__dirname, 'views', 'partials'));

// Set up handlebars as the view engine
app.engine(
    'hbs',
    exphbs.engine({
        extname: 'hbs', // Update the file extension if your partials use a different extension
        defaultLayout: 'landingpage', // Update with your main layout file name
        layoutsDir: path.join(__dirname, 'views', '/'), // Update the layouts directory
        partialsDir: path.join(__dirname, 'views', 'partials')
    })
);

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'static')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', DisplayAllBlogs);

function checkloggedin(req, res, next) {
    if (req.session.isLoggedIn) {
        next();
    } else {
        res.send('Login first to proceed');
    }
}

app.use('/', routeradmin);
app.use('/', checkloggedin, routerblog);

mongoose
    .connect(
        'mongodb+srv://ansh:vez0X9TN6aA4DnI9@cluster0.g01aulu.mongodb.net/blogsapp?retryWrites=true&w=majority',
        { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => {
        app.listen(3000, () => {
            console.log('Server is running at port 3000');
        });
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });
