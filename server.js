// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Author: Mark Drummond
// Date: 13-Jan-2022
// Project Title: Pressed Words
// Assignment: Tech blog
// See README.md for more information
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const path = require('path');
const aaLogo = require('asciiart-logo');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/hbsHelpers');

const sequelize = require('./config/connection');

// Create a new sequelize store using the express-session package
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({ helpers });

// Configure and link a session object with the sequelize store
const sess = {
  secret: 'Jubilant Robot',
  cookie: {
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

// Add express-session and store as Express.js middleware
app.use(session(sess));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
      const deployedAt = (process.env.MODE == 'development') ? (process.env.TEST_URL + `:` + PORT) : process.env.PROD_URL;
      return console.log(
        (aaLogo({
            name: "Pressed Words",
            font: 'DOS Rebel',
            linechars: 10,
            padding: 2,
            margin: 3,
            kerning: 5,
            borderColor: 'grey',
            logoColor: 'bold-green',
            textColor: 'green'
        })
            .emptyLine()
            .right(`Mode: ${process.env.MODE}`)
            .emptyLine()
            .right(`version ${process.env.VERSION}`)
            .emptyLine()
            .center(`Now listening at ${deployedAt}`)
        ).render()
      );
  });
});
