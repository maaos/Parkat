const express = require("express");
const session = require("express-session");
const MongoStore = require('connect-mongo')(session);
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();


//CONECTARE CU MongoDB
mongoose.connect("mongodb://localhost:27017/parkbvDB", { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true });

// IA CONEXIUNE DB SI VERIFICA DACA LA CONNECT E EROARE
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));


// login session
app.use(session({
    secret: 'contulmeu',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({
        mongooseConnection: db
    }),
    cookie: { maxAge: 180 * 60 * 1000 }
}));

//da m acces global(template) la informatiile din sesiune 
app.use(function (req, res, next) {
    res.locals.currentUser = req.session.username;
    res.locals.nume = req.session.nume;
    next();
});


app.set('view engine', 'ejs');
app.set("views", __dirname + "/views");


//ADAUGARE FOLDERUL PUBLIC CA O RESURSA STATICA
app.use(express.static("public"));

//INITIERE BODY-PARSER
app.use(bodyParser.urlencoded({
    extended: true
}));


// CREARE DB

var Schema = mongoose.Schema;


var UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    nume: {
        type: String,
        required: true,
        trim: true
    },
    telefon: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    parola: {
        type: String,
        required: true,
        trim: true
    }

});

var User = mongoose.model('User', UserSchema);


// ADAUGAREA PAGINILOR WEB IN SERVER
app.get("/", function (req, res) {
    res.render("index");
});


app.get("/rent", function (req, res) {
    res.render("rent", { isRentPage: true });
});

app.get("/search", function (req, res) {
    res.render("search");
});

app.get("/inregistrare", function (req, res) {
    res.render("inregistrare");
});

app.get("/contulmeu", function (req, res) {
    //inainte sa facem cautarea verificam daca exista vreun user conectat
    if (req.session.username) {
        //cauta in baza useru conectat
        User.findOne({ email: req.session.username }).exec(function (err, foundUser) {
            if (err) {
                console.log(err);
            } else {
                if (foundUser) {
                    res.render("contulmeu", { user: foundUser });
                }
            }
        });
    } else {
    res.redirect("/");
    }
});



// PRINDE RUTA DE INREGISTRARE 
//(atunci cand se creaza uncont nou)
app.post("/inregistrare", function (req, res) {

    var userData = {
        email: req.body.username,
        nume: req.body.nume,
        telefon: req.body.telefon,
        parola: req.body.password
    };

    User.create(userData, function (error, user) {
        if (error) {
            console.log("Eroare:" + error);
        } else {
            // Ajuta sa ramana userul logat
            req.session.username = user.email;
            req.session.nume = user.nume;
            res.redirect('/');
        };
    });


});

//VERIFICA DACA AVEM USER CU ACELE CREDENTIALE
app.post("/login", function (req, res) {
    const username = req.body.username;
    const parola = req.body.password;

//Cautam in DB daca exista un cont cu user respectiv
//daca este, verificam daca parola introdusa este identica cu cea din DB
    User.findOne({ email: username }).exec(function (err, foundUser) {
        if (err) {
            console.log("Nu merge 1 ");
            console.log(err);
        } else {
            if (foundUser) {
                if (foundUser.parola === parola) {
                    //salvam in sesiune informatii despre user
                    req.session.username = foundUser.email;
                    req.session.nume = foundUser.nume;
                    res.redirect("/contulmeu");
                }
            }
        }
    });

});

//LOGOUT

app.get("/logout", function (req, res) {
    if (req.session.username) {

        req.session.destroy(function (err) {
            if (err) {
                return next(err);
            } else {
                return res.redirect('/');
            }
        })
    }
});







//PORNESTE SERVERUL PE PORT 3002
app.listen(3002, function () {
    console.log("Server started on port 3002");
});