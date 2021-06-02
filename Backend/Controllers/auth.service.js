const express = require('express');
const app = express();
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const secret = require('../Helpers/secret');
const Role = require('../Helpers/Roles');
let coach = require('../models/coach');
let admin = require('../models/admin');
let player = require('../models/player');

function isAuthentic(req, res, next)
{
    let token = req.headers['authorization'];
    if(!token)
        res.status(403).send("Token Not present");
    jwt.verify(token, 'secret',(err, decoded)=>{
        if(err)
        {
            res.status(401).send("User not authenticated");
        }
        else{
            req.user = decoded;
            next();
        }

    })
}

function register(req, res) {

    const newPlayer = new player(
        {name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            gender:req.body.gender,
            game: req.body.game
        });
    player.findOne({
        email: req.body.email
    })
        .then(user => {
            if (!user) {
                bcrypt.hash(req.body.password, 10, (err,hash) => {
                    newPlayer.password = hash;
                    newPlayer.save((err,data)=>
                    {
                        res.json('Player Registered');
                    })
                })

            }
            else
            {
                res.json({error: 'User already exists' })
            }
        })
        .catch(err => {
            res.send('error: ' + err)
        })
}
function coachRegister(req, res) {
    coach.count({},(err,result)=>{
        if(err || result>20)
            res.json("Could Not Register Coach");
    })
    console.log("COach Register");
    const newCoach = new coach(
        {name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });
    coach.findOne({
        email: req.body.email
    })
        .then(user => {
            if (!user) {
                bcrypt.hash(req.body.password, 10, (err,hash) => {
                    newCoach.password = hash;
                    newCoach.save((err,data)=>
                    {
                        res.json('Coach Registered');
                    })
                })

            }
            else
            {
                res.json({error: 'User already exists' })
            }
        })
        .catch(err => {
            res.send('error: ' + err)
        })
}
function adminRegister(req, res) {
    admin.count({},(err,result)=>{
        if(err || result>5)
            res.json("Could Not Register Admin");
    })
    console.log("Admin Register");
    const newAdmin = new admin(
        {name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });
    admin.findOne({
        email: req.body.email
    })
        .then(user => {
            if (!user) {
                console.log("Admin is going to register")
                bcrypt.hash(req.body.password, 10, (err,hash) => {
                    newAdmin.password = hash;
                    newAdmin.save((err,data)=>
                    {
                        res.json('Admin Registered');
                    })
                })

            }
            else
            {
                res.json({error: 'User already exists' })
            }
        })
        .catch(err => {
            res.send('error: ' + err)
        })
}

function login(req, res) {
    console.log("login Entered");
    player.findOne ({
        email: req.body.email
    })
        .then(user => {
            if (user) {
                if (bcrypt.compareSync(req.body.password, user.password)) {
                    const payload = {
                        _id: user._id,
                        role: user.role,
                        name: user.name,
                        email: user.email
                    }
                    let token = jwt.sign(payload, 'secret', {
                    })
                    res.json({token: token})
                }
                else
                {
                    res.json({error: "User does not exists"})
                }
            }
            else
            {
                res.json({error: "User does not exists"})
            }
        })
        .catch(err => {
            res.json('error: ' + err)
        })
}

function coachLogin(req, res) {
    console.log("coach login Entered");
    coach.findOne ({
        email: req.body.email
    })
        .then(user => {
            if (user) {
                if (bcrypt.compareSync(req.body.password, user.password)) {
                    const payload = {
                        _id: user._id,
                        role: user.role,
                        name: user.name,
                        email: user.email
                    }
                    let token = jwt.sign(payload, 'secret', {
                    })
                    res.json({token: token, id: payload._id})
                }
                else
                {
                    res.json({error: "User does not exists"})
                }
            }
            else
            {
                res.json({error: "User does not exists"})
            }
        })
        .catch(err => {
            res.json('error: ' + err)
        })
}

function adminLogin(req, res) {
    console.log("Admin login Entered");
    admin.findOne ({
        email: req.body.email
    })
        .then(user => {
            if (user) {
                if (bcrypt.compareSync(req.body.password, user.password)) {
                    const payload = {
                        _id: user._id,
                        role: user.role,
                        name: user.name,
                        email: user.email
                    }
                    let token = jwt.sign(payload, 'secret', {
                    })
                    res.json({token: token})
                }
                else
                {
                    res.json({error: "User does not exists"})
                }
            }
            else
            {
                res.json({error: "User does not exists"})
            }
        })
        .catch(err => {
            res.json('error: ' + err)
        })
}

function getPlayer(req, res)
{
   // console.log(req.user._id);
   // if(req.user.role === Role.player)
    {
        player.findOne({
            _id: req.user._id
        })
            .then(user => {
                if (user){
                    user.save((err,data)=>console.log("UserPresent"));
                    res.json(user);
                    // console.log(user);
                }
                else
                {
                    res.send("User does not exist")
                }
            })
            .catch(err => {
                res.json('error: ' + err)
            })
    }

}

function getPlayerById(req, res) {
    console.log("getPlayerById");
//console.log(req.query.id);
    player.findOne({
        _id: req.params.id
    })
        .then(user => {
            if (user){
                user.save((err,data)=>console.log("UserPresent"));
                res.json(user);
                // console.log(user);
            }
            else
            {
                res.send("User does not exist")
            }
        })
        .catch(err => {
            res.json('error: ' + err)
        })
}
function getPlayerByEmail(req, res) {
    if(req.user.role !== Role.coach)
    {
        player.findOne({
            email: req.params.email
        })
            .then(user => {
                if (user){
                    user.save((err,data)=>console.log("Get Player By Email Successful"));
                    res.json(user);
                    // console.log(user);
                }
                else
                {
                    res.send("User does not exist")
                }
            })
            .catch(err => {
                res.json('error: ' + err)
            })
    }

}

