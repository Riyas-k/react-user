const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin-controllers')
const jwt = require('jsonwebtoken');



router.post('/login',adminController.adminLogin)
router.get('/',adminController.userDetails)
router.post('/change-block/:id',adminController.changeBlock)
router.post('/change-unblock/:id',adminController.changeUnBlock)
router.put('/delete-user/:id',adminController.deleteUser)


module.exports = router