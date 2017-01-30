const fs = require('fs');
const express = require('express');
const hbs = require('hbs');

const app = express();
const port = process.env.PORT || 3000;

hbs.registerPartials('./views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
  let now = new Date().toString();
  let log = `${now}: ${req.method} ${req.url}`
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if(err) {
      console.log('Unable to append to server.log.');
    }
  });
  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance');
// });

app.use(express.static('./public'));

hbs.registerHelper('copyright', () => {
  return `CopyRONG ${new Date().getFullYear()}`
});

app.get('/', (req, res) => {
  res.render('index', {
    title: 'dooo doo doo',
    main: 'sing sing sing me a song song song!',
  })
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'Dookey',
    main: 'Beef Licker',
  });
});

app.get('/portfolio', (req, res) => {
  res.render('portfolio', {
    title: 'CHECK OUT MY STUDS',
    main: 'THIS IS DA WERK',
  });
});

app.get('/contact', (req, res) => {
  res.render('contact', {
    title: 'HEY WHATS UP HELLO',
    main: 'BEEP BEEP BEEP BEEP',
  });
});

app.listen(port, () => console.log(`server is running on port ${port}`));
