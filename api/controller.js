const { pool } = require('./db');
const moment = require('moment/moment');

const getStationConfig = async (req, res) => {
    console.log('Received request to getStationConfig');

    try {
        const result = await pool.query('SELECT * FROM tb_stations_config');
        console.log('Query successful:', result.rows);
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching StationConfig data:', err.message);
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getStationConfig
}