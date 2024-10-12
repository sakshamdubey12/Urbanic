const express = require('express')
const User = require('../models/userModel')
const router = express.Router()


router.post('/signup', async (req, res) => {
console.log('signup')
});



module.exports = router;