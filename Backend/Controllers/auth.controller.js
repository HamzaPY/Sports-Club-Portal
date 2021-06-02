const express = require('express');
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const secret = require('../Helpers/secret')
const router = express.Router();
let player = require('../models/player');
const authorize = require('../Helpers/authorize')
const Role = require('../Helpers/Roles')
const authService = require('./auth.service')
router.use(cors());

router.delete('/delete/:id', authService.isAuthentic, deletePlayer);
function deletePlayer(req, res)
{
    console.log("hello");
    player.find({_id:req.params.id}).remove((err,res)=>{console.log("Player Removed")})

}
//player logout
router.post('/markAbsent', authService.isAuthentic, markAbsent);
function markAbsent(req, res)
{
    console.log("hello");
    player.findByIdAndUpdate(req.user._id, {"isPresent": false }, (error, data) => {
        if (error) {
            console.log(error)
        } else {
            res.json(data)
            console.log('Data updated successfully')
        }
    })
}
//coach logout
router.post('/coach/logout', authService.isAuthentic, authService.logoutCoach);
//admin logout
router.post('/admin/logout', authService.isAuthentic, authService.logoutAdmin);

//Player registration route
router.post('/register', authService.register);
//Player registration route
router.post('/coachRegister', authService.coachRegister);
//Player registration route
router.post('/register/admin', authService.adminRegister);

//player login
router.post('/login', authService.login);
//coach login
router.post('/login/coach', authService.coachLogin);
//admin login
router.post('/login/admin', authService.adminLogin);
//get All players (only admin)
router.get('/all',authService.isAuthentic, authService.getAllPlayers);
//update logged in player
router.post('/edit', authService.isAuthentic, authService.editLoggedPlayer);
//get details of logged in player
router.get('/profile',authService.isAuthentic, authService.getPlayer);
//get Online players (only admin & player)
router.get('/getOnlinePlayers',authService.isAuthentic, authService.getOnlinePlayers);
//get player details by id
router.get('/get/:id', authService.isAuthentic, authService.getPlayerById);

//get player by email
router.get('/profile/:email',authService.isAuthentic, authService.getPlayerByEmail);




//add custom match
router.post('/edit/customMatch', authService.isAuthentic, authService.customMatchUpdate);
//update multiple player
router.post('/edit/players', authService.isAuthentic, authService.editMultiPlayers);
//update specific player
router.post('/edit/:id', authService.isAuthentic, authService.editPlayer);



//everyday login to mark attendance and set priority
router.post('/markAttendance/:id', authService.isAuthentic, authService.markAttendance);


module.exports = router;