function getOnlinePlayers(req, res)
{
    console.log("getOnlinePlayer");
    player.find({isPresent: true})
        .then(users=>
            {
                console.log("Online Players Supplied");
                res.json(users);
            }
        )
        .catch(err=>{
            res.send("error occured while fetching players"+err);
        })
}
function getAllPlayers(req, res)
{
    console.log("Get All Players");
    player.find()
        .then(users=>
            {
                res.json(users);
            }
        )
        .catch(err=>{
            res.send("error occured while fetching players"+err);
        })
}

function customMatchUpdate(req, res)
{
    player.findByIdAndUpdate(req.user._id, { "progressInMatchSessions": req.body.progressInMatchSessions
    }, (error, data) => {
        if (error) {
            console.log(error)
        } else {
            console.log("Custom Match Update Successful");
            sendNotificationToAdmin(req.user._id, false)
                .then(user=>{})
                .catch(err=>{console.log(err)})
            res.json(data)
            console.log('Data updated successfully')
        }
    })
}

async function sendNotificationToAdmin(id,regular) {
    let noti = {playerId:id, regularMatch: regular };
    const cursor = await admin.find().cursor();
    console.log(("Notification sent to Admins"))
    for (let ad = await cursor.next(); ad != null; ad = await cursor.next()) {
        ad.playerNotification.push(noti);
        await ad.save();
    }
}
function editLoggedPlayer(req, res)
{
    player.findByIdAndUpdate(req.body._id, { "opponentRank": req.body.opponentRank, "game": req.body.game, "firstLogin": false, "dailyJoiningTime":req.body.dailyJoiningTime
    }, (error, data) => {
        if (error) {
            console.log(error)
        } else {
            res.json(data)
            console.log('Data updated successfully')
        }
    })
}

function editPlayer(req, res)
{
    if(req.user.role === Role.player && req.user._id !== req.params.id)
    {
        res.status(403).send("unauthorized access");
    }
    else{
        console.log(req.params.id);
        req.body.firstLogin = false;
        player.findOne({
            _id:req.body._id
            }
        )
            .then(user=>{
                user.progressInMatchSessions = req.body.progressInMatchSessions;
                user.progressInPracticeSessions = req.body.progressInPracticeSessions;
                user.isPresent = req.body.isPresent;
                user.name = req.body.name;
                user.password = req.body.password;
                user.email = req.body.email;
                user.save((err,data)=>{console.log("Player Edited")})
                res.json("Player Edited")
                }
            )
            .catch(err=>{console.log(err)})
        // player.findByIdAndUpdate(req.params.id, { "opponentRank": req.body.opponentRank, "game": req.body.game, "firstLogin": false, "dailyJoiningTime":req.body.dailyJoiningTime,
        // }, (error, data) => {
        //     if (error) {
        //         console.log(error)
        //     } else {
        //         res.json(data)
        //         console.log('Data updated successfully')
        //     }
        // })
    }
}
function editMultiPlayers(req, res)
{
    console.log("Edit Multi Players");
    //console.log(req.body.list);
    if(req.user.role === Role.player)
    {
        res.status(403).send("unauthorized access");
    }
    else{
        const length = req.body.list.length;
        console.log(length);
        let players = req.body.list;

        for(let i = 0; i < length; i++)
        {
            console.log((players[i]._id));
            player.findOne({
                _id: players[i]._id
            })
                .then(user => {
                    if (user){
                        user.progressInPracticeSessions = players[i].progressInPracticeSessions;
                        user.progressInMatchSessions = players[i].progressInMatchSessions;
                        user.progressInPracticeSessions = players[i].progressInPracticeSessions;
                        user.save((err,data)=>console.log("PlayerEdited"));
                        // console.log(user);
                    }
                    else
                    {
                        res.send("User does not exist")
                    }
                })
                .catch(err => {
                    res.json('error: ' + err)
                })
        }

    }
}

function markAttendance(req, res)
{

    if(req.user.role === Role.player || req.user.role === Role.admin)
    {
        player.findById(req.params.id)
            .then(user=>{
                console.log(req.body.attendance);
                user.attendance = req.body.attendance;
                user.isPresent = true;
                user.save((err,data)=>sendNotificationToAdmin(user._id, true))
            })
            .catch(err => {
                res.json('error: ' + err)
            })
    }
}

function logout(req, res)
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
function logoutCoach(req, res)
{
    admin.findById(req.user._id)
        .then(user=>{
            //user.isAvailable = false;
            user.save((err,data)=>console.log("Logged Out"))
        })
        .catch(err => {
            res.json('error: ' + err)
        })
}
function logoutAdmin(req, res)
{
    player.findById(req.user._id)
        .then(user=>{
           // user.isAvailable = false;
            user.save((err,data)=>console.log("Logged Out"))
        })
        .catch(err => {
            res.json('error: ' + err)
        })
}
module.exports = {getAllPlayers, getPlayerById, login, coachLogin, adminLogin,isAuthentic, register,
    editPlayer, markAttendance, getPlayer, editLoggedPlayer,
    coachRegister, adminRegister, logout, editMultiPlayers, getPlayerByEmail, getOnlinePlayers, customMatchUpdate,
    logoutAdmin, logoutCoach
};
