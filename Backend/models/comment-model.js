const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const CommentSchema = new Schema(
    {
        isComic: {type: Boolean, required: true},
        comicOrStoryID: {type: ObjectId, required: true},
        isReplyToAnotherComment: {type: Boolean, required: true},
        replyToCommentID: {type: ObjectId, required: false},
        replyToUserID: {type: ObjectId, required: false},
        creatorID: {type: ObjectId, required: true},
        content: {type: String, required: true},
    },
    { timestamps: true },
)

module.exports = mongoose.model('Comment', CommentSchema)