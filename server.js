const express = require('express');
const hbs = require('hbs');

const app = express();

hbs.registerPartials(__dirname + '/views/partials');  // Setting up site to use partials
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

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

app.listen(3000, () => {
    console.log('Server is up on port 3000!');
});