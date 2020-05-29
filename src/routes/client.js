/*
 *  Import external packages here;
 */
const router = require('express').Router();

/*
 *  Import project packages here;
 */
const { clientValidatorFor } = require('../validations/client');
const { updateClient } = require('../controllers/client');

router
.put('/client/:id([a-z0-9]{24})', clientValidatorFor(updateClient.name) ,updateClient )

module.exports = router;