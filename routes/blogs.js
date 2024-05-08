const express = require('express')
const router = express.Router();
const BlogsSchema = require('../models/Blogs')
const BlogCommentSchema = require('../models/BlogComment')
const { body, validationResult } = require('express-validator')
const authenticate = require('../middleware/authenticate');
const bodyParser = require('body-parser')
var jsonParser = bodyParser.json()


// Endpoint: Getting all blogs card for frontend
router.get('/', async (req, res) => {
    try {

        let allBlogs = await BlogsSchema.find({ status: true })

        if (allBlogs?.length === 0 || !allBlogs) {
            return res.status(400).json("No blogs found")
        }

        return res.status(200).json(allBlogs)

    } catch (error) {
        return res.status(500).json("Server Error")
    }
})


// Endpoint: Getting all blogs card for Admin
router.get('/get-all-blogs', authenticate, async (req, res) => {
    try {

        let allBlogs = await BlogsSchema.find({})

        if (allBlogs?.length === 0 || !allBlogs) {
            return res.status(400).json("No blogs found")
        }

        return res.status(200).json(allBlogs)

    } catch (error) {
        return res.status(500).json("Server Error")
    }
})


// Endpoint: New Blog and Update Blog || Admin require
router.post('/', jsonParser, authenticate, [

    body('text').exists().withMessage("Blogs title not found"),
    body('img').exists().withMessage("Blog card should have image").custom((val) => {
        if (val.includes("https://onedrive.live.com/embed?")) {
            return true
        }

        throw new Error("Card image not valid")
    }),
    body('details').exists().withMessage("Blog should have details").isLength({ min: 300 }).withMessage("Blog details is too short"),
    body('subDetails').exists().withMessage('Blog card text is missing!').isLength({ min: 50 }).withMessage("Blog card text-is too short!"),
    body('update_flag').exists().withMessage("Update flag missing! Please contact to developer").custom((val) => {
        if (val === true || val === false) {
            return true
        }

        throw new Error("Unauthorize access not allowed!")
    })

], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors.array()[0]?.msg)
    }

    try {

        let { text, img, details, update_flag, blog_id, subDetails } = req.body

        if (update_flag === true) {
            await BlogsSchema.findByIdAndUpdate(
                { _id: blog_id },
                {
                    $set: {
                        'text': text,
                        'card_img': img,
                        'details': details,
                        'subDetails': subDetails
                    }
                }
            )

            let updated = await BlogsSchema.findById({ _id: blog_id })
            return res.status(200).json(updated)
        } else {
            let blog = new BlogsSchema({
                'text': text,
                'card_img': img,
                'details': details,
                'subDetails': subDetails
            })

            await blog.save()

            if (!blog) {
                return res.status(500).json("Blog creation failed")
            }

            return res.status(201).json(blog)
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json("Server Error")
    }
})


// Deleting selected blog || Admin Require
router.delete('/', jsonParser, authenticate, [

    body('_id').exists().withMessage("Blog id not found").isMongoId().withMessage("Unauthorize access not allowed!")

], async (req, res) => {
    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array()[0]?.msg)
        }

        await BlogsSchema.findOneAndDelete({ _id: req.body._id })
        return res.status(200).json("Blog Delete Success")

    } catch (error) {
        console.log(error);
        return res.status(500).json("Server Error")
    }
})


// Toggle blog status || Admin Require
router.post('/toggle-status', jsonParser, authenticate, [

    body('flag').exists().withMessage("Toggle data not found").custom((val) => {
        if (val === true || val === false) {
            return true
        }

        throw new Error("Not a valid type toggle message")
    }),
    body('_id').exists().withMessage('Blog ID not found').isMongoId().withMessage('Unauthorize access not allowed!')

], async (req, res) => {
    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array()[0]?.msg)
        }

        let { flag, _id } = req.body
        await BlogsSchema.findOneAndUpdate(
            { _id: _id },
            {
                $set: {
                    'status': flag
                }
            }
        )

        return res.status(200).json('Status has been changed!')

    } catch (error) {
        return res.status(500).json("Server Error")
    }
})


router.get('/comment', async (req, res) => {
    try {

        let comments = await BlogCommentSchema.find({})
        return res.status(200).json(comments)

    } catch (error) {
        return res.status(500).json("Server Error")
    }
})

// Endpoint for push comment
router.post('/comment', jsonParser, [

    body('name').exists().withMessage("What is your name?").isLength({ min: 3 }).withMessage("Name is too short!"),
    body('msg').exists().withMessage("Message not found!").isLength({ min: 25 }).withMessage("Message is too short!"),
    body('_id').exists().withMessage("Blog ID not found").isMongoId().withMessage("Unauthorize access not allowed!")

], async (req, res) => {
    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array()[0]?.msg)
        }

        let { name, email, msg, _id } = req.body

        let comment = new BlogCommentSchema({
            name: name,
            email: email,
            msg: msg,
            ofBlog: _id
        })

        await comment.save()

        return res.status(201).json(comment)

    } catch (error) {
        console.log(error);
        return res.status(500).json("Server Error, BLOG_COMMENTS_ERROR")
    }
})


// Endpoint for delete comment
router.delete('/comment', authenticate, jsonParser, [

    body('_id').exists().withMessage("Comment ID not found").isMongoId().withMessage("Unauthorize access not allowed!")

], async (req, res) => {
    try {
        
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array()[0]?.msg)
        }

        await BlogCommentSchema.findOneAndDelete({ _id: req.body._id })
        return res.status(200).json("Comment Deleted")

    } catch (error) {
        return res.status(500).json("Server Error")
    }
})


module.exports = router