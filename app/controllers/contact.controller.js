const db = require("../models");
const {json} = require("body-parser");
const Contacts = db.contacts;
const Op = db.Sequelize.Op;
// Create and Save a new contact
exports.create = (req, res) => {
// Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
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
        note_date: Date.now().toString(),
    };
    Contacts.create(contact).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "An error occurred while creating contact"
        })
    });
};
// Retrieve all contacts from the database.
exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;
    contact.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving contacts."
            });
        });
};
// Find a single contact with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    contact.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find contact with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving contact with id=" + id
            });
        });
};
// Update a contact by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
    contact.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "contact was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update contact with id=${id}. Maybe contact was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating contact with id=" + id
            });
        });
};
// Delete a contact with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    contact.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "contact was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete contact with id=${id}. Maybe contact was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete contact with id=" + id
            });
        });
};
// Delete all contacts from the database.
exports.deleteAll = (req, res) => {
    contact.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} contacts were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all contacts."
            });
        });
};
// Find all published contacts
exports.findAllPublished = (req, res) => {
    contact.findAll({ where: { published: true } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving contacts."
            });
        });
};