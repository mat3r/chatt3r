// external dependencies
const Router = require('express-promise-router');

// local dependencies
const mainController = require('../controllers/mainController');

// create a new express-promise-router
const router = new Router();

// retrive messages
router.get('/messages/:room', mainController.loadMessages);

// export our router to be mounted by the parent application
module.exports = router;

