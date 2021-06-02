//const express = require('express');
//const app = express();
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const secret = require('../Helpers/secret');
const Role = require('../Helpers/Roles');
let coach = require('../models/coach');
let admin = require('../models/admin');
let player = require('../models/player');

function getAdmin(req, res)
{
    if(req.user.role !== Role.admin)
    {
        res.status(403).send("unauthorized access");
    }
    // console.log(req.user._id);
    // if(req.user.role === Role.player)
    {
        admin.findOne({
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
function getAllAdmins(req, res)
{
    if(req.user.role !== Role.admin)
    {
        res.status(403).send("unauthorized access");
    }
    admin.find()
        .then(users=>
            {
                res.json(users);
            }
        )
        .catch(err=>{
            res.send("error occured while fetching players"+err);
        })
}
function editLoggedAdmin(req, res)
{
    if(req.user.role !== Role.admin)
    {
        res.status(403).send("unauthorized access");
    }
    admin.findByIdAndUpdate(req.body._id, { "password": req.body.password
    }, (error, data) => {
        if (error) {
            console.log(error)
        } else {
            res.json(data)
            console.log('Data updated successfully')
        }
    })
}
function editAdmin(req, res)
{
    if(req.user.role !== Role.admin)
    {
        res.status(403).send("unauthorized access");
    }
    else{
        admin.findByIdAndUpdate(req.params.id, { "name": req.body.name, "email": req.body.email, "isAvailable": req.body.isAvailable, "playerNotification":req.body.playerNotification
        }, async (error, data) => {
            if (error) {
                console.log(error)
            } else {
                const cursor = await admin.find().cursor();
                console.log(("Admins Updated"))
                for (let ad = await cursor.next(); ad != null; ad = await cursor.next()) {
                    ad.playerNotification = req.body.playerNotification;
                    await ad.save();
                }
                res.json(data)
                console.log('Data updated successfully')
            }
        })
    }
}


module.exports = {getAdmin, getAllAdmins, editAdmin, editLoggedAdmin}
