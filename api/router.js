const express = require('express')
const { getStationConfig, getAllSensorData, getMetrologicalData, getSensorDataByDate } = require('./controller')

const router = express.Router();

router.get('/getStationConfig', getStationConfig);
router.get('/getAllSensorData', getAllSensorData);
router.get('/getMetrologicalData', getMetrologicalData);
router.get('/getSensorDataByDate', getSensorDataByDate);


module.exports = router;