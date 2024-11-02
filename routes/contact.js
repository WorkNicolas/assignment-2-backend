var express = require('express');
var router = express.Router();

let contactController = require('../controllers/contact');

// Routes for contact controller
router.get('/', contactController.list);
router.post('/', contactController.create);
router.get('/:contactID', contactController.contactGet, contactController.contactByID);
router.put('/:contactID', contactController.update);
router.delete('/:contactID', contactController.delete);

module.exports = router;
