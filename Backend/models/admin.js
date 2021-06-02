const mongoose = require('mongoose');
const schema = mongoose.Schema;

const adminSchema = new schema(
    {
        name : String,
        role : {
            type : String,
            default: "Admin"
        },
        email : String,
        password : String,
        isAvailable : {
            type: Boolean,
            default: true
        },
        playerNotification:[
            {
                playerId: String,
                regularMatch:{
                  type: Boolean,
                  default: true
                },
                scheduleGenerated : {
                    type: Boolean,
                    default: false
                }
            }
        ]

    }
);

module.exports = mongoose.model('Admin', adminSchema);
