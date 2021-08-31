const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const postsRouter = require('./posts/posts-router')

const server = express()

server.use(helmet())
server.use(express.json())
server.use(cors())
server.use('/api/posts', postsRouter)

// CATCHALL
server.use('*', (req, res) => {
  res.status(200).json({message: 'server up and running'})
})

module.exports = server
