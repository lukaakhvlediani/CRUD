const signature = process.env.JWT_SECRET
const jwt = require('jsonwebtoken')



exports.log_in = async (req, res, next) => {
  const { token } = req.headers

  try {
    if (!token) {
      return res.status(400).send({ message: 'token is required!' })
    }
    const decoded = jwt.verify(token, signature)
    if (!decoded.data) {
      return res.status(400).send({ message: 'token is not valid!' })
    }
    req.user = decoded.data
   
    next()
  } catch (error) {
    return res.status(500).send({ message: error.message })
  }
}
