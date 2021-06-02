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
const adminService = require('./admin.service')
router.use(cors());


//get coach details by id
router.get('/profile', authService.isAuthentic, adminService.getAdmin);
//get all coach details
router.get('/getAll', authService.isAuthentic, adminService.getAllAdmins);
//update logged in coach
router.post('/edit', authService.isAuthentic, adminService.editLoggedAdmin);
//update specific coach
router.post('/edit/:id', authService.isAuthentic, adminService.editAdmin);
module.exports = router;
