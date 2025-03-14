const express = require('express')
const { getStationConfig } = require('./controller')

const router = express.Router();

router.get('/getStationConfig', getStationConfig);

module.exports = router;