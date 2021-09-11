const router = require('express')
  .Router()
const Post = require('./posts-model')

router.get('/', async (req, res) => {
  try {
    const data = await Post.find()
    res.status(200)
      .json(data)
  } catch (err) {
    res.status(500)
      .json({message: 'The posts information could not be retrieved'})
  }
})

router.get('/:id', async (req, res) => {
  try {
    const data = await Post.findById(req.params.id)
    if (data) {
      res.status(200)
        .json(data)
    } else {
      res.status(404)
        .json({message: 'The post with the specified ID does not exist'})
    }
  } catch (err) {
    res.status(500)
      .json({message: 'The post information could not be retrieved'})
  }
})

router.get('/:id/comments', async (req, res) => {
  try {
    const data = await Post.findPostComments(req.params.id)
    if (data.length
      > 0) {
      res.status(200)
        .json(data)
    } else {
      res.status(404)
        .json({message: 'The post with the specified ID does not exist'})
    }
  } catch (err) {
    res.status(500)
      .json({message: 'The comments information could not be retrieved'})
  }
})

router.post('/', async (req, res) => {
  try {
    if (!req.body.title
      || !req.body.contents) {
      res.status(400)
        .json({message: 'Please provide title and contents for the post'})
    } else {
      const data = await Post.insert(req.body)
      if (data) {
        const newData = await Post.findById(data.id)
        res.status(201)
          .json(newData)
      }
    }
  } catch (err) {
    res.status(500)
      .json({message: 'There was an error while saving the post to the database'})
  }
})

router.put('/:id', async (req, res) => {
  try {
    const data = await Post.findById(req.params.id)
    if (!data) {
      res.status(404)
        .json({message: 'The post with the specified ID does not exist'})
    } else {
      if (!req.body.title
        || !req.body.contents) {
        res.status(400)
          .json({message: 'Please provide title and contents for the post'})
      } else {
        const updateIt = await Post.update(req.params.id, req.body)
        if (updateIt) {
          const updated = await Post.findById(req.params.id)
          res.status(200)
            .json(updated)
        }
      }
    }
  } catch (err) {
    res.status(500)
      .json({message: 'The post information could not be modified'})
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const data = await Post.findById(req.params.id)
    if (data) {
      const deleteIt = await Post.remove(req.params.id)
      if (deleteIt) {
        res.status(200)
          .json(data)
      }
    } else {
      res.status(404)
        .json({message: 'The post with the specified ID does not exist'})
    }
  } catch (err) {
    res.status(500)
      .json({message: 'The post could not be removed'})
  }
})

module.exports = router
