const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require('sequelize');
const cors = require("cors");
const multer = require("multer")
const path = require("path");
const upload = multer();
const app = express();

const corsOptions = {
    origin: "http://localhost:8081"
};
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({extended: true}));
// set the view engine to ejs
app.set('view engine', 'ejs');
// for parsing multipart/form-data
app.use(upload.array());
//app.use(express.static('public'));

const db = require("./app/models");

const Contacts = db.contacts;

const vw = path.join(__dirname, 'views')

// simple route
app.get("/", (req, res) => {
    const msg = "Welcome to the contact manager application.";
    res.render('pages/index', {msg: msg});
});

app.get("/contacts", async (req, res) => {
    const contacts = await Contacts.findAll();
    //console.log("Contacts - " + contacts);
    res.render('pages/contacts', {contacts: contacts});
})

app.get('/contacts/add', (req, res) => {
    res.render('pages/add-contact');
});

app.post('/contacts/add', (req, res) => {
    // Create a contact
    const contact = {
        name: req.body.name,
        surname: req.body.surname,
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        home: req.body.home,
        cell: req.body.cell,
        note_title: req.body.note_title,
        note_description: req.body.note_description,
        note_date: new Date().toLocaleString()
    };
    Contacts.create(contact).then(data => {
        //.send(data);
        console.log(contact)
    }).catch(err => {
        res.status(500).send({
            message: err.message || "An error occurred while creating contact"
        })
    });

    res.render('pages/add-contact', {contact: contact});
});




db.sequelize.sync();

/*
db.sequelize.sync({force: true}).then(() => {
    console.log("Drop and re-sync db.");
});
*/

require("./app/routes/contact.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});