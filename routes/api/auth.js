//To use express
const express = require('express')
//To use express router
const router = express.Router();

// @ route      GET api/auth
// @ desc       Test route
// @ access     Public
router.get('/', (req,res) => res.send ('Auth route'))


module.exports = router;