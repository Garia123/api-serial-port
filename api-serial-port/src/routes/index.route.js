const express = require('express');
const serialPortCommunication = require('./serialPortCommunication.route')

const router = express.Router();

router.use('/serialPortCommunication', serialPortCommunication);

router.get('/', (req, res) => res.send('Sample Node API Version1'));

module.exports = router;