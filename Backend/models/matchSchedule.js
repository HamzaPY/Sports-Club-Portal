const mongoose = require('mongoose');
const schema = mongoose.Schema;

const matchScheduleSchema = new schema(
    {
        gameType : String,
        startTime : Date,
        endTime : Date,
        coach_id : String,
        court : String,
        opponent_id : String,
        winningStatus : Boolean

    }
);

module.exports = mongoose.model('MatchSchedule', matchScheduleSchema);
