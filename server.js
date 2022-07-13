/*
*   require('crypto').randomBytes(64).toString('hex')
*   for generating random string
*
*/


const express = require('express')
const app = express()
const dotenv = require('dotenv').config()
const jwt = require('jsonwebtoken')
app.use(express.json())
const posts = [
    {
        username: 'Arup',
        title: 'post1',
    },
    {
        username: 'Roy',
        title: 'post2',
    }
]

app.get('/posts', AuthenticateToken, (req, res) => {
    res.json(posts.filter(post => post.username === req.user.name))
})


function AuthenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(" ")[1]
    if(token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err) return res.sendStatus(403)
        req.user = user
        next()
    })
}





app.listen(3000)