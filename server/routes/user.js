const express = require('express');
const router = express.Router();
const userController = require('../controllers/user-controllers')

router.post('/', userController.postSignup);
router.post('/login',userController.postLogin)
router.post('/add-image/:id',userController.imagePost)
router.get('/user-data/:id',userController.getUserDetails)
router.get('/search',userController.searchData)

module.exports = router