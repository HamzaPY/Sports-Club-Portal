const mongoose = require('mongoose');
const schema = mongoose.Schema;

const gameSchema = new schema(
    {
        name : String,
        nCourts : Number,
        courts : [{
          name : String,
          available : {
              type : Boolean,
              default : true
          }
        }]
    }
)
module.exports = mongoose.model('Games', gameSchema);
