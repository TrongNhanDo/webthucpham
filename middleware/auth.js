import jtoken from 'jsonwebtoken'
import envi from '../envi.js'

const auth = (req, res, next) => {
    try {
        const token = req.header("Authorization")
        if (!token) return res.status(400).json({ msg: "Invalid Authentication" })

        jtoken.verify(token, envi.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) return res.status(400).json({ msg: "Invalid Authentication" })

            req.user = user
            next()
        })
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
}

export default auth