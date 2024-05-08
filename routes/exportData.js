const express = require('express')
const router = express.Router()
const contactSchema = require('../models/Contact')
const json2csv = require('json2csv').parse
const fs = require('fs')

router.get('/contact', async (req, res) => {
    try {

        await contactSchema.find({}, 'date name phone email').then(async (data) => {
            const fields = ['date', 'name', 'phone', 'email']
            const csv = json2csv(data, { fields })

            fs.writeFile('contact.csv', csv, (err) => {
                if (err) {
                    return res.json(err.message)
                }
            })

            res.attachment('contact.csv')
            return res.status(200).send(csv)
        })

    } catch (error) {
        return res.json(error.message)
    }
})

module.exports = router