const mongoose = require('mongoose');
const schema = mongoose.Schema;

const coachSchema = new schema(
    {
        name : String,
        role : {
            type : String,
            default: "Coach"
        },
        email : String,
        password : String,
        isAvailable : {
            type: Boolean,
            default: true
        }
    }
);

module.exports = mongoose.model('Coach', coachSchema);
