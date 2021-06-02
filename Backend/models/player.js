const mongoose = require('mongoose');
const schema = mongoose.Schema;
require('./attendance');
require('./practiceSchedule');
require('./matchSchedule');


const playerSchema = new schema(
    {
        name : {
            type : String,
            required : true
        },
        email : {
            type : String,
            unique : true,
            required: true
        },
        password : {
            type : String,
            required : true
        },
        ranking : {
            type: String,
            default: "Beginner"
        },
        gender : {
            type : Boolean,
            default: true
        },
        role : {
            type : String,
            default: "Player"
        },
        dailyJoiningTime: {
            type : String,
            default: "08:00"
        },
        game : [
            {
                gameType: String,
                playerRank: String,
                schedule:{
                    type:Boolean,
                    default:false
                }
                // type : schema.Types.ObjectId,
                // ref: 'InterestedGames'
            }
        ],
        opponentRank: String,
        todayCheckIn: Date,
        attendance : [{
            checkIn : Date,
            gamePriority : [{
                gameType : String,
                priority : Number,
                Duration : Number
            }]
        }],


        progressInPracticeSessions : {
            nPracticeSessions : {
                type: Number,
                default: 0
            },
            practiceSession : [
                {
                    gameType : String,
                    startTime : Date,
                    endTime : Date,
                    coach_id : String,
                    coachName : String,
                    court : String,
                    opponent_id : String,
                    winningStatus : {
                        type: String,
                        default: "not decided"
                    },
                    marked: {
                        type: Boolean,
                        default: false
                    },
                    played: {
                        type: Boolean,
                        default: false
                    },
                    opponentName: String
                    // type : schema.Types.ObjectId,
                    // ref : 'PracticeSchedule'
                }
            ]
        },
        progressInMatchSessions : {
            nMatchSessions :  {
                type: Number,
                default: 0
            },
            matchSession : [
                {
                    gameType : String,
                    startTime : Date,
                    endTime : Date,
                    coach_id : String,
                    court : String,
                    opponent_id : String,
                    winningStatus : {
                        type: String,
                        default: "not decided"
                    },
                    marked: {
                        type: Boolean,
                        default: false
                    },
                    played: {
                        type: Boolean,
                        default: false
                    },
                    opponentName: String
                    // type : schema.Types.ObjectId,
                    // ref : 'MatchSchedule'
                }
            ]
        },
        isPresent : {
            type : Boolean,
            default : false
        },
        firstLogin : {
            type : Boolean,
            default : true
        },

    }
);

module.exports = mongoose.model('Player', playerSchema);
