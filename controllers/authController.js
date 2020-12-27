// Logs out
const auth_logout = (req, res) => {
	req.logout()
	res.redirect('/auth/google')
}

module.exports = {
	auth_logout,
}
