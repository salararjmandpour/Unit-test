const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');

//>-------------------- create model

const articleSchema = Schema({

    title: { type: String, required: true },
    author: { type: String, required: true },
    body: { type: String, required: true },
    tags: { type: String, required: true },
    viewCount: { type: String, required: true },

}, { timestamps: true });

//>-------------------- set data paginate

articleSchema.plugin(mongoosePaginate);

//>-------------------- export model

module.exports = mongoose.model('article', articleSchema);