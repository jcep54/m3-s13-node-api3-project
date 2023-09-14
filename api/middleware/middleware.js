const Users = require('../users/users-model');
const Posts = require('../posts/posts-model');


function logger(req, res, next) {
  // DO YOUR MAGIC
  const timeStamp = new Date().toLocaleString()
  const method  = req.method
  const url = req.originalUrl
  console.log(`${timeStamp} ${method} to ${url}`)
  next()
}

async function validateUserId(req, res, next) {
try{
  const valId = await Users.getById(req.params.id)
  if (valId){
    req.user = valId
    next()
  }else{
    next({status: 404, message: 'User not found'})
  }
}catch(err){
  
  next(err)
}
  // DO YOUR MAGIC
}

function validateUser(req, res, next) {
  try{
    const userName = req.body.name
    if(userName &&
      userName.trim().length){
        next()
      }else{
        next({status:400, message:'missing required name field'})
      }
  }catch(err){
    next(err)
  }
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
  try{
    const {text} = req.body
    if(text &&
      text.trim().length){
        next()
      }else{
        next({status:400, message:'missing required text field'})
      }
  }catch(err){
    next(err)
  }
}

// do not forget to expose these functions to other modules
module.exports = {
  validateUserId,
  validateUser,
  logger,
  validatePost
}