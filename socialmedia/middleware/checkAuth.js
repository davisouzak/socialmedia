const jwt = require('jsonwebtoken')

function checkAuth(req, res, next) {
	const token = req.cookies.auth_token
	if (!token) {
		return res.redirect('/')
	}
	try {
		jwt.verify(token, process.env.TOKEN_KEY)
		next()
	} catch (err) {
		return res.redirect('/')
	}
}

module.exports = checkAuth
