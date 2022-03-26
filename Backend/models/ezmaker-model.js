const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Top5ListSchema = new Schema(
    {
        name: { type: String, required: true },
        items: { type: [String], required: true },
        ownerEmail:{ type: String, required: true },
        comments: { type: [[String,String]], required: false },
        Author:{ type: String, required: true },
        like: {type: Number, required: true},
        dislike: {type: Number, required: true},
        view: {type: Number, required: true},
        publish: {type: Boolean, required: true},
        publishdate: {type: Date, required: false},
        createdate: {type: Date, required: true},
        viewing: {type: Boolean, required: false},
        isCommunityList: {type: Boolean, required: false},
        updateDate: {type: Date, required: false},
        commentItems: { type: [[String,Number]], required: false }
    },
    { timestamps: true },
)

module.exports = mongoose.model('Top5List', Top5ListSchema)
