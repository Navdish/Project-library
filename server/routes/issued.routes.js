const router = require('express').Router();
const { issuedController } = require('../controller');


router.get('/', issuedController.getIssued)
router.post('/', issuedController.createIssued)
router.put('/', issuedController.updateIssued)
router.delete('/', issuedController.dropIssued)

module.exports = router;