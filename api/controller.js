const { pool } = require('./db');
const moment = require('moment/moment');

const getStationConfig = async (req, res) => {
    console.log('Received request to getStationConfig');

    try {
        const result = await pool.query('SELECT * FROM tb_stations_config ORDER BY station_id ASC');
        ;
        console.log('Query successful:', result.rows);
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching StationConfig data:', err.message);
        res.status(500).json({ error: err.message });
    }
};

const getAllSensorData = async (req, res) => {
    console.log('Received request to getAllSensorData');

    try {
        const result = await pool.query('SELECT * FROM tb_buoy_01_measurements ORDER BY id ASC');
        console.log('Query successful:', result.rows);
        res.json(result.rows.reverse());
    } catch (error) {
        console.error('Error fetching SensorData data:', error.message);
        res.status(500).json({ error: error.message });
    }
}

const getSensorDataByDate = async (req, res) => {
    console.log('Received request to getSensorDataByDate');
    const { fromDate, toDate } = req.query;

    try {
        const result = await pool.query(
            `SELECT * FROM tb_buoy_01_measurements 
         WHERE timestamp BETWEEN $1 AND $2 ORDER BY id ASC`,
            [fromDate, toDate]
        );

        res.json(result.rows.reverse());
    } catch (error) {
        console.error('Error fetching getSensorDataByDate data:', error.message);
        res.status(500).json({ error: error.message });
    }
};

const getMetrologicalData = async (req, res) => {
    console.log('Received request to getMetrologicalData');

    try {
        const result = await pool.query('SELECT * FROM tb_metrological_params_01');
        console.log('Query successful:', result.rows);
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching MetrologicalData data:', error.message);
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getStationConfig,
    getAllSensorData,
    getSensorDataByDate,
    getMetrologicalData,
}