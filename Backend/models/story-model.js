const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const StorySchema = new Schema(
    {
        authorID: { type: ObjectId, required: true },
        authorName: {type: String, required: true},
        editedTime: {type: Date, required: true},
        storyTitle: {type: String, required: true}
    },
    { timestamps: true },
)

module.exports = mongoose.model('Story', StorySchema)
