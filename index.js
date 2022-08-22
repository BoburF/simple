const express = require('express')
const app = express()
const { create } = require('express-handlebars')
const session = require('express-session');
const path = require('path')
const flash = require('connect-flash');
const cookie = require('cookie-parser')
const compression = require('compression')

// dotenv
require('dotenv').config()

const uri = process.env.MONGO

// mongodb connect
require('./helper/db')(uri)

// session
app.use(session({
    secret: process.env.KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 1000 * 60 * 60 }
}));

app.use(flash());

// engine
const exhbs = create({
    defaultLayout: 'layout',
    extname: 'hbs',
    runtimeOptions: {
        allowProtoMethodsByDefault: true,
        allowProtoPropertiesByDefault: true
    }
})
app.engine('hbs', exhbs.engine)
app.set('view engine', 'hbs')
app.set('views', './views')

// app use
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(require('compression')())
app.use(cookie());
app.use(compression())

// routes
const client = require('./routes/client/index')
const admin = require('./routes/admin/index')
const login = require('./routes/admin/login')
const error = require('./routes/404')

// middleware
const auth = require('./middleware/auth');
const count = require('./middleware/bug_products');

app.use('/', count, client);
app.use('/admin/login', login);
app.use('/admin', auth, admin);
app.use(error);

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log('Server listened on port', PORT);
})

// MONGO='mongodb+srv://Bobur:2vhYyYBf659w6eCm@cluster0.jnpjw6n.mongodb.net/Fruiktha'
// KEY='Secret'
// CHAT_ID='635762695'
// BOT_TOKEN='1797099155:AAGCKDEKnIDcqVtnpTkapp0bPNbhhnV5aQ8'