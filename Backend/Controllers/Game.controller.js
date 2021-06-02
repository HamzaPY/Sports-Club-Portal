const express = require('express');
const router = express.Router();
let Game = require('../models/game');
const Role = require('../Helpers/Roles');
const cors = require('cors');
router.use(cors());
// Get All Games
router.route('/getAll').get((req, res) => {
    Game.find((error, data) => {
        if (error) {
            res.json(error)
        } else {
            res.json(data)
        }
    })
})


router.route('/edit/:name').post((req, res) => {

    {
        console.log("SingleGameEdit");
        //console.log(req.body.list);
        //console.log(req.params.id);
       // req.body.firstLogin = false;
        Game.findOne({
                name:req.params.name
            }
        )
            .then(user=>{
                    user.courts = req.body.courts;
                    user.save((err,data)=>{})
                    res.json("Game Edited")
                }
            )
            .catch(err=>{console.log(err)})
    }
})
// Edit All Games
router.route('/edit').post((req, res) => {

    {
        console.log("GamesEdit");
        //console.log(req.body.list);
        const length = req.body.list.length;
        console.log(length);
        let games = req.body.list;
        for(let i = 0; i < length; i++)
        {
            Game.findOne({
                _id: games[i]._id
            })
                .then(game => {
                    if (game){
                        game = games[i];
                        game.save((err,data)=>console.log());
                        res.json("Game Updated")
                       // res.json("Game Updated");
                    }
                    else
                    {
                        res.send("game not updated");
                    }
                })
                .catch(err => {
                    res.json('error: ' + err)
                })
        }

    }
})

function editGame(req, res)
{

}

router.route('/get/:name').get((req, res)=> {
   // console.log(req.query.id)
    Game.findOne({
        name: req.params.name
    })
        .then(game => {
            if (game){
                game.save((err,data)=>console.log("UserPresent"));
                game.json(game);
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
})

router.route('/set/:name').get((req, res)=> {
    // console.log(req.query.id)
    Game.findOne({
        name: req.params.name
    })
        .then(game => {
            if (game){
                game.courts = req.body.courts;
                game.save((err,data)=>console.log("UserPresent"));
                game.json("Game Updated");
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
})
module.exports = router;
