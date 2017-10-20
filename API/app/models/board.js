const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BoardSchema = new Schema({
    url: String,
    name: String,
    lists: [
        {
            name: String,
            subtusks: [
                {
                    content: String
                }
            ]
        }
    ]
});

module.exports = mongoose.model('Board', BoardSchema);
