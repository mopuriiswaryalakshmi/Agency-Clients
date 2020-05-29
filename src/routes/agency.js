/*
 *  Import external packages here;
 */
const router = require('express').Router();

/*
 *  Import project packages here;
 */
const { agencyValidatorFor } = require('../validations/agency');
const { createAgencyAndClient, getAgencyClient, generateToken } = require('../controllers/agency');

router
.post('/agencyClient', agencyValidatorFor(createAgencyAndClient.name), createAgencyAndClient)
.get('/agencyClients', getAgencyClient)
.get('/generateToken', generateToken)

module.exports = router;