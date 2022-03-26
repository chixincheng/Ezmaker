const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const CommentSchema = new Schema(
    {
        commentUserID: { type: ObjectId, required: true },
        content: {type: String, required: true},
        replies: {type: [ObjectId], required: true}
    },
    { timestamps: true },
)

module.exports = mongoose.model('Comment', CommentSchema)