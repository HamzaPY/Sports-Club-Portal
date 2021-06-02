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
const coachService = require('./coach.service')
const coach = require ("../models/coach")
router.use(cors());

//get coach details by id
router.delete('/delete/:id', authService.isAuthentic, deleteCoach);
function deleteCoach(req, res)
{
    //console.log("hello");
    coach.find({_id:req.params.id}).remove((err,res)=>{console.log("coach Removed")})

}
//get coach details by id
router.get('/profile', authService.isAuthentic, coachService.getCurrCoach);

router.get('/get/:id', authService.isAuthentic, coachService.getCoach);
//get all coach details
router.get('/getAll', authService.isAuthentic, coachService.getAllCoaches);
//update logged in coach
router.post('/edit', authService.isAuthentic, coachService.editLoggedCoach);
//update specific coach
router.post('/edit/:id', authService.isAuthentic, coachService.editCoach);
//edit all coaches
router.post('/editAll', authService.isAuthentic, coachService.editMultiCoaches);
//get by id
router.post('/:id', authService.isAuthentic, getById);
function getById(req, res)
{
    if(req.user.Role !== "Admin")
    {
        res.status(403).send("UnAuthorized Access")
    }
    //console.log("hello");
    coach.findOne({_id:req.params.id}).then(
        user=>{res.json(user)}
)
    .then(err=>res.json(err))

}
module.exports = router;
