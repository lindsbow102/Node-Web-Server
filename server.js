const express = require('express');

const app = express();

app.get('/', (req, res) => {
    //res.send('<h1>Hello Express!</h1>');
    res.send({
        name: 'Lindsey',
        age: 38,
        hobbies: ['running', 'netflixing', 'coding']
    });
});

app.get('/about', (req, res) => {
    res.send('About Page');
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: '404!  Looks like you have reached us in error!'
    });
});

app.listen(3000);