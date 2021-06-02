// const express = require('express');
// const app = express();
// const cors = require('cors')
// const jwt = require('jsonwebtoken')
// const bcrypt = require('bcrypt')
const secret = require('../Helpers/secret');
const Role = require('../Helpers/Roles');
let coach = require('../models/coach');
let admin = require('../models/admin');
let player = require('../models/player');

function getCurrCoach(req, res)
{
   // console.log(req.user._id);
   // if(req.user.role === Role.player)
    {
        coach.findOne({
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

function getCoach(req, res)
{
    if(req.user.role === Role.player)
    {
        res.status(403).send("unauthorized access");
    }
    // console.log(req.user._id);
    // if(req.user.role === Role.player)
    {
        coach.findOne({
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

}
function getAllCoaches(req, res)
{
    console.log("Get All Coaches");
    if(req.user.role !== Role.admin)
    {
        res.status(403).send("unauthorized access");
    }
    coach.find()
        .then(users=>
            {
                res.json(users);
            }
        )
        .catch(err=>{
            res.send("error occured while fetching players"+err);
        })
}
function editLoggedCoach(req, res)
{
    coach.findByIdAndUpdate(req.body._id, { "name": req.body.email, "password": req.body.password
    }, (error, data) => {
        if (error) {
            console.log(error)
        } else {
            res.json(data)
            console.log('Data updated successfully')
        }
    })
}
function editCoach(req, res)
{
    if(req.user.role !== Role.admin)
    {
        res.status(403).send("unauthorized access");
    }
    else{

        coach.findOne({
                _id:req.params.id
            }
        )
            .then(user=>{
                    user.isAvailable = req.body.isAvailable;
                    user.name = req.body.name;
                    user.password = req.body.password;
                    user.email = req.body.email;
                    user.save((err,data)=>{console.log("Player Edited")});
                    res.json("coach edited");
                }
            )
            .catch(err=>{console.log(err)})
    }
}

function editMultiCoaches(req, res)
{
    console.log("Edit Multi Coaches");
    //console.log(req.body.list);
    if(req.user.role !== Role.admin)
    {
        res.status(403).send("unauthorized access");
    }
    else{
        console.log(req.body.list);
        const length = req.body.list.length;
        let coaches = req.body.list;
        for(let i = 0; i < length; i++)
        {
            coach.findOne({
                _id: coaches[i]._id
            })
                .then(user => {
                    if (user){
                        user = coaches[i];
                        user.save((err,data)=>console.log());
                        res.json("Coaches Updated");
                        // console.log(user);
                    }
                    else
                    {
                        res.send("User does not exist")
                    }
                })
                // .catch(err => {
                //     res.json('error: ' + err)
                // })
        }

    }
}
module.exports = {getCoach, getAllCoaches, editCoach, editLoggedCoach, editMultiCoaches, getCurrCoach}
