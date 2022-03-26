const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const PublishedComicSchema = new Schema(
    {
        authorID: { type: ObjectId, required: true },
        authorName: { type: String, required: true },
        comicTitle:{ type: String, required: true },
        comments: { type: [ObjectId], required: false },
        dislikedUser: {type: [ObjectId], required: true},
        likedUser: {type: [ObjectId], required: true},
        publishedTime: {type: Date, required: true},
        viewNumber: {type: Number, required: true}
    },
    { timestamps: true },
)


module.exports = mongoose.model('PublishedComic', PublishedComicSchema)
