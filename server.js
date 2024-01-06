const express = require('express');
const path = require('path');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers/index');
const helpers = require('./utils/');

const sequelize = require('.config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 9001;

// set up Handlebars with Helpers
const hbs = exphbs.create({helpers});

const sess = {
    secret: 'Super secret secret',
    cookie: {
        maxAge: 300000, 
        httpOnly: true, 
        secure: false,
        sameSite: 'strict',
    },
    resave: false, 
    saveUninitialized: true, 
    blog: new SequelizeStore({
        db: sequelize
    })
};

app.use(session(sess));

// inform Express.js on which template engine to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({force: false}).then(()=>{
    app.listen(PORT, ()=> console.log(`Now listening to http://localhost:${PORT}`));
});