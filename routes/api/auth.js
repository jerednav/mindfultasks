//To use express
const express = require('express')
//To use express router
const router = express.Router();
const auth = require('../../middleware/auth');
const config = require('config');
const jwt = require('jsonwebtoken')
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')

const User = require('../../models/User');

// @ route      Post api/auth
// @ desc       Authenticate user & get token
// @ access     Public
router.get('/', auth, async(req,res) => {
	try {
		const user = await User.findById(req.user.id).select('-password');
//'-password' leaves off password in the data
		res.json(user);
	} catch(err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @ route      POST api/auth
// @ desc       Authenticate user
// @ access     Public

router.post (
	'/',
[
		check('email', 'Please include a valid email').isEmail(),
		check(
			'password',
			'Password is required'
		).exists()
	],
	async (req, res) => {
		 const errors = validationResult(req)
			if(!errors.isEmpty()) {
				return res.status(400).json({ errors: errors.array() });
	}
//See if user exists
const { email, password } = req.body;

try {
	let user = await User.findOne({ email });
	
	if (user) {
		return res
            .status(400)
            .json({ errors: [{ msg: 'Invalid credentials' }] });
	}

	const isMatch = await bcrypt.compare(password, user.password);

	if(!isMatch){
		return res
            .status(400)
            .json({ errors: [{ msg: 'Invalid credentials' }] });
	}

	const payload = {
		user: {
			id:user.id
		}
	}

//creates payload from user id and uses jwtSecret to make a hashed 
//token from config/default.json
	jwt.sign(
        payload, 
        config.get('jwtSecret'),
//when it expires, and is optional
		{ expiresIn: '5 days' },
//will show error, if not, access token given
		(err, token) => {
			if(err) throw err;
			res.json({ token });
		}
    );
} catch (err) {
		console.error(err.message);
		res.status(500).send('Server error');
		}
	}
);

module.exports = router;