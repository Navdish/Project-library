const router = require('express').Router();
const { bookController } = require('../controller');
const multer = require('multer');

const upload = multer({
    storage: multer.diskStorage({
        destination : function(req, file, cb)
        {
            cb(null, "uploads")
        },
        filename : function(req, file, cb)
        {
            cb(null,  Date.now() + "-" + file.originalname)
        }
    })
}).array("user_file");


router.get('/', bookController.getBook)
router.post('/',upload, bookController.createBook)
router.put('/',upload, bookController.updateBook)
router.delete('/', bookController.dropBook)

module.exports = router;