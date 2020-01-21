const express = require("express");

const db = require("../data/dbConfig");

const router = express.Router();

// GET requests
router.get("/", (req, res) => {
    db.select('*').from('accounts')
    .then(data => {
        res.status(200).json(data)
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({errorMessage: "something went wrong!"})
    })
});

router.get("/:id", (req, res) => {
    const id = req.params.id;
    db.select('*').from('accounts').where('id', '=', id)
    .first()
    .then(data => {
        res.status(200).json(data)
    })
    .catch(error => {
        res.status(500).json({errorMessage: "something went wrong!"})
    })
});

// POST request
router.post("/", (req, res) => {
    db.insert(req.body, 'id').into('accounts')
    .then(newId => {
        res.status(200).json(newId)
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({errorMessage: "something went wrong!"})
    })
});

// PUT requests
router.put("/:id", (req, res) => {
    const updateId = req.params.id;
    const body = req.body;
    db('accounts').where({ id: updateId })
    .update(body)
    .then(data => {
        res.status(200).json(data)
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({errorMessage: "something went wrong!"})
    })
});

// DELETE requests
router.delete("/:id", (req, res) => {
    const deleteId = req.params.id;
    db('accounts').where({ id: deleteId })
    .del()
    .then(deleted => {
        res.status(200).json(deleted)
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({ errorMessage: "something went wrong!"})
    })
});

module.exports = router;


