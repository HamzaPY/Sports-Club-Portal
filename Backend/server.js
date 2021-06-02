const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require("body-parser")
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
const mongoose = require('mongoose');
let port = process.env.port || 3000
const mongoDB = "mongodb://localhost:27017/PriSports";
const authService = require('./Controllers/auth.service')
let player = require('./models/player');
const cors = require('cors')
mongoose.connect (mongoDB, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err))

const Game = require('./models/game');
const bcrypt = require('bcrypt')
mongoose.Promise = global.Promise;
Game.collection.drop();
Game.create([{
    name: "Tennis",
    nCourts: 10,
    courts : [ {name : 'TenC1'},{name : 'TenC2'},{name : 'TenC3'},{name : 'TenC4'},{name : 'TenC5'},{name : 'TenC6'},{name : 'TenC7'},
        {name : 'TenC8'},{name : 'TenC9'},{name : 'TenC10'}
    ]
},
    {
        name: "Badminton",
        nCourts: 8,
        courts : [ {name : 'BDM1'},{name : 'BDM2'},{name : 'BDM3'},{name : 'BDM4'},{name : 'BDM5'},{name : 'BDM6'},{name : 'BDM7'},
            {name : 'BDM8'}
        ]
    },
    {
        name: "Table_Tennis",
        nCourts: 20,
        courts : [ {name : 'TT1'},{name : 'TT2'},{name : 'TT3'},{name : 'TT4'},{name : 'TT5'},{name : 'TT6'},{name : 'TT7'}, {name : 'TT8'},{name : 'TT9'},
            {name : 'TT10'}, {name : 'TT11'},{name : 'TT12'},{name : 'TT13'},{name : 'TT14'},{name : 'TT15'},{name : 'TT16'},{name : 'TT17'},
            {name : 'TT18'},{name : 'TT19'},{name : 'TT20'},
        ]
    },{
        name: "Squash",
        nCourts: 6,
        courts : [ {name : 'Sq1'},{name : 'Sq2'},{name : 'Sq3'},{name : 'Sq4'},{name : 'Sq5'},{name : 'Sq6'}]
    }
]);

 const Admin = require('./models/admin');
bcrypt.hash("12345678", 10, (err,hash) => {
    Admin.create({
    name: "Hamza",
    role: "Admin",
    email: "mohdhamza4@gmail.com",
    password: hash,
    isAvailable: "true"
})
})

// Admin.collection.drop();
// Admin.create([{
//     name: "Hamza",
//     role: "Admin",
//     email: "mohdhamza4@gmail.com",
//     password: "12345678",
//     isAvailable: "true",
// },
// {
//     name: "Usama",
//     role: "Admin",
//     email: "usama12@gmail.com",
//     password: "12345678",
//     isAvailable: "true",
// },
// ]);


let Games = require('./Controllers/Game.controller')

app.use('/Game', Games)
let players = require('./Controllers/auth.controller')

app.use('/player', players)

let Coaches = require('./Controllers/coach.controller')

app.use('/coach', Coaches);

let Admins = require('./Controllers/admin.controller')

app.use('/admin', Admins);



app.listen(port,function() {
    console.log("Server is running on port:" + port)
})
