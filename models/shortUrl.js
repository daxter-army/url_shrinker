const mongoose = require('mongoose')
const shortId = require('shortid')

const urlSchema = new mongoose.Schema({
    fullUrl: {
        type: String,
        required: true,
        trim: true
    },
    shortUrl: {
        type: String,
        required: true,
        default: shortId.generate
    },
    clicks: {
        type: Number,
        required: true,
        default: 0
    }
},
{
    collection: 'shortUrls'
})

const shortUrl = mongoose.model('shortUrl', urlSchema)
module.exports = shortUrl