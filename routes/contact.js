const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator')
const ContactSchema = require('../models/Contact.js')
const bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
const authenticate = require('../middleware/authenticate');

router.post('/send', jsonParser, [

    body('name', "Name not found").exists(),
    body('phone', "Not a valid phone number").isLength({ min: 10, max: 13 }),
    body('mess', "Message not found").exists()

], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { name, email, mess, phone } = req.body

        await ContactSchema.create({
            name: name,
            email: email,
            mess: mess,
            phone: phone
        }).then((e) => {
            let data = e.toJSON();
            return res.status(201).json({ data })
        })
    } catch (error) {
        return res.status(500).json({ error })
    }
});

router.get('/get', authenticate, async (req, res) => {
    try {

        await ContactSchema.find({}).then((data) => {
            return res.status(200).json({ data })
        })

    } catch (error) {
        return res.status(500).json({ status: 'Server Error' })
    }
});

router.delete('/delete/:id', authenticate, async (req, res) => {
    try {

        let id = req.params.id
        await ContactSchema.findByIdAndDelete({ _id: id })

        return res.json('Contact data deleted')

    } catch (error) {
        return res.json(error.message)
    }
})

module.exports = router