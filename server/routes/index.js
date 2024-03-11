const { authenticateUser } = require('../middleware/auth');

const router = require('express').Router();

router.use('/auth', require('./auth.routes'));
router.use('/book', authenticateUser, require('./books.routes'))
router.use('/issued', authenticateUser, require('./issued.routes'))

module.exports = router;