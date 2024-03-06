const Users = require('../users/users-model');

function logger(req, res, next) {
  // DO YOUR MAGIC
  console.log(
    `REQUEST METHOD: ${req.method}
REQUEST URL: /api/users${req.url}
TIMESTAMP: ${new Date().toLocaleString()}`)
  next();
}

async function validateUserId(req, res, next) {
  // DO YOUR MAGIC
  try {
    const id = Number(req.params.id);
    const user = await Users.getById(id);
    console.log("validateUserId middleware")
    if (!user) {
      res.status(404).json({ message: 'user not found' });
    } else {
      req.validUser = user;
      next();
    }
  } catch (err) {
    console.error('Error in validateUserId middleware: ', err);
    res.status(500).json({ message: 'Internal server error' });
  }

  next();
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
  const user = req.body;
  if (!user.name) {
    res.status(400).json({ message: 'missing required name field' });
  } else {
    next();
  }
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
  next();
}

// do not forget to expose these functions to other modules
module.exports = {
  validatePost: validatePost,
  validateUser: validateUser,
  validateUserId: validateUserId,
  logger: logger,
}
