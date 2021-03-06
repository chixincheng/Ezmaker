const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const PublishedStorySchema = new Schema(
    {
        authorID: { type: ObjectId, required: true },
        authorName: { type: String, required: true },
        comments: { type: [ObjectId], required: false },
        dislikedUser: {type: [ObjectId], required: false},
        likedUser: {type: [ObjectId], required: false},
        publishedTime: {type: Date, required: true},
        viewNumber: {type: Number, required: true},
        storyTitle:{ type: String, required: true },
        coverPage: {type: String, reqiured: false},
        filePath: {type: String, required: false},
    },
    { timestamps: true },
)

module.exports = mongoose.model('PublishedStory', PublishedStorySchema)