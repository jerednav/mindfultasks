//To use express
const express = require('express')
//To use express router
const router = express.Router();

// @ route      GET api/post
// @ desc       Test route
// @ access     Public
router.get('/', (req,res) => res.send ('Post route'))


module.exports = router;