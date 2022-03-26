const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId


const ComicSchema = new Schema(
    {
        authorID: { type: ObjectId, required: true },
        authorName: {type: String, required: true},
        editedTime: {type: Date, required: true},
        comicTitle: {type: String, required: true}
    },
    { timestamps: true },
)

module.exports = mongoose.model('Comic', ComicSchema)