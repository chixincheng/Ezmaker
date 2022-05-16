const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const PlaylistSchema = new Schema(
    {
        isComic: {type: Boolean, required: true},
        creatorID: {type: ObjectId, required: true},
        title: {type: String, required: true},
        elementIDSeries: {type: [ObjectId], required: true}
    },
    { timestamps: true },
)

module.exports = mongoose.model('Playlist', PlaylistSchema)