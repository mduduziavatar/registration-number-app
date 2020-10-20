const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const app = express();
// app flash setups 
const flash = require('express-flash');
const session = require('express-session')
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use(express.static('public'));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}))

const pg = require("pg");
const Routes = require('./routes');
const Pool = pg.Pool;
const connectionString = process.env.DATABASE_URL || 'postgresql://mdu:pg123@localhost:5432/registration_numbers';
const pool = new Pool({
    connectionString
});
const RegFactoryFunction = require('./reg-num')
const regFactory = RegFactoryFunction(pool);
const routes = Routes(regFactory)

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
//sending back home
app.get('/', routes.index);

//registration app setup front page
app.post("/registration", async function(req, res) {

    const regNumbers = req.body.addRegNum;
    const towns = req.body.town;
    const allPlates = await regFactory.addRegNumbers(regNumbers)
    console.log(regNumbers)

    res.render('index', {
        regNumber: await allPlates
    });

});

app.get('/registration', routes.registrationAdd);
// to reset db
app.get('/reset', routes.reset);



const PORT = process.env.PORT || 3003;

app.listen(PORT, function() {
    console.log('App starting on port', PORT);
});