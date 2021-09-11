const db = require('../../data/db-config')

module.exports = {
  find,
  findById,
  insert,
  update,
  remove,
  findPostComments,
  findCommentById,
  insertComment,
}

async function find() {
  return await db('posts')
}

async function findById(id) {
  return db('posts')
    .where({id: Number(id)})
    .first()
}

async function insert(post) {
  return await db('posts')
    .insert(post)
    .then(ids => (
      {id: ids[0]}
    ))
}

async function update(id, post) {
  return db('posts')
    .where('id', Number(id))
    .update(post)
}

async function remove(id) {
  return db('posts')
    .where('id', Number(id))
    .del()
}

async function findPostComments(postId) {
  return db('comments')
    .join('posts', 'posts.id', 'post_id')
    .select('comments.*', 'title as post')
    .where('post_id', postId)
}

async function findCommentById(id) {
  return db('comments')
    .join('posts', 'posts.id', 'post_id')
    .select('comments.*', 'title as post')
    .where('comments.id', id)
    .first()
}

async function insertComment(comment) {
  return await db('comments')
    .insert(comment)
    .then(ids => (
      {id: ids[0]}
    ))
}
