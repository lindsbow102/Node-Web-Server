const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

const app = express();

hbs.registerPartials(__dirname + '/views/partials');  // Setting up site to use partials
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    const now = new Date().toString(); // Gives us formatted date for readable timestamp
    const log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server.log.');
        }
    });

    next(); // If this isn't called, your request handlers will never fire
});

app.use((req, res, next) => {
    res.render('maintenance.hbs'); // Only maintenance page will show up no matter URL 
});

app.use(express.static(__dirname + '/public')); // 'app.use()' is how you register middleware

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
 return text.toUpperCase();  // Can now use this syntax in home.hbs {{screamIt welcomeMessage}}
});

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page', 
        welcomeMessage: 'Welcome to my site!  Glad to see you.',
    })
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page', 
    }); // From Views folder
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: '404!  Looks like you have reached us in error!'
    });
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}!`);
});