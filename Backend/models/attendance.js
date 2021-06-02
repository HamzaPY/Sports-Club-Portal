const mongoose = require('mongoose');
const schema = mongoose.Schema;

const attendanceSchema = new schema(
    {
        checkIn : Date,
        gamePriority : [{
            gameType : String,
            priority : Number,
            Duration : Number
        }]
    }
);
module.exports = mongoose.model('Attendance', attendanceSchema);
