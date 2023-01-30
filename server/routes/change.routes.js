const Router = require('express');
const fileController = require('../controllers/fileController');
const router = new Router();
const authMiddleware = require('../middleware/auth.middleware');

router.post('/email', authMiddleware, fileController.changeEmail);



module.exports = router