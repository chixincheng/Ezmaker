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

const StorySchema = new Schema(
    {
        authorID: { type: ObjectId, required: true },
        authorName: {type: String, required: true},
        editedTime: {type: Date, required: true},
        storyTitle: {type: String, required: true}
    },
    { timestamps: true },
)

const CommentSchema = new Schema(
    {
        commentUserID: { type: ObjectId, required: true },
        content: {type: String, required: true},
        replies: {type: [ObjectId], required: true}
    },
    { timestamps: true },
)

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

const PublishedStorySchema = new Schema(
    {
        authorID: { type: ObjectId, required: true },
        authorName: { type: String, required: true },
        comments: { type: [ObjectId], required: false },
        dislikedUser: {type: [ObjectId], required: true},
        likedUser: {type: [ObjectId], required: true},
        publishedTime: {type: Date, required: true},
        viewNumber: {type: Number, required: true},
        storyTitle:{ type: String, required: true }
    },
    { timestamps: true },
)


module.exports = mongoose.model('Story', StorySchema)
module.exports = mongoose.model('Comment', CommentSchema)
module.exports = mongoose.model('PublishedStory', PublishedStorySchema)
module.exports = mongoose.model('PublishedComic', PublishedComicSchema)
module.exports = mongoose.model('Comic', ComicSchema)
