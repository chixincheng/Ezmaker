const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const StorySchema = new Schema(
    {
        authorID: { type: ObjectId, required: true },
        authorName: {type: String, required: true},
        editedTime: {type: Date, required: true, default: new Date()},
        storyTitle: {type: String, required: true},
        content: {type: String, required: false, default: ""},
        filePath: {type: String, required: false},
        coverPage: {type: String, reqiured: false},
        publishID:{type: ObjectId, required: false}
    },
    { timestamps: true },
)

module.exports = mongoose.model('Story', StorySchema)
