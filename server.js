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
    Contacts.create(contact).then(data => {console.log(contact)
    }).catch(err => {
        res.status(500).send({
            message: err.message || "An error occurred while creating contact"
        })
    });
    res.render('pages/add-contact', {contact: contact});
});

app.get('/contacts/find', (req, res) => {
    res.render('pages/find-contact');
});

async function searchBy(id, value) {
    const result = await Contacts.findOne({
        where: {
            "name": value,
        }
    });
    if (result === null) {
        let message = id + " not found";
        res.render('error', {message: message});

    }
    res.render('pages/search-results', {contacts: result})
}

app.post('/contacts/find', async (req, res) => {
    if(req.body.name){
        const result = await Contacts.findOne({
            where: {
                "name": req.body.name,
            }
        });
        res.render('pages/search-results', {result: result})
        if (result === null) {
            let message =  req.body.name + "Name not found";
            res.render('pages/search-results', {message: message});
        }
    }else if(req.body.surname){
        let surname = req.body.surname;
        searchBy("surname", surname);
    }else if(req.body.email){
        let email = req.body.email;
        searchBy("email", email);
    }else if(req.body.cell){
        let cell = req.body.cell;
        searchBy("cell", cell);
    }else if(req.body.note_title){
        let note_title = req.body.note_title;
        searchBy("note-title", note_title);
    }else if(req.body.note_description){
        let note_description = req.body.note_description;
        searchBy("note-description", note_description);
    }else {
        alert("Error");
    }

    res.render('pages/find-contact');
});

app.get('/contacts/:id', (req, res) => {
    res.render('pages/show-contact.ejs');
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