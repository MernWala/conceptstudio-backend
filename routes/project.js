const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator')
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const authenticate = require('../middleware/authenticate.js')
const ProjectSchema = require('../models/Project.js')

router.post('/', authenticate, jsonParser, [

    body('title', "Tilte not found").exists(),
    body('url', "Url Not Found").exists()

], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors.array());
    }

    try {

        await ProjectSchema.create({
            title: req.body.title,
            url: req.body.url.substring(req.body.url.length - 11)
        }).then((e) => {
            let data = e.toJSON();
            return res.status(201).json({ _id: data._id })
        })

    } catch (error) {
        return res.status(500).json(error.message)
    }
});

router.get('/', async (req, res) => {
    try {
        await ProjectSchema.find({}).then((e) => {
            return res.status(200).json(e)
        })

    } catch (error) {
        return res.status(500).json(error.message)
    }
});

router.delete('/:id', authenticate, async (req, res) => {
    try {

        await ProjectSchema.findByIdAndDelete({ _id: req.params.id }).then((e) => {
            if (e === null) {
                return res.status(404).json("Not Found")
            } else {
                return res.status(200).json("Project Deleted")
            }
        })

    } catch (error) {
        return res.status(500).json(error.message)
    }
});

module.exports = router