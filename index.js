const express = require('express')
const ShortUrl = require('./models/shortUrl')
require('./database/mongoose')

const app = express()
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: false}))

const port = process.env.PORT

app.get('/', async (req, res) => {
    try{
        const shortUrl = await ShortUrl.find()

        res.render('index', {
            shortUrls: shortUrl,
            errorMsg : false,
            url: true
        })
    }
    catch{
        res.status(500).send({
            error: 'Internal Server error...please try again',
            code : 500
        })
    }
})

app.post('/shortUrls', async (req, res) => {
    const fullUrl = req.body.fullUrl

    try{
        await ShortUrl.create({
            fullUrl : fullUrl
        })
        res.redirect('/')
    }
    catch{
        res.send({
            error: 'Internal Server error...please try again',
            code : '500'
        })
    }
})

app.get('/:shortUrl', async (req, res) => {
    try{
        const search = await ShortUrl.findOne({
            shortUrl : req.params.shortUrl
        })

        if (search == null){
            res.render('index', {
                errorMsg : true,
                url : false
            })
            return
        }

        search.clicks++
        search.save()

        res.redirect(search.fullUrl)
    }
    catch{
        res.status(404).send({
            error : 'Something went wrong...Not Found!',
            code : 404
        })
    }
})

app.post('/delete', async (req, res) => {
    try{
        await ShortUrl.deleteMany()
        res.redirect('/')
    }
    catch{
        res.send({
            error: 'Internal Error...please try again',
            code: 500
        })
    }
})

app.listen(port)