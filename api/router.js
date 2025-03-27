const express = require('express')
const { getStationConfig, getAllSensorData, getMetrologicalData } = require('./controller')

const router = express.Router();

router.get('/getStationConfig', getStationConfig);
router.get('/getAllSensorData', getAllSensorData);
router.get('/getMetrologicalData', getMetrologicalData);


module.exports = router;